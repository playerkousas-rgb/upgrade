#!/usr/bin/env bash
# scripts/make-icons.sh — 按 readme docs/33-icon-standard.md（G11）一次過產出 icons/ 全套 9 個圖標檔
#
# 設計方向（用戶確認 keep_shirt_upgrade）：
#   - 保留「杏色童軍恤衫＋橙色向上升團箭嘴」核心識別
#   - 全出血深綠實底 #1B4332（對齊 manifest theme_color / background_color，無圓角裁邊、無透明角）
#   - 6 色扁平色盤（#1B4332 / #0E291D / #F2E5CE / #DFC9A6 / #E86F1C / #F6AE3D），零漸層（0 gradient）
#   - 16×16 及 32×32 針對細尺寸去雜訊繪製（G11 §6），唔由 512 硬縮糊化
#   - maskable 192/512 主體嚴格收入中央 60% 安全區（G11 §5）
#   - og-image.png 1200×630 實色底配資訊構圖（G11 §2 / §4.2）
#   - 純 ImageMagick 內建 MVG / annotate 繪製（零 rsvg-convert 外部依賴），PNG8 減色壓縮（≤260 KB）
#
# 用法：bash scripts/make-icons.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/icons"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$OUT"

BG="#1B4332"
DARK="#0E291D"
SHIRT="#F2E5CE"
SHADE="#DFC9A6"
ARROW="#E86F1C"
GOLD="#F6AE3D"

# ── 1) 以 ImageMagick 內建 MVG 繪製 1000×1000 童軍恤衫＋向上箭嘴母圖 ─────────
# scale=0.84 -> any（飽滿清晰）
# scale=0.58 -> maskable（主體嚴格留喺中央 60% 安全區 [200..800]，任何遮罩零切邊）
render_master() {
  local scale="$1"
  local dst="$2"
  local detail="${3:-full}"
  local mvg="$TMP/master-${scale}-${detail}.mvg"
  cat > "$mvg" <<EOF
push graphic-context
  viewbox 0 0 1000 1000
  fill '${BG}'
  rectangle 0,0 1000,1000

  push graphic-context
    translate 500,508
    scale ${scale},${scale}
    translate -500,-500

    # 恤衫主體（短袖＋衣身）
    fill '${SHIRT}'
    stroke '${DARK}'
    stroke-width 24
    stroke-linejoin round
    path 'M 320,175 L 680,175 L 895,315 L 820,470 L 720,420 L 720,845 Q 720,872 692,872 L 308,872 Q 280,872 280,845 L 280,420 L 180,470 L 105,315 Z'

    # 左右袖口反摺邊
    fill '${SHADE}'
    stroke '${DARK}'
    stroke-width 16
    polygon 105,315 142,291 217,446 180,470
    polygon 895,315 858,291 783,446 820,470
EOF

  if [ "$detail" = "full" ]; then
    cat >> "$mvg" <<EOF
    # 左右肩帶（落喺真實肩線位置，避開翻領唔重疊）＋金色肩鈕
    fill '${SHADE}'
    stroke '${DARK}'
    stroke-width 14
    polygon 218,242 332,172 352,206 238,276
    polygon 782,242 668,172 648,206 762,276
    fill '${GOLD}'
    stroke '${DARK}'
    stroke-width 6
    circle 322,198 322,211
    circle 678,198 678,211

    # 左右胸袋＋袋蓋線（童軍兩胸袋特徵）
    fill '${SHADE}'
    stroke '${DARK}'
    stroke-width 14
    roundrectangle 310,408 404,512 10,10
    roundrectangle 596,408 690,512 10,10
    line 310,442 404,442
    line 596,442 690,442
EOF
  fi

  cat >> "$mvg" <<EOF
    # 領口深綠內襯＋開領雙翻領
    fill '${DARK}'
    stroke 'none'
    polygon 405,175 595,175 500,312
    fill '${SHADE}'
    stroke '${DARK}'
    stroke-width 18
    polygon 405,175 500,305 415,346 348,224
    polygon 595,175 500,305 585,346 652,224

    # 中央向上升團箭嘴（橙色主體＋暖金左半高光＋深綠粗邊分隔）
    fill '${ARROW}'
    stroke '${DARK}'
    stroke-width 26
    polygon 500,332 668,516 568,516 568,786 432,786 432,516 332,516
    fill '${GOLD}'
    stroke 'none'
    polygon 500,350 500,773 445,773 445,503 360,503
    fill 'none'
    stroke '${DARK}'
    stroke-width 24
    polygon 500,332 668,516 568,516 568,786 432,786 432,516 332,516
  pop graphic-context
pop graphic-context
EOF
  convert -size 1000x1000 "mvg:${mvg}" -alpha off "$dst"
}

render_master "0.84" "$TMP/any-1000.png" "full"
render_master "0.86" "$TMP/small-1000.png" "simple"
render_master "0.58" "$TMP/mask-1000.png" "full"

render_png8() {
  local src="$1"
  local size="$2"
  local dst="$3"
  local colors="${4:-48}"
  convert "$src" \
    -resize "${size}x${size}!" \
    -alpha off \
    +dither -colors "$colors" \
    -strip \
    "PNG8:${dst}"
}

render_png8 "$TMP/any-1000.png"   512 "$OUT/icon-512.png" 48
render_png8 "$TMP/any-1000.png"   192 "$OUT/icon-192.png" 48
render_png8 "$TMP/any-1000.png"   180 "$OUT/apple-touch-icon.png" 48
render_png8 "$TMP/small-1000.png" 48  "$TMP/icon-48.png" 32
render_png8 "$TMP/small-1000.png" 32  "$OUT/favicon-32.png" 32

render_png8 "$TMP/mask-1000.png"  512 "$OUT/icon-maskable-512.png" 48
render_png8 "$TMP/mask-1000.png"  192 "$OUT/icon-maskable-192.png" 48

# ── 2) 16×16 獨立像素級手繪（G11 §6：整數格點、唔由 512 縮細） ──────────────
convert -size 16x16 "xc:${BG}" \
  -fill "$SHADE" \
  -draw "rectangle 1,5 2,8" \
  -draw "rectangle 13,5 14,8" \
  -fill "$SHIRT" \
  -draw "rectangle 3,3 12,13" \
  -draw "rectangle 2,4 3,7" \
  -draw "rectangle 12,4 13,7" \
  -fill "$DARK" \
  -draw "rectangle 6,3 9,4" \
  -draw "point 7,5" \
  -draw "point 8,5" \
  -fill "$SHADE" \
  -draw "point 5,4" \
  -draw "point 10,4" \
  -fill "$ARROW" \
  -draw "rectangle 7,6 8,12" \
  -draw "rectangle 5,8 10,8" \
  -draw "rectangle 6,7 9,7" \
  -fill "$GOLD" \
  -draw "rectangle 7,6 7,12" \
  -draw "point 6,7" \
  -draw "point 5,8" \
  -alpha off +dither -colors 16 -strip \
  "PNG8:$OUT/favicon-16.png"

# ── 3) favicon.ico（內含 16 / 32 / 48 三層） ────────────────────────────────
convert "$OUT/favicon-16.png" "$OUT/favicon-32.png" "$TMP/icon-48.png" "$OUT/favicon.ico"

# ── 4) og-image.png（1200×630 實色底社交預覽卡，零漸層、右側充足安全邊距） ──
convert -size 1200x630 "xc:${BG}" \
  -fill "$GOLD"  -draw "rectangle 0,0 1200,10" \
  -fill "$ARROW" -draw "rectangle 0,620 1200,630" \
  -fill "$BG" -stroke "$GOLD" -strokewidth 4 \
  -draw "roundrectangle 72,105 492,525 36,36" \
  -stroke none \
  \( "$TMP/any-1000.png" -resize 380x380! \) -geometry +92+125 -composite \
  -fill "$ARROW" -draw "roundrectangle 540,136 636,146 4,4" \
  -font "DejaVu-Sans-Bold" -pointsize 54 -fill "$SHIRT" \
  -annotate +540+214 "SCOUT UNIFORM" \
  -font "DejaVu-Sans-Bold" -pointsize 50 -fill "$GOLD" \
  -annotate +540+280 "& BADGE GUIDE" \
  -font "DejaVu-Sans" -pointsize 20 -fill "$SHADE" \
  -annotate +540+340 "Grasshopper / Cub / Scout / Venture / Rover / Leader" \
  -fill "#ff7a1a" -draw "roundrectangle 540,374 620,392 9,9" \
  -fill "#5a8f3a" -draw "roundrectangle 632,374 712,392 9,9" \
  -fill "#2d8a5b" -draw "roundrectangle 724,374 804,392 9,9" \
  -fill "#a83344" -draw "roundrectangle 816,374 896,392 9,9" \
  -fill "#2b6cb0" -draw "roundrectangle 908,374 988,392 9,9" \
  -fill "#718096" -draw "roundrectangle 1000,374 1080,392 9,9" \
  -font "DejaVu-Sans" -pointsize 21 -fill "$SHIRT" \
  -annotate +540+452 "HK Scout Uniform Checklist  |  2026 Training Scheme" \
  -font "DejaVu-Sans-Bold" -pointsize 20 -fill "$SHADE" \
  -annotate +540+504 "upgrade-ashen.vercel.app  |  SCOUT SYSTEM" \
  -alpha off +dither -colors 64 -strip \
  "PNG8:$OUT/og-image.png"

echo "✅ icons/ 9 個檔案已產出："
ls -lh "$OUT"
TOTAL_BYTES=$(du -cb "$OUT"/* | tail -n1 | awk '{print $1}')
echo "合計：$((TOTAL_BYTES / 1024)) KB（G11 上限 260 KB）"
