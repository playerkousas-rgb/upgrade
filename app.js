/* ===========================================================
   童軍準備指南 — 主程式
   =========================================================== */

let currentSection = "cub";   // 預設幼童軍
let currentMode = "upgrade";  // 預設升團
let currentGender = "male";

// 已買/已有狀態(localStorage 持久化)
const STORAGE_KEY = "scout_owned_v1";
function loadOwned(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch(e){ return {}; }
}
function saveOwned(o){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(o)); } catch(e){}
}
function isOwned(key){
  const o = loadOwned();
  return !!o[key];
}
function toggleOwned(key){
  const o = loadOwned();
  o[key] = !o[key];
  saveOwned(o);
}

function $(id){ return document.getElementById(id); }

/* ===========================================================
   進度性獎章總覽 — 6 個支部
   資料來源:香港童軍總會《童軍訓練綱要》及政策、組織及規條
   =========================================================== */
const BADGES_OVERVIEW = {
  grasshopper: {
    name: "小童軍",
    color: "var(--grasshopper)",
    promise: "我願參加小童軍,愛神愛人愛國家。",
    law: "小童軍日行一善。",
    motto: "準備 Be Prepared",
    age: "5.5–8 歲",
    type: "會員章 + 進步獎章",
    badges: [
      { name: "🔰 會員章", desc: "入團後約 <strong>3 個月內</strong>（向團長查詢）" },
      { name: "進步獎章", desc: "按小童軍團長安排" }
    ],
    note: "小童軍支部<strong>沒有正式制服</strong>,訓練以活動為主。"
  },
  cub: {
    name: "幼童軍",
    color: "var(--cub)",
    promise: "我願盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。",
    law: "幼童軍,盡所能,先顧別人才顧己,日行一善富精神。",
    motto: "準備 Be Prepared",
    age: "6–11 歲(2025 年 8 月起)",
    type: "會員章 + 4 個進度性獎章",
    badges: [
      { name: "🔰 會員章", desc: "入團後約 <strong>3 個月內</strong>" },
      { name: "1️⃣ 幼童軍獎章", desc: "獲會員章後,建議約 <strong>6 個月內</strong>" },
      { name: "2️⃣ 幼童軍歷奇章", desc: "獲獎章後,建議約 <strong>1 年內</strong>" },
      { name: "3️⃣ 幼童軍高級歷奇章", desc: "獲歷奇章後,建議約 <strong>1 年半內</strong>" },
      { name: "4️⃣ 金紫荊獎章 ⭐", desc: "完成歷奇章後申請;頒發另有年齡下限（約 9.5–10.5 歲）" }
    ],
    note: "另有活動徽章,完成會員章後任何時間可考取。"
  },
  scout: {
    name: "童軍",
    color: "var(--scout)",
    promise: "我願以信譽為誓,竭盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。",
    law: "童軍信用為人敬。童軍待人要忠誠。童軍友善兼親切。童軍相處如手足。童軍勇敢不怕難。童軍愛物更惜陰。童軍自重又重人。",
    motto: "準備 Be Prepared",
    age: "11–15 歲",
    type: "會員章 + 4 個進度性獎章",
    badges: [
      { name: "🔰 會員章", desc: "入團後約 <strong>1.5 個月</strong>" },
      { name: "1️⃣ 探索獎章", desc: "會員章後開始,約 <strong>1 年</strong>完成一階段" },
      { name: "2️⃣ 毅行獎章", desc: "探索後約再 <strong>1 年</strong>" },
      { name: "3️⃣ 挑戰獎章", desc: "毅行後約再 <strong>1 年</strong>" },
      { name: "4️⃣ 總領袖獎章 ⭐", desc: "完成前三章後考取" }
    ],
    note: "海童軍必須選修海上活動;空童軍必須選修航空活動。"
  },
  venture: {
    name: "深資童軍",
    color: "var(--venture)",
    promise: "我願以信譽為誓,竭盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。",
    law: "與童軍相同。",
    motto: "準備 Be Prepared",
    age: "15–20 歲",
    type: "會員章/肩章 + 2 個進度性獎章",
    badges: [
      { name: "🔰 會員章 / 深資肩章", desc: "入團後約 <strong>數個月</strong>" },
      { name: "1️⃣ 深資童軍獎章", desc: "完成 4 段章。一般入團後約 <strong>1–2 年</strong>" },
      { name: "2️⃣ 榮譽童軍獎章 ⭐", desc: "深資獎章後再進階" }
    ],
    note: "深資團為自學團,訓練重點為領導才能及策劃能力。"
  },
  rover: {
    name: "樂行童軍",
    color: "var(--rover)",
    promise: "我願以信譽為誓,竭盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。",
    law: "與童軍相同。",
    motto: "服務 Service",
    age: "18–25 歲",
    type: "會員章/肩章 + 2 個進度性獎章",
    badges: [
      { name: "🔰 會員章 / 樂行肩章", desc: "入團後約 <strong>數個月</strong>" },
      { name: "1️⃣ 樂行童軍獎章", desc: "肩章後開始,一般入團後約 <strong>1–2 年</strong>" },
      { name: "2️⃣ 貝登堡獎章 ⭐", desc: "樂行獎章後再進階" }
    ],
    note: "樂行團以服務社群為主。成員可同時兼任見習領袖。"
  },
  leader: {
    name: "領袖",
    color: "var(--leader)",
    promise: "我願以信譽為誓,竭盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。",
    law: "與童軍相同。",
    motto: "服務 Service",
    age: "成年(18+,部分職位 21+)",
    type: "授勳及嘉獎（非進度性）",
    badges: [
      { name: "木章 Wood Badge", desc: "入職後完成基本訓練+在職訓練（約 1–2 年）" },
      { name: "優異服務獎勵", desc: "長期服務後" },
      { name: "總監嘉許 / 高級嘉許", desc: "資深領袖" }
    ],
    note: "見習領袖 → 助理領袖 → 正式領袖。符合成年年齡即可申請,毋須先考最高青少年獎章。"
  }
};

function renderBadgesOverview(){
  const b = BADGES_OVERVIEW[currentSection];
  if(!b) return '';
  return `<div style="border:1px solid var(--line);border-left:4px solid ${b.color};border-radius:8px;padding:.8rem 1rem;background:#fafafa">
    <h3 style="margin:0 0 .3rem;font-size:1rem;color:${b.color}">${b.name} <span style="font-size:.75rem;color:#888;font-weight:400">(${b.age})</span></h3>
    <p style="margin:.2rem 0;font-size:.8rem"><strong>獎章制度:</strong>${b.type}</p>
    <details style="margin:.3rem 0">
      <summary style="font-size:.85rem;color:${b.color}">誓詞</summary>
      <p style="font-size:.85rem;margin:.3rem 0;font-style:italic">${b.promise}</p>
    </details>
    <details style="margin:.3rem 0">
      <summary style="font-size:.85rem;color:${b.color}">規律</summary>
      <p style="font-size:.85rem;margin:.3rem 0;font-style:italic">${b.law}</p>
    </details>
    <details style="margin:.3rem 0">
      <summary style="font-size:.85rem;color:${b.color}">進度性獎章(${b.badges.length}個)</summary>
      <ul style="font-size:.85rem;line-height:1.7;margin:.3rem 0 0 1rem;padding:0">
        ${b.badges.map(bg=>`<li><strong>${bg.name}</strong> — ${bg.desc}</li>`).join("")}
      </ul>
    </details>
    <p style="font-size:.78rem;color:#666;margin:.4rem 0 0;border-top:1px dashed #ddd;padding-top:.3rem">${b.note}</p>
  </div>`;
}
const TRANSITIONS = {
  grasshopper: {
    title: "由小童軍升幼童軍",
    color: "var(--cub)",
    items: [
      { q: "升團條件?", a: "<strong>符合幼童軍年齡組別即可升團</strong>（2025 年 8 月起約 6 歲起）。毋須先考最高獎章。實際日期向所屬旅團查詢。" },
      { q: "幼童軍誓詞?", a: "<em>我願盡所能,對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。</em>" },
      { q: "幼童軍規律?", a: "<em>幼童軍,盡所能,先顧別人才顧己,日行一善富精神。</em>" },
      { q: "會員章考核?", a: "入團後 3 個月內完成。內容包括:童軍誓詞規律、徽章知識、簡單紮營/繩結等。" },
      { q: "進度性獎章目標?", a: "幼童軍支部共<strong>4 個進度性獎章</strong>:幼童軍獎章 → 幼童軍歷奇章 → 幼童軍高級歷奇章 → <strong>金紫荊獎章</strong>(最高,需 9.5 歲+完成歷奇章)。" },
      { q: "家長要預備什麼?", a: "幼童軍制服<strong>全套</strong>(帽、帽章、恤衫、短褲/裙褲、皮帶、長襪、巾圈、徽章)。小童軍原本無制服,等同<strong>全新加入幼童軍</strong>。" }
    ]
  },
  cub: {
    title: "由小童軍升幼童軍",
    color: "var(--cub)",
    items: [
      { q: "升團條件?", a: "<strong>符合幼童軍年齡組別即可升團</strong>（2025 年 8 月起約 6 歲起）。毋須先考最高獎章。實際日期向所屬旅團查詢。" },
      { q: "幼童軍誓詞?", a: "<em>我願盡所能,對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。</em>" },
      { q: "幼童軍規律?", a: "<em>幼童軍,盡所能,先顧別人才顧己,日行一善富精神。</em>" },
      { q: "會員章考核?", a: "入團後 3 個月內完成。內容包括:童軍誓詞規律、徽章知識、簡單紮營/繩結等。" },
      { q: "進度性獎章目標?", a: "幼童軍支部共<strong>4 個進度性獎章</strong>:幼童軍獎章 → 幼童軍歷奇章 → 幼童軍高級歷奇章 → <strong>金紫荊獎章</strong>(最高,需 9.5 歲+完成歷奇章)。" },
      { q: "家長要預備什麼?", a: "幼童軍制服<strong>全套</strong>(帽、帽章、恤衫、短褲/裙褲、皮帶、長襪、巾圈、徽章)。小童軍原本無制服,等同<strong>全新加入幼童軍</strong>。" }
    ]
  },
  scout: {
    title: "由幼童軍升童軍",
    color: "var(--scout)",
    items: [
      { q: "升團條件?", a: "<strong>符合童軍年齡組別即可升團</strong>。毋須先考金紫荊或其他最高獎章。實際安排向所屬旅團查詢。" },
      { q: "童軍誓詞?", a: "<em>我願以信譽為誓,竭盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。</em>" },
      { q: "童軍規律?", a: "<em>(1)信用為人敬 (2)待人要忠誠 (3)友善兼親切 (4)相處如手足 (5)勇敢不怕難 (6)愛物更惜陰 (7)自重又重人</em>" },
      { q: "進度性獎章目標?", a: "會員章（入團後約 1.5 個月）→ 探索（約 1 年）→ 毅行（約再 1 年）→ 挑戰（約再 1 年）→ 總領袖獎章。" },
      { q: "何時升團?", a: "幼童軍團於<strong>每年暑假前</strong>考核,達標後 9 月正式升為童軍。" },
      { q: "家長要預備什麼?", a: "必須購買:<strong>深綠色軟帽、童軍帽章、童軍皮製巾圈</strong>。其他(恤衫、短褲/裙褲、皮帶、長襪、皮鞋)如合身可<strong>沿用</strong>。" },
      { q: "可沿用什麼?", a: "杏色恤衫、草青色短褲/裙褲、棕色皮帶、深草青色長襪、黑色皮鞋、<strong>旅巾</strong>。世界童軍會員章、香港章、地域章、區章如狀況良好可沿用。" },
      { q: "必須拆走什麼?", a: "所有<strong>幼童軍徽章</strong>(隊長章、幼童軍進度章)。年星、金紫荊獎章<strong>保留</strong>。" },
      { q: "新體驗", a: "童軍開始有<strong>小隊制</strong>(4–8 人一隊),會有<strong>小隊章</strong>由旅團頒發。活動由本地集會擴展至<strong>宿營、遠足、獨木舟</strong>等。" }
    ]
  },
  venture: {
    title: "由童軍升深資童軍",
    color: "var(--venture)",
    items: [
      { q: "升團條件?", a: "<strong>符合深資童軍年齡組別即可升團</strong>。毋須先考總領袖獎章。實際安排向所屬旅團查詢。" },
      { q: "深資進度性獎章?", a: "深資支部共<strong>2 個進度性獎章 + 4 段章</strong>:<br>• <strong>深資童軍肩章</strong>(先決條件)<br>• 4 段章:責任 / 自立 / 活動 / 探險<br>• <strong>深資童軍獎章</strong>(完成 4 段章後)<br>• <strong>榮譽童軍獎章</strong>⭐(最高,前身為 Dragon Scout Award,需完成深資獎章+4 段金帶)" },
      { q: "新體驗", a: "深資團為<strong>自學團</strong>,成員自主籌組活動(海外交流、社會服務、領袖訓練),訓練重點為<strong>領導才能、策劃能力</strong>。" },
      { q: "家長要預備什麼?", a: "必須購買:<strong>棗紅色軟帽、深資童軍帽章、棗紅色領帶、草青色長褲、黑色短襪</strong>。女團員需購買<strong>半截裙(及膝)</strong>、<strong>肉色襪褲</strong>、<strong>非綁帶中跟皮鞋</strong>。" },
      { q: "可沿用什麼?", a: "杏色恤衫(完全相同)、棕色皮帶、皮鞋(男)、<strong>旅巾</strong>、基本徽章。世界童軍會員章、香港章、地域章、區章如狀況良好可沿用。" }
    ]
  },
  rover: {
    title: "由深資童軍升樂行童軍",
    color: "var(--rover)",
    items: [
      { q: "升團條件?", a: "<strong>符合樂行童軍年齡組別即可升團</strong>。毋須先考榮譽童軍獎章。實際安排向所屬旅團查詢。" },
      { q: "樂行進度性獎章?", a: "樂行支部共<strong>2 個進度性獎章</strong>:<br>• <strong>樂行童軍肩章</strong>(先決條件)<br>• <strong>樂行童軍獎章</strong>(童軍知識、社區服務、戶外活動等)<br>• <strong>貝登堡獎章</strong>⭐(最高,以童軍創辦人命名)" },
      { q: "新體驗", a: "樂行團為<strong>青年自學團</strong>,以<strong>服務社群</strong>為主,參與國際活動、海外服務、專業培訓。成員可同時兼任<strong>見習領袖</strong>,為日後正式成為領袖鋪路。" },
      { q: "家長要預備什麼?", a: "只需購買<strong>樂行童軍帽章</strong>。<strong>無需購買新領帶</strong>(樂行不戴領帶)。<strong>深綠軟帽</strong>可沿用深資的(如深資時期已買了棗紅軟帽,則需購買新深綠軟帽)。" },
      { q: "可沿用什麼?", a: "杏色恤衫、長褲/半截裙、皮帶、襪、皮鞋、旅巾、皮製巾圈。幾乎全部可沿用,只<strong>更換帽章</strong>。" }
    ]
  },
  leader: {
    title: "由樂行/深資 升任領袖",
    color: "var(--leader)",
    items: [
      { q: "升團條件?", a: "<strong>符合成年年齡即可申請成為領袖</strong>。木章訓練是入職後完成,不是升團先決條件。" },
      { q: "領袖授勳制度?", a: "領袖並非進度性獎章,而是<strong>授勳及嘉獎制度</strong>:<br>• <strong>木章 Wood Badge</strong>(完成基本訓練+在職訓練)<br>• 優異服務獎勵(表揚長期服務)<br>• 總監嘉許 / 高級嘉許" },
      { q: "見習 vs 助理 vs 正式領袖?", a: "<strong>見習領袖</strong>:完成木章課程後,實習期約 1 年。<br><strong>助理領袖</strong>:完成若干服務時數後由區總監推薦。<br><strong>正式領袖</strong>:由地域總監推薦,獲總會正式委任。<br>另有<strong>教練員</strong>(專科技能如航海、航空)制度。" },
      { q: "要買齊 6 款制服嗎?", a: "<strong>不需要。</strong>新任領袖通常先買<strong>常規制服(編號 3)</strong>一款已足夠。禮服、晚禮服只在特殊場合穿著,很多領袖整個生涯也未買過。" },
      { q: "海/陸/空怎樣分?", a: "領袖制服分<strong>海、陸、空 3 版本</strong>:<br>• <strong>陸軍</strong>:杏色恤+深綠軟帽(女金邊硬帽)+草青長褲/半截裙<br>• <strong>海軍</strong>:白頂帽+白色恤+深藍長褲/半截裙<br>• <strong>空軍</strong>:灰藍軟帽+淺藍恤+深藍長褲/半截裙" },
      { q: "家長要預備什麼?", a: "必須購買:<strong>領袖軟帽(男)或金邊硬帽(女)、職級帽章、深綠色領帶</strong>。其他(恤衫、長褲/半截裙、皮帶、襪)可沿用樂行制服。" },
      { q: "可保留旅巾嗎?", a: "領袖如屬所屬旅團成員,<strong>可繼續佩戴所屬旅團的旅巾</strong>(出席所屬旅團活動時)。出席總會/地域/區活動時,一般不佩戴旅巾。" }
    ]
  }
};

/* ===========================================================
   過渡指南 渲染
   =========================================================== */
function renderTransition(section){
  const data = TRANSITIONS[section];
  if(!data) return "";
  let html = `<div style="border-left:4px solid ${data.color};padding-left:1rem;margin-bottom:1rem">
    <h3 style="margin:0;color:${data.color}">${data.title}</h3>
  </div>`;
  data.items.forEach(it=>{
    html += `<details>
      <summary>${it.q}</summary>
      <p>${it.a}</p>
    </details>`;
  });
  return html;
}

function updateTransition(){
  $("transition-content").innerHTML = renderTransition(currentSection);
}

function updateBadgesOverview(){
  $("badges-overview").innerHTML = renderBadgesOverview();
}
updateBadgesOverview();

/* ===========================================================
   進度性獎章歷程圖 — 每個支部的考驗流程
   =========================================================== */
const BADGE_TIMELINES = {
  grasshopper: [
    { stage: "🔰", name: "會員章", age: "入團後約 3 個月內", color: "var(--grasshopper)", desc: "入團後約 3 個月內完成" },
    { stage: "1", name: "進步獎章", age: "其後按團安排", color: "var(--grasshopper)", desc: "由團長安排" }
  ],
  cub: [
    { stage: "🔰", name: "會員章", age: "入團後約 3 個月內", color: "var(--cub)", desc: "認識誓詞規律及基本知識" },
    { stage: "1", name: "幼童軍獎章", age: "會員章後約 6 個月內", color: "var(--cub)", desc: "獲會員章後建議 6 個月內完成" },
    { stage: "2", name: "幼童軍歷奇章", age: "獎章後約 1 年內", color: "var(--cub)", desc: "獲幼童軍獎章後建議 1 年內" },
    { stage: "3", name: "高級歷奇章", age: "歷奇章後約 1 年半內", color: "var(--cub)", desc: "獲歷奇章後建議 1 年半內" },
    { stage: "⭐", name: "金紫荊獎章", age: "完成歷奇章後", color: "#FFD700", desc: "完成歷奇章後可申請；頒發另有年齡下限" }
  ],
  scout: [
    { stage: "🔰", name: "會員章", age: "入團後約 1.5 個月", color: "var(--scout)", desc: "初步接觸童軍運動" },
    { stage: "1", name: "探索獎章", age: "會員章後約 1 年", color: "var(--scout)", desc: "戶外挑戰、個人發展、社會服務" },
    { stage: "2", name: "毅行獎章", age: "探索後約再 1 年", color: "var(--scout)", desc: "下一階段進度" },
    { stage: "3", name: "挑戰獎章", age: "毅行後約再 1 年", color: "var(--scout)", desc: "下一階段進度" },
    { stage: "⭐", name: "總領袖獎章", age: "完成前三章後", color: "#FFD700", desc: "支部最高榮譽" }
  ],
  venture: [
    { stage: "🔰", name: "會員章 / 肩章", age: "入團後約數個月", color: "var(--venture)", desc: "完成後方可考進度章" },
    { stage: "1", name: "深資童軍獎章", age: "入團後約 1–2 年", color: "var(--venture)", desc: "完成責任、自立、活動、探險 4 段章" },
    { stage: "⭐", name: "榮譽童軍獎章", age: "深資獎章後再進階", color: "#FFD700", desc: "支部最高榮譽" }
  ],
  rover: [
    { stage: "🔰", name: "會員章 / 肩章", age: "入團後約數個月", color: "var(--rover)", desc: "完成後方可考進度章" },
    { stage: "1", name: "樂行童軍獎章", age: "入團後約 1–2 年", color: "var(--rover)", desc: "服務、戶外、生活體驗等" },
    { stage: "⭐", name: "貝登堡獎章", age: "樂行獎章後再進階", color: "#FFD700", desc: "支部最高榮譽" }
  ],
  leader: [
    { stage: "🎓", name: "木章", age: "入職後約 1–2 年", color: "var(--leader)", desc: "基本訓練 + 在職訓練" },
    { stage: "🏅", name: "優異服務獎勵", age: "長期服務後", color: "var(--leader)", desc: "表揚長期服務" },
    { stage: "⭐", name: "總監嘉許", age: "資深領袖", color: "#FFD700", desc: "由香港總監頒發" }
  ]
};

function renderBadgeTimeline(){
  const items = BADGE_TIMELINES[currentSection];
  if(!items) return '';
  const sec = SECTIONS[currentSection];
  let html = `<h3 style="color:var(--scout-green);margin-top:1.5rem">📊 ${sec.name}進度性獎章歷程（入團後大約幾時完成）</h3>`;
  html += `<div style="display:flex;flex-wrap:wrap;gap:.6rem;margin:.8rem 0;align-items:center">`;
  items.forEach((item, idx) => {
    html += `<div style="flex:1;min-width:120px;border:2px solid ${item.color};border-radius:10px;padding:.6rem;text-align:center;background:white">
      <div style="font-size:1.5rem;margin-bottom:.2rem">${item.stage}</div>
      <div style="font-weight:700;font-size:.85rem;color:${item.color}">${item.name}</div>
      <div style="font-size:.75rem;color:#888;margin:.2rem 0">${item.age}</div>
    </div>`;
    if(idx < items.length - 1){
      html += `<div style="font-size:1.2rem;color:#ccc;flex-shrink:0">→</div>`;
    }
  });
  html += `</div>`;
  html += `<details style="margin:.5rem 0"><summary style="font-size:.85rem;color:var(--scout-green)">查看詳細考驗內容</summary><ul style="font-size:.85rem;line-height:1.7;margin:.3rem 0 0 1rem;padding:0">`;
  items.forEach(item => {
    html += `<li><strong>${item.name}</strong> — ${item.desc}</li>`;
  });
  html += `</ul></details>`;
  return html;
}

/* ===========================================================
   支部選擇
   =========================================================== */
function selectSection(s){
  currentSection = s;
  // 更新 path 高亮
  document.querySelectorAll('.path-step').forEach(el=>{
    el.classList.toggle('active', el.dataset.section === s);
  });
  // 小童軍特殊處理:無制服,隱藏升團選項
  if(s === "grasshopper"){
    $("mode-upgrade").style.display = "none";
    $("mode-new").classList.add("active");
    $("mode-upgrade").classList.remove("active");
    currentMode = "new";
  } else {
    $("mode-upgrade").style.display = "";
  }
  // 依支部顯示/隱藏區塊
  document.querySelectorAll(".card[data-hide-for]").forEach(card => {
    const hideFor = card.getAttribute("data-hide-for").split(",");
    card.style.display = hideFor.includes(s) ? "none" : "";
  });
  // 依支部顯示/隱藏個別元素(FAQ、穿著錯誤等)
  document.querySelectorAll("[data-show-for]").forEach(el => {
    const showFor = el.getAttribute("data-show-for").split(",");
    el.style.display = showFor.includes(s) ? "" : "none";
  });
  render();
  updateTransition();
  updateBadgesOverview();
  const timelineEl = document.getElementById("badge-timeline");
  if(timelineEl) timelineEl.innerHTML = renderBadgeTimeline();
  renderBudget();
  renderOfficialPhoto();
}

function selectMode(m){
  currentMode = m;
  $("mode-upgrade").classList.toggle("active", m==="upgrade");
  $("mode-new").classList.toggle("active", m==="new");
  render();
  renderBudget();
}

function setGender(g){
  currentGender = g;
  $("g-male").classList.toggle("active", g==="male");
  $("g-female").classList.toggle("active", g==="female");
  render();
  renderBudget();
  renderOfficialPhoto();
}

/* ===========================================================
   主渲染
   =========================================================== */
function render(){
  const sec = SECTIONS[currentSection];
  const mode = currentMode;
  const gender = currentGender;

  // 1. 決定制服清單
  const uniformData = UNIFORMS[currentSection];
  if(!uniformData){ return; }
  let modeData = uniformData[mode] || uniformData.new;
  if(!modeData){ return; }
  let list = modeData[gender] || modeData.male || modeData.female || [];
  if(!Array.isArray(list)) list = [];

  // 2. 更新 check-list 標題
  const genderLabel = gender === "male" ? "男團員" : "女團員";
  const modeLabel = mode === "upgrade" ? `由 ${SECTIONS[sec.upgradeFrom]?.name || "上一支部"} 升團` : "全新加入";

  // 3. 渲染 preview
  const previewKey = `${currentSection}-${gender}`;
  const previewImg = PREVIEW_IMG[previewKey];
  const placeholderEmoji = currentSection === "grasshopper" ? "🧒" : "👕";
  let previewHTML = `
    <div class="preview">
      ${previewImg
        ? `<img src="${previewImg}" alt="${sec.name}${genderLabel}制服示意圖" loading="lazy">`
        : `<div class="placeholder" style="${currentSection === "grasshopper" ? "background:linear-gradient(135deg,#fff4e6,#ffe2c2);border-color:#ff7a1a" : ""}">${placeholderEmoji}</div>`}
      <div class="info">
        <h3>${sec.name} · ${genderLabel}</h3>
        <p><strong>${modeLabel}</strong></p>
        <p>支部年齡: ${sec.age}</p>
        ${sec.note ? `<p style="font-size:.88rem;color:var(--scout-olive)">${sec.note}</p>` : ""}
        <ul>
          ${currentSection === "grasshopper"
            ? `<li>📋 向<strong>所屬旅團領袖</strong>查詢當季服裝安排</li>
               <li>🧣 旅巾、旅章由旅團頒發</li>`
            : currentSection === "cub"
            ? `<li>🛒 需購買<strong>完整制服套裝</strong></li>
               <li>📋 旅巾、旅章由旅團頒發</li>`
            : mode === "upgrade" && sec.upgradeFrom
            ? `<li>🔄 必須更換<strong>帽、帽章、巾圈</strong></li>
               <li>🆕 升團後新增的配件需購買</li>`
            : `<li>🛒 需購買<strong>完整制服套裝</strong></li>
               <li>📋 旅巾、旅章(部分)由旅團頒發</li>`}
        </ul>
      </div>
    </div>
  `;
  $("preview").innerHTML = previewHTML;

  // 4. 統計
  const needCount = list.filter(i=>i.status==="need").length;
  const haveCount = list.filter(i=>i.status==="have").length;
  const checkCount = list.filter(i=>i.status==="check").length;
  const ownedCount = list.filter(i=>isOwned(`${currentSection}-${currentMode}-${currentGender}-${i.id}`)).length;
  $("summary").innerHTML = `
    <div class="summary">
      <div class="need">需購買<br><strong style="font-size:1.4rem">${needCount}</strong> 項</div>
      <div class="have">可沿用<br><strong style="font-size:1.4rem">${haveCount}</strong> 項</div>
      <div class="check">向團長查詢<br><strong style="font-size:1.4rem">${checkCount}</strong> 項</div>
    </div>
    ${ownedCount > 0 ? `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:.8rem;margin-top:.6rem;padding:.6rem .8rem;background:#f0f7ed;border-radius:8px;font-size:.85rem;flex-wrap:wrap">
      <span>✅ 已 mark 已有/已買:<strong>${ownedCount}</strong> / ${list.length} 項</span>
      <button onclick="resetAllMarks()"
        style="padding:.4rem .8rem;border:1.5px solid #e74c3c;background:white;color:#e74c3c;border-radius:16px;font-size:.8rem;cursor:pointer;font-weight:600">
        🗑 一鍵清紀錄
      </button>
    </div>
    <p class="cite" style="margin-top:.3rem;text-align:right">第 2 個小孩要重新準備?清紀錄由頭開始</p>
    ` : ''}
  `;

  // 5. 渲染 check-list
  const statusLabel = {
    need: "需購買",
    have: "可沿用",
    check: "向團長查詢"
  };
  const listHTML = list.map(it => {
    const cls = it.status;
    const label = statusLabel[it.status] || it.status;
    const ownedKey = `${currentSection}-${currentMode}-${currentGender}-${it.id}`;
    const owned = isOwned(ownedKey);
    return `
      <div class="item ${cls}${owned ? ' owned' : ''}" data-owned-key="${ownedKey}">
        <div class="item-row" onclick="toggleItem(this.parentElement)">
          <div class="item-left">
            <div class="item-icon">${it.icon || "📦"}</div>
            <div style="min-width:0;flex:1">
              <div class="item-title">${it.title}</div>
              <div class="item-desc">${it.desc}</div>
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="status">${label}</div>
            <div class="arrow">›</div>
          </div>
        </div>
        <div class="item-row" style="padding:0 1rem .5rem 64px;border-top:1px dashed #eee;display:flex;align-items:center;justify-content:space-between;gap:.5rem">
          <button onclick="event.stopPropagation();toggleOwned('${ownedKey}');render()"
            style="padding:.4rem .8rem;border-radius:16px;font-size:.8rem;cursor:pointer;border:1.5px solid ${owned ? '#5a8f3a' : '#ccc'};background:${owned ? '#5a8f3a' : 'white'};color:${owned ? 'white' : '#666'}">
            ${owned ? '✅ 已有/已買' : '⬜ mark 已有'}
          </button>
          <span style="font-size:.75rem;color:#888">${owned ? '呢件嘢你已有' : '如已有(兄弟姊妹共用),剔呢度'}</span>
        </div>
        <div class="item-detail"><div class="item-detail-inner">${it.detail || ""}${officialItemPhotoHtml()}</div></div>
      </div>
    `;
  }).join("");

  $("checklist").innerHTML = `
    <div class="checklist-title">
      <span class="badge" data-section="${currentSection}">${sec.name}</span>
      <span>${modeLabel} · ${genderLabel} · 共 ${list.length} 項</span>
    </div>
    ${listHTML}
    <div class="note">
      <strong>備註:</strong>以上制服規格根據香港童軍總會《儀容與制服手冊》2025 年版。
      地域章、區章、旅章、小隊章需向<strong>所屬旅團領袖</strong>查詢購買或頒發安排。
    </div>
  `;
}

function toggleItem(el){
  const parent = el.parentElement || el;
  parent.querySelectorAll('.item.expanded').forEach(item => {
    if (item !== el) item.classList.remove('expanded');
  });
  el.classList.toggle('expanded');
}

// 一鍵清所有 mark 紀錄(支援第 2 個小孩重新準備)
function resetAllMarks(){
  if(!confirm("確定要清晒所有 mark 紀錄嗎?\n\n(支援第 2 個小孩重新準備)\n\n此操作無法復原!")) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
  render();
}


/* 家長預算：只顯示你揀嘅情境 — 升團補購 vs 全新全購 */
const PARENT_BUDGET = {
  cub: {
    upgrade: { label: "小童軍 → 幼童軍（等同全購）", items: "帽、帽章、恤衫、短褲/裙褲、皮帶、長襪、巾圈、基本徽章", price: "約 HKD 600–900" },
    full: { label: "全新加入幼童軍（全購）", items: "同上全套", price: "約 HKD 600–900" }
  },
  scout: {
    upgrade: { label: "幼童軍 → 童軍（補購）", items: "深綠軟帽、童軍帽章、皮製巾圈", price: "約 HKD 150–280" },
    full: { label: "全新加入童軍（全購）", items: "帽、帽章、恤衫、短褲/裙褲、皮帶、長襪、皮製巾圈、基本徽章", price: "約 HKD 650–950" }
  },
  venture: {
    upgrade: { label: "童軍 → 深資（補購）", items: "棗紅軟帽、深資帽章、棗紅領帶、長褲（男）或半截裙+襪褲+中跟鞋（女）、黑色短襪（男）", price: "男約 HKD 400–600；女約 HKD 550–850" },
    full: { label: "全新加入深資（全購）", items: "帽、帽章、恤衫、長褲/半截裙、皮帶、襪、領帶、巾圈、基本徽章", price: "約 HKD 750–1100" }
  },
  rover: {
    upgrade: { label: "深資 → 樂行（補購）", items: "樂行帽章（棗紅帽改深綠帽如未有則另買帽）", price: "約 HKD 50–180" },
    full: { label: "全新加入樂行（全購）", items: "深綠軟帽、帽章、恤衫、長褲/半截裙、皮帶、襪、巾圈、基本徽章（不戴領帶）", price: "約 HKD 700–1050" }
  },
  leader: {
    upgrade: { label: "樂行/深資 → 領袖（補購）", items: "領袖帽（男軟帽／女金邊硬帽）、職級帽章、深綠領帶", price: "男約 HKD 200–400；女金邊硬帽另計約 HKD 500–800" },
    full: { label: "全新加入領袖（全購常規制服）", items: "帽、恤衫、長褲/半截裙、皮帶、襪、深綠領帶、基本徽章", price: "約 HKD 800–1500" }
  }
};

function renderBudget(){
  const el = document.getElementById("budget-dynamic");
  if(!el) return;
  const b = PARENT_BUDGET[currentSection];
  if(!b){ el.innerHTML = "<p>小童軍無指定制服,無需制服預算。</p>"; return; }
  const row = currentMode === "upgrade" ? b.upgrade : b.full;
  const other = currentMode === "upgrade" ? b.full : b.upgrade;
  el.innerHTML = `
    <p style="margin:0 0 .6rem">你而家揀嘅係<strong>${currentMode==="upgrade"?"升團補購":"全新全購"}</strong>。家長只需睇呢一欄。</p>
    <table class="size-table">
      <thead><tr><th>你要準備</th><th>買咩</th><th>約略價錢</th></tr></thead>
      <tbody>
        <tr><td><strong>${row.label}</strong></td><td>${row.items}</td><td>${row.price}</td></tr>
      </tbody>
    </table>
    <p class="cite">另一種情況（${other.label}）約 ${other.price}。皮鞋另計（鞋店約 HKD 300–800,合規格可沿用舊鞋）。實際以 SCOUT SHOP 為準。</p>
  `;
}

function officialItemPhotoHtml(){
  const p = (typeof ITEM_PHOTOS !== "undefined") ? ITEM_PHOTOS[currentSection] : null;
  if(!p) return "";
  const src = currentGender === "female" ? p.female : p.male;
  return `<div class="tip" style="margin-top:.6rem"><strong>總會官方制服實相</strong>（配件一覽）<br>
    <img src="${src}" alt="官方制服" style="max-width:180px;border-radius:8px;margin-top:.4rem;background:#fff" loading="lazy">
    <br><a href="${p.src}" target="_blank" rel="noopener">來源：香港童軍總會制服頁 ↗</a></div>`;
}

function renderOfficialPhoto(){
  const el = document.getElementById("official-photo-box");
  if(!el) return;
  const p = (typeof ITEM_PHOTOS !== "undefined") ? ITEM_PHOTOS[currentSection] : null;
  if(!p){ el.innerHTML = ""; return; }
  const src = currentGender === "female" ? p.female : p.male;
  el.innerHTML = `<div class="note">
    <strong>📷 配件實相（香港童軍總會官方圖）</strong>
    <p style="margin:.4rem 0">帽、恤、褲/裙、皮帶、襪、鞋、領巾一次過對照。單件產品相請到 <a href="http://www.hkscoutshop.org.hk" target="_blank" rel="noopener">SCOUT SHOP</a> 現場或網站。</p>
    <img src="${src}" alt="官方制服實相" style="max-width:260px;width:100%;border-radius:10px;background:#fff" loading="lazy">
    <p class="cite"><a href="${p.src}" target="_blank" rel="noopener">scout.org.hk 制服頁 ↗</a></p>
  </div>`;
}

// 初始化
selectSection("cub");
