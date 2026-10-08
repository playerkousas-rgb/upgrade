# 獎章歷程縮圖來源與限制

此目錄只放會在 APP 載入的 **14 張 WebP 縮圖**（約 85 KB）。原稿在 `badge-sources/`，不會部署到 Vercel。2026 各支部官方綱要：[香港童軍總會支部訓練檢討](https://sites.google.com/scouting.org.hk/sections/%E6%94%AF%E9%83%A8%E8%A8%93%E7%B7%B4%E6%AA%A2%E8%A8%8E)。縮圖只供辨認，不是現售產品照片，也不是考章或佩戴的依據。

| 檔案 | 使用階段 | 原稿 | 備註 |
| --- | --- | --- | --- |
| `cub-experience.webp` | 幼童軍體驗章 | `Gemini_Generated_Image_acq72macq72macq7 (3).jpg` | **AI 重繪示意，非官方圖**；用戶接受小瑕疵，以可辨認為先。 |
| `cub-adventure.webp` | 幼童軍歷奇章 | `Gemini_Generated_Image_acq72macq72macq7 (2).jpg` | 同上；單山峰章。 |
| `cub-advanced.webp` | 幼童軍高級歷奇章 | `Gemini_Generated_Image_acq72macq72macq7 (1).jpg` | 同上；雙山峰章。 |
| `cub-golden.webp` | 金紫荊獎章 | `Gemini_Generated_Image_acq72macq72macq7.jpg` | 同上；紫荊花章。 |
| `scout-pathfinder.webp` | 童軍探索獎章 | `ScoutPathfinderAward.webp` | 童軍資訊站官方網頁圖解，原檔已很小，直接沿用。 |
| `scout-standard.webp` | 童軍標準獎章 | `ScoutStandardAward.webp` | 同上。 |
| `scout-advanced.webp` | 童軍高級獎章 | `ScoutAdvancedAward.webp` | 同上。 |
| `scout-chief.webp` | 總領袖獎章 | `ChiefScoutsAward.webp` | 同上。 |
| `venture-shoulder.webp` | 深資童軍肩章 | `image-removebg-preview (3).png` | 用戶提供的去背圖，**兩枚重疊**，非單枚產品照；細節及邊緣以官方綱要為準。 |
| `venture-award.webp` | 深資童軍獎章 | `image-removebg-preview (2).png` | 用戶去背圖，白色圖案及邊緣有瑕疵；在白底上展示。 |
| `venture-dragon.webp` | 榮譽童軍獎章 | `image-removebg-preview (4).png` | 用戶去背圖，細節未經獨立產品核對。 |
| `rover-shoulder.webp` | 樂行童軍肩章 | `image-removebg-preview (5).png` | 用戶去背圖，低解像度。 |
| `rover-award.webp` | 樂行童軍獎章 | `image-removebg-preview (6).png` | 用戶去背圖，低解像度。 |
| `rover-baden.webp` | 貝登堡獎章 | `images.png` | 用戶提供的圖，低解像度。 |

童軍會員章沿用[童軍資訊站](https://scoutsinfohub.org.hk/scout-training-scheme#ts_tab_progressive)的 `WorldScoutBadge.webp` 遠端圖片；載入失敗時有文字後備。幼童軍四張**已部署但在卡片及圖片替代文字逐一標明為「重繪示意・非官方圖」**，不得拿來核對正式章樣或製作徽章。將來有可核實的官方原圖應優先替換。

幼童軍原稿轉換：ImageMagick `convert input.jpg -fuzz 3% -trim +repage -resize '176x176>' -quality 78 output.webp`；保留白色背景，不 AI 補畫。上傳的去背圖轉換：ImageMagick `convert input.png -trim +repage -resize '176x176>' -define webp:lossless=false -quality 82 output.webp`；`rover-baden.webp` 以 quality 84 縮圖。保持來源圖長闊比例，不放大、不 AI 修復或重畫。
