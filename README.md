# 童軍準備指南 🏕️

> **由小童軍到領袖 — 家長一目了然的進團/升團準備 APP**

## 📌 定位

**非官方輔助工具**,旨在協助香港童軍家長了解子女升團時需要購買/沿用什麼制服配件,
以及升團的時程、誓詞、規律、進度性獎章等資訊。

### 目標用戶
- 👨‍👩‍👧‍👦 **家長**:子女剛加入 / 升團,需要知道買咩、邊度買、幾時預備
- 🏕️ **旅團領袖**:向新家長講解時的統一教材
- 🆕 **新成員**:想了解自己支部要戴咩、考咩

### 設計理念(你朋友原本的思路,我們把它通用化 + 深化)
1. **一看就明**:揀進團情境 → 自動顯示要買咩
2. **升團 vs 全新加入**:清楚分辨「可沿用」vs「需購買」
3. **性別獨立**:男 / 女團員制服有差異(裙褲、半截裙、襪褲、皮鞋)
4. **從家長角度出發**:所有文字以家長需要知道的為本,不用 POR 條文

### 資料來源(全部為香港童軍總會**中文版**官方資料,不參考其他國家/地區)
- ✅ 制服組成:香港童軍總會官網「制服」頁(幼童軍、童軍、深資、樂行、領袖,各含陸/海/空)
- ✅ 徽章位置:青少年活動通告第 13/2023 號《支部成員徽章佩戴指引》
- ✅ 徽章領取/購買、先修章:《童軍訓練綱要》附錄(童軍資訊站中文版)
- ✅ 支部年齡:官網「支部簡介」
- ❌ 不含 POR 全文

---

## 🚀 功能

### 1. 升團互動清單(核心)
- 6 個支部 × 來源(升團/全新加入)× **原本陸/海/空 × 升去陸/海/空** × 男/女
- 領袖有 **3 個來源**:由深資升任 / 由樂行升任 / 全新加入
- 以「官方制服組成表」自動比較原本與目標,同款 = 可沿用,不同 = 需購買
- 單品附來源可追溯的**參考圖／產品圖片**，展開可看規格、購買途徑及升團注意；未能取得可靠圖片時保留來源連結，不以自製徽號代替
- 自動統計:需購買 / 可沿用 / 向團長查詢;預算按實際要買的物品計算
- **家長可 mark 邊啲已有**(支援兄弟姊妹共用),localStorage 持久化

### 2. 🎯 升團過渡指南(總綱)
- **進度性獎章總覽**:6 個支部一覽(誓詞/規律/獎章/特殊備註)
- **升團過渡詳情**:揀邊個支部就自動顯示對應 Q&A

### 3. 配套文字資訊
- 選碼小貼士
- 洗滌保養指南(8 件物品)
- 預算參考(2025 年 9 月,以 SCOUT SHOP 為準)
- 常見穿著錯誤(10 大禁忌)
- 重要時程表(7 個關鍵時間點)
- 徽章完全手冊(12 種徽章)
- 領袖常規制服(海/陸/空 3 版本)
- 海童軍 / 空童軍簡介
- 常見問題 FAQ(7 條)

### 4. 視覺
- 每個 PART 均可按標題獨立展開／收起（支援觸控、Enter／Space）
- 初次開啟只展開步驟 ①、②，其餘收起；可一鍵展開／收起目前顯示的所有部分
- 自動記住各部分的開合狀態；切換支部、性別或重新整理不會重設開合選擇
- 帽章等 14 個配件項目直接使用本地官方手冊／制服圖局部，毋須等外站失敗才 fallback
- 4 個準確制服組合已有本地官方圖解；其餘只嘗試對應官方圖片，不再以 AI 陸童軍圖代替海／空制服
- 圖片註明來源及性質，官方圖解不再稱作「實相」
- 6 支部用 6 種顏色區分
- 自家設計 LOGO(綠色 U + 軟帽 + 貝登堡徽)
- 響應式(手機/平板/桌面)

### 5. PWA
- 可加主畫面（PWA manifest，手機按「加到主畫面」）
- 自家 LOGO icon(192/512/180/32)
- 暫不啟用離線快取（無 service worker），避免部署更新後瀏覽器被舊快取鎖住；啟用方法見下方「部署與防增肥守則」

---

## 📂 檔案結構

```
upgrade/
├── index.html            (主頁面, 51K, 991 行)
├── data.js               (單品目錄 ITEMS + 各支部×海陸空×性別 制服組成 UNIFORM_SPEC + 比較邏輯)
├── app.js                (主程式:來源/海陸空/性別控制、清單、獎章總覽、過渡 Q&A、預算)
├── manifest.webmanifest  (PWA 設定)
├── vercel.json           (Vercel 部署:快取/安全 response headers)
├── .vercelignore         (Vercel 部署排除清單,防止肥重檔案上線)
├── package.json          (零運行期依賴;只有 devDependencies 測試工具)
├── scripts/
│   ├── check.js          (npm run check:語法＋資產引用完整性＋防增肥守門)
│   └── smoke.js          (npm run smoke:jsdom 快速功能煙霧測試)
├── tests/                (Playwright 瀏覽器回歸測試,僅開發用,不上 Vercel)
├── README.md             (本檔)
├── .gitignore
└── assets/
    ├── logo-192.png
    ├── logo-512.png
    ├── apple-touch-icon.png
    ├── favicon-32.png
    ├── reference/ (15 張已核對的本地官方參考圖 AVIF + 來源及裁切記錄 README.md)
    └── items/     (單品制服圖 AVIF＋一般衣物款式示意 SVG；不準確的徽號 SVG 已移除)
```

---

## 🧪 瀏覽器回歸測試

網站仍是純靜態 HTML／JavaScript，毋須建置。

- `tests/parts.spec.js`：19 項，涵蓋各部分開合、全部開合、支部篩選、內層 FAQ、已有物品紀錄、狀態儲存、鍵盤操作及手機排版。
- `tests/images.spec.js`：18 項，涵蓋全部帽章、15 個本地圖檔解碼、來源標示、制服組合匹配、本地及外站圖片失效、後備圖失效不循環、320／390px 排版。
- 測試預設阻擋所有外站請求，不依賴供應社允許圖片外連。若另安裝 `@fontsource/noto-sans-hk`，圖片手機測試會使用真實繁中字符字寬。

```bash
# 快速檢查(零依賴,任何機器即試即用)
npm run check   # JS 語法＋資產引用完整性＋反死重＋防增肥守門
npm run smoke   # jsdom 功能煙霧測試:清單比較/海陸空/領袖來源/預算/持久化/開合

# 完整瀏覽器回歸(需 Chromium;只裝 devDependencies,不影響網站運行)
npm install
npx playwright install --with-deps chromium
npm run test

# 終端一：啟動靜態網站
python3 -m http.server 8000 --bind 0.0.0.0
```

如網站使用其他網址，可用 `TEST_BASE_URL` 指定測試目標。

---

## 📦 部署與防增肥守則（Vercel）— 改版前必讀

> 目標：Vercel 部署配恆常保持極小（目前上線內容 < 1.1 MB），且**任何改版不得引致死重檔案回巢**。

### 部署模型
- **純靜態站：零運行期依賴、零 build 步驟**。Vercel 直接部署根目錄，不應執行任何 `npm install`。
- **嚴禁**在 `dependencies` 加入任何套件。需要新工具時一律放 `devDependencies`（如 Playwright、jsdom），且工具必須與 `node_modules/` 一起被排除在上線範圍外。
- **嚴禁**引入 `uploads/`、資料庫、後端 API 等會持續累積儲存空間的機制；若將來需要，必須獨立成另一個專案。

### 上線範圍（.vercelignore）
只上線運行時需要的檔案。已被排除：`*.md`（文件）、`tests/`、`scripts/`、`package*.json`、`node_modules/`、`.git/`、以及防復活的死重模式：`uploads/`、`*.log`、`*.bak`、`*.tmp`、`*.old`、`*.swp`、`.DS_Store`、`Thumbs.db`、`dist/`、`build/`、`.cache/`。
`.gitignore` 同步排除這些模式，防止先進倉庫再進部署。

### 資產守則（最易出肥重的地方）
1. **每個 `assets/` 檔案必須被 `index.html`／`app.js`／`data.js`／`manifest.webmanifest` 引用**（`data.js` 以 base 名動態拼出的 `assets/reference/*.avif` 亦算）。`npm run check` 會反查死重，**不允許任何未引用檔案存在**。
2. 新增圖片前：先問「有無已有本地官方參考圖可用？」。有 → 沿用；沒有 → 才新增，並同時更新 `ITEM_REFERENCES`／`LOCAL_UNIFORMS`、`tests/images.spec.js` 及（如涉及官方裁切）`assets/reference/README.md` 的來源記錄。
3. 圖片格式：照片類一律用 **AVIF**（quality 70；2026 年所有 evergreen 瀏覽器均支援：Chrome 85+／Safari 16+／Firefox 93+）。新增照片後執行：`npm i --no-save --package-lock=false sharp && node scripts/to-avif.js <檔案>`（會自動解碼驗證、較大的檔案保留原檔）。一律不得用未壓縮的原圖入倉；PWA 圖示維持 PNG（apple-touch-icon 只能 PNG）。
4. **不得**復活 `assets/images/`（已停用的舊 AI 插畫，2026-09 已移除）；`npm run check` 會攔截。
5. 不提交任何備份／暫存檔（`*.bak`／`*.tmp`／`*.old`）；用 Git 做版本控制，不留檔案副本。

### 快取策略（vercel.json）
- HTML／JS／manifest：`Cache-Control: no-cache`（每次部署立即生效）。
- 圖片（png/jpg/webp/svg/ico）：`public, max-age=604800`（CDN 快取一週）。
- 全站附 `X-Content-Type-Options: nosniff`、`Referrer-Policy`。

### PWA 離線功能（刻意未啟用）
目前只有 manifest（可加主畫面），**沒有 service worker**，離線打開會載入失敗。這是刻意選擇：SW 快取一旦寫入，部署更新後舊版 UI 可能鎖住使用者，與「零倒退」目標衝突。日後若要啟用，必須：版本化 cache name、HTML 一律 network-first、圖片 cache-first、附 `versionchange` 自動升級，並為之新增 Playwright 測試。

### 改版前的驗證清單（零倒退守門）
```bash
npm run check   # 必須全綠
npm run smoke   # 必須全綠
npm run test    # 有 Chromium 時必須全綠（37 項）
```
三關全過才可推送／部署。

### 2026-09 瘦身記錄（本次）
移除 17 個死重檔案（**396 KB**）＋ 21 張照片轉 AVIF（**261 KB**），上線總量 **1,416 KB → 約 760 KB（-46%）**：

| 檔案 | 原因 |
|---|---|
| `assets/images/` 全 10 張（208 KB） | 舊 AI 整套制服插畫，早已停用，代碼零引用（測試反而斷言不得引用此目錄） |
| `assets/items/beret-green.jpg`（59 KB） | 已被本地官方裁切圖 `reference/beret-green.avif` 取代 |
| `assets/items/cap-cub-m.jpg`（56 KB） | 已被 `reference/capbadge-cub.avif` 取代 |
| `assets/items/cap-cub-f.jpg`（48 KB） | 已被 `reference/cap-cub-female.avif` 取代 |
| `assets/items/beret-greyblue.jpg`（42 KB） | 已被 `reference/beret-greyblue.avif` 取代 |
| `assets/items/tie-black/green/navy.svg`（1.4 KB） | 代碼中根本沒有領帶單品，零引用 |

**AVIF 轉換（21 張照片，-261 KB）**：`assets/reference/` 15 張 webp → avif（四張全身制服圖 86–88 KB → 45–59 KB）、`assets/items/` 6 張 jpg → avif（供應社產品圖 28–54 KB → 10–24 KB）。全部經「解碼驗證＋逐張平均 RGB 統計比對（Δ≤0.002）」確認與原檔同尺寸、色彩忠實；其中 4 張小帽章 AVIF 比 WebP 略大（+2.2 KB），為保持代碼模板統一仍採用 AVIF。新增 `scripts/to-avif.js` 作為日後照片入倉的標準轉碼工具。

新增守衛：`.vercelignore`、`vercel.json`（快取／安全 headers）、`scripts/check.js`（反死重守門）、`scripts/smoke.js`（jsdom 功能測試）、`scripts/to-avif.js`（AVIF 轉碼）、`package.json`（僅 devDependencies）。

修復：`.item.expanded .item-detail` 的 `max-height` 由 1200px 提高到 3000px（320px 窄視點下最長單品＝220px 圖＋說明＋供應社框，1200px 上限配 `overflow:hidden` 有裁切風險）；README 的 PWA「離線可用」更正為實際狀態。

**核心功能確認（瘦身後 smoke 36 項＋check 全數通過）**：升團清單比較（6 支部×海陸空×來源×性別）、同款沿用判定、領袖 3 來源、深資／樂行海帽章同款規則、帽章等 15 張本地參考圖優先＋官方原圖回退、失效圖片誠實提示不循環、預算表、mark 已有持久化、PART 開合及批量開合、小童軍特殊路徑。

---

## 🎨 LOGO 設計

- **綠色字母 U**(取 Uniform/Upgrade 之義)
- 右上角融入<strong>深綠軟帽 + 金色貝登堡徽章</strong>
- 杏色背景,與香港童軍制服主色呼應

---

## 📊 開發歷程

| 階段 | 功能 |
|---|---|
| 1. 原版 | 港島第82旅內部工具,只涵蓋幼升童 |
| 2. 通用化 | 改為全港旅團通用,6 個支部 + 海/空童軍 |
| 3. 互動化 | 加 path 選擇 + 模式切換 + 性別切換 + 10 張 AI 插畫 |
| 4. 文字深化 | 加尺碼、預算、洗滌、時程、徽章手冊、FAQ |
| 5. 總綱化 | 升團過渡指南改用訓練綱要為基礎,加進度性獎章總覽 |
| 6. 互動 mark | 家長可 mark 邊啲已有(支援兄弟姊妹共用) |
| 7. 海陸空 + 領袖 3 來源 | 改用官方制服組成表自動比較;每件單品加圖片;修正金紫荊/先修章/小隊章/年星資料 |

---

## ⚠️ 免責聲明

本 APP 為<strong>非官方輔助工具</strong>:
- 制服規格以香港童軍總會最新《儀容與制服手冊》為準
- 訓練綱要根據《童軍訓練綱要》及政策、組織及規條整理
- 制服價格隨時調整,實際以[香港童軍物品供應社(SCOUT SHOP)](http://www.hkscoutshop.org.hk) 為準
- 圖片以準確及可核對為先：帽章等使用本地官方參考圖，來源及裁切記錄見 [`assets/reference/README.md`](assets/reference/README.md)，不冒稱現售產品照片
- 其他項目嘗試供應社產品圖片；一般衣物才保留清楚標示「非實物照片」的款式示意後備。小隊章及職級肩章無可靠本地圖時只保留官方產品入口，不用自製徽號
- 外站或本地圖載入失敗時保留來源／產品連結；不使用空 `src`、無限重試或跨支部／性別的錯圖
- 預算表以 `SHOP` 表的官方零售價計算;皮鞋、襪褲等非供應社貨品才用約略區間
- 如有疑問,請向<strong>所屬旅團領袖</strong>查詢

## 📜 版權

© 2026 Scout System · 童軍準備指南

制服規格及官方參考圖版權 © 香港童軍總會 Scout Association of Hong Kong
訓練綱要整理自公開文件,僅作教育用途。
