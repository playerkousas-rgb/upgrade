# Changelog — 童軍準備指南（upgrade）

> 格式跟 [Keep a Changelog](https://keepachangelog.com/)；每次交付檔改版號必須同步更新 `package.json`、`index.html`（`GENERATED`、`app-version`、`APP_VERSION`、頁尾）與本檔（V 規則）。

## [2.3.0] - 2026-11-20

### Changed
- **全面轉為本機內建互動 3D 制服及基本章擺位圖**（移除所有對外部 `SCOUT3D` 網站之跳轉連結）：
  - 新增零第三方依賴純 Canvas 2D 3D 繪製引擎 [`scout3d.js`](scout3d.js)（`Scout3D`），依香港童軍六支部身高比例、制服配色（小童軍橙衣灰褲、陸軍杏衣橄欖綠下身、海童軍白衫深藍下身、空童軍淺藍衫深藍下身）、帽款（幼童軍男女帽、海童軍白頂帽、各支部軟帽、女領袖金邊硬帽及編號 6 長褲制服改配深綠軟帽）與《儀容與制服手冊》厘米座標即時繪製 3D 立體模型。
  - 只聚焦基本入團及升團徽章（帽章、會員章、香港章、旅章、地域章／區章、童軍小隊章、深資／樂行／領袖肩章及舊最高獎章標誌），省卻 44 區章或 32 隊小隊繁瑣選單，同時嚴守 `docs/out-of-scope/01-invented-insignia.md`，以幾何位置色塊示意而不偽造官方徽號圖樣。
  - 於步驟 ③ `#preview` 加入可在本頁展開之 3D 預覽抽屜（含小童軍適用）、於 `#part-badges` `#scout3d-badge-panel` 嵌入完整互動 3D 面板及可點擊切換視角的 4 面擺位卡片，並將清單內 `data-scout3d-focus` 按鈕改為頁內直接轉向並鎖定對應基本徽章。
  - 更新 `build-site.mjs`、`scripts/check.js`、`scripts/lint.js`、`.github/workflows/verify-live.yml`、`tests/guard.test.mjs`、`scripts/smoke.js` 與中英雙語語言包。

## [2.2.4] - 2026-11-20

### Added
- 接入同站作者獨立 3D 工具 **`SCOUT3D`**（`https://scout3d-gamma.vercel.app/`）以協助家長直接立體查看徽章擺位：
  - 新增 `SCOUT3D_BASE_URL`、`scout3dUrl()` 及中英雙語 `SCOUT3D_MAP`（覆蓋小童軍至領袖全數 6 支部之四面擺位重點：正面胸袋、左／右袖、雙肩肩帶及領巾／頸部）。
  - 於步驟 ③ `#preview` 制服預覽框（含小童軍）、`#part-badges`「徽章位置與手冊」厘米圖板下方 `#scout3d-badge-panel`，以及清單內 `badges-youth`、`badges-leader`、`patrol-badge`、`epaulette-rank`、`gh-clothes` 項目加入情境連動之 SCOUT3D 連結（自動帶入 `section`、`variant`、`gender`、`bottom` 及 `lang` 參數，並附上對應操作步驟提示）。
  - 維持純靜態零依賴架構與 `< 5 MB` 產物上限（因 `SCOUT3D` 現時 `vercel.json` 設 `X-Frame-Options: SAMEORIGIN` 且含 React/Three.js 依賴與約 4 MB 徽章貼圖，採用開新分頁連動啟動而非強制內嵌或複製打包）。

## [2.2.3] - 2026-11-20

### Changed
- 全面遷移香港童軍物品供應社官方產品資料至新版網店 `store.scout.org.hk`（2026 年 11 月核對）：
  - 更新 `SHOP_BASE`、`shopUrl()` 及 `shopImg()` 為 `https://store.scout.org.hk/products/<id>` 與 `https://ssmsuat.scout.org.hk/images/<code>/01.png`；為僅設 placeholder 圖像之 `01020` 童軍帽章設定 `noImg: true`（維持使用已核對之本地手冊裁切圖）。
  - 逐一核對並更新全數 41 項 `SHOP` 及 `extra`/`alt` 產品 ID、五位產品編號（包含將舊 `1025`–`1027`、`1035` 補齊為 `01025`–`01027`、`01035` 及小童軍活動服 `91147`）、官方品名（「男／女幼童軍布帽」「橄欖綠色…」）與零售價。
  - 補充棕色制服皮帶 `01006`（HK$65）作 `belt` 預算替代選項；將 `patrol-badge` 連結至 `04504`（HK$3.5）並加註全部 16 款隊色章（`04504–04519`）搜尋連結。
  - 為各帽類、恤衫、褲／裙、皮帶、長短襪、綠領巾及小童軍活動服加入經 `store.scout.org.hk` 核實之可選尺碼範圍（顯示於每件物品展開卡片及「選碼要點」尺碼一覽表，並於綁帶皮鞋註明 `01021`／`01015` 尺碼）。
  - 同步更新 `index.html`、`locale-en.js`、`README.md`、`CREDITS.md`、`GLOSSARY.md` 之供應社網址（含 `/shopping-guide/stores`）、2026-11 參考日期及冒煙／單元測試。

## [2.2.2] - 2026-11-18

### Added
- 啟用 SG1–SG19 頂層 `entry-gate`：APP STORE 為攔截卡唯一按鈕；`library` 以 `silentPortalIds` 放行但不畫按鈕；已安裝主畫面 PWA 由 `allowStandalone` 放行。
- 新增 SG18 中英雙語「讚好／收藏」連結，透過真理倉 `ScoutStoreGate.getAppStoreUrl('upgrade')` 返回主站詳情卡；不啟用 `supportNudge`，不直連主站資料庫。
- 將未修改的真理倉 `store_gate_v1.0.js` 加入部署白名單、語法／發佈檢查和 live deployment hash 清單；增加無依賴閘門模擬測試。

### Changed
- 為兩個頁首動作連結加入至少 44px 觸控高度、鍵盤焦點樣式、窄屏堆疊、中英標籤與列印隱藏。
- 更新 README、SCOPE 和 design-review 紀錄；本機「已有／已買」資料仍使用原有 keys，沒有新增 localStorage key。
- 本機資料審核後，用戶確認 `scout_owned_v2` 是低風險購物勾選清單，可在目前無匯出／備份下繼續此有限改動。

---

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
