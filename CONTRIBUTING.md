# CONTRIBUTING — 童軍準備指南（upgrade）

> 提交修改前請先讀 [SCOPE.md](SCOPE.md)、[GLOSSARY.md](GLOSSARY.md) 同 [DESIGN.md](DESIGN.md)。

## 去邊反映問題

| 你有 | 去邊 |
|---|---|
| 網站資料錯漏／建議（一般成員或家長） | 直接撳頁頂「🐛 向 SCOUT ADMIN 回報問題／意見 ↗」 |
| 程式碼 Bug | GitHub Issue（附支部、海陸空、性別及重現步驟） |
| 新功能提議 | 先對照 [SCOPE.md](SCOPE.md) 同 [`docs/out-of-scope/`](docs/out-of-scope/README.md)，再提 Issue |
| 直接提交修改 | 開 Pull Request；每個 PR 聚焦單一主題並附上檢查輸出 |

## 修改守則

- **中英雙語同步**：凡修改 `index.html` 靜態中文文字或 `data.js` 條目，必須同步更新 `locale-en.js` 對應英文翻譯，確保切換 `EN` 後零中文殘留。
- **圖片來源誠實**：嚴禁自行繪製或 AI 生成官方徽號冒充實物相；新增本地圖片須壓縮為 AVIF／WebP（站台圖標 `icons/*` 例外，按 G11 用 PNG／ICO）並記錄於 `CREDITS.md`。
- **設計反 slop**：唔准加 `linear-gradient`、`radial-gradient`、裝飾光暈或英文全大寫 eyebrow。

## PR 最低驗收清單

```text
[ ] node scripts/preflight_v1.0.mjs . --json  -> ok: true
[ ] npm run build                             -> check + lint + dist (< 5MB) 全綠
[ ] npm test                                  -> node --test 全數通過
[ ] CHANGELOG.md 已補版本紀錄（版號與 package.json 及 index.html 一致）
[ ] 無真 key / .env / 超過 500KB 未壓縮圖片 / 死重備份檔入 Git
```

## 授權

貢獻之自研程式碼以 [LICENSE](LICENSE)（MIT）授權；第三方官方參考素材須按 [CREDITS.md](CREDITS.md) 標示來源（W8）。
