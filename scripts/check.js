#!/usr/bin/env node
/* ============================================================
   靜態檢查 — 零依賴,只用 Node 內建模組 (npm run check)
   1. JS 語法檢查 (node --check)
   2. 代碼引用的每個 assets/ 檔案必須存在
   3. 每個 assets/ 檔案必須被引用(反死重守門)
   4. manifest 圖示存在
   5. 防增肥守門:不允許 node_modules/、uploads/、*.bak/*.tmp/*.log 等進倉庫
   ============================================================ */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');
let failures = 0;
const ok = msg => console.log(`  ✓ ${msg}`);
const fail = msg => { console.error(`  ✗ ${msg}`); failures++; };
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

console.log('── 1. JS 語法 ──');
for (const f of ['data.js', 'locale-en.js', 'app.js', 'scripts/check.js']) {
  try {
    execFileSync(process.execPath, ['--check', path.join(ROOT, f)], { stdio: 'pipe' });
    ok(f);
  } catch (e) {
    fail(`${f}: ${String(e.stderr || e.message).trim()}`);
  }
}

console.log('── 2. 代碼引用的資產必須存在 ──');
const ENTRY_FILES = ['index.html', 'app.js', 'data.js', 'locale-en.js', 'manifest.webmanifest'];
const REF_RE = /assets\/[A-Za-z0-9_./-]+\.(?:jpe?g|png|webp|avif|svg|gif|ico|css|js|webmanifest)/g;
const codeRefs = new Set();
for (const f of ENTRY_FILES) {
  const m = read(f).match(REF_RE);
  if (m) m.forEach(r => codeRefs.add(r));
}
let missing = 0;
for (const ref of [...codeRefs].sort()) {
  if (fs.existsSync(path.join(ROOT, ref))) ok(ref);
  else { fail(`引用了不存在的檔案:${ref}`); missing++; }
}
if (missing === 0) ok(`共 ${codeRefs.size} 個資產引用全部存在`);

console.log('── 3. 每個資產檔案必須被引用(反死重) ──');
function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}
const codeCorpus = ENTRY_FILES.map(read).join('\n');
const dataJs = read('data.js');
let dead = 0;
for (const abs of walk(path.join(ROOT, 'assets'))) {
  const rel = path.relative(ROOT, abs).split(path.sep).join('/');
  if (rel.endsWith('README.md')) continue;
  // 字面引用,或 data.js 以 base 名動態拼出(assets/reference/${file}.avif)
  const used = codeCorpus.includes(rel) || codeCorpus.includes(`assets/${rel}`)
    || dataJs.includes(path.basename(rel, path.extname(rel)));
  if (used) ok(rel);
  else { fail(`未被任何代碼引用的死重檔案:${rel}`); dead++; }
}

console.log('── 4. PWA manifest ──');
try {
  const manifest = JSON.parse(read('manifest.webmanifest'));
  for (const icon of manifest.icons) {
    if (fs.existsSync(path.join(ROOT, icon.src))) ok(icon.src);
    else { fail(`manifest 圖示不存在:${icon.src}`); dead++; }
  }
} catch (e) {
  fail(`manifest.webmanifest 不是有效 JSON:${e.message}`);
}

console.log('── 5. 防增肥守門 ──');
const BLOAT_PATTERNS = [
  /(^|\/)node_modules(\/|$)/,
  /(^|\/)uploads(\/|$)/,
  /(^|\/)dist(\/|$)/,
  /(^|\/)build(\/|$)/,
  /(^|\/)\.cache(\/|$)/,
  /(^|\/)test-results(\/|$)/,
  /(^|\/)playwright-report(\/|$)/,
  /\.(bak|tmp|old|log|swp)$/i,
  /^\.DS_Store$/,
  /^Thumbs\.db$/,
  /(^|\/)assets\/images(\/|$)/ // 已停用的舊 AI 插畫資料夾,不許復活
];
// 5a. Git 追蹤的檔案絕對不許包含肥重(這才是會進部署的)
let bloat = 0;
try {
  const tracked = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' })
    .split('\n').filter(Boolean);
  for (const rel of tracked) {
    if (BLOAT_PATTERNS.some(re => re.test(rel))) {
      fail(`Git 追蹤了應排除的肥重檔案:${rel}(請移除並加入 .gitignore)`);
      bloat++;
    }
  }
  if (bloat === 0) ok(`Git 追蹤的 ${tracked.length} 個檔案無肥重`);
} catch (e) {
  fail(`git ls-files 失敗,無法檢查追蹤檔案:${e.message}`);
}
// 5b. 本地工作區:gitignore 涵蓋的本地目錄(node_modules 等)屬預期,直接跳過;
//     其餘位置若出現死重備份檔仍要攔截
const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', '.cache', 'test-results', 'playwright-report']);
function* walkSafe(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { if (!SKIP_DIRS.has(entry.name)) yield* walkSafe(p); }
    else yield p;
  }
}
for (const abs of walkSafe(ROOT)) {
  const rel = path.relative(ROOT, abs).split(path.sep).join('/');
  if (BLOAT_PATTERNS.some(re => re.test(rel))) {
    fail(`工作區發現死重檔案:${rel}`);
    bloat++;
  }
}
if (bloat === 0) ok('工作區無 *.bak / *.tmp / *.log / uploads 等死重檔案');

console.log('');
if (failures) {
  console.error(`❌ 檢查失敗:${failures} 項問題。`);
  process.exit(1);
}
console.log('✅ 全部通過:語法正常、資產零死重、manifest 完整、無肥重檔案。');
