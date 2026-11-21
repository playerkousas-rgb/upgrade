# SCOPE — 童軍準備指南（upgrade）做乜 / 唔做乜

> 一個 repo 要有清晰收貨線（bar），先至唔會變大雜燴。提交新功能前請先對照以下兩條條件及 [docs/out-of-scope/](docs/out-of-scope/README.md)。

## 收貨條件（兩條都要過）

1. **真實需要／官方依據**：解決家長或成員準備香港童軍進團／升團時嘅真實疑問，且所有制服、徽章與訓練綱要內容必須有香港童軍總會公開文件或童軍物品供應社資料佐證。
2. **合乎純靜態輕工具定位**：零後端、零帳號、零 runtime npm 依賴、手機與桌面打開即用，離線或隱私模式下核心清單依然運作正常。

## 本 repo 範圍

| 做（In Scope） | 唔做（Out of Scope） |
|---|---|
| 香港童軍六個支部（小童軍、幼童軍、童軍、深資童軍、樂行童軍、領袖）及陸／海／空、男／女（含 2026 新綱要女團員裙／長褲二選一、深資／樂行典禮領呔可選項目）之新入團與升團制服比對清單 | 自造、手繪或以 AI 合成香港童軍總會官方帽章／徽號圖片冒充官方章樣（見 [`01-invented-insignia.md`](docs/out-of-scope/01-invented-insignia.md)） |
| 供應社產品編號、參考零售價預算表及本機 `localStorage`「已有／已買」剔選紀錄 | 會員登入、雲端同步個人清單、網上代購／付款或旅團庫存管理系統（見 [`02-user-accounts.md`](docs/out-of-scope/02-user-accounts.md)） |
| 2026 年 8 月 15 日生效各支部新訓練綱要進度性獎章歷程、升團徽章拆留規則（含支部最高獎章標誌）及中英雙語（`zh-HK` / `en`）完整切換 | 逐項考核細則簽署紀錄或通告全文檢索（通告檢索屬另一獨立專案） |
| 接駁共用 `SCOUT ADMIN` 問題／意見回報頁（`?app=童軍準備指南`） | 在本倉自建獨立後台收件箱或資料庫 |
| 由指定入口頂層進入的 `entry-gate`、APP STORE 單一提示掣，以及 SG18 同源深層連結回主站讚好／收藏 | 子 App 直連主站 Supabase、複製主站密鑰或自建入口統計 |

## A 組準入白名單與支持連結（SG1–SG19）

- 用戶確認本 App 類型為「**專業工具／參考指南**」，今日入口為 **APP STORE + 圖書館**。依 SG19，圖書館靜默放行、不在攔截卡顯示；`portalIds` 仍只列 `appstore`。
- 設定：`mode: 'entry-gate'`、`portalIds: ['appstore']`、`silentPortalIds: ['library']`、`allowStandalone: true`、`autoRedirectSeconds: 0`。不加入 `member`、`district` 或 `gemini`；`supportNudge` 關閉。
- SG18 使用已核實 slug `upgrade`（對照 `playerkousas-rgb/website` `migrations/20261116-app-slug-seed.sql`：`upgrade-ashen.vercel.app` → `upgrade`），依真理倉 2026-11-21 `docs/60`（全 App 必做，參考航空圖鑑 v0.37.0）同時提供頂欄 SVG 心形「讚好／收藏」掣（`#storeSupportTop`）及頁尾輕量提示列（`#storeSupportBar` / `#storeSupportFoot`），由 `ScoutStoreGate.getAppStoreUrl('upgrade')`（向下相容 `getPortal('appstore')`）產生詳情深層連結；未載入時維持 `hidden`，不直連主站 Supabase、不自建 hearts/stars 請求。另以 GitHub API 檢視 `scout-circulars` 的 `main`（commit `ac6fef85cd4ea6c8ab8c9b0f36b35701870fa86c`）原始碼，其小工具入口輸出 `rel="noopener"`、保留跨站 Origin referrer；這只是 source code 核對，不代表 live deployment／真機驗收。本輪只改本 App repo，未改入口 repo。
- 閘門是 UX 層入口提示，不是登入或安全邊界。本 App 沒有 `/api` 或配額型第三方 API；PWA manifest 使用 `display: standalone`，未發現 Web Push／Service Worker。`vercel.json` 的 `outputDirectory` 為 `dist`；Vercel Dashboard 實際 Root Directory／部署狀態未核實。
- 本機資料 keys：`scout_owned_v2`（「已有／已買」制服項目）、`scout_parts_v1`（章節開合）、`scout-guide-lang-v1`（語言偏好）。前者目前無匯出／備份；用戶確認它是低風險購物勾選清單並授權繼續，這次沒有更改／新增 localStorage key。提醒：iOS Safari 與主畫面 WebClip 可能使用分開的儲存容器；因本清單已由用戶判作低風險，本次不加匯出，列作後續建議。閘門按真理倉原碼使用 sessionStorage key `upgrade.store_pass`，不等同持久化清單。

## 已拒絕（一個概念一個檔）

拒絕過嘅方向記錄於 [`docs/out-of-scope/`](docs/out-of-scope/README.md)，列明原因、日期與出處，避免日後重複討論。

## 分類（新嘢放邊）

| 狀態 | 放邊 | 會唔會出現在 README／部署 `dist/` |
|---|---|---|
| 已採用運行期檔案 | 根目錄 / `icons/` / `assets/` | ✅ 入 `dist/` |
| 已採用治理／測試 | `scripts/` / `tests/` / `docs/` / `skills/` | ✅ 留 Git，唔入 `dist/` |
| 測試中草稿 | `in-progress/` | ❌ 唔入 `dist/`、唔入主索引 |
| 棄用封存 | `deprecated/` | ❌ 唔入 `dist/` |

## 判斷唔到

官方未公布細節或各旅團做法不一嘅項目（如旅巾、幼童軍顏色巾圈、典禮領呔規定）一律標為「**向團長／所屬旅團查詢**」，唔好硬寫單一答案；Issue 如 14 日無補充資料即關閉。
