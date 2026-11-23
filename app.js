/* ===========================================================
   童軍準備指南 — 主程式
   =========================================================== */

let currentSection = "cub";       // 目標支部
let currentMode = "upgrade";      // upgrade | new
let currentGender = "male";
let currentBranch = "land";       // 目標類型 land | sea | air
let currentFrom = null;           // 升團來源支部（領袖可揀 venture / rover）
let currentFromBranch = "land";   // 升團來源類型
let currentBottom = "skirt";      // 2026 新綱要：女團員下半身 skirt（半截裙）| trousers（長褲）

// 已買/已有狀態(localStorage 持久化)
const STORAGE_KEY = "scout_owned_v2";
function loadOwned(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch(e){ return {}; } }
function saveOwned(o){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(o)); } catch(e){} }
function isOwned(key){ return !!loadOwned()[key]; }
function toggleOwned(key){ const o = loadOwned(); o[key] = !o[key]; saveOwned(o); }
function $(id){ return document.getElementById(id); }

/* ===========================================================
   語言 / Language — 右上角「EN／中文」掣切換，設定存 localStorage
   =========================================================== */
const LANG_KEY = "scout-guide-lang-v1";
function detectDefaultLang(){
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if(saved && LOCALES[saved]) return saved;
  } catch(e){}
  return "zh-HK";
}
// 靜態 HTML 的文字節點：第一次套用時記低中文原文，之後按語言還原／翻譯
let staticTextNodes = null;
function collectStaticTextNodes(){
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  while(walker.nextNode()){
    const node = walker.currentNode;
    const parent = node.parentElement;
    if(!parent || parent.tagName === "SCRIPT" || parent.tagName === "STYLE") continue;
    const raw = node.data;
    const key = raw.trim();
    if(!key) continue;
    const lead = raw.slice(0, raw.length - raw.trimStart().length);
    const trail = raw.slice(lead.length + key.length);
    nodes.push({ node, key, lead, trail });
  }
  return nodes;
}
function applyStaticI18n(){
  const map = L().HTML;
  if(!staticTextNodes) staticTextNodes = collectStaticTextNodes();
  staticTextNodes.forEach(item => {
    const text = LANG === "zh-HK" ? item.key : (map[item.key] || item.key);
    item.node.data = item.lead + text + item.trail;
  });
}
function renderStaticText(){
  const t = UI(), app = L().APP;
  document.documentElement.lang = L().htmlLang;
  document.documentElement.setAttribute("data-lang", LANG === "en" ? "en" : "zh");
  document.title = app.name;
  const metaDesc = document.querySelector('meta[name="description"]');
  if(metaDesc) metaDesc.setAttribute("content", app.description);
  const appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
  if(appleTitle) appleTitle.setAttribute("content", app.appleTitle);
  const logo = document.querySelector(".brand img");
  if(logo) logo.alt = app.logoAlt;
  const h1 = document.querySelector("header .brand h1");
  if(h1) h1.textContent = app.name;
  const tag = document.querySelector("header .brand p");
  if(tag) tag.textContent = app.tagline;
  const toolbar = $("part-toolbar");
  if(toolbar){
    const hint = toolbar.querySelector("p");
    if(hint) hint.textContent = t.toolbarHint;
    const group = toolbar.querySelector(".part-toolbar-actions");
    if(group) group.setAttribute("aria-label", t.toolbarAria);
  }
  const expandBtn = $("expand-all-parts"), collapseBtn = $("collapse-all-parts");
  if(expandBtn) expandBtn.textContent = t.expandAll;
  if(collapseBtn) collapseBtn.textContent = t.collapseAll;
  const langBtn = $("fab-lang");
  if(langBtn){
    langBtn.textContent = L().switchToLabel;
    langBtn.setAttribute("aria-label", t.langToggleAria);
    langBtn.setAttribute("title", t.langToggleAria);
  }
  const reportLink = $("report-link");
  if(reportLink) reportLink.textContent = t.reportLink;
  const supportLink = $("storeSupportTop");
  if(supportLink){
    const supportLabel = $("storeSupportTopLabel");
    if(supportLabel) supportLabel.textContent = t.supportBtn;
    else supportLink.textContent = t.supportBtn;
    supportLink.setAttribute("aria-label", t.supportLinkAria);
    supportLink.setAttribute("title", t.supportLinkAria);
  }
  const supportPrompt = $("storeSupportPrompt");
  if(supportPrompt) supportPrompt.textContent = t.supportPrompt;
  const supportFoot = $("storeSupportFoot");
  if(supportFoot){
    supportFoot.textContent = t.supportFootBtn;
    supportFoot.setAttribute("aria-label", t.supportLinkAria);
    supportFoot.setAttribute("title", t.supportLinkAria);
  }
  applyStaticI18n();
}
function setLang(lang){
  if(!LOCALES[lang] || lang === LANG) return;
  LANG = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch(e){}
  renderAll();
}
function renderAll(){
  renderStaticText();
  selectSection(currentSection);
}
function bindLangBtn(){
  const btn = $("fab-lang");
  if(btn) btn.addEventListener("click", () => setLang(LANG === "zh-HK" ? "en" : "zh-HK"));
}

/* ===========================================================
   各 PART 開合 — 原生 details 支援滑鼠、觸控及鍵盤
   =========================================================== */
const PARTS_STORAGE_KEY = "scout_parts_v1";
function getParts(){ return Array.from(document.querySelectorAll(".container > details.part")); }
function getVisibleParts(){ return getParts().filter(part => getComputedStyle(part).display !== "none"); }
function savePartStates(){
  const states = Object.fromEntries(getParts().map(part => [part.id, part.open]));
  try { localStorage.setItem(PARTS_STORAGE_KEY, JSON.stringify(states)); } catch(e){}
}
function updatePartControls(){
  const visible = getVisibleParts();
  $("expand-all-parts").disabled = visible.every(part => part.open);
  $("collapse-all-parts").disabled = visible.every(part => !part.open);
}
function setAllParts(open){
  // 只操作目前支部適用的部分，不改動被篩選隱藏的內容。
  getVisibleParts().forEach(part => { part.open = open; });
  savePartStates();
  updatePartControls();
  if(open && scout3dPanelViewer) scout3dPanelViewer.redraw();
}
function initParts(){
  let saved = {};
  try {
    const value = JSON.parse(localStorage.getItem(PARTS_STORAGE_KEY) || "{}");
    if(value && typeof value === "object" && !Array.isArray(value)) saved = value;
  } catch(e){}
  getParts().forEach(part => {
    // 沒有有效紀錄時，沿用 HTML 預設（只展開步驟 ①、②）。
    if(typeof saved[part.id] === "boolean") part.open = saved[part.id];
    part.addEventListener("toggle", event => {
      if(event.target !== part) return; // 不處理內層 FAQ 等細項的事件。
      savePartStates();
      updatePartControls();
      if(part.id === "part-badges" && part.open && scout3dPanelViewer) scout3dPanelViewer.redraw();
    });
  });
  $("expand-all-parts").addEventListener("click", () => setAllParts(true));
  $("collapse-all-parts").addEventListener("click", () => setAllParts(false));
  $("part-toolbar").hidden = false;
  updatePartControls();
}
function openBadgeGuide(ev){
  if(ev) ev.preventDefault();
  const part = $("part-badges");
  if(part){
    part.open = true;
    savePartStates();
    updatePartControls();
    if(scout3dPanelViewer) scout3dPanelViewer.redraw();
    const target = $("badge-placement-guide") || part;
    if(target && typeof target.scrollIntoView === "function") target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderBadgesOverview(){
  const b = L().BADGES_OVERVIEW[currentSection];
  if(!b) return '';
  const t = UI();
  return `<div style="border:1px solid var(--line);border-left:4px solid ${b.color};border-radius:8px;padding:.8rem 1rem;background:#fafafa">
    <h3 style="margin:0 0 .3rem;font-size:1rem;color:${b.color}">${b.name} <span style="font-size:.75rem;color:#888;font-weight:400">(${b.age})</span></h3>
    ${b.scheme ? `<p style="margin:.1rem 0 .3rem;font-size:.74rem;color:var(--muted)">${b.scheme}</p>` : ""}
    <p style="margin:.2rem 0;font-size:.8rem"><strong>${t.badgeSystem}</strong>${b.type}</p>
    <details style="margin:.3rem 0"><summary style="font-size:.85rem;color:${b.color}">${t.promise}</summary><p style="font-size:.85rem;margin:.3rem 0;font-style:italic">${b.promise}</p></details>
    <details style="margin:.3rem 0"><summary style="font-size:.85rem;color:${b.color}">${t.law}</summary><p style="font-size:.85rem;margin:.3rem 0;font-style:italic">${b.law}</p></details>
    <details style="margin:.3rem 0"><summary style="font-size:.85rem;color:${b.color}">${t.badgesCount(b.badges.length)}</summary>
      <ul style="font-size:.85rem;line-height:1.7;margin:.3rem 0 0 1rem;padding:0">${b.badges.map(bg=>`<li><strong>${bg.name}</strong> — ${bg.desc}</li>`).join("")}</ul></details>
    <p style="font-size:.78rem;color:#666;margin:.4rem 0 0;border-top:1px dashed #ddd;padding-top:.3rem">${b.note}</p>
  </div>`;
}

function renderTransition(section){
  const data = L().TRANSITIONS[section];
  if(!data) return "";
  let html = `<div style="border-left:4px solid ${data.color};padding-left:1rem;margin-bottom:1rem"><h3 style="margin:0;color:${data.color}">${data.title}</h3></div>`;
  data.items.forEach(it=>{ html += `<details><summary>${it.q}</summary><p>${it.a}</p></details>`; });
  return html;
}
function updateTransition(){ $("transition-content").innerHTML = renderTransition(currentSection); }
function updateBadgesOverview(){ $("badges-overview").innerHTML = renderBadgesOverview(); }

// The membership illustration is hosted by the Scout Information Hub. Verified Scout award
// illustrations and user-supplied Venture/Rover references are shipped locally in tiny WebP files.
// Uploaded Cub AI recreations are explicitly labelled as illustrations, never official badge photos.
const BADGE_IMAGE_BASE = "https://scoutsinfohub.org.hk/ScoutTrainingScheme/img/Progressive/";
const BADGE_IMAGE_SOURCE = "https://scoutsinfohub.org.hk/scout-training-scheme#ts_tab_progressive";
// 2026 sectional schemes linked from the Association's official review page.
// PDF diagrams cannot be used as <img> without a separate image file; link to the original instead.
const BADGE_SCHEME_URLS = {
  grasshopper: "https://drive.google.com/file/d/14bhW8UQyBrm9mncJ-jXYZhM9GGA30c0D/view",
  cub: "https://drive.google.com/file/d/19StE5sobEUb8DOSkW0e57T0j784S6-R5/view",
  scout: "https://drive.google.com/file/d/1XiY7LiGD0eXOGMtjPhPV4qYKmTvWIcDx/view",
  venture: "https://drive.google.com/file/d/1F8aZSr_WzRbJCLy7l41iDO2tEUxpKCvE/view",
  rover: "https://drive.google.com/file/d/1MYSUEqMgIoDtaU_3od92A-2T2wTQXYZu/view"
};
const BADGE_REMOTE_IMAGES = {
  cub: { 0: "WorldScoutBadge.webp" },
  scout: { 0: "WorldScoutBadge.webp" },
  venture: { 0: "WorldScoutBadge.webp" },
  rover: { 0: "WorldScoutBadge.webp" }
};
// Indexes match BADGE_TIMELINES in both language packs; do not reuse a badge from another stage.
const BADGE_LOCAL_IMAGES = {
  cub: { 1: "assets/badges/cub-experience.webp", 2: "assets/badges/cub-adventure.webp", 3: "assets/badges/cub-advanced.webp", 4: "assets/badges/cub-golden.webp" },
  scout: { 1: "assets/badges/scout-pathfinder.webp", 2: "assets/badges/scout-standard.webp", 3: "assets/badges/scout-advanced.webp", 4: "assets/badges/scout-chief.webp" },
  venture: { 1: "assets/badges/venture-shoulder.webp", 2: "assets/badges/venture-award.webp", 3: "assets/badges/venture-dragon.webp" },
  rover: { 1: "assets/badges/rover-shoulder.webp", 2: "assets/badges/rover-award.webp", 3: "assets/badges/rover-baden.webp" }
};
function renderBadgeTimeline(){
  const items = L().BADGE_TIMELINES[currentSection];
  if(!items) return '';
  const t = UI();
  const sec = L().SECTIONS[currentSection];
  const localImages = BADGE_LOCAL_IMAGES[currentSection] || {};
  const remoteImages = BADGE_REMOTE_IMAGES[currentSection] || {};
  let html = `<h3 class="journey-title">${t.badgeJourney(sec.name)}</h3>
    <p class="cite">${t.badgeImageNote}${currentSection === "cub" ? ` ${t.badgeCubReference}` : ""}${currentSection === "venture" || currentSection === "rover" ? ` ${t.badgeUserReference}` : ""}</p>
    <ol class="badge-journey" aria-label="${t.badgeJourney(sec.name)}">`;
  items.forEach((item, idx) => {
    const localImage = localImages[idx];
    const remoteImage = remoteImages[idx];
    const image = localImage || (remoteImage ? BADGE_IMAGE_BASE + remoteImage : "");
    const needsSchemeCheck = !!localImage && currentSection !== "scout";
    const source = needsSchemeCheck || !image ? BADGE_SCHEME_URLS[currentSection] : BADGE_IMAGE_SOURCE;
    html += `<li class="journey-step" style="--step-color:${item.color}">
      <div class="journey-image">${image
        ? `<img src="${image}" alt="${item.name}${currentSection === "cub" && localImage ? `（${t.badgeIllustration}）` : ""}" width="88" height="88" loading="lazy" decoding="async" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="journey-placeholder" hidden>${t.badgeImageLoadFailed}</span>`
        : `<span class="journey-placeholder">${t.badgeImageUnavailable}</span>`}</div>
      <strong class="journey-name">${item.name}</strong>
      ${currentSection === "cub" && localImage ? `<span class="journey-kind">${t.badgeIllustration}</span>` : ""}
      <span class="journey-age">${item.age}</span>
      ${source ? `<a class="journey-source" href="${source}" target="_blank" rel="noopener noreferrer">${needsSchemeCheck || !image ? t.badgeSchemeSource : t.badgeImageSource}</a>` : ""}
    </li>`;
  });
  html += `</ol><details style="margin:.5rem 0"><summary style="font-size:.85rem;color:var(--scout-green)">${t.viewDetails}</summary><ul style="font-size:.85rem;line-height:1.7;margin:.3rem 0 0 1rem;padding:0">`;
  items.forEach(item => { html += `<li><strong>${item.name}</strong> — ${item.desc}</li>`; });
  html += `</ul></details>`;
  return html;
}

/* ===========================================================
   步驟 ② 控制列（模式 / 來源 / 海陸空 / 性別）
   =========================================================== */
function renderControls(){
  const t = UI(), loc = L();
  const sec = loc.SECTIONS[currentSection];
  const el = $("controls");
  if(!el) return;
  let html = "";

  if(currentSection === "grasshopper"){
    html += `<p class="cite">${t.grasshopperNoUniform}</p>`;
  } else {
    // 模式 / 來源
    const sources = sec.upgradeFrom || [];
    html += `<div class="mode-toggle" style="grid-template-columns:repeat(${sources.length + 1},1fr)">`;
    sources.forEach(src => {
      const active = currentMode === "upgrade" && currentFrom === src;
      const label = src === "grasshopper" ? t.sourceFromGrasshopper
        : t.sourceFrom(loc.SECTIONS[src].name, currentSection === "leader");
      const small = src === "grasshopper" ? t.sourceSmallGrasshopper : t.sourceSmallReuse;
      html += `<button class="mode-btn ${active ? "active" : ""}" onclick="setSource('${src}')">${label}<small>${small}</small></button>`;
    });
    html += `<button class="mode-btn ${currentMode === "new" ? "active" : ""}" onclick="setSource(null)">${t.newJoin}<small>${t.newJoinSmall}</small></button></div>`;

    // 來源類型（海陸空）
    if(currentMode === "upgrade" && currentFrom && loc.SECTIONS[currentFrom]?.hasBranch){
      html += `<div class="gender-toggle"><span>${t.fromBranchLabel}</span>${branchButtons("from")}</div>`;
    }
    // 目標類型
    if(sec.hasBranch){
      html += `<div class="gender-toggle"><span>${currentMode === "upgrade" ? t.toBranchLabelUpgrade : t.toBranchLabelNew}</span>${branchButtons("to")}</div>`;
      html += `<p class="cite" style="margin:-.3rem 0 .6rem">${t.branchHint}</p>`;
    }
  }
  // 性別
  html += `<div class="gender-toggle"><span>${t.genderLabel}</span>
    <button class="${currentGender === "male" ? "active" : ""}" onclick="setGender('male')">${t.male}</button>
    <button class="${currentGender === "female" ? "active" : ""}" onclick="setGender('female')">${t.female}</button></div>`;
  // 2026 新綱要：深資／樂行／領袖女團員可揀半截裙或長褲（二選一）。
  if(hasLowerBodyChoice(currentSection, currentBranch, currentGender)){
    html += `<div class="gender-toggle"><span>${t.lowerBodyLabel}</span>
      <button class="${currentBottom === "skirt" ? "active" : ""}" onclick="setBottom('skirt')">${t.lowerBodySkirt}</button>
      <button class="${currentBottom === "trousers" ? "active" : ""}" onclick="setBottom('trousers')">${t.lowerBodyTrousers}</button></div>
      <p class="cite" style="margin:-.3rem 0 .6rem">${t.lowerBodyHint}</p>`;
  }
  el.innerHTML = html;
}
function branchButtons(which){
  const cur = which === "from" ? currentFromBranch : currentBranch;
  const B = L().BRANCHES;
  return Object.keys(B).map(k => `<button class="${cur === k ? "active" : ""}" onclick="setBranch('${which}','${k}')">${B[k].icon} ${B[k].name}</button>`).join("");
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
function setBottom(v){ if(v === currentBottom) return; currentBottom = v; refresh(); }

/* ===========================================================
   支部選擇
   =========================================================== */
let sectionReady = false;
function selectSection(s){
  // 只有「真的轉支部」或首次載入才重設來源；切換語言重用同一支部時保留現況。
  const changed = !sectionReady || s !== currentSection;
  sectionReady = true;
  currentSection = s;
  const sec = L().SECTIONS[s];
  document.querySelectorAll('.path-step').forEach(el => {
    const active = el.dataset.section === s;
    el.classList.toggle('active', active);
    el.setAttribute('aria-pressed', String(active));
  });
  // 預設來源：第一個
  if(changed){
    if(s === "grasshopper"){ currentMode = "new"; currentFrom = null; }
    else if(currentMode === "upgrade" || currentFrom === null){
      currentMode = "upgrade"; currentFrom = sec.upgradeFrom[0];
    }
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

// 按「目標支部」及「性別」顯示／隱藏內容（data-show-for / data-hide-for / data-show-gender）
function applyVisibility(){
  document.querySelectorAll("[data-show-for],[data-hide-for],[data-show-gender]").forEach(el => {
    if(el.classList.contains("card") && el.hasAttribute("data-hide-for")) return;
    const f = el.getAttribute("data-show-for");
    const h = el.getAttribute("data-hide-for");
    const g = el.getAttribute("data-show-gender");
    const okF = !f || f.split(",").includes(currentSection);
    const okH = !h || !h.split(",").includes(currentSection);
    const okG = !g || g.split(",").includes(currentGender);
    el.style.display = (okF && okH && okG) ? "" : "none";
  });
  updatePartControls();
}
let scout3dPanelViewer = null;
let scout3dPreviewViewer = null;
let scout3dPreviewOpen = false;
let lastChecklist = [];

function scout3dContext(list){
  const t = UI(), loc = L();
  const sec = loc.SECTIONS[currentSection];
  const hasBranch = !!sec.hasBranch;
  const isLeader = currentSection === "leader";
  const hasBottom = hasLowerBodyChoice(currentSection, currentBranch, currentGender);
  const isTrousers = hasBottom && currentBottom === "trousers";
  const branchName = hasBranch ? loc.BRANCHES[currentBranch].name : "";
  const genderLabel = currentGender === "male"
    ? (isLeader ? t.genderLeaderMale : t.genderMemberMale)
    : (isLeader ? t.genderLeaderFemale : t.genderMemberFemale);
  const bottomText = hasBottom ? (isTrousers ? t.lowerBodyTrousers : t.lowerBodySkirt) : "";
  const presetParts = [sec.name];
  if (hasBranch) presetParts.push(branchName);
  presetParts.push(genderLabel);
  if (hasBottom) presetParts.push(bottomText);
  const presetLabel = presetParts.join(t.nameSep);
  const items = list || (lastChecklist.length ? lastChecklist : buildChecklist({
    section: currentSection, branch: currentBranch, gender: currentGender,
    mode: currentMode, fromSection: currentFrom, fromBranch: currentFromBranch,
    bottom: currentBottom
  }));
  const checklistMap = {};
  items.forEach(it => { checklistMap[it.id] = { title: it.title, status: it.status }; });
  const badges = (loc.SCOUT3D_BADGES && loc.SCOUT3D_BADGES[currentSection]) || [];
  const strings = {
    viewFront: t.scout3dViewFront,
    viewLeft: t.scout3dViewLeft,
    viewRight: t.scout3dViewRight,
    viewShoulders: t.scout3dViewShoulders,
    viewBack: t.scout3dViewBack,
    viewsAria: t.scout3dViewsAria,
    toggleBadges: t.scout3dToggleBadges,
    toggleTie: t.scout3dToggleTie,
    canvasAria: t.scout3dCanvasAria,
    zoomIn: t.scout3dZoomIn,
    zoomOut: t.scout3dZoomOut,
    zoomReset: t.scout3dZoomReset,
    zoomResetShort: t.scout3dZoomResetShort,
    dragHint: t.scout3dDragHint,
    badgesHeading: t.scout3dBadgesHeading,
    whereLabel: t.scout3dWhereLabel,
    sizeLabel: t.scout3dSizeLabel,
    emptyInspector: t.scout3dEmptyInspector,
    statusNeed: t.statusNeed,
    statusHave: t.statusHave,
    statusCheck: t.statusCheck,
    statusSep: LANG === "en" ? ": " : "：",
    dirFront: t.scout3dDirFront,
    dirBack: t.scout3dDirBack,
    dirWearerLeft: t.scout3dDirWearerLeft,
    dirWearerRight: t.scout3dDirWearerRight,
    disclaimer: t.scout3dDisclaimer
  };
  return { presetLabel, badges, strings, checklistMap };
}

function scout3dViewerOpts(ctx){
  return {
    section: currentSection,
    branch: currentBranch,
    gender: currentGender,
    bottom: currentBottom,
    mode: currentMode,
    lang: LANG,
    badges: ctx.badges,
    strings: ctx.strings,
    checklistMap: ctx.checklistMap
  };
}

function mountScout3dPreview(){
  const drawer = $("scout3d-preview-drawer");
  if(!drawer || typeof Scout3D === "undefined") return null;
  const stage = drawer.querySelector(".scout3d-stage");
  if(!stage) return null;
  const opts = scout3dViewerOpts(scout3dContext());
  if(scout3dPreviewViewer){
    scout3dPreviewViewer.update(opts);
    scout3dPreviewViewer.redraw();
  } else {
    scout3dPreviewViewer = Scout3D.createViewer(stage, opts);
  }
  return scout3dPreviewViewer;
}

function toggleScout3dPreview(){
  scout3dPreviewOpen = !scout3dPreviewOpen;
  const t = UI();
  const btn = document.querySelector("#preview .scout3d-preview-btn");
  const drawer = $("scout3d-preview-drawer");
  if(btn){
    btn.setAttribute("aria-expanded", String(scout3dPreviewOpen));
    btn.textContent = scout3dPreviewOpen ? t.scout3dToggleClose : t.scout3dToggleOpen;
  }
  if(drawer){
    drawer.hidden = !scout3dPreviewOpen;
    if(scout3dPreviewOpen) mountScout3dPreview();
  }
}

function focusScout3dBadge(badgeId){
  if(currentSection === "grasshopper"){
    if(!scout3dPreviewOpen) toggleScout3dPreview();
    else mountScout3dPreview();
    if(scout3dPreviewViewer && badgeId) scout3dPreviewViewer.focusBadge(badgeId);
    const drawer = $("scout3d-preview-drawer");
    if(drawer && typeof drawer.scrollIntoView === "function") drawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }
  const part = $("part-badges");
  if(part){
    part.open = true;
    savePartStates();
    updatePartControls();
  }
  if(scout3dPanelViewer){
    scout3dPanelViewer.redraw();
    if(badgeId) scout3dPanelViewer.focusBadge(badgeId);
  }
  if(scout3dPreviewOpen && scout3dPreviewViewer && badgeId){
    scout3dPreviewViewer.focusBadge(badgeId);
  }
  const target = $("scout3d-badge-panel") || part;
  if(target && typeof target.scrollIntoView === "function") target.scrollIntoView({ behavior: "smooth", block: "start" });
}

const SCOUT3D_REGIONS = (window.SCOUT3D_BADGE_DATA?.regions || []).filter(r => r.badge);
const SCOUT3D_DISTRICTS = SCOUT3D_REGIONS.flatMap(r => r.districts.map(d => ({...d, regionName:r.zh, regionBadge:r.badge.file})));
const selectedDistrict = () => SCOUT3D_DISTRICTS.find(d => d.id === selectedHKDistrict);
let selectedHKDistrict = localStorage.getItem("upgrade-hk-district") || "";

function renderScout3dPanel(){
  const el = $("scout3d-badge-panel");
  if(!el) return;
  const t = UI(), loc = L();
  const ctx = scout3dContext();
  const angles = (loc.SCOUT3D_MAP && loc.SCOUT3D_MAP[currentSection]) || [];
  if(!el.querySelector(".scout3d-stage")){
    el.innerHTML = `
      <div class="scout3d-panel-head">
        <h3></h3>
        <span class="scout3d-preset"></span>
      </div>
      <p class="scout3d-panel-lead"></p>
      <div class="scout3d-authentic-badges" aria-label="官方徽章圖樣"></div>
      <label class="scout3d-district-picker">所屬區會： <select aria-label="選擇所屬區會"><option value="">請選擇區會</option>${SCOUT3D_REGIONS.map(r => `<optgroup label="${escapeHtml(r.zh)}">${r.districts.map(d => `<option value="${escapeHtml(d.id)}">${escapeHtml(d.zh)}</option>`).join("")}</optgroup>`).join("")}</select><span class="scout3d-region-label" aria-live="polite"></span></label>
      <div class="scout3d-stage"></div>
      <div class="scout3d-angles"></div>`;
    const districtSelect = el.querySelector(".scout3d-district-picker select");
    districtSelect.value = selectedHKDistrict;
    districtSelect.addEventListener("change", () => {
      selectedHKDistrict = districtSelect.value;
      if(selectedHKDistrict) localStorage.setItem("upgrade-hk-district", selectedHKDistrict);
      else localStorage.removeItem("upgrade-hk-district");
      renderScout3dPanel();
    });
    el.querySelector(".scout3d-angles").addEventListener("click", (ev) => {
      const card = ev.target.closest("[data-focus-view]");
      if(!card || !scout3dPanelViewer) return;
      scout3dPanelViewer.setCamera(card.getAttribute("data-focus-view"));
      el.querySelectorAll(".scout3d-angle-card").forEach(c => c.classList.toggle("active", c === card));
    });
  }
  el.querySelector(".scout3d-panel-head h3").textContent = t.scout3dBoardTitle;
  el.querySelector(".scout3d-preset").textContent = ctx.presetLabel;
  el.querySelector(".scout3d-panel-lead").textContent = t.scout3dBoardLead;
  const districtPicker = el.querySelector(".scout3d-district-picker");
  if(districtPicker){
    districtPicker.hidden = currentSection === "grasshopper";
    const select = districtPicker.querySelector("select");
    select.value = selectedHKDistrict;
    const picked = selectedDistrict();
    districtPicker.querySelector(".scout3d-region-label").textContent = picked ? `已配對：${picked.regionName}・${picked.zh}` : "選擇所屬區，配對地域章與區章";
    const badgeStrip = el.querySelector(".scout3d-authentic-badges");
    badgeStrip.innerHTML = picked ? `<figure><img src="${picked.regionBadge}" alt="${escapeHtml(picked.regionName)}地域章"><figcaption>${escapeHtml(picked.regionName)}</figcaption></figure><figure><img src="${picked.file}" alt="${escapeHtml(picked.zh)}"><figcaption>${escapeHtml(picked.zh)}</figcaption></figure>` : "";
  }
  el.querySelector(".scout3d-angles").innerHTML = angles.map(a =>
    `<button type="button" class="scout3d-angle-card" data-focus-view="${escapeHtml(a.focusView || "front")}"><strong>${escapeHtml(a.view)}</strong><span>${escapeHtml(a.text)}</span></button>`
  ).join("");
  if(typeof Scout3D !== "undefined"){
    const opts = scout3dViewerOpts(ctx);
    if(Array.isArray(opts.badges)) opts.badges = opts.badges.map(b => ({...b,
      image: b.id === "membership" ? (currentSection === "grasshopper" ? "assets/scout3d_badges/grasshopper_membership.png" : "assets/scout3d_badges/world_membership.png") : b.id === "hongKong" ? "assets/scout3d_badges/hong_kong_badge.png" : b.image
    }));
    if(selectedHKDistrict && Array.isArray(opts.badges)){
      opts.badges = opts.badges.map(b => b.id === "region" ? {...b, name: `${selectedDistrict()?.regionName || "地域"}`, code: `${selectedDistrict()?.regionName || "地域"}`, image: selectedDistrict()?.regionBadge} : b.id === "district" ? {...b, name: `${selectedDistrict()?.zh || "區章"}`, code: selectedDistrict()?.zh || "區章", image: selectedDistrict()?.file} : b);
    }
    const stage = el.querySelector(".scout3d-stage");
    if(scout3dPanelViewer) scout3dPanelViewer.update(opts);
    else scout3dPanelViewer = Scout3D.createViewer(stage, opts);
  }
}

function refresh(){ renderControls(); applyVisibility(); render(); renderBudget(); renderOfficialPhoto(); renderScout3dPanel(); }

/* ===========================================================
   圖片：來源標示跟隨實際圖片；失敗時保留來源連結，不循環、不用空 src。
   =========================================================== */
function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));
}
function renderReferenceImage(images, className, thumbnail = false){
  const t = UI();
  const sources = images.filter((image, index) => image.src && images.findIndex(x => x.src === image.src) === index);
  const first = sources[0];
  const label = first?.label || t.imgNoRef;
  return `<figure class="reference-image ${className}" data-image-sources="${escapeHtml(JSON.stringify(sources))}" data-image-index="0"${thumbnail ? ' aria-hidden="true"' : ''}>
    ${first ? `<img src="${escapeHtml(first.src)}" alt="${thumbnail ? '' : escapeHtml(first.alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="handleImageError(this)">` : ''}
    <div class="image-unavailable"${first ? ' hidden' : ''}>${thumbnail ? t.imgUnavailableThumb : `<span>${t.imgUnavailable}</span><small>${t.imgUnavailableHint}</small>`}</div>
    ${thumbnail ? '' : `<figcaption class="cite image-caption">
      <span class="image-caption-label">${escapeHtml(label)}</span>
      <a class="image-source"${first?.sourceUrl ? ` href="${escapeHtml(first.sourceUrl)}"` : ' hidden'} target="_blank" rel="noopener">${escapeHtml(first?.sourceLabel)}</a>
      <span class="image-note"${first?.note ? '' : ' hidden'}>${escapeHtml(first?.note)}</span>
    </figcaption>`}
  </figure>`;
}
function updateImageCaption(frame, source, unavailable = false){
  const t = UI();
  const caption = frame.querySelector('.image-caption');
  if(!caption) return;
  caption.querySelector('.image-caption-label').textContent = unavailable ? t.imgUnavailable : source.label;
  const link = caption.querySelector('.image-source');
  link.hidden = !source.sourceUrl;
  if(source.sourceUrl){ link.href = source.sourceUrl; link.textContent = source.sourceLabel; }
  const note = caption.querySelector('.image-note');
  note.textContent = unavailable ? t.imgUnavailableNote : (source.note || "");
  note.hidden = !note.textContent;
}
function handleImageError(image){
  const frame = image.closest('.reference-image');
  if(!frame) return;
  const sources = JSON.parse(frame.dataset.imageSources);
  const nextIndex = Number(frame.dataset.imageIndex) + 1;
  const next = sources[nextIndex];
  if(next){
    frame.dataset.imageIndex = String(nextIndex);
    if(!frame.classList.contains('image-thumb')) image.alt = next.alt;
    updateImageCaption(frame, next);
    image.src = next.src;
    return;
  }
  // No trustworthy image remains. A neutral notice is better than an invented insignia.
  image.onerror = null;
  image.remove();
  frame.classList.add('is-unavailable');
  frame.querySelector('.image-unavailable').hidden = false;
  updateImageCaption(frame, sources[nextIndex - 1] || {}, true);
}

/* ===========================================================
   主渲染
   =========================================================== */
function contextKey(){ return `${currentSection}-${currentBranch}-${currentMode}-${currentFrom||"new"}-${currentFromBranch}-${currentGender}`; }

function render(){
  const t = UI(), loc = L();
  const sec = loc.SECTIONS[currentSection];
  const list = buildChecklist({
    section: currentSection, branch: currentBranch, gender: currentGender,
    mode: currentMode, fromSection: currentFrom, fromBranch: currentFromBranch,
    bottom: currentBottom
  });
  lastChecklist = list;

  const genderLabel = currentGender === "male" ? (currentSection === "leader" ? t.genderLeaderMale : t.genderMemberMale)
    : (currentSection === "leader" ? t.genderLeaderFemale : t.genderMemberFemale);
  const branchLabel = sec.hasBranch ? t.branchLabel(loc.BRANCHES[currentBranch].name) : "";
  const fromSec = currentFrom ? loc.SECTIONS[currentFrom] : null;
  const fromLabel = fromSec ? t.fromLabel(fromSec.name, fromSec.hasBranch ? loc.BRANCHES[currentFromBranch].short : "") : "";
  const modeLabel = currentMode === "upgrade" ? t.modeUpgrade(fromLabel, currentSection === "leader") : t.modeNew;

  // 預覽
  const photo = officialPhoto(currentSection, currentBranch, currentGender);
  let imgHtml;
  if(currentSection === "grasshopper"){
    imgHtml = `<div class="placeholder" style="background:#fff3e3;border-color:#ff7a1a">🧒</div>`;
  } else {
    imgHtml = renderReferenceImage(photo?.images || [], "uniform-preview");
  }
  if(scout3dPreviewViewer){
    scout3dPreviewViewer.destroy();
    scout3dPreviewViewer = null;
  }
  $("preview").innerHTML = `<div class="preview">${imgHtml}
    <div class="info">
      <h3>${sec.name}${branchLabel} · ${genderLabel}</h3>
      <p><strong>${modeLabel}</strong></p>
      <p>${t.sectionAge}${sec.age}</p>
      ${sec.note ? `<p style="font-size:.88rem;color:var(--scout-olive)">${sec.note}</p>` : ""}
      <div class="scout3d-preview-box">
        <button type="button" class="scout3d-preview-btn" aria-expanded="${scout3dPreviewOpen}" aria-controls="scout3d-preview-drawer" onclick="toggleScout3dPreview()">${escapeHtml(scout3dPreviewOpen ? t.scout3dToggleClose : t.scout3dToggleOpen)}</button>
        <p class="cite" style="margin:.35rem 0 0">${escapeHtml(t.scout3dPreviewNote)}</p>
      </div>
    </div>
    <div id="scout3d-preview-drawer" class="scout3d-preview-drawer"${scout3dPreviewOpen ? "" : " hidden"}><div class="scout3d-stage"></div></div>
  </div>`;
  if(scout3dPreviewOpen) mountScout3dPreview();

  // 統計
  const needCount = list.filter(i=>i.status==="need").length;
  const haveCount = list.filter(i=>i.status==="have").length;
  const checkCount = list.filter(i=>i.status==="check").length;
  const ownedCount = list.filter(i=>isOwned(`${contextKey()}-${i.id}`)).length;
  $("summary").innerHTML = `
    <div class="summary">
      <div class="need">${t.statusNeed}<br><strong style="font-size:1.4rem">${needCount}</strong>${t.countUnit}</div>
      <div class="have">${t.statusHave}<br><strong style="font-size:1.4rem">${haveCount}</strong>${t.countUnit}</div>
      <div class="check">${t.statusCheck}<br><strong style="font-size:1.4rem">${checkCount}</strong>${t.countUnit}</div>
    </div>
    ${ownedCount > 0 ? `<div class="owned-bar">
      <span>${t.ownedSummary(ownedCount, list.length)}</span>
      <button type="button" class="reset-marks-btn" onclick="resetAllMarks()">${t.resetMarks}</button></div>` : ''}`;

  const statusLabel = { need: t.statusNeed, have: t.statusHave, check: t.statusCheck };
  const listHTML = list.map(it => {
    const ownedKey = `${contextKey()}-${it.id}`;
    const owned = isOwned(ownedKey);
    const iconHtml = renderReferenceImage(itemImageSources(it, true), "image-thumb", true);
    const bigImg = renderReferenceImage(itemImageSources(it), "item-fig");
    return `
      <div class="item ${it.status}${owned ? ' owned' : ''}" data-item-id="${it.id}">
        <div class="item-row item-main" onclick="toggleItem(this.parentElement)">
          <div class="item-left">
            <div class="item-icon">${iconHtml}</div>
            <div style="min-width:0;flex:1"><div class="item-title">${it.title}</div><div class="item-desc">${it.desc}</div></div>
          </div>
          <div class="item-right"><div class="status">${statusLabel[it.status]}</div><div class="arrow" aria-hidden="true">›</div></div>
        </div>
        <div class="item-row item-actions">
          <button type="button" class="owned-btn${owned ? ' is-owned' : ''}" onclick="event.stopPropagation();toggleOwned('${ownedKey}');render()">${owned ? t.markOwned : t.markOwnedNone}</button>
          <span class="owned-hint">${owned ? t.ownedHint : t.ownedHintNone}</span>
        </div>
        <div class="item-detail"><div class="item-detail-inner">
          ${bigImg}
          ${it.detail || ""}
        </div></div>
      </div>`;
  }).join("");

  $("checklist").innerHTML = `
    <div class="checklist-title"><span class="badge" data-section="${currentSection}">${sec.name}</span><span>${t.checklistTitle(modeLabel, branchLabel, genderLabel, list.length)}</span></div>
    ${listHTML}
    <div class="note">${t.checklistNote}</div>`;
}

function toggleItem(el){
  const parent = el.parentElement || el;
  parent.querySelectorAll('.item.expanded').forEach(item => { if (item !== el) item.classList.remove('expanded'); });
  el.classList.toggle('expanded');
}
function resetAllMarks(){
  if(!confirm(UI().resetConfirm)) return;
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
  const s = L().SHOP[id];
  if(s && s.price != null){
    const extra = (s.extra || []).reduce((t,x) => t + (x.price || 0), 0);
    return { lo: s.price + extra, hi: s.price + extra, official: true };
  }
  const p = PRICE_APPROX[id] || [0,0];
  return { lo: p[0], hi: p[1], official: false };
}
function renderBudget(){
  const t = UI();
  const el = $("budget-dynamic");
  if(!el) return;
  if(currentSection === "grasshopper"){
    el.innerHTML = `<p style="margin:0">${t.budgetGrasshopper}</p>`;
    return;
  }
  const list = buildChecklist({ section: currentSection, branch: currentBranch, gender: currentGender, mode: currentMode, fromSection: currentFrom, fromBranch: currentFromBranch, bottom: currentBottom });
  const need = list.filter(i => i.status !== "have");
  // 可選項目（例：典禮儀式的領呔）照列，但不計入合計。
  const hasOptional = need.some(i => i.optional);
  let lo = 0, hi = 0;
  const rows = need.map(i => {
    const p = itemPrice(i.id);
    if(!i.optional){ lo += p.lo; hi += p.hi; }
    const known = p.official ? t.priceOfficial(p.lo) : t.priceApprox(p.lo, p.hi);
    const txt = i.optional ? t.priceOptional(known)
      : i.id === "capbadge-cub" ? t.priceIncluded : i.status === "check" ? t.priceDependsGroup : known;
    const src = p.official && i.shop ? ` <a class="cite" href="${i.shop.url}" target="_blank" rel="noopener">${t.shopCodeLink(i.shop.code)}</a>` : "";
    return `<tr><td>${i.title}</td><td>${txt}${src}</td></tr>`; }).join("");
  el.innerHTML = `<p style="margin:0 0 .6rem">${t.budgetHead(currentMode === "upgrade" ? t.budgetModeUpgrade : t.budgetModeNew)}</p>
    <table class="size-table"><thead><tr><th>${t.budgetColItem}</th><th>${t.budgetColPrice}</th></tr></thead><tbody>${rows}</tbody>
    <tfoot><tr><th>${t.budgetTotal}</th><th>${t.priceApprox(lo, hi)}</th></tr></tfoot></table>
    ${hasOptional ? `<p class="cite">${t.budgetOptionalNote}</p>` : ""}
    <p class="cite">${t.budgetFootNote}</p>`;
}

/* 官方整套制服參考圖（不是實物照片） */
function renderOfficialPhoto(){
  const el = $("official-photo-box");
  if(!el) return;
  if(currentSection === "grasshopper"){ el.innerHTML = ""; return; }
  const t = UI(), loc = L();
  const photo = officialPhoto(currentSection, currentBranch, currentGender);
  const secName = loc.SECTIONS[currentSection].name + (loc.SECTIONS[currentSection].hasBranch ? t.nameSep + loc.BRANCHES[currentBranch].name : "");
  el.innerHTML = `<div class="note"><strong style="display:block;margin-bottom:.4rem">${t.officialRefTitle(secName)}</strong>
    ${renderReferenceImage(photo?.images || [], "uniform-full")}</div>`;
}

// 初始化
document.querySelectorAll(".path-step").forEach(el => {
  el.addEventListener("keydown", (ev) => {
    if(ev.key === "Enter" || ev.key === " "){
      ev.preventDefault();
      selectSection(el.dataset.section);
    }
  });
});
LANG = detectDefaultLang();
renderStaticText();
selectSection("cub");
initParts();
bindLangBtn();
