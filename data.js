/* ===========================================================
   香港童軍制服準備指南 — 完整資料庫
   資料來源:香港童軍總會《儀容與制服手冊》2025 年版
   =========================================================== */

// 支部基本資料
const SECTIONS = {
  grasshopper: {
    name: "小童軍",
    nameEn: "Grasshopper Scout",
    age: "5.5–8 歲",
    color: "#ff7a1a",
    note: "小童軍支部由 2024 年起實行新指引,沒有指定正式制服。團集會時由所屬小童軍團長規定服裝。",
    upgradeFrom: null,
    upgradeTo: "cub"
  },
  cub: {
    name: "幼童軍",
    nameEn: "Cub Scout",
    age: "7.5–12 歲",
    color: "#5a8f3a",
    upgradeFrom: "grasshopper",
    upgradeTo: "scout"
  },
  scout: {
    name: "童軍",
    nameEn: "Scout",
    age: "12–16 歲",
    color: "#0a5c36",
    upgradeFrom: "cub",
    upgradeTo: "venture"
  },
  venture: {
    name: "深資童軍",
    nameEn: "Venture Scout",
    age: "15–21 歲",
    color: "#7a1f2b",
    upgradeFrom: "scout",
    upgradeTo: "rover"
  },
  rover: {
    name: "樂行童軍",
    nameEn: "Rover Scout",
    age: "18–26 歲",
    color: "#0a3a5c",
    upgradeFrom: "venture",
    upgradeTo: "leader"
  },
  leader: {
    name: "領袖",
    nameEn: "Leader",
    age: "成年成員",
    color: "#3a3a3a",
    upgradeFrom: "rover",
    upgradeTo: null
  }
};

// 各支部帽款
const CAPS = {
  grasshopper: { type: "none", desc: "無指定制服帽" },
  cub_m: { name: "綠色黃間條鴨舌帽", desc: "綠色、黃間條、鴨舌帽(連帽章)", img: "cap-cub-m" },
  cub_f: { name: "綠色圓頂闊邊帽", desc: "綠色、圓形、有邊、後面蝴蝶結(連帽章)", img: "cap-cub-f" },
  scout_m: { name: "深綠色軟帽(男)", desc: "深綠色軟帽(連童軍帽章)", img: "cap-scout" },
  scout_f: { name: "深綠色軟帽(女)", desc: "深綠色軟帽(連童軍帽章)", img: "cap-scout" },
  venture_m: { name: "棗紅色軟帽(男)", desc: "棗紅色軟帽(連深資童軍帽章)", img: "cap-venture" },
  venture_f: { name: "棗紅色軟帽(女)", desc: "棗紅色軟帽(連深資童軍帽章)", img: "cap-venture" },
  rover_m: { name: "深綠色軟帽(男)", desc: "深綠色軟帽(連童軍帽章)", img: "cap-scout" },
  rover_f: { name: "深綠色軟帽(女)", desc: "深綠色軟帽(連童軍帽章)", img: "cap-scout" },
  leader_m: { name: "深綠色軟帽(男領袖)", desc: "深綠色軟帽(連職級帽章)", img: "cap-leader-m" },
  leader_f: { name: "深綠色金邊硬帽(女領袖)", desc: "深綠色金邊硬帽(連職級帽章)", img: "cap-leader-f" }
};

// 各支部完整制服清單
const UNIFORMS = {

  /* ─────────────── 小童軍 (無指定制服) ─────────────── */
  grasshopper: {
    new: {
      male: [
        { id:"gh-clothes", title:"集會服裝", desc:"由所屬小童軍團長規定", status:"check", icon:"👕",
          detail:`<h4>小童軍集會服裝</h4>
            <p>小童軍支部由 2024 年起實行新指引,<strong>沒有指定正式制服</strong>。一般要求:</p>
            <ul>
              <li><strong>上衣</strong>:橙色小童軍活動服;或單色、有領/圓領、短袖/長袖上衣</li>
              <li><strong>褲</strong>:單色、短褲或長褲</li>
              <li><strong>帽(非必須)</strong>:單色、闊邊漁夫帽或鴨咀帽(棒球帽)</li>
              <li><strong>襪</strong>:單色、短襪或長襪</li>
              <li><strong>鞋</strong>:運動鞋</li>
              <li><strong>背心/風褸(非必須)</strong>:簡單款式,佩戴小童軍團員章在左胸前</li>
            </ul>
            <div class="tip">已宣誓小童軍可佩戴<strong>小童軍團員章 + 旅巾</strong>。未宣誓只可佩戴旅章、區章(如有)。</div>` },
        { id:"gh-scarf", title:"旅巾", desc:"由所屬旅團提供", status:"check", icon:"🧣",
          detail:`<h4>旅巾</h4>
            <p><strong>由小童軍團長提供</strong>,宣誓後才可佩戴。假若穿著有領上衣,旅巾在衣領外,使用<strong>顏色巾圈</strong>固定。</p>` },
        { id:"gh-badge", title:"小童軍團員章", desc:"宣誓後佩戴", status:"check", icon:"🎖️",
          detail:`<h4>小童軍團員章</h4>
            <p>佩戴在<strong>上衣左胸前</strong>位置。進步獎章佩戴在<strong>短袖上衣左袖縫線上方中央位置</strong>或長袖上衣相同位置。</p>
            <div class="tip">除上列徽章外,不可佩戴其他徽章。除顏色巾圈外,不可使用其他支部制服配件。</div>` }
      ],
      female: [
        { id:"gh-f-clothes", title:"集會服裝", desc:"由所屬小童軍團長規定", status:"check", icon:"👕",
          detail:`<h4>小童軍集會服裝</h4>
            <p>與男團員規格相同。小童軍支部由 2024 年起實行新指引,沒有指定正式制服。一般要求:橙色小童軍活動服或單色上衣、單色短褲或長褲、運動鞋。</p>
            <div class="tip">已宣誓小童軍可佩戴<strong>小童軍團員章 + 旅巾</strong>。</div>` },
        { id:"gh-f-scarf", title:"旅巾", desc:"由所屬旅團提供", status:"check", icon:"🧣",
          detail:`<h4>旅巾</h4>
            <p>由小童軍團長提供,宣誓後才可佩戴。</p>` },
        { id:"gh-f-badge", title:"小童軍團員章", desc:"宣誓後佩戴", status:"check", icon:"🎖️",
          detail:`<h4>小童軍團員章</h4>
            <p>佩戴在<strong>上衣左胸前</strong>位置。進步獎章佩戴在<strong>短袖上衣左袖縫線上方中央位置</strong>。</p>` }
      ]
    },
    upgrade: {
      male: null,
      female: null
    }
  },

  /* ─────────────── 幼童軍 ─────────────── */
  cub: {
    new: {
      male: [
        { id:"cub-m-cap", title:"綠色黃間條鴨舌帽", desc:"幼童軍男團員指定帽款", status:"need", icon:"🧢",
          detail:`<h4>幼童軍帽(男)</h4>
            <p><strong>規格:</strong>綠色、黃間條、鴨舌帽(連帽章)</p>
            <ul>
              <li>向後拉平,緊貼頭部</li>
              <li>帽章戴在<strong>左眼正上方</strong></li>
              <li>由香港童軍物品供應社購買</li>
            </ul>` },
        { id:"cub-m-cap-badge", title:"幼童軍帽章", desc:"金屬帽章", status:"need", icon:"🎖️",
          detail:`<h4>幼童軍帽章</h4>
            <p>金屬幼童軍帽章,縫於帽上。帽章必須戴在<strong>左眼正上方</strong>。</p>` },
        { id:"cub-m-shirt", title:"杏色短袖恤衫", desc:"兩胸袋、無褶、肩帶", status:"need", icon:"👕",
          detail:`<h4>杏色恤衫</h4>
            <p>杏色、短袖、兩胸袋、無褶、肩帶(冬天可穿長袖恤)</p>
            <ul>
              <li>建議買大一碼——童軍成長快,恤衫必須束入褲內</li>
              <li>保持燙平,戴領巾時最頂鈕要扣</li>
              <li><strong>徽章位置(幼童軍):</strong></li>
              <li>世界童軍會員章:左胸袋中央(只可於宣誓後佩戴)</li>
              <li>香港章:左胸袋蓋上,世界童軍會員章上方 3 厘米</li>
              <li>地域章:右袖</li>
              <li>區章、旅章:右袖(由旅團頒發)</li>
            </ul>
            <div class="tip">必須用線縫牢,不可用膠水或扣針。</div>` },
        { id:"cub-m-shorts", title:"草青色短褲", desc:"男團員", status:"need", icon:"🩳",
          detail:`<h4>短褲(男團員)</h4>
            <p>草青色、兩斜袋、兩後袋、有褶</p>
            <ul>
              <li>穿在腰位(非臀部),配棕色皮帶</li>
              <li>長度在膝蓋以上</li>
            </ul>` },
        { id:"cub-m-belt", title:"棕色皮帶(連童軍徽皮帶扣)", desc:"配童軍徽皮帶扣", status:"need", icon:"👔",
          detail:`<h4>棕色皮帶</h4>
            <p>棕色皮帶(連童軍徽皮帶扣)</p>
            <ul>
              <li>皮帶扣置於正中</li>
              <li>保持清潔,不可掛多餘匙扣</li>
            </ul>` },
        { id:"cub-m-socks", title:"深草青色長襪", desc:"及膝直坑紋", status:"need", icon:"🧦",
          detail:`<h4>深草青色長襪</h4>
            <p>深草青色、直坑紋、襪頭摺下</p>
            <ul>
              <li>拉至膝蓋下,反摺約 3 厘米成襪邊</li>
              <li>不可穿運動短襪或船襪</li>
            </ul>` },
        { id:"cub-m-shoes", title:"黑色無花紋綁帶皮鞋", desc:"低筒、平底", status:"need", icon:"👞",
          detail:`<h4>黑色皮鞋</h4>
            <p>黑色、無花紋、縛帶、低筒、平底</p>
            <ul>
              <li>必須可擦亮的皮鞋</li>
              <li>集會前要擦亮,以備檢閱</li>
              <li>學校皮鞋如合規格可沿用</li>
            </ul>` },
        { id:"cub-m-scarf", title:"旅巾", desc:"由旅團頒發", status:"check", icon:"🧣",
          detail:`<h4>旅巾</h4>
            <p>新隊員的旅巾將於<strong>會員章考核通過後</strong>由旅團頒發。</p>
            <ul>
              <li>旅巾戴在<strong>恤衫領外</strong></li>
              <li>由長邊捲起,摺出 5 摺——巾圈上 2 摺、下 3 摺</li>
              <li>巾圈位於喉部,不可太低</li>
            </ul>` },
        { id:"cub-m-woggle", title:"幼童軍塑膠巾圈", desc:"塑膠圓環", status:"check", icon:"⭕",
          detail:`<h4>幼童軍塑膠巾圈</h4>
            <p>塑膠幼童軍巾圈,用於固定旅巾。需向<strong>所屬小童軍團長</strong>查詢安排。</p>` },
        { id:"cub-m-badges", title:"基本徽章", desc:"世界童軍會員章、香港章、地域章、區章", status:"need", icon:"🎖️",
          detail:`<h4>基本徽章(幼童軍)</h4>
            <p>必須購買:<strong>世界童軍會員章、香港章、地域章、區章</strong></p>
            <p><strong>旅章</strong>由旅團頒發,無需自行購買。</p>
            <ul>
              <li>世界童軍會員章:左胸袋中央(只可於宣誓後佩戴)</li>
              <li>香港章:左胸袋蓋上,世界童軍會員章上方 3 厘米</li>
              <li>地域章:右袖</li>
              <li>區章:右袖,地域章下方</li>
              <li>旅章:右袖(由旅團頒發)</li>
            </ul>
            <div class="tip">必須用線縫牢,不可用膠水或扣針。<br>地域章、區章、旅章需向所屬旅團查詢購買。</div>` }
      ],
      female: [
        { id:"cub-f-cap", title:"綠色圓頂闊邊帽", desc:"幼童軍女團員指定帽款", status:"need", icon:"👒",
          detail:`<h4>幼童軍帽(女)</h4>
            <p><strong>規格:</strong>綠色、圓形、有邊、後面蝴蝶結(連帽章)</p>
            <ul>
              <li>帽章戴在<strong>左眼正上方</strong></li>
              <li>由香港童軍物品供應社購買</li>
            </ul>` },
        { id:"cub-f-cap-badge", title:"幼童軍帽章", desc:"金屬帽章", status:"need", icon:"🎖️",
          detail:`<h4>幼童軍帽章</h4>
            <p>金屬幼童軍帽章,縫於帽上。</p>` },
        { id:"cub-f-shirt", title:"杏色短袖恤衫", desc:"兩胸袋、無褶、肩帶", status:"need", icon:"👕",
          detail:`<h4>杏色恤衫</h4>
            <p>杏色、短袖、兩胸袋、無褶、肩帶(冬天可穿長袖恤)——<strong>與男團員相同款式</strong>。</p>
            <ul>
              <li>必須束入裙褲內,皮帶要清楚可見</li>
              <li>徽章位置與男團員相同</li>
            </ul>` },
        { id:"cub-f-culottes", title:"草青色裙褲(culottes)", desc:"女團員", status:"need", icon:"👗",
          detail:`<h4>裙褲(女團員)</h4>
            <p>草青色、側袋、弓字褶</p>
            <ul>
              <li>配皮帶,長度要端莊</li>
              <li>外觀像裙,但褲管分明方便活動</li>
            </ul>` },
        { id:"cub-f-belt", title:"棕色皮帶(連童軍徽皮帶扣)", desc:"配童軍徽皮帶扣", status:"need", icon:"👔",
          detail:`<h4>棕色皮帶</h4>
            <p>與男團員規格相同。</p>` },
        { id:"cub-f-socks", title:"深草青色長襪", desc:"及膝直坑紋", status:"need", icon:"🧦",
          detail:`<h4>深草青色長襪</h4>
            <p>深草青色、直坑紋、襪頭摺下——與男團員規格相同。</p>` },
        { id:"cub-f-shoes", title:"黑色無花紋綁帶皮鞋", desc:"低筒、平底", status:"need", icon:"👞",
          detail:`<h4>黑色皮鞋</h4>
            <p>與男團員規格相同:黑色、無花紋、縛帶、低筒、平底。</p>` },
        { id:"cub-f-scarf", title:"旅巾", desc:"由旅團頒發", status:"check", icon:"🧣",
          detail:`<h4>旅巾</h4>
            <p>由旅團頒發,會員章考核通過後發給。</p>` },
        { id:"cub-f-woggle", title:"幼童軍塑膠巾圈", desc:"塑膠圓環", status:"check", icon:"⭕",
          detail:`<h4>幼童軍塑膠巾圈</h4>
            <p>由所屬旅團查詢安排。</p>` },
        { id:"cub-f-badges", title:"基本徽章", desc:"世界童軍會員章、香港章、地域章、區章", status:"need", icon:"🎖️",
          detail:`<h4>基本徽章(幼童軍)</h4>
            <p>與男團員規格相同,佩戴位置不變。</p>` }
      ]
    },
    upgrade: {
      // 由小童軍升幼童軍 — 小童軍原本就無制服,所以等同「全新加入」
      male: null,
      female: null
    }
  },

  /* ─────────────── 童軍 ─────────────── */
  scout: {
    new: {
      male: [
        { id:"scout-m-cap", title:"深綠色軟帽", desc:"童軍男團員指定帽款", status:"need", icon:"🧢",
          detail:`<h4>深綠色軟帽</h4>
            <p>深綠色軟帽(連童軍帽章)</p>
            <ul>
              <li>向右拉平,緊貼頭部,不可鬆垮</li>
              <li>帽後小尾要塞入帽內,切勿外露(不可戴成「廚師帽」)</li>
              <li>首次使用前先弄濕定型,戴上塑出頭形</li>
              <li>帽章戴在<strong>左眼正上方</strong></li>
            </ul>
            <div class="warn">幼童軍升團注意:必須更換,不可再戴幼童軍黃邊帽。</div>` },
        { id:"scout-m-cap-badge", title:"童軍帽章", desc:"金屬帽章", status:"need", icon:"🎖️",
          detail:`<h4>童軍帽章</h4>
            <p>金屬童軍帽章,縫於軟帽上。需另行購買。</p>
            <div class="warn">幼童軍升團:需更換為童軍帽章。</div>` },
        { id:"scout-m-shirt", title:"杏色短袖恤衫", desc:"兩胸袋、無褶、肩帶", status:"need", icon:"👕",
          detail:`<h4>杏色恤衫</h4>
            <p>杏色、短袖、兩胸袋、無褶、肩帶</p>
            <ul>
              <li>建議買大一碼——童軍成長快,恤衫必須束入褲內</li>
              <li>必須束入褲/裙內,皮帶要清楚可見</li>
              <li>保持燙平,戴領巾時最頂鈕要扣</li>
              <li><strong>徽章位置(童軍):</strong></li>
              <li>世界童軍會員章:左胸袋中央(只可於宣誓後佩戴)</li>
              <li>香港章:左胸袋蓋上,世界童軍會員章上方 3 厘米</li>
              <li>地域章、區章:右袖(地域章在前,區章在後)</li>
              <li>旅章、小隊章:右袖上方位置(由旅團頒發)</li>
            </ul>
            <div class="tip">必須用線縫牢,不可用膠水或扣針。</div>` },
        { id:"scout-m-shorts", title:"草青色短褲", desc:"男團員", status:"need", icon:"🩳",
          detail:`<h4>短褲(男團員)</h4>
            <p>草青色、兩斜袋、兩後袋、有褶</p>
            <ul>
              <li>穿在腰位(非臀部),配棕色皮帶</li>
              <li>長度在膝蓋以上</li>
            </ul>` },
        { id:"scout-m-belt", title:"棕色皮帶(連童軍徽皮帶扣)", desc:"配童軍徽皮帶扣", status:"need", icon:"👔",
          detail:`<h4>棕色皮帶</h4>
            <p>棕色皮帶(連童軍徽皮帶扣)。皮帶扣置於正中,不可掛多餘匙扣。</p>` },
        { id:"scout-m-socks", title:"深草青色長襪", desc:"及膝", status:"need", icon:"🧦",
          detail:`<h4>深草青色長襪</h4>
            <p>深草青色及膝襪。拉至膝蓋下,反摺約 3 厘米成襪邊。</p>` },
        { id:"scout-m-shoes", title:"黑色無花紋綁帶皮鞋", desc:"黑色、無花紋、綁帶", status:"need", icon:"👞",
          detail:`<h4>黑色皮鞋</h4>
            <p>黑色、無花紋、綁帶。集會前要擦亮,以備檢閱。學校皮鞋如合規格可沿用。</p>` },
        { id:"scout-m-scarf", title:"旅巾", desc:"由旅團頒發", status:"check", icon:"🧣",
          detail:`<h4>旅巾</h4>
            <p>新隊員的旅巾將於<strong>會員章考核通過後</strong>由旅團頒發。</p>
            <ul>
              <li>旅巾戴在<strong>恤衫領外</strong></li>
              <li>由長邊捲起,摺出 5 摺——巾圈上 2 摺、下 3 摺</li>
              <li>巾圈位於喉部,不可太低</li>
            </ul>` },
        { id:"scout-m-woggle", title:"童軍皮製巾圈", desc:"皮製", status:"need", icon:"⭕",
          detail:`<h4>童軍巾圈</h4>
            <p>皮製童軍巾圈,用於固定旅巾。</p>
            <div class="warn">幼童軍升團注意:與幼童軍塑膠巾圈不同,需更換為童軍皮製巾圈,不可沿用。</div>` },
        { id:"scout-m-badges", title:"基本徽章", desc:"世界童軍會員章、香港章、地域章、區章", status:"need", icon:"🎖️",
          detail:`<h4>基本徽章(童軍)</h4>
            <p>必須購買:世界童軍會員章、香港章、地域章、區章</p>
            <p><strong>旅章</strong>由旅團頒發,無需自行購買。</p>
            <ul>
              <li>世界童軍會員章:左胸袋中央(只可於宣誓後佩戴)</li>
              <li>香港章:左胸袋蓋上,世界童軍會員章上方 3 厘米</li>
              <li>地域章:右袖</li>
              <li>區章:右袖,地域章下方</li>
              <li>旅章、小隊章:右袖(由旅團頒發)</li>
            </ul>
            <div class="tip">必須用線縫牢,不可用膠水或扣針。</div>` }
      ],
      female: [
        { id:"scout-f-cap", title:"深綠色軟帽", desc:"童軍女團員指定帽款", status:"need", icon:"🧢",
          detail:`<h4>深綠色軟帽</h4>
            <p>深綠色軟帽(連童軍帽章)——與男團員規格相同。向右拉平,帽後小尾要塞入帽內。</p>
            <div class="warn">幼童軍升團注意:必須更換,不可再戴幼童軍綠色圓頂闊邊帽。</div>` },
        { id:"scout-f-cap-badge", title:"童軍帽章", desc:"金屬帽章", status:"need", icon:"🎖️",
          detail:`<h4>童軍帽章</h4>
            <p>金屬童軍帽章。幼童軍升團需更換為童軍帽章。</p>` },
        { id:"scout-f-shirt", title:"杏色短袖恤衫", desc:"兩胸袋、無褶、肩帶", status:"need", icon:"👕",
          detail:`<h4>杏色恤衫</h4>
            <p>與男團員相同款式:杏色、短袖、兩胸袋、無褶、肩帶。</p>` },
        { id:"scout-f-culottes", title:"草青色裙褲(culottes)", desc:"女團員", status:"need", icon:"👗",
          detail:`<h4>裙褲(女團員)</h4>
            <p>草青色、側袋、弓字褶。配皮帶,長度要端莊。</p>
            <div class="tip">幼童軍升團注意:童軍裙褲與幼童軍裙褲<strong>款式相同</strong>,如合身可沿用。</div>` },
        { id:"scout-f-belt", title:"棕色皮帶(連童軍徽皮帶扣)", desc:"配童軍徽皮帶扣", status:"need", icon:"👔",
          detail:`<h4>棕色皮帶</h4>
            <p>與男團員規格相同。幼童軍升團可沿用。</p>` },
        { id:"scout-f-socks", title:"深草青色長襪", desc:"及膝", status:"need", icon:"🧦",
          detail:`<h4>深草青色長襪</h4>
            <p>與男團員規格相同。幼童軍升團可沿用。</p>` },
        { id:"scout-f-shoes", title:"黑色無花紋綁帶皮鞋", desc:"黑色、無花紋、綁帶", status:"need", icon:"👞",
          detail:`<h4>黑色皮鞋</h4>
            <p>與男團員規格相同。幼童軍升團可沿用。</p>` },
        { id:"scout-f-scarf", title:"旅巾", desc:"由旅團頒發", status:"check", icon:"🧣",
          detail:`<h4>旅巾</h4>
            <p>由旅團頒發,會員章考核通過後發給。</p>` },
        { id:"scout-f-woggle", title:"童軍皮製巾圈", desc:"皮製", status:"need", icon:"⭕",
          detail:`<h4>童軍巾圈</h4>
            <p>皮製童軍巾圈。幼童軍升團需更換為童軍皮製巾圈,不可沿用塑膠巾圈。</p>` },
        { id:"scout-f-badges", title:"基本徽章", desc:"世界童軍會員章、香港章、地域章、區章", status:"need", icon:"🎖️",
          detail:`<h4>基本徽章(童軍)</h4>
            <p>與男團員規格相同,佩戴位置不變。</p>` }
      ]
    },
    upgrade: {
      // 由幼童軍升童軍
      male: [
        { id:"scout-m-cap", title:"深綠色軟帽", desc:"必須更換", status:"need", icon:"🧢",
          detail:`<h4>深綠色軟帽(必須更換)</h4>
            <p>幼童軍黃邊鴨舌帽<strong>不可沿用</strong>。需購買<strong>深綠色軟帽</strong>。</p>` },
        { id:"scout-m-cap-badge", title:"童軍帽章", desc:"必須更換", status:"need", icon:"🎖️",
          detail:`<h4>童軍帽章(必須更換)</h4>
            <p>幼童軍帽章不可沿用,需購買<strong>童軍帽章</strong>縫於新軟帽上。</p>` },
        { id:"scout-m-shirt", title:"杏色短袖恤衫", desc:"與幼童軍相同,可沿用", status:"have", icon:"👕",
          detail:`<h4>杏色恤衫(可沿用)</h4>
            <p><strong>與幼童軍恤衫完全相同!</strong>如合身只需更換徽章。建議檢查尺寸——童軍成長快,如太緊需更換。</p>` },
        { id:"scout-m-shorts", title:"草青色短褲", desc:"與幼童軍相同,可沿用", status:"have", icon:"🩳",
          detail:`<h4>短褲(可沿用)</h4>
            <p>與幼童軍短褲相同,可沿用。穿在腰位(非臀部),配棕色皮帶。檢查是否仍合身。</p>` },
        { id:"scout-m-belt", title:"棕色皮帶", desc:"可沿用", status:"have", icon:"👔",
          detail:`<h4>棕色皮帶(可沿用)</h4>
            <p>與幼童軍皮帶相同,無需重買。保持清潔,不可掛多餘匙扣。</p>` },
        { id:"scout-m-socks", title:"深草青色長襪", desc:"顏色相同,可沿用", status:"have", icon:"🧦",
          detail:`<h4>深草青色長襪(可沿用)</h4>
            <p>顏色與幼童軍相同。如襪子已起毛球或破洞建議更換。</p>` },
        { id:"scout-m-shoes", title:"黑色皮鞋", desc:"可沿用", status:"have", icon:"👞",
          detail:`<h4>黑色皮鞋(可沿用)</h4>
            <p>學校皮鞋如合規格可沿用。檢查鞋底有否過度磨損,集會前要擦亮。</p>` },
        { id:"scout-m-scarf", title:"旅巾", desc:"可沿用", status:"have", icon:"🧣",
          detail:`<h4>旅巾(可沿用)</h4>
            <p>升團者可繼續沿用幼童軍時期的旅巾,無需重新購買。旅巾戴在<strong>恤衫領外</strong>。</p>` },
        { id:"scout-m-woggle", title:"童軍皮製巾圈", desc:"必須更換", status:"need", icon:"⭕",
          detail:`<h4>童軍巾圈(必須更換)</h4>
            <p>與幼童軍塑膠巾圈不同,需更換為<strong>童軍皮製巾圈</strong>,不可沿用。</p>` },
        { id:"scout-m-badges", title:"基本徽章", desc:"狀況良好可沿用", status:"have", icon:"🎖️",
          detail:`<h4>基本徽章(可沿用)</h4>
            <p>世界童軍會員章、香港章、地域章、區章<strong>如狀況良好可沿用</strong>。</p>
            <div class="warn">緊記:拆走所有幼童軍徽章(隊長章、幼童軍進度章等),年星及金紫荊獎章除外。<br>旅章及小隊章由旅團頒發,無需自行購買。</div>` }
      ],
      female: [
        { id:"scout-f-cap", title:"深綠色軟帽", desc:"必須更換", status:"need", icon:"🧢",
          detail:`<h4>深綠色軟帽(必須更換)</h4>
            <p>幼童軍綠色圓頂闊邊帽<strong>不可沿用</strong>。需購買<strong>深綠色軟帽</strong>。</p>` },
        { id:"scout-f-cap-badge", title:"童軍帽章", desc:"必須更換", status:"need", icon:"🎖️",
          detail:`<h4>童軍帽章(必須更換)</h4>
            <p>幼童軍帽章不可沿用,需購買<strong>童軍帽章</strong>縫於新軟帽上。</p>` },
        { id:"scout-f-shirt", title:"杏色短袖恤衫", desc:"與幼童軍相同,可沿用", status:"have", icon:"👕",
          detail:`<h4>杏色恤衫(可沿用)</h4>
            <p>與幼童軍恤衫相同,如合身可沿用。</p>` },
        { id:"scout-f-culottes", title:"草青色裙褲", desc:"與幼童軍相同,可沿用", status:"have", icon:"👗",
          detail:`<h4>裙褲(可沿用)</h4>
            <p>童軍裙褲與幼童軍裙褲款式相同,如合身可沿用。</p>` },
        { id:"scout-f-belt", title:"棕色皮帶", desc:"可沿用", status:"have", icon:"👔",
          detail:`<h4>棕色皮帶(可沿用)</h4>
            <p>與幼童軍皮帶相同,無需重買。</p>` },
        { id:"scout-f-socks", title:"深草青色長襪", desc:"可沿用", status:"have", icon:"🧦",
          detail:`<h4>深草青色長襪(可沿用)</h4>
            <p>顏色與幼童軍相同。如襪子已起毛球或破洞建議更換。</p>` },
        { id:"scout-f-shoes", title:"黑色皮鞋", desc:"可沿用", status:"have", icon:"👞",
          detail:`<h4>黑色皮鞋(可沿用)</h4>
            <p>學校皮鞋如合規格可沿用。檢查鞋底有否過度磨損。</p>` },
        { id:"scout-f-scarf", title:"旅巾", desc:"可沿用", status:"have", icon:"🧣",
          detail:`<h4>旅巾(可沿用)</h4>
            <p>升團者可繼續沿用幼童軍時期的旅巾。</p>` },
        { id:"scout-f-woggle", title:"童軍皮製巾圈", desc:"必須更換", status:"need", icon:"⭕",
          detail:`<h4>童軍巾圈(必須更換)</h4>
            <p>與幼童軍塑膠巾圈不同,需更換為<strong>童軍皮製巾圈</strong>。</p>` },
        { id:"scout-f-badges", title:"基本徽章", desc:"狀況良好可沿用", status:"have", icon:"🎖️",
          detail:`<h4>基本徽章(可沿用)</h4>
            <p>世界童軍會員章、香港章、地域章、區章<strong>如狀況良好可沿用</strong>。</p>
            <div class="warn">緊記:拆走所有幼童軍徽章(隊長章、幼童軍進度章等),年星及金紫荊獎章除外。</div>` }
      ]
    }
  },

  /* ─────────────── 深資童軍 ─────────────── */
  venture: {
    new: {
      male: [
        { id:"v-m-cap", title:"棗紅色軟帽", desc:"深資男團員指定帽款", status:"need", icon:"🧢",
          detail:`<h4>棗紅色軟帽</h4>
            <p>棗紅色軟帽(連深資童軍帽章)</p>
            <ul>
              <li>向右拉平,緊貼頭部,不可鬆垮</li>
              <li>帽後小尾要塞入帽內,不可戴成「廚師帽」</li>
              <li>帽章戴在<strong>左眼正上方</strong></li>
            </ul>` },
        { id:"v-m-cap-badge", title:"深資童軍帽章", desc:"金屬帽章", status:"need", icon:"🎖️",
          detail:`<h4>深資童軍帽章</h4>
            <p>金屬深資童軍帽章。</p>
            <div class="warn">童軍升團注意:不可沿用童軍帽章,需更換為深資版本。</div>` },
        { id:"v-m-shirt", title:"杏色短袖恤衫", desc:"與童軍相同款式", status:"need", icon:"👕",
          detail:`<h4>杏色恤衫</h4>
            <p>杏色、短袖、兩胸袋、無褶、肩帶——<strong>與童軍恤衫完全相同</strong>。</p>` },
        { id:"v-m-trousers", title:"草青色長褲", desc:"深資男團員", status:"need", icon:"👖",
          detail:`<h4>長褲(深資男團員)</h4>
            <p>草青色、兩斜袋、兩後袋、有褶</p>
            <ul>
              <li>長度適中,配黑色短襪</li>
              <li>穿在腰位,配棕色皮帶</li>
            </ul>
            <div class="warn">童軍升團注意:由短褲改為長褲,必須更換。</div>` },
        { id:"v-m-belt", title:"棕色皮帶", desc:"與童軍相同", status:"need", icon:"👔",
          detail:`<h4>棕色皮帶</h4>
            <p>與童軍規格相同。</p>` },
        { id:"v-m-socks", title:"黑色短襪", desc:"深資男團員", status:"need", icon:"🧦",
          detail:`<h4>黑色短襪(深資男團員)</h4>
            <p>黑色短襪。深資起改穿<strong>短襪 + 長褲</strong>。</p>
            <div class="warn">童軍升團注意:由長襪改為短襪。</div>` },
        { id:"v-m-shoes", title:"黑色無花紋綁帶皮鞋", desc:"與童軍相同", status:"need", icon:"👞",
          detail:`<h4>黑色皮鞋</h4>
            <p>與童軍規格相同:黑色、無花紋、綁帶。學校皮鞋如合規格可沿用。</p>` },
        { id:"v-m-tie", title:"棗紅色領帶", desc:"深資童軍專屬", status:"need", icon:"👔",
          detail:`<h4>棗紅色領帶</h4>
            <p>深紅/棗紅色領帶,深資童軍專屬配件。</p>
            <div class="warn">全新加入深資童軍必須購買。<br>童軍升團:童軍時期無需領帶,升團後必須購買。</div>` },
        { id:"v-m-scarf", title:"旅巾", desc:"由旅團頒發", status:"check", icon:"🧣",
          detail:`<h4>旅巾</h4>
            <p>由旅團頒發,戴法與童軍時期相同。</p>` },
        { id:"v-m-woggle", title:"皮製巾圈", desc:"與童軍相同", status:"need", icon:"⭕",
          detail:`<h4>皮製巾圈</h4>
            <p>與童軍皮製巾圈相同,深資可繼續使用。童軍升團者可沿用。</p>` },
        { id:"v-m-badges", title:"基本徽章", desc:"世界童軍會員章、香港章、地域章、區章", status:"need", icon:"🎖️",
          detail:`<h4>基本徽章(深資童軍)</h4>
            <p>與童軍規格相同,佩戴位置不變。旅章由旅團頒發。</p>
            <ul>
              <li>世界童軍會員章:左胸袋中央</li>
              <li>香港章:左胸袋蓋上,世界童軍會員章上方 3 厘米</li>
              <li>地域章:右袖</li>
              <li>區章:右袖,地域章下方</li>
              <li>旅章:右袖(由旅團頒發)</li>
            </ul>
            <div class="tip">童軍升團可沿用原有徽章,只需追加深資專屬徽章(如晉陸章、活動章等)。</div>` }
      ],
      female: [
        { id:"v-f-cap", title:"棗紅色軟帽", desc:"深資女團員指定帽款", status:"need", icon:"🧢",
          detail:`<h4>棗紅色軟帽</h4>
            <p>棗紅色軟帽(連深資童軍帽章)——與男團員相同。</p>` },
        { id:"v-f-cap-badge", title:"深資童軍帽章", desc:"金屬帽章", status:"need", icon:"🎖️",
          detail:`<h4>深資童軍帽章</h4>
            <p>金屬深資童軍帽章。童軍升團需更換為深資版本。</p>` },
        { id:"v-f-shirt", title:"杏色短袖恤衫", desc:"與童軍相同", status:"need", icon:"👕",
          detail:`<h4>杏色恤衫</h4>
            <p>與童軍恤衫完全相同。</p>` },
        { id:"v-f-skirt", title:"草青色半截裙", desc:"深資女團員", status:"need", icon:"👗",
          detail:`<h4>半截裙(深資女團員)</h4>
            <p>草青色、側袋、無褶、<strong>及膝</strong></p>
            <ul>
              <li>配皮帶,長度及膝(不可過短或過長)</li>
              <li>配肉色絲襪褲</li>
            </ul>
            <div class="warn">童軍升團注意:由裙褲(culottes)改為半截裙,必須更換。</div>` },
        { id:"v-f-belt", title:"棕色皮帶", desc:"與童軍相同", status:"need", icon:"👔",
          detail:`<h4>棕色皮帶</h4>
            <p>與童軍規格相同。</p>` },
        { id:"v-f-pantyhose", title:"肉色尼龍襪褲", desc:"深資女團員", status:"need", icon:"🧦",
          detail:`<h4>肉色尼龍襪褲(深資女團員)</h4>
            <p>肉色、尼龍、無花紋、襪褲(連褲襪)</p>
            <div class="warn">童軍升團注意:由深綠長襪改為肉色襪褲,必須更換。<br>需自行到絲襪專門店購買。</div>` },
        { id:"v-f-shoes", title:"黑色非綁帶中跟皮鞋", desc:"深資女團員", status:"need", icon:"👠",
          detail:`<h4>黑色非綁帶中跟皮鞋(深資女團員)</h4>
            <p>黑色、無花紋、<strong>非綁帶</strong>、<strong>中跟</strong>。slip-on 中跟款。</p>
            <div class="warn">童軍升團注意:由綁帶低筒平底改為非綁帶中跟,鞋款必須更換。</div>` },
        { id:"v-f-tie", title:"棗紅色領帶", desc:"深資女團員", status:"need", icon:"👔",
          detail:`<h4>棗紅色領帶</h4>
            <p>深紅/棗紅色領帶,深資女團員同樣佩戴。</p>
            <div class="warn">童軍升團:童軍時期無需領帶,升團後必須購買。</div>` },
        { id:"v-f-scarf", title:"旅巾", desc:"由旅團頒發", status:"check", icon:"🧣",
          detail:`<h4>旅巾</h4>
            <p>由旅團頒發。</p>` },
        { id:"v-f-woggle", title:"皮製巾圈", desc:"與童軍相同", status:"need", icon:"⭕",
          detail:`<h4>皮製巾圈</h4>
            <p>與童軍皮製巾圈相同。</p>` },
        { id:"v-f-badges", title:"基本徽章", desc:"與童軍相同", status:"need", icon:"🎖️",
          detail:`<h4>基本徽章(深資童軍)</h4>
            <p>與男團員規格相同,佩戴位置不變。旅章由旅團頒發。</p>
            <div class="tip">童軍升團可沿用原有徽章。</div>` }
      ]
    },
    upgrade: {
      // 由童軍升深資
      male: [
        { id:"v-m-cap", title:"棗紅色軟帽", desc:"必須更換", status:"need", icon:"🧢",
          detail:`<h4>棗紅色軟帽(必須更換)</h4>
            <p>童軍深綠軟帽<strong>不可沿用</strong>,需購買<strong>棗紅色軟帽</strong>。</p>` },
        { id:"v-m-cap-badge", title:"深資童軍帽章", desc:"必須更換", status:"need", icon:"🎖️",
          detail:`<h4>深資童軍帽章(必須更換)</h4>
            <p>童軍帽章不可沿用,需購買<strong>深資童軍帽章</strong>。</p>` },
        { id:"v-m-shirt", title:"杏色短袖恤衫", desc:"可沿用", status:"have", icon:"👕",
          detail:`<h4>杏色恤衫(可沿用)</h4>
            <p>與童軍恤衫完全相同,可繼續使用。</p>` },
        { id:"v-m-trousers", title:"草青色長褲", desc:"由短褲改長褲", status:"need", icon:"👖",
          detail:`<h4>長褲(必須購買)</h4>
            <p>由童軍短褲改為深資長褲。規格:草青色、兩斜袋、兩後袋、有褶。</p>
            <div class="warn">童軍短褲不可沿用,必須購買深資長褲。</div>` },
        { id:"v-m-belt", title:"棕色皮帶", desc:"可沿用", status:"have", icon:"👔",
          detail:`<h4>棕色皮帶(可沿用)</h4>
            <p>與童軍皮帶相同,可沿用。</p>` },
        { id:"v-m-socks", title:"黑色短襪", desc:"由長襪改短襪", status:"need", icon:"🧦",
          detail:`<h4>黑色短襪(必須購買)</h4>
            <p>由童軍深綠長襪改為黑色短襪。深綠長襪不可沿用。</p>` },
        { id:"v-m-shoes", title:"黑色綁帶皮鞋", desc:"可沿用", status:"have", icon:"👞",
          detail:`<h4>黑色綁帶皮鞋(可沿用)</h4>
            <p>規格與童軍相同:黑色、無花紋、綁帶。學校皮鞋如合規格可沿用。</p>` },
        { id:"v-m-tie", title:"棗紅色領帶", desc:"必須購買", status:"need", icon:"👔",
          detail:`<h4>棗紅色領帶(必須購買)</h4>
            <p>童軍時期<strong>無需佩戴領帶</strong>。升團後必須購買<strong>棗紅色領帶</strong>。</p>` },
        { id:"v-m-scarf", title:"旅巾", desc:"可沿用", status:"have", icon:"🧣",
          detail:`<h4>旅巾(可沿用)</h4>
            <p>可繼續沿用童軍時期的旅巾。</p>` },
        { id:"v-m-woggle", title:"皮製巾圈", desc:"可沿用", status:"have", icon:"⭕",
          detail:`<h4>皮製巾圈(可沿用)</h4>
            <p>童軍皮製巾圈可沿用。</p>` },
        { id:"v-m-badges", title:"基本徽章", desc:"可沿用", status:"have", icon:"🎖️",
          detail:`<h4>基本徽章(可沿用)</h4>
            <p>世界童軍會員章、香港章、地域章、區章如狀況良好可沿用。需追加<strong>深資晉陸章、活動章</strong>等深資專屬徽章。</p>
            <div class="tip">旅章由旅團頒發,小隊章如有變更亦由旅團安排。</div>` }
      ],
      female: [
        { id:"v-f-cap", title:"棗紅色軟帽", desc:"必須更換", status:"need", icon:"🧢",
          detail:`<h4>棗紅色軟帽(必須更換)</h4>
            <p>童軍深綠軟帽不可沿用,需購買棗紅色軟帽。</p>` },
        { id:"v-f-cap-badge", title:"深資童軍帽章", desc:"必須更換", status:"need", icon:"🎖️",
          detail:`<h4>深資童軍帽章(必須更換)</h4>
            <p>需購買深資童軍帽章。</p>` },
        { id:"v-f-shirt", title:"杏色短袖恤衫", desc:"可沿用", status:"have", icon:"👕",
          detail:`<h4>杏色恤衫(可沿用)</h4>
            <p>與童軍恤衫相同,可沿用。</p>` },
        { id:"v-f-skirt", title:"草青色半截裙", desc:"由裙褲改半截裙", status:"need", icon:"👗",
          detail:`<h4>半截裙(必須購買)</h4>
            <p>由童軍裙褲(culottes)改為深資半截裙(及膝)。規格:草青色、側袋、無褶、及膝。</p>
            <div class="warn">童軍裙褲不可沿用,必須購買半截裙。</div>` },
        { id:"v-f-belt", title:"棕色皮帶", desc:"可沿用", status:"have", icon:"👔",
          detail:`<h4>棕色皮帶(可沿用)</h4>
            <p>與童軍皮帶相同,可沿用。</p>` },
        { id:"v-f-pantyhose", title:"肉色尼龍襪褲", desc:"由長襪改襪褲", status:"need", icon:"🧦",
          detail:`<h4>肉色尼龍襪褲(必須購買)</h4>
            <p>由童軍深綠長襪改為肉色絲襪褲。需自行到絲襪專門店購買。</p>
            <div class="warn">深綠長襪不可沿用。</div>` },
        { id:"v-f-shoes", title:"黑色非綁帶中跟皮鞋", desc:"由綁帶改非綁帶", status:"need", icon:"👠",
          detail:`<h4>黑色非綁帶中跟皮鞋(必須購買)</h4>
            <p>由童軍綁帶低筒平底改為非綁帶中跟。鞋款必須更換。</p>
            <div class="warn">童軍綁帶皮鞋不可沿用。</div>` },
        { id:"v-f-tie", title:"棗紅色領帶", desc:"必須購買", status:"need", icon:"👔",
          detail:`<h4>棗紅色領帶(必須購買)</h4>
            <p>童軍時期無需佩戴領帶。升團後必須購買棗紅色領帶。</p>` },
        { id:"v-f-scarf", title:"旅巾", desc:"可沿用", status:"have", icon:"🧣",
          detail:`<h4>旅巾(可沿用)</h4>
            <p>可沿用童軍時期的旅巾。</p>` },
        { id:"v-f-woggle", title:"皮製巾圈", desc:"可沿用", status:"have", icon:"⭕",
          detail:`<h4>皮製巾圈(可沿用)</h4>
            <p>童軍皮製巾圈可沿用。</p>` },
        { id:"v-f-badges", title:"基本徽章", desc:"可沿用", status:"have", icon:"🎖️",
          detail:`<h4>基本徽章(可沿用)</h4>
            <p>世界童軍會員章、香港章、地域章、區章如狀況良好可沿用。需追加深資專屬徽章。</p>` }
      ]
    }
  },

  /* ─────────────── 樂行童軍 ─────────────── */
  rover: {
    new: {
      male: [
        { id:"r-m-cap", title:"深綠色軟帽", desc:"樂行男團員指定帽款", status:"need", icon:"🧢",
          detail:`<h4>深綠色軟帽</h4>
            <p>深綠色軟帽(連童軍帽章)。樂行童軍帽款與童軍相同。</p>
            <div class="tip">深資升樂行:可繼續沿用深資時期的軟帽,只更換帽章。</div>` },
        { id:"r-m-cap-badge", title:"樂行童軍帽章", desc:"金屬帽章", status:"need", icon:"🎖️",
          detail:`<h4>樂行童軍帽章</h4>
            <p>金屬樂行童軍帽章。深資升樂行需更換為樂行版本。</p>
            <div class="warn">深資升樂行:不可沿用深資帽章。</div>` },
        { id:"r-m-shirt", title:"杏色短袖恤衫", desc:"與所有支部相同", status:"need", icon:"👕",
          detail:`<h4>杏色恤衫</h4>
            <p>杏色、短袖、兩胸袋、無褶、肩帶——<strong>與幼童軍/童軍/深資完全相同</strong>。</p>` },
        { id:"r-m-trousers", title:"草青色長褲", desc:"樂行男團員", status:"need", icon:"👖",
          detail:`<h4>長褲(樂行男團員)</h4>
            <p>草青色、兩斜袋、兩後袋、有褶。與深資規格相同。</p>` },
        { id:"r-m-belt", title:"棕色皮帶", desc:"與深資相同", status:"need", icon:"👔",
          detail:`<h4>棕色皮帶</h4>
            <p>與深資規格相同。</p>` },
        { id:"r-m-socks", title:"黑色短襪", desc:"與深資相同", status:"need", icon:"🧦",
          detail:`<h4>黑色短襪</h4>
            <p>與深資規格相同。</p>` },
        { id:"r-m-shoes", title:"黑色無花紋綁帶皮鞋", desc:"與深資相同", status:"need", icon:"👞",
          detail:`<h4>黑色無花紋綁帶皮鞋</h4>
            <p>與深資規格相同。</p>` },
        { id:"r-m-scarf", title:"旅巾", desc:"由旅團頒發", status:"check", icon:"🧣",
          detail:`<h4>旅巾</h4>
            <p>由旅團頒發。深資升樂行可沿用。</p>` },
        { id:"r-m-woggle", title:"皮製巾圈", desc:"與深資相同", status:"need", icon:"⭕",
          detail:`<h4>皮製巾圈</h4>
            <p>與深資規格相同,深資升樂行可沿用。</p>` },
        { id:"r-m-badges", title:"基本徽章", desc:"世界童軍會員章、香港章、地域章、區章", status:"need", icon:"🎖️",
          detail:`<h4>基本徽章(樂行童軍)</h4>
            <p>與深資規格相同,佩戴位置不變。需追加樂行專屬徽章。</p>` }
      ],
      female: [
        { id:"r-f-cap", title:"深綠色軟帽", desc:"樂行女團員指定帽款", status:"need", icon:"🧢",
          detail:`<h4>深綠色軟帽</h4>
            <p>深綠色軟帽(連童軍帽章)——與男團員相同。</p>` },
        { id:"r-f-cap-badge", title:"樂行童軍帽章", desc:"金屬帽章", status:"need", icon:"🎖️",
          detail:`<h4>樂行童軍帽章</h4>
            <p>金屬樂行童軍帽章。深資升樂行需更換為樂行版本。</p>
            <div class="warn">深資升樂行:不可沿用深資帽章。</div>` },
        { id:"r-f-shirt", title:"杏色短袖恤衫", desc:"與深資相同", status:"need", icon:"👕",
          detail:`<h4>杏色恤衫</h4>
            <p>與深資恤衫完全相同。</p>` },
        { id:"r-f-skirt", title:"草青色半截裙", desc:"樂行女團員", status:"need", icon:"👗",
          detail:`<h4>半截裙(樂行女團員)</h4>
            <p>草青色、側袋、無褶、及膝。與深資規格相同。</p>` },
        { id:"r-f-belt", title:"棕色皮帶", desc:"與深資相同", status:"need", icon:"👔",
          detail:`<h4>棕色皮帶</h4>
            <p>與深資規格相同。</p>` },
        { id:"r-f-pantyhose", title:"肉色尼龍襪褲", desc:"與深資相同", status:"need", icon:"🧦",
          detail:`<h4>肉色尼龍襪褲</h4>
            <p>與深資規格相同,需自行到絲襪專門店購買。</p>` },
        { id:"r-f-shoes", title:"黑色非綁帶中跟皮鞋", desc:"與深資相同", status:"need", icon:"👠",
          detail:`<h4>黑色非綁帶中跟皮鞋</h4>
            <p>與深資規格相同:黑色、無花紋、非綁帶、中跟。</p>` },
        { id:"r-f-scarf", title:"旅巾", desc:"由旅團頒發", status:"check", icon:"🧣",
          detail:`<h4>旅巾</h4>
            <p>由旅團頒發。深資升樂行可沿用。</p>` },
        { id:"r-f-woggle", title:"皮製巾圈", desc:"與深資相同", status:"need", icon:"⭕",
          detail:`<h4>皮製巾圈</h4>
            <p>與深資規格相同。</p>` },
        { id:"r-f-badges", title:"基本徽章", desc:"與深資相同", status:"need", icon:"🎖️",
          detail:`<h4>基本徽章(樂行童軍)</h4>
            <p>與深資規格相同。需追加樂行專屬徽章。</p>` }
      ]
    },
    upgrade: {
      // 由深資升樂行
      male: [
        { id:"r-m-cap-badge", title:"樂行童軍帽章", desc:"必須更換", status:"need", icon:"🎖️",
          detail:`<h4>樂行童軍帽章(必須更換)</h4>
            <p>深資帽章不可沿用,需購買<strong>樂行童軍帽章</strong>。軟帽本身可沿用深資的。</p>` },
        { id:"r-m-shirt", title:"杏色短袖恤衫", desc:"可沿用", status:"have", icon:"👕",
          detail:`<h4>杏色恤衫(可沿用)</h4>
            <p>與深資恤衫相同。</p>` },
        { id:"r-m-trousers", title:"草青色長褲", desc:"可沿用", status:"have", icon:"👖",
          detail:`<h4>長褲(可沿用)</h4>
            <p>與深資長褲相同。</p>` },
        { id:"r-m-belt", title:"棕色皮帶", desc:"可沿用", status:"have", icon:"👔",
          detail:`<h4>棕色皮帶(可沿用)</h4>
            <p>與深資皮帶相同。</p>` },
        { id:"r-m-socks", title:"黑色短襪", desc:"可沿用", status:"have", icon:"🧦",
          detail:`<h4>黑色短襪(可沿用)</h4>
            <p>與深資短襪相同。</p>` },
        { id:"r-m-shoes", title:"黑色綁帶皮鞋", desc:"可沿用", status:"have", icon:"👞",
          detail:`<h4>黑色綁帶皮鞋(可沿用)</h4>
            <p>與深資皮鞋相同。</p>` },
        { id:"r-m-tie", title:"無需領帶", desc:"樂行不戴領帶", status:"have", icon:"❌",
          detail:`<h4>樂行童軍不佩戴領帶</h4>
            <p>深資時期的棗紅色領帶<strong>升團後不需佩戴</strong>。可保留作紀念。</p>` },
        { id:"r-m-scarf", title:"旅巾", desc:"可沿用", status:"have", icon:"🧣",
          detail:`<h4>旅巾(可沿用)</h4>
            <p>可沿用深資時期的旅巾。</p>` },
        { id:"r-m-woggle", title:"皮製巾圈", desc:"可沿用", status:"have", icon:"⭕",
          detail:`<h4>皮製巾圈(可沿用)</h4>
            <p>深資皮製巾圈可沿用。</p>` },
        { id:"r-m-badges", title:"基本徽章", desc:"可沿用", status:"have", icon:"🎖️",
          detail:`<h4>基本徽章(可沿用)</h4>
            <p>原有徽章如狀況良好可沿用。需追加樂行專屬徽章(如樂行晉陸章、活動章等)。</p>` }
      ],
      female: [
        { id:"r-f-cap-badge", title:"樂行童軍帽章", desc:"必須更換", status:"need", icon:"🎖️",
          detail:`<h4>樂行童軍帽章(必須更換)</h4>
            <p>深資帽章不可沿用,需購買樂行童軍帽章。</p>` },
        { id:"r-f-shirt", title:"杏色短袖恤衫", desc:"可沿用", status:"have", icon:"👕",
          detail:`<h4>杏色恤衫(可沿用)</h4>
            <p>與深資恤衫相同。</p>` },
        { id:"r-f-skirt", title:"草青色半截裙", desc:"可沿用", status:"have", icon:"👗",
          detail:`<h4>半截裙(可沿用)</h4>
            <p>與深資半截裙相同。</p>` },
        { id:"r-f-belt", title:"棕色皮帶", desc:"可沿用", status:"have", icon:"👔",
          detail:`<h4>棕色皮帶(可沿用)</h4>
            <p>與深資皮帶相同。</p>` },
        { id:"r-f-pantyhose", title:"肉色尼龍襪褲", desc:"可沿用", status:"have", icon:"🧦",
          detail:`<h4>肉色尼龍襪褲(可沿用)</h4>
            <p>與深資襪褲相同。</p>` },
        { id:"r-f-shoes", title:"黑色非綁帶中跟皮鞋", desc:"可沿用", status:"have", icon:"👠",
          detail:`<h4>黑色非綁帶中跟皮鞋(可沿用)</h4>
            <p>與深資皮鞋相同。</p>` },
        { id:"r-f-tie", title:"無需領帶", desc:"樂行不戴領帶", status:"have", icon:"❌",
          detail:`<h4>樂行童軍不佩戴領帶</h4>
            <p>深資時期的棗紅色領帶升團後不需佩戴。</p>` },
        { id:"r-f-scarf", title:"旅巾", desc:"可沿用", status:"have", icon:"🧣",
          detail:`<h4>旅巾(可沿用)</h4>
            <p>可沿用深資時期的旅巾。</p>` },
        { id:"r-f-woggle", title:"皮製巾圈", desc:"可沿用", status:"have", icon:"⭕",
          detail:`<h4>皮製巾圈(可沿用)</h4>
            <p>深資皮製巾圈可沿用。</p>` },
        { id:"r-f-badges", title:"基本徽章", desc:"可沿用", status:"have", icon:"🎖️",
          detail:`<h4>基本徽章(可沿用)</h4>
            <p>原有徽章如狀況良好可沿用。需追加樂行專屬徽章。</p>` }
      ]
    }
  },

  /* ─────────────── 領袖 ─────────────── */
  leader: {
    new: {
      male: [
        { id:"l-m-cap", title:"深綠色軟帽(領袖)", desc:"連職級帽章", status:"need", icon:"🧢",
          detail:`<h4>領袖帽(男)</h4>
            <p>深綠色軟帽(連<strong>職級帽章</strong>),領袖專用。</p>
            <ul>
              <li>帽章根據所屬<strong>職級</strong>(例如:見習領袖、助理領袖、領袖)而定</li>
              <li>由所屬區/地域/總會頒發</li>
            </ul>` },
        { id:"l-m-shirt", title:"杏色短袖恤衫", desc:"與所有支部相同", status:"need", icon:"👕",
          detail:`<h4>杏色恤衫(領袖)</h4>
            <p>杏色、短袖、兩胸袋、無褶、肩帶。與所有青少年支部<strong>恤衫規格相同</strong>。</p>
            <ul>
              <li>徽章位置:世界童軍會員章(左胸袋中央)、香港章(左胸袋蓋上 3 厘米)、香港肩章(肩上)、職級肩章(肩上)</li>
              <li>領袖亦可佩戴<strong>總會總部章/地域章/區章</strong>(取代青少年支部的小隊章)</li>
            </ul>` },
        { id:"l-m-trousers", title:"草青色長褲", desc:"領袖男裝", status:"need", icon:"👖",
          detail:`<h4>長褲(男領袖)</h4>
            <p>草青色、兩斜袋、兩後袋、有褶。配黑色短襪。</p>
            <div class="tip">男領袖如需短褲制服(夏季戶外),可參考<strong>制服編號 5</strong>。</div>` },
        { id:"l-m-belt", title:"棕色皮帶", desc:"與所有支部相同", status:"need", icon:"👔",
          detail:`<h4>棕色皮帶</h4>
            <p>與青少年支部規格相同。</p>` },
        { id:"l-m-socks", title:"黑色短襪", desc:"領袖男裝", status:"need", icon:"🧦",
          detail:`<h4>黑色短襪</h4>
            <p>黑色短襪。</p>` },
        { id:"l-m-shoes", title:"黑色無花紋綁帶皮鞋", desc:"領袖男裝", status:"need", icon:"👞",
          detail:`<h4>黑色無花紋綁帶皮鞋</h4>
            <p>黑色、無花紋、綁帶。與青少年支部規格相同。</p>` },
        { id:"l-m-tie", title:"深綠色領帶", desc:"領袖專屬", status:"need", icon:"👔",
          detail:`<h4>深綠色領帶</h4>
            <p><strong>深綠色</strong>領帶,領袖專屬(童軍/深資為棗紅,領袖為深綠)。</p>
            <div class="warn">如出席<strong>制服編號 4(領帶制服)</strong>,必須佩戴此領帶。如穿著編號 3(常規制服),改佩戴旅巾。</div>` },
        { id:"l-m-badges", title:"基本徽章", desc:"世界童軍會員章、香港章、香港肩章、職級肩章", status:"need", icon:"🎖️",
          detail:`<h4>基本徽章(領袖)</h4>
            <p>領袖必備徽章:</p>
            <ul>
              <li><strong>世界童軍會員章</strong>:左胸袋中央</li>
              <li><strong>香港章</strong>:左胸袋蓋上,世界童軍會員章上方 3 厘米</li>
              <li><strong>香港肩章/旅章</strong>:肩章位置(由總會/旅團頒發)</li>
              <li><strong>職級肩章</strong>:肩上(標示見習/助理/正式領袖)</li>
              <li><strong>總會總部章/地域章/區章</strong>(如適用)</li>
            </ul>
            <div class="tip">部分徽章由總會/地域/區/旅團頒發,無需自行購買。</div>` }
      ],
      female: [
        { id:"l-f-cap", title:"深綠色金邊硬帽(領袖)", desc:"連職級帽章", status:"need", icon:"👒",
          detail:`<h4>領袖帽(女)</h4>
            <p><strong>深綠色金邊硬帽</strong>(連<strong>職級帽章</strong>),女領袖專用。</p>
            <ul>
              <li>與男領袖軟帽不同,女領袖為<strong>金邊硬帽</strong></li>
              <li>帽章根據所屬職級而定,由所屬區/地域/總會頒發</li>
              <li>如配戴<strong>制服編號 4(領帶制服)</strong>,女領袖可用軟帽</li>
            </ul>` },
        { id:"l-f-shirt", title:"杏色短袖恤衫", desc:"與所有支部相同", status:"need", icon:"👕",
          detail:`<h4>杏色恤衫(領袖)</h4>
            <p>與青少年支部規格相同。徽章位置:世界童軍會員章、香港章、香港肩章、職級肩章、總會總部章/地域章/區章。</p>` },
        { id:"l-f-skirt", title:"草青色半截裙", desc:"領袖女裝", status:"need", icon:"👗",
          detail:`<h4>半截裙(女領袖)</h4>
            <p>草青色、側袋、無褶、及膝。配肉色絲襪褲。</p>
            <div class="tip">女領袖如需長褲制服(戶外活動),可參考<strong>制服編號 6(女性成員長褲制服)</strong>。</div>` },
        { id:"l-f-belt", title:"棕色皮帶", desc:"與所有支部相同", status:"need", icon:"👔",
          detail:`<h4>棕色皮帶</h4>
            <p>與青少年支部規格相同。</p>` },
        { id:"l-f-pantyhose", title:"肉色尼龍襪褲", desc:"領袖女裝", status:"need", icon:"🧦",
          detail:`<h4>肉色尼龍襪褲</h4>
            <p>肉色、尼龍、無花紋、襪褲。需自行到絲襪專門店購買。</p>` },
        { id:"l-f-shoes", title:"黑色非綁帶中跟皮鞋", desc:"領袖女裝", status:"need", icon:"👠",
          detail:`<h4>黑色非綁帶中跟皮鞋</h4>
            <p>黑色、無花紋、非綁帶、中跟。slip-on 中跟款。</p>` },
        { id:"l-f-tie", title:"深綠色領帶", desc:"領袖專屬", status:"need", icon:"👔",
          detail:`<h4>深綠色領帶</h4>
            <p>深綠色領帶,女領袖同樣佩戴。出席<strong>制服編號 4(領帶制服)</strong>必備。穿著編號 3(常規制服)則改佩戴旅巾。</p>` },
        { id:"l-f-badges", title:"基本徽章", desc:"世界童軍會員章、香港章、香港肩章、職級肩章", status:"need", icon:"🎖️",
          detail:`<h4>基本徽章(領袖)</h4>
            <p>與男領袖規格相同。世界童軍會員章、香港章、香港肩章、職級肩章、總會總部章/地域章/區章。</p>` }
      ]
    },
    upgrade: {
      // 由樂行升領袖
      male: [
        { id:"l-m-cap", title:"深綠色軟帽(領袖)", desc:"必須更換", status:"need", icon:"🧢",
          detail:`<h4>領袖帽(必須更換)</h4>
            <p>樂行童軍軟帽<strong>不可沿用</strong>。需購買<strong>領袖專用軟帽(連職級帽章)</strong>。</p>
            <div class="warn">職級帽章根據所屬職級(見習/助理/正式領袖)而定,由所屬區/地域/總會頒發。</div>` },
        { id:"l-m-shirt", title:"杏色短袖恤衫", desc:"可沿用", status:"have", icon:"👕",
          detail:`<h4>杏色恤衫(可沿用)</h4>
            <p>與樂行恤衫完全相同,可沿用。</p>
            <div class="warn">但徽章需更換為領袖專屬:<strong>世界童軍會員章 + 香港章 + 香港肩章 + 職級肩章 + 總會/地域/區章</strong>。</div>` },
        { id:"l-m-trousers", title:"草青色長褲", desc:"可沿用", status:"have", icon:"👖",
          detail:`<h4>長褲(可沿用)</h4>
            <p>與樂行長褲相同。</p>` },
        { id:"l-m-belt", title:"棕色皮帶", desc:"可沿用", status:"have", icon:"👔",
          detail:`<h4>棕色皮帶(可沿用)</h4>
            <p>與樂行皮帶相同。</p>` },
        { id:"l-m-socks", title:"黑色短襪", desc:"可沿用", status:"have", icon:"🧦",
          detail:`<h4>黑色短襪(可沿用)</h4>
            <p>與樂行短襪相同。</p>` },
        { id:"l-m-shoes", title:"黑色綁帶皮鞋", desc:"可沿用", status:"have", icon:"👞",
          detail:`<h4>黑色綁帶皮鞋(可沿用)</h4>
            <p>與樂行皮鞋相同。</p>` },
        { id:"l-m-tie", title:"深綠色領帶", desc:"必須購買", status:"need", icon:"👔",
          detail:`<h4>深綠色領帶(必須購買)</h4>
            <p>樂行不戴領帶,升任領袖後必須購買<strong>深綠色領帶</strong>(與深資/樂行的棗紅色不同)。</p>` },
        { id:"l-m-scarf", title:"旅巾(選用)", desc:"領袖可佩戴所屬旅巾", status:"check", icon:"🧣",
          detail:`<h4>旅巾(選用)</h4>
            <p>領袖如屬所屬旅團成員,可繼續佩戴<strong>所屬旅團的旅巾</strong>(出席所屬旅團活動時)。出席總會/地域/區活動時,一般不佩戴旅巾。</p>` },
        { id:"l-m-badges", title:"領袖徽章", desc:"必須更換", status:"need", icon:"🎖️",
          detail:`<h4>領袖徽章(必須更換)</h4>
            <p>樂行時期的徽章不可沿用,需領袖專屬徽章:</p>
            <ul>
              <li><strong>世界童軍會員章</strong>:左胸袋中央</li>
              <li><strong>香港章</strong>:左胸袋蓋上 3 厘米</li>
              <li><strong>香港肩章/旅章</strong>:肩章位置</li>
              <li><strong>職級肩章</strong>:肩上</li>
              <li><strong>總會總部章/地域章/區章</strong></li>
            </ul>
            <div class="tip">部分徽章由總會/地域/區/旅團頒發,需時申請。詳情向所屬區總監查詢。</div>` }
      ],
      female: [
        { id:"l-f-cap", title:"深綠色金邊硬帽(領袖)", desc:"必須更換", status:"need", icon:"👒",
          detail:`<h4>深綠色金邊硬帽(必須更換)</h4>
            <p>樂行軟帽<strong>不可沿用</strong>。需購買<strong>深綠色金邊硬帽</strong>(連職級帽章)。</p>
            <div class="warn">金邊硬帽為女領袖專用,男領袖不適用。</div>` },
        { id:"l-f-shirt", title:"杏色短袖恤衫", desc:"可沿用", status:"have", icon:"👕",
          detail:`<h4>杏色恤衫(可沿用)</h4>
            <p>與樂行恤衫相同。徽章需更換為領袖專屬。</p>` },
        { id:"l-f-skirt", title:"草青色半截裙", desc:"可沿用", status:"have", icon:"👗",
          detail:`<h4>半截裙(可沿用)</h4>
            <p>與樂行半截裙相同。</p>` },
        { id:"l-f-belt", title:"棕色皮帶", desc:"可沿用", status:"have", icon:"👔",
          detail:`<h4>棕色皮帶(可沿用)</h4>
            <p>與樂行皮帶相同。</p>` },
        { id:"l-f-pantyhose", title:"肉色尼龍襪褲", desc:"可沿用", status:"have", icon:"🧦",
          detail:`<h4>肉色尼龍襪褲(可沿用)</h4>
            <p>與樂行襪褲相同。</p>` },
        { id:"l-f-shoes", title:"黑色非綁帶中跟皮鞋", desc:"可沿用", status:"have", icon:"👠",
          detail:`<h4>黑色非綁帶中跟皮鞋(可沿用)</h4>
            <p>與樂行皮鞋相同。</p>` },
        { id:"l-f-tie", title:"深綠色領帶", desc:"必須購買", status:"need", icon:"👔",
          detail:`<h4>深綠色領帶(必須購買)</h4>
            <p>樂行不戴領帶,升任領袖後必須購買深綠色領帶。</p>` },
        { id:"l-f-scarf", title:"旅巾(選用)", desc:"領袖可佩戴所屬旅巾", status:"check", icon:"🧣",
          detail:`<h4>旅巾(選用)</h4>
            <p>領袖如屬所屬旅團成員,可繼續佩戴所屬旅團的旅巾。</p>` },
        { id:"l-f-badges", title:"領袖徽章", desc:"必須更換", status:"need", icon:"🎖️",
          detail:`<h4>領袖徽章(必須更換)</h4>
            <p>需領袖專屬徽章,與男領袖規格相同。</p>` }
      ]
    }
  }
};

// 預覽圖(已有 AI 插畫對應的支部/性別)
const PREVIEW_IMG = {
  "grasshopper-male":   null,  // 小童軍無制服插畫
  "grasshopper-female": null,
  "cub-male":   "assets/images/cub-male.jpg",
  "cub-female": "assets/images/cub-female.jpg",
  "scout-male":   "assets/images/scout-male.jpg",
  "scout-female": "assets/images/scout-female.jpg",
  "venture-male":   "assets/images/venture-male.jpg",
  "venture-female": "assets/images/venture-female.jpg",
  "rover-male":   "assets/images/rover-male.jpg",
  "rover-female": "assets/images/rover-female.jpg",
  "leader-male":   "assets/images/leader-male.jpg",
  "leader-female": "assets/images/leader-female.jpg"
};
