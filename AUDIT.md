# AUDIT — 參閱 `playerkousas-rgb/readme` 全面檢查及升級報告

- **目標倉庫**：`playerkousas-rgb/upgrade`（童軍準備指南 · <https://upgrade-ashen.vercel.app>）
- **對照標準**：[`playerkousas-rgb/readme`](https://github.com/playerkousas-rgb/readme)（commit `d6ac210`：`README.md`、`PLAYBOOK.md`、`docs/01`、`docs/06`、`docs/12`、`docs/13`、`docs/17`、`docs/27`、`docs/28`、`docs/30`、`docs/31`、`docs/32`、`docs/33` 及 `templates/repo-starter/`）
- **升級日期與版號**：2026-11-06 · **v2.0.0**

---

## 1. 倉庫分類定性（對照 `docs/28-repo-taxonomy.md`）

| 維度 | 定性 | 依據與適用邊界 |
|---|---|---|
| 形式 | **靜態多檔／PWA** | 原生 `index.html` + `app.js` + `data.js` + `locale-en.js`，零前端框架 |
| 輕重 | **輕** | 無伺服器端運算、無資料庫、無 runtime npm 套件 |
| 後台／身份 | **無** | 純本機 `localStorage` 剔選紀錄；**不適用** `docs/04` 設定層、`A14` 超管及 `docs/31 §2` 帳號生命週期（第 14 項）；問題回報已按 `docs/31 §5` 接駁共用 `SCOUT ADMIN` 入口 |
| Gemini／AI | **無** | 無 API key、無前端生圖功能；**不適用** `W2/W3` DCT 隱形水印與 `C13` key 注入 |
| UI 設計檢查 | **適用（第 13a 項）** | 面向家長與青少年成員之 Web／PWA 介面，適用 `DESIGN.md` 與 `design-review` 反 slop 及 G11 圖標規範 |

---

## 2. 升級前發現之問題總表（Standards 軸 ＋ Spec 軸）

### A. 標準合規缺口（Standards Axis — 對照 `readme` 鐵律）

| 編號 | 規則 | 升級前狀況 | 處置結果 |
|---|---|---|---|
| **G11-1** | `docs/33` 圖標 9 檔與格式 | 圖標散落根目錄與 `assets/`，缺 `icon-maskable-192.png`、`icon-maskable-512.png`、`og-image.png`，且 `manifest.webmanifest` 與頁頂 LOGO 誤用 **AVIF**（G11 §7 明令禁止：iOS／爬蟲不支援） | 新增 `scripts/make-icons.sh` 生成 `icons/` 標準 9 個 PNG/ICO 檔（合計 45 KB ≤ 260 KB），移除舊 AVIF／散落圖標，補齊 5 條 `<link>`、Open Graph／Twitter meta 與 `manifest` 4 個 `any`+`maskable` 圖標 |
| **G11-2** | `docs/33 §4.3 / §6` 圖標視覺品質 | 舊 `apple-touch-icon.png`、`favicon-32x32.png`、`favicon-16x16.png` 帶圓角淺米色框＋四角透明裁邊，只得 3 色且與 `theme_color` `#1B4332` 不符；`16×16` 由大圖硬縮致線條糊化 | 重製全出血 `#1B4332` 實底 6 色「童軍杏色恤衫＋橙色向上箭嘴」，`16×16` 獨立像素手繪，`maskable` 嚴格收入中央 60% 安全區，並經兩輪目視檢查修正細節 |
| **S2 / S4 / VL** | `docs/01` + `docs/06` + `docs/17` 部署配置 | `vercel.json` 只配兩條快取 header，無 `framework: null`、無 `outputDirectory: "dist"`、無 `regions: ["hkg1"]`、無 4 條安全 headers；`.vercelignore` 缺 `docs/` 且以 `*.md` 通配符一刀切 | 新增零依賴 `build-site.mjs` 組裝白名單 `dist/`（約 580 KB << 5 MB），升級 `vercel.json` 補齊 `hkg1` 與 4 條安全 headers，重整 `.vercelignore` 並加 `lint.js` 防止誤擋建置檢查檔 |
| **S5** | 死重檔案零容忍 | 根目錄 `checklist-uniform.md` 全倉零引用且寫錯香港童軍制服規格（「綠色 Polo 衫」「頭盔」「小童軍 = Cubs」）；`badge-sources/` 存放 1.84 MB 原始暫存圖 | 經用戶確認一併刪除 `checklist-uniform.md`、`badge-sources/` 及舊圖標檔，全倉體積大幅瘦身 |
| **W1 / W8** | `docs/12` 版權與第三方素材聲明 | `index.html` 缺 `<meta name="copyright" content="© SCOUT SYSTEM">`，無 `LICENSE` 與 `CREDITS.md` 區分自研代碼與香港童軍總會素材，頁尾誤留「所有通告版權歸香港童軍總會所有」 | 補齊 `copyright` meta、按用戶選擇建立 MIT `LICENSE` + `CREDITS.md`（W8），並更正頁尾聲明為制服規格、訓練綱要與徽號 |
| **V1 / V2** | `docs/13` 雙版號與單一真理 | `index.html` 無 `app-version` meta、無 `APP_VERSION` 常數、頁尾無版號，無 `CHANGELOG.md` | 統一版號 **v2.0.0**（`package.json`、`GENERATED` 標記、`app-version` meta、`APP_VERSION` 常數、頁尾及 `CHANGELOG.md`），由 `scripts/lint.js` 自動鎖死一致性 |
| **Design** | `DESIGN.md` + `design-review` 反 slop | 缺 `DESIGN.md`；`index.html`（Header 漸層、Header 6 色彩虹底條、`.preview` 漸層）及 `app.js`（小童軍預覽框漸層）共 4 處 `linear-gradient` | 建立 `DESIGN.md`，清零全部 4 處 `linear-gradient` 改用實色 token，並在 `scripts/lint.js` 加自動防回退檢查 |
| **Starter / F12** | `docs/27` 起手 12 樣與真理腳本 | 缺 `AGENTS.md`、`SCOPE.md`、`GLOSSARY.md`、`CONTRIBUTING.md`、`CHANGELOG.md`、`PREFLIGHT.md`、`INTAKE.md`、`.env.example`、`skills/`、`guard.yml` 及 `scripts/*_v1.0.mjs` | 完整補齊 12 樣起手治理檔、6 支真理腳本、`skills/CATALOG.md` 三份技能包、SHA-pinned `guard.yml` 及零依賴 `node --test` 測試集 |

### B. 業務邏輯、資料與無障礙修正（Spec Axis — 專案自身品質）

| 編號 | 位置 | 問題詳情 | 修正內容 |
|---|---|---|---|
| **BUG-1** | `data.js` (`buildChecklist`) | 2026 新綱要支援深資／樂行／領袖女團員揀「長褲」，但升團比對時 `source` 未套用 `applyLowerBodyChoice()`，導致由深資女（長褲）升樂行女（長褲）或樂行女（長褲）升領袖女（長褲）時，同款女裝長褲、黑短襪、綁帶皮鞋被誤判為「需購買」；同時 `trousersChosen` 與 `noteLeaderTrousersHat` 定義後從未使用 | 對 `source` 同步套用 `applyLowerBodyChoice()`，並於女領袖（陸）長褲制服（編號 6）自動附加上 `noteLeaderTrousersHat` 軟帽說明，新增單元測試鎖定 |
| **BUG-2** | `index.html` + `locale-en.js` | 徽章參考表（`#part-badges`）深資童軍段章仍只列舊制「責任、自立、活動、探險」，與上方 2026 新綱要總覽不一致 | 更新為「活動策劃、社會服務、多元技能、戶外探險（舊制：責任、自立、活動、探險）」並同步更新英文翻譯 |
| **BUG-3** | `index.html` + `app.js` | 6 個支部選擇卡（`.path-step`）為純 `<div>` 配 `onclick`，鍵盤用戶無法用 `Tab` 聚焦或 `Enter`/`Space` 切換支部 | 補上 `role="button" tabindex="0"`、`aria-pressed`、`:focus-visible` 外框及鍵盤 `Enter`/`Space` 事件 |
| **BUG-4** | `README.md` | 舊 `README.md` 仍寫「2025 年 9 月預算」「重要時程表（已刪）」「綠色 U + 軟帽 LOGO」及不存在之 `assets/logo-512.png`，並使用 `http://www.hkscoutshop.org.hk` | 全面重寫 `README.md`，修正所有路徑、`https://` 連結與功能描述 |

---

## 3. 兩軸獨立檢視結論（`repo-setup` Two-Axis Review）

1. **Standards 軸（通用鐵律 S / F / A / W / V + G11 + 起手 12 樣）**：
   - `node scripts/preflight_v1.0.mjs . --json`：**8 / 8 全綠（`ok: true`）**
   - `node scripts/guard.mjs --ci`：**PASS（G10 連結／錨點、A1 憑證、S 體積全過）**
   - `node scripts/repo_health_v1.0.mjs . --json`：**10 PASS / 0 WARN / 0 FAIL**
   - `node scripts/final_check_v1.0.mjs --json`：**6 大角度全綠（`ok: true`）**
   - Vercel `.vercelignore` 模擬乾淨目錄建置測試：`npm run build` 成功產出 `dist/`（< 600 KB）。
2. **Spec 軸（香港童軍制服與 2026 新訓練綱要業務準確性）**：
   - `npm run check`、`npm run lint`、`npm test`（`node --test`）及 `npm run smoke`（JSDOM 雙語及互動冒煙測試）全數通過。
   - 六支部 × 海陸空 × 男女（含女團員半截裙／長褲切換、深資／樂行可選領呔、升團沿用判斷、英文零中文殘留）全部驗證無誤。

---

## 4. 誠實限制與待真機核實事項（`docs/17` MANUAL 項）

- 本沙盒無預裝 Chromium／Playwright 瀏覽器執行檔，故未在沙盒內執行 `playwright test` 或擷取 390 / 768 / 1440 渲染截圖（圖標 PNG 已逐張直接讀圖目視核驗）。
- 合併上 `main` 觸發 Vercel 部署後，建議執行以下兩項真機收尾確認：
  1. `.github/workflows/verify-live.yml` 自動比對 `https://upgrade-ashen.vercel.app` 線上檔案與 `icons/*` SHA-256。
  2. 以 iOS Safari「加入主畫面」、Android Chrome「安裝應用程式」及 WhatsApp／Telegram 貼上網址，實測主畫面圖標與 `og-image.png` 社交預覽卡顯示。
