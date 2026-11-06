# CREDITS — 第三方資料及圖片來源聲明（W8）

> 本倉自研程式碼及幾何站台圖標（`icons/*`）以 [LICENSE](LICENSE)（MIT · © 2026 SCOUT SYSTEM）授權；以下香港童軍總會及相關機構之公開資料、徽號與參考圖**不屬 MIT 授權範圍**，版權及商標權歸原權利人所有。

## 1. 制服規格、徽章佩戴與訓練綱要文字依據

| 資料項目 | 官方來源 | 用途 |
|---|---|---|
| 各支部（小童軍至領袖）常規制服組成 | [香港童軍總會官網「制服」頁（中文版）](https://www.scout.org.hk/) | `data.js`（`SECTIONS`、`ITEMS`、`UNIFORM_SPEC`）及 `index.html` 對照表 |
| 帽章與制服穿戴細節 | [香港童軍總會《儀容與制服手冊》](https://uniform.scouting.org.hk/)（第 96–106 頁） | `data.js`（`CAP_HANDBOOK`、`ITEM_REFERENCES`） |
| 青少年支部徽章佩戴位置 | 香港童軍總會《青少年活動通告第 13/2023 號：支部成員徽章佩戴指引》 | `index.html` 徽章位置參考表及過渡問答 |
| 2026 年 8 月 15 日生效各支部新訓練綱要 | [香港童軍總會「青少年支部訓練綱要檢討」專頁](https://www.scout.org.hk/tc/programme/youth-programme-review/) 及 [Scout Information Hub](https://scoutsinfohub.org.hk/) | `data.js`（`BADGES_OVERVIEW`、`TRANSITIONS`、`BADGE_TIMELINES`）及 `app.js` 綱要連結 |
| 制服及配件編號、零售價與產品相 | [香港童軍物品供應社（SCOUT SHOP）](https://www.hkscoutshop.org.hk/)（2026 年 9 月擷取） | `data.js`（`SHOP`）預算參考與產品連結 |

## 2. 本地靜態圖檔分類與授權邊界

| 目錄 | 檔案數 | 性質與來源說明 |
|---|---|---|
| `icons/*` | 9 | **本倉自製幾何圖標**（`scripts/make-icons.sh` 生成，杏色恤衫＋橙色向上箭嘴，© 2026 SCOUT SYSTEM），隨本倉 MIT 授權發佈。 |
| `assets/items/*.svg` | 12 | **本倉自製一般衣物款式示意圖**（恤衫、短褲、裙褲、長褲、半截裙、襪、皮鞋、旅巾、幼童軍巾圈），僅供辨識剪裁款式，不含官方徽號，隨本倉 MIT 授權發佈。 |
| `assets/items/*.avif` | 5 | 供應社公開產品相轉存縮圖（棗紅軟帽、海童軍白頂帽、女領袖禮帽、杏色恤衫），版權歸香港童軍物品供應社／香港童軍總會所有。 |
| `assets/reference/*.avif` | 15 | 官方《儀容與制服手冊》及總會官網制服圖解之局部裁切參考圖（逐張頁碼與裁切紀錄見 [`assets/reference/README.md`](assets/reference/README.md)），版權歸香港童軍總會所有。 |
| `assets/badges/*.webp` | 14 | 進度性獎章歷程辨識縮圖（逐張來源與 AI 重繪／用戶參考圖標示見 [`assets/badges/README.md`](assets/badges/README.md)）；UI 已明確標示「重繪示意・非官方圖」並附官方綱要連結。 |

## 3. 外部開源方法引用

- [`skills/external/grilling/SKILL.md`](skills/external/grilling/SKILL.md)：原文引用自 [mattpocock/skills](https://github.com/mattpocock/skills)（MIT License），僅作需求提問方法溯源。
- 倉庫治理與檢查腳本（`scripts/*_v1.0.mjs`、`scripts/guard.mjs`）：同步自 [playerkousas-rgb/readme](https://github.com/playerkousas-rgb/readme)（MIT License · © 2026 SCOUT SYSTEM）。
