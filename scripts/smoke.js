#!/usr/bin/env node
/* ============================================================
   快速功能煙霧測試 — 本地起 HTTP server,用 jsdom 載入真實
   index.html + data.js + app.js,走真實 origin(localStorage 可用)
   (零瀏覽器、快速,適合 CI 初篩;完整回歸仍以 tests/*.spec.js Playwright 為準)
   npm run smoke
   ============================================================ */
const path = require('node:path');
const fs = require('node:fs');
const http = require('node:http');
const { JSDOM } = require('jsdom');

const ROOT = path.join(__dirname, '..');
let failures = 0;
const ok = msg => console.log(`  ✓ ${msg}`);
const fail = msg => { console.error(`  ✗ ${msg}`); failures++; };
const check = (cond, msg) => (cond ? ok(msg) : fail(msg));

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml' };

function startServer() {
  const server = http.createServer((req, res) => {
    const p = path.normalize(path.join(ROOT, decodeURIComponent(req.url.split('?')[0])));
    if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
    res.end(fs.readFileSync(p));
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

(async () => {
  const server = await startServer();
  const baseURL = `http://127.0.0.1:${server.address().port}`;
  const windowErrors = [];
  const scriptErrors = [];
  const { VirtualConsole } = require('jsdom');
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => {
    const m = String(e.message || e);
    if (/Could not load script|Uncaught/i.test(m)) scriptErrors.push(m);
    // 外站圖片載入失敗屬預期(onerror 回退路徑),不計為失敗
  });

  const dom = await JSDOM.fromURL(`${baseURL}/index.html`, {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole: vc
  });
  const { window } = dom;
  window.addEventListener('error', e => windowErrors.push(e.message));
  const ev = expr => window.eval(expr); // const 綁定不在 window 上,用 eval 取
  await new Promise(r => setTimeout(r, 800)); // 等資源載入/外站圖片回退

  const $ = id => window.document.getElementById(id);
  const d = window.document;
  const parts = d.querySelectorAll('.container > details.part');

  console.log('── 初始化 ──');
  check(scriptErrors.length === 0, `data.js/app.js 載入無錯（${scriptErrors[0] || 'OK'}）`);
  check(windowErrors.length === 0, `無腳本執行錯誤（${windowErrors[0] || 'OK'}）`);
  check(parts.length === 13, `13 個 PART（實際 ${parts.length}）`);
  check([...parts].filter(p => p.open).map(p => p.id).join(',') === 'part-situation,part-options',
    '初始只展開 ①②');
  check($('part-toolbar') && $('part-toolbar').hidden === false, '開合工具列已顯示');

  console.log('── 清單核心邏輯 (data.js buildChecklist) ──');
  const countItems = () => d.querySelectorAll('#checklist .item').length;
  check(countItems() === 10, `幼童軍・陸・男・升團 = 10 項（實際 ${countItems()}）`);
  const statusOf = id => {
    const el = d.querySelector(`#checklist [data-item-id="${id}"]`);
    return el ? el.className.match(/(need|have|check)/)[1] : null;
  };
  check(statusOf('capbadge-cub') === 'check', '幼童軍帽章 = 向團長查詢');
  check(statusOf('scarf') === 'check', '幼童軍旅巾 = 向團長查詢');

  window.selectSection('scout');
  window.setSource(null);
  check(countItems() === 11, `童軍・陸・男・全新加入 = 11 項（實際 ${countItems()}）`);
  check(d.querySelector('#checklist [data-item-id="patrol-badge"]') !== null, '童軍含小隊章');

  window.selectSection('venture');
  window.setSource('scout');
  window.setBranch('from', 'land');
  window.setBranch('to', 'sea');
  window.setGender('male');
  check(statusOf('cap-sea-leader-m') === 'need', '陸升海深資:海童軍領袖白頂帽需購買');
  check(statusOf('capbadge-venture-sea') === 'need', '陸升海深資:海童軍帽章需購買(與陸童軍帽章不同款)');
  check(statusOf('woggle-scout') === 'have', '陸升海深資:童軍巾圈可沿用');
  check(statusOf('belt') === 'have', '陸升海深資:皮帶可沿用');

  window.selectSection('leader');
  window.setSource('rover');
  window.setBranch('from', 'land');
  window.setBranch('to', 'land');
  window.setGender('male');
  check(countItems() === 11, `領袖・陸・男・由樂行升任 = 11 項（實際 ${countItems()}）`);
  check(statusOf('beret-green') === 'have', '樂行升領袖:深綠色軟帽可沿用');
  check(statusOf('capbadge-rank') === 'check', '職級帽章 = 向團長查詢');
  check(statusOf('badges-leader') === 'need', '領袖徽章 = 需購買');
  check(statusOf('epaulette-rank') === 'check', '職級肩章 = 向團長查詢');

  // 官方手冊將深資／樂行海童軍帽章列為同一款
  const seaBadge = window.buildChecklist({ section: 'rover', branch: 'sea', gender: 'female',
    mode: 'upgrade', fromSection: 'venture', fromBranch: 'sea' })
    .find(i => i.id === 'capbadge-rover-sea');
  check(seaBadge && seaBadge.status === 'have', '深資海→樂行海:海童軍帽章同一款可沿用');

  console.log('── 本地參考圖 / 官方圖映射 ──');
  const local = window.officialPhoto('cub', 'land', 'male').images;
  check(local[0].src === 'assets/reference/cub-male.avif', '幼童軍男本地圖優先');
  check(local.length === 2, '本地圖失敗可回退官方原圖');
  check(window.officialPhoto('rover', 'air', 'female') !== null, '樂行空女有官方原圖路徑');
  check(window.officialPhoto('scout', 'unknown', 'male') === null, '未知類型回傳 null');
  const refSet = ev(`(() => {
    const s = new Set([...Object.values(ITEM_REFERENCES), itemReference('capbadge-cub','female')].map(r => r.src));
    for (const [sec, branches] of Object.entries(LOCAL_UNIFORMS))
      for (const [b, genders] of Object.entries(branches))
        for (const g of Object.keys(genders)) s.add(officialPhoto(sec, b, g).images[0].src);
    return [...s];
  })()`);
  check(refSet.length === 15, `15 張本地參考圖（實際 ${refSet.length}）`);
  check(refSet.every(p => p.startsWith('assets/reference/') && p.endsWith('.avif')),
    '參考圖全部為本地 avif');

  console.log('── 預算 ──');
  check($('budget-dynamic').textContent.includes('合計'), '領袖預算表有合計');
  window.selectSection('cub');
  window.setSource(null);
  check($('budget-dynamic').textContent.includes('已連帽，毋須另購'), '幼童軍預算注記帽章已隨帽');
  check($('budget-dynamic').textContent.includes('全新全購'), '幼童軍全新加入標示正確');

  console.log('── 狀態持久化 (localStorage) ──');
  const key = window.contextKey() + '-belt';
  window.toggleOwned(key);
  check(window.isOwned(key) === true, 'mark 已有生效');
  const stored = JSON.parse(window.localStorage.getItem('scout_owned_v2'));
  check(stored[key] === true, 'localStorage 已寫入');
  window.toggleOwned(key);
  check(window.isOwned(key) === false, '再 mark 一次可取消');

  console.log('── PART 開合 ──');
  const part = d.getElementById('part-checklist');
  part.open = true;
  part.dispatchEvent(new window.Event('toggle'));
  const partStates = JSON.parse(window.localStorage.getItem('scout_parts_v1'));
  check(partStates['part-checklist'] === true, 'PART 開合狀態已持久化');
  window.setAllParts(false);
  check([...parts].filter(p => p.open).length === 0, '全部收起');
  window.setAllParts(true);
  const visibleParts = [...parts].filter(p => p.style.display !== 'none');
  const hiddenParts = [...parts].filter(p => p.style.display === 'none');
  check(visibleParts.every(p => p.open), `全部展開(只限目前顯示的 ${visibleParts.length} 個 PART)`);
  check(hiddenParts.every(p => p.open === false), '被篩選隱藏的 PART 不受全部展開影響(與 Playwright 測試一致)');

  console.log('── 英文版 (locale-en.js) ──');
  const langBtn = d.getElementById('fab-lang');
  check(!!langBtn, '右上角語言掣存在');
  check(langBtn && langBtn.textContent === 'EN', '中文介面時語言掣顯示「EN」');
  check(window.eval('typeof LOCALES === "object" && !!LOCALES.en'), '英文語言包已掛上');
  check(window.eval('Object.keys(LOCALES.en.ITEMS).length') === window.eval('Object.keys(LOCALES["zh-HK"].ITEMS).length'),
    '英文 ITEMS 數量與中文一致');
  check(window.eval('Object.keys(LOCALES.en.SHOP).length') === window.eval('Object.keys(LOCALES["zh-HK"].SHOP).length'),
    '英文 SHOP 數量與中文一致');

  window.setLang('en');
  check(window.eval('LANG') === 'en', 'LANG 已切換為 en');
  check(d.documentElement.lang === 'en', '<html lang="en">');
  check(d.title === 'Scout Uniform Guide', '英文 <title>：' + d.title);
  check(d.querySelector('header .brand h1').textContent === 'Scout Uniform Guide', '英文標題列');
  check(d.querySelector('header .brand p').textContent.indexOf('Grasshopper') !== -1, '英文副題');
  check($('expand-all-parts').textContent === 'Expand all', '開合工具列已翻譯');
  check(d.querySelector('#part-situation h2').textContent.indexOf('Pick your joining situation') !== -1, 'PART ①標題已翻譯');
  const cssText = Array.from(d.querySelectorAll('style')).map(el => el.textContent).join('\n');
  check(cssText.indexOf('html[lang="en"] .part-toggle::before{content:"Expand"}') !== -1 &&
        cssText.indexOf('html[lang="en"] .part[open] > summary .part-toggle::before{content:"Collapse"}') !== -1,
    'PART 開合提示已提供英文版（CSS html[lang="en"]）');
  check(d.querySelector('#checklist .item').textContent.indexOf('To buy') !== -1 ||
        d.querySelector('#checklist .item').textContent.indexOf('Reuse') !== -1, '清單狀態標籤已翻譯');
  check(d.querySelector('#badges-overview').textContent.indexOf('Membership badge') !== -1, '進度性獎章總覽已翻譯');
  check(d.querySelector('#transition-content').textContent.indexOf('Grasshopper Scout') !== -1, '升團過渡 Q&A 已翻譯');
  check(d.querySelector('#badge-timeline').textContent.indexOf('badge journey') !== -1, '獎章歷程圖已翻譯');
  check($('budget-dynamic').textContent.indexOf('Total') !== -1, '預算表已翻譯');
  check(langBtn && langBtn.textContent === '中文', '英文介面時語言掣顯示「中文」');
  check(window.localStorage.getItem('scout-guide-lang-v1') === 'en', '語言設定已寫入 localStorage');

  // 靜態 HTML 覆蓋率：切到英文後仍然有中文的純文字（只容許已知的網址／時間／符號）
  const ALLOWED = ['www.hkscoutshop.org.hk ↗', '11:30 – 19:30', '11:00 – 19:00', '10:00 – 18:00',
    '❌', '2957 6444', 'SCOUT SHOP', 'scout.org.hk', 'uniform.scouting.org.hk', 'www.hkscoutshop.org.hk', ')',
    '中文']; // 語言掣在英文介面顯示「中文」，屬預期
  const cjkLeft = window.eval(`(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    const out = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement && /^(SCRIPT|STYLE)$/.test(node.parentElement.tagName)) continue;
      const text = node.data.trim();
      if (text && /[\u3400-\u9FFF]/.test(text)) out.push(text);
    }
    return out;
  })()`);
  const notTranslated = cjkLeft.filter(text => ALLOWED.indexOf(text) === -1);
  check(notTranslated.length === 0,
    `英文版靜態文字已全部翻譯（${cjkLeft.length} 個容許保留，其餘 ${notTranslated.length} 個：${notTranslated.slice(0, 5).join(' | ')}）`);

  window.setLang('zh-HK');
  check(window.eval('LANG') === 'zh-HK', '可切回中文');
  check(d.title === '童軍準備指南', '中文 <title> 還原');
  check(d.querySelector('header .brand h1').textContent === '童軍準備指南', '中文標題列還原');
  check($('expand-all-parts').textContent === '全部展開', '開合工具列還原');
  check(d.querySelector('#badge-timeline').textContent.indexOf('獎章歷程') !== -1, '獎章歷程圖還原');

  console.log('');
  if (windowErrors.length) fail(`執行期間錯誤:${windowErrors.slice(0, 3).join(' | ')}`);
  server.close();
  if (failures) { console.error(`❌ smoke 失敗:${failures} 項。`); process.exit(1); }
  console.log('✅ smoke 全部通過:核心清單比較、海陸空、領袖來源、徽章沿用、參考圖、預算、持久化、開合皆正常。');
  process.exit(0);
})().catch(e => { console.error('❌ smoke 異常:', e); process.exit(1); });
