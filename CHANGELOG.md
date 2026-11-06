# Changelog — 童軍準備指南（upgrade）

> 格式跟 [Keep a Changelog](https://keepachangelog.com/)；每次交付檔改版號必須同步更新 `package.json`、`index.html`（`GENERATED`、`app-version`、`APP_VERSION`、頁尾）與本檔（V 規則）。

## [2.0.0] - 2026-11-06

### Added
- 對齊 [`playerkousas-rgb/readme`](https://github.com/playerkousas-rgb/readme) 全面治理標準：補齊 `AGENTS.md`、`SCOPE.md`、`GLOSSARY.md`、`CONTRIBUTING.md`、`PREFLIGHT.md`、`INTAKE.md`、`DESIGN.md`、`AUDIT.md`、`CREDITS.md`、`LICENSE`（MIT）、`.env.example`、`docs/`、`skills/` 及 `.github/workflows/guard.yml`（SHA-pinned Actions）。
- 新增 G11 標準圖標生成管線 `scripts/make-icons.sh` 及 `icons/` 全套 9 個 PNG/ICO 檔案（全出血 `#1B4332` 實底、16×16 像素手繪、maskable 60% 安全區、1200×630 實色底 `og-image.png`，合計約 45 KB ≤ 260 KB）。
- 新增零依賴建置與守護工具：`build-site.mjs`（輸出純淨 `dist/` 白名單產物）、`scripts/lint.js`（S/F/A/W/V + G11 + 反 slop + `.vercelignore` 防呆）及 `tests/guard.test.mjs`（`node --test` 單元與規格測試）。
- 補齊 `index.html` 之 Open Graph／Twitter Card 分享預覽 meta、`copyright`／`app-version` meta，以及支部選擇卡（`.path-step`）鍵盤 `Tab` + `Enter`/`Space` 與 `aria-pressed` 無障礙支援。

### Changed
- `vercel.json` 升級至標準 `dist` 白名單發佈配置（`framework: null`、`installCommand: "npm install --include=dev"`、`buildCommand: "npm run build"`、`outputDirectory: "dist"`、`cleanUrls: true`、`regions: ["hkg1"]`、4 條安全 headers 及 `/favicon.ico` 重導向）。
- 按 `DESIGN.md` 反 slop 規則移除 `index.html`（Header、Header 彩虹底條、`.preview`）及 `app.js`（小童軍預覽框）全部 4 處 `linear-gradient`，改用實色設計 token。
- 更新 `.github/workflows/verify-live.yml` 釘死 Action commit SHA 並改驗 `icons/*` 9 個標準圖標路徑。

### Fixed
- 修正 `data.js` `buildChecklist()` 女團員揀「長褲」升團（深資→樂行、深資／樂行→領袖）時未對原支部套用 `applyLowerBodyChoice()` 之錯誤，現正確將同款女裝長褲、黑色短襪及綁帶皮鞋判為「可沿用」，並為女領袖長褲制服（編號 6）補上深綠色軟帽提示（`noteLeaderTrousersHat`）。
- 修正 `index.html` 徽章參考表深資童軍段章仍只列舊制「責任、自立、活動、探險」之遺漏，補齊 2026 新綱要四段章「活動策劃、社會服務、多元技能、戶外探險」及對應英文翻譯。
- 修正頁尾誤留「所有通告版權歸香港童軍總會所有」字句，改為制服規格、訓練綱要及徽號版權聲明，並同步 `locale-en.js`。

### Removed
- 清理 S5 死重檔案：刪除無引用兼內容失實之 `checklist-uniform.md`、未部署之 `badge-sources/`（1.84 MB 原始暫存圖）及舊版 `assets/` 內不合 G11 規範之 AVIF／圓角裁邊圖標。

---

## [1.4.0] - 2026-10-20

### Added
- 納入 2026 年 8 月 15 日生效各支部新訓練綱要：進度性獎章歷程圖、女團員半截裙／長褲二選一、深資及樂行典禮儀式可選領呔、中英雙語切換及共用 `SCOUT ADMIN` 回報入口。
