/* ===========================================================
   童軍準備指南 — 主程式
   =========================================================== */

let currentSection = "cub";       // 目標支部
let currentMode = "upgrade";      // upgrade | new
let currentGender = "male";
let currentBranch = "land";       // 目標類型 land | sea | air
let currentFrom = null;           // 升團來源支部（領袖可揀 venture / rover）
let currentFromBranch = "land";   // 升團來源類型

// 已買/已有狀態(localStorage 持久化)
const STORAGE_KEY = "scout_owned_v2";
function loadOwned(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch(e){ return {}; } }
function saveOwned(o){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(o)); } catch(e){} }
function isOwned(key){ return !!loadOwned()[key]; }
function toggleOwned(key){ const o = loadOwned(); o[key] = !o[key]; saveOwned(o); }
function $(id){ return document.getElementById(id); }

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

function renderBadgesOverview(){
  const b = BADGES_OVERVIEW[currentSection];
  if(!b) return '';
  return `<div style="border:1px solid var(--line);border-left:4px solid ${b.color};border-radius:8px;padding:.8rem 1rem;background:#fafafa">
    <h3 style="margin:0 0 .3rem;font-size:1rem;color:${b.color}">${b.name} <span style="font-size:.75rem;color:#888;font-weight:400">(${b.age})</span></h3>
    <p style="margin:.2rem 0;font-size:.8rem"><strong>獎章制度：</strong>${b.type}</p>
    <details style="margin:.3rem 0"><summary style="font-size:.85rem;color:${b.color}">誓詞</summary><p style="font-size:.85rem;margin:.3rem 0;font-style:italic">${b.promise}</p></details>
    <details style="margin:.3rem 0"><summary style="font-size:.85rem;color:${b.color}">規律</summary><p style="font-size:.85rem;margin:.3rem 0;font-style:italic">${b.law}</p></details>
    <details style="margin:.3rem 0"><summary style="font-size:.85rem;color:${b.color}">獎章（${b.badges.length} 項）</summary>
      <ul style="font-size:.85rem;line-height:1.7;margin:.3rem 0 0 1rem;padding:0">${b.badges.map(bg=>`<li><strong>${bg.name}</strong> — ${bg.desc}</li>`).join("")}</ul></details>
    <p style="font-size:.78rem;color:#666;margin:.4rem 0 0;border-top:1px dashed #ddd;padding-top:.3rem">${b.note}</p>
  </div>`;
}

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
      { q: "升海／空樂行要買什麼？", a: "海：白頂帽可沿用，只需換<strong>樂行海童軍帽章</strong>。空：全部同款，毋須購買。" },
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

function renderTransition(section){
  const data = TRANSITIONS[section];
  if(!data) return "";
  let html = `<div style="border-left:4px solid ${data.color};padding-left:1rem;margin-bottom:1rem"><h3 style="margin:0;color:${data.color}">${data.title}</h3></div>`;
  data.items.forEach(it=>{ html += `<details><summary>${it.q}</summary><p>${it.a}</p></details>`; });
  return html;
}
function updateTransition(){ $("transition-content").innerHTML = renderTransition(currentSection); }
function updateBadgesOverview(){ $("badges-overview").innerHTML = renderBadgesOverview(); }

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

function renderBadgeTimeline(){
  const items = BADGE_TIMELINES[currentSection];
  if(!items) return '';
  const sec = SECTIONS[currentSection];
  let html = `<h3 style="color:var(--scout-green);margin-top:1.5rem">📊 ${sec.name}獎章歷程</h3><div style="display:flex;flex-wrap:wrap;gap:.6rem;margin:.8rem 0;align-items:center">`;
  items.forEach((item, idx) => {
    html += `<div style="flex:1;min-width:120px;border:2px solid ${item.color};border-radius:10px;padding:.6rem;text-align:center;background:white">
      <div style="font-size:1.5rem;margin-bottom:.2rem">${item.stage}</div>
      <div style="font-weight:700;font-size:.85rem;color:${item.color}">${item.name}</div>
      <div style="font-size:.75rem;color:#888;margin:.2rem 0">${item.age}</div></div>`;
    if(idx < items.length - 1) html += `<div style="font-size:1.2rem;color:#ccc;flex-shrink:0">→</div>`;
  });
  html += `</div><details style="margin:.5rem 0"><summary style="font-size:.85rem;color:var(--scout-green)">查看詳細內容</summary><ul style="font-size:.85rem;line-height:1.7;margin:.3rem 0 0 1rem;padding:0">`;
  items.forEach(item => { html += `<li><strong>${item.name}</strong> — ${item.desc}</li>`; });
  html += `</ul></details>`;
  return html;
}

/* ===========================================================
   步驟 ② 控制列（模式 / 來源 / 海陸空 / 性別）
   =========================================================== */
function renderControls(){
  const sec = SECTIONS[currentSection];
  const el = $("controls");
  if(!el) return;
  let html = "";

  if(currentSection === "grasshopper"){
    html += `<p class="cite">小童軍沒有指定制服，亦無升團來源，直接看下方說明。</p>`;
  } else {
    // 模式 / 來源
    const sources = sec.upgradeFrom || [];
    html += `<h3 style="margin:.4rem 0 .3rem">你屬於哪一種？</h3><div class="mode-toggle" style="grid-template-columns:repeat(${sources.length + 1},1fr)">`;
    sources.forEach(src => {
      const active = currentMode === "upgrade" && currentFrom === src;
      const label = src === "grasshopper" ? "由小童軍升團" : `由${SECTIONS[src].name}升${currentSection === "leader" ? "任" : "團"}`;
      html += `<button class="mode-btn ${active ? "active" : ""}" onclick="setSource('${src}')">${label}<small>${src === "grasshopper" ? "小童軍無制服，等同全新加入" : "可沿用同款物品"}</small></button>`;
    });
    html += `<button class="mode-btn ${currentMode === "new" ? "active" : ""}" onclick="setSource(null)">全新加入<small>從未穿過童軍制服</small></button></div>`;

    // 來源類型（海陸空）
    if(currentMode === "upgrade" && currentFrom && SECTIONS[currentFrom]?.hasBranch){
      html += `<div class="gender-toggle"><span>原本是：</span>${branchButtons("from")}</div>`;
    }
    // 目標類型
    if(sec.hasBranch){
      html += `<div class="gender-toggle"><span>${currentMode === "upgrade" ? "升去" : "加入"}：</span>${branchButtons("to")}</div>`;
      html += `<p class="cite" style="margin:-.3rem 0 .6rem">同一旅團通常整旅同一類型；如不確定，先問所屬旅團領袖。</p>`;
    }
  }
  // 性別
  html += `<div class="gender-toggle"><span>性別：</span>
    <button class="${currentGender === "male" ? "active" : ""}" onclick="setGender('male')">男</button>
    <button class="${currentGender === "female" ? "active" : ""}" onclick="setGender('female')">女</button></div>`;
  el.innerHTML = html;
}
function branchButtons(which){
  const cur = which === "from" ? currentFromBranch : currentBranch;
  return Object.keys(BRANCHES).map(k => `<button class="${cur === k ? "active" : ""}" onclick="setBranch('${which}','${k}')">${BRANCHES[k].icon} ${BRANCHES[k].name}</button>`).join("");
}
function setSource(src){
  if(src){ currentMode = "upgrade"; currentFrom = src; }
  else { currentMode = "new"; currentFrom = null; }
  refresh();
}
function setBranch(which, b){
  if(which === "from") currentFromBranch = b; else currentBranch = b;
  refresh();
}
function setGender(g){ currentGender = g; refresh(); }

/* ===========================================================
   支部選擇
   =========================================================== */
function selectSection(s){
  currentSection = s;
  const sec = SECTIONS[s];
  document.querySelectorAll('.path-step').forEach(el=> el.classList.toggle('active', el.dataset.section === s));
  // 預設來源：第一個
  if(s === "grasshopper"){ currentMode = "new"; currentFrom = null; }
  else if(currentMode === "upgrade" || currentFrom === null){
    currentMode = "upgrade"; currentFrom = sec.upgradeFrom[0];
  }
  if(!sec.hasBranch) currentBranch = "land";
  document.querySelectorAll(".card[data-hide-for]").forEach(card => {
    card.style.display = card.getAttribute("data-hide-for").split(",").includes(s) ? "none" : "";
  });
  applyVisibility();
  refresh();
  updateTransition();
  updateBadgesOverview();
  const timelineEl = $("badge-timeline");
  if(timelineEl) timelineEl.innerHTML = renderBadgeTimeline();
}

// 按「目標支部」及「性別」顯示／隱藏內容（data-show-for / data-show-gender）
function applyVisibility(){
  document.querySelectorAll("[data-show-for],[data-show-gender]").forEach(el => {
    const f = el.getAttribute("data-show-for");
    const g = el.getAttribute("data-show-gender");
    const okF = !f || f.split(",").includes(currentSection);
    const okG = !g || g.split(",").includes(currentGender);
    el.style.display = (okF && okG) ? "" : "none";
  });
}
function refresh(){ renderControls(); applyVisibility(); render(); renderBudget(); renderOfficialPhoto(); }

/* ===========================================================
   主渲染
   =========================================================== */
function contextKey(){ return `${currentSection}-${currentBranch}-${currentMode}-${currentFrom||"new"}-${currentFromBranch}-${currentGender}`; }

function render(){
  const sec = SECTIONS[currentSection];
  const list = buildChecklist({
    section: currentSection, branch: currentBranch, gender: currentGender,
    mode: currentMode, fromSection: currentFrom, fromBranch: currentFromBranch
  });

  const genderLabel = currentGender === "male" ? (currentSection === "leader" ? "男領袖" : "男團員") : (currentSection === "leader" ? "女領袖" : "女團員");
  const branchLabel = sec.hasBranch ? `・${BRANCHES[currentBranch].name}` : "";
  const fromLabel = currentFrom ? `${SECTIONS[currentFrom].name}${SECTIONS[currentFrom].hasBranch ? "（" + BRANCHES[currentFromBranch].short + "）" : ""}` : "";
  const modeLabel = currentMode === "upgrade" ? `由 ${fromLabel} 升${currentSection === "leader" ? "任" : "團"}` : "全新加入";

  // 預覽
  const photo = officialPhoto(currentSection, currentBranch, currentGender);
  let imgHtml;
  if(currentSection === "grasshopper"){
    imgHtml = `<div class="placeholder" style="background:linear-gradient(135deg,#fff4e6,#ffe2c2);border-color:#ff7a1a">🧒</div>`;
  } else {
    imgHtml = `<img src="${photo.url}" alt="${sec.name}${genderLabel}官方制服" loading="lazy" onerror="this.onerror=null;this.src='${photo.fallback || ""}'">`;
  }
  $("preview").innerHTML = `<div class="preview">${imgHtml}
    <div class="info">
      <h3>${sec.name}${branchLabel} · ${genderLabel}</h3>
      <p><strong>${modeLabel}</strong></p>
      <p>支部年齡：${sec.age}</p>
      ${sec.note ? `<p style="font-size:.88rem;color:var(--scout-olive)">${sec.note}</p>` : ""}
      ${currentSection !== "grasshopper" ? `<p class="cite">圖：香港童軍總會官網制服頁 <a href="${photo.src}" target="_blank" rel="noopener">↗</a></p>` : ""}
    </div></div>`;

  // 統計
  const needCount = list.filter(i=>i.status==="need").length;
  const haveCount = list.filter(i=>i.status==="have").length;
  const checkCount = list.filter(i=>i.status==="check").length;
  const ownedCount = list.filter(i=>isOwned(`${contextKey()}-${i.id}`)).length;
  $("summary").innerHTML = `
    <div class="summary">
      <div class="need">需購買<br><strong style="font-size:1.4rem">${needCount}</strong> 項</div>
      <div class="have">可沿用<br><strong style="font-size:1.4rem">${haveCount}</strong> 項</div>
      <div class="check">向團長查詢<br><strong style="font-size:1.4rem">${checkCount}</strong> 項</div>
    </div>
    ${ownedCount > 0 ? `<div style="display:flex;align-items:center;justify-content:space-between;gap:.8rem;margin-top:.6rem;padding:.6rem .8rem;background:#f0f7ed;border-radius:8px;font-size:.85rem;flex-wrap:wrap">
      <span>✅ 已 mark 已有／已買：<strong>${ownedCount}</strong> / ${list.length} 項</span>
      <button onclick="resetAllMarks()" style="padding:.4rem .8rem;border:1.5px solid #e74c3c;background:white;color:#e74c3c;border-radius:16px;font-size:.8rem;cursor:pointer;font-weight:600">🗑 一鍵清紀錄</button></div>` : ''}`;

  const statusLabel = { need: "需購買", have: "可沿用", check: "向團長查詢" };
  const listHTML = list.map(it => {
    const ownedKey = `${contextKey()}-${it.id}`;
    const owned = isOwned(ownedKey);
    // 優先顯示供應社官方產品相；載入失敗則改用本地繪製示意圖
    const fb = it.img || "";
    const iconHtml = (it.shopThumb || it.img)
      ? `<img src="${it.shopThumb || it.img}" alt="${it.title}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${fb}'">`
      : (it.icon || "📦");
    const bigImg = (it.shopImg || it.img)
      ? `<figure class="item-fig"><img class="item-big" src="${it.shopImg || it.img}" alt="${it.title}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${fb}';this.nextElementSibling.textContent='示意圖（供應社官方相暫時無法載入）'">
           <figcaption class="cite">${it.shopImg ? `供應社官方產品相 · <a href="${it.shopUrl}" target="_blank" rel="noopener">${it.shop.name} ↗</a>` : "示意圖"}</figcaption></figure>`
      : "";
    return `
      <div class="item ${it.status}${owned ? ' owned' : ''}">
        <div class="item-row" onclick="toggleItem(this.parentElement)">
          <div class="item-left">
            <div class="item-icon">${iconHtml}</div>
            <div style="min-width:0;flex:1"><div class="item-title">${it.title}</div><div class="item-desc">${it.desc}</div></div>
          </div>
          <div style="text-align:right;flex-shrink:0"><div class="status">${statusLabel[it.status]}</div><div class="arrow">›</div></div>
        </div>
        <div class="item-row" style="padding:0 1rem .5rem 64px;border-top:1px dashed #eee;display:flex;align-items:center;justify-content:space-between;gap:.5rem">
          <button onclick="event.stopPropagation();toggleOwned('${ownedKey}');render()"
            style="padding:.4rem .8rem;border-radius:16px;font-size:.8rem;cursor:pointer;border:1.5px solid ${owned ? '#5a8f3a' : '#ccc'};background:${owned ? '#5a8f3a' : 'white'};color:${owned ? 'white' : '#666'}">${owned ? '✅ 已有／已買' : '⬜ mark 已有'}</button>
          <span style="font-size:.75rem;color:#888">${owned ? '呢件嘢你已有' : '如已有（兄弟姊妹共用），剔呢度'}</span>
        </div>
        <div class="item-detail"><div class="item-detail-inner">
          ${bigImg}
          ${it.detail || ""}
        </div></div>
      </div>`;
  }).join("");

  $("checklist").innerHTML = `
    <div class="checklist-title"><span class="badge" data-section="${currentSection}">${sec.name}</span><span>${modeLabel}${branchLabel} · ${genderLabel} · 共 ${list.length} 項</span></div>
    ${listHTML}
    <div class="note"><strong>備註：</strong>制服規格根據香港童軍總會官網「制服」頁。地域章、區章、旅章、小隊章及旅巾安排，請向<strong>所屬旅團領袖</strong>查詢。</div>`;
}

function toggleItem(el){
  const parent = el.parentElement || el;
  parent.querySelectorAll('.item.expanded').forEach(item => { if (item !== el) item.classList.remove('expanded'); });
  el.classList.toggle('expanded');
}
function resetAllMarks(){
  if(!confirm("確定要清晒所有 mark 紀錄嗎？\n\n此操作無法復原！")) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
  render();
}

/* ===========================================================
   預算 — 以供應社官方零售價為主（SHOP 表），無官方價者用約略區間
   =========================================================== */
const PRICE_APPROX = {
  "pantyhose":[20,60], "shoes-lace":[250,600], "shoes-heel":[250,600], "capbadge-cub":[0,0] /* 已隨幼童軍帽附送 */
};
function itemPrice(id){
  const s = SHOP[id];
  if(s && s.price != null){
    const extra = (s.extra || []).reduce((t,x) => t + (x.price || 0), 0);
    return { lo: s.price + extra, hi: s.price + extra, official: true };
  }
  const p = PRICE_APPROX[id] || [0,0];
  return { lo: p[0], hi: p[1], official: false };
}
function renderBudget(){
  const el = $("budget-dynamic");
  if(!el) return;
  if(currentSection === "grasshopper"){
    el.innerHTML = `<p style="margin:0">小童軍以<strong>旅團安排</strong>為準：小童軍活動服可於<a href="https://www.hkscoutshop.org.hk/" target="_blank" rel="noopener">供應社</a>購買（HK$75），單色衣物、運動鞋可自行選購，旅巾由旅團安排。</p>`;
    return;
  }
  const list = buildChecklist({ section: currentSection, branch: currentBranch, gender: currentGender, mode: currentMode, fromSection: currentFrom, fromBranch: currentFromBranch });
  const need = list.filter(i => i.status !== "have");
  let lo = 0, hi = 0;
  const rows = need.map(i => {
    const p = itemPrice(i.id); lo += p.lo; hi += p.hi;
    const txt = i.status === "check" ? "視乎旅團安排" : (p.official ? `HK$${p.lo}` : (p.lo === p.hi ? `約 HK$${p.lo}` : `約 HK$${p.lo}–${p.hi}`));
    const src = p.official && i.shop ? ` <a class="cite" href="${i.shop.url}" target="_blank" rel="noopener">供應社 ${i.shop.code} ↗</a>` : "";
    return `<tr><td>${i.title}</td><td>${txt}${src}</td></tr>`; }).join("");
  el.innerHTML = `<p style="margin:0 0 .6rem">你而家揀嘅係<strong>${currentMode === "upgrade" ? "升團補購" : "全新全購"}</strong>，需要準備嘅物品如下：</p>
    <table class="size-table"><thead><tr><th>物品</th><th>約略價錢</th></tr></thead><tbody>${rows}</tbody>
    <tfoot><tr><th>合計（不含旅團頒發項目）</th><th>${lo === hi ? `約 HK$${lo}` : `約 HK$${lo}–${hi}`}</th></tr></tfoot></table>
    <p class="cite">標有「供應社編號」的價錢為 hkscoutshop.org.hk 網站 2026 年 9 月標示零售價，其餘為約略參考；實際以香港童軍物品供應社為準。皮鞋、短襪、襪褲可於一般商店購買。</p>`;
}

/* 官方整套制服實相 */
function renderOfficialPhoto(){
  const el = $("official-photo-box");
  if(!el) return;
  if(currentSection === "grasshopper"){ el.innerHTML = ""; return; }
  const photo = officialPhoto(currentSection, currentBranch, currentGender);
  const secName = SECTIONS[currentSection].name + (SECTIONS[currentSection].hasBranch ? "・" + BRANCHES[currentBranch].name : "");
  el.innerHTML = `<div class="note"><strong>📷 ${secName} 官方制服實相（香港童軍總會官網）</strong>
    <p style="margin:.4rem 0">整套對照：帽、恤衫、褲／裙、皮帶、襪、皮鞋、領巾。</p>
    <img src="${photo.url}" alt="官方制服實相" style="max-width:260px;width:100%;border-radius:10px;background:#fff" loading="lazy" onerror="this.onerror=null;this.src='${photo.fallback || ""}'">
    <p class="cite"><a href="${photo.src}" target="_blank" rel="noopener">scout.org.hk 制服頁 ↗</a></p></div>`;
}

// 初始化
selectSection("cub");
