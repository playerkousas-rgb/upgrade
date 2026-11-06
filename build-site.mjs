#!/usr/bin/env node
/**
 * build-site.mjs — 零第三方依賴靜態部署組裝器（S4：只部署最終運行期產物入 dist/）
 *
 * 1. 只複製前端真正用到嘅檔案入 dist/：
 *    - index.html, app.js, data.js, locale-en.js, manifest.webmanifest
 *    - icons/*（G11 標準 9 個 PNG/ICO 檔）
 *    - assets/{badges,items,reference}/*（只複製圖片／SVG，唔複製任何 README.md）
 * 2. 自動計算 dist/ 總體積並驗證 < 5 MB（S7 硬閘門）。
 *
 * 本機開發可直接開根目錄 index.html 或行 `npm run dev`；Vercel 部署行 `npm run build`。
 */
import { rmSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');

const ROOT_FILES = [
  'index.html',
  'app.js',
  'data.js',
  'locale-en.js',
  'manifest.webmanifest',
];

const RUNTIME_EXT = new Set(['.png', '.ico', '.svg', '.avif', '.webp']);

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

let count = 0;
let totalBytes = 0;

function ship(relPath) {
  const src = join(ROOT, relPath);
  const dst = join(DIST, relPath);
  mkdirSync(dirname(dst), { recursive: true });
  copyFileSync(src, dst);
  count++;
  totalBytes += statSync(dst).size;
}

for (const f of ROOT_FILES) ship(f);

for (const f of readdirSync(join(ROOT, 'icons')).sort()) {
  if (RUNTIME_EXT.has(extname(f).toLowerCase())) {
    ship(`icons/${f}`);
  }
}

for (const sub of ['badges', 'items', 'reference']) {
  const dir = join(ROOT, 'assets', sub);
  for (const f of readdirSync(dir).sort()) {
    if (RUNTIME_EXT.has(extname(f).toLowerCase())) {
      ship(`assets/${sub}/${f}`);
    }
  }
}

const LIMIT = 5 * 1024 * 1024;
if (totalBytes >= LIMIT) {
  console.error(`❌ dist/ 超過 S7 5MB 上限：${(totalBytes / 1048576).toFixed(2)} MB`);
  process.exit(1);
}

console.log(`✅ dist/ 已組裝：${count} 個運行期檔案，合計 ${(totalBytes / 1024).toFixed(1)} KB（S7 上限 5 MB）`);
