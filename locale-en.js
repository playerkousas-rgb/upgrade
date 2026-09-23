/* ===========================================================
   童軍準備指南 — English locale (locale-en.js)
   Scout Uniform Preparation Guide — English data pack
   掛到 LOCALES.en（檔案最底）。
   IMG_TEXT.en 必須先設好：ITEM_REFERENCES 在建立時就會用到。
   =========================================================== */

IMG_TEXT.en = {
  handbookLabel: "Official handbook reference (local)",
  handbookSource: (page) => `Handbook p.${page} ↗`,
  cropLabel: "Official uniform chart detail (local)",
  cropSource: "Association uniform page ↗"
};

const LOCALE_EN = {

  htmlLang: "en",
  langLabel: "English",
  switchToLabel: "中文",

  APP: {
    name: "Scout Uniform Guide",
    shortName: "Scout Uniform",
    tagline: "From Grasshopper to Leader — everything parents need at a glance",
    description: "Scout Uniform Guide — uniform preparation for joining and moving up through every Section from Grasshopper Scout to Leader, plus badge placement and transition notes.",
    appleTitle: "Scout Uniform Guide",
    logoAlt: "Scout Uniform Guide logo"
  },

  /* ── Sections ── */
  SECTIONS: {
    grasshopper: { name: "Grasshopper Scout", nameEn: "Grasshopper Scout", age: "4–7 years", color: "#ff7a1a",
      note: "Grasshopper Scouts only wear a neckerchief and simple, tidy meeting dress; a Group may also arrange its own uniform dress — the Group’s arrangement prevails.",
      upgradeFrom: [], upgradeTo: "cub", hasBranch: false },
    cub:     { name: "Cub Scout",     nameEn: "Cub Scout",     age: "6–11 years",   color: "#5a8f3a", upgradeFrom: ["grasshopper"], upgradeTo: "scout",   hasBranch: false },
    scout:   { name: "Scout",         nameEn: "Scout",         age: "11–15 years",  color: "#0a5c36", upgradeFrom: ["cub"],         upgradeTo: "venture", hasBranch: true },
    venture: { name: "Venture Scout", nameEn: "Venture Scout", age: "15–20 years",  color: "#7a1f2b", upgradeFrom: ["scout"],       upgradeTo: "rover",   hasBranch: true },
    rover:   { name: "Rover Scout",   nameEn: "Rover Scout",   age: "18–25 years",  color: "#0a3a5c", upgradeFrom: ["venture"],     upgradeTo: "leader",  hasBranch: true },
    // Leaders come from 3 routes: promoted from Venture / from Rover / joining fresh
    leader:  { name: "Leader",        nameEn: "Leader",        age: "Adult member", color: "#3a3a3a", upgradeFrom: ["venture","rover"], upgradeTo: null, hasBranch: true }
  },

  /* ── Land / Sea / Air ── */
  BRANCHES: {
    land: { name: "Land", short: "Land", icon: "🌲", desc: "Most common (green)" },
    sea:  { name: "Sea",  short: "Sea",  icon: "⚓", desc: "White shirt, navy trousers" },
    air:  { name: "Air",  short: "Air",  icon: "✈️", desc: "Light blue shirt, grey-blue beret" }
  },

  /* ── Uniform items ── */
  ITEMS: {
    /* ── Headwear ── */
    "cap-cub-m": { title:"Dark green peaked cap with yellow band", desc:"Cub Scout (boys) — cap badge included", icon:"🧢", buy:"supply",
      detail:`<h4>Cub Scout cap (boys)</h4><p><strong>Official specification:</strong> dark green peaked cap with a yellow band (cap badge included).</p>
        <ul><li>Worn squarely on the head with the peak to the front</li><li>The cloth badge on the crown faces <strong>directly forward</strong></li></ul>` },
    "cap-cub-f": { title:"Dark green round-brimmed hat", desc:"Cub Scout (girls) — cap badge included", icon:"👒", buy:"supply",
      detail:`<h4>Cub Scout hat (girls)</h4><p><strong>Official specification:</strong> dark green, round, brimmed hat (cap badge included).</p>
        <ul><li>The cloth badge on the crown faces <strong>directly forward</strong></li></ul>` },
    "beret-green": { title:"Dark green beret", desc:"Scout / Rover Scout / Leader (Land)", icon:"🧢", buy:"supply",
      detail:`<h4>Dark green beret</h4><p>Scouts, Rover Scouts and Land Scout Leaders all wear the same <strong>dark green beret</strong>; only the cap badge differs.</p>
        <ul><li>Pulled to the right and shaped close to the head</li><li>The small tail at the back is tucked inside — never worn like a chef’s hat</li><li>Wet it and shape it before first use</li><li>The cap badge sits <strong>directly above the left eye</strong></li></ul>` },
    "beret-maroon": { title:"Maroon beret", desc:"Venture Scout (Land)", icon:"🧢", img:"assets/items/beret-maroon.avif", buy:"supply",
      detail:`<h4>Maroon beret</h4><p><strong>Official specification:</strong> maroon beret (with the Scout cap badge). Used by Venture Scouts (Land) only.</p>
        <div class="tip">The badge is the <strong>Scout cap badge</strong> (same as the Scout Section), so when you move up you can transfer the badge to the new beret.</div>` },
    "beret-greyblue": { title:"Grey-blue beret", desc:"Air Scout / Air Scout Leader", icon:"🧢", buy:"supply",
      detail:`<h4>Grey-blue beret</h4><p>Air Scouts, Venture Air Scouts, Rover Air Scouts and Air Scout Leaders all wear the grey-blue beret (youth members with the Scout cap badge; Leaders with their rank cap badge).</p>` },
    "cap-sea-scout": { title:"Sea Scout white-top cap (with Sea Scout cap band)", desc:"Scout Section · Sea Scout", icon:"⚓", img:"assets/items/cap-sea-scout.avif", buy:"supply",
      detail:`<h4>Sea Scout white-top cap</h4><p><strong>Official specification:</strong> Sea Scout white-top cap (with the Sea Scout cap band). The same cap is worn by boys and girls in the Scout Section.</p>
        <div class="warn">On moving up to Venture Sea Scout you change to the <strong>Sea Scout leader white-top cap</strong> (a different model) — it cannot be carried over.</div>` },
    "cap-sea-leader-m": { title:"Sea Scout white-top cap (male Leaders)", desc:"Venture / Rover / Leader · Sea (male)", icon:"⚓", img:"assets/items/cap-sea-leader-m.avif", buy:"supply",
      detail:`<h4>Sea Scout white-top cap (male Leaders)</h4><p>Venture Sea Scouts, Rover Sea Scouts and male Sea Scout Leaders all wear this cap, with the Venture / Rover Sea Scout cap badge for youth members and the Sea Scout leader cap badge for adult Leaders.</p>` },
    "cap-sea-leader-f": { title:"Sea Scout white-top cap (female Leaders)", desc:"Venture / Rover / Leader · Sea (female)", icon:"⚓", img:"assets/items/cap-sea-leader-f.avif", buy:"supply",
      detail:`<h4>Sea Scout white-top cap (female Leaders)</h4><p>Venture Sea Scouts, Rover Sea Scouts and female Sea Scout Leaders all wear this cap; only the cap badge differs.</p>` },
    "hat-leader-f": { title:"Dark green peaked hat with gold braid", desc:"Female adult members (Land)", icon:"👒", img:"assets/items/hat-leader-f.avif", buy:"supply",
      detail:`<h4>Dark green peaked hat with gold braid</h4><p><strong>Official specification:</strong> dark green peaked hat with gold braid (with the rank cap badge). Worn with the female Leader’s ordinary uniform (No. 3), tie uniform (No. 4) and ceremonial dress (No. 1).</p>
        <div class="tip">With the female Leader’s trouser uniform (No. 6) the <strong>dark green beret</strong> is worn instead.</div>` },

    /* ── Cap badges ── */
    "capbadge-cub": { title:"Cub Scout cap badge", desc:"Cloth badge already sewn onto the cap — no separate purchase", icon:"🎖️", buy:"included",
      detail:`<h4>Cub Scout cap badge</h4><p>Page 98 of the <em>Uniform Handbook</em> states that the Cub Scout cap badge is a <strong>cloth badge already sewn onto the crown</strong>, worn facing forward — it is not a separate metal badge.</p>
        <div class="tip">The Scout Shop’s “Cub Scout cap, boys / girls” (codes 01171 / 01172, HK$50) is sold <strong>with the badge already attached</strong>, so there is no need to buy one separately. If the cloth badge is damaged, ask your Group or the Scout Shop.</div>` },
    "capbadge-scout": { title:"Scout cap badge", desc:"Shared by Scout / Venture / Rover", icon:"🎖️", buy:"supply",
      detail:`<h4>Scout cap badge</h4><p>According to the Association website, the berets of Scouts, Venture Scouts (Land / Air) and Rover Scouts (Land / Air) all come <strong>with the Scout cap badge</strong>.</p>
        <div class="tip">In other words: moving from Scout to Venture, or Venture to Rover, <strong>the cap badge can be carried over</strong> — only the beret changes.</div>` },
    "capbadge-venture-sea": { title:"Venture Sea Scout cap badge", desc:"Same design for Venture & Rover Sea Scouts (official handbook)", icon:"🎖️", buy:"supply",
      detail:`<h4>Venture Sea Scout cap badge</h4><p>Page 102 of the official handbook lists the <strong>Venture and Rover Sea Scout cap badges as the same design</strong>, worn at the front of the white-top cap between the white crown and the black band.</p>` },
    "capbadge-rover-sea": { title:"Rover Sea Scout cap badge", desc:"Same design for Venture & Rover Sea Scouts (official handbook)", icon:"🎖️", buy:"supply",
      detail:`<h4>Rover Sea Scout cap badge</h4><p>Page 102 of the official handbook lists the <strong>Venture and Rover Sea Scout cap badges as the same design</strong>; it can be carried over from Venture Sea Scout — check current practice with your Group before moving up.</p>` },
    "capbadge-rank": { title:"Rank cap badge", desc:"Leaders (Land / Air)", icon:"🎖️", buy:"check",
      detail:`<h4>Rank cap badge</h4><p>Leaders wear a <strong>rank cap badge</strong> on the beret or peaked hat; the design depends on the rank to which you are appointed.</p>
        <div class="warn">After appointment, ask your Group / District which one you should buy.</div>` },
    "capbadge-sea-leader": { title:"Sea Scout Leader cap badge", desc:"Sea Scout Leaders", icon:"🎖️", buy:"check",
      detail:`<h4>Sea Scout Leader cap badge</h4><p>Fitted to the Sea Scout male / female Leader white-top cap. Ask your Group after you are appointed.</p>` },

    /* ── Shirts ── */
    "shirt-beige": { title:"Beige short-sleeve shirt", desc:"Two breast pockets, no pleats, shoulder straps", icon:"👕", img:"assets/items/shirt-beige.avif", buy:"supply",
      detail:`<h4>Beige shirt</h4><p><strong>Official specification:</strong> beige, short sleeve, two breast pockets, no pleats, shoulder straps. The same model is worn from Cub Scout all the way to Leader (Land).</p>
        <ul><li>Must be tucked into trousers / skirt</li><li>The top button is fastened when a neckerchief is worn</li><li>Buy one size larger — young people grow fast</li></ul>` },
    "shirt-white": { title:"White short-sleeve shirt", desc:"Sea Scout · two breast pockets, no pleats, shoulder straps", icon:"👕", img:"assets/items/shirt-white.svg", buy:"supply",
      detail:`<h4>White shirt (Sea Scout)</h4><p><strong>Official specification:</strong> white, short sleeve, two breast pockets, no pleats, shoulder straps. The same model is worn by Sea Scouts, Venture Sea Scouts, Rover Sea Scouts and Sea Scout Leaders.</p>` },
    "shirt-lightblue": { title:"Light blue short-sleeve shirt", desc:"Air Scout · two breast pockets, no pleats, shoulder straps", icon:"👕", img:"assets/items/shirt-lightblue.svg", buy:"supply",
      detail:`<h4>Light blue shirt (Air Scout)</h4><p><strong>Official specification:</strong> light blue, short sleeve, two breast pockets, no pleats, shoulder straps. The same model is worn by Air Scouts, Venture Air Scouts, Rover Air Scouts and Air Scout Leaders.</p>` },

    /* ── Lower garment ── */
    "shorts-olive": { title:"Olive green shorts", desc:"Two side pockets, two hip pockets, pleated", icon:"🩳", img:"assets/items/shorts-olive.svg", buy:"supply",
      detail:`<h4>Olive green shorts</h4><p><strong>Official specification:</strong> olive green, two side pockets, two hip pockets, pleated. For Cub Scouts and Scouts (Land) (boys).</p><ul><li>Worn at the waist with the brown belt</li></ul>` },
    "shorts-navy": { title:"Navy blue shorts", desc:"Sea / Air Scout (boys)", icon:"🩳", img:"assets/items/shorts-navy.svg", buy:"supply",
      detail:`<h4>Navy blue shorts</h4><p><strong>Official specification:</strong> navy blue, two side pockets, two hip pockets, pleated. For Sea Scouts and Air Scouts (boys).</p>` },
    "culottes-olive": { title:"Olive green culottes", desc:"Side pockets, inverted pleats", icon:"👗", img:"assets/items/culottes-olive.svg", buy:"supply",
      detail:`<h4>Olive green culottes</h4><p><strong>Official specification:</strong> olive green, side pockets, inverted pleats. For Cub Scouts and Scouts (Land) (girls).</p>` },
    "culottes-navy": { title:"Navy blue culottes", desc:"Sea / Air Scout (girls)", icon:"👗", img:"assets/items/culottes-navy.svg", buy:"supply",
      detail:`<h4>Navy blue culottes</h4><p><strong>Official specification:</strong> navy blue, side pockets, inverted pleats. For Sea Scouts and Air Scouts (girls).</p>` },
    "trousers-olive": { title:"Olive green trousers", desc:"Two side pockets, two hip pockets, pleated", icon:"👖", img:"assets/items/trousers-olive.svg", buy:"supply",
      detail:`<h4>Olive green trousers</h4><p><strong>Official specification:</strong> olive green, two side pockets, two hip pockets, pleated. For male Venture Scouts, Rover Scouts and Leaders (Land); also used with the female Leader’s trouser uniform (No. 6).</p>` },
    "trousers-navy": { title:"Navy blue trousers", desc:"Sea / Air · Venture / Rover / Leader", icon:"👖", img:"assets/items/trousers-navy.svg", buy:"supply",
      detail:`<h4>Navy blue trousers</h4><p><strong>Official specification:</strong> navy blue, two side pockets, two hip pockets, pleated. For male Venture / Rover Sea and Air Scouts and male Sea / Air Scout Leaders.</p>` },
    "skirt-olive": { title:"Olive green skirt", desc:"Side pockets, no pleats, knee length", icon:"👗", img:"assets/items/skirt-olive.svg", buy:"supply",
      detail:`<h4>Olive green skirt</h4><p><strong>Official specification:</strong> olive green, side pockets, no pleats, knee length. For female Venture Scouts, Rover Scouts and Leaders (Land).</p>` },
    "skirt-navy": { title:"Navy blue skirt", desc:"Sea / Air · Venture / Rover / Leader", icon:"👗", img:"assets/items/skirt-navy.svg", buy:"supply",
      detail:`<h4>Navy blue skirt</h4><p><strong>Official specification:</strong> navy blue, side pockets, no pleats, knee length. For female Venture / Rover Sea and Air Scouts and female Sea / Air Scout Leaders.</p>` },

    /* ── Belt ── */
    "belt": { title:"Brown belt (with Scout emblem buckle)", desc:"Same model in every Section", icon:"👔", buy:"supply",
      detail:`<h4>Brown belt</h4><p><strong>Official specification:</strong> brown (with the Scout emblem buckle). The same model is used from Cub Scout to Leader and across Land, Sea and Air — one belt lasts throughout.</p><ul><li>The buckle sits at the centre</li><li>No extra key rings or charms</li></ul>` },

    /* ── Socks ── */
    "socks-long-olive": { title:"Dark olive green long socks", desc:"Cub Scout / Scout (Land)", icon:"🧦", img:"assets/items/socks-long-olive.svg", buy:"supply",
      detail:`<h4>Dark olive green long socks</h4><p>Pulled up below the knee and turned down about 3 cm to form a cuff. Sports shorts socks or invisible socks are not allowed.</p>` },
    "socks-long-navy": { title:"Navy blue long socks", desc:"Sea / Air Scout", icon:"🧦", img:"assets/items/socks-long-navy.svg", buy:"supply",
      detail:`<h4>Navy blue long socks</h4><p>Sea Scouts and Air Scouts (Scout Section) wear navy blue long socks.</p>` },
    "socks-short-black": { title:"Black short socks", desc:"Venture / Rover / Leader (male)", icon:"🧦", img:"assets/items/socks-short-black.svg", buy:"any",
      detail:`<h4>Black short socks</h4><p><strong>Official specification:</strong> black, short socks. Worn with trousers. Ordinary black short socks are fine — they do not have to come from the Scout Shop.</p>` },
    "pantyhose": { title:"Flesh-coloured nylon pantyhose", desc:"Venture / Rover / Leader (female)", icon:"🧦", img:"assets/items/pantyhose.svg", buy:"any",
      detail:`<h4>Flesh-coloured nylon pantyhose</h4><p><strong>Official specification:</strong> flesh-coloured, nylon, plain, pantyhose. Buy them at any hosiery shop.</p>` },

    /* ── Shoes ── */
    "shoes-lace": { title:"Black plain lace-up leather shoes", desc:"Males in all Sections; Cub & Scout girls", icon:"👞", img:"assets/items/shoes-lace.svg", buy:"any",
      detail:`<h4>Black lace-up leather shoes</h4><p><strong>Official specification:</strong> black, plain, lace-up. School shoes that meet the specification may be used. Polish them before every meeting.</p>` },
    "shoes-heel": { title:"Black plain mid-heel court shoes", desc:"Venture / Rover / Leader (female)", icon:"👠", img:"assets/items/shoes-heel.svg", buy:"any",
      detail:`<h4>Black plain mid-heel court shoes</h4><p><strong>Official specification:</strong> black, plain, no laces, mid heel. Buy them at any shoe shop.</p>
        <div class="warn">Girls moving up from Scout to Venture: lace-up shoes are <strong>no longer acceptable</strong> — they must be replaced with court shoes.</div>` },

    /* ── Neckerchief / woggle ── */
    "scarf": { title:"Group scarf", desc:"Issued by the Group", icon:"🧣", img:"assets/items/scarf.svg", buy:"group",
      detail:`<h4>Group scarf</h4><p>The Group scarf represents your Group and is normally <strong>presented by the Group after your investiture / membership badge assessment</strong>. It can be carried over if you move up within the same Group.</p>
        <ul><li>Worn outside the shirt collar</li><li>The woggle sits at the throat — never lower</li></ul>` },
    "woggle-cub": { title:"Colour woggle (Cub Scout)", desc:"Official: Group scarf (with a colour woggle)", icon:"⭕", img:"assets/items/woggle-cub.svg", buy:"check",
      detail:`<h4>Cub Scout colour woggle</h4><p>The Association website lists the Cub Scout uniform as “Group scarf (with a <strong>colour woggle</strong>)”; the colour stands for your Six and is arranged by the Group.</p>` },
    "woggle-scout": { title:"Scout woggle", desc:"Shared by Scout / Venture / Rover / Leader", icon:"⭕", buy:"supply",
      detail:`<h4>Scout woggle</h4><p>The Association website lists “Group scarf (with the <strong>Scout woggle</strong>)” for every Section from Scout to Leader, so it can be carried over when you move up.</p>
        <div class="tip">The Scout Section also has a “patrol activity woggle”, which may only be bought on production of the Scout Standard Award certificate or above.</div>` },

    /* ── Badges ── */
    "badges-youth": { title:"Basic badges", desc:"World Scout Membership Badge, Hong Kong Badge, Region, District and Group badges", icon:"🎖️", buy:"mixed",
      detail:`<h4>Basic badges (youth Sections)</h4><p>The Association website lists the basic badges from Cub Scout to Rover Scout as: <strong>World Scout Membership Badge, Hong Kong Badge, Region badge, District badge and Group badge</strong>.</p>
        <ul>
          <li>World Scout Membership Badge: centre of the left breast pocket (<strong>after investiture only</strong>)</li>
          <li>Hong Kong Badge: above the left breast pocket</li>
          <li>Group, District and Region badges: right sleeve (top to bottom)</li>
        </ul>
        <p>The Membership Badge and Hong Kong Badge are bought at the Scout Shop; Region, District and Group badges are usually bought or presented through the Group. Badges in good condition can be carried over when moving up (same Group, same District).</p>
        <div class="tip">They must be sewn on with thread — no glue and no safety pins.</div>` },
    "patrol-badge": { title:"Patrol badge", desc:"Scout Section · issued by the Group / sold at the Scout Shop", icon:"🐾", buy:"group-or-supply",
      detail:`<h4>Patrol badge</h4><p>Only the <strong>Scout Section</strong> has patrol badges (the Association’s Scout uniform badge list includes the patrol badge; Venture and Rover do not).</p>
        <p>According to the appendix of the Scout Training Scheme, patrol badges are sold at the Scout Shop and no documents need to be produced; some Groups also present them directly. Worn on the <strong>right sleeve</strong>.</p>` },
    "badges-leader": { title:"Basic badges (Leaders)", desc:"Membership Badge, Hong Kong Badge, Hong Kong shoulder badge / Group badge, HQ / Region / District badge", icon:"🎖️", buy:"mixed",
      detail:`<h4>Basic badges (Leader’s ordinary uniform)</h4><p>The Association website lists the badges for the Leader’s ordinary uniform (No. 3) as: <strong>World Scout Membership Badge, Hong Kong Badge, Hong Kong shoulder badge / Group badge, HQ / Region / District badge and rank epaulettes</strong>.</p>
        <p>Moving up from a youth Section: the World Scout Membership Badge and Hong Kong Badge can be carried over; the Group / District / Region badge depends on your service unit — check with your Group.</p>
        <div class="tip">Holders of the Dragon Scout Award / Baden-Powell Award may wear the corresponding <strong>Leader’s insignia</strong> for life after becoming a Leader.</div>` },
    "epaulette-rank": { title:"Rank epaulettes", desc:"Leaders · depends on the rank appointed", icon:"🎗️", buy:"check",
      detail:`<h4>Rank epaulettes</h4><p>Worn on both shoulder straps; the design depends on the rank to which you are appointed (Probationary Leader / Assistant Leader / Leader / Commissioner and so on). Ask your Group which ones to buy after appointment.</p>` }
  },

  /* ── Scout Shop (hkscoutshop.org.hk) product names ── */
  SHOP: {
    /* Headwear */
    "cap-cub-m":        { id:377,  n:1, code:"01171", name:"Cub Scout cap (boys)", price:50 },
    "cap-cub-f":        { id:378,  n:1, code:"01172", name:"Cub Scout cap (girls)", price:50 },
    "beret-green":      { id:3532, n:0, code:"01181", name:"Dark green beret (oval)", price:80, alt:[{id:322,n:0,name:"Dark green beret"}] },
    "beret-maroon":     { id:313,  n:0, code:"01019", name:"Venture Scout maroon beret", price:85, alt:[{id:3533,n:0,code:"01182",name:"Venture Scout maroon beret (oval)",price:85}] },
    "beret-greyblue":   { id:316,  n:0, code:"01024", name:"Air Scout grey-blue beret", price:85, alt:[{id:3534,n:0,code:"01183",name:"Air Scout grey-blue beret (oval)",price:85}] },
    "cap-sea-scout":    { id:317,  n:0, code:"1025",  name:"Sea Scout white-top cap", price:259, extra:[{id:1843,n:0,code:"01033",name:"Sea Scout cap band",price:12}] },
    "cap-sea-leader-m": { id:318,  n:1, code:"1026",  name:"Sea Scout white-top cap (male Leaders)", price:415 },
    "cap-sea-leader-f": { id:319,  n:1, code:"1027",  name:"Sea Scout white-top cap (female Leaders)", price:289 },
    "hat-leader-f":     { id:3086, n:0, code:"01136", name:"Green female Leader’s dress hat", price:239 },
    /* Cap badges */
    "capbadge-scout":       { id:314,  n:0, code:"01020", name:"Scout cap badge", price:9 },
    "capbadge-venture-sea": { id:1845, n:0, code:"1035",  name:"Venture Sea Scout cap badge", price:6 },
    "capbadge-sea-leader":  { id:1844, n:0, code:"01034", name:"Sea Scout Leader cap badge", price:95 },
    "capbadge-rank":        { id:3507,  n:0, code:"07332", name:"Green Scout Leader cap badge (with pin fitting)", price:49,
      alt:[{id:3506,n:0,code:"07331",name:"Red Assistant Scout Leader cap badge",price:49},{id:3508,n:0,code:"07333",name:"Light blue Group Scout Leader cap badge",price:49},
           {id:3509,n:0,code:"07334",name:"Grey HQ / Region / District Leader cap badge",price:49},{id:410,n:0,code:"07072",name:"Green Scout Leader cap badge (cloth)",price:33}] },
    /* Shirts */
    "shirt-beige":     { id:369, n:2, code:"01151", name:"Beige short-sleeve shirt", price:95, alt:[{id:370,n:2,code:"01152",name:"Ladies’ beige short-sleeve shirt",price:95}] },
    "shirt-white":     { id:334, n:2, code:"01069", name:"Sea Scout white short-sleeve shirt", price:109 },
    "shirt-lightblue": { id:341, n:2, code:"01076", name:"Air Scout light blue short-sleeve shirt", price:175 },
    /* Trousers / skirts */
    "shorts-olive":    { id:373, n:0, code:"01155", name:"Olive green shorts", price:79 },
    "shorts-navy":     { id:335, n:0, code:"01070", name:"Navy blue shorts", price:129 },
    "culottes-olive":  { id:374, n:2, code:"01156", name:"Olive green culottes (inverted pleats)", price:79 },
    "culottes-navy":   { id:339, n:2, code:"01074", name:"Navy blue culottes (inverted pleats)", price:129 },
    "trousers-olive":  { id:375, n:2, code:"01157", name:"Olive green trousers", price:119, alt:[{id:376,n:2,code:"01158",name:"Ladies’ olive green trousers",price:119}] },
    "trousers-navy":   { id:340, n:0, code:"01075", name:"Navy blue trousers", price:149 },
    "skirt-olive":     { id:328, n:2, code:"01051", name:"Olive green skirt", price:89 },
    "skirt-navy":      { id:345, n:2, code:"01080", name:"Navy blue skirt", price:96 },
    /* Belt / socks */
    "belt":             { id:3549, n:0, code:"01008", name:"Full-grain leather belt", price:200 },
    "socks-long-olive": { id:310,  n:0, code:"01012", name:"Dark olive green cotton long socks", price:30, alt:[{id:3050,n:0,code:"01013",name:"Dark olive green wool long socks",price:42}] },
    "socks-long-navy":  { id:312,  n:0, code:"01016", name:"Navy blue cotton long socks", price:30 },
    "socks-short-black":{ id:311,  n:0, code:"01014", name:"Black cotton short socks", price:15 },
    /* Neckerchief / woggle */
    "scarf":        { id:391,  n:0, code:"07010", name:"Hong Kong Scout green neckerchief", price:55, note:"Group scarves are normally presented by the Group; the Scout Shop only sells the Association green neckerchief." },
    "woggle-scout": { id:3489, n:0, code:"01031", name:"Full-grain leather woggle (adjustable)", price:19 },
    "woggle-cub":   { id:333,  n:0, code:"01062", name:"Cub Scout plastic woggle", price:4 },
    /* Grasshopper Scout */
    "gh-clothes":   { id:3084, n:0, name:"Grasshopper Scout activity shirt", price:75, note:"If the Group arranges its own uniform dress, the Group’s arrangement prevails." },
    /* Badges */
    "badges-youth":  { id:1846, n:0, code:"01037", name:"World Scout Membership Badge", price:6,
      extra:[{id:1847,n:0,code:"01038",name:"Hong Kong Badge",price:6},{id:684,n:0,code:"23054",name:"Hong Kong Island Region badge (example)",price:2.5},{id:689,n:0,code:"23104",name:"Islands District badge (example)",price:6.5}] },
    "badges-leader": { id:1846, n:0, code:"01037", name:"World Scout Membership Badge", price:6,
      extra:[{id:1847,n:0,code:"01038",name:"Hong Kong Badge",price:6},{id:406,n:0,code:"07040",name:"Hong Kong headquarters badge",price:7.5}] },
    "patrol-badge":  { id:385, n:0, code:"04076", name:"Scout patrol colour badge", price:3.5 },
    "epaulette-rank":{ id:400, n:0, code:"07311", name:"Green Scout Leader epaulettes", price:33,
      alt:[{id:401,n:0,code:"07312",name:"Red Assistant Scout Leader epaulettes",price:33},{id:405,n:0,code:"07310",name:"Light blue Group Scout Leader epaulettes",price:33},{id:403,n:0,code:"07309",name:"Grey HQ / Region / District Leader epaulettes",price:33}] }
  },

  /* ── Grasshopper Scout (simple tidy meeting dress; Groups may arrange their own) ── */
  GRASSHOPPER_ITEM: {
    id:"gh-clothes", title:"What does a Grasshopper Scout need?", desc:"Simple, tidy meeting dress + Group scarf (as arranged by the Group)", status:"check", icon:"👕",
    detail:`<h4>Grasshopper Scout dress (Association website, “Uniform” page)</h4>
      <p>The Association website states that Grasshopper Scout dress <strong>consists only of a neckerchief and simple, tidy meeting dress</strong>. <strong>A Group may arrange its own uniform dress, and the Group’s arrangement prevails</strong>; where the Group has not specified anything, the usual arrangement is:</p>
      <ul>
        <li><strong>Top</strong>: the Group’s activity shirt; or the orange Grasshopper Scout activity shirt / a plain-coloured short- or long-sleeve shirt with a collar or a round neck</li>
        <li><strong>Trousers</strong>: plain-coloured shorts or long trousers</li>
        <li><strong>Shoes</strong>: sports shoes</li>
        <li><strong>Socks</strong>: plain-coloured short or long socks</li>
        <li><strong>Hat (optional)</strong>: plain-coloured wide-brimmed sun hat or peaked cap</li>
        <li><strong>Neckerchief</strong>: invested Grasshopper Scouts wear the Group scarf (with a colour woggle)</li>
        <li><strong>Badges</strong>: the Grasshopper Scout membership badge on the left chest after investiture; progress badges on the left sleeve</li>
      </ul>
      <div class="tip">The Group scarf and the Grasshopper Scout membership badge may only be worn <strong>after investiture</strong>.</div>
      <div class="warn">Apart from a colour woggle, Grasshopper Scouts may not use uniform accessories from other Sections (for example belts or uniform caps).</div>`
  },

  /* ── Verified local reference images ── */
  ITEM_REFERENCES: {
    "capbadge-cub": handbookImage("en", "capbadge-cub", 98, "Cloth cap badge already sewn onto the boys’ Cub Scout cap (official handbook diagram)", "Shows the boys’ Cub Scout cap; the cloth badge is sewn onto the crown — no separate purchase needed."),
    "capbadge-scout": handbookImage("en", "capbadge-scout", 102, "Silver Scout cap badge (original image from the official handbook)", "Detail of the handbook image, not a photo of the item currently on sale."),
    "capbadge-venture-sea": handbookImage("en", "capbadge-sea-youth", 102, "Venture / Rover Sea Scout cap badge (original image from the official handbook)", "The handbook lists the Venture and Rover Sea Scout cap badges as the same design."),
    "capbadge-rover-sea": handbookImage("en", "capbadge-sea-youth", 102, "Venture / Rover Sea Scout cap badge (original image from the official handbook)", "The handbook lists the Venture and Rover Sea Scout cap badges as the same design."),
    "capbadge-rank": handbookImage("en", "capbadge-rank", 104, "Example of a green Scout Leader rank cap badge (original image from the official handbook)", "Shows the green Scout Leader version only; colour and design depend on rank, so check with your Group first."),
    "capbadge-sea-leader": handbookImage("en", "capbadge-sea-leader", 105, "Sea Scout Leader cap badge (original image from the official handbook)", "Adult Sea Scout Leader version, different from the Venture / Rover Sea Scout version."),
    "cap-cub-m": handbookImage("en", "capbadge-cub", 98, "Boys’ dark green Cub Scout peaked cap with yellow band (official handbook diagram)", "Detail of a wearing diagram; the cloth cap badge is already sewn onto the crown."),
    "cap-cub-f": uniformCrop("en", "cap-cub-female", "cub", "Girls’ dark green round-brimmed Cub Scout hat (official uniform chart)", "Detail of the wearing chart; the cloth cap badge is already sewn onto the crown."),
    "beret-green": uniformCrop("en", "beret-green", "scout", "Dark green beret with the Scout cap badge (official uniform chart)", "Detail of the wearing chart; shows the youth Scout cap badge — adult Leaders must wear their rank cap badge."),
    "beret-greyblue": uniformCrop("en", "beret-greyblue", "venture", "Grey-blue beret with the Scout cap badge (official uniform chart)", "Detail of the wearing chart; shows the youth Scout cap badge — adult Leaders must wear their rank cap badge."),
    "belt": uniformCrop("en", "belt", "venture", "Brown belt and Scout emblem buckle (official uniform chart)", "Detail of the wearing chart, not a photo of the item currently sold at the Scout Shop."),
    "woggle-scout": uniformCrop("en", "woggle-scout", "venture", "Scout woggle (official uniform chart)", "Detail of the wearing chart, not a photo of the item currently sold at the Scout Shop."),
    "badges-youth": uniformCrop("en", "badges-common", "cub", "Hong Kong Badge and World Scout Membership Badge (official uniform chart)", "Shows only these two universal badges; obtain the Region, District and Group badges according to your own unit."),
    "badges-leader": uniformCrop("en", "badges-common", "cub", "Hong Kong Badge and World Scout Membership Badge (official uniform chart)", "Shows only these two universal badges, not a complete Leader badge set; the rest depend on your appointment and service unit.")
  },

  /* ── Progressive badge overview per Section ── */
  BADGES_OVERVIEW: {
    grasshopper: {
      name: "Grasshopper Scout", color: "var(--grasshopper)", age: "4–7 years",
      promise: "I promise to join the Grasshopper Scouts, to love God, to love others and to love my country.", law: "A Grasshopper Scout does a good turn every day.", motto: "Be Prepared",
      type: "Membership badge + progress badges (four steps)",
      badges: [
        { name: "🔰 Membership badge", desc: "Worn after investiture" },
        { name: "Progress badges", desc: "Step 1 (red) → Step 2 (brown) → Step 3 (blue) → Step 4 (green)" }
      ],
      note: "Grasshopper Scout dress consists only of a <strong>neckerchief and simple, tidy meeting dress</strong>; a Group may also arrange its own uniform dress — the Group’s arrangement prevails."
    },
    cub: {
      name: "Cub Scout", color: "var(--cub)", age: "6–11 years",
      promise: "I promise to do my best: to do my duty to God and to my country; to help other people; and to keep the Cub Scout Law.", law: "A Cub Scout always does their best, thinks of others before themselves, and does a good turn every day.", motto: "Be Prepared",
      type: "Membership badge + 4 progressive proficiency badges (the Golden Bauhinia Award is the Section’s top award)",
      badges: [
        { name: "🔰 Membership badge", desc: "Earned after joining, worn after investiture" },
        { name: "1️⃣ Cub Scout Award", desc: "Completed within 6 months of the Membership badge" },
        { name: "2️⃣ Cub Scout Adventure Award", desc: "Within 1 year of the Cub Scout Award" },
        { name: "3️⃣ Cub Scout Advanced Adventure Award", desc: "Within 1½ years of the Adventure Award" },
        { name: "⭐ Golden Bauhinia Award", desc: "<strong>The Cub Scout Section’s top award</strong>. Must be at least 9½ years old and have completed the Adventure Award to apply. Once earned, only the Golden Bauhinia Award is worn, on the right breast pocket" },
        { name: "🔗 Scout Link Award", desc: "Can be earned from age 10½; introduces Scout Section activities and prepares you for moving up" }
      ],
      note: "There are also activity badges (single-level / three-level), worn on the left sleeve."
    },
    scout: {
      name: "Scout", color: "var(--scout)", age: "11–15 years",
      promise: "On my honour I promise that I will do my best: to do my duty to God and to my country; to help other people; and to keep the Scout Law.", law: "A Scout’s honour is to be trusted. A Scout is loyal. A Scout is friendly and courteous. A Scout is a brother to all Scouts. A Scout is brave. A Scout cares for the world and all living things. A Scout has self-respect and respect for others.", motto: "Be Prepared",
      type: "Membership badge + 4 progressive proficiency badges (the Chief Scout’s Award is the Section’s top award)",
      badges: [
        { name: "🔰 Membership badge", desc: "Earned after joining, worn after investiture" },
        { name: "1️⃣ Scout Discovery Award", desc: "Starts at age 11 with the Membership badge" },
        { name: "2️⃣ Scout Standard Award", desc: "After completing the Discovery Award" },
        { name: "3️⃣ Scout Advanced Award", desc: "After completing the Standard Award" },
        { name: "⭐ Chief Scout’s Award", desc: "<strong>The Scout Section’s top award</strong>. Presented by the Youth Programme Department and distributed by the Scout Shop" },
        { name: "🔗 Venture Scout Link Award", desc: "Can be earned from age 14½; introduces the Venture Scout Section and prepares you for moving up" }
      ],
      note: "Sea Scouts must take “Water Activities”; Air Scouts must take “Air Activities”. There are also proficiency badges (Interest / Skill / Service / Instructor groups)."
    },
    venture: {
      name: "Venture Scout", color: "var(--venture)", age: "15–20 years",
      promise: "On my honour I promise that I will do my best: to do my duty to God and to my country; to help other people; and to keep the Scout Law.", law: "Same as the Scout Section.", motto: "Be Prepared",
      type: "Venture Scout shoulder badge + 2 progressive proficiency badges (the Dragon Scout Award is the Section’s top award)",
      badges: [
        { name: "🔰 Venture Scout shoulder badge", desc: "A prerequisite — must be completed before any progressive badge" },
        { name: "1️⃣ Venture Scout Award", desc: "Earn the four stage badges: Responsibility, Self-reliance, Activity and Exploration" },
        { name: "⭐ Dragon Scout Award", desc: "<strong>The Venture Scout Section’s top award</strong>. Requires the Venture Scout Award and four gold cords. Holders may wear the Dragon Scout Leader’s insignia for life if they later become Leaders" }
      ],
      note: "Venture Scout Units are self-governing through an executive committee."
    },
    rover: {
      name: "Rover Scout", color: "var(--rover)", age: "18–25 years",
      promise: "On my honour I promise that I will do my best: to do my duty to God and to my country; to help other people; and to keep the Scout Law.", law: "Same as the Scout Section.", motto: "To Serve",
      type: "Rover Scout shoulder badge + 2 progressive proficiency badges (the Baden-Powell Award is the Section’s top award)",
      badges: [
        { name: "🔰 Rover Scout shoulder badge", desc: "A prerequisite" },
        { name: "1️⃣ Rover Scout Award", desc: "Scout knowledge, community service, outdoor activities, personal interests, relationships, personal values, world awareness, life experience" },
        { name: "⭐ Baden-Powell Award", desc: "<strong>The Rover Scout Section’s top award</strong>. Service, Scout skills, exploration, life experience. Holders may wear the Baden-Powell Leader’s insignia if they later become Leaders" }
      ],
      note: "Rover Scouts may at the same time hold appointments in other Sections, Districts and Regions."
    },
    leader: {
      name: "Leader", color: "var(--leader)", age: "Adult member",
      promise: "On my honour I promise that I will do my best: to do my duty to God and to my country; to help other people; and to keep the Scout Law.", law: "Same as the Scout Section.", motto: "To Serve",
      type: "Non-progressive: Leader training (Wood Badge) + honours and awards system",
      badges: [
        { name: "🎓 Wood Badge", desc: "Awarded on completion of Leader training (wood badge, wood badge neckerchief, wood badge woggle)" },
        { name: "🏅 Long service awards", desc: "Service badge (minimum 3 years), Long Service Medal (15 years)" },
        { name: "🏅 Meritorious awards", desc: "Good Service Medal → Distinguished Service Medal → Meritorious Service Medal → Meritorious Service Cross; Bronze / Silver / Gold Lion Awards" },
        { name: "⭐ Chief Commissioner’s Commendation / Senior Commendation", desc: "Awarded with the approval of the Chief Commissioner" }
      ],
      note: "Leaders come from 3 routes: <strong>promoted from Venture Scout, promoted from Rover Scout, or joining fresh</strong>. Holders of the Dragon Scout Award / Baden-Powell Award may wear the corresponding Leader’s insignia for life."
    }
  },

  /* ── Moving-up transition Q&A ── */
  TRANSITIONS: {
    cub: {
      title: "Grasshopper Scout → Cub Scout", color: "var(--cub)",
      items: [
        { q: "What are the conditions for moving up?", a: "You simply need to be within the Cub Scout age range (6–11); check the actual date with your Group. Grasshopper Scout membership ends automatically on your 8th birthday." },
        { q: "What do I need to buy?", a: "Grasshopper Scouts only have activity clothing (sports shoes and so on), so moving up to Cub Scout is like <strong>buying a complete uniform for the first time</strong>: cap, cap badge, shirt, shorts / culottes, belt, long socks and shoes; the Group scarf and colour woggle are arranged by the Group." },
        { q: "Where do Cub Scout badges go?", a: "Membership badge: centre of the left breast pocket; Hong Kong Badge: above the left breast pocket; service stars: next to the Hong Kong Badge; progressive badges and the Golden Bauhinia Award: right breast pocket; activity badges: left sleeve; Group, District and Region badges: right sleeve. (New guidance from April 2023)" }
      ]
    },
    scout: {
      title: "Cub Scout → Scout", color: "var(--scout)",
      items: [
        { q: "What are the conditions for moving up?", a: "You simply need to be within the Scout age range (11–15); you do not need to earn the Golden Bauhinia Award first. Cub Scout membership ends automatically on your 12th birthday. Cub Scouts aged 10½ or over can earn the <strong>Scout Link Award</strong> first to get to know the Scout Section." },
        { q: "Pick Land / Sea / Air first", a: "The Scout Section is divided into <strong>Scout, Sea Scout and Air Scout</strong>, each with different uniform colours: Land = beige shirt + olive green shorts / culottes + dark green beret; Sea = white shirt + navy blue shorts / culottes + white-top cap; Air = light blue shirt + navy blue shorts / culottes + grey-blue beret. Ask your Group which one it is before you move up." },
        { q: "What do I need to buy for Land Scout?", a: "Must buy: <strong>dark green beret, Scout cap badge and Scout woggle</strong>. The shirt, shorts / culottes, belt, long socks and shoes are the <strong>same model</strong> as for Cub Scouts and can be carried over if they still fit." },
        { q: "What do I need to buy for Sea / Air Scout?", a: "Almost everything is new: white (Sea) / light blue (Air) shirt, navy blue shorts / culottes, navy blue long socks, white-top cap (Sea) / grey-blue beret (Air), and a Scout woggle. Only the belt, shoes and Group scarf can be carried over." },
        { q: "What happens to my badges?", a: "Remove the Cub Scout progressive badges, activity badges and Sixer / Seconder badges. <strong>The Golden Bauhinia Award is a Cub Scout award and the award itself is no longer worn after moving up</strong>, but you may buy the “Golden Bauhinia Award insignia” (on production of a copy of the certificate) and wear it above the right breast pocket. Service stars are kept. The World Scout Membership Badge, Hong Kong Badge, Region, District and Group badges can be carried over." },
        { q: "What about patrol badges?", a: "The patrol system starts in the Scout Section; <strong>patrol badges are issued by the Group or bought at the Scout Shop</strong> (no documents required) and worn on the right sleeve." }
      ]
    },
    venture: {
      title: "Scout → Venture Scout", color: "var(--venture)",
      items: [
        { q: "What are the conditions for moving up?", a: "You simply need to be within the Venture Scout age range (15–20); you do not need to earn the Chief Scout’s Award first. Scout membership ends automatically on your 16th birthday. Scouts aged 14½ or over can earn the <strong>Venture Scout Link Award</strong> first." },
        { q: "Pick Land / Sea / Air first", a: "The Venture Scout Section is likewise divided into <strong>Venture Scout, Venture Sea Scout and Venture Air Scout</strong>. Sea and Air Venture Scouts change to the <strong>Sea Scout Leader white-top cap</strong> (a different model from the Scout Section white-top cap) / the grey-blue beret." },
        { q: "What do I need to buy for Land Venture?", a: "Must buy: <strong>maroon beret, olive green trousers (male) / olive green skirt (female), black short socks (male) / flesh-coloured pantyhose + black mid-heel shoes (female)</strong>. The shirt, belt, Group scarf, Scout woggle and Scout cap badge can be carried over. <strong>Venture Scouts do not wear a tie</strong> (the official uniform uses the Group scarf)." },
        { q: "What happens to my badges?", a: "Remove the Scout progressive badges, proficiency badges, patrol badge and Patrol Leader badge. Venture Scouts <strong>never wear the Golden Bauhinia Award</strong>; if you earned the Chief Scout’s Award as a Scout, the Section top award insignia may be worn as arranged by the Association (check with your Group). Service stars are kept." }
      ]
    },
    rover: {
      title: "Venture Scout → Rover Scout", color: "var(--rover)",
      items: [
        { q: "What are the conditions for moving up?", a: "You simply need to be within the Rover Scout age range (18–25); you do not need to earn the Dragon Scout Award first. Venture Scout membership ends automatically on your 21st birthday." },
        { q: "Pick Land / Sea / Air first", a: "The Rover Scout Section is likewise divided into <strong>Rover Scout, Rover Sea Scout and Rover Air Scout</strong>." },
        { q: "What do I need to buy for Land Rover?", a: "You only need to <strong>swap the maroon beret for the dark green beret</strong>; the Scout cap badge can be transferred. Everything else (shirt, trousers / skirt, belt, socks, shoes, Group scarf, woggle) is the same model and can be carried over." },
        { q: "What do I need to buy for Sea / Air Rover?", a: "Sea: the white-top cap can be carried over; the official handbook lists the <strong>Venture and Rover Sea Scout cap badges as the same design</strong>, so check current practice with your Group before moving up. Air: everything is the same model, nothing to buy." },
        { q: "What happens to my badges?", a: "Remove the Venture Scout shoulder badge, stage badges and gold cords, and the Venture Scout Award. If you earned the <strong>Dragon Scout Award</strong>, wear it as arranged by the Association (check with your Group). Service stars are kept." }
      ]
    },
    leader: {
      title: "Becoming a Leader", color: "var(--leader)",
      items: [
        { q: "Leaders come from 3 routes", a: "<strong>① Promoted from Venture Scout</strong> (Venture membership ends at 21)<br><strong>② Promoted from Rover Scout</strong> (Rovers may hold a Leader appointment at the same time)<br><strong>③ Joining fresh</strong> (an adult applying directly to become a Leader). What you need to buy differs in each case — pick the right route above." },
        { q: "Pick Land / Sea / Air first", a: "Leader uniforms are likewise divided into <strong>Land, Sea and Air</strong>: Land = beige shirt + olive green trousers / skirt + dark green beret (female: dark green peaked hat with gold braid); Sea = white shirt + navy blue trousers / skirt + Sea Scout Leader white-top cap; Air = light blue shirt + navy blue trousers / skirt + grey-blue beret." },
        { q: "Do I need to buy all 6 uniform orders of dress?", a: "No. A new Leader only needs the <strong>ordinary uniform (No. 3)</strong> for everyday meetings. Ceremonial dress (No. 1), evening dress (No. 2), tie uniform (No. 4), shorts uniform (No. 5) and trouser uniform (No. 6) are only worn on specific occasions." },
        { q: "What do I need to buy coming from Venture / Rover (Land)?", a: "Male: the shirt, trousers, belt, short socks, shoes, Group scarf and woggle are all the same model and can be carried over; you only need to buy the <strong>rank cap badge</strong> (dark green beret: Rover can keep it; the Venture maroon beret must be swapped). Female: you need the <strong>dark green peaked hat with gold braid</strong> plus the rank cap badge. Add rank epaulettes and the Hong Kong shoulder badge / Group badge." },
        { q: "What colour is the Leader’s tie?", a: "A tie is only worn with the <strong>tie uniform (No. 4) and ceremonial dress</strong>: Land = dark green; Sea = black; Air = navy blue. The Group scarf is worn with the ordinary uniform." },
        { q: "Holders of the Dragon Scout / Baden-Powell Award", a: "After becoming a Leader you may wear the <strong>Dragon Scout Leader’s insignia</strong> or the <strong>Baden-Powell Leader’s insignia</strong> for life (if you hold both, only the Dragon Scout insignia is worn). The Explorer Scout badge earned as a youth member may continue to be worn on the right sleeve." }
      ]
    }
  },

  /* ── Badge journey charts ── */
  BADGE_TIMELINES: {
    grasshopper: [
      { stage: "🔰", name: "Membership badge", age: "After investiture", color: "var(--grasshopper)", desc: "Worn after investiture" },
      { stage: "1-4", name: "Progress badges", age: "Step 1 to Step 4", color: "var(--grasshopper)", desc: "Red → brown → blue → green" }
    ],
    cub: [
      { stage: "🔰", name: "Membership badge", age: "After joining", color: "var(--cub)", desc: "Worn after investiture" },
      { stage: "1", name: "Cub Scout Award", age: "Within 6 months of the Membership badge", color: "var(--cub)", desc: "Tracking, knots, country code, good turns, care and first aid, promise and law" },
      { stage: "2", name: "Cub Scout Adventure Award", age: "Within 1 year of the Award", color: "var(--cub)", desc: "Outdoor activities, sport and hobbies, helping others, looking after yourself" },
      { stage: "3", name: "Cub Scout Advanced Adventure Award", age: "Within 1½ years of the Adventure Award", color: "var(--cub)", desc: "Advanced level of the same areas" },
      { stage: "⭐", name: "Golden Bauhinia Award", age: "9½ years old + Adventure Award", color: "#FFD700", desc: "The Cub Scout Section’s top award" }
    ],
    scout: [
      { stage: "🔰", name: "Membership badge", age: "After joining", color: "var(--scout)", desc: "Worn after investiture" },
      { stage: "1", name: "Scout Discovery Award", age: "From 11 years old", color: "var(--scout)", desc: "Outdoor challenge, personal development, society, environment" },
      { stage: "2", name: "Scout Standard Award", age: "After the Discovery Award", color: "var(--scout)", desc: "Adds “world awareness” and “new experiences”" },
      { stage: "3", name: "Scout Advanced Award", age: "After the Standard Award", color: "var(--scout)", desc: "Take part in an activity you have never tried" },
      { stage: "⭐", name: "Chief Scout’s Award", age: "After the Advanced Award", color: "#FFD700", desc: "The Scout Section’s top award; requires an Instructor-group proficiency badge" }
    ],
    venture: [
      { stage: "🔰", name: "Venture Scout shoulder badge", age: "After joining", color: "var(--venture)", desc: "A prerequisite" },
      { stage: "1", name: "Venture Scout Award", age: "After the four stage badges", color: "var(--venture)", desc: "Responsibility, Self-reliance, Activity and Exploration stage badges" },
      { stage: "⭐", name: "Dragon Scout Award", age: "Venture Award + four gold cords", color: "#FFD700", desc: "The Venture Scout Section’s top award" }
    ],
    rover: [
      { stage: "🔰", name: "Rover Scout shoulder badge", age: "After joining", color: "var(--rover)", desc: "A prerequisite" },
      { stage: "1", name: "Rover Scout Award", age: "After the shoulder badge", color: "var(--rover)", desc: "Scout knowledge, community service, outdoor activities and 5 other areas" },
      { stage: "⭐", name: "Baden-Powell Award", age: "After the Rover Award", color: "#FFD700", desc: "The Rover Scout Section’s top award" }
    ],
    leader: [
      { stage: "🎓", name: "Wood Badge", age: "After completing Leader training", color: "var(--leader)", desc: "Wood badge, wood badge neckerchief, wood badge woggle" },
      { stage: "🏅", name: "Service badge / Long Service Medal", age: "3 years / 15 years", color: "var(--leader)", desc: "Long service awards" },
      { stage: "⭐", name: "Meritorious awards / Commissioner’s Commendation", age: "Experienced Leaders", color: "#FFD700", desc: "Good / Distinguished Service Medals, Lion Awards, Chief Commissioner’s Commendation" }
    ]
  },

  /* ── Interface strings ── */
  UI: {
    male: "Male", female: "Female",
    genderShort: (g) => g === "female" ? "Female" : "Male",
    genderLabel: "Gender:",
    genderMemberMale: "Male member", genderMemberFemale: "Female member",
    genderLeaderMale: "Male Leader", genderLeaderFemale: "Female Leader",
    sectionAge: "Section age: ",
    countUnit: " items",
    branchFallbackShort: "Land",
    nameSep: " ",
    branchLabel: (name) => ` · ${name}`,
    partExpand: "Expand", partCollapse: "Collapse",
    toolbarAria: "Expand / collapse controls for the sections shown",
    toolbarHint: "Tap any section heading to expand or collapse it, so you only read what you need.",
    expandAll: "Expand all", collapseAll: "Collapse all",

    controlsTitle: "Which one are you?",
    grasshopperNoUniform: "Grasshopper Scouts have no prescribed uniform and no Section to move up from — just read the notes below.",
    sourceFrom: (name, isLeader) => `Moving up from ${name}`,
    sourceFromGrasshopper: "Moving up from Grasshopper Scout",
    sourceSmallGrasshopper: "Grasshoppers have no uniform — same as joining fresh",
    sourceSmallReuse: "Same-model items can be carried over",
    newJoin: "Joining fresh",
    newJoinSmall: "Never worn a Scout uniform before",
    fromBranchLabel: "Currently:",
    toBranchLabelUpgrade: "Moving to:",
    toBranchLabelNew: "Joining:",
    branchHint: "A Group is usually all one type; if you are not sure, ask your Group Leader.",

    modeUpgrade: (from) => `Moving up from ${from}`,
    modeNew: "Joining fresh",
    fromLabel: (name, short) => short ? `${name} (${short})` : name,

    statusNeed: "To buy", statusHave: "Reuse", statusCheck: "Ask your Group",
    ownedSummary: (n, total) => `✅ Marked as owned: <strong>${n}</strong> / ${total} items`,
    resetMarks: "🗑 Clear all marks",
    resetConfirm: "Clear every “owned” mark?\n\nThis cannot be undone!",

    markOwned: "✅ Owned / bought",
    markOwnedNone: "⬜ Mark as owned",
    ownedHint: "You already have this",
    ownedHintNone: "Already have it (shared with a brother or sister)? Tick here",
    checklistTitle: (mode, branch, gender, n) => `${mode}${branch} · ${gender} · ${n} items in total`,
    checklistNote: "<strong>Note:</strong> uniform specifications follow the “Uniform” page of the Scout Association of Hong Kong website. For the Region, District, Group and patrol badges and for the Group scarf, ask your <strong>Group Leader</strong>.",

    noteReuse: (from) => `<div class="tip">✅ <strong>Same model</strong> as ${from} — can be carried over if it is in good condition.</div>`,
    noteBadgesReuse: `<div class="tip">✅ The World Scout Membership Badge, Hong Kong Badge, Region, District and Group badges can be carried over (same Group). <br><strong>Remove</strong> the old Section’s progressive badges, activity / proficiency badges and Patrol Leader badge. Service stars are kept.</div>`,
    noteScarfReuse: `<div class="tip">✅ Moving up within the same Group — keep your existing Group scarf.</div>`,
    noteNeed: (from) => `<div class="warn">🆕 ${from} does not use this model — buy it or change it.</div>`,
    buyLabels: {
      supply: "Buy at the Hong Kong Scout Shop",
      included: "Supplied with the Cub Scout cap — no separate purchase",
      any: "Scout Shop or any general shop",
      group: "Presented by the Group",
      check: "Ask your Group / District",
      mixed: "Buy at the Scout Shop; ask your Group about the Group / District / Region badges",
      "group-or-supply": "Presented by the Group / sold at the Scout Shop"
    },

    shopBoxTitle: "🛒 Official Scout Shop products",
    shopCode: (code) => code ? ` (code ${code})` : "",
    shopPrice: (p) => p != null ? ` HK$${p}` : "",
    shopAlts: "Other models: ",
    shopAltSep: ", ",
    shopPriceNote: "Prices are the retail prices shown on the Scout Shop website (captured 2026-09); in-store prices prevail.",

    budgetGrasshopper: `Grasshopper Scouts follow <strong>the Group’s arrangement</strong>: the Grasshopper Scout activity shirt can be bought at the <a href="https://www.hkscoutshop.org.hk/" target="_blank" rel="noopener">Scout Shop</a> (HK$75); plain-coloured clothing and sports shoes can be bought anywhere, and the Group scarf is arranged by the Group.`,
    priceIncluded: "Supplied with the cap — no separate purchase",
    priceDependsGroup: "Depends on the Group’s arrangement",
    priceOfficial: (p) => `HK$${p}`,
    priceApprox: (lo, hi) => lo === hi ? `approx. HK$${lo}` : `approx. HK$${lo}–${hi}`,
    shopCodeLink: (code) => ` Scout Shop ${code} ↗`,
    budgetModeUpgrade: "top-up for moving up", budgetModeNew: "full new purchase",
    budgetHead: (mode) => `You have selected <strong>${mode}</strong>; here is what you need to prepare:`,
    budgetColItem: "Item", budgetColPrice: "Approximate price",
    budgetTotal: "Total (excluding items presented by the Group)",
    budgetFootNote: "Prices marked with a Scout Shop code are the retail prices shown on hkscoutshop.org.hk in September 2026; the rest are approximate. The Hong Kong Scout Shop has the final say. Leather shoes, short socks and pantyhose can be bought at general shops.",

    officialRefTitle: (name) => `${name} official uniform reference chart`,
    officialRefDesc: "Check the whole outfit: cap, shirt, trousers / skirt, belt, socks, shoes and neckerchief.",

    imgNoRef: "No reference image available",
    imgUnavailableThumb: "Image",
    imgUnavailable: "Reference image unavailable",
    imgUnavailableHint: "Check the source or the product page below",
    imgUnavailableNote: "The image could not be loaded; you can still check the model and specifications on the source page.",
    shopImageAlt: (name) => `${name} (Scout Shop product image)`,
    shopImageLabel: "Scout Shop product image",
    shopImageSource: "View Scout Shop product ↗",
    shopImageNote: (name) => `Product example: ${name}; it may not represent every model of this item.`,
    itemImageAlt: (title) => `${title} (style illustration, not a photo of the actual item)`,
    itemImageLabel: "Style illustration (not a photo)",
    itemImageSource: "Compare with the Scout Shop product ↗",
    itemImageNoteFallback: "The Scout Shop image could not be loaded; this illustration is not a guide to colour or detail.",
    itemImageNoteOnly: "For identifying the style only; colour and detail follow the actual item and the official specification.",
    uniformAlt: (sec, br, g) => `${sec} · ${br} · ${g} uniform reference chart`,
    uniformSourceLabel: "Association uniform page ↗",
    uniformNote: "Official uniform diagram, not a photograph; specifications follow the Association’s latest information.",
    uniformLocalLabel: "Official uniform reference (local)",
    uniformRemoteLabel: "Official uniform reference",
    femaleCubBadgeAlt: "Cloth cap badge already sewn onto the girls’ Cub Scout cap (official uniform chart)",

    badgeSystem: "Badge system: ",
    promise: "Promise",
    law: "Law",
    badgesCount: (n) => `Badges (${n})`,
    badgeJourney: (name) => `📊 ${name} badge journey`,
    viewDetails: "View details",

    langToggleAria: "Switch language / 切換語言"
  },

  /* ── Static text in index.html (matched on the trimmed text node) ── */
  HTML: {
    /* Header / toolbar */
    "童軍準備指南": "Scout Uniform Guide",
    "由小童軍到領袖・家長一目了然": "From Grasshopper Scout to Leader — everything parents need at a glance",
    "按各部分標題展開／收起，只睇你需要嘅內容。": "Tap any section heading to expand or collapse it, so you only read what you need.",
    "全部展開": "Expand all",
    "全部收起": "Collapse all",

    /* ① 揀進團情境 */
    "① 揀進團情境": "① Pick your joining situation",
    "你現在要準備哪一支部?": "Which Section are you preparing for?",
    "小童軍": "Grasshopper",
    "4–7 歲": "4–7 yrs",
    "幼童軍": "Cub",
    "6–11 歲": "6–11 yrs",
    "童軍": "Scout",
    "11–15 歲": "11–15 yrs",
    "深資童軍": "Venture",
    "15–20 歲": "15–20 yrs",
    "樂行童軍": "Rover",
    "18–25 歲": "18–25 yrs",
    "領袖": "Leader",
    "成年": "Adult",
    "支部年齡根據香港童軍總會官網「支部簡介」（中文版）": "Section ages follow the “Sections” page of the Scout Association of Hong Kong website (Chinese version)",

    /* ② 你屬於哪一種？ */
    "② 你屬於哪一種？": "② Which one are you?",
    "領袖有 3 個來源（由深資升任／由樂行升任／全新加入）；童軍、深資、樂行、領袖都分": "Leaders come from 3 routes (promoted from Venture / promoted from Rover / joining fresh); Scout, Venture, Rover and Leader are each divided into",
    "陸、海、空": "Land, Sea and Air",
    "，制服顏色不同，要先揀清楚「原本是」和「升去」哪一種，才知道要買什麼。": ", and the uniform colours differ — decide which one you are “currently” and which one you are “moving to” before you know what to buy.",
    "幼童軍不分陸／海／空，只需揀「由小童軍升團」或「全新加入」，再揀性別。": "Cub Scouts are not divided into Land / Sea / Air — just pick “moving up from Grasshopper Scout” or “joining fresh”, then choose the gender.",
    "小童軍毋須揀來源，直接睇下方服裝說明。": "Grasshopper Scouts do not need to pick a source — read the dress notes below.",

    /* ③ 制服清單 */
    "③ 制服清單": "③ Uniform checklist",

    /* 哪裡購買制服 */
    "哪裡購買制服": "Where to buy the uniform",
    "為確保顏色及款式正確，制服及配件請到": "To be sure of the correct colour and model, buy the uniform and its accessories from the",
    "香港童軍物品供應社": "Hong Kong Scout Shop",
    "購買。皮鞋可自行到鞋店選購（合規格的學校皮鞋可用）。": ". Leather shoes can be bought at any shoe shop (school shoes that meet the specification are acceptable).",
    "小童軍服裝以": "Grasshopper Scout dress follows the",
    "旅團安排": "Group’s arrangement",
    "為準（旅團可安排自家統一服飾）。小童軍活動服可於供應社購買；單色衣物、運動鞋可自行選購。": " (a Group may arrange its own uniform dress). The Grasshopper Scout activity shirt can be bought at the Scout Shop; plain-coloured clothing and sports shoes can be bought anywhere.",
    "香港童軍物品供應社 — 總店(尖沙咀)": "Hong Kong Scout Shop — Main store (Tsim Sha Tsui)",
    "網址：": "Website: ",
    "前往官方網站(地圖) ↗": "Go to the official website (map) ↗",
    "地址：": "Address: ",
    "九龍柯士甸道童軍徑香港童軍中心11樓": "11/F, Hong Kong Scout Centre, Scout Path, Austin Road, Kowloon",
    "港鐵：": "MTR: ",
    "佐敦站 C2 出口": "Jordan Station, Exit C2",
    "電話：": "Tel: ",
    "營業時間：": "Opening hours:",
    "星期一至五": "Monday to Friday",
    "星期六": "Saturday",
    "星期日": "Sunday",
    "公眾假期": "Public holidays",
    "休息": "Closed",
    "特別營業安排以供應社官網「最新消息」為準。": "Special opening arrangements follow the “Latest news” page of the Scout Shop website.",
    "購買流程 SOP": "Buying procedure — SOP",
    "先向": "First ask your",
    "所屬旅團領袖": "Group Leader",
    "查詢當季制服安排(部分旅團會統一訂購)": "about this season’s uniform arrangements (some Groups place a bulk order)",
    "確認要買的物品清單(可參考本 APP)": "Confirm the list of items to buy (this app can help)",
    "親臨供應社或經網站訂購": "Visit the Scout Shop or order through the website",
    "試身(尤其恤衫、褲、皮鞋要現場試)": "Try everything on (especially the shirt, trousers and shoes — try them in person)",
    "向團長查詢": "Ask your Group Leader about the",
    "地域章、區章、旅章": "Region, District and Group badges",
    "(童軍支部另有小隊章)購買/頒發安排": "(the Scout Section also has patrol badges) — how to buy them / how they are issued",
    "回家檢查所有徽章、帽章齊備": "Check at home that every badge and the cap badge are complete",
    "第一次集會前完成": "Before the first meeting, finish",
    "燙衫、擦鞋、定帽": "ironing the shirt, polishing the shoes and shaping the cap",
    "制服配件之": "Uniform accessories — the",
    "帽、帽章、恤衫、長褲/短褲/裙褲/半截裙、皮帶、巾圈、領巾": "cap, cap badge, shirt, trousers / shorts / culottes / skirt, belt, woggle and neckerchief",
    "等均需向供應社購買;": " must all be bought from the Scout Shop;",
    "皮鞋": "leather shoes",
    "可自行於鞋店購買(合規格學校皮鞋可用)。": " can be bought at any shoe shop (school shoes that meet the specification are acceptable).",
    "小童軍除顏色巾圈外，不可使用其他支部制服配件(例如皮帶、制服帽)。": "Apart from a colour woggle, Grasshopper Scouts may not use uniform accessories from other Sections (for example belts or uniform caps).",

    /* 升團過渡指南（總綱） */
    "🎯 升團過渡指南(總綱)": "🎯 Moving-up transition guide (overview)",
    "由一個支部升上另一個支部,家長要了解的不只是制服規格,仲有": "When a young person moves from one Section to another, parents need to understand not only the uniform specification but also",
    "年齡、誓詞規律、考章、宣誓安排": "ages, the Promise and Law, badge assessments and investiture arrangements",
    "。以下係各升團情境的完整過渡須知:": ". Here are the complete transition notes for each moving-up situation:",
    "📜 進度性獎章總覽": "📜 Progressive badge overview",
    "資料來源:香港童軍總會《童軍訓練綱要》及政策、組織及規條": "Source: the Scout Association of Hong Kong Scout Training Scheme and Policy, Organisation and Rules",
    "🔼 升團過渡詳情": "🔼 Moving-up transition details",
    "揀支部就會自動顯示對應嘅升團須知:": "Pick a Section and the matching transition notes appear automatically:",

    /* 選碼小貼士 */
    "📐 選碼小貼士": "📐 Tips on choosing sizes",
    "選碼最重要係": "The most important thing is to ",
    "親身到 SCOUT SHOP 試身": "try the uniform on in person at the SCOUT SHOP",
    ",職員會幫你度尺碼,提出專業意見。以下係一般參考:": "; the staff will take your measurements and give professional advice. The following is a general guide:",
    "恤衫必買大一碼": "Always buy the shirt one size larger",
    "——童軍成長快,太大可改細,太細要重買": " — young people grow fast; too large can be taken in, too small means buying again",
    "長褲/短褲": "Trousers / shorts",
    ":腰圍為準,留 1–2cm 位改": ": go by the waist, leaving 1–2 cm for alteration",
    "軟帽": "Beret",
    ":頭圍量度,首次戴要弄濕定型": ": measure the head; wet it and shape it before the first wearing",
    ":建議下午試(腳會較脹),預留少少位著襪": ": try them in the afternoon (feet swell), allowing a little room for socks",
    "裙褲/半截裙": "Culottes / skirt",
    ":女團員特別注意腰位及裙長": ": girls should pay special attention to the waist and the length",
    "領袖金邊硬帽": "Leader’s peaked hat with gold braid",
    ":女領袖試帽時要確定頭圍合適,帽不可太鬆": ": female Leaders should make sure the head size is right — the hat must not be too loose",
    "💡 慳時間貼士:": "💡 Time-saving tip:",
    "帶埋子女": "Bring your child together with the",
    "平日集會要著嘅皮鞋+長襪": "leather shoes and long socks worn to ordinary meetings",
    "一齊去試身,咁就可以即場試埋褲長、裙長、鞋位。": ", so trouser length, skirt length and shoe fit can all be checked on the spot.",

    /* 洗滌保養指南 */
    "洗滌保養指南": "Washing and care guide",
    "童軍制服保養得宜可以用幾年。以下係每件物品的清洗及保養方法:": "A well-cared-for Scout uniform lasts for years. Here is how to wash and care for each item:",
    "👕 恤衫（杏色／白色／淺藍色）": "👕 Shirts (beige / white / light blue)",
    "冷水機洗(30°C 以下),翻轉洗": "Machine wash cold (below 30°C), turned inside out",
    "不可用漂白劑": "Do not use bleach",
    "低溫熨燙(": "Iron on a low setting (",
    "領、袋蓋、肩帶必燙": "collar, pocket flaps and shoulder straps must be ironed",
    "避免陽光直曬以防褪色": "Avoid direct sunlight to prevent fading",
    "👖 長褲/短褲/裙褲/半截裙": "👖 Trousers / shorts / culottes / skirt",
    "冷水機洗,反面洗": "Machine wash cold, inside out",
    "中溫熨燙(中線要直)": "Iron on a medium setting (keep the crease straight)",
    "乾後盡快掛起,避免摺痕": "Hang up as soon as it is dry to avoid creases",
    "🧢 軟帽 / 鴨舌帽": "🧢 Berets / peaked caps",
    "不可機洗": "Do not machine wash",
    "污漬用濕布局部擦拭": "Dab stains with a damp cloth",
    "變形後可": "If it loses its shape you can",
    "再弄濕重塑": "wet it again and reshape it",
    "頭形": " to your head",
    "存放時勿壓扁,塞入帽托": "Do not squash it in storage — use a hat support",
    "👔 皮帶": "👔 Belt",
    "皮革保養油每半年擦一次": "Apply leather conditioner every six months",
    "避免浸水": "Avoid soaking",
    "皮帶扣用乾布擦": "Wipe the buckle with a dry cloth",
    "🧣 旅巾 / 領巾": "🧣 Group scarf / neckerchief",
    "手洗或機洗(放網袋)": "Hand wash or machine wash (in a laundry bag)",
    "陰乾,避免褪色": "Dry in the shade to avoid fading",
    "摺巾前完全晾乾": "Dry it completely before folding",
    "👞 黑色皮鞋": "👞 Black leather shoes",
    "集會後": "After every meeting, ",
    "立即擦淨": "wipe the",
    "灰塵": " dust off immediately",
    "每週用": "Every week, polish with ",
    "鞋油 + 鞋布": "shoe polish and a shoe cloth",
    "打亮": " until shiny",
    "塞入鞋撐保持形狀": "Use shoe trees to keep their shape",
    "濕鞋陰乾,不可烘乾": "Dry wet shoes in the shade — never with heat",
    "🧦 長襪 / 短襪": "🧦 Long socks / short socks",
    "反面洗,延長壽命": "Wash inside out to make them last longer",
    "深綠色襪避免與淺色衣物同洗": "Do not wash dark green socks with light-coloured clothing",
    "🎖️ 徽章": "🎖️ Badges",
    "縫上後不要常拆": "Do not keep taking them off once they are sewn on",
    "如要更換徽章,用": "To change a badge, use a",
    "拆線刀": "seam ripper",
    "小心拆": " and unpick it carefully",
    "不要用膠水或扣針代替縫線": "Never use glue or safety pins instead of stitching",

    /* 預算參考 */
    "💰 預算參考（家長要準備幾多）": "💰 Budget guide (what parents need to prepare)",
    "跟住上面揀嘅": "Shows the ",
    "升團補購": "top-up for moving up",
    "或": " or ",
    "全新全購": "full new purchase",
    "顯示。唔使睇其他支部嘅全套意思。": " you selected above. There is no need to look at the complete set for other Sections.",
    "⚠️ 約略價（2026 年 9 月）。實際以": "⚠️ Approximate prices (September 2026). The",
    "為準。": " has the final say.",
    "💡 家長只需記：": "💡 Parents only need to remember:",
    "升團 = 只買清單入面「需購買」嗰幾件；全新加入 = 全購該支部制服。沿用嘅唔使再買。": "Moving up = only buy the few items marked “To buy”; joining fresh = buy the whole uniform for that Section. Anything carried over does not need buying again.",
    "總會有": "The Association has a",
    "學生隊員制服資助計劃": "Student Member Uniform Assistance Scheme",
    "(由民政及青年事務局資助,對象為幼童軍、童軍、深資童軍及樂行童軍),可向旅團查詢": " (funded by the Home and Youth Affairs Bureau, for Cub Scouts, Scouts, Venture Scouts and Rover Scouts) — ask your Group",
    "皮鞋合規格可沿用學校皮鞋": "School shoes that meet the specification can be carried over",

    /* 常見穿著錯誤 */
    "⚠️ 常見穿著錯誤": "⚠️ Common uniform mistakes",
    "家長幫子女準備制服時,以下錯誤最常見。記得檢查清楚!": "These are the mistakes parents most often make when preparing a uniform. Do check carefully!",
    "軟帽戴成「廚師帽」": "Beret worn like a chef’s hat",
    "帽後小尾": "The small tail at the back",
    "要塞入帽內": "must be tucked inside",
    ",不可外露翹起": ", never left sticking out",
    "恤衫冇束入褲": "Shirt not tucked in",
    "必須": "Must be ",
    "束入褲/裙內": "tucked into trousers / skirt",
    ",皮帶清楚可見": ", with the belt clearly visible",
    "領巾巾圈位置太低": "Woggle worn too low",
    "巾圈應在": "The woggle should sit at the",
    "喉部": "throat",
    ",不可低於鎖骨": ", never below the collarbone",
    "襪頭冇反摺": "Socks not turned down",
    "長襪必須": "Long socks must be",
    "反摺約 3 厘米": "turned down about 3 cm",
    "成襪邊": " to form a cuff",
    "皮鞋冇擦": "Shoes not polished",
    "集會前": "Before the meeting ",
    "必須擦亮": "they must be polished",
    ",以備檢閱": ", ready for inspection",
    "用扣針/膠水固定徽章": "Badges fixed with pins or glue",
    "用線縫牢": "sewn on with thread",
    ",不可用膠水或扣針": ", never with glue or safety pins",
    "升團後戴舊支部徽章": "Wearing the old Section’s badges after moving up",
    "舊支部的進度性獎章、活動／專科徽章需": "The old Section’s progressive badges and activity / proficiency badges must be",
    "拆走": "removed",
    "；服務年星保留": "; service stars are kept",
    "世界童軍會員章未宣誓就戴": "Wearing the World Scout Membership Badge before investiture",
    "世界童軍會員章": "World Scout Membership Badge",
    "只可於宣誓後佩戴": "may only be worn after investiture",
    "皮帶扣位置偏歪": "Belt buckle off centre",
    "皮帶扣必須": "The buckle must sit",
    "置於正中": "at the centre",
    ",不可掛多餘匙扣": ", with no extra key rings",
    "穿運動短襪/船襪": "Wearing sports socks / invisible socks",
    "長襪(幼童軍/童軍)或短襪(深資/樂行/領袖)": "long socks (Cub / Scout) or short socks (Venture / Rover / Leader)",

    /* 徽章完全手冊 */
    "🎖️ 徽章完全手冊": "🎖️ Complete badge manual",
    "童軍制服上的徽章有不同意思,以下是常見徽章的佩戴位置及頒發來源:": "Badges on the Scout uniform each mean something different; here is where the common badges are worn and where they come from:",
    "徽章": "Badge",
    "佩戴位置": "Where worn",
    "頒發／購買": "Issued / purchased",
    "備註": "Remarks",
    "左胸袋中央": "Centre of the left breast pocket",
    "供應社購買": "Bought at the Scout Shop",
    "；如有和平使者章則以其取代": "; if you hold the Messenger of Peace badge, it replaces it",
    "香港章": "Hong Kong Badge",
    "左胸袋上方": "Above the left breast pocket",
    "所有支部統一位置（2023 年 4 月起）": "Same position in every Section (from April 2023)",
    "服務年星": "Service star",
    "左胸袋上方（香港章旁）": "Above the left breast pocket (next to the Hong Kong Badge)",
    "由旅團頒發／供應社購買": "Presented by the Group / bought at the Scout Shop",
    "每年 1 個，代表年資，升團後保留": "One per year, showing length of service; kept when you move up",
    "地域章": "Region badge",
    "右袖": "Right sleeve",
    "供應社購買／旅團代購": "Bought at the Scout Shop / ordered through the Group",
    "港島、九龍、東九龍、新界、新界東": "Hong Kong Island, Kowloon, East Kowloon, New Territories, New Territories East",
    "區章": "District badge",
    "右袖，地域章上方": "Right sleeve, above the Region badge",
    "每區一款": "One design per District",
    "旅章": "Group badge",
    "右袖最上": "Top of the right sleeve",
    "由旅團頒發": "Presented by the Group",
    "代表所屬旅": "Stands for your Group",
    "小隊章": "Patrol badge",
    "只有童軍支部有；供應社購買毋須出示文件": "Only the Scout Section has one; bought at the Scout Shop with no documents required",
    "進度性獎章及支部最高獎章": "Progressive badges and the Section top award",
    "右胸袋中央": "Centre of the right breast pocket",
    "供應社購買（須出示證書）": "Bought at the Scout Shop (certificate required)",
    "幼童軍：金紫荊獎章／童軍：總領袖獎章／深資：榮譽童軍獎章／樂行：貝登堡獎章": "Cub: Golden Bauhinia Award / Scout: Chief Scout’s Award / Venture: Dragon Scout Award / Rover: Baden-Powell Award",
    "金紫荊獎章": "Golden Bauhinia Award",
    "總會審批簽發": "Approved and issued by the Association",
    "幼童軍支部最高獎章": "The Cub Scout Section’s top award",
    "。升童軍後可購買「金紫荊獎章標誌」（出示證書副本）戴於右胸袋上方": ". After moving up to Scout you may buy the “Golden Bauhinia Award insignia” (on production of a copy of the certificate) and wear it above the right breast pocket",
    "總領袖獎章": "Chief Scout’s Award",
    "青少年活動署送贈，供應社代派": "Presented by the Youth Programme Department, distributed by the Scout Shop",
    "童軍支部最高獎章": "The Scout Section’s top award",
    "榮譽童軍獎章": "Dragon Scout Award",
    "深資童軍支部最高獎章": "The Venture Scout Section’s top award",
    "。持有人任領袖可終身戴榮譽童軍領袖標誌": ". Holders may wear the Dragon Scout Leader’s insignia for life if they become Leaders",
    "貝登堡獎章": "Baden-Powell Award",
    "樂行童軍支部最高獎章": "The Rover Scout Section’s top award",
    "。持有人任領袖可戴貝登堡領袖標誌": ". Holders may wear the Baden-Powell Leader’s insignia if they become Leaders",
    "童軍先修章": "Scout Link Award",
    "右胸袋上方": "Above the right breast pocket",
    "年滿 10 歲半的幼童軍可考，為升童軍做準備": "Cub Scouts aged 10½ or over may take it, to prepare for moving up to Scout",
    "深資童軍先修章": "Venture Scout Link Award",
    "年滿 14 歲半的童軍可考，為升深資做準備": "Scouts aged 14½ or over may take it, to prepare for moving up to Venture",
    "活動徽章／專科徽章": "Activity badges / proficiency badges",
    "左袖": "Left sleeve",
    "幼童軍活動徽章／童軍專科徽章": "Cub Scout activity badges / Scout proficiency badges",
    "深資童軍段章及金帶": "Venture Scout stage badges and gold cords",
    "責任、自立、活動、探險": "Responsibility, Self-reliance, Activity, Exploration",
    "隊長章／副隊長章": "Patrol Leader / Assistant Patrol Leader badge",
    "左胸袋，會員章下方": "Left breast pocket, below the Membership badge",
    "2023 年 4 月起統一位置": "Same position from April 2023",
    "職級肩章": "Rank epaulettes",
    "兩肩肩帶": "Both shoulder straps",
    "供應社購買（獲委任後）": "Bought at the Scout Shop (after appointment)",
    "視乎委任職級": "Depends on the rank appointed",
    "香港肩章／旅章": "Hong Kong shoulder badge / Group badge",
    "肩帶／右袖": "Shoulder strap / right sleeve",
    "供應社購買／旅團頒發": "Bought at the Scout Shop / presented by the Group",
    "總會、地域、區級領袖戴香港肩章；旅團領袖戴旅章": "Leaders at Association, Region and District level wear the Hong Kong shoulder badge; Group Leaders wear the Group badge",
    "總會總部章／地域章／區章": "HQ badge / Region badge / District badge",
    "視乎服務單位": "Depends on your service unit",
    "徽章佩戴基本原則（青少年活動通告第 13/2023 號）：": "Basic rules for wearing badges (Youth Programme Circular No. 13/2023):",
    "左胸袋": "Left breast pocket",
    "：會員章／和平使者章、隊長章": ": Membership badge / Messenger of Peace badge, Patrol Leader badge",
    "右胸袋": "Right breast pocket",
    "：支部進度性獎章及最高獎章、服務獎章、領導才獎章": ": Section progressive badges and top award, service awards, leadership awards",
    "：香港章、服務年星": ": Hong Kong Badge, service stars",
    "：宗教章、紀念章、支部最高獎章標誌、先修章": ": religious badge, commemorative badges, Section top award insignia, Link Awards",
    "：活動徽章、專科徽章、段章及金帶、海上／航空活動徽章、急救章": ": activity badges, proficiency badges, stage badges and gold cords, Water / Air activity badges, first aid badge",
    "：旅章、區章、地域章、世界童軍組織獎章、小隊章、優異旅團章": ": Group, District and Region badges, WOSM awards, patrol badge, Excellent Group badge",
    "必須用線縫牢": "Must be sewn on with thread",
    "，不可用膠水或扣針": ", never with glue or safety pins",

    /* 領袖常規制服 */
    "👔 領袖常規制服（編號 3）— 陸／海／空": "👔 Leader’s ordinary uniform (No. 3) — Land / Sea / Air",
    "新任領袖通常只需買": "A new Leader normally only needs to buy the ",
    "常規制服（編號 3）": "ordinary uniform (No. 3)",
    "一款已足夠日常集會。以下為香港童軍總會官網（中文版）列出的規格：": " for everyday meetings. The specifications listed on the Scout Association of Hong Kong website (Chinese version) are:",
    "陸童軍領袖": "Land Scout Leader",
    "海童軍領袖": "Sea Scout Leader",
    "空童軍領袖": "Air Scout Leader",
    "帽": "Cap",
    "男：深綠色軟帽": "Male: dark green beret",
    "女：深綠色金邊硬帽": "Female: dark green peaked hat with gold braid",
    "（連職級帽章）": " (with the rank cap badge)",
    "海童軍男／女領袖白頂帽": "Sea Scout white-top cap (male / female Leaders)",
    "（連海童軍領袖帽章）": " (with the Sea Scout Leader cap badge)",
    "灰藍色軟帽": "Grey-blue beret",
    "恤衫": "Shirt",
    "杏色、短袖、兩胸袋、無褶、肩帶": "Beige, short sleeve, two breast pockets, no pleats, shoulder straps",
    "白色、短袖、兩胸袋、無褶、肩帶": "White, short sleeve, two breast pockets, no pleats, shoulder straps",
    "淺藍色、短袖、兩胸袋、無褶、肩帶": "Light blue, short sleeve, two breast pockets, no pleats, shoulder straps",
    "下身": "Lower garment",
    "男：草青色長褲": "Male: olive green trousers",
    "女：草青色半截裙（及膝）": "Female: olive green skirt (knee length)",
    "男：深藍色長褲": "Male: navy blue trousers",
    "女：深藍色半截裙（及膝）": "Female: navy blue skirt (knee length)",
    "皮帶": "Belt",
    "棕色（連童軍徽皮帶扣）": "Brown (with the Scout emblem buckle)",
    "襪": "Socks",
    "男：黑色短襪／女：肉色尼龍襪褲": "Male: black short socks / female: flesh-coloured nylon pantyhose",
    "男：黑色無花紋綁帶／女：黑色無花紋非綁帶中跟": "Male: black plain lace-up / female: black plain mid-heel, no laces",
    "領巾": "Neckerchief",
    "陸：領巾（連童軍巾圈）": "Land: neckerchief (with the Scout woggle)",
    "海／空：旅巾（連童軍巾圈）": "Sea / Air: Group scarf (with the Scout woggle)",
    "世界童軍會員章、香港章、香港肩章／旅章、總會總部章／地域章／區章、職級肩章": "World Scout Membership Badge, Hong Kong Badge, Hong Kong shoulder badge / Group badge, HQ / Region / District badge, rank epaulettes",
    "領帶（只限編號 4 領帶制服）": "Tie (only with the No. 4 tie uniform)",
    "深綠色": "Dark green",
    "黑色": "Black",
    "深藍色": "Navy blue",
    "其他款式：編號 1 禮服（典禮）、編號 2 晚禮服（領袖聚餐）、編號 4 領帶制服、編號 5 男領袖短褲制服（深草青色／深藍色長襪）、編號 6 女領袖長褲制服（深綠色軟帽＋長褲＋黑色短襪）。": "Other orders of dress: No. 1 ceremonial dress (ceremonies), No. 2 evening dress (Leader dinners), No. 4 tie uniform, No. 5 male Leader’s shorts uniform (dark olive / navy long socks), No. 6 female Leader’s trouser uniform (dark green beret + trousers + black short socks).",

    /* 海童軍 / 空童軍 簡介 */
    "🌊 海童軍 / ✈️ 空童軍 簡介": "🌊 Sea Scout / ✈️ Air Scout — introduction",
    "根據香港童軍總會，青少年成員由童軍支部起有": "According to the Scout Association of Hong Kong, from the Scout Section onwards youth members are divided into",
    "童軍、海童軍及空童軍": "Scout, Sea Scout and Air Scout",
    "之分；深資、樂行及領袖同樣分陸、海、空。制服顏色各有不同，但徽章位置相同。": "; Venture, Rover and Leader are likewise divided into Land, Sea and Air. The uniform colours differ, but the badge positions are the same.",
    "🌊 海童軍": "🌊 Sea Scout",
    "帽：": "Cap: ",
    "童軍支部——海童軍白頂帽（連海童軍帽帶）；深資／樂行／領袖——海童軍男／女領袖白頂帽（連相應帽章）": "Scout Section — Sea Scout white-top cap (with the Sea Scout cap band); Venture / Rover / Leader — Sea Scout white-top cap for male / female Leaders (with the matching cap badge)",
    "恤衫：": "Shirt: ",
    "下身：": "Lower garment: ",
    "童軍——深藍色短褲／裙褲；深資以上——深藍色長褲／半截裙": "Scout — navy blue shorts / culottes; Venture and above — navy blue trousers / skirt",
    "襪：": "Socks: ",
    "童軍——深藍色長襪；深資以上——男黑色短襪／女肉色襪褲": "Scout — navy blue long socks; Venture and above — male black short socks / female flesh-coloured pantyhose",
    "訓練特色：": "Training focus: ",
    "童軍必須選修「海上活動」（艇工章、水手章、水手長章）。": "Scouts must take “Water Activities” (Boatman, Seaman and Boatswain badges).",
    "✈️ 空童軍": "✈️ Air Scout",
    "灰藍色軟帽（青少年連童軍帽章；領袖連職級帽章）": "Grey-blue beret (youth members with the Scout cap badge; Leaders with their rank cap badge)",
    "童軍必須選修「航空活動」（初級／中級／高級航空活動章）。": "Scouts must take “Air Activities” (Elementary / Intermediate / Advanced Air Activity badges).",
    "上方「制服清單」已可直接揀陸／海／空，會自動比較原本與升去的制服。": "You can pick Land / Sea / Air directly in the uniform checklist above; it compares your current uniform with the one you are moving to.",

    /* 常見問題 */
    "常見問題": "Frequently asked questions",
    "升童軍時哪些物品一定要換新?": "What must be replaced when moving up to Scout?",
    "一定要換：": "Must be replaced: ",
    "帽及帽章、巾圈": "the cap and cap badge, and the woggle",
    "（陸：深綠色軟帽＋童軍帽章；海：海童軍白頂帽；空：灰藍色軟帽）。恤衫、短褲／裙褲、皮帶、長襪、皮鞋與幼童軍同款可沿用（升海／空則恤衫、下身、長襪要換色）。舊支部的進度性獎章、活動徽章要拆走，": " (Land: dark green beret + Scout cap badge; Sea: Sea Scout white-top cap; Air: grey-blue beret). The shirt, shorts / culottes, belt, long socks and shoes are the same model as for Cub Scouts and can be carried over (moving to Sea / Air means the shirt, lower garment and long socks change colour). The old Section’s progressive badges and activity badges must be removed, but the",
    "服務年星、世界童軍會員章、香港章、地域章、區章、旅章": "service stars, World Scout Membership Badge, Hong Kong Badge, Region, District and Group badges",
    "保留。": " are kept.",
    "升深資童軍時哪些物品一定要換新?": "What must be replaced when moving up to Venture Scout?",
    "（陸：棗紅色軟帽；海：海童軍領袖白頂帽＋深資海童軍帽章；空：灰藍色軟帽同款可沿用）及": " (Land: maroon beret; Sea: Sea Scout Leader white-top cap + Venture Sea Scout cap badge; Air: the grey-blue beret is the same model and can be carried over) and",
    "下身改穿長褲／半截裙": "change to trousers / skirt",
    "、": ", ",
    "（男：黑色短襪；女：肉色襪褲＋黑色中跟皮鞋）。杏色恤衫、皮帶、旅巾、童軍巾圈、童軍帽章可沿用。拆走童軍的進度性獎章、專科徽章、小隊章，": " (male: black short socks; female: flesh-coloured pantyhose + black mid-heel shoes). The beige shirt, belt, Group scarf, Scout woggle and Scout cap badge can be carried over. Remove the Scout progressive badges, proficiency badges and patrol badge, but the",
    "升樂行童軍時哪些物品一定要換新?": "What must be replaced when moving up to Rover Scout?",
    "陸：只把": "Land: only",
    "棗紅色軟帽換成深綠色軟帽": "swap the maroon beret for the dark green beret",
    "（童軍帽章可移過去）；海：白頂帽可沿用，官方手冊將": " (the Scout cap badge can be transferred); Sea: the white-top cap can be carried over, and the official handbook lists the",
    "深資／樂行海童軍帽章": "Venture and Rover Sea Scout cap badges",
    "列為同一款，升團前向旅團確認；空：全部同款可沿用。其餘恤衫、長褲／半截裙、皮帶、襪、皮鞋、旅巾、巾圈全部可沿用。拆走深資童軍肩章、段章及金帶、深資童軍獎章。": " as the same design — check with your Group before moving up; Air: everything is the same model and can be carried over. The rest of the items (shirt, trousers / skirt, belt, socks, shoes, Group scarf and woggle) can all be carried over. Remove the Venture Scout shoulder badge, stage badges and gold cords, and the Venture Scout Award.",
    "升任領袖時哪些物品一定要換新?": "What must be replaced when becoming a Leader?",
    "基本沿用原有制服，另加購": "Your existing uniform is basically carried over; you also need to buy the",
    "職級帽章": "rank cap badge",
    "及": " and the",
    "（視乎獲委任職級，向旅團查詢）；女領袖（陸）改用": " (depending on the rank appointed — ask your Group); female Leaders (Land) change to the",
    "深綠色金邊硬帽": "dark green peaked hat with gold braid",
    "，男領袖（陸）如由深資升任，棗紅色軟帽要換深綠色軟帽。深資／樂行（陸／空）的恤衫、長褲／半截裙、皮帶、襪、皮鞋、旅巾可沿用。": "; male Leaders (Land) promoted from Venture must swap the maroon beret for the dark green beret. The shirt, trousers / skirt, belt, socks, shoes and Group scarf from Venture / Rover (Land / Air) can be carried over.",
    "小童軍的服裝規定是什麼?": "What are the dress rules for Grasshopper Scouts?",
    "總會官網列明：小童軍服裝": "The Association website states that Grasshopper Scout dress",
    "只設領巾及簡單整齊的集會服裝": "consists only of a neckerchief and simple, tidy meeting dress",
    "——": " — ",
    "橙色小童軍活動服": "the orange Grasshopper Scout activity shirt",
    "或單色有領／圓領上衣、": " or a plain-coloured shirt with a collar or a round neck,",
    "單色短褲或長褲、運動鞋": "plain-coloured shorts or long trousers, and sports shoes",
    "；已宣誓小童軍佩戴": "; invested Grasshopper Scouts wear",
    "小童軍團員章＋旅巾（連顏色巾圈）": "the Grasshopper Scout membership badge + Group scarf (with a colour woggle)",
    "。旅團可安排自家統一服飾，實際以": ". A Group may arrange its own uniform dress, so in practice the",
    "所屬旅團安排": "arrangement of your own Group",
    "為準。注意：除顏色巾圈外，小童軍不可使用其他支部制服配件（例如皮帶、制服帽）。": " prevails. Note: apart from a colour woggle, Grasshopper Scouts may not use uniform accessories from other Sections (for example belts or uniform caps).",
    "領袖制服有幾款?怎樣分?": "How many orders of Leader uniform are there, and how do they differ?",
    "香港童軍總會成年成員制服共 6 個編號：": "The Scout Association of Hong Kong has 6 numbered orders of dress for adult members:",
    "編號 1 禮服": "No. 1 ceremonial dress",
    "：典禮儀式（會操、周年會議、就職禮等）": ": ceremonies (parades, annual meetings, investiture ceremonies and so on)",
    "編號 2 晚禮服": "No. 2 evening dress",
    "：童軍領袖聚餐及餐舞會": ": Scout Leader dinners and dinner dances",
    "編號 3 常規制服": "No. 3 ordinary uniform",
    "：日常集會（新任領袖先買這款）": ": everyday meetings (the first one a new Leader buys)",
    "編號 4 領帶制服": "No. 4 tie uniform",
    "：以領帶代替領巾": ": a tie worn instead of the Group scarf",
    "編號 5 男性成員短褲制服": "No. 5 male member’s shorts uniform",
    "編號 6 女性成員長褲制服": "No. 6 female member’s trouser uniform",
    "每款再分": "Each order of dress is further divided into",
    "三種顏色。": " three colour versions.",
    "海童軍 / 空童軍的制服有什麼不同?": "How do the Sea Scout and Air Scout uniforms differ?",
    "海童軍：白頂帽 + 白色恤衫 + 深藍色短褲／裙褲（童軍）或長褲／半截裙（深資以上）。空童軍：灰藍色軟帽 + 淺藍色恤衫 + 深藍色下身。徽章位置相同。在上方步驟 ② 揀「海童軍」或「空童軍」即可看到對應清單。": "Sea Scout: white-top cap + white shirt + navy blue shorts / culottes (Scout) or trousers / skirt (Venture and above). Air Scout: grey-blue beret + light blue shirt + navy blue lower garment. The badge positions are the same. Pick “Sea” or “Air” in step ② above to see the matching checklist.",
    "「世界童軍會員章」、「香港章」、「地域章」、「區章」怎樣分辨?": "How do I tell the World Scout Membership Badge, Hong Kong Badge, Region badge and District badge apart?",
    "(紫色):全球通用,代表你是 WOSM 會員。只可於": " (purple): used worldwide, showing that you are a WOSM member. It may only be",
    "宣誓後": " after investiture",
    "佩戴。": ".",
    "(紅底白花):香港總會頒發,所有支部均佩戴。": " (white flower on a red background): issued by the Hong Kong Association, worn in every Section.",
    "：代表所屬地域（港島、九龍、東九龍、新界、新界東）。": ": stands for your Region (Hong Kong Island, Kowloon, East Kowloon, New Territories, New Territories East).",
    ":代表所屬區。": ": stands for your District.",
    "(由旅團頒發):代表所屬旅。": " (presented by the Group): stands for your Group.",
    "地域章、區章、旅章需向": "For the Region, District and Group badges, ask your",
    "所屬旅團": "own Group",
    "查詢購買。": " how to buy them.",
    "有制服資助嗎?": "Is there a uniform subsidy?",
    "有!香港童軍總會設有": "Yes! The Scout Association of Hong Kong runs a",
    "「學生隊員制服資助計劃」": "“Student Member Uniform Assistance Scheme”",
    "(由民政及青年事務局資助),為有經濟需要的": " (funded by the Home and Youth Affairs Bureau) providing uniform and accessory assistance to",
    "幼童軍、童軍、深資童軍、樂行童軍": "Cub Scouts, Scouts, Venture Scouts and Rover Scouts",
    "隊員提供制服及配件資助(領袖及小童軍不適用)。詳情可向所屬旅團領袖查詢，或於總會官網「表格」頁下載申請表。": " in financial need (not available to Leaders or Grasshopper Scouts). Ask your Group Leader for details, or download the application form from the “Forms” page of the Association website.",

    /* Footer */
    "© 2026 Scout System · 童軍準備指南": "© 2026 Scout System · Scout Uniform Guide",
    "制服資料來源:香港童軍總會": "Uniform data source: Scout Association of Hong Kong ",
    "制服購買:香港童軍物品供應社(SCOUT SHOP)": "Uniform purchases: Hong Kong Scout Shop (SCOUT SHOP) ",
    "《儀容與制服手冊》:": "Uniform Handbook:",
    "本 APP 為非官方輔助工具。制服規格以香港童軍總會官網（中文版）、《儀容與制服手冊》及各支部《訓練綱要》為準；徽章位置根據青少年活動通告第 13/2023 號。圖片按來源標示；帽章等使用本地官方參考圖，其他款式示意圖不作顏色及細節依據。": "This app is an unofficial aid. Uniform specifications follow the Scout Association of Hong Kong website (Chinese version), the Uniform Handbook and the Training Scheme of each Section; badge positions follow Youth Programme Circular No. 13/2023. Images are credited to their source; cap badges and similar use local official reference images, and other style illustrations are not a guide to colour or detail."
  }
};

/* 掛上英文語言包 */
LOCALES.en = LOCALE_EN;
