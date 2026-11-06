# AGENTS — 童軍準備指南（upgrade）開工邊界

> **Agent 第一行讀呢度。** 同 [README.md](README.md) 衝突時，以通用安全／防呆底線為先。

## 開工順序

> **前置步（pre-step）**：如果需求或授權未確認，先跟 [`INTAKE.md`](INTAKE.md) 一輪問清用戶並寫入 [`SCOPE.md`](SCOPE.md)；方法溯源見 [`skills/external/grilling/SKILL.md`](skills/external/grilling/SKILL.md)（只作引用，唔直接執行）。

> **加新 skill**：必須跟 [`skills/CATALOG.md`](skills/CATALOG.md) §2 四步（生檔 → `check_skills` 驗 frontmatter → 加目錄行 + 本檔指名 → PREFLIGHT 全綠）。

0. **PREFLIGHT gate（未改檔／未 commit 之前）**：`node scripts/preflight_v1.0.mjs . --json` → `ok: true` 先好開工；`exit 1` 先修穿窿項。詳見 [PREFLIGHT.md](PREFLIGHT.md)。
1. **主動讀並執行 `repo-setup` 與 `design-review`**：
   - [`skills/promoted/repo-setup/SKILL.md`](skills/promoted/repo-setup/SKILL.md)（12 樣起手檔、兩軸 Standards／Spec review）
   - [`skills/promoted/design-review/SKILL.md`](skills/promoted/design-review/SKILL.md)（有 UI 必讀；連同本倉 [`DESIGN.md`](DESIGN.md) 反 slop 規則一齊守）
   - 收納約定見 [`docs/skills/README.md`](docs/skills/README.md)。
2. 讀 [README.md](README.md)（5 分鐘入口）→ [SCOPE.md](SCOPE.md)（做乜／唔做乜）→ [GLOSSARY.md](GLOSSARY.md)（香港童軍制服與綱要術語）→ [DESIGN.md](DESIGN.md)（設計 token 與禁用清單）。
3. 對 [docs/quickcard.md](docs/quickcard.md) 一頁紙 checklist。
4. 通用規則以真理倉 [`playerkousas-rgb/readme`](https://github.com/playerkousas-rgb/readme) 及 [`PLAYBOOK.md`](https://github.com/playerkousas-rgb/readme/blob/main/PLAYBOOK.md) 為唯一來源；唔好喺本倉複製第二份通用規則書。
5. 改動前後跑 `npm run build`（內含 `check.js` + `lint.js` + `build-site.mjs`）及 `node scripts/preflight_v1.0.mjs . --json`。

## 可改 / 唔好改

| 可改 | 唔好改（除非用戶明講 + 寫 ADR） |
|---|---|
| `index.html`、`app.js`、`data.js`、`locale-en.js`、`tests/`、文件 | 唔好引入任何 runtime npm 框架或後端伺服器（保持純靜態 PWA） |
| 用 `bash scripts/make-icons.sh` 更新 `icons/*`（同步遞增 `ICON_VER`） | 唔好自造／AI 重繪香港童軍總會官方帽章或徽號冒充實物圖 |
| 更新制服價錢或訓練綱要資料（須同步更新 `locale-en.js` 中英對照） | 唔好喺 `.vercelignore` 用 `*.md` 通配符擋走 `DESIGN.md`／`CHANGELOG.md` 等建置檢查檔 |

## 鐵律捷徑（S / F / A / W / V）

- **S 瘦身**：`dependencies` 永遠為空；Vercel 只發佈 `dist/` 白名單產物（< 5 MB，現約 580 KB）；無引用素材即刪。
- **F 防呆**：`localStorage` 全部包 `try/catch`；遠端圖片失敗自動降級至文字來源連結；`npm run build` 任何規則唔過即 fail closed。
- **A 安全**：全倉無 API key／無登入憑證；外部 `<script>` 白名單鎖死；GitHub Actions 一律 pin 完整 commit SHA（A16）。
- **W 版權**：頁頭 `<meta name="copyright" content="© SCOUT SYSTEM">` + 頁尾可見版權；香港童軍總會及供應社素材按 [CREDITS.md](CREDITS.md) 標清來源（W8）。
- **V 雙版號**：每次改動同步更新 `package.json`、`index.html`（`GENERATED` 標記、`app-version` meta、`APP_VERSION` 常數、頁尾 `vX.Y.Z`）及 [CHANGELOG.md](CHANGELOG.md)。

## 做完要留低

- [CHANGELOG.md](CHANGELOG.md) 補一節版本紀錄；難逆轉架構取捨寫入 `docs/adr/`。
- 未能喺沙盒實測嘅項目（例如真機 iOS 主畫面圖標裁切、無 Chromium 下嘅視覺截圖）老實寫「待查／未核實」。
