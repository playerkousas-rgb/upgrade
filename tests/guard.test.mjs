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
  vm.createContext(ctx);
  vm.runInContext(
    `${read('data.js')}\n${read('locale-en.js')}\nLANG = ${JSON.stringify(lang)};\n` +
    `this.__api = { SECTIONS, BRANCHES, ITEMS, SHOP, UNIFORM_SPEC, LOCALES, buildChecklist, hasLowerBodyChoice, applyLowerBodyChoice, getSpec, officialPhoto, itemImageSources, setLang: (l) => { LANG = l; } };`,
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
