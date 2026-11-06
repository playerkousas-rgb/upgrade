# ADR 0001 — 採用零依賴 `build-site.mjs` 白名單 `dist/` 發佈與 G11 原生 MVG 圖標管線

- **Status**: accepted（2026-11-06）
- **Context**：升級對齊 `playerkousas-rgb/readme` 時，真理倉要求倉庫同時具備治理文件（`AGENTS.md`、`SCOPE.md`、`AUDIT.md`、`DESIGN.md`、`skills/`、`scripts/*_v1.0.mjs`）與純淨輕量嘅 Vercel 線上發佈（`outputDirectory: "dist"`、S4 只發佈最終產物、S7 `< 5 MB`），同時要求全套 9 個 G11 標準 PNG／ICO 圖標可重現生成。過往直接以根目錄 `.` 發佈再靠 `.vercelignore` 用 `*.md` 過濾，容易出現「建置腳本要驗 `DESIGN.md` 卻被 `.vercelignore` 擋走導致 Vercel build 失敗」嘅矛盾。
- **Decision**：
  1. 新增零 npm 依賴之 `build-site.mjs`，明確將運行期白名單（`index.html`、`app.js`、`data.js`、`locale-en.js`、`manifest.webmanifest`、`icons/*`、`assets/{badges,items,reference}/*` 圖片）複製至 `dist/`（約 580 KB），令治理文件可安全保留在建置環境供 `scripts/lint.js` 驗證，而絕不流入線上 CDN。
  2. 以純 ImageMagick 內建 MVG／`annotate` 編寫 `scripts/make-icons.sh`（不依賴外部 `rsvg-convert` 或 CJK 字型），一鍵重現 `icons/*` 9 個合規 PNG8／ICO 檔案（合計約 45 KB）。
- **Consequences**：本機仍可直接開根目錄 `index.html` 或行 `npm run dev` 預覽；Vercel 與 CI 行 `npm run build` 即可同時完成資產檢查、設計反 slop 檢查及 `dist/` 組裝，並與 `.github/workflows/verify-live.yml` 嘅線上 SHA-256 比對完全一致。
