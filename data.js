/* ===========================================================
   童軍準備指南 — 制服資料庫
   資料來源（全部為香港童軍總會中文官方資料）:
   - 香港童軍總會官網「制服」頁（青少年成員 / 成年成員）
     https://www.scout.org.hk/tc/youth-members/…/index.html?sid=2
     https://www.scout.org.hk/tc/adult-members/leader/index.html?sid=2
   - 青少年活動通告第 13/2023 號《支部成員徽章佩戴指引》
   - 《童軍訓練綱要》附錄「徽章領取／購買」、「深資童軍先修章」
   =========================================================== */

// 支部基本資料（年齡為總會官網 2025 年資料）
const SECTIONS = {
  grasshopper: { name: "小童軍", nameEn: "Grasshopper Scout", age: "4–7 歲", color: "#ff7a1a",
    note: "小童軍服裝只設領巾及簡單整齊的集會服裝；旅團亦可安排自家統一服飾，以旅團安排為準。",
    upgradeFrom: [], upgradeTo: "cub", hasBranch: false },
  cub:     { name: "幼童軍",   nameEn: "Cub Scout",     age: "6–11 歲",  color: "#5a8f3a", upgradeFrom: ["grasshopper"], upgradeTo: "scout",   hasBranch: false },
  scout:   { name: "童軍",     nameEn: "Scout",         age: "11–15 歲", color: "#0a5c36", upgradeFrom: ["cub"],         upgradeTo: "venture", hasBranch: true },
  venture: { name: "深資童軍", nameEn: "Venture Scout", age: "15–20 歲", color: "#7a1f2b", upgradeFrom: ["scout"],       upgradeTo: "rover",   hasBranch: true },
  rover:   { name: "樂行童軍", nameEn: "Rover Scout",   age: "18–25 歲", color: "#0a3a5c", upgradeFrom: ["venture"],     upgradeTo: "leader",  hasBranch: true },
  // 領袖有 3 個來源：由深資升任 / 由樂行升任 / 全新加入
  leader:  { name: "領袖",     nameEn: "Leader",        age: "成年成員", color: "#3a3a3a", upgradeFrom: ["venture","rover"], upgradeTo: null, hasBranch: true }
};

// 海 / 陸 / 空 類型
const BRANCHES = {
  land: { name: "陸童軍", short: "陸", icon: "🌲", desc: "最常見（綠色系）" },
  sea:  { name: "海童軍", short: "海", icon: "⚓", desc: "白恤衫、深藍褲" },
  air:  { name: "空童軍", short: "空", icon: "✈️", desc: "淺藍恤衫、灰藍軟帽" }
};

/* ===========================================================
   單件制服 / 配件目錄
   每件有 img（單件圖片）。id 相同 = 同一件物品，升團時可沿用。
   =========================================================== */
const ITEMS = {
  /* ── 帽 ── */
  "cap-cub-m": { title:"深綠色黃間條鴨舌帽", desc:"幼童軍男團員（連帽章）", icon:"🧢", img:"assets/items/cap-cub-m.jpg", buy:"supply",
    detail:`<h4>幼童軍帽（男）</h4><p><strong>官方規格：</strong>深綠色、黃間條、鴨舌帽（連帽章）</p>
      <ul><li>向後拉平，緊貼頭部</li><li>帽章在<strong>左眼正上方</strong></li></ul>` },
  "cap-cub-f": { title:"深綠色圓形有邊帽", desc:"幼童軍女團員（連帽章）", icon:"👒", img:"assets/items/cap-cub-f.jpg", buy:"supply",
    detail:`<h4>幼童軍帽（女）</h4><p><strong>官方規格：</strong>深綠色、圓形、有邊帽（連帽章）</p>
      <ul><li>帽章在<strong>左眼正上方</strong></li></ul>` },
  "beret-green": { title:"深綠色軟帽", desc:"童軍／樂行童軍／領袖（陸）", icon:"🧢", img:"assets/items/beret-green.jpg", buy:"supply",
    detail:`<h4>深綠色軟帽</h4><p>童軍、樂行童軍及陸童軍領袖同用<strong>深綠色軟帽</strong>，只是帽章不同。</p>
      <ul><li>向右拉平，緊貼頭部</li><li>帽後小尾塞入帽內，不可戴成「廚師帽」</li><li>首次使用前先弄濕定型</li><li>帽章在<strong>左眼正上方</strong></li></ul>` },
  "beret-maroon": { title:"棗紅色軟帽", desc:"深資童軍（陸）", icon:"🧢", img:"assets/items/beret-maroon.jpg", buy:"supply",
    detail:`<h4>棗紅色軟帽</h4><p><strong>官方規格：</strong>棗紅色軟帽（連童軍帽章）。深資童軍（陸）專用。</p>
      <div class="tip">帽章是<strong>童軍帽章</strong>（與童軍支部相同），由童軍升團可把帽章拆下移到新帽。</div>` },
  "beret-greyblue": { title:"灰藍色軟帽", desc:"空童軍／空童軍領袖", icon:"🧢", img:"assets/items/beret-greyblue.jpg", buy:"supply",
    detail:`<h4>灰藍色軟帽</h4><p>空童軍、深資空童軍、樂行空童軍及空童軍領袖同用灰藍色軟帽（青少年連童軍帽章；領袖連職級帽章）。</p>` },
  "cap-sea-scout": { title:"海童軍白頂帽（連海童軍帽帶）", desc:"童軍支部・海童軍", icon:"⚓", img:"assets/items/cap-sea-scout.jpg", buy:"supply",
    detail:`<h4>海童軍白頂帽</h4><p><strong>官方規格：</strong>海童軍白頂帽（連海童軍帽帶）。童軍支部海童軍男女團員同款。</p>
      <div class="warn">升深資海童軍後改用<strong>海童軍領袖白頂帽</strong>（另一款），不可沿用。</div>` },
  "cap-sea-leader-m": { title:"海童軍男領袖白頂帽", desc:"深資／樂行／領袖・海（男）", icon:"⚓", img:"assets/items/cap-sea-leader-m.jpg", buy:"supply",
    detail:`<h4>海童軍男領袖白頂帽</h4><p>深資海童軍、樂行海童軍及海童軍男領袖同用此帽，只是帽章不同（深資海童軍帽章／樂行海童軍帽章／海童軍領袖帽章）。</p>` },
  "cap-sea-leader-f": { title:"海童軍女領袖白頂帽", desc:"深資／樂行／領袖・海（女）", icon:"⚓", img:"assets/items/cap-sea-leader-f.jpg", buy:"supply",
    detail:`<h4>海童軍女領袖白頂帽</h4><p>深資海童軍、樂行海童軍及海童軍女領袖同用此帽，只是帽章不同。</p>` },
  "hat-leader-f": { title:"深綠色金邊硬帽", desc:"女性成年成員（陸）", icon:"👒", img:"assets/items/hat-leader-f.jpg", buy:"supply",
    detail:`<h4>深綠色金邊硬帽</h4><p><strong>官方規格：</strong>深綠色金邊硬帽（連職級帽章）。女領袖常規制服（編號 3）、領帶制服（編號 4）及禮服（編號 1）用。</p>
      <div class="tip">女領袖長褲制服（編號 6）則改用<strong>深綠色軟帽</strong>。</div>` },

  /* ── 帽章 ── */
  "capbadge-cub": { title:"幼童軍帽章", desc:"金屬帽章", icon:"🎖️", img:"assets/items/capbadge-cub.svg", buy:"supply",
    detail:`<h4>幼童軍帽章</h4><p>金屬幼童軍帽章，戴在<strong>左眼正上方</strong>。</p>
      <div class="tip">供應社的「男／女幼童軍帽」（編號 01171／01172，HK$50）已<strong>連帽章</strong>出售，供應社網站沒有獨立的幼童軍帽章產品；如帽章遺失可到供應社門市查詢補購。</div>` },
  "capbadge-scout": { title:"童軍帽章", desc:"童軍／深資／樂行同用", icon:"🎖️", img:"assets/items/capbadge-scout.svg", buy:"supply",
    detail:`<h4>童軍帽章</h4><p>根據總會官網，童軍、深資童軍（陸／空）、樂行童軍（陸／空）的軟帽全部是「連<strong>童軍帽章</strong>」。</p>
      <div class="tip">即是說：由童軍升深資、深資升樂行，<strong>帽章可以沿用</strong>，只需換帽。</div>` },
  "capbadge-venture-sea": { title:"深資海童軍帽章", desc:"深資海童軍專用", icon:"🎖️", img:"assets/items/capbadge-venture-sea.svg", buy:"supply",
    detail:`<h4>深資海童軍帽章</h4><p>釘於海童軍領袖白頂帽上。</p>` },
  "capbadge-rover-sea": { title:"樂行海童軍帽章", desc:"樂行海童軍專用", icon:"🎖️", img:"assets/items/capbadge-rover-sea.svg", buy:"supply",
    detail:`<h4>樂行海童軍帽章</h4><p>釘於海童軍領袖白頂帽上。由深資海童軍升上來需更換帽章。</p>` },
  "capbadge-rank": { title:"職級帽章", desc:"領袖（陸／空）", icon:"🎖️", img:"assets/items/capbadge-rank.svg", buy:"check",
    detail:`<h4>職級帽章</h4><p>領袖軟帽／硬帽上戴<strong>職級帽章</strong>，款式視乎所獲委任的職級。</p>
      <div class="warn">請於獲委任後向所屬旅團／區查詢應購買哪一款。</div>` },
  "capbadge-sea-leader": { title:"海童軍領袖帽章", desc:"海童軍領袖", icon:"🎖️", img:"assets/items/capbadge-sea-leader.svg", buy:"check",
    detail:`<h4>海童軍領袖帽章</h4><p>釘於海童軍男／女領袖白頂帽上。獲委任後向所屬旅團查詢。</p>` },

  /* ── 恤衫 ── */
  "shirt-beige": { title:"杏色短袖恤衫", desc:"兩胸袋、無褶、肩帶", icon:"👕", img:"assets/items/shirt-beige.jpg", buy:"supply",
    detail:`<h4>杏色恤衫</h4><p><strong>官方規格：</strong>杏色、短袖、兩胸袋、無褶、肩帶。幼童軍到領袖（陸）全部同款。</p>
      <ul><li>必須束入褲／裙內</li><li>戴領巾時最頂鈕要扣</li><li>建議買大一碼，青少年成長快</li></ul>` },
  "shirt-white": { title:"白色短袖恤衫", desc:"海童軍・兩胸袋、無褶、肩帶", icon:"👕", img:"assets/items/shirt-white.svg", buy:"supply",
    detail:`<h4>白色恤衫（海童軍）</h4><p><strong>官方規格：</strong>白色、短袖、兩胸袋、無褶、肩帶。海童軍、深資海童軍、樂行海童軍及海童軍領袖同款。</p>` },
  "shirt-lightblue": { title:"淺藍色短袖恤衫", desc:"空童軍・兩胸袋、無褶、肩帶", icon:"👕", img:"assets/items/shirt-lightblue.svg", buy:"supply",
    detail:`<h4>淺藍色恤衫（空童軍）</h4><p><strong>官方規格：</strong>淺藍色、短袖、兩胸袋、無褶、肩帶。空童軍、深資空童軍、樂行空童軍及空童軍領袖同款。</p>` },

  /* ── 下身 ── */
  "shorts-olive": { title:"草青色短褲", desc:"兩斜袋、兩後袋、有褶", icon:"🩳", img:"assets/items/shorts-olive.svg", buy:"supply",
    detail:`<h4>草青色短褲</h4><p><strong>官方規格：</strong>草青色、兩斜袋、兩後袋、有褶。幼童軍及童軍（陸）男團員。</p><ul><li>穿在腰位，配棕色皮帶</li></ul>` },
  "shorts-navy": { title:"深藍色短褲", desc:"海／空童軍男團員", icon:"🩳", img:"assets/items/shorts-navy.svg", buy:"supply",
    detail:`<h4>深藍色短褲</h4><p><strong>官方規格：</strong>深藍色、兩斜袋、兩後袋、有褶。海童軍及空童軍男團員。</p>` },
  "culottes-olive": { title:"草青色裙褲", desc:"側袋、弓字褶", icon:"👗", img:"assets/items/culottes-olive.svg", buy:"supply",
    detail:`<h4>草青色裙褲</h4><p><strong>官方規格：</strong>草青色、側袋、弓字褶。幼童軍及童軍（陸）女團員。</p>` },
  "culottes-navy": { title:"深藍色裙褲", desc:"海／空童軍女團員", icon:"👗", img:"assets/items/culottes-navy.svg", buy:"supply",
    detail:`<h4>深藍色裙褲</h4><p><strong>官方規格：</strong>深藍色、側袋、弓字褶。海童軍及空童軍女團員。</p>` },
  "trousers-olive": { title:"草青色長褲", desc:"兩斜袋、兩後袋、有褶", icon:"👖", img:"assets/items/trousers-olive.svg", buy:"supply",
    detail:`<h4>草青色長褲</h4><p><strong>官方規格：</strong>草青色、兩斜袋、兩後袋、有褶。深資、樂行及領袖（陸）男性；女領袖長褲制服（編號 6）亦用。</p>` },
  "trousers-navy": { title:"深藍色長褲", desc:"海／空・深資／樂行／領袖", icon:"👖", img:"assets/items/trousers-navy.svg", buy:"supply",
    detail:`<h4>深藍色長褲</h4><p><strong>官方規格：</strong>深藍色、兩斜袋、兩後袋、有褶。深資／樂行海空童軍男團員及海空童軍男領袖。</p>` },
  "skirt-olive": { title:"草青色半截裙", desc:"側袋、無褶、及膝", icon:"👗", img:"assets/items/skirt-olive.svg", buy:"supply",
    detail:`<h4>草青色半截裙</h4><p><strong>官方規格：</strong>草青色、側袋、無褶、及膝。深資、樂行及領袖（陸）女性。</p>` },
  "skirt-navy": { title:"深藍色半截裙", desc:"海／空・深資／樂行／領袖", icon:"👗", img:"assets/items/skirt-navy.svg", buy:"supply",
    detail:`<h4>深藍色半截裙</h4><p><strong>官方規格：</strong>深藍色、側袋、無褶、及膝。深資／樂行海空童軍女團員及海空童軍女領袖。</p>` },

  /* ── 皮帶 ── */
  "belt": { title:"棕色皮帶（連童軍徽皮帶扣）", desc:"所有支部同款", icon:"👔", img:"assets/items/belt.svg", buy:"supply",
    detail:`<h4>棕色皮帶</h4><p><strong>官方規格：</strong>棕色（連童軍徽皮帶扣）。由幼童軍到領袖、海陸空全部同款，一條用到底。</p><ul><li>皮帶扣置正中</li><li>不掛多餘匙扣</li></ul>` },

  /* ── 襪 ── */
  "socks-long-olive": { title:"深草青色長襪", desc:"幼童軍／童軍（陸）", icon:"🧦", img:"assets/items/socks-long-olive.svg", buy:"supply",
    detail:`<h4>深草青色長襪</h4><p>拉至膝下，反摺約 3 厘米成襪邊。不可穿運動短襪或船襪。</p>` },
  "socks-long-navy": { title:"深藍色長襪", desc:"海／空童軍", icon:"🧦", img:"assets/items/socks-long-navy.svg", buy:"supply",
    detail:`<h4>深藍色長襪</h4><p>海童軍及空童軍（童軍支部）用深藍色長襪。</p>` },
  "socks-short-black": { title:"黑色短襪", desc:"深資／樂行／領袖男性", icon:"🧦", img:"assets/items/socks-short-black.svg", buy:"any",
    detail:`<h4>黑色短襪</h4><p><strong>官方規格：</strong>黑色、短襪。配長褲。一般黑色短襪即可，不一定要在供應社購買。</p>` },
  "pantyhose": { title:"肉色尼龍襪褲", desc:"深資／樂行／領袖女性", icon:"🧦", img:"assets/items/pantyhose.svg", buy:"any",
    detail:`<h4>肉色尼龍襪褲</h4><p><strong>官方規格：</strong>肉色、尼龍、無花、襪褲。自行到絲襪店購買即可。</p>` },

  /* ── 皮鞋 ── */
  "shoes-lace": { title:"黑色無花紋綁帶皮鞋", desc:"男性各支部／幼童軍及童軍女團員", icon:"👞", img:"assets/items/shoes-lace.svg", buy:"any",
    detail:`<h4>黑色綁帶皮鞋</h4><p><strong>官方規格：</strong>黑色、無花紋、綁帶。合規格的學校皮鞋可以用。集會前要擦亮。</p>` },
  "shoes-heel": { title:"黑色非綁帶中跟皮鞋", desc:"深資／樂行／領袖女性", icon:"👠", img:"assets/items/shoes-heel.svg", buy:"any",
    detail:`<h4>黑色非綁帶中跟皮鞋</h4><p><strong>官方規格：</strong>黑色、無花紋、非綁帶、中跟。自行到鞋店購買。</p>
      <div class="warn">由童軍升深資的女團員：綁帶皮鞋<strong>不合規格</strong>，要換中跟鞋。</div>` },

  /* ── 領巾 / 巾圈 ── */
  "scarf": { title:"旅巾", desc:"由旅團頒發", icon:"🧣", img:"assets/items/scarf.svg", buy:"group",
    detail:`<h4>旅巾</h4><p>旅巾代表所屬旅團，一般於<strong>宣誓／會員章考核通過後由旅團頒發</strong>。同一旅升團可繼續用。</p>
      <ul><li>戴在恤衫領外</li><li>巾圈位於喉部，不可太低</li></ul>` },
  "woggle-cub": { title:"顏色巾圈（幼童軍）", desc:"官方：旅巾（連顏色巾圈）", icon:"⭕", img:"assets/items/woggle-cub.svg", buy:"check",
    detail:`<h4>幼童軍顏色巾圈</h4><p>總會官網幼童軍制服為「旅巾（連<strong>顏色巾圈</strong>）」，顏色代表所屬小隊（六人小隊），由旅團安排。</p>` },
  "woggle-scout": { title:"童軍巾圈", desc:"童軍／深資／樂行／領袖同用", icon:"⭕", img:"assets/items/woggle-scout.svg", buy:"supply",
    detail:`<h4>童軍巾圈</h4><p>總會官網由童軍到領袖全部寫「旅巾（連<strong>童軍巾圈</strong>）」，即升團後可沿用。</p>
      <div class="tip">童軍支部另有「小隊活動巾圈」，需出示童軍標準獎章或以上證書才可購買。</div>` },

  /* ── 徽章 ── */
  "badges-youth": { title:"基本徽章", desc:"世界童軍會員章、香港章、地域章、區章、旅章", icon:"🎖️", img:"assets/items/badges-youth.svg", buy:"mixed",
    detail:`<h4>基本徽章（青少年支部）</h4><p>總會官網列明幼童軍至樂行童軍的基本徽章為：<strong>世界童軍會員章、香港章、地域章、區章、旅章</strong>。</p>
      <ul>
        <li>世界童軍會員章：左胸袋中央（<strong>宣誓後</strong>才可佩戴）</li>
        <li>香港章：左胸袋上方</li>
        <li>旅章、區章、地域章：右袖（由上至下）</li>
      </ul>
      <p>會員章、香港章在供應社購買；地域章、區章、旅章多數由旅團代購或頒發。升團時徽章如狀況良好可沿用（同一旅同一區）。</p>
      <div class="tip">必須用線縫牢，不可用膠水或扣針。</div>` },
  "patrol-badge": { title:"小隊章", desc:"童軍支部・由旅團頒發／供應社購買", icon:"🐾", img:"assets/items/patrol-badge.svg", buy:"group-or-supply",
    detail:`<h4>小隊章</h4><p>只有<strong>童軍支部</strong>有小隊章（總會官網童軍制服徽章列表包括小隊章；深資／樂行沒有）。</p>
      <p>根據《童軍訓練綱要》附錄，小隊章在供應社發售，購買時毋須出示文件；亦有旅團會直接頒發。佩戴在<strong>右袖</strong>。</p>` },
  "badges-leader": { title:"領袖基本徽章", desc:"會員章、香港章、香港肩章／旅章、總會總部章／地域章／區章", icon:"🎖️", img:"assets/items/badges-leader.svg", buy:"mixed",
    detail:`<h4>基本徽章（領袖常規制服）</h4><p>總會官網領袖常規制服（編號 3）徽章：<strong>世界童軍會員章、香港章、香港肩章／旅章、總會總部章／地域章／區章、職級肩章</strong>。</p>
      <p>由青少年支部升任：世界童軍會員章、香港章可沿用；旅章／區章／地域章視乎服務單位，向旅團查詢。</p>
      <div class="tip">榮譽童軍獎章／貝登堡獎章持有人成為領袖後，可終身佩戴相應的<strong>領袖標誌</strong>。</div>` },
  "epaulette-rank": { title:"職級肩章", desc:"領袖・視乎委任職級", icon:"🎗️", img:"assets/items/epaulette-rank.svg", buy:"check",
    detail:`<h4>職級肩章</h4><p>戴於兩肩肩帶，款式視乎獲委任的職級（見習領袖／助理領袖／領袖／總監等）。獲委任後向旅團查詢應購買哪款。</p>` }
};

/* ===========================================================
   香港童軍物品供應社 (SCOUT SHOP, hkscoutshop.org.hk) 官方產品資料
   ─ 產品編號、零售價、官方產品相（資料擷取日期：2026-09-05）
   圖片直接引用供應社網站 files/mid/<id>_<n>.jpg（中圖）／files/thum/（細圖）；
   如供應社伺服器拒絕外連或圖片失效，會自動改用本地繪製的示意圖。
   =========================================================== */
const SHOP_BASE = "https://www.hkscoutshop.org.hk/";
const SHOP = {
  /* 帽 */
  "cap-cub-m":        { id:377,  n:1, code:"01171", name:"男幼童軍帽", price:50 },
  "cap-cub-f":        { id:378,  n:1, code:"01172", name:"女幼童軍帽", price:50 },
  "beret-green":      { id:3532, n:0, code:"01181", name:"深綠色軟帽(欖形)", price:80, alt:[{id:322,n:0,name:"深綠色軟帽"}] },
  "beret-maroon":     { id:313,  n:0, code:"01019", name:"深資童軍棗紅色軟帽", price:85, alt:[{id:3533,n:0,code:"01182",name:"深資童軍棗紅色軟帽(欖形)",price:85}] },
  "beret-greyblue":   { id:316,  n:0, code:"01024", name:"空童軍灰藍色軟帽", price:85, alt:[{id:3534,n:0,code:"01183",name:"空童軍灰藍色軟帽(欖形)",price:85}] },
  "cap-sea-scout":    { id:317,  n:0, code:"1025",  name:"海童軍白頂帽", price:259, extra:[{id:1843,n:0,code:"01033",name:"海童軍帽帶",price:12}] },
  "cap-sea-leader-m": { id:318,  n:1, code:"1026",  name:"海童軍男領袖白頂帽", price:415 },
  "cap-sea-leader-f": { id:319,  n:1, code:"1027",  name:"海童軍女領袖白頂帽", price:289 },
  "hat-leader-f":     { id:3086, n:0, code:"01136", name:"綠色女領袖制服禮帽", price:239 },
  /* 帽章 */
  "capbadge-scout":       { id:314,  n:0, code:"01020", name:"童軍帽章", price:9 },
  "capbadge-venture-sea": { id:1845, n:0, code:"1035",  name:"深資海童軍帽章", price:6 },
  "capbadge-sea-leader":  { id:1844, n:0, code:"01034", name:"海童軍領袖帽章", price:95 },
  "capbadge-rank":        { id:3507, n:0, code:"07332", name:"綠色團長帽章 (刺馬針配膠帽)", price:49,
    alt:[{id:3506,n:0,code:"07331",name:"紅色副團長帽章",price:49},{id:3508,n:0,code:"07333",name:"淺藍色旅長帽章",price:49},
         {id:3509,n:0,code:"07334",name:"灰色總部/地域/區領袖帽章",price:49},{id:410,n:0,code:"07072",name:"綠色團長帽章(布章)",price:33}] },
  /* 恤衫 */
  "shirt-beige":     { id:369, n:2, code:"01151", name:"杏色短袖恤衫", price:95, alt:[{id:370,n:2,code:"01152",name:"女裝杏色短袖恤衫",price:95}] },
  "shirt-white":     { id:334, n:2, code:"01069", name:"海童軍白色短袖恤衫", price:109 },
  "shirt-lightblue": { id:341, n:2, code:"01076", name:"空童軍淺藍色短袖恤衫", price:175 },
  /* 褲 / 裙 */
  "shorts-olive":    { id:373, n:0, code:"01155", name:"草青色短褲", price:79 },
  "shorts-navy":     { id:335, n:0, code:"01070", name:"深藍色短褲", price:129 },
  "culottes-olive":  { id:374, n:2, code:"01156", name:"草青色弓字褶裙褲", price:79 },
  "culottes-navy":   { id:339, n:2, code:"01074", name:"深藍色弓字褶裙褲", price:129 },
  "trousers-olive":  { id:375, n:2, code:"01157", name:"草青色長褲", price:119, alt:[{id:376,n:2,code:"01158",name:"草青色女裝長褲",price:119}] },
  "trousers-navy":   { id:340, n:0, code:"01075", name:"深藍色長褲", price:149 },
  "skirt-olive":     { id:328, n:2, code:"01051", name:"草青色半截裙", price:89 },
  "skirt-navy":      { id:345, n:2, code:"01080", name:"深藍色半截裙", price:96 },
  /* 皮帶 / 襪 */
  "belt":             { id:3549, n:0, code:"01008", name:"頭層皮皮帶", price:200 },
  "socks-long-olive": { id:310,  n:0, code:"01012", name:"深草青色棉質長襪", price:30, alt:[{id:3050,n:0,code:"01013",name:"深草青色羊毛長襪",price:42}] },
  "socks-long-navy":  { id:312,  n:0, code:"01016", name:"深藍色棉質長襪", price:30 },
  "socks-short-black":{ id:311,  n:0, code:"01014", name:"黑色棉質短襪", price:15 },
  /* 領巾 / 巾圈 */
  "scarf":        { id:391,  n:0, code:"07010", name:"香港童軍綠色領巾", price:55, note:"旅巾通常由旅團頒發；供應社只售總會綠色領巾。" },
  "woggle-scout": { id:3489, n:0, code:"01031", name:"頭層皮巾圈 (可調校大小)", price:19 },
  "woggle-cub":   { id:333,  n:0, code:"01062", name:"幼童軍塑膠巾圈", price:4 },
  /* 小童軍 */
  "gh-clothes":   { id:3084, n:0, name:"小童軍活動服", price:75, note:"旅團如安排自家統一服飾，以旅團安排為準。" },
  /* 徽章 */
  "badges-youth":  { id:1846, n:0, code:"01037", name:"世界童軍會員章", price:6,
    extra:[{id:1847,n:0,code:"01038",name:"香港章",price:6},{id:684,n:0,code:"23054",name:"港島地域章（例）",price:2.5},{id:689,n:0,code:"23104",name:"離島區區章（例）",price:6.5}] },
  "badges-leader": { id:1846, n:0, code:"01037", name:"世界童軍會員章", price:6,
    extra:[{id:1847,n:0,code:"01038",name:"香港章",price:6},{id:406,n:0,code:"07040",name:"香港總會總部章",price:7.5}] },
  "patrol-badge":  { id:385, n:0, code:"04076", name:"童軍隊色章", price:3.5 },
  "epaulette-rank":{ id:400, n:0, code:"07311", name:"綠色團長肩章", price:33,
    alt:[{id:401,n:0,code:"07312",name:"紅色副團長肩章",price:33},{id:405,n:0,code:"07310",name:"淺藍色旅長肩章",price:33},{id:403,n:0,code:"07309",name:"灰色總部/地域/區領袖肩章",price:33}] }
};
// 服務年星 (01120, id 357, $3.5)、隊長章 (01122, id 359, $5) 亦在供應社「識別章」分類發售。
function shopImg(p, size){ return p ? `${SHOP_BASE}files/${size || "mid"}/${p.id}_${p.n || 0}.jpg` : null; }
function shopUrl(p){ return p ? `${SHOP_BASE}index.php?p=6&id=${p.id}` : null; }
function shopInfo(itemId){
  const p = SHOP[itemId];
  if(!p) return null;
  return { ...p, img: shopImg(p), thumb: shopImg(p, "thum"), url: shopUrl(p) };
}

/* ===========================================================
   各支部 × 類型 × 性別 的官方制服組成（總會官網原文順序）
   =========================================================== */
const UNIFORM_SPEC = {
  cub: { land: {
    male:   ["cap-cub-m","capbadge-cub","shirt-beige","shorts-olive","belt","socks-long-olive","shoes-lace","scarf","woggle-cub","badges-youth"],
    female: ["cap-cub-f","capbadge-cub","shirt-beige","culottes-olive","belt","socks-long-olive","shoes-lace","scarf","woggle-cub","badges-youth"] } },
  scout: {
    land: {
      male:   ["beret-green","capbadge-scout","shirt-beige","shorts-olive","belt","socks-long-olive","shoes-lace","scarf","woggle-scout","badges-youth","patrol-badge"],
      female: ["beret-green","capbadge-scout","shirt-beige","culottes-olive","belt","socks-long-olive","shoes-lace","scarf","woggle-scout","badges-youth","patrol-badge"] },
    sea: {
      male:   ["cap-sea-scout","shirt-white","shorts-navy","belt","socks-long-navy","shoes-lace","scarf","woggle-scout","badges-youth","patrol-badge"],
      female: ["cap-sea-scout","shirt-white","culottes-navy","belt","socks-long-navy","shoes-lace","scarf","woggle-scout","badges-youth","patrol-badge"] },
    air: {
      male:   ["beret-greyblue","capbadge-scout","shirt-lightblue","shorts-navy","belt","socks-long-navy","shoes-lace","scarf","woggle-scout","badges-youth","patrol-badge"],
      female: ["beret-greyblue","capbadge-scout","shirt-lightblue","culottes-navy","belt","socks-long-navy","shoes-lace","scarf","woggle-scout","badges-youth","patrol-badge"] }
  },
  venture: {
    land: {
      male:   ["beret-maroon","capbadge-scout","shirt-beige","trousers-olive","belt","socks-short-black","shoes-lace","scarf","woggle-scout","badges-youth"],
      female: ["beret-maroon","capbadge-scout","shirt-beige","skirt-olive","belt","pantyhose","shoes-heel","scarf","woggle-scout","badges-youth"] },
    sea: {
      male:   ["cap-sea-leader-m","capbadge-venture-sea","shirt-white","trousers-navy","belt","socks-short-black","shoes-lace","scarf","woggle-scout","badges-youth"],
      female: ["cap-sea-leader-f","capbadge-venture-sea","shirt-white","skirt-navy","belt","pantyhose","shoes-heel","scarf","woggle-scout","badges-youth"] },
    air: {
      male:   ["beret-greyblue","capbadge-scout","shirt-lightblue","trousers-navy","belt","socks-short-black","shoes-lace","scarf","woggle-scout","badges-youth"],
      female: ["beret-greyblue","capbadge-scout","shirt-lightblue","skirt-navy","belt","pantyhose","shoes-heel","scarf","woggle-scout","badges-youth"] }
  },
  rover: {
    land: {
      male:   ["beret-green","capbadge-scout","shirt-beige","trousers-olive","belt","socks-short-black","shoes-lace","scarf","woggle-scout","badges-youth"],
      female: ["beret-green","capbadge-scout","shirt-beige","skirt-olive","belt","pantyhose","shoes-heel","scarf","woggle-scout","badges-youth"] },
    sea: {
      male:   ["cap-sea-leader-m","capbadge-rover-sea","shirt-white","trousers-navy","belt","socks-short-black","shoes-lace","scarf","woggle-scout","badges-youth"],
      female: ["cap-sea-leader-f","capbadge-rover-sea","shirt-white","skirt-navy","belt","pantyhose","shoes-heel","scarf","woggle-scout","badges-youth"] },
    air: {
      male:   ["beret-greyblue","capbadge-scout","shirt-lightblue","trousers-navy","belt","socks-short-black","shoes-lace","scarf","woggle-scout","badges-youth"],
      female: ["beret-greyblue","capbadge-scout","shirt-lightblue","skirt-navy","belt","pantyhose","shoes-heel","scarf","woggle-scout","badges-youth"] }
  },
  // 領袖：常規制服（編號 3）
  leader: {
    land: {
      male:   ["beret-green","capbadge-rank","shirt-beige","trousers-olive","belt","socks-short-black","shoes-lace","scarf","woggle-scout","badges-leader","epaulette-rank"],
      female: ["hat-leader-f","capbadge-rank","shirt-beige","skirt-olive","belt","pantyhose","shoes-heel","scarf","woggle-scout","badges-leader","epaulette-rank"] },
    sea: {
      male:   ["cap-sea-leader-m","capbadge-sea-leader","shirt-white","trousers-navy","belt","socks-short-black","shoes-lace","scarf","woggle-scout","badges-leader","epaulette-rank"],
      female: ["cap-sea-leader-f","capbadge-sea-leader","shirt-white","skirt-navy","belt","pantyhose","shoes-heel","scarf","woggle-scout","badges-leader","epaulette-rank"] },
    air: {
      male:   ["beret-greyblue","capbadge-rank","shirt-lightblue","trousers-navy","belt","socks-short-black","shoes-lace","scarf","woggle-scout","badges-leader","epaulette-rank"],
      female: ["beret-greyblue","capbadge-rank","shirt-lightblue","skirt-navy","belt","pantyhose","shoes-heel","scarf","woggle-scout","badges-leader","epaulette-rank"] }
  }
};

// 小童軍（簡單整齊集會服裝，旅團可安排自家統一服飾）
const GRASSHOPPER_ITEM = {
  id:"gh-clothes", title:"小童軍要準備什麼服裝？", desc:"簡單整齊集會服裝＋旅巾（以旅團安排為準）", status:"check", icon:"👕",
  detail:`<h4>小童軍服裝（總會官網「制服」頁）</h4>
    <p>總會官網列明：小童軍服裝<strong>只設領巾及簡單整齊的集會服裝</strong>，保留小童軍對正式穿著童軍制服的憧憬。</p>
    <ul>
      <li><strong>上衣</strong>：橙色小童軍活動服，或單色、有領／圓領、短袖／長袖上衣</li>
      <li><strong>褲</strong>：單色、短褲或長褲</li>
      <li><strong>鞋</strong>：運動鞋</li>
      <li><strong>襪</strong>：單色、短襪或長襪</li>
      <li><strong>帽（非必須）</strong>：單色、闊邊漁夫帽或鴨咀帽</li>
      <li><strong>領巾</strong>：已宣誓小童軍佩戴旅巾（連顏色巾圈）</li>
      <li><strong>徽章</strong>：小童軍團員章戴上衣左胸前（宣誓後）；進步獎章戴左袖</li>
    </ul>
    <div class="tip">旅團可安排自家統一服飾，實際以<strong>所屬旅團安排</strong>為準；旅巾、團員章須待宣誓後才可佩戴。</div>
    <div class="warn">除顏色巾圈外，小童軍不可使用其他支部制服配件（例如皮帶、制服帽）。</div>`
};

/* ===========================================================
   產生清單：比較「原本制服」與「目標制服」
   =========================================================== */
function getSpec(section, branch, gender){
  const s = UNIFORM_SPEC[section];
  if(!s) return null;
  const b = s[branch] || s.land;
  return b ? (b[gender] || b.male) : null;
}

// 取得升團來源（支部、類型）
function buildChecklist(opts){
  const { section, branch, gender, mode, fromSection, fromBranch } = opts;
  if(section === "grasshopper"){
    const gh = Object.assign({}, GRASSHOPPER_ITEM);
    const ghShop = shopInfo("gh-clothes");
    if(ghShop){ gh.shop = ghShop; gh.shopImg = ghShop.img; gh.shopUrl = ghShop.url; }
    return [gh];
  }
  const target = getSpec(section, branch, gender) || [];
  const source = (mode === "upgrade" && fromSection && fromSection !== "grasshopper")
    ? (getSpec(fromSection, fromBranch, gender) || []) : [];
  const fromName = fromSection ? (SECTIONS[fromSection]?.name || "") + (SECTIONS[fromSection]?.hasBranch ? "（" + (BRANCHES[fromBranch]?.short || "陸") + "）" : "") : "";

  return target.map(id => {
    const it = ITEMS[id];
    const had = source.includes(id);
    let status, note = "";
    if(mode === "upgrade" && source.length){
      if(had){
        status = "have";
        note = `<div class="tip">✅ 與${fromName}<strong>同一款</strong>，如狀況良好可沿用。</div>`;
        if(id === "badges-youth") note = `<div class="tip">✅ 世界童軍會員章、香港章、地域章、區章、旅章可沿用（同一旅）。<br><strong>要拆走</strong>舊支部的進度性獎章、活動／專科徽章、隊長章。服務年星保留。</div>`;
        if(id === "scarf") note = `<div class="tip">✅ 同一旅升團可繼續用原有旅巾。</div>`;
      } else {
        status = "need";
        note = `<div class="warn">🆕 ${fromName}沒有此款，需要購買／更換。</div>`;
      }
    } else {
      status = "need";
    }
    // 特殊：頒發／查詢類
    if(id === "scarf" && status !== "have") status = "check";
    if(["woggle-cub","capbadge-rank","capbadge-sea-leader","epaulette-rank"].includes(id) && status !== "have") status = "check";
    if(id === "patrol-badge") { status = had ? "have" : "check"; }
    if(id === "badges-leader") status = "need";

    const buyLabel = {
      supply: "香港童軍物品供應社購買",
      any: "供應社或一般商店購買",
      group: "由旅團頒發",
      check: "向旅團／區查詢",
      mixed: "供應社購買；旅章／區章／地域章向旅團查詢",
      "group-or-supply": "由旅團頒發／供應社購買"
    }[it.buy] || "";
    const shop = shopInfo(id);
    let shopHtml = "";
    if(shop){
      const row = (x) => `<li><a href="${shopUrl(x)}" target="_blank" rel="noopener">${x.name}</a>${x.code ? `（編號 ${x.code}）` : ""}${x.price != null ? ` HK$${x.price}` : ""}</li>`;
      shopHtml = `<div class="shop-box"><strong>🛒 供應社官方產品</strong><ul>${row(shop)}${(shop.extra || []).map(row).join("")}</ul>`
        + ((shop.alt && shop.alt.length) ? `<p class="cite">其他款式：${shop.alt.map(x => `<a href="${shopUrl(x)}" target="_blank" rel="noopener">${x.name}</a>${x.price != null ? ` HK$${x.price}` : ""}`).join("、")}</p>` : "")
        + (shop.note ? `<p class="cite">${shop.note}</p>` : "")
        + `<p class="cite">價錢為供應社網站標示零售價（2026-09 擷取），以店內為準。</p></div>`;
    }
    return {
      id, title: it.title, desc: it.desc, icon: it.icon, img: it.img, status,
      shop, shopImg: shop ? shop.img : null, shopThumb: shop ? shop.thumb : null, shopUrl: shop ? shop.url : null,
      detail: (it.detail || "") + note + (buyLabel ? `<p class="cite">🛒 ${buyLabel}</p>` : "") + shopHtml
    };
  });
}

/* ===========================================================
   官方整套制服實相（香港童軍總會官網 /uploads/member/）
   =========================================================== */
const OFFICIAL_PHOTOS = {
  cub:     { land: { male:"Cub_B.jpg", female:"Cub_G.jpg" }, src:"https://www.scout.org.hk/tc/youth-members/cub-scouts/index.html?sid=2" },
  scout:   { land: { male:"Scout_B.1.jpg", female:"Scout_G.1.jpg" }, sea: { male:"Scout_Sea_B.jpg", female:"Scout_Sea_G.jpg" }, air: { male:"Scout_Air_B.jpg", female:"Scout_Air_G.jpg" },
             src:"https://www.scout.org.hk/tc/youth-members/scouts/index.html?sid=2" },
  venture: { land: { male:"venture_scouts_B.jpg", female:"venture_scouts_G_dress.jpg" }, sea: { male:"venture_scouts_sea_B.jpg", female:"venture_scouts_sea_G_dress.jpg" }, air: { male:"venture_scouts_air_B.jpg", female:"venture_scouts_air_G_dress.jpg" },
             src:"https://www.scout.org.hk/tc/youth-members/venture-scouts/index.html?sid=2" },
  rover:   { land: { male:"rover_scouts_B.jpg", female:"rover_scouts_G_dress.jpg" }, sea: { male:"rover_scouts_sea_B.jpg", female:"rover_scouts_sea_G_dress.jpg" }, air: { male:"rover_scouts_air_B.jpg", female:"rover_scouts_air_G_dress.jpg" },
             src:"https://www.scout.org.hk/tc/youth-members/rover-scouts/index.html?sid=2" },
  leader:  { land: { male:"adult_uniform_3_B.jpg", female:"adult_uniform_3_G.jpg" }, sea: { male:"leader_sea_3_B.jpg", female:"leader_sea_3_G.jpg" }, air: { male:"leader_air_3_B.jpg", female:"leader_air_3_G.jpg" },
             src:"https://www.scout.org.hk/tc/adult-members/leader/index.html?sid=2" }
};
const OFFICIAL_IMG_BASE = "https://www.scout.org.hk/uploads/member/";
const LOCAL_FALLBACK = {
  cub: { male:"assets/images/cub-male.jpg", female:"assets/images/cub-female.jpg" },
  scout: { male:"assets/images/scout-male.jpg", female:"assets/images/scout-female.jpg" },
  venture: { male:"assets/images/venture-male.jpg", female:"assets/images/venture-female.jpg" },
  rover: { male:"assets/images/rover-male.jpg", female:"assets/images/rover-female.jpg" },
  leader: { male:"assets/images/leader-male.jpg", female:"assets/images/leader-female.jpg" }
};
function officialPhoto(section, branch, gender){
  const p = OFFICIAL_PHOTOS[section];
  if(!p) return null;
  const b = p[branch] || p.land;
  const file = b && b[gender];
  return { url: file ? OFFICIAL_IMG_BASE + file : null, src: p.src, fallback: LOCAL_FALLBACK[section]?.[gender] || null };
}
