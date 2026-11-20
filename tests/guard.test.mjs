import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

function loadDataSandbox(lang = 'zh-HK') {
  const ctx = { console };
  ctx.globalThis = ctx;
  ctx.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(
    `${read('data.js')}\n${read('locale-en.js')}\n${read('scout3d.js')}\nLANG = ${JSON.stringify(lang)};\n` +
    `this.__api = { SECTIONS, BRANCHES, ITEMS, SHOP, SHOP_BASE, SHOP_IMG_BASE, shopUrl, shopImg, shopInfo, UNIFORM_SPEC, LOCALES, buildChecklist, hasLowerBodyChoice, applyLowerBodyChoice, getSpec, officialPhoto, itemImageSources, SCOUT3D_BADGES_ZH, SCOUT3D_MAP_ZH, Scout3D: globalThis.Scout3D, setLang: (l) => { LANG = l; } };`,
    ctx
  );
  return ctx.__api;
}

test('S/W/V & G11: version single-source-of-truth, copyright, and 9 standard icons', () => {
  const pkg = JSON.parse(read('package.json'));
  const html = read('index.html');
  const mf = JSON.parse(read('manifest.webmanifest'));
  const changelog = read('CHANGELOG.md');

  assert.equal(pkg.dependencies, undefined, 'package.json must have zero runtime dependencies');
  assert.match(html, /<meta name="copyright" content="© SCOUT SYSTEM">/);
  assert.match(html, new RegExp(`<meta name="app-version" content="${pkg.version.replace(/\./g, '\\.')}">`));
  assert.ok(html.includes(`const APP_VERSION = "${pkg.version}"`));
  assert.ok(html.includes(`© 2026 SCOUT SYSTEM · v${pkg.version}`));
  assert.ok(changelog.includes(`[${pkg.version}]`), 'CHANGELOG.md must contain current version');

  const expectedIcons = [
    'icons/favicon.ico',
    'icons/favicon-16.png',
    'icons/favicon-32.png',
    'icons/apple-touch-icon.png',
    'icons/icon-192.png',
    'icons/icon-512.png',
    'icons/icon-maskable-192.png',
    'icons/icon-maskable-512.png',
    'icons/og-image.png',
  ];
  let totalBytes = 0;
  for (const icon of expectedIcons) {
    assert.ok(existsSync(join(ROOT, icon)), `Missing G11 icon: ${icon}`);
    totalBytes += readFileSync(join(ROOT, icon)).length;
  }
  assert.ok(totalBytes <= 260 * 1024, `Icons exceed 260KB G11 cap: ${totalBytes} bytes`);
  assert.equal(mf.icons.length, 4, 'manifest must declare 4 PNG icons (any + maskable 192/512)');
  assert.equal(mf.theme_color, '#1B4332');
  assert.equal(mf.background_color, '#1B4332');
});

test('DESIGN.md house rules: zero CSS gradients in index.html and app.js', () => {
  assert.ok(existsSync(join(ROOT, 'DESIGN.md')), 'DESIGN.md must exist');
  const combined = `${read('index.html')}\n${read('app.js')}`;
  assert.equal((combined.match(/(linear|radial|conic)-gradient\(/g) || []).length, 0, 'UI must have zero CSS gradients');
});

test('2026 Scheme Spec: female trousers choice & upgrade reuse across Scout -> Venture -> Rover -> Leader', () => {
  const api = loadDataSandbox('zh-HK');

  // 1. Scout female -> Venture female with trousers: trousers-olive-f is new (need), shoes-lace reused (have)
  const scoutToVenture = api.buildChecklist({
    section: 'venture',
    branch: 'land',
    gender: 'female',
    mode: 'upgrade',
    fromSection: 'scout',
    fromBranch: 'land',
    bottom: 'trousers',
  });
  const byId1 = Object.fromEntries(scoutToVenture.map((i) => [i.id, i]));
  assert.equal(byId1['trousers-olive-f']?.status, 'need');
  assert.equal(byId1['socks-short-black']?.status, 'need');
  assert.equal(byId1['shoes-lace']?.status, 'have');
  assert.equal(byId1['skirt-olive'], undefined);
  assert.equal(byId1['tie-maroon']?.optional, true);
  assert.equal(byId1['tie-maroon']?.status, 'check');

  // 2. Venture female (trousers) -> Rover female (trousers): trousers, black socks, lace shoes are ALL reusable (have)
  const ventureToRover = api.buildChecklist({
    section: 'rover',
    branch: 'land',
    gender: 'female',
    mode: 'upgrade',
    fromSection: 'venture',
    fromBranch: 'land',
    bottom: 'trousers',
  });
  const byId2 = Object.fromEntries(ventureToRover.map((i) => [i.id, i]));
  assert.equal(byId2['trousers-olive-f']?.status, 'have');
  assert.equal(byId2['socks-short-black']?.status, 'have');
  assert.equal(byId2['shoes-lace']?.status, 'have');
  assert.equal(byId2['beret-green']?.status, 'need');

  // 3. Rover female (trousers) -> Leader female (land, Uniform No. 6 trousers): swaps hat-leader-f -> beret-green with noteLeaderTrousersHat
  const roverToLeader = api.buildChecklist({
    section: 'leader',
    branch: 'land',
    gender: 'female',
    mode: 'upgrade',
    fromSection: 'rover',
    fromBranch: 'land',
    bottom: 'trousers',
  });
  const byId3 = Object.fromEntries(roverToLeader.map((i) => [i.id, i]));
  assert.equal(byId3['hat-leader-f'], undefined);
  assert.equal(byId3['beret-green']?.status, 'have');
  assert.match(byId3['beret-green']?.detail || '', /編號 6/);
  assert.equal(byId3['trousers-olive-f']?.status, 'have');
});

test('Bilingual completeness: LOCALES.en mirrors all ITEMS, SECTIONS, and updated static HTML keys', () => {
  const api = loadDataSandbox('en');
  const zh = api.LOCALES['zh-HK'];
  const en = api.LOCALES.en;

  assert.deepEqual(Object.keys(en.SECTIONS).sort(), Object.keys(zh.SECTIONS).sort());
  assert.deepEqual(Object.keys(en.ITEMS).sort(), Object.keys(zh.ITEMS).sort());
  assert.ok(
    en.HTML['活動策劃、社會服務、多元技能、戶外探險（舊制：責任、自立、活動、探險）'],
    'Venture 2026 stage badges table cell must have English translation'
  );
  assert.ok(
    en.HTML['本網站為非官方獨立工具，旨在方便成員瀏覽公開資訊，與香港童軍總會無任何官方從屬關係。相關制服規格、訓練綱要及徽號版權歸香港童軍總會所有。'],
    'Updated footer disclaimer must have English translation'
  );
  assert.ok(
    en.HTML['具體要視衣服大小，細碼恤衫間距可能會變小（不會變大）'],
    'Garment-size spacing note must have English translation'
  );
});

test('Uniform Handbook badge-placement board: authentic p.93/p.95 crops, side-by-side sleeve rule, and garment-size note', () => {
  const html = read('index.html');
  const data = read('data.js');

  for (const img of [
    'assets/reference/handbook-pocket-3cm.avif',
    'assets/reference/handbook-sleeve-2cm.avif',
    'assets/reference/handbook-sleeve-1cm.avif',
  ]) {
    assert.ok(existsSync(join(ROOT, img)), `Missing handbook crop: ${img}`);
    assert.ok(html.includes(img), `index.html must reference ${img}`);
  }
  assert.ok(!html.includes('sleeve-placement-example.avif'), 'Must not reuse cub-male crop in badge manual');
  assert.ok(!html.includes('右袖，地域章上方'), 'District badge is side by side with Region badge, not above it');
  assert.ok(!data.includes('旅章、區章、地域章：右袖（由上至下）'), 'data.js must not state District/Region are vertical');
  assert.match(html, /具體要視衣服大小，細碼恤衫間距可能會變小（不會變大）/);
});

test('Scout Shop migration: store.scout.org.hk URLs, 5-digit codes, CDN images, and zero stale hkscoutshop links', () => {
  const api = loadDataSandbox('zh-HK');
  const zhShop = api.LOCALES['zh-HK'].SHOP;
  const enShop = api.LOCALES.en.SHOP;

  assert.equal(api.SHOP_BASE, 'https://store.scout.org.hk/');
  assert.equal(api.SHOP_IMG_BASE, 'https://ssmsuat.scout.org.hk/images/');
  assert.deepEqual(Object.keys(enShop).sort(), Object.keys(zhShop).sort(), 'en.SHOP must mirror all zh-HK.SHOP keys');

  for (const [key, entry] of Object.entries(zhShop)) {
    assert.equal(typeof entry.id, 'number', `${key} must have numeric product id`);
    assert.match(entry.code, /^\d{5}$/, `${key} must have 5-digit product code`);
    assert.equal(typeof entry.price, 'number', `${key} must have numeric price`);
    assert.equal(api.shopUrl(entry), `https://store.scout.org.hk/products/${entry.id}`);
    assert.equal(enShop[key].id, entry.id, `en.SHOP[${key}].id must match zh-HK`);
    assert.equal(enShop[key].code, entry.code, `en.SHOP[${key}].code must match zh-HK`);
    assert.equal(enShop[key].price, entry.price, `en.SHOP[${key}].price must match zh-HK`);

    if (entry.noImg) {
      assert.equal(api.shopImg(entry), null, `${key} with noImg:true must return null image`);
    } else {
      assert.equal(api.shopImg(entry), `https://ssmsuat.scout.org.hk/images/${entry.code}/01.png`);
    }
    assert.equal(Boolean(enShop[key].sizes), Boolean(entry.sizes), `en.SHOP[${key}].sizes presence must match zh-HK`);
    for (const sub of [...(entry.extra || []), ...(entry.alt || [])]) {
      assert.equal(typeof sub.id, 'number', `${key} sub-item must have numeric id`);
      assert.match(sub.code, /^\d{5}$/, `${key} sub-item must have 5-digit code`);
      assert.equal(typeof sub.price, 'number', `${key} sub-item must have numeric price`);
      assert.equal(api.shopUrl(sub), `https://store.scout.org.hk/products/${sub.id}`);
    }
  }

  const ghList = api.buildChecklist({ section: 'grasshopper', branch: 'land', gender: 'male', mode: 'new' });
  assert.match(ghList[0].detail, /91147/);
  assert.match(ghList[0].detail, /100–160 cm/);
  const cubList = Object.fromEntries(api.buildChecklist({ section: 'cub', branch: 'land', gender: 'male', mode: 'new' }).map((i) => [i.id, i]));
  assert.match(cubList['shirt-beige'].detail, /11"–18"/);
  assert.match(cubList['shoes-lace'].detail, /01021/);

  for (const file of ['index.html', 'data.js', 'locale-en.js', 'README.md', 'CREDITS.md', 'GLOSSARY.md']) {
    assert.ok(!read(file).includes('hkscoutshop.org.hk'), `${file} must not contain stale hkscoutshop.org.hk links`);
  }
  assert.match(read('index.html'), /https:\/\/store\.scout\.org\.hk\/shopping-guide\/stores/);
});

test('Native 3D uniform & basic badge viewer: zero external SCOUT3D links, valid 3D geometry, and bilingual parity', () => {
  const api = loadDataSandbox('zh-HK');

  for (const file of ['index.html', 'app.js', 'data.js', 'locale-en.js', 'scout3d.js', 'README.md']) {
    assert.ok(!read(file).includes('scout3d-gamma.vercel.app'), `${file} must not link externally to scout3d-gamma.vercel.app`);
  }
  assert.ok(api.Scout3D && typeof api.Scout3D.createViewer === 'function', 'Scout3D.createViewer must be exported');
  assert.equal(typeof api.Scout3D.buildScene, 'function');
  assert.deepEqual(Object.keys(api.Scout3D.CAMERA_PRESETS).sort(), ['back', 'front', 'left', 'right', 'shoulders']);

  // Verify 6 sections x branches x genders x bottoms generate polygons & badge patches without NaN
  for (const sec of Object.keys(api.SECTIONS)) {
    const zhBadges = api.LOCALES['zh-HK'].SCOUT3D_BADGES[sec] || [];
    const enBadges = api.LOCALES.en.SCOUT3D_BADGES[sec] || [];
    assert.deepEqual(enBadges.map(b => b.id), zhBadges.map(b => b.id), `en/zh SCOUT3D_BADGES ids mismatch for ${sec}`);
    assert.equal(api.LOCALES['zh-HK'].SCOUT3D_MAP[sec]?.length, 4, `zh-HK SCOUT3D_MAP[${sec}] must have 4 views`);
    assert.equal(api.LOCALES.en.SCOUT3D_MAP[sec]?.length, 4, `en SCOUT3D_MAP[${sec}] must have 4 views`);
    for (const card of api.LOCALES.en.SCOUT3D_MAP[sec]) {
      assert.ok(!/[\u3400-\u9FFF]/.test(`${card.view}${card.text}`), `en SCOUT3D_MAP[${sec}] must contain no CJK`);
    }
    for (const badge of enBadges) {
      assert.ok(!/[\u3400-\u9FFF]/.test(`${badge.code}${badge.name}${badge.where}${badge.sizeLabel || ''}${badge.rule}`), `en SCOUT3D_BADGES[${sec}].${badge.id} must contain no CJK`);
    }

    const branches = api.SECTIONS[sec].hasBranch ? ['land', 'sea', 'air'] : ['land'];
    for (const branch of branches) {
      for (const gender of ['male', 'female']) {
        const scene = api.Scout3D.buildScene({ section: sec, branch, gender, bottom: 'skirt' }, zhBadges, { showBadges: true });
        assert.ok(scene.polys.length > 20, `${sec}/${branch}/${gender} must build 3D polygons`);
        const badgePolys = scene.polys.filter(p => p.kind === 'badge');
        assert.ok(badgePolys.length >= zhBadges.length, `${sec}/${branch}/${gender} must render all basic badge patches`);
        for (const p of scene.polys) {
          for (const pt of p.pts) {
            assert.ok(Number.isFinite(pt[0]) && Number.isFinite(pt[1]) && Number.isFinite(pt[2]), `${sec} non-finite coordinate`);
          }
        }
      }
    }
  }

  // Verify Hong Kong Badge swaps from wearer's left (+X) in youth Sections to wearer's right (-X) in Leader
  const cubScene = api.Scout3D.buildScene({ section: 'cub', branch: 'land', gender: 'male' }, api.LOCALES['zh-HK'].SCOUT3D_BADGES.cub);
  const cubHk = cubScene.polys.find(p => p.kind === 'badge' && p.badge.id === 'hongKong');
  assert.ok(cubHk && cubHk.pts[0][0] > 0, 'Youth Hong Kong Badge must sit on wearer left chest (+X)');
  const leaderScene = api.Scout3D.buildScene({ section: 'leader', branch: 'land', gender: 'male' }, api.LOCALES['zh-HK'].SCOUT3D_BADGES.leader);
  const leaderHk = leaderScene.polys.find(p => p.kind === 'badge' && p.badge.id === 'hongKong');
  assert.ok(leaderHk && leaderHk.pts[0][0] < 0, 'Leader Hong Kong Badge must sit on wearer right chest (-X)');

  // Female Land Leader: skirt = No. 3 peaked hat ('hardHat'), trousers = No. 6 dark green beret
  assert.equal(api.Scout3D.getPalette({ section: 'leader', branch: 'land', gender: 'female', bottom: 'skirt' }).hat, 'hardHat');
  assert.equal(api.Scout3D.getPalette({ section: 'leader', branch: 'land', gender: 'female', bottom: 'trousers' }).hat, 'beret');

  for (const id of ['badges-youth', 'patrol-badge', 'badges-leader', 'epaulette-rank']) {
    assert.match(api.LOCALES['zh-HK'].ITEMS[id].detail, /data-scout3d-focus/);
    assert.match(api.LOCALES.en.ITEMS[id].detail, /data-scout3d-focus/);
  }
  assert.match(api.LOCALES['zh-HK'].GRASSHOPPER_ITEM.detail, /data-scout3d-focus/);
  assert.match(api.LOCALES.en.GRASSHOPPER_ITEM.detail, /data-scout3d-focus/);
  assert.match(read('index.html'), /id="scout3d-badge-panel"/);
  assert.match(read('index.html'), /<script src="scout3d\.js"><\/script>/);
});
