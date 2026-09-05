/* ===========================================================
   香港童軍制服準備指南 — 主程式
   =========================================================== */

let currentSection = "cub";   // 預設幼童軍
let currentMode = "upgrade";  // 預設升團
let currentGender = "male";

function $(id){ return document.getElementById(id); }

function selectSection(s){
  currentSection = s;
  // 更新 path 高亮
  document.querySelectorAll('.path-step').forEach(el=>{
    el.classList.toggle('active', el.dataset.section === s);
  });
  // 小童軍 / 領袖特殊處理
  if(s === "grasshopper"){
    // 小童軍無制服,自動切到「全新加入」模式並隱藏升團選項
    $("mode-upgrade").style.display = "none";
    $("mode-new").classList.add("active");
    $("mode-upgrade").classList.remove("active");
    currentMode = "new";
  } else {
    $("mode-upgrade").style.display = "";
  }
  render();
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
  let previewHTML = `
    <div class="preview">
      ${previewImg
        ? `<img src="${previewImg}" alt="${sec.name}${genderLabel}制服示意圖" loading="lazy">`
        : `<div class="placeholder">👕</div>`}
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
  // close others
  const parent = el.parentElement;
  parent.querySelectorAll('.item.expanded').forEach(item => {
    if (item !== el) item.classList.remove('expanded');
  });
  el.classList.toggle('expanded');
}

// 初始化
selectSection("cub");
