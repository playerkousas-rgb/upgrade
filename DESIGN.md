# DESIGN — 童軍準備指南（upgrade）設計語言唯一真理

> 對齊 [`playerkousas-rgb/readme`](https://github.com/playerkousas-rgb/readme) 之 `docs/23`（單一設計真理 F1、雙圓角尺度、語意 Token）、`docs/33-icon-standard.md`（G11）、`docs/39 §3.1`（SEO/GEO JSON-LD）、`docs/44`（雙語 L2–L4 乾淨分離與單向 `aria-label`）、`docs/45 §1`（工具介面零多餘動畫）、`templates/repo-starter/docs/design-styles_v1.0.md`（Scout Field／Scout Clean）及 [`skills/promoted/design-review/SKILL.md`](skills/promoted/design-review/SKILL.md)，並吸收 [`Details.so`](https://www.details.so/inspo) 之列表／手風琴／狀態膠囊細節。
> 本檔為 UI 色彩、字級、表面層次、文案密度與反 slop 規則嘅唯一真理；`scripts/lint.js` 會喺每次 `npm run build` 自動驗證可機械檢查嘅項目。

## 1. 定位與頁面屬性

- **類別**：**App 屏幕／實用檢查工具**（非宣傳型 landing page）。家長與青少年成員入站唯一目標係：**揀支部 → 揀升團／新入團與陸海空／性別 → 即時睇清楚邊件要買、邊件可沿用、約略預算同徽章拆留**。
- **核心視覺意象**：香港童軍制服實物色調——**深森林綠**（軟帽／領巾底色 `#1B4332`）、**杏色恤衫暖紙底**（`#F2E5CE` / `#F6F1E5`）、**童軍金／升團橙**（`#F9B233` / `#E86F1C`），以實色同清晰留白分組，唔用漸層同發光裝飾。

## 2. 色彩系統（CSS Tokens 與圖標同源）

| 用途 | Token / 色碼 | 說明 |
|---|---|---|
| 品牌主底色（Header / PWA / 圖標全出血底） | `--scout-brand: #1B4332` | 與 `manifest.webmanifest` 之 `theme_color`、`background_color`、`<meta name="theme-color">` 及 `icons/*` 底色 100% 一致 |
| 內文強調綠（標題／主互動態） | `--scout-green: #0a5c36` | 白底卡片上高對比標題與按鈕主色（WCAG AA 對比度 > 7:1） |
| 頁面背景 | `--bg: #f5f5f3` | 柔和暖灰紙底，減少長表閱讀疲勞 |
| 卡片表面 | `--card: #ffffff` | 主內容容器 |
| 預覽暖紙表面 | `--surface-warm: #f6f1e5` | 支部制服預覽區實色底（取代舊版 `linear-gradient`） |
| 分隔線 | `--line: #e8e4dc` | 1px 實線邊框 |
| 正文／次要文字 | `--text: #222222` / `--muted: #777777` | 主內文與來源備註 |
| 頂欄飾邊／重點提示 | `--accent: #f9b233` | 只用於 Header 底邊及重點提示左邊線，唔作大面積底色 |

### 支部語義色（只用於支部識別圓點、歷程節點與對應標題，唔作彩虹裝飾條）

| 支部 | Token | 色碼 |
|---|---|---|
| 小童軍 Grasshopper | `--grasshopper` | `#ff7a1a` |
| 幼童軍 Cub | `--cub` | `#5a8f3a` |
| 童軍 Scout | `--scout` | `#0a5c36` |
| 深資童軍 Venture | `--venture` | `#7a1f2b` |
| 樂行童軍 Rover | `--rover` | `#0a3a5c` |
| 領袖 Leader | `--leader` | `#3a3a3a` |

## 3. 字體與字級階層

- **字體棧**：系統原生繁體中文無襯線棧（`-apple-system, BlinkMacSystemFont, "Noto Sans HK", "PingFang HK", "Microsoft JhengHei", sans-serif`），零外部 WebFont 下載（S1/S6 零阻塞）。
- **字級比例**：
  - 站台主標題 `header h1`：`1.4rem`（手機 `1.2rem`），粗體 `700`
  - 摺疊分區標題 `.part > summary h2`：`1.25rem`（手機 `1.05rem`），粗體 `700`
  - 區內小標題 `h3`：`1.0rem–1.05rem`，粗體 `600`
  - 正文及清單：`0.92rem–0.95rem`，行高 `1.7`
  - 出處／價格備註 `.cite`：`0.8rem`

## 4. 互動與無障礙底線

1. **漸進展開（Progressive Disclosure）**：全頁以原生 `<details class="card part">` 分段；預設只開「① 揀進團情境」「② 揀你的情況」「③ 制服清單」，其餘參考表收起，手機首屏直達核心任務。
2. **鍵盤可達**：6 個支部選擇卡（`.path-step`）具備 `role="button" tabindex="0"`、`aria-pressed` 及 `Enter`／`Space` 鍵盤觸發，配清晰 `:focus-visible` 外框。
3. **雙語零殘留**：切換英文（`EN`）後，靜態 DOM 與動態資料全部由 `locale-en.js` 完整對照，唔留未譯中文字串（由 `scripts/smoke.js` 及 `tests/guard.test.mjs` 自動把關）。
4. **誠實圖片降級**：官方參考圖優先用本地已核對 AVIF；遠端供應社產品圖載入失敗時退回款式示意或純文字來源連結，**嚴禁自造或 AI 合成香港童軍總會官方徽號**。

## 5. 反 Slop 禁用清單（由 `scripts/lint.js` 強制執行）

- ❌ **禁止任何 CSS 漸層**：UI 樣式與行內 style 嚴禁 `linear-gradient()`、`radial-gradient()`、`conic-gradient()`（包括舊版 Header 漸層、Header 彩虹底條、`.preview` 漸層及小童軍 placeholder 漸層，已全部改為實色 token）。
- ❌ **禁止 Eyebrow 小標籤、多餘序號與標題裝飾 Emoji**：唔用 `text-transform: uppercase` 或卡片頂部膠囊小標（`.badge-card-tag`）、唔為非順序卡片編 `①–⑤`、唔喺分節標題堆砌裝飾 Emoji，直接以清晰字級層次呈現。
- ❌ **禁止靜態陰影、裝飾性模糊光暈與多餘彈跳動效**：唔用模糊卡片陰影、`filter: blur(...)` / `drop-shadow(...)` 或靜態卡片 hover 彈跳（`design-styles_v1.0.md`：工具畫面動畫從簡，只保留開合箭頭與按鈕色態回饋）。
- ❌ **禁止冗長說明式導言**：圖表、清單與控制列直入重點，不重複標題、不堆砌長段免責套話。
- ❌ **禁止圓角透明裁邊圖標或 AVIF 圖標**：`icons/*` 一律全出血 `#1B4332` 實底 PNG／ICO（G11）。

## 6. 站台圖標規格（G11 對應）

- 母本生成腳本：[`scripts/make-icons.sh`](scripts/make-icons.sh)（純 ImageMagick 內建 MVG 繪製，零外部 SVG delegate 依賴）。
- 圖標快取版號：`window.ICON_VER = "20261106"`，與 `index.html` 及 `manifest.webmanifest` 所有 `?v=` 參數強制同步。

## 7. 視覺檢查誠實聲明（`design-review` 規範）

- `icons/*` 全套 PNG 圖標已由工具直接讀取圖檔逐張目視檢查（並在 Round 2 修正咗肩帶與翻領重疊、32×32 細線雜訊及 `og-image.png` 右側文字邊距）。
- 本建置沙盒未預裝 Chromium／Playwright 瀏覽器執行檔，因此**未在沙盒內擷取 390 / 768 / 1440 完整網頁渲染截圖**，亦唔會偽造 juror 視覺評分；Playwright E2E 規格保留於 `tests/*.spec.js` 供具備瀏覽器環境時執行。
