# 設計檢查（13a）— 童軍準備指南（upgrade）

> 對應 [`playerkousas-rgb/readme` 之 `docs/27 §2b`](https://github.com/playerkousas-rgb/readme/blob/main/docs/27-repo-starter.md) 及 [`skills/promoted/design-review/SKILL.md`](../skills/promoted/design-review/SKILL.md)。
> 本倉具體色彩、字級與反 slop 規則以根目錄 [`DESIGN.md`](../DESIGN.md) 為唯一真理。

## 1. 介面分類與 Brief

- **分類**：**App 屏幕／實用檢查工具**（非宣傳頁）。
- **對象**：香港童軍成員（小童軍至領袖）與家長。
- **唯一核心任務**：揀選目標支部、升團來源、海／陸／空、性別（及女團員半截裙／長褲選擇）後，即時得出「需購買／可沿用／向團長查詢」清單、供應社參考預算與徽章拆留指引。

## 2. 本專案專屬元素（Inventory）

1. 六支部官方代表色圓點（小童軍橙、幼童軍綠、童軍深綠、深資棗紅、樂行深藍、領袖深灰）
2. 陸／海／空三種恤衫與帽款差異（杏色／白色／淺藍色恤衫；軟帽／白頂帽／金邊硬帽）
3. 2026-08-15 新綱要女團員下半身「半截裙 vs 長褲」二選一即時聯動（連襪、鞋及女領袖 6 號制服軟帽）
4. 2026-08-15 新綱要深資／樂行典禮儀式領呔「可選項目（不計入必買合計）」標示
5. 支部最高獎章（金紫荊／總領袖／榮譽童軍／貝登堡）升團拆原章、改戴標誌及領袖只留最高 1 個規則
6. 香港童軍物品供應社（SCOUT SHOP）五位產品編號與參考零售價
7. 《儀容與制服手冊》頁碼錨點本地裁切參考圖（帽章等零自造徽號）
8. 單鍵繁中／英文（`zh-HK` / `en`）零殘留即時切換

## 3. 反 Slop 落實對照

| 禁用項 | 本倉處理 |
|---|---|
| CSS `linear-gradient` / `radial-gradient` / 彩虹條 | 已全數清零（Header 改用 `#1B4332` 實色底＋`#f9b233` 底邊；`.preview` 改用 `#f6f1e5` 實色暖紙底；小童軍框改用 `#fff3e3` 實色底） |
| 英文全大寫 Eyebrow 小標籤 | 零使用，直接以清晰中文分節標題呈現 |
| 裝飾性模糊光暈 | 零使用 |
| 圓角透明裁邊圖標／AVIF 圖標 | 已由 `scripts/make-icons.sh` 全面換成全出血 `#1B4332` 實底 PNG／ICO 全套 9 檔 |

## 4. 圖標目視檢查紀錄（Look-and-Fix Loop）

- **ROUND 1**：初次生成 `icons/*` 後逐張目視檢查，發現兩項問題：
  1. `og-image.png` 右側支部列文字 `Leader` 尾字貼近 1200px 右邊界被裁走半個 `r`，且左側徽章底框 `#143326` 與圖標 `#1B4332` 出現雙重方框色差。
  2. `icon-512.png` 肩帶位置太近領口，金色肩鈕被翻領遮蓋；`favicon-32.png` 保留胸袋細線略顯擠迫。
- **ROUND 2**：修正肩帶座標至真實肩線、為 `32×32`／`48×48` 採用去胸袋簡潔母圖、統一 `og-image.png` 左框底色並收細右側副標字級至 `20pt`，重新生成並逐張目視確認零裁字、零雜訊、對比清晰（合計 45 KB ≤ 260 KB）。

## 5. Details.so ＋ 真理倉（`readme`）設計原則對齊審查（v2.2.0–v2.2.1）

- **參考基準**：[`playerkousas-rgb/readme`](https://github.com/playerkousas-rgb/readme)（`docs/23`、`docs/39 §3.1`、`docs/44`、`docs/45`、`design-styles_v1.0.md`、`design-review.md`）＋ [`Details.so`](https://www.details.so/inspo)（Button、Card、List、Accordion、Steps 細節）＋ 本倉 [`DESIGN.md`](../DESIGN.md)。
- **ROUND 1（v2.2.0）**：修正「① 揀進團情境」`5 + 1` 孤兒列為桌面 6 欄／760px 以下 `3×2` 對稱網格；移除支部卡彩色發光陰影；升級清單語義狀態膠囊、分段膠囊控制列、手風琴膠囊展開鍵及 `tabular-nums` 等寬數字。
- **ROUND 2（v2.2.1 — 對照 `readme` 最新規範及精簡冗長文案）**：
  1. **嚴守 `design-review` 反 Slop 與 `design-styles_v1.0` 零多餘動效**：移除 `.card` 與 `#fab-lang` 靜態陰影、移除釘章圖板頂部 `.badge-card-tag` Eyebrow 小標籤及非順序 `①–⑤` 編號、清除各分節 `<h2>`/`<h3>` 裝飾性 Emoji，並移除靜態卡片懸停彈跳及清單入場動畫（工具介面只保留即時色態與箭頭旋轉）。
  2. **大幅精簡全站冗長導言（Substance over Fluff）**：刪除「② 你屬於哪一種？」重複子標題及小童軍重複說明、移除官方整套參考圖重複列舉文字、將每行清單重複提示縮減為 4–6 字、精簡獎章歷程／購買流程／選碼／預算／釘章圖板及頁尾文案。
  3. **對齊 `docs/44`（雙語 L2–L4）與 `docs/39`（SEO/GEO）**：為 `#fab-lang` 補上 `data-lang-toggle` 及單向動作 `aria-label`／`title`（`Switch to English`／`切換至中文介面`），修正中英夾雜字串（「已 mark」→「已標記」），並加入 `WebApplication` JSON-LD 通過 `seo_check_v1.0.mjs`（0 FAIL、0 WARN）。

## 6. SG18 與 entry-gate 實作檢視（2026-11-18；2026-11-21 按 `docs/60` 升級至 v2.3.2）

- **Idea**：讓由 APP STORE／圖書館進入的指南使用者可自願返回主站對此 App Like／Save；不另建推廣頁、不彈窗。
- **Live thing（預期狀態，尚未實機）**：直接開 URL 會留在 APP STORE 提示卡；放行後頁首顯示附 SVG 心形圖示的「讚好／收藏」掣（`#storeSupportTop`）及 SCOUT ADMIN 回報連結，頁尾附輕量提示列（`#storeSupportBar`／`#storeSupportFoot`）。此為程式設定描述，不代表已部署或真機確認。
- **Layout words**：頂欄動作連結置於品牌標題下方，頁尾提示列以 1px 實線邊框白卡居中對齊（`max-width: 968px`）；窄屏 430px 以下兩者皆直排滿寬，語言掣仍在右上角。中英標籤經現有語言狀態切換並保留 SVG 圖示。
- **Code-level review only**：頂欄及頁尾支持掣皆至少 44px 高；支援 `:focus-visible`；長文字可折行；頂欄掣與頁尾列初始皆 `hidden`（CSS 強制 `display: none !important`），helper 不存在則 fail closed；列印時同時隱藏 `.support-btn` 及 `.support-bar`；沒有漸層、陰影、遮罩倒數、彈窗或第二次 nudge。
- **視覺評分**：design / usability / creativity 不評分。沒有實際瀏覽器畫面，不能以 CSS 靜態檢視代替 screenshot critique。
- **待望圖 top 3**：① 390px 頁首高度、SVG 心形掣與頁尾提示列堆疊比例；② 英文回報、Like／Save 及頁尾提示列折行是否自然；③ 768px 轉折及 1440px 頁尾提示列與主內容卡片邊界對齊。

## 未核實

- 本輪環境沒有可用的 Chromium／Playwright 瀏覽器，未擷取 design-review 要求的 390／768／1440 實際渲染截圖；因此上述 SG18 僅完成程式碼層級檢視及測試，不報視覺設計、易用性或創意分數。須另於有瀏覽器的環境完成目視／真機確認。
