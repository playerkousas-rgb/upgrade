# 童軍準備指南（Scout Uniform & Badge Guide）

> 香港童軍各支部（小童軍至領袖）進團與升團制服準備、2026 新訓練綱要徽章歷程及過渡須知（中英雙語純靜態 PWA）。
> 線上網址：<https://upgrade-ashen.vercel.app> · 當前版本：**v2.0.0**

---

## 5 分鐘快速入口

- **開工邊界（Agent 必讀）**：[AGENTS.md](AGENTS.md) · 開局前閘門：[PREFLIGHT.md](PREFLIGHT.md)
- **範圍與術語**：[SCOPE.md](SCOPE.md) · [GLOSSARY.md](GLOSSARY.md) · [一頁紙速查](docs/quickcard.md)
- **設計與審計**：[DESIGN.md](DESIGN.md) · [全面檢查及升級報告 AUDIT.md](AUDIT.md)
- **授權與素材來源**：[LICENSE](LICENSE)（MIT · 自研程式碼）· [CREDITS.md](CREDITS.md)（香港童軍總會及供應社素材聲明）
- **變更紀錄與貢獻**：[CHANGELOG.md](CHANGELOG.md) · [CONTRIBUTING.md](CONTRIBUTING.md)
- **已採用 Agent Skills（Promoted）**：[`repo-setup`](skills/promoted/repo-setup/SKILL.md) · [`design-review`](skills/promoted/design-review/SKILL.md)（唯一目錄見 [`skills/CATALOG.md`](skills/CATALOG.md)）

---

## 核心功能

1. **六支部 × 陸／海／空 × 男女 制服比對清單**
   - 涵蓋小童軍（4–7 歲）、幼童軍（6–11 歲）、童軍（11–15 歲）、深資童軍（15–20 歲）、樂行童軍（18–25 歲）及成年領袖（常規制服編號 3／女領袖長褲制服編號 6）。
   - 自動比較「原支部制服」與「目標支部制服」，清楚標示 **需購買**、**可沿用** 與 **向團長查詢**。
   - 支援 **2026 年 8 月 15 日生效新綱要**：深資／樂行／領袖女團員「半截裙／長褲」二選一即時切換（自動聯動鞋襪與女領袖軟帽），以及深資／樂行典禮儀式可選領呔（不計入必買合計）。
2. **供應社產品編號與預算估算**
   - 整合香港童軍物品供應社（`hkscoutshop.org.hk`，2026 年 9 月擷取）五位產品編號、產品頁連結及參考零售價，並支援本機 `localStorage` 剔選「已有／已買」項目（隱私模式封鎖儲存時自動安全降級）。
3. **2026 新訓練綱要進度性獎章歷程與升團徽章拆留指引**
   - 完整列出各支部最新進度性獎章、誓詞規律、過渡期安排，以及支部最高獎章（金紫荊／總領袖／榮譽童軍／貝登堡）升團拆原章、改戴標誌與領袖只保留最高 1 個之規則。
4. **繁體中文／英文即時切換 & 問題回報**
   - 右上角單鍵切換 `zh-HK`／`en`；頁頂直接連往共用 `SCOUT ADMIN` 問題／意見回報頁。

---

## 專案結構

```text
upgrade/
├── index.html                  # 主頁入口（含 G11 圖標 link/OG meta、W1 版權及 V2 版號）
├── app.js                      # 互動控制、漸進展開、雙語切換、圖片安全降級
├── data.js                     # 制服規格、供應社編號價錢、2026 訓練綱要與過渡資料（zh-HK）
├── locale-en.js                # 英文語言包（LOCALES.en 完整對照）
├── manifest.webmanifest        # PWA 設定（含 any + maskable 192/512 PNG 圖標）
├── icons/                      # G11 標準全套 9 個 PNG/ICO 站台圖標（≤260 KB）
├── assets/
│   ├── badges/                 # 進度性獎章歷程 WebP 縮圖（來源見 assets/badges/README.md）
│   ├── items/                  # 衣物款式 SVG 及供應社產品 AVIF 縮圖
│   └── reference/              # 官方手冊與制服圖解本地 AVIF 裁切參考圖（見 assets/reference/README.md）
├── build-site.mjs              # 零依賴組裝器：輸出純淨運行期白名單至 dist/（< 5 MB）
├── scripts/
│   ├── make-icons.sh           # 重現生成 icons/ 9 個檔案（ImageMagick 內建 MVG）
│   ├── check.js                # JS 語法、資產引用完整性與死重檔案檢查
│   ├── lint.js                 # S/F/A/W/V、G11 圖標、DESIGN.md 反 slop 及 .vercelignore 防呆檢查
│   ├── smoke.js                # JSDOM 互動與雙語零殘留冒煙測試
│   └── *_v1.0.mjs / guard.mjs  # 同步自 playerkousas-rgb/readme 之真理檢查腳本
├── tests/
│   ├── guard.test.mjs          # 零依賴 node:test 單元與規格守護測試
│   └── *.spec.js               # Playwright 瀏覽器端對端測試規格
├── docs/                       # 速查卡、設計檢查、ADR 與 out-of-scope 紀錄
└── skills/                     # Agent 技能包與唯一目錄 CATALOG.md
```

---

## 本機開發與驗證命令

```bash
# 本機預覽（打開 http://localhost:8000）
npm run dev

# 零依賴完整閘門（開工前／提交前必跑）
node scripts/preflight_v1.0.mjs . --json
npm run build        # 依序執行 check.js -> lint.js -> build-site.mjs（產出 dist/）
npm test             # 執行 node --test（tests/guard.test.mjs）
node scripts/final_check_v1.0.mjs --json
```

---

## 資料來源與免責聲明

- **香港童軍總會官網**：<https://www.scout.org.hk/>
- **香港童軍物品供應社（SCOUT SHOP）**：<https://www.hkscoutshop.org.hk/>
- **《儀容與制服手冊》**：<https://uniform.scouting.org.hk/>

本網站為非官方獨立輔助工具，與香港童軍總會無任何官方從屬關係。所有制服規格、徽章佩戴與訓練綱要以香港童軍總會最新正式公布為準；第三方素材來源詳見 [CREDITS.md](CREDITS.md)。
