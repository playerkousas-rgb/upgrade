# Changelog — 童軍準備指南（upgrade）

> 格式跟 [Keep a Changelog](https://keepachangelog.com/)；每次交付檔改版號必須同步更新 `package.json`、`index.html`（`GENERATED`、`app-version`、`APP_VERSION`、頁尾）與本檔（V 規則）。

## [2.2.1] - 2026-11-09

### Changed
- 全面對照 [`playerkousas-rgb/readme`](https://github.com/playerkousas-rgb/readme) 最新設計大綱（`docs/23`、`docs/39 §3.1`、`docs/44`、`docs/45`、`design-styles_v1.0.md`、`design-review`）收斂視覺與大幅精簡文案：
  - **反 Slop 與克制動效**：移除卡片與浮動掣靜態陰影、釘章圖板頂部 `.badge-card-tag` Eyebrow 標籤、非順序 `①–⑤` 編號、分節標題裝飾 Emoji 及多餘懸停彈跳／入場動畫，統一雙圓角 Token（`--radius-card`／`--radius-sm`）。
  - **精簡全站冗長介紹文字**：刪除步驟 ② 重複標題與小童軍重複說明、精簡每行清單提示、縮減獎章歷程／購買流程／選碼／預算／釘章圖板／圖片備註及頁尾說明，直入圖表與重點。
  - **雙語 L2–L4 與 SEO/GEO 達標**：補齊 `#fab-lang` 之 `data-lang-toggle`、單向動作 `aria-label`／`title`、`data-lang` 屬性、修正中英夾雜字串（「已 mark」→「已標記」），並加入 `WebApplication` JSON-LD。

---

## [2.2.0] - 2026-11-09

### Changed
- 參照 [`Details.so`](https://www.details.so/inspo) 介面細節工藝與本倉 `DESIGN.md`／`design-review` 規範全面升級視覺與微互動：
  - **安靜邊框與零光暈表面層級**：以 `1px solid` 實線邊框與暖白次級底色（`#faf9f6`）取代舊版模糊卡片陰影及支部選取卡彩色漫射光暈，維持零 CSS 漸層、零全大寫 Eyebrow、零裝飾性模糊。
  - **對稱支部網格與觸感控制項**：將「① 揀你要加入的支部」由 `5+1` 不對稱列改為桌面 `6` 欄單行、行動裝置 `3×2` 雙行對稱網格；重構「② 你屬於哪一種？」分段選項列（`.gender-toggle`）、頂部展開工具列（`#part-toolbar`）及 13 個分節膠囊展開鍵（`.part-toggle`），補齊懸停、按壓微縮（`:active`）、`:focus-visible` 實線焦點框及 `prefers-reduced-motion` 支援。
  - **清單卡片、語義膠囊與等寬數字**：升級「③ 制服清單」項目列、高對比語義狀態膠囊（需購買／可沿用／向團長查詢）與「標記為已有」操作列；於統計摘要、尺碼與預算表（含獨立淺綠總計列 `tfoot`）及手冊厘米圖解板全面啟用 `tabular-nums` 等寬數字對齊。

### Fixed
- 修正 `app.js` `applyVisibility()` 未處理非 `.card` 元素 `[data-hide-for]` 屬性之問題，確保揀選「小童軍」時正確隱藏不適用之釘章導引列。

---

## [2.1.0] - 2026-11-09

### Added
- 新增《儀容與制服手冊》釘章位置與厘米視覺圖解板（`#badge-placement-guide`）：納入《儀容與制服手冊》第 93、95 頁基本徽章量位原圖裁切（`handbook-pocket-3cm.avif`、`handbook-sleeve-2cm.avif`、`handbook-sleeve-1cm.avif`）及配合青少年活動通告第 13/2023 號之右胸袋升團換章、左袖考章仿手冊線稿 SVG，並補齊「具體要視衣服大小，間距可能會變小（不會變大）」調整原則與中英雙語翻譯。
- 於「③ 制服清單」（清單底部及基本徽章展開詳情）與「哪裡購買制服」加入一鍵跳轉入口（`openBadgeGuide`），直達手冊釘章厘米圖解。

### Fixed
- 修正 `data.js`、`locale-en.js` 及 `index.html` 徽章參考表中誤寫「旅章、區章、地域章：右袖（由上至下）」／「區章：右袖，地域章上方」之錯誤，按《儀容與制服手冊》第 94–95 頁更正為旅章置於右袖肩縫下 2 厘米，地域章（靠前／向胸口）與區章（靠後／向背後）於旅章下 2 厘米左右並排、相距 1 厘米。

---

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
