/* ===========================================================
   童軍準備指南 — 制服資料庫
   資料來源（全部為香港童軍總會中文官方資料）:
   - 香港童軍總會官網「制服」頁（青少年成員 / 成年成員）
     https://www.scout.org.hk/tc/youth-members/…/index.html?sid=2
     https://www.scout.org.hk/tc/adult-members/leader/index.html?sid=2
   - 青少年活動通告第 13/2023 號《支部成員徽章佩戴指引》
   - 《童軍訓練綱要》附錄「徽章領取／購買」、「深資童軍先修章」
   =========================================================== */

// 參考圖的共用字串（handbookImage / uniformCrop 用）
const IMG_TEXT = {
  "zh-HK": {
    handbookLabel: "官方手冊參考圖（本地）",
    handbookSource: (page) => `官方手冊 p.${page} ↗`,
    cropLabel: "官方制服圖局部（本地）",
    cropSource: "總會制服頁 ↗"
  }
};

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
   圖片來源由 ITEM_REFERENCES / SHOP 提供；一般衣物可另設 img 示意圖。
   =========================================================== */
const ITEMS = {
  /* ── 帽 ── */
  "cap-cub-m": { title:"深綠色黃間條鴨舌帽", desc:"幼童軍男團員（連帽章）", icon:"🧢", buy:"supply",
    detail:`<h4>幼童軍帽（男）</h4><p><strong>官方規格：</strong>深綠色、黃間條、鴨舌帽（連帽章）</p>
      <ul><li>端正戴好，帽舌向前</li><li>帽冠上的布質帽章朝<strong>正前方</strong></li></ul>` },
  "cap-cub-f": { title:"深綠色圓形有邊帽", desc:"幼童軍女團員（連帽章）", icon:"👒", buy:"supply",
    detail:`<h4>幼童軍帽（女）</h4><p><strong>官方規格：</strong>深綠色、圓形、有邊帽（連帽章）</p>
      <ul><li>帽冠上的布質帽章朝<strong>正前方</strong></li></ul>` },
  "beret-green": { title:"深綠色軟帽", desc:"童軍／樂行童軍／領袖（陸）", icon:"🧢", buy:"supply",
    detail:`<h4>深綠色軟帽</h4><p>童軍、樂行童軍及陸童軍領袖同用<strong>深綠色軟帽</strong>，只是帽章不同。</p>
      <ul><li>向右拉平，緊貼頭部</li><li>帽後小尾塞入帽內，不可戴成「廚師帽」</li><li>首次使用前先弄濕定型</li><li>帽章在<strong>左眼正上方</strong></li></ul>` },
  "beret-maroon": { title:"棗紅色軟帽", desc:"深資童軍（陸）", icon:"🧢", img:"assets/items/beret-maroon.avif", buy:"supply",
    detail:`<h4>棗紅色軟帽</h4><p><strong>官方規格：</strong>棗紅色軟帽（連童軍帽章）。深資童軍（陸）專用。</p>
      <div class="tip">帽章是<strong>童軍帽章</strong>（與童軍支部相同），由童軍升團可把帽章拆下移到新帽。</div>` },
  "beret-greyblue": { title:"灰藍色軟帽", desc:"空童軍／空童軍領袖", icon:"🧢", buy:"supply",
    detail:`<h4>灰藍色軟帽</h4><p>空童軍、深資空童軍、樂行空童軍及空童軍領袖同用灰藍色軟帽（青少年連童軍帽章；領袖連職級帽章）。</p>` },
  "cap-sea-scout": { title:"海童軍白頂帽（連海童軍帽帶）", desc:"童軍支部・海童軍", icon:"⚓", img:"assets/items/cap-sea-scout.avif", buy:"supply",
    detail:`<h4>海童軍白頂帽</h4><p><strong>官方規格：</strong>海童軍白頂帽（連海童軍帽帶）。童軍支部海童軍男女團員同款。</p>
      <div class="warn">升深資海童軍後改用<strong>海童軍領袖白頂帽</strong>（另一款），不可沿用。</div>` },
  "cap-sea-leader-m": { title:"海童軍男領袖白頂帽", desc:"深資／樂行／領袖・海（男）", icon:"⚓", img:"assets/items/cap-sea-leader-m.avif", buy:"supply",
    detail:`<h4>海童軍男領袖白頂帽</h4><p>深資海童軍、樂行海童軍及海童軍男領袖同用此帽，青少年使用深資／樂行海童軍帽章，成年領袖使用海童軍領袖帽章。</p>` },
  "cap-sea-leader-f": { title:"海童軍女領袖白頂帽", desc:"深資／樂行／領袖・海（女）", icon:"⚓", img:"assets/items/cap-sea-leader-f.avif", buy:"supply",
    detail:`<h4>海童軍女領袖白頂帽</h4><p>深資海童軍、樂行海童軍及海童軍女領袖同用此帽，只是帽章不同。</p>` },
  "hat-leader-f": { title:"深綠色金邊硬帽", desc:"女性成年成員（陸）", icon:"👒", img:"assets/items/hat-leader-f.avif", buy:"supply",
    detail:`<h4>深綠色金邊硬帽</h4><p><strong>官方規格：</strong>深綠色金邊硬帽（連職級帽章）。女領袖常規制服（編號 3）、領帶制服（編號 4）及禮服（編號 1）用。</p>
      <div class="tip">女領袖長褲制服（編號 6）則改用<strong>深綠色軟帽</strong>。</div>` },

  /* ── 帽章 ── */
  "capbadge-cub": { title:"幼童軍帽章", desc:"布質帽章，已隨帽縫上（毋須另購）", icon:"🎖️", buy:"included",
    detail:`<h4>幼童軍帽章</h4><p>《儀容與制服手冊》第 98 頁列明：幼童軍帽章是<strong>布質帽章，已縫於帽冠上</strong>，佩戴時朝正前方；不是另配的金屬帽章。</p>
      <div class="tip">供應社的「男／女幼童軍帽」（編號 01171／01172，HK$50）已<strong>連帽章</strong>出售，毋須另購帽章；如布章損壞，請向旅團或供應社查詢。</div>` },
  "capbadge-scout": { title:"童軍帽章", desc:"童軍／深資／樂行同用", icon:"🎖️", buy:"supply",
    detail:`<h4>童軍帽章</h4><p>根據總會官網，童軍、深資童軍（陸／空）、樂行童軍（陸／空）的軟帽全部是「連<strong>童軍帽章</strong>」。</p>
      <div class="tip">即是說：由童軍升深資、深資升樂行，<strong>帽章可以沿用</strong>，只需換帽。</div>` },
  "capbadge-venture-sea": { title:"深資海童軍帽章", desc:"深資／樂行海童軍同款（官方手冊）", icon:"🎖️", buy:"supply",
    detail:`<h4>深資海童軍帽章</h4><p>官方手冊第 102 頁將<strong>深資／樂行海童軍帽章</strong>列為同一款，戴於白頂帽正前方、白色帽頂與黑色帽圍之間。</p>` },
  "capbadge-rover-sea": { title:"樂行海童軍帽章", desc:"深資／樂行海童軍同款（官方手冊）", icon:"🎖️", buy:"supply",
    detail:`<h4>樂行海童軍帽章</h4><p>官方手冊第 102 頁將<strong>深資／樂行海童軍帽章</strong>列為同一款；由深資海童軍升團可沿用，升團前向旅團確認現行安排。</p>` },
  "capbadge-rank": { title:"職級帽章", desc:"領袖（陸／空）", icon:"🎖️", buy:"check",
    detail:`<h4>職級帽章</h4><p>領袖軟帽／硬帽上戴<strong>職級帽章</strong>，款式視乎所獲委任的職級。</p>
      <div class="warn">請於獲委任後向所屬旅團／區查詢應購買哪一款。</div>` },
  "capbadge-sea-leader": { title:"海童軍領袖帽章", desc:"海童軍領袖", icon:"🎖️", buy:"check",
    detail:`<h4>海童軍領袖帽章</h4><p>釘於海童軍男／女領袖白頂帽上。獲委任後向所屬旅團查詢。</p>` },

  /* ── 恤衫 ── */
  "shirt-beige": { title:"杏色短袖恤衫", desc:"兩胸袋、無褶、肩帶", icon:"👕", img:"assets/items/shirt-beige.avif", buy:"supply",
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
  "belt": { title:"棕色皮帶（連童軍徽皮帶扣）", desc:"所有支部同款", icon:"👔", buy:"supply",
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
  "woggle-scout": { title:"童軍巾圈", desc:"童軍／深資／樂行／領袖同用", icon:"⭕", buy:"supply",
    detail:`<h4>童軍巾圈</h4><p>總會官網由童軍到領袖全部寫「旅巾（連<strong>童軍巾圈</strong>）」，即升團後可沿用。</p>
      <div class="tip">童軍支部另有「小隊活動巾圈」，需出示童軍標準獎章或以上證書才可購買。</div>` },

  /* ── 徽章 ── */
  "badges-youth": { title:"基本徽章", desc:"世界童軍會員章、香港章、地域章、區章、旅章", icon:"🎖️", buy:"mixed",
    detail:`<h4>基本徽章（青少年支部）</h4><p>總會官網列明幼童軍至樂行童軍的基本徽章為：<strong>世界童軍會員章、香港章、地域章、區章、旅章</strong>。</p>
      <ul>
        <li>世界童軍會員章：左胸袋中央（<strong>宣誓後</strong>才可佩戴）</li>
        <li>香港章：左胸袋上方</li>
        <li>旅章、區章、地域章：右袖（由上至下）</li>
      </ul>
      <p>會員章、香港章在供應社購買；地域章、區章、旅章多數由旅團代購或頒發。升團時徽章如狀況良好可沿用（同一旅同一區）。</p>
      <div class="tip">必須用線縫牢，不可用膠水或扣針。</div>` },
  "patrol-badge": { title:"小隊章", desc:"童軍支部・由旅團頒發／供應社購買", icon:"🐾", buy:"group-or-supply",
    detail:`<h4>小隊章</h4><p>只有<strong>童軍支部</strong>有小隊章（總會官網童軍制服徽章列表包括小隊章；深資／樂行沒有）。</p>
      <p>根據《童軍訓練綱要》附錄，小隊章在供應社發售，購買時毋須出示文件；亦有旅團會直接頒發。佩戴在<strong>右袖</strong>。</p>` },
  "badges-leader": { title:"領袖基本徽章", desc:"會員章、香港章、香港肩章／旅章、總會總部章／地域章／區章", icon:"🎖️", buy:"mixed",
    detail:`<h4>基本徽章（領袖常規制服）</h4><p>總會官網領袖常規制服（編號 3）徽章：<strong>世界童軍會員章、香港章、香港肩章／旅章、總會總部章／地域章／區章、職級肩章</strong>。</p>
      <p>由青少年支部升任：世界童軍會員章、香港章可沿用；旅章／區章／地域章視乎服務單位，向旅團查詢。</p>
      <div class="tip">榮譽童軍獎章／貝登堡獎章持有人成為領袖後，可終身佩戴相應的<strong>領袖標誌</strong>。</div>` },
  "epaulette-rank": { title:"職級肩章", desc:"領袖・視乎委任職級", icon:"🎗️", buy:"check",
    detail:`<h4>職級肩章</h4><p>戴於兩肩肩帶，款式視乎獲委任的職級（見習領袖／助理領袖／領袖／總監等）。獲委任後向旅團查詢應購買哪款。</p>` }
};

/* ===========================================================
   香港童軍物品供應社 (SCOUT SHOP, hkscoutshop.org.hk) 官方產品資料
   ─ 產品編號、零售價、官方產品相（資料擷取日期：2026-09-05）
   圖片直接引用供應社網站 files/mid/<id>_<n>.jpg（中圖）／files/thum/（細圖）；
   已核對的帽章等參考圖直接從本地載入；不再以自製徽章圖代替失效的官方圖片。
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
  const p = L().SHOP[itemId];
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
    <p>總會官網列明：小童軍服裝<strong>只設領巾及簡單整齊的集會服裝</strong>。<strong>旅團可安排自家統一服飾，實際以所屬旅團安排為準</strong>；旅團未有指定時，一般安排如下：</p>
    <ul>
      <li><strong>上衣</strong>：旅團統一活動服；或橙色小童軍活動服／單色、有領／圓領、短袖／長袖上衣</li>
      <li><strong>褲</strong>：單色、短褲或長褲</li>
      <li><strong>鞋</strong>：運動鞋</li>
      <li><strong>襪</strong>：單色、短襪或長襪</li>
      <li><strong>帽（非必須）</strong>：單色、闊邊漁夫帽或鴨咀帽</li>
      <li><strong>領巾</strong>：已宣誓小童軍佩戴旅巾（連顏色巾圈）</li>
      <li><strong>徽章</strong>：小童軍團員章戴上衣左胸前（宣誓後）；進步獎章戴左袖</li>
    </ul>
    <div class="tip">旅巾、小童軍團員章須待<strong>宣誓後</strong>才可佩戴。</div>
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
  const t = UI(), loc = L();
  if(section === "grasshopper"){
    const gh = Object.assign({}, loc.GRASSHOPPER_ITEM);
    const ghShop = shopInfo("gh-clothes");
    if(ghShop){ gh.shop = ghShop; gh.shopImg = ghShop.img; gh.shopUrl = ghShop.url; }
    return [gh];
  }
  const target = getSpec(section, branch, gender) || [];
  const source = (mode === "upgrade" && fromSection && fromSection !== "grasshopper")
    ? (getSpec(fromSection, fromBranch, gender) || []) : [];
  const fromSec = fromSection ? loc.SECTIONS[fromSection] : null;
  const fromShort = fromSec && fromSec.hasBranch ? (loc.BRANCHES[fromBranch]?.short || t.branchFallbackShort) : "";
  const fromName = fromSec ? t.fromLabel(fromSec.name, fromShort) : "";

  return target.map(id => {
    const it = loc.ITEMS[id];
    // 保留原有 item id / 已買紀錄；官方手冊將兩個海童軍帽章名稱列作同一款。
    const seaYouthBadges = ["capbadge-venture-sea", "capbadge-rover-sea"];
    const had = source.includes(id) || (seaYouthBadges.includes(id) && source.some(x => seaYouthBadges.includes(x)));
    let status, note = "";
    if(mode === "upgrade" && source.length){
      if(had){
        status = "have";
        note = t.noteReuse(fromName);
        if(id === "badges-youth") note = t.noteBadgesReuse;
        if(id === "scarf") note = t.noteScarfReuse;
      } else {
        status = "need";
        note = t.noteNeed(fromName);
      }
    } else {
      status = "need";
    }
    // 特殊：頒發／查詢類
    if(id === "scarf" && status !== "have") status = "check";
    if(["capbadge-cub","woggle-cub","capbadge-rank","capbadge-sea-leader","epaulette-rank"].includes(id) && status !== "have") status = "check";
    if(id === "patrol-badge") { status = had ? "have" : "check"; }
    if(id === "badges-leader") status = "need";

    const buyLabel = t.buyLabels[it.buy] || "";
    const shop = shopInfo(id);
    let shopHtml = "";
    if(shop){
      const row = (x) => `<li><a href="${shopUrl(x)}" target="_blank" rel="noopener">${x.name}</a>${t.shopCode(x.code)}${t.shopPrice(x.price)}</li>`;
      shopHtml = `<div class="shop-box"><strong>${t.shopBoxTitle}</strong><ul>${row(shop)}${(shop.extra || []).map(row).join("")}</ul>`
        + ((shop.alt && shop.alt.length) ? `<p class="cite">${t.shopAlts}${shop.alt.map(x => `<a href="${shopUrl(x)}" target="_blank" rel="noopener">${x.name}</a>${t.shopPrice(x.price)}`).join(t.shopAltSep)}</p>` : "")
        + (shop.note ? `<p class="cite">${shop.note}</p>` : "")
        + `<p class="cite">${t.shopPriceNote}</p></div>`;
    }
    return {
      id, title: it.title, desc: it.desc, icon: it.icon, img: it.img, reference: itemReference(id, gender), status,
      shop, shopImg: shop ? shop.img : null, shopThumb: shop ? shop.thumb : null, shopUrl: shop ? shop.url : null,
      detail: (it.detail || "") + note + (buyLabel ? `<p class="cite">🛒 ${buyLabel}</p>` : "") + shopHtml
    };
  });
}

/* ===========================================================
   官方整套制服參考圖（官網原圖為制服圖解，不稱作「實相」）
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
// Only an exact section / branch / gender match is allowed. Never substitute land for sea / air.
const LOCAL_UNIFORMS = {
  cub: { land: { male:"assets/reference/cub-male.avif", female:"assets/reference/cub-female.avif" } },
  scout: { land: { female:"assets/reference/scout-land-female.avif" } },
  venture: { air: { male:"assets/reference/venture-air-male.avif" } }
};
function officialPhoto(section, branch, gender){
  const p = OFFICIAL_PHOTOS[section];
  const file = p?.[branch]?.[gender];
  if(!file) return null;
  const local = LOCAL_UNIFORMS[section]?.[branch]?.[gender];
  const t = UI(), loc = L();
  const alt = t.uniformAlt(loc.SECTIONS[section].name, loc.BRANCHES[branch].name, t.genderShort(gender));
  const source = { alt, sourceUrl:p.src, sourceLabel:t.uniformSourceLabel, note:t.uniformNote };
  return { src:p.src, images:[
    ...(local ? [{ ...source, src:local, label:t.uniformLocalLabel }] : []),
    { ...source, src:OFFICIAL_IMG_BASE + file, label:t.uniformRemoteLabel }
  ] };
}

/* ===========================================================
   已核對的本地參考圖 — 來源 / 裁切記錄見 assets/reference/README.md
   不重畫徽號、不改色；不將手冊舊圖冒稱為現售產品相。
   =========================================================== */
const CAP_HANDBOOK = "https://uniform.scouting.org.hk/wp-content/uploads/2017/03/uniformhandbook_p96-106.pdf";
function handbookImage(lang, file, page, alt, note){
  const t = IMG_TEXT[lang] || IMG_TEXT["zh-HK"];
  return { src:`assets/reference/${file}.avif`, alt, label:t.handbookLabel,
    sourceUrl:`${CAP_HANDBOOK}#page=${page - 95}`, sourceLabel:t.handbookSource(page), note };
}
function uniformCrop(lang, file, section, alt, note){
  const t = IMG_TEXT[lang] || IMG_TEXT["zh-HK"];
  return { src:`assets/reference/${file}.avif`, alt, label:t.cropLabel,
    sourceUrl:OFFICIAL_PHOTOS[section].src, sourceLabel:t.cropSource, note };
}
const ITEM_REFERENCES = {
  "capbadge-cub": handbookImage("zh-HK", "capbadge-cub", 98, "男幼童軍帽冠上已縫好的布質帽章（官方手冊圖解）", "圖示男幼童軍帽；布章已縫在帽冠，毋須另購。"),
  "capbadge-scout": handbookImage("zh-HK", "capbadge-scout", 102, "銀色童軍帽章（官方手冊原圖）", "手冊原圖裁切，非現售產品照片。"),
  "capbadge-venture-sea": handbookImage("zh-HK", "capbadge-sea-youth", 102, "深資／樂行海童軍帽章（官方手冊原圖）", "手冊將深資及樂行海童軍帽章列為同一款。"),
  "capbadge-rover-sea": handbookImage("zh-HK", "capbadge-sea-youth", 102, "深資／樂行海童軍帽章（官方手冊原圖）", "手冊將深資及樂行海童軍帽章列為同一款。"),
  "capbadge-rank": handbookImage("zh-HK", "capbadge-rank", 104, "綠色團長職級帽章例子（官方手冊原圖）", "只示範綠色團長款；職級不同，顏色／款式亦不同，請先向旅團確認。"),
  "capbadge-sea-leader": handbookImage("zh-HK", "capbadge-sea-leader", 105, "海童軍領袖帽章（官方手冊原圖）", "海童軍成年領袖款，與深資／樂行海童軍款不同。"),
  "cap-cub-m": handbookImage("zh-HK", "capbadge-cub", 98, "男幼童軍深綠色黃間條鴨舌帽（官方手冊圖解）", "穿戴圖局部；帽冠上已縫有布質帽章。"),
  "cap-cub-f": uniformCrop("zh-HK", "cap-cub-female", "cub", "女幼童軍深綠色圓形有邊帽（官方制服圖解）", "穿戴圖局部；帽冠上已縫有布質帽章。"),
  "beret-green": uniformCrop("zh-HK", "beret-green", "scout", "深綠色軟帽配童軍帽章（官方制服圖解）", "穿戴圖局部；圖示青少年童軍帽章，成年領袖須用職級帽章。"),
  "beret-greyblue": uniformCrop("zh-HK", "beret-greyblue", "venture", "灰藍色軟帽配童軍帽章（官方制服圖解）", "穿戴圖局部；圖示青少年童軍帽章，成年領袖須用職級帽章。"),
  "belt": uniformCrop("zh-HK", "belt", "venture", "棕色皮帶及童軍徽皮帶扣（官方制服圖解）", "穿戴圖局部，並非供應社現售產品照片。"),
  "woggle-scout": uniformCrop("zh-HK", "woggle-scout", "venture", "童軍巾圈（官方制服圖解）", "穿戴圖局部，並非供應社現售產品照片。"),
  "badges-youth": uniformCrop("zh-HK", "badges-common", "cub", "香港章及世界童軍會員章（官方制服圖解）", "只示範兩款通用徽章；地域章、區章、旅章請按所屬單位準備。"),
  "badges-leader": uniformCrop("zh-HK", "badges-common", "cub", "香港章及世界童軍會員章（官方制服圖解）", "只示範兩款通用徽章，並非完整領袖徽章套裝；其餘徽章按委任及服務單位準備。")
};

function itemReference(id, gender){
  const refs = L().ITEM_REFERENCES;
  if(id === "capbadge-cub" && gender === "female"){
    return { ...refs["cap-cub-f"], alt: UI().femaleCubBadgeAlt };
  }
  return refs[id] || null;
}
function itemImageSources(item, thumbnail = false){
  // Verified local references are primary, not a rescue image after a hotlink fails.
  const t = UI();
  if(item.reference) return [item.reference];
  const images = [];
  const shopImage = thumbnail ? (item.shopThumb || item.shopImg) : item.shopImg;
  if(shopImage){
    images.push({ src:shopImage, alt:t.shopImageAlt(item.shop.name), label:t.shopImageLabel,
      sourceUrl:item.shopUrl, sourceLabel:t.shopImageSource,
      note:item.shop.name !== item.title ? t.shopImageNote(item.shop.name) : "" });
  }
  // Only general clothing keeps a simple style illustration. Invented insignia have no img entry.
  if(item.img){
    images.push({ src:item.img, alt:t.itemImageAlt(item.title), label:t.itemImageLabel,
      sourceUrl:item.shopUrl, sourceLabel:t.itemImageSource,
      note:shopImage ? t.itemImageNoteFallback : t.itemImageNoteOnly });
  }
  return images;
}

/* ===========================================================
   支部資料（進度性獎章總覽 / 升團過渡 Q&A / 獎章歷程圖）
   原置於 app.js，為方便雙語化改放 data.js
   =========================================================== */
/* ===========================================================
   進度性獎章總覽 — 資料來源：香港童軍總會各支部訓練綱要（中文版）
   =========================================================== */
const BADGES_OVERVIEW = {
  grasshopper: {
    name: "小童軍", color: "var(--grasshopper)", age: "4–7 歲",
    promise: "我願參加小童軍，愛神愛人愛國家。", law: "小童軍日行一善。", motto: "準備",
    type: "會員章 + 進步獎章（四步）",
    badges: [
      { name: "🔰 會員章", desc: "宣誓後佩戴" },
      { name: "進步獎章", desc: "第一步（紅）→ 第二步（棕）→ 第三步（藍）→ 第四步（綠）" }
    ],
    note: "小童軍服裝只設<strong>領巾及簡單整齊的集會服裝</strong>；旅團亦可安排自家統一服飾，以旅團安排為準。"
  },
  cub: {
    name: "幼童軍", color: "var(--cub)", age: "6–11 歲",
    promise: "我願盡所能；對神明，對國家，盡責任；對別人，要幫助；對規律，必遵行。",
    law: "幼童軍，盡所能，先顧別人才顧己，日行一善富精神。", motto: "準備",
    type: "會員章 + 4 個進度性獎章（金紫荊獎章為支部最高獎章）",
    badges: [
      { name: "🔰 會員章", desc: "入團後考取，宣誓後佩戴" },
      { name: "1️⃣ 幼童軍獎章", desc: "考獲會員章後 6 個月內完成" },
      { name: "2️⃣ 幼童軍歷奇章", desc: "考獲幼童軍獎章後 1 年內完成" },
      { name: "3️⃣ 幼童軍高級歷奇章", desc: "考獲歷奇章後 1 年半內完成" },
      { name: "⭐ 金紫荊獎章", desc: "<strong>幼童軍支部最高獎章</strong>。年滿 9 歲半及完成歷奇章方可申請。考獲後只佩戴金紫荊獎章於右胸袋" },
      { name: "🔗 童軍先修章", desc: "年滿 10 歲半可考取，認識童軍支部活動，為升童軍做準備" }
    ],
    note: "另有活動徽章（一級制／三級制），戴於左袖。"
  },
  scout: {
    name: "童軍", color: "var(--scout)", age: "11–15 歲",
    promise: "我願以信譽為誓，竭盡所能；對神明，對國家，盡責任；對別人，要幫助；對規律，必遵行。",
    law: "童軍信用為人敬。童軍待人要忠誠。童軍友善兼親切。童軍相處如手足。童軍勇敢不怕難。童軍愛物更惜陰。童軍自重又重人。", motto: "準備",
    type: "會員章 + 4 個進度性獎章（總領袖獎章為支部最高獎章）",
    badges: [
      { name: "🔰 會員章", desc: "入團後考取，宣誓後佩戴" },
      { name: "1️⃣ 童軍探索獎章", desc: "年滿 11 歲及考獲會員章後開始" },
      { name: "2️⃣ 童軍標準獎章", desc: "完成探索獎章後" },
      { name: "3️⃣ 童軍高級獎章", desc: "完成標準獎章後" },
      { name: "⭐ 總領袖獎章", desc: "<strong>童軍支部最高獎章</strong>。由青少年活動署送贈，供應社代為派發" },
      { name: "🔗 深資童軍先修章", desc: "年滿 14 歲半可考取，認識深資童軍支部，為升深資做準備" }
    ],
    note: "海童軍必須選修「海上活動」；空童軍必須選修「航空活動」。另有專科徽章（興趣／技能／服務／教導組）。"
  },
  venture: {
    name: "深資童軍", color: "var(--venture)", age: "15–20 歲",
    promise: "我願以信譽為誓，竭盡所能；對神明，對國家，盡責任；對別人，要幫助；對規律，必遵行。",
    law: "與童軍相同。", motto: "準備",
    type: "深資童軍肩章 + 2 個進度性獎章（榮譽童軍獎章為支部最高獎章）",
    badges: [
      { name: "🔰 深資童軍肩章", desc: "先決條件，完成後方可考進度性獎章" },
      { name: "1️⃣ 深資童軍獎章", desc: "考獲「責任」「自立」「活動」「探險」四個段章" },
      { name: "⭐ 榮譽童軍獎章", desc: "<strong>深資童軍支部最高獎章</strong>（英文 Dragon Scout Award）。考獲深資童軍獎章及四個金帶。持有人日後任領袖可終身佩戴榮譽童軍領袖標誌" }
    ],
    note: "深資童軍團以執行委員會制度自治自務。"
  },
  rover: {
    name: "樂行童軍", color: "var(--rover)", age: "18–25 歲",
    promise: "我願以信譽為誓，竭盡所能；對神明，對國家，盡責任；對別人，要幫助；對規律，必遵行。",
    law: "與童軍相同。", motto: "服務",
    type: "樂行童軍肩章 + 2 個進度性獎章（貝登堡獎章為支部最高獎章）",
    badges: [
      { name: "🔰 樂行童軍肩章", desc: "先決條件" },
      { name: "1️⃣ 樂行童軍獎章", desc: "童軍知識、社區服務、戶外活動、個人興趣、人際關係、個人價值觀、認識世界、生活體驗" },
      { name: "⭐ 貝登堡獎章", desc: "<strong>樂行童軍支部最高獎章</strong>。服務、童軍技能、探險、生活體驗。持有人日後任領袖可佩戴貝登堡領袖標誌" }
    ],
    note: "樂行童軍可同時兼任其他支部、區和地域領袖的工作。"
  },
  leader: {
    name: "領袖", color: "var(--leader)", age: "成年成員",
    promise: "我願以信譽為誓，竭盡所能；對神明，對國家，盡責任；對別人，要幫助；對規律，必遵行。",
    law: "與童軍相同。", motto: "服務",
    type: "非進度性：領袖訓練（木章）+ 授勳及嘉獎制度",
    badges: [
      { name: "🎓 木章", desc: "完成領袖訓練後獲頒（木章、木章巾、木章巾圈）" },
      { name: "🏅 長期服務獎勵", desc: "服務章（最少 3 年）、長期服務獎章（15 年）" },
      { name: "🏅 功績獎勵", desc: "優良服務獎章 → 優異服務獎章 → 功績榮譽獎章 → 功績榮譽十字章；銅／銀／金獅勳章" },
      { name: "⭐ 香港總監嘉許／高級嘉許", desc: "由香港總監批准頒發" }
    ],
    note: "領袖有 3 個來源：<strong>由深資童軍升任、由樂行童軍升任、全新加入</strong>。榮譽童軍／貝登堡獎章持有人可終身佩戴相應領袖標誌。"
  }
};


/* ===========================================================
   升團過渡 Q&A
   =========================================================== */
const TRANSITIONS = {
  cub: {
    title: "由小童軍升幼童軍", color: "var(--cub)",
    items: [
      { q: "升團條件？", a: "符合幼童軍年齡（6–11 歲）即可，實際日期向所屬旅團查詢。小童軍身分於年滿 8 歲當日自動結束。" },
      { q: "要買什麼？", a: "小童軍只有活動服裝（運動鞋等），升幼童軍等同<strong>首次購買整套制服</strong>：帽、帽章、恤衫、短褲／裙褲、皮帶、長襪、皮鞋；旅巾及顏色巾圈由旅團安排。" },
      { q: "幼童軍徽章佩戴位置？", a: "會員章：左胸袋中央；香港章：左胸袋上方；服務年星：香港章旁；進度性獎章及金紫荊獎章：右胸袋；活動徽章：左袖；旅章、區章、地域章：右袖。（2023 年 4 月起新指引）" }
    ]
  },
  scout: {
    title: "由幼童軍升童軍", color: "var(--scout)",
    items: [
      { q: "升團條件？", a: "符合童軍年齡（11–15 歲）即可，毋須先考金紫荊獎章。幼童軍身分於年滿 12 歲當日自動結束。年滿 10 歲半的幼童軍可先考<strong>童軍先修章</strong>認識童軍支部。" },
      { q: "先揀陸／海／空", a: "童軍支部分<strong>童軍、海童軍及空童軍</strong>，制服顏色不同：陸＝杏色恤衫＋草青色短褲／裙褲＋深綠色軟帽；海＝白色恤衫＋深藍色短褲／裙褲＋白頂帽；空＝淺藍色恤衫＋深藍色短褲／裙褲＋灰藍色軟帽。升團前先問清楚所屬旅團是哪一種。" },
      { q: "升陸童軍要買什麼？", a: "必買：<strong>深綠色軟帽、童軍帽章、童軍巾圈</strong>。恤衫、短褲／裙褲、皮帶、長襪、皮鞋與幼童軍<strong>同款</strong>，合身可沿用。" },
      { q: "升海／空童軍要買什麼？", a: "幾乎全套新買：白色（海）／淺藍色（空）恤衫、深藍色短褲／裙褲、深藍色長襪、白頂帽（海）／灰藍色軟帽（空）、童軍巾圈。只有皮帶、皮鞋、旅巾可沿用。" },
      { q: "徽章點處理？", a: "拆走幼童軍進度性獎章、活動徽章、隊長章。<strong>金紫荊獎章屬幼童軍獎章，升童軍後不再佩戴獎章本身</strong>，但可購買「金紫荊獎章標誌」（需出示證書副本）佩戴於右胸袋上方。服務年星保留。世界童軍會員章、香港章、地域章、區章、旅章可沿用。" },
      { q: "小隊章？", a: "童軍開始有小隊制，<strong>小隊章由旅團頒發或在供應社購買</strong>（毋須出示文件），佩戴於右袖。" }
    ]
  },
  venture: {
    title: "由童軍升深資童軍", color: "var(--venture)",
    items: [
      { q: "升團條件？", a: "符合深資童軍年齡（15–20 歲）即可，毋須先考總領袖獎章。童軍身分於年滿 16 歲當日自動結束。年滿 14 歲半的童軍可先考<strong>深資童軍先修章</strong>。" },
      { q: "先揀陸／海／空", a: "深資童軍同樣分<strong>深資童軍、深資海童軍、深資空童軍</strong>。海／空的深資改用<strong>海童軍領袖白頂帽</strong>（與童軍支部的白頂帽不同款）／灰藍色軟帽。" },
      { q: "升陸深資要買什麼？", a: "必買：<strong>棗紅色軟帽、草青色長褲（男）／草青色半截裙（女）、黑色短襪（男）／肉色襪褲＋黑色中跟皮鞋（女）</strong>。恤衫、皮帶、旅巾、童軍巾圈、童軍帽章可沿用。<strong>深資童軍不戴領帶</strong>（官方制服是旅巾）。" },
      { q: "徽章點處理？", a: "拆走童軍進度性獎章、專科徽章、小隊章、隊長章。深資童軍<strong>不會有金紫荊獎章</strong>；如童軍時期考獲總領袖獎章，可按總會安排佩戴支部最高獎章標誌（向旅團查詢）。服務年星保留。" }
    ]
  },
  rover: {
    title: "由深資童軍升樂行童軍", color: "var(--rover)",
    items: [
      { q: "升團條件？", a: "符合樂行童軍年齡（18–25 歲）即可，毋須先考榮譽童軍獎章。深資童軍身分於年滿 21 歲當日自動結束。" },
      { q: "先揀陸／海／空", a: "樂行童軍同樣分<strong>樂行童軍、樂行海童軍、樂行空童軍</strong>。" },
      { q: "升陸樂行要買什麼？", a: "只需<strong>把棗紅色軟帽換成深綠色軟帽</strong>，童軍帽章可移過去。其餘（恤衫、長褲／半截裙、皮帶、襪、皮鞋、旅巾、巾圈）全部同款可沿用。" },
      { q: "升海／空樂行要買什麼？", a: "海：白頂帽可沿用；官方手冊將<strong>深資／樂行海童軍帽章</strong>列為同一款，升團前向旅團確認。空：全部同款，毋須購買。" },
      { q: "徽章點處理？", a: "拆走深資童軍肩章、段章及金帶、深資童軍獎章。如考獲<strong>榮譽童軍獎章</strong>，按總會安排佩戴（向旅團查詢）。服務年星保留。" }
    ]
  },
  leader: {
    title: "升任領袖", color: "var(--leader)",
    items: [
      { q: "領袖有 3 個來源", a: "<strong>① 由深資童軍升任</strong>（深資身分於 21 歲結束）<br><strong>② 由樂行童軍升任</strong>（樂行可同時兼任領袖）<br><strong>③ 全新加入</strong>（成年人直接申請成為領袖）。三種情況要買的東西不同，請在上面揀正確來源。" },
      { q: "先揀陸／海／空", a: "領袖制服同樣分<strong>陸、海、空</strong>：陸＝杏色恤衫＋草青色長褲／半截裙＋深綠色軟帽（女：深綠色金邊硬帽）；海＝白色恤衫＋深藍色長褲／半截裙＋海童軍領袖白頂帽；空＝淺藍色恤衫＋深藍色長褲／半截裙＋灰藍色軟帽。" },
      { q: "要買齊 6 款制服嗎？", a: "不需要。新任領袖先買<strong>常規制服（編號 3）</strong>已足夠日常集會。禮服（編號 1）、晚禮服（編號 2）、領帶制服（編號 4）、短褲制服（編號 5）、長褲制服（編號 6）只在特定場合穿著。" },
      { q: "由深資／樂行（陸）升任要買什麼？", a: "男：恤衫、長褲、皮帶、短襪、皮鞋、旅巾、巾圈全部同款可沿用，只需買<strong>職級帽章</strong>（深綠色軟帽：樂行可沿用；深資的棗紅帽要換）。女：要買<strong>深綠色金邊硬帽</strong>＋職級帽章。另加職級肩章、香港肩章／旅章。" },
      { q: "領袖領帶是什麼顏色？", a: "只有<strong>領帶制服（編號 4）及禮服</strong>才戴領帶：陸＝深綠色；海＝黑色；空＝深藍色。常規制服戴旅巾。" },
      { q: "榮譽童軍／貝登堡獎章持有人", a: "成為領袖後可終身佩戴<strong>榮譽童軍領袖標誌</strong>或<strong>貝登堡領袖標誌</strong>（兩者皆有則只戴榮譽童軍標誌）。青少年時期的寰宇童軍章可繼續戴於右袖。" }
    ]
  }
};
TRANSITIONS.grasshopper = TRANSITIONS.cub;


/* ===========================================================
   進度性獎章歷程圖
   =========================================================== */
const BADGE_TIMELINES = {
  grasshopper: [
    { stage: "🔰", name: "會員章", age: "宣誓後", color: "var(--grasshopper)", desc: "宣誓後佩戴" },
    { stage: "1-4", name: "進步獎章", age: "第一步至第四步", color: "var(--grasshopper)", desc: "紅 → 棕 → 藍 → 綠" }
  ],
  cub: [
    { stage: "🔰", name: "會員章", age: "入團後", color: "var(--cub)", desc: "宣誓後佩戴" },
    { stage: "1", name: "幼童軍獎章", age: "會員章後 6 個月內", color: "var(--cub)", desc: "追蹤、繩結、郊野守則、日行一善、護理和救傷、誓詞規律" },
    { stage: "2", name: "幼童軍歷奇章", age: "獎章後 1 年內", color: "var(--cub)", desc: "戶外活動、運動與愛好、幫助他人、照顧自己等" },
    { stage: "3", name: "幼童軍高級歷奇章", age: "歷奇章後 1 年半內", color: "var(--cub)", desc: "同上範疇的進階" },
    { stage: "⭐", name: "金紫荊獎章", age: "年滿 9 歲半＋完成歷奇章", color: "#FFD700", desc: "幼童軍支部最高獎章" }
  ],
  scout: [
    { stage: "🔰", name: "會員章", age: "入團後", color: "var(--scout)", desc: "宣誓後佩戴" },
    { stage: "1", name: "童軍探索獎章", age: "年滿 11 歲", color: "var(--scout)", desc: "戶外挑戰、個人發展、社會、環境" },
    { stage: "2", name: "童軍標準獎章", age: "探索獎章後", color: "var(--scout)", desc: "加入「世界認識」「新體驗」" },
    { stage: "3", name: "童軍高級獎章", age: "標準獎章後", color: "var(--scout)", desc: "參與一項從未嘗試之活動" },
    { stage: "⭐", name: "總領袖獎章", age: "高級獎章後", color: "#FFD700", desc: "童軍支部最高獎章，需考獲一個教導組專科徽章" }
  ],
  venture: [
    { stage: "🔰", name: "深資童軍肩章", age: "入團後", color: "var(--venture)", desc: "先決條件" },
    { stage: "1", name: "深資童軍獎章", age: "四段章完成後", color: "var(--venture)", desc: "責任、自立、活動、探險段章" },
    { stage: "⭐", name: "榮譽童軍獎章", age: "深資獎章＋四金帶", color: "#FFD700", desc: "深資童軍支部最高獎章" }
  ],
  rover: [
    { stage: "🔰", name: "樂行童軍肩章", age: "入團後", color: "var(--rover)", desc: "先決條件" },
    { stage: "1", name: "樂行童軍獎章", age: "肩章後", color: "var(--rover)", desc: "童軍知識、社區服務、戶外活動等 8 項" },
    { stage: "⭐", name: "貝登堡獎章", age: "樂行獎章後", color: "#FFD700", desc: "樂行童軍支部最高獎章" }
  ],
  leader: [
    { stage: "🎓", name: "木章", age: "完成領袖訓練", color: "var(--leader)", desc: "木章、木章巾、木章巾圈" },
    { stage: "🏅", name: "服務章／長期服務獎章", age: "3 年／15 年", color: "var(--leader)", desc: "長期服務獎勵" },
    { stage: "⭐", name: "功績獎勵／總監嘉許", age: "資深領袖", color: "#FFD700", desc: "優良／優異服務獎章、獅勳章、香港總監嘉許" }
  ]
};


/* ===========================================================
   語言包 / Locales
   ─ "zh-HK"：原始中文版，直接沿用本檔上方的資料常數
   ─ "en"   ：英文版，由 locale-en.js 掛上（LOCALES.en = LOCALE_EN）
   切換語言：app.js 的 setLang() → renderAll()
   =========================================================== */

const LOCALES = {

/* ═══════════════════════════ 繁體中文（香港） ═══════════════════════════ */
"zh-HK": {

  htmlLang: "zh-HK",
  langLabel: "中文",
  switchToLabel: "EN",

  APP: {
    name: "童軍準備指南",
    shortName: "童軍準備",
    tagline: "由小童軍到領袖・家長一目了然",
    description: "童軍準備指南 — 涵蓋小童軍到領袖的進團、升團制服準備、徽章佩戴及過渡須知。",
    appleTitle: "童軍準備指南",
    logoAlt: "制服準備指南 LOGO"
  },

  SECTIONS, BRANCHES, ITEMS, SHOP, GRASSHOPPER_ITEM,
  ITEM_REFERENCES, BADGES_OVERVIEW, TRANSITIONS, BADGE_TIMELINES,

  /* 靜態 HTML 文字對照（zh-HK 以 index.html 原文為準，故此處留空） */
  HTML: {},

  UI: {
    /* ── 共用 ── */
    male: "男", female: "女",
    genderShort: (g) => g === "female" ? "女" : "男",
    genderLabel: "性別：",
    genderMemberMale: "男團員", genderMemberFemale: "女團員",
    genderLeaderMale: "男領袖", genderLeaderFemale: "女領袖",
    sectionAge: "支部年齡：",
    countUnit: " 項",
    branchFallbackShort: "陸",
    nameSep: "・",
    branchLabel: (name) => `・${name}`,
    partExpand: "展開", partCollapse: "收起",
    toolbarAria: "目前顯示部分的開合控制",
    toolbarHint: "按各部分標題展開／收起，只睇你需要嘅內容。",
    expandAll: "全部展開", collapseAll: "全部收起",

    /* ── 步驟 ② 控制列 ── */
    controlsTitle: "你屬於哪一種？",
    grasshopperNoUniform: "小童軍沒有指定制服，亦無升團來源，直接看下方說明。",
    sourceFrom: (name, isLeader) => `由${name}升${isLeader ? "任" : "團"}`,
    sourceFromGrasshopper: "由小童軍升團",
    sourceSmallGrasshopper: "小童軍無制服，等同全新加入",
    sourceSmallReuse: "可沿用同款物品",
    newJoin: "全新加入",
    newJoinSmall: "從未穿過童軍制服",
    fromBranchLabel: "原本是：",
    toBranchLabelUpgrade: "升去：",
    toBranchLabelNew: "加入：",
    branchHint: "同一旅團通常整旅同一類型；如不確定，先問所屬旅團領袖。",

    /* ── 模式 / 預覽 ── */
    modeUpgrade: (from, isLeader) => `由 ${from} 升${isLeader ? "任" : "團"}`,
    modeNew: "全新加入",
    fromLabel: (name, short) => short ? `${name}（${short}）` : name,

    /* ── 統計 ── */
    statusNeed: "需購買", statusHave: "可沿用", statusCheck: "向團長查詢",
    ownedSummary: (n, total) => `✅ 已 mark 已有／已買：<strong>${n}</strong> / ${total} 項`,
    resetMarks: "🗑 一鍵清紀錄",
    resetConfirm: "確定要清晒所有 mark 紀錄嗎？\n\n此操作無法復原！",

    /* ── 清單項目 ── */
    markOwned: "✅ 已有／已買",
    markOwnedNone: "⬜ mark 已有",
    ownedHint: "呢件嘢你已有",
    ownedHintNone: "如已有（兄弟姊妹共用），剔呢度",
    checklistTitle: (mode, branch, gender, n) => `${mode}${branch} · ${gender} · 共 ${n} 項`,
    checklistNote: "<strong>備註：</strong>制服規格根據香港童軍總會官網「制服」頁。地域章、區章、旅章、小隊章及旅巾安排，請向<strong>所屬旅團領袖</strong>查詢。",

    /* ── 沿用／新買提示 ── */
    noteReuse: (from) => `<div class="tip">✅ 與${from}<strong>同一款</strong>，如狀況良好可沿用。</div>`,
    noteBadgesReuse: `<div class="tip">✅ 世界童軍會員章、香港章、地域章、區章、旅章可沿用（同一旅）。<br><strong>要拆走</strong>舊支部的進度性獎章、活動／專科徽章、隊長章。服務年星保留。</div>`,
    noteScarfReuse: `<div class="tip">✅ 同一旅升團可繼續用原有旅巾。</div>`,
    noteNeed: (from) => `<div class="warn">🆕 ${from}沒有此款，需要購買／更換。</div>`,
    buyLabels: {
      supply: "香港童軍物品供應社購買",
      included: "隨幼童軍帽附上，毋須另購",
      any: "供應社或一般商店購買",
      group: "由旅團頒發",
      check: "向旅團／區查詢",
      mixed: "供應社購買；旅章／區章／地域章向旅團查詢",
      "group-or-supply": "由旅團頒發／供應社購買"
    },

    /* ── 供應社產品框 ── */
    shopBoxTitle: "🛒 供應社官方產品",
    shopCode: (code) => code ? `（編號 ${code}）` : "",
    shopPrice: (p) => p != null ? ` HK$${p}` : "",
    shopAlts: "其他款式：",
    shopAltSep: "、",
    shopPriceNote: "價錢為供應社網站標示零售價（2026-09 擷取），以店內為準。",

    /* ── 預算 ── */
    budgetGrasshopper: `小童軍以<strong>旅團安排</strong>為準：小童軍活動服可於<a href="https://www.hkscoutshop.org.hk/" target="_blank" rel="noopener">供應社</a>購買（HK$75），單色衣物、運動鞋可自行選購，旅巾由旅團安排。`,
    priceIncluded: "已連帽，毋須另購",
    priceDependsGroup: "視乎旅團安排",
    priceOfficial: (p) => `HK$${p}`,
    priceApprox: (lo, hi) => lo === hi ? `約 HK$${lo}` : `約 HK$${lo}–${hi}`,
    shopCodeLink: (code) => ` 供應社 ${code} ↗`,
    budgetModeUpgrade: "升團補購", budgetModeNew: "全新全購",
    budgetHead: (mode) => `你而家揀嘅係<strong>${mode}</strong>，需要準備嘅物品如下：`,
    budgetColItem: "物品", budgetColPrice: "約略價錢",
    budgetTotal: "合計（不含旅團頒發項目）",
    budgetFootNote: "標有「供應社編號」的價錢為 hkscoutshop.org.hk 網站 2026 年 9 月標示零售價，其餘為約略參考；實際以香港童軍物品供應社為準。皮鞋、短襪、襪褲可於一般商店購買。",

    /* ── 官方制服參考圖 ── */
    officialRefTitle: (name) => `${name} 官方制服參考圖`,
    officialRefDesc: "整套對照：帽、恤衫、褲／裙、皮帶、襪、皮鞋、領巾。",

    /* ── 圖片 ── */
    imgNoRef: "暫未提供參考圖",
    imgUnavailableThumb: "圖片",
    imgUnavailable: "參考圖暫時未能載入",
    imgUnavailableHint: "請查看來源或下方產品頁",
    imgUnavailableNote: "未能載入圖片；仍可透過來源頁核對款式及規格。",
    shopImageAlt: (name) => `${name}（供應社產品圖片）`,
    shopImageLabel: "供應社產品圖片",
    shopImageSource: "查看供應社產品 ↗",
    shopImageNote: (name) => `產品例子：${name}；未必代表此項全部款式。`,
    itemImageAlt: (title) => `${title}（款式示意，非實物照片）`,
    itemImageLabel: "款式示意（非實物照片）",
    itemImageSource: "對照供應社產品 ↗",
    itemImageNoteFallback: "供應社圖片暫時未能載入；此示意圖不作顏色或細節依據。",
    itemImageNoteOnly: "僅供辨認款式；顏色及細節以實物和官方規格為準。",
    uniformAlt: (sec, br, g) => `${sec}・${br}・${g}裝制服參考圖`,
    uniformSourceLabel: "總會制服頁 ↗",
    uniformNote: "官方制服圖解，非實物照片；規格以總會最新資料為準。",
    uniformLocalLabel: "官方制服參考圖（本地）",
    uniformRemoteLabel: "官方制服參考圖",
    femaleCubBadgeAlt: "女幼童軍帽冠上已縫好的布質帽章（官方制服圖解）",

    /* ── 進度性獎章總覽 / 歷程 ── */
    badgeSystem: "獎章制度：",
    promise: "誓詞",
    law: "規律",
    badgesCount: (n) => `獎章（${n} 項）`,
    badgeJourney: (name) => `📊 ${name}獎章歷程`,
    viewDetails: "查看詳細內容",

    /* ── 語言掣 ── */
    langToggleAria: "切換語言 / Switch language"
  }
}

};

/* ═══════════ 語言狀態 / Language state ═══════════ */
let LANG = "zh-HK";
function L(){ return LOCALES[LANG]; }
function UI(){ return L().UI; }
