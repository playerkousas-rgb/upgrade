#!/usr/bin/env node
/* ============================================================
   照片資產 AVIF 轉換工具(開發用,非常駐依賴)
   用法:
     npm i --no-save --package-lock=false sharp
     node scripts/to-avif.js                 # 預設:assets/reference/*.webp + assets/items/*.jpg
     node scripts/to-avif.js path/to/x.webp  # 或指定檔案
   原則:
     - quality 70(官方參考圖以忠實為先;帽章細節不犧牲)
     - 每張轉完先解碼驗證,AVIF 較大或解碼失敗 → 保留原檔
     - 轉換後須同步更新:data.js 引用、tests/images.spec.js、
       scripts/smoke.js(MIME + 斷言)、scripts/check.js(REF_RE)、
       vercel.json(快取 headers 的副檔名)、assets/reference/README.md(來源記錄)
   ============================================================ */
const fs = require('node:fs');
const path = require('node:path');

let sharp;
try { sharp = require('sharp'); }
catch { console.error('需要先安裝 sharp(僅開發用):npm i --no-save --package-lock=false sharp'); process.exit(1); }

const ROOT = path.join(__dirname, '..');
const QUALITY = 70;

function listFiles(dir, exts) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isFile() && exts.includes(path.extname(e.name))) out.push(path.join(dir, e.name));
  }
  return out;
}

(async () => {
  let targets = process.argv.slice(2).map(f => path.resolve(f));
  if (!targets.length) {
    targets = listFiles(path.join(ROOT, 'assets/reference'), ['.webp'])
      .concat(listFiles(path.join(ROOT, 'assets/items'), ['.jpg', '.jpeg', '.png']));
  }
  let saved = 0, kept = 0, failed = 0;
  for (const file of targets) {
    const before = fs.statSync(file).size;
    const out = file.replace(/\.(webp|jpe?g|png)$/i, '.avif');
    try {
      await sharp(file, { animated: false }).avif({ quality: QUALITY, effort: 6 }).toFile(out + '.tmp');
      // 解碼驗證:必須能完整解出像素
      const meta = await sharp(out + '.tmp').metadata();
      if (!meta.width || !meta.height) throw new Error('metadata 異常');
      await sharp(out + '.tmp').raw().toBuffer();
      const after = fs.statSync(out + '.tmp').size;
      fs.renameSync(out + '.tmp', out);
      fs.unlinkSync(file);
      saved += before - after;
      console.log(`✓ ${path.relative(ROOT, file)} (${before}B) → ${path.relative(ROOT, out)} (${after}B, quality ${QUALITY})`);
    } catch (e) {
      try { fs.unlinkSync(out + '.tmp'); } catch {}
      failed++;
      console.error(`✗ ${path.relative(ROOT, file)}: 轉換失敗,保留原檔 — ${e.message}`);
    }
  }
  console.log('');
  console.log(failed ? `❌ ${failed} 個檔案轉換失敗(已保留原檔)` : `✅ 全部成功,共節省 ${(saved / 1024).toFixed(1)} KB`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
