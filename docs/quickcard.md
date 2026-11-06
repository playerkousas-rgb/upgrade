# 童軍準備指南（upgrade）— 一頁紙速查

> 完整版：[README.md](../README.md) · 邊界：[SCOPE.md](../SCOPE.md) · 術語：[GLOSSARY.md](../GLOSSARY.md) · 設計：[DESIGN.md](../DESIGN.md)

## 開工三步

1. `node scripts/preflight_v1.0.mjs . --json`（確認 `ok: true`）
2. 本機預覽：`npm run dev`（或直接開 `index.html`）
3. 交付前：`npm run build && npm test && node scripts/final_check_v1.0.mjs --json`

## 五大鐵律

| 鐵律 | 本倉實踐 |
|---|---|
| **S 瘦身** | 零 runtime npm 依賴；`build-site.mjs` 只打包運行期白名單入 `dist/`（約 580 KB << 5 MB） |
| **F 防呆** | `localStorage` 包 `try/catch`；遠端圖片失敗降級至文字來源連結；`lint.js` 防 `.vercelignore` 誤擋建置檔 |
| **A 安全** | 無後端、無 API key；4 條安全 HTTP headers；GitHub Actions 釘死完整 commit SHA |
| **W 版權** | `<meta name="copyright">` + 頁尾 `© 2026 SCOUT SYSTEM`；官方素材按 [CREDITS.md](../CREDITS.md) 標清來源 |
| **V 雙版號** | `package.json` ↔ `index.html`（`GENERATED` / `app-version` / `APP_VERSION` / 頁尾）↔ [CHANGELOG.md](../CHANGELOG.md) 強制一致 |

## 常見狀況處理

| 情況 | 第一步 |
|---|---|
| 改咗 `index.html` 中文後英文版出現中文字 | 喺 `locale-en.js` 之 `LOCALES.en.HTML` 補返對應英文翻譯並跑 `npm test` |
| 更新站台圖標後瀏覽器仍顯示舊圖 | 執行 `bash scripts/make-icons.sh`，並同步遞增 `index.html` 與 `manifest.webmanifest` 之 `ICON_VER` / `?v=` |
| 文件連結或錨點損壞 | 執行 `node scripts/guard.mjs`（G10 自動掃描） |
| Vercel 部署報 `ENOENT` | 執行 `node scripts/lint.js` 檢查 `.vercelignore` 有無誤擋建置所需檔案 |
