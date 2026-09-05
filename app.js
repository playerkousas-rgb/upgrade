/* ===========================================================
   香港童軍制服準備指南 — 主程式
   =========================================================== */

let currentSection = "cub";   // 預設幼童軍
let currentMode = "upgrade";  // 預設升團
let currentGender = "male";

function $(id){ return document.getElementById(id); }

/* ===========================================================
   升團過渡指南 — 資料
   =========================================================== */
const TRANSITIONS = {
  grasshopper: {
    title: "由小童軍升幼童軍",
    color: "var(--cub)",
    items: [
      { q: "何時升團?", a: "通常於<strong>9 月新學年</strong>升團,達到幼童軍年齡(7.5 歲)即可。" },
      { q: "家長要預備什麼?", a: "幼童軍制服<strong>全套</strong>(帽、帽章、恤衫、短褲/裙褲、皮帶、長襪、巾圈、徽章)。小童軍原本無制服,等同<strong>全新加入幼童軍</strong>。" },
      { q: "會員章考核內容?", a: "通常於入團後 3 個月內完成。考核內容包括:童軍誓詞、規律、徽章知識、簡單紮營/繩結等。詳情參閱《幼童軍手冊》。" },
      { q: "升團後還要保留什麼?", a: "小童軍時期<strong>無制服配件可保留</strong>(本來就無),但進步獎章可保留作紀念。" }
    ]
  },
  cub: {
    title: "由小童軍升幼童軍",
    color: "var(--cub)",
    items: [
      { q: "何時升團?", a: "通常於<strong>9 月新學年</strong>升團,達到幼童軍年齡(7.5 歲)即可。" },
      { q: "家長要預備什麼?", a: "幼童軍制服<strong>全套</strong>(帽、帽章、恤衫、短褲/裙褲、皮帶、長襪、巾圈、徽章)。小童軍原本無制服,等同<strong>全新加入幼童軍</strong>。" },
      { q: "會員章考核內容?", a: "通常於入團後 3 個月內完成。考核內容包括:童軍誓詞、規律、徽章知識、簡單紮營/繩結等。詳情參閱《幼童軍手冊》。" },
      { q: "升團後還要保留什麼?", a: "小童軍時期<strong>無制服配件可保留</strong>(本來就無),但進步獎章可保留作紀念。" }
    ]
  },
  scout: {
    title: "由幼童軍升童軍",
    color: "var(--scout)",
    items: [
      { q: "何時升團?", a: "幼童軍團於<strong>每年暑假前</strong>考核升團,達到 12 歲並完成<strong>晉陸章</strong>後,9 月正式升為童軍。" },
      { q: "家長要預備什麼?", a: "必須購買:<strong>深綠色軟帽、童軍帽章、童軍皮製巾圈</strong>。其他(恤衫、短褲/裙褲、皮帶、長襪、皮鞋)如合身可<strong>沿用</strong>。" },
      { q: "可沿用什麼?", a: "杏色恤衫、草青色短褲/裙褲、棕色皮帶、深草青色長襪、黑色皮鞋、<strong>旅巾</strong>。世界童軍會員章、香港章、地域章、區章如狀況良好可沿用。" },
      { q: "必須拆走什麼?", a: "所有<strong>幼童軍徽章</strong>(如隊長章、幼童軍進度章)。年星、金紫荊獎章<strong>保留</strong>。" },
      { q: "新體驗", a: "童軍開始有<strong>小隊制</strong>(由 4–8 人組成),會有<strong>小隊章</strong>由旅團頒發。活動由本地集會擴展至<strong>宿營、遠足、獨木舟</strong>等。" }
    ]
  },
  venture: {
    title: "由童軍升深資童軍",
    color: "var(--venture)",
    items: [
      { q: "何時升團?", a: "達到 15 歲並完成<strong>深資晉陸章</strong>後,可升為深資童軍。深資團為<strong>自學團</strong>,成員自主籌組活動。" },
      { q: "家長要預備什麼?", a: "必須購買:<strong>棗紅色軟帽、深資童軍帽章、棗紅色領帶、草青色長褲、黑色短襪</strong>。女團員需購買<strong>半截裙(及膝)</strong>、<strong>肉色襪褲</strong>、<strong>非綁帶中跟皮鞋</strong>。" },
      { q: "可沿用什麼?", a: "杏色恤衫(完全相同)、棕色皮帶、皮鞋(男)、<strong>旅巾</strong>、基本徽章。世界童軍會員章、香港章、地域章、區章如狀況良好可沿用。" },
      { q: "新體驗", a: "深資童軍開始<strong>自主籌組活動</strong>(海外交流、社會服務、領袖訓練),訓練重點為<strong>領導才能、策劃能力</strong>。" }
    ]
  },
  rover: {
    title: "由深資童軍升樂行童軍",
    color: "var(--rover)",
    items: [
      { q: "何時升團?", a: "達到 18 歲並完成<strong>樂行晉陸章</strong>後,可升為樂行童軍。樂行團為<strong>青年自學團</strong>。" },
      { q: "家長要預備什麼?", a: "只需購買<strong>樂行童軍帽章</strong>。<strong>無需購買新領帶</strong>(樂行不戴領帶)。<strong>深綠軟帽</strong>可沿用深資的(如深資時期已買了棗紅軟帽,則需購買新深綠軟帽)。" },
      { q: "可沿用什麼?", a: "杏色恤衫、長褲/半截裙、皮帶、襪、皮鞋、旅巾、皮製巾圈。所有制服配件幾乎全部可沿用,只<strong>更換帽章</strong>。" },
      { q: "新體驗", a: "樂行童軍以<strong>服務社群</strong>為主,參與<strong>國際活動、海外服務、專業培訓</strong>。成員可選擇同時擔任<strong>見習領袖</strong>,為日後正式成為領袖鋪路。" }
    ]
  },
  leader: {
    title: "由樂行/深資 升任領袖",
    color: "var(--leader)",
    items: [
      { q: "何時可成為領袖?", a: "成年(18+)後可報讀<strong>領袖訓練課程</strong>(木章課程)。完成課程並獲所屬區/地域推薦,即可成為<strong>見習領袖</strong>。" },
      { q: "家長要預備什麼?", a: "必須購買:<strong>領袖軟帽(男)或金邊硬帽(女)、職級帽章、深綠色領帶</strong>。其他(恤衫、長褲/半截裙、皮帶、襪)可沿用樂行制服。" },
      { q: "要買齊 6 款制服嗎?", a: "不需要。新任領袖通常先買<strong>編號 3(常規)+ 編號 4(領帶)</strong>兩款已足夠。編號 1(禮服)及編號 2(晚禮服)只在特殊場合穿著,很多領袖整個生涯也未買過。" },
      { q: "見習 vs 助理 vs 正式領袖?", a: "<strong>見習領袖</strong>:完成木章課程後,實習期約 1 年。<br><strong>助理領袖</strong>:完成若干服務時數後由區總監推薦。<br><strong>正式領袖</strong>:由地域總監推薦,獲總會正式委任。" },
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
    return `
      <div class="item ${cls}" onclick="toggleItem(this)">
        <div class="item-row">
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
  const parent = el.parentElement;
  parent.querySelectorAll('.item.expanded').forEach(item => {
    if (item !== el) item.classList.remove('expanded');
  });
  el.classList.toggle('expanded');
}

// 初始化
selectSection("cub");
