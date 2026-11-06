#!/usr/bin/env node
/* ════════════════════════════════════════════════════════════════════════════
   scripts/lint.js — 零依賴「防增肥 + G11 圖標 + 設計反 slop + 雙版號」守護檢查
   對齊 playerkousas-rgb/readme（S/F/A/W/V、docs/33 G11、DESIGN.md、docs/06 Vercel）
   任何一項 ✗ 即 exit 1 —— `npm run build` 在本機與 Vercel 上同樣 fail closed。
   ════════════════════════════════════════════════════════════════════════════ */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
let failed = 0;
const ok = (m) => console.log("✓ " + m);
const bad = (m) => { failed++; console.error("✗ " + m); };

const exists = (f) => fs.existsSync(path.join(ROOT, f));
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");

/* ── 1) S1/S3：package.json 必須零運行期 dependencies ─────────────────────── */
const pkg = JSON.parse(read("package.json"));
if (pkg.dependencies && Object.keys(pkg.dependencies).length) {
  bad(`package.json 有 dependencies：${Object.keys(pkg.dependencies).join(", ")} —— 本站係純靜態 PWA，禁止運行期 npm 依賴`);
} else {
  ok("package.json 零運行期 dependencies（S1/S3）");
}

/* ── 2) S2 + Vercel build 安全：.vercelignore 唔可以擋走 build 必需檔案 ──── */
if (!exists(".vercelignore")) {
  bad("缺 .vercelignore（S2）");
} else {
  const viRaw = read(".vercelignore");
  const lines = viRaw.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  for (const mustBlock of ["node_modules/", ".git/", ".cache/", "*.bak", "*.log", "docs/", "dist/"]) {
    if (viRaw.includes(mustBlock)) ok(`.vercelignore 擋住「${mustBlock}」`);
    else bad(`.vercelignore 漏擋「${mustBlock}」`);
  }
  for (const mustKeep of ["package.json", "build-site.mjs", "scripts/", "DESIGN.md", "CHANGELOG.md", "icons/", "assets/", "index.html", "app.js", "data.js", "locale-en.js", "manifest.webmanifest"]) {
    const blocked = lines.some((pat) => {
      if (pat === "*.md" && mustKeep.endsWith(".md")) return true;
      const cleanPat = pat.replace(/\/$/, "");
      const cleanKeep = mustKeep.replace(/\/$/, "");
      return cleanPat === cleanKeep || cleanKeep.startsWith(cleanPat + "/");
    });
    if (blocked) bad(`.vercelignore 誤擋「${mustKeep}」—— Vercel 行 npm run build 會 ENOENT 失敗`);
  }
  ok(".vercelignore 無誤擋任何 npm run build 必需檔案");
}

/* ── 3) docs/06 + docs/17：vercel.json 標準欄位與安全 headers ────────────── */
if (!exists("vercel.json")) {
  bad("缺 vercel.json");
} else {
  const vj = JSON.parse(read("vercel.json"));
  if (vj.framework === null) ok("vercel.json framework=null");
  else bad("vercel.json framework 必須為 null");
  if (vj.outputDirectory === "dist") ok("vercel.json outputDirectory=dist（只發佈白名單產物）");
  else bad(`vercel.json outputDirectory 應為 "dist"（現為 ${JSON.stringify(vj.outputDirectory)}）`);
  if ((vj.installCommand || "").includes("--include=dev") && !(vj.installCommand || "").includes("--omit=dev")) {
    ok(`vercel.json installCommand=${vj.installCommand}`);
  } else {
    bad("vercel.json installCommand 必須含 --include=dev 且不含 --omit=dev");
  }
  if (Array.isArray(vj.regions) && vj.regions.includes("hkg1")) ok("vercel.json regions 含 hkg1");
  else bad("vercel.json regions 應設 [\"hkg1\"]");
  const allHeaderKeys = (vj.headers || []).flatMap((h) => (h.headers || []).map((x) => x.key));
  for (const secHeader of ["X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy"]) {
    if (!allHeaderKeys.includes(secHeader)) bad(`vercel.json 缺安全 header：${secHeader}`);
  }
  ok("vercel.json 4 條安全 headers 齊備");
}

/* ── 4) W1 + V1/V2：版權標示與單一版號真理（package.json ↔ index.html ↔ CHANGELOG） */
const html = read("index.html");
const appVerMeta = (html.match(/<meta\s+name=["']app-version["']\s+content=["']([^"']+)["']/i) || [])[1];
const appVerConst = (html.match(/const\s+APP_VERSION\s*=\s*["']([^"']+)["']/) || [])[1];
const genVer = (html.match(/GENERATED from\s+\S+_v(\d+\.\d+\.\d+)\.html\s*\(v(\d+\.\d+\.\d+)\)/) || [])[1];
if (!/<meta\s+name=["']copyright["']\s+content=["']© SCOUT SYSTEM["']/i.test(html)) {
  bad("index.html 缺 <meta name=\"copyright\" content=\"© SCOUT SYSTEM\">（W1）");
} else {
  ok("index.html 有 W1 copyright meta");
}
if (!html.includes(`© 2026 SCOUT SYSTEM · v${pkg.version}`)) {
  bad(`index.html 頁尾缺可見版權＋版號「© 2026 SCOUT SYSTEM · v${pkg.version}」（W1/V2）`);
} else {
  ok(`index.html 頁尾版權＋版號一致（v${pkg.version}）`);
}
if (appVerMeta !== pkg.version || appVerConst !== pkg.version || genVer !== pkg.version) {
  bad(`版號唔一致：package.json(${pkg.version}) vs meta(${appVerMeta}) vs APP_VERSION(${appVerConst}) vs GENERATED(${genVer})`);
} else {
  ok(`單一版號真理一致：v${pkg.version}`);
}
if (exists("CHANGELOG.md") && !read("CHANGELOG.md").includes(`[${pkg.version}]`)) {
  bad(`CHANGELOG.md 未記錄當前版號 [${pkg.version}]（V 規則）`);
} else if (exists("CHANGELOG.md")) {
  ok(`CHANGELOG.md 已記錄 [${pkg.version}]`);
}

/* ── 5) G11 圖標標準（docs/33）：9 個 PNG/ICO 檔、尺寸、≤260KB、5 link、4 OG、manifest 4 icon、?v= 同步 */
const ICON_SPEC = [
  ["icons/favicon.ico", 0, 0],
  ["icons/favicon-16.png", 16, 16],
  ["icons/favicon-32.png", 32, 32],
  ["icons/apple-touch-icon.png", 180, 180],
  ["icons/icon-192.png", 192, 192],
  ["icons/icon-512.png", 512, 512],
  ["icons/icon-maskable-192.png", 192, 192],
  ["icons/icon-maskable-512.png", 512, 512],
  ["icons/og-image.png", 1200, 630]
];
const iconProblems = [];
let iconBytes = 0;
for (const [f, w, h] of ICON_SPEC) {
  if (!exists(f)) { iconProblems.push(`缺 ${f}`); continue; }
  const buf = fs.readFileSync(path.join(ROOT, f));
  iconBytes += buf.length;
  if (w) {
    if (buf.subarray(1, 4).toString() !== "PNG") { iconProblems.push(`${f} 唔係 PNG`); continue; }
    const pw = buf.readUInt32BE(16), ph = buf.readUInt32BE(20);
    if (pw !== w || ph !== h) iconProblems.push(`${f} 尺寸 ${pw}×${ph}，應為 ${w}×${h}`);
  } else {
    // ICO header: reserved=0, type=1, count>=3
    if (buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1 || buf.readUInt16LE(4) < 3) {
      iconProblems.push(`${f} 唔係含 ≥3 層尺寸（16/32/48）嘅合法 ICO`);
    }
  }
}
if (iconBytes > 260 * 1024) iconProblems.push(`9 個圖標合計 ${(iconBytes / 1024).toFixed(1)}KB > 260KB 上限`);

const needLinks = [
  ['href="icons/favicon.ico?v=', "favicon.ico link"],
  ['sizes="16x16"', "16×16 PNG link"],
  ['sizes="32x32"', "32×32 PNG link"],
  ['rel="apple-touch-icon"', "apple-touch-icon 180 link"],
  ['rel="manifest"', "manifest link"]
];
for (const [needle, label] of needLinks) {
  if (!html.includes(needle)) iconProblems.push(`index.html <head> 缺 ${label}`);
}

const ogImg = (html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/) || [])[1];
if (!ogImg) iconProblems.push("index.html 缺 og:image");
else if (!/^https:\/\/upgrade-ashen\.vercel\.app\/icons\/og-image\.png\?v=/.test(ogImg)) {
  iconProblems.push(`og:image 必須用正式域名絕對路徑（現為 ${ogImg}）`);
}
for (const prop of ["og:image:width", "og:image:height", "og:title", "og:description"]) {
  if (!html.includes(`property="${prop}"`)) iconProblems.push(`index.html 缺 ${prop}`);
}

const mfRaw = read("manifest.webmanifest");
const mf = JSON.parse(mfRaw);
const mfIcons = Array.isArray(mf.icons) ? mf.icons : [];
for (const sz of ["192x192", "512x512"]) {
  if (!mfIcons.some((i) => i.sizes === sz && i.purpose === "any" && i.type === "image/png")) {
    iconProblems.push(`manifest.webmanifest 缺 PNG any ${sz}`);
  }
  if (!mfIcons.some((i) => i.sizes === sz && i.purpose === "maskable" && i.type === "image/png")) {
    iconProblems.push(`manifest.webmanifest 缺 PNG maskable ${sz}`);
  }
}
if (mf.theme_color !== "#1B4332" || mf.background_color !== "#1B4332") {
  iconProblems.push("manifest theme_color / background_color 必須與圖標底色 #1B4332 對齊");
}

const iconVer = (html.match(/const\s+ICON_VER\s*=\s*"([^"]+)"/) || [])[1];
if (!iconVer) {
  iconProblems.push("index.html 缺 const ICON_VER");
} else {
  const htmlVers = [...html.matchAll(/[?&]v=([0-9A-Za-z._-]+)/g)].map((m) => m[1]);
  const mfVers = [...mfRaw.matchAll(/[?&]v=([0-9A-Za-z._-]+)/g)].map((m) => m[1]);
  if (!htmlVers.length || htmlVers.some((v) => v !== iconVer)) {
    iconProblems.push(`index.html ?v= 必須全部等於 ICON_VER(${iconVer})`);
  }
  if (!mfVers.length || mfVers.some((v) => v !== iconVer)) {
    iconProblems.push(`manifest.webmanifest ?v= 必須全部等於 ICON_VER(${iconVer})`);
  }
}

if (iconProblems.length) iconProblems.forEach((p) => bad("G11 圖標標準：" + p));
else ok(`G11 圖標標準 9 檔齊全、尺寸無誤、合計 ${(iconBytes / 1024).toFixed(1)}KB ≤ 260KB、ICON_VER(${iconVer}) 同步`);

/* ── 6) 設計 house rules（DESIGN.md + design-review 反 slop） ───────────── */
const designProblems = [];
if (!exists("DESIGN.md")) designProblems.push("缺 DESIGN.md（設計語言唯一真理）");
const uiSource = [html, read("app.js")].join("\n");
const gradientHits = (uiSource.match(/(linear|radial|conic)-gradient\(/g) || []).length;
if (gradientHits) designProblems.push(`UI 仍有 ${gradientHits} 處 CSS gradient（DESIGN.md 規定一律用實色表面）`);
const eyebrowHits = (uiSource.match(/eyebrow|text-transform:\s*uppercase/g) || []).length;
if (eyebrowHits) designProblems.push(`UI 出現 ${eyebrowHits} 處 eyebrow / uppercase 裝飾標籤`);
const glowHits = (uiSource.match(/(?<!backdrop-)filter:\s*(blur|drop-shadow)\(/g) || []).length;
if (glowHits) designProblems.push(`UI 出現 ${glowHits} 處裝飾性 blur / drop-shadow`);

if (designProblems.length) designProblems.forEach((p) => bad("設計規則：" + p));
else ok("設計 house rules：0 gradient / 0 eyebrow / 0 裝飾光暈，DESIGN.md 存在");

/* ── 7) 外部 script 供應鏈白名單（只准已記錄嘅 Vercel Web Analytics） ──────── */
const extScripts = [...html.matchAll(/<script[^>]+src=["'](https?:\/\/[^"']+)["'][^>]*>/gi)].map((m) => m[1]);
const ALLOWED_EXT_SCRIPTS = new Set(["https://cdn.vercel-insights.com/v1/script.js"]);
for (const u of extScripts) {
  if (!ALLOWED_EXT_SCRIPTS.has(u)) {
    bad(`未授權外部 script：${u}（如確需外部 CDN，必須鎖死精確版本＋SRI integrity）`);
  }
}
ok(`外部 script 檢查通過（白名單 ${extScripts.length} 項）`);

console.log("");
if (failed) {
  console.error(`❌ lint 失敗：共 ${failed} 項未達標`);
  process.exit(1);
}
console.log("✅ lint 通過：S/F/A/W/V、G11 圖標與 DESIGN.md 規則全部達標");
