/* ===========================================================
   香港童軍制服準備指南 — 主程式
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
    type: "進步獎章(非進度性)",
    badges: [
      { name: "進步獎章(無特定名稱)", desc: "按小童軍團長安排,完成若干項目後獲頒。" }
    ],
    note: "小童軍支部<strong>沒有正式制服</strong>,訓練以活動為主,考章制度由各團自訂。"
  },
  cub: {
    name: "幼童軍",
    color: "var(--cub)",
    promise: "我願盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。",
    law: "幼童軍,盡所能,先顧別人才顧己,日行一善富精神。",
    motto: "準備 Be Prepared",
    age: "6–11 歲(2025 年 8 月起)",
    type: "4 個進度性獎章",
    badges: [
      { name: "1️⃣ 幼童軍獎章", desc: "入團後第一個目標,於團集會內完成各項活動" },
      { name: "2️⃣ 幼童軍歷奇章", desc: "需先完成幼童軍獎章" },
      { name: "3️⃣ 幼童軍高級歷奇章", desc: "需先完成幼童軍歷奇章" },
      { name: "4️⃣ 金紫荊獎章 ⭐", desc: "幼童軍支部<strong>最高榮譽</strong>。需年滿 9.5 歲、完成幼童軍歷奇章方可申請。考核:戶外挑戰(露營必修)、歷險挑戰、領導才能。" }
    ],
    note: "另有<strong>42 款活動徽章(56 個徽章)</strong>供選擇,完成會員章後任何時間可考取。"
  },
  scout: {
    name: "童軍",
    color: "var(--scout)",
    promise: "我願以信譽為誓,竭盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。",
    law: "童軍信用為人敬。童軍待人要忠誠。童軍友善兼親切。童軍相處如手足。童軍勇敢不怕難。童軍愛物更惜陰。童軍自重又重人。",
    motto: "準備 Be Prepared",
    age: "11–15 歲",
    type: "4 個進度性獎章",
    badges: [
      { name: "1️⃣ 童軍探索獎章", desc: "年滿 11 歲+考獲會員章。項目:戶外挑戰(營藝、歷險、先鋒工程等)、個人發展(體適能、藝術、領導才、靈性)、社會(服務他人)" },
      { name: "2️⃣ 童軍標準獎章(毅行獎章)", desc: "年滿 12 歲+完成探索獎章部分項目" },
      { name: "3️⃣ 童軍高級獎章(挑戰獎章)", desc: "年滿 13/14 歲+完成毅行獎章項目" },
      { name: "4️⃣ 總領袖獎章 ⭐", desc: "童軍支部<strong>最高榮譽</strong>。年滿 14 歲+完成探索、毅行、挑戰三獎章" }
    ],
    note: "海童軍必須選修<strong>海上活動</strong>;空童軍必須選修<strong>航空活動</strong>。"
  },
  venture: {
    name: "深資童軍",
    color: "var(--venture)",
    promise: "我願以信譽為誓,竭盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。",
    law: "與童軍相同。",
    motto: "準備 Be Prepared",
    age: "15–20 歲",
    type: "2 個進度性獎章 + 4 段章",
    badges: [
      { name: "🔰 深資童軍肩章", desc: "先決條件:完成肩章方可報考深資童軍獎章" },
      { name: "1️⃣ 深資童軍獎章", desc: "考獲「責任」、「自立」、「活動」、「探險」<strong>4 個段章</strong>後可獲" },
      { name: "2️⃣ 榮譽童軍獎章 ⭐", desc: "深資支部<strong>最高榮譽</strong>(前身:Dragon Scout Award)。需完成深資童軍獎章+4 段金帶" }
    ],
    note: "深資團為<strong>自學團</strong>,成員自主籌組活動,訓練重點為領導才能及策劃能力。"
  },
  rover: {
    name: "樂行童軍",
    color: "var(--rover)",
    promise: "我願以信譽為誓,竭盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。",
    law: "與童軍相同。",
    motto: "服務 Service",
    age: "18–25 歲",
    type: "2 個進度性獎章",
    badges: [
      { name: "🔰 樂行童軍肩章", desc: "先決條件:完成肩章方可報考樂行童軍獎章" },
      { name: "1️⃣ 樂行童軍獎章", desc: "項目:童軍知識、社區服務、戶外活動、個人興趣、人際關係、個人價值觀、認識世界、生活體驗" },
      { name: "2️⃣ 貝登堡獎章 ⭐", desc: "樂行支部<strong>最高榮譽</strong>(以童軍創辦人命名)。項目:服務、童軍技能、探險、生活體驗" }
    ],
    note: "樂行團為<strong>青年自學團</strong>,以服務社群為主。成員可同時兼任<strong>見習領袖</strong>。"
  },
  leader: {
    name: "領袖",
    color: "var(--leader)",
    promise: "我願以信譽為誓,竭盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。",
    law: "與童軍相同。",
    motto: "服務 Service",
    age: "成年(18+,部分職位 21+)",
    type: "授勳及嘉獎制度(非進度性)",
    badges: [
      { name: "木章 Wood Badge", desc: "完成<strong>領袖訓練課程</strong>(基本訓練+在職訓練)後獲頒,代表已具備擔任領袖的資格" },
      { name: "優異服務獎勵", desc: "表揚長期服務的領袖" },
      { name: "總監嘉許 / 高級嘉許", desc: "由香港總監頒發" }
    ],
    note: "領袖分<strong>見習領袖 → 助理領袖 → 正式領袖</strong>三級。另有<strong>教練員</strong>(專科技能如航海、航空)制度。"
  }
};

function renderBadgesOverview(){
  let html = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:.8rem;margin-top:.8rem">`;
  for(const key in BADGES_OVERVIEW){
    const b = BADGES_OVERVIEW[key];
    html += `<div style="border:1px solid var(--line);border-left:4px solid ${b.color};border-radius:8px;padding:.8rem 1rem;background:#fafafa">
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
  html += `</div>`;
  return html;
}
const TRANSITIONS = {
  grasshopper: {
    title: "由小童軍升幼童軍",
    color: "var(--cub)",
    items: [
      { q: "升團條件?", a: "達到幼童軍年齡(2025 年 8 月起為<strong>6 歲</strong>)即可。通常於<strong>9 月新學年</strong>升團。" },
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
      { q: "升團條件?", a: "達到幼童軍年齡(2025 年 8 月起為<strong>6 歲</strong>)即可。通常於<strong>9 月新學年</strong>升團。" },
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
      { q: "升團條件?", a: "年滿<strong>11 歲</strong>+考獲<strong>幼童軍金紫荊獎章(或其他晉陸資格)</strong>。" },
      { q: "童軍誓詞?", a: "<em>我願以信譽為誓,竭盡所能;對神明,對國家,盡責任;對別人,要幫助;對規律,必遵行。</em>" },
      { q: "童軍規律?", a: "<em>(1)信用為人敬 (2)待人要忠誠 (3)友善兼親切 (4)相處如手足 (5)勇敢不怕難 (6)愛物更惜陰 (7)自重又重人</em>" },
      { q: "進度性獎章目標?", a: "童軍支部共<strong>4 個進度性獎章</strong>:探索獎章(11+) → 毅行獎章(12+) → 高級獎章(13+) → <strong>總領袖獎章</strong>(最高,14+)。" },
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
      { q: "升團條件?", a: "年滿<strong>15 歲</strong>+考獲<strong>總領袖獎章</strong>(或其他晉陸資格)。" },
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
      { q: "升團條件?", a: "年滿<strong>18 歲</strong>+完成<strong>榮譽童軍獎章</strong>(或符合晉陸資格)。" },
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
      { q: "升團條件?", a: "成年(18+)+<strong>完成木章領袖訓練課程</strong>+獲所屬區/地域推薦。" },
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
  render();
  updateTransition();
}

function selectMode(m){
  currentMode = m;
  $("mode-upgrade").classList.toggle("active", m==="upgrade");
  $("mode-new").classList.toggle("active", m==="new");
  render();
}

function setGender(g){
  currentGender = g;
  $("g-male").classList.toggle("active", g==="male");
  $("g-female").classList.toggle("active", g==="female");
  render();
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
          ${mode === "upgrade" && sec.upgradeFrom
            ? `<li>✅ <strong>可沿用</strong>大部分原有制服(帽、巾圈等需更換)</li>
               <li>🔄 必須更換<strong>帽、帽章、巾圈</strong></li>
               <li>🆕 升團後新增的配件需購買</li>`
            : `<li>🛒 需購買<strong>完整制服套裝</strong></li>
               <li>📋 旅巾、帽章(部分)由旅團頒發</li>`}
        </ul>
      </div>
    </div>
  `;
  $("preview").innerHTML = previewHTML;

  // 4. 統計
  const needCount = list.filter(i=>i.status==="need").length;
  const haveCount = list.filter(i=>i.status==="have").length;
  const checkCount = list.filter(i=>i.status==="check").length;
  $("summary").innerHTML = `
    <div class="summary">
      <div class="need">需購買<br><strong style="font-size:1.4rem">${needCount}</strong> 項</div>
      <div class="have">可沿用<br><strong style="font-size:1.4rem">${haveCount}</strong> 項</div>
      <div class="check">向團長查詢<br><strong style="font-size:1.4rem">${checkCount}</strong> 項</div>
    </div>
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
        <div class="item-detail"><div class="item-detail-inner">${it.detail || ""}</div></div>
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

// 初始化
selectSection("cub");
