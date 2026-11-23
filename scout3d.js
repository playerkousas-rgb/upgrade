/* ===========================================================
   scout3d.js — 零依賴原生 3D 童軍制服與基本章擺位引擎（v2.3.1）
   參考 SCOUT3D 人形與《儀容與制服手冊》厘米比例於本機 Canvas 直接繪製：
   +Y 向上（地面 y = 0）、+Z 正面、+X 穿著者左邊（-X 穿著者右邊）。
   僅繪製幾何擺位示意（不自造或冒充官方繡章圖樣），零外部庫與 CSS 漸層。
   =========================================================== */
(function (global) {
  "use strict";

  const SHIRT_YOKE = 9;
  const BASE_H = 4.5;
  const BADGE_TEXTURES = new Map();

  const COLOURS = {
    plinth: "#2a3038",
    plinthTop: "#363e48",
    skin: "#f1c6a2",
    blush: "#eba099",
    hair: "#221914",
    eye: "#2a1b12",
    mouth: "#c8676a",
    orangeShirt: "#f07a1c",
    whiteTrim: "#f6f6f2",
    greyTrousers: "#8d8e90",
    whiteShoe: "#f4f4f4",
    whiteSole: "#c2c5ca",
    cubShirt: "#e4d8b6",
    cubGreen: "#6e7d43",
    cubSock: "#3d5230",
    belt: "#6a4326",
    buckle: "#d1d5db",
    shoeBlack: "#24252a",
    soleBlack: "#131417",
    capGreen: "#1f4a2c",
    capPiping: "#f0cc1e",
    beretGreen: "#1f4a2c",
    beretBand: "#17171a",
    seaShirt: "#f7f7f4",
    seaNavy: "#313166",
    seaSock: "#272754",
    seaCapTop: "#fbfbfa",
    capPeak: "#17171a",
    airShirt: "#94afdb",
    airBeret: "#24364f",
    ventureAirBeret: "#2c344e",
    maroon: "#8b2231",
    tights: "#e8c09c",
    blackSock: "#1c1c20",
    hardHat: "#1d4329",
    gold: "#d8b23a",
    neckerGreen: "#1f4a2c",
    neckerOrange: "#d9690f",
    neckerBlue: "#1f4e9c",
    woggleYellow: "#e9b425",
    woggleLeather: "#4a2f1f",
    tieMaroon: "#8e1f2c",
    tieBlack: "#1a1b20",
    tieNavy: "#262a55",
    tieGreen: "#1f4a2c",
    pocketShade: "#cbb990",
    accent: "#f2791c"
  };

  /* 各支部厘米身形規格（參考 SCOUT3D body.js 實物比例） */
  const BODY_SPECS = {
    grasshopper: {
      height: 117,
      head: { w: 18, h: 20, d: 18, y: 95 },
      neck: { w: 8, h: 4, d: 8, y: 91 },
      torso: { w: 24, h: 36, d: 13, y: 55 },
      upperArm: { w: 6.4, h: 18.5, d: 6.4 },
      lowerArm: { w: 5.8, h: 15.5, d: 5.8 },
      hand: { w: 5.2, h: 9.5, d: 4.0 },
      sleeve: { len: 15.5, band: 1.5, w: 7.7, d: 10.5 },
      leg: { w: 10, d: 10, y: 5, top: 58, gap: 1.2 },
      shoe: { w: 10.4, h: 6, d: 16.5, z: 2.2 },
      necker: { tailLen: 19, backW: 22, backH: 15.5, wogDrop: 7.2 },
      waist: 59
    },
    cub: {
      height: 135,
      head: { w: 19, h: 21, d: 19, y: 112 },
      neck: { w: 8.5, h: 4, d: 8.5, y: 108 },
      torso: { w: 27, h: 44, d: 15, y: 64 },
      upperArm: { w: 7.0, h: 21.5, d: 7.0 },
      lowerArm: { w: 6.4, h: 17.5, d: 6.4 },
      hand: { w: 5.8, h: 10.5, d: 4.4 },
      sleeve: { len: 18.5, band: 2.0, w: 8.6, d: 12.0 },
      leg: { w: 11.4, d: 11.4, y: 6, top: 67, gap: 1.2 },
      shoe: { w: 11.4, h: 6.5, d: 18.5, z: 2.4 },
      necker: { tailLen: 22, backW: 25, backH: 18.5, wogDrop: 7.5 },
      pocket: { x: 7.8, w: 10, h: 12.5, flap: 4.0, top: 13.5 },
      waist: 70
    },
    scout: {
      height: 155,
      head: { w: 20, h: 22.5, d: 20, y: 131 },
      neck: { w: 9.5, h: 4, d: 9.5, y: 127 },
      torso: { w: 31, h: 50, d: 17, y: 77 },
      upperArm: { w: 8.0, h: 25.5, d: 8.0 },
      lowerArm: { w: 7.0, h: 20.5, d: 7.0 },
      hand: { w: 6.4, h: 12.5, d: 4.8 },
      sleeve: { len: 22, band: 2.0, w: 10.0, d: 14.0 },
      leg: { w: 12.8, d: 12.8, y: 7, top: 80, gap: 1.2 },
      shoe: { w: 12.4, h: 7.0, d: 21.5, z: 2.8 },
      necker: { tailLen: 27, backW: 29, backH: 21.5, wogDrop: 9.0 },
      pocket: { x: 8.6, w: 11, h: 13.5, flap: 4.5, top: 15.5 },
      waist: 81
    },
    venture: {
      height: 168,
      head: { w: 21, h: 23.5, d: 21, y: 142 },
      neck: { w: 10, h: 4, d: 10, y: 138 },
      torso: { w: 34, h: 54, d: 18, y: 84 },
      upperArm: { w: 8.5, h: 28.5, d: 8.5 },
      lowerArm: { w: 7.5, h: 22.5, d: 7.5 },
      hand: { w: 6.8, h: 13.5, d: 5.2 },
      sleeve: { len: 24, band: 2.0, w: 10.5, d: 15.0 },
      leg: { w: 13.8, d: 13.8, y: 7.5, top: 87, gap: 1.2 },
      shoe: { w: 12.8, h: 7.5, d: 24.0, z: 3.2 },
      necker: { tailLen: 30, backW: 32, backH: 24, wogDrop: 10.0 },
      pocket: { x: 9.2, w: 12, h: 14.5, flap: 5.0, top: 17.0 },
      waist: 88,
      strap: { w: 4.4, t: 0.7 },
      skirtBottom: 46
    },
    rover: {
      height: 168,
      head: { w: 21, h: 23.5, d: 21, y: 142 },
      neck: { w: 10, h: 4, d: 10, y: 138 },
      torso: { w: 34, h: 54, d: 18, y: 84 },
      upperArm: { w: 8.5, h: 28.5, d: 8.5 },
      lowerArm: { w: 7.5, h: 22.5, d: 7.5 },
      hand: { w: 6.8, h: 13.5, d: 5.2 },
      sleeve: { len: 24, band: 2.0, w: 10.5, d: 15.0 },
      leg: { w: 13.8, d: 13.8, y: 7.5, top: 87, gap: 1.2 },
      shoe: { w: 12.8, h: 7.5, d: 24.0, z: 3.2 },
      necker: { tailLen: 30, backW: 32, backH: 24, wogDrop: 10.0 },
      pocket: { x: 9.2, w: 12, h: 14.5, flap: 5.0, top: 17.0 },
      waist: 88,
      strap: { w: 4.4, t: 0.7 },
      skirtBottom: 46
    },
    leader: {
      height: 170,
      head: { w: 21, h: 23.5, d: 21, y: 144 },
      neck: { w: 10, h: 4, d: 10, y: 140 },
      torso: { w: 34.5, h: 55, d: 18.2, y: 85 },
      upperArm: { w: 8.5, h: 29.0, d: 8.5 },
      lowerArm: { w: 7.5, h: 23.0, d: 7.5 },
      hand: { w: 6.8, h: 13.5, d: 5.2 },
      sleeve: { len: 24, band: 2.0, w: 10.6, d: 15.0 },
      leg: { w: 13.8, d: 13.8, y: 7.5, top: 88, gap: 1.2 },
      shoe: { w: 12.8, h: 7.5, d: 24.0, z: 3.2 },
      necker: { tailLen: 30, backW: 32, backH: 24, wogDrop: 10.0 },
      pocket: { x: 9.2, w: 12, h: 14.5, flap: 5.0, top: 17.0 },
      waist: 89,
      strap: { w: 4.4, t: 0.7 },
      skirtBottom: 47
    }
  };

  function getBody(section, gender) {
    const base = BODY_SPECS[section] || BODY_SPECS.cub;
    const isFemale = gender === "female";
    const k = section === "leader" && isFemale ? 160 / 170 : 1;
    const torsoW = isFemale ? Math.round((base.torso.w - (section === "leader" ? 3.0 : 1.0)) * 10) / 10 : base.torso.w;
    if (k === 1 && torsoW === base.torso.w) return base;
    return {
      height: Math.round(base.height * k),
      head: { w: base.head.w * k, h: base.head.h * k, d: base.head.d * k, y: base.head.y * k },
      neck: { w: base.neck.w * k, h: base.neck.h * k, d: base.neck.d * k, y: base.neck.y * k },
      torso: { w: torsoW, h: base.torso.h * k, d: base.torso.d * k, y: base.torso.y * k },
      upperArm: { w: base.upperArm.w * k, h: base.upperArm.h * k, d: base.upperArm.d * k },
      lowerArm: { w: base.lowerArm.w * k, h: base.lowerArm.h * k, d: base.lowerArm.d * k },
      hand: { w: base.hand.w * k, h: base.hand.h * k, d: base.hand.d * k },
      sleeve: { len: base.sleeve.len * k, band: base.sleeve.band, w: base.sleeve.w * k, d: base.sleeve.d * k },
      leg: { w: base.leg.w * k, d: base.leg.d * k, y: base.leg.y * k, top: base.leg.top * k, gap: base.leg.gap },
      shoe: { w: base.shoe.w * k, h: base.shoe.h * k, d: base.shoe.d * k, z: base.shoe.z },
      necker: { tailLen: base.necker.tailLen * k, backW: base.necker.backW * k, backH: base.necker.backH * k, wogDrop: base.necker.wogDrop * k },
      pocket: base.pocket ? {
        x: base.pocket.x * k, w: base.pocket.w * k, h: base.pocket.h * k,
        flap: base.pocket.flap * k, top: base.pocket.top * k
      } : null,
      waist: base.waist * k,
      strap: base.strap || null,
      skirtBottom: base.skirtBottom ? base.skirtBottom * k : 0
    };
  }

  function getPalette(state) {
    const { section, branch, gender, bottom } = state;
    const isFemale = gender === "female";
    if (section === "grasshopper") {
      return {
        shirt: COLOURS.orangeShirt,
        collar: COLOURS.whiteTrim,
        cuff: COLOURS.whiteTrim,
        leg: COLOURS.greyTrousers,
        sock: COLOURS.greyTrousers,
        shoe: COLOURS.whiteShoe,
        sole: COLOURS.whiteSole,
        necker: COLOURS.neckerOrange,
        woggle: COLOURS.woggleYellow,
        hat: "none",
        shorts: false,
        skirt: false,
        tie: null
      };
    }
    if (section === "cub") {
      return {
        shirt: COLOURS.cubShirt,
        collar: COLOURS.cubShirt,
        cuff: COLOURS.cubShirt,
        leg: COLOURS.cubGreen,
        sock: COLOURS.cubSock,
        shoe: COLOURS.shoeBlack,
        sole: COLOURS.soleBlack,
        necker: COLOURS.neckerBlue,
        woggle: COLOURS.woggleYellow,
        hat: isFemale ? "cubRound" : "cubCap",
        hatColor: COLOURS.capGreen,
        shorts: true,
        skirt: false,
        tie: null
      };
    }
    const sea = branch === "sea";
    const air = branch === "air";
    const shirt = sea ? COLOURS.seaShirt : air ? COLOURS.airShirt : COLOURS.cubShirt;
    const leg = sea || air ? COLOURS.seaNavy : COLOURS.cubGreen;
    const sock = sea || air ? COLOURS.seaSock : COLOURS.cubSock;
    const tie = sea ? COLOURS.tieBlack : air ? COLOURS.tieNavy : (section === "venture" ? COLOURS.tieMaroon : COLOURS.tieGreen);
    if (section === "scout") {
      return {
        shirt, collar: shirt, cuff: shirt, leg, sock,
        shoe: COLOURS.shoeBlack, sole: COLOURS.soleBlack,
        necker: COLOURS.neckerGreen, woggle: COLOURS.woggleLeather,
        hat: sea ? "seaCap" : "beret",
        hatColor: air ? COLOURS.airBeret : COLOURS.beretGreen,
        shorts: true, skirt: false, tie: null
      };
    }
    const isSkirt = isFemale && bottom !== "trousers";
    let hat = sea ? "seaCap" : "beret";
    let hatColor = section === "venture"
      ? (air ? COLOURS.ventureAirBeret : COLOURS.maroon)
      : (air ? COLOURS.ventureAirBeret : COLOURS.beretGreen);
    if (section === "leader" && !sea && !air && isSkirt) {
      hat = "hardHat";
      hatColor = COLOURS.hardHat;
    }
    return {
      shirt, collar: shirt, cuff: shirt, leg,
      sock: isSkirt ? COLOURS.tights : COLOURS.blackSock,
      shoe: COLOURS.shoeBlack, sole: COLOURS.soleBlack,
      necker: COLOURS.neckerGreen, woggle: COLOURS.woggleLeather,
      hat, hatColor,
      shorts: false,
      skirt: isSkirt,
      tie
    };
  }

  /* ── 3D 向量與顏色著色工具 ── */
  function parseHex(hex) {
    const clean = hex.replace("#", "");
    const n = parseInt(clean.length === 3 ? clean.replace(/./g, c => c + c) : clean, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function shadeRgb(hex, factor) {
    const [r, g, b] = parseHex(hex);
    const clamp = v => Math.max(0, Math.min(255, Math.round(v)));
    return `rgb(${clamp(r * factor)},${clamp(g * factor)},${clamp(b * factor)})`;
  }
  function mixHex(hex, targetHex, t) {
    const [r1, g1, b1] = parseHex(hex);
    const [r2, g2, b2] = parseHex(targetHex);
    const ch = (a, b) => Math.round(a + (b - a) * t);
    return `rgb(${ch(r1, r2)},${ch(g1, g2)},${ch(b1, b2)})`;
  }

  function norm3(v) {
    const len = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / len, v[1] / len, v[2] / len];
  }
  function sub3(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross3(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
  function dot3(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }

  function rotatePoint(p, rx, ry, rz) {
    let [x, y, z] = p;
    if (rx) {
      const c = Math.cos(rx), s = Math.sin(rx);
      const y1 = y * c - z * s, z1 = y * s + z * c;
      y = y1; z = z1;
    }
    if (ry) {
      const c = Math.cos(ry), s = Math.sin(ry);
      const x1 = x * c + z * s, z1 = -x * s + z * c;
      x = x1; z = z1;
    }
    if (rz) {
      const c = Math.cos(rz), s = Math.sin(rz);
      const x1 = x * c - y * s, y1 = x * s + y * c;
      x = x1; y = y1;
    }
    return [x, y, z];
  }

  /* ── 幾何生成：長方體／梯台／多邊形平面／立體基本章 ── */
  function pushFrustum(polys, { cx, cy, cz, tw, td, bw, bd, h, rot = [0, 0, 0], color, faceColors = null, stroke = "rgba(22,30,24,0.14)", bias = 0 }) {
    const hy = h / 2;
    const htw = tw / 2, htd = td / 2, hbw = bw / 2, hbd = bd / 2;
    const local = [
      [-hbw, -hy, hbd], [hbw, -hy, hbd], [htw, hy, htd], [-htw, hy, htd],   // 0..3 front (+Z)
      [-hbw, -hy, -hbd], [hbw, -hy, -hbd], [htw, hy, -htd], [-htw, hy, -htd] // 4..7 back (-Z)
    ];
    const [rx, ry, rz] = rot;
    const verts = local.map(v => {
      const r = rotatePoint(v, rx, ry, rz);
      return [r[0] + cx, r[1] + cy, r[2] + cz];
    });
    const faces = [
      { key: "pz", idx: [0, 1, 2, 3] }, // front +Z
      { key: "nz", idx: [5, 4, 7, 6] }, // back -Z
      { key: "px", idx: [1, 5, 6, 2] }, // left +X
      { key: "nx", idx: [4, 0, 3, 7] }, // right -X
      { key: "py", idx: [3, 2, 6, 7] }, // top +Y
      { key: "ny", idx: [4, 5, 1, 0] }  // bottom -Y
    ];
    for (const f of faces) {
      const pts = f.idx.map(i => verts[i]);
      const n = norm3(cross3(sub3(pts[1], pts[0]), sub3(pts[2], pts[0])));
      polys.push({
        kind: "quad",
        pts,
        normal: n,
        color: (faceColors && faceColors[f.key]) || color,
        stroke,
        bias
      });
    }
  }

  function pushBox(polys, { cx, cy, cz, w, h, d, rot = [0, 0, 0], color, faceColors = null, stroke = "rgba(22,30,24,0.14)", bias = 0 }) {
    pushFrustum(polys, { cx, cy, cz, tw: w, td: d, bw: w, bd: d, h, rot, color, faceColors, stroke, bias });
  }

  function pushCylinder(polys, { cx, cy, cz, rTop, rBot, h, segs = 12, color, stroke = "rgba(22,30,24,0.12)", bias = 0 }) {
    const hy = h / 2;
    const topPts = [], botPts = [];
    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      topPts.push([cx + rTop * ca, cy + hy, cz + rTop * sa]);
      botPts.push([cx + rBot * ca, cy - hy, cz + rBot * sa]);
    }
    for (let i = 0; i < segs; i++) {
      const j = (i + 1) % segs;
      const pts = [botPts[i], botPts[j], topPts[j], topPts[i]];
      const n = norm3(cross3(sub3(pts[1], pts[0]), sub3(pts[2], pts[0])));
      polys.push({ kind: "quad", pts, normal: n, color, stroke, bias });
    }
    // Top cap
    const topNormal = [0, 1, 0];
    polys.push({ kind: "poly", pts: topPts.slice().reverse(), normal: topNormal, color, stroke, bias });
  }

  function pushQuad(polys, pts, color, { stroke = "rgba(22,30,24,0.14)", bias = 0, doubleSided = false } = {}) {
    const n = norm3(cross3(sub3(pts[1], pts[0]), sub3(pts[2], pts[0])));
    polys.push({ kind: "quad", pts, normal: n, color, stroke, bias, doubleSided });
  }

  function pushBadge(polys, badge, { cx, cy, cz, w, h, rot = [0, 0, 0], bias = 1.6 }) {
    const hw = w / 2, hh = h / 2;
    const local = [[-hw, -hh, 0], [hw, -hh, 0], [hw, hh, 0], [-hw, hh, 0]];
    const [rx, ry, rz] = rot;
    const pts = local.map(v => {
      const r = rotatePoint(v, rx, ry, rz);
      return [r[0] + cx, r[1] + cy, r[2] + cz];
    });
    const n = norm3(cross3(sub3(pts[1], pts[0]), sub3(pts[2], pts[0])));
    polys.push({
      kind: "badge",
      badge,
      pts,
      normal: n,
      color: badge.color || "#1B4332",
      bias
    });
  }

  /* ── 依目前制服狀態建立 3D 童軍模型 + 基本章貼片 ── */
  function buildScene(state, badges, options = {}) {
    const polys = [];
    const { section, branch, gender } = state;
    const B = getBody(section, gender);
    const P = getPalette(state);
    const showBadges = options.showBadges !== false;
    const wearTie = !!options.wearTie && ["venture", "rover", "leader"].includes(section);
    const topY = B.torso.y + B.torso.h;
    const isFemale = gender === "female";

    // 1. 圓形底座 (y = 0 .. BASE_H)
    pushCylinder(polys, {
      cx: 0, cy: BASE_H / 2, cz: 0,
      rTop: 26, rBot: 27.5, h: BASE_H, segs: 16,
      color: COLOURS.plinth, stroke: "rgba(255,255,255,0.08)", bias: -2
    });

    // 2. 鞋子＋下身（短褲+長襪 / 長褲 / 女半截裙+襪褲+中跟鞋）
    const footBase = BASE_H;
    const legX = B.leg.w / 2 + B.leg.gap / 2;
    for (const sx of [1, -1]) {
      const lx = sx * legX;
      // 鞋
      if (P.skirt) {
        // 中跟皮鞋：後跟 + 前鞋掌 + 腳面襪褲
        pushBox(polys, {
          cx: lx, cy: footBase + B.shoe.h * 0.3, cz: B.shoe.z - B.shoe.d * 0.34,
          w: B.shoe.w * 0.52, h: B.shoe.h * 0.6, d: B.shoe.d * 0.18, color: P.shoe
        });
        pushBox(polys, {
          cx: lx, cy: footBase + B.shoe.h * 0.25, cz: B.shoe.z + B.shoe.d * 0.26,
          w: B.shoe.w, h: B.shoe.h * 0.5, d: B.shoe.d * 0.42, color: P.shoe
        });
        pushBox(polys, {
          cx: lx, cy: footBase + B.shoe.h * 0.68, cz: B.shoe.z - 0.3,
          w: B.shoe.w - 1.5, h: B.shoe.h * 0.42, d: B.shoe.d * 0.72, color: COLOURS.tights
        });
      } else {
        pushBox(polys, {
          cx: lx, cy: footBase + 1.0, cz: B.shoe.z,
          w: B.shoe.w, h: 2.0, d: B.shoe.d, color: P.sole
        });
        pushBox(polys, {
          cx: lx, cy: footBase + 2.0 + (B.shoe.h - 2.0) / 2, cz: B.shoe.z - 0.3,
          w: B.shoe.w - 0.3, h: B.shoe.h - 2.0, d: B.shoe.d - 0.6, color: P.shoe
        });
      }

      if (P.skirt) {
        // 小腿（肉色襪褲）
        const shinH = B.skirtBottom - footBase - B.shoe.h * 0.5 + 3;
        pushBox(polys, {
          cx: lx, cy: footBase + B.shoe.h * 0.5 + shinH / 2, cz: 0,
          w: B.leg.w * 0.84, h: shinH, d: B.leg.d * 0.84, color: COLOURS.tights
        });
      } else if (P.shorts) {
        // 長襪（連 3 cm 反摺襪邊）+ 膝蓋露肉 + 短褲
        const sockTop = B.leg.top - (B.leg.top - B.leg.y) * 0.44;
        const sockH = sockTop - (footBase + B.shoe.h - 1);
        pushBox(polys, {
          cx: lx, cy: footBase + B.shoe.h - 1 + sockH / 2, cz: 0,
          w: B.leg.w * 0.9, h: sockH, d: B.leg.d * 0.9, color: P.sock
        });
        // 襪頭反摺 3 cm
        pushBox(polys, {
          cx: lx, cy: sockTop - 1.5, cz: 0,
          w: B.leg.w * 0.96, h: 3.0, d: B.leg.d * 0.96, color: P.sock, bias: 0.25
        });
        // 膝部皮膚
        const kneeBottom = sockTop;
        const shortsBottom = B.leg.top - (B.leg.top - B.leg.y) * 0.31;
        const kneeH = Math.max(4, shortsBottom - kneeBottom + 1);
        pushBox(polys, {
          cx: lx, cy: kneeBottom + kneeH / 2 - 0.5, cz: 0,
          w: B.leg.w * 0.86, h: kneeH, d: B.leg.d * 0.86, color: COLOURS.skin
        });
        // 短褲褲管
        const shortsH = B.torso.y - shortsBottom + 2;
        pushBox(polys, {
          cx: lx, cy: shortsBottom + shortsH / 2, cz: 0,
          w: B.leg.w * 1.06, h: shortsH, d: B.leg.d * 1.06, color: P.leg
        });
      } else {
        // 長褲 + 短襪露出一小截
        const trouserBottom = footBase + B.shoe.h + 2;
        const sockH = 4.5;
        pushBox(polys, {
          cx: lx, cy: footBase + B.shoe.h - 1 + sockH / 2, cz: 0,
          w: B.leg.w * 0.86, h: sockH, d: B.leg.d * 0.86, color: P.sock
        });
        const legH = B.torso.y - trouserBottom + 2;
        pushBox(polys, {
          cx: lx, cy: trouserBottom + legH / 2, cz: 0,
          w: B.leg.w * 1.02, h: legH, d: B.leg.d * 1.02, color: P.leg
        });
      }
    }

    if (P.skirt) {
      // A 字及膝半截裙
      const skirtH = B.torso.y - B.skirtBottom + 2;
      pushFrustum(polys, {
        cx: 0, cy: B.skirtBottom + skirtH / 2, cz: 0,
        tw: B.torso.w + 0.6, td: B.torso.d + 0.8,
        bw: B.torso.w + 5.8, bd: B.torso.d + 4.4,
        h: skirtH, color: P.leg, bias: 0.2
      });
    } else if (section !== "grasshopper") {
      // 褲頭 / 短褲腰部連接塊
      pushBox(polys, {
        cx: 0, cy: B.torso.y - 1.5, cz: 0,
        w: B.torso.w + 0.2, h: 6, d: B.torso.d + 0.4, color: P.leg
      });
    }

    // 3. 上身軀幹（恤衫 / 小童軍活動服）
    pushBox(polys, {
      cx: 0, cy: B.torso.y + B.torso.h / 2, cz: 0,
      w: B.torso.w, h: B.torso.h, d: B.torso.d, color: P.shirt
    });

    // 恤衫前幅門襟線 + 鈕扣（幼童軍以上）
    if (section !== "grasshopper") {
      const fz = B.torso.d / 2 + 0.16;
      pushQuad(polys, [
        [-1.3, B.torso.y + 4, fz], [1.3, B.torso.y + 4, fz],
        [1.3, topY - 1, fz], [-1.3, topY - 1, fz]
      ], mixHex(P.shirt, "#000000", 0.08), { stroke: "rgba(0,0,0,0.08)", bias: 0.2 });
      // 腰帶（幼童軍至領袖）
      const beltH = 3.2;
      pushBox(polys, {
        cx: 0, cy: B.torso.y + beltH / 2 + 0.2, cz: 0,
        w: B.torso.w + 0.8, h: beltH, d: B.torso.d + 0.8, color: COLOURS.belt, bias: 0.35
      });
      // 皮帶扣（正中）
      pushBox(polys, {
        cx: 0, cy: B.torso.y + beltH / 2 + 0.2, cz: B.torso.d / 2 + 0.55,
        w: 4.4, h: 3.4, d: 0.7, color: COLOURS.buckle, bias: 0.6
      });
    }

    // 背後擔干線（yoke line = 肩下 9 cm）
    const bz = -B.torso.d / 2 - 0.14;
    pushQuad(polys, [
      [B.torso.w / 2 - 0.5, topY - SHIRT_YOKE, bz],
      [-B.torso.w / 2 + 0.5, topY - SHIRT_YOKE, bz],
      [-B.torso.w / 2 + 0.5, topY - SHIRT_YOKE + 0.5, bz],
      [B.torso.w / 2 - 0.5, topY - SHIRT_YOKE + 0.5, bz]
    ], mixHex(P.shirt, "#000000", 0.16), { stroke: "none", bias: 0.2 });

    // 左右胸袋＋袋蓋（幼童軍至領袖）
    if (B.pocket) {
      const pk = B.pocket;
      const pkFront = B.torso.d / 2 + 0.32;
      const flapFront = B.torso.d / 2 + 0.56;
      const pkTop = topY - pk.top;
      const pkColor = mixHex(P.shirt, "#000000", 0.05);
      const flapColor = mixHex(P.shirt, "#000000", 0.1);
      for (const sx of [1, -1]) {
        const px = sx * pk.x;
        // 袋身
        pushQuad(polys, [
          [px - pk.w / 2, pkTop - pk.h, pkFront],
          [px + pk.w / 2, pkTop - pk.h, pkFront],
          [px + pk.w / 2, pkTop, pkFront],
          [px - pk.w / 2, pkTop, pkFront]
        ], pkColor, { stroke: "rgba(30,25,18,0.22)", bias: 0.45 });
        // 袋蓋
        pushQuad(polys, [
          [px - pk.w / 2 - 0.2, pkTop - pk.flap, flapFront],
          [px + pk.w / 2 + 0.2, pkTop - pk.flap, flapFront],
          [px + pk.w / 2 + 0.2, pkTop, flapFront],
          [px - pk.w / 2 - 0.2, pkTop, flapFront]
        ], flapColor, { stroke: "rgba(30,25,18,0.26)", bias: 0.65 });
      }
    }

    // 4. 雙肩肩帶（深資童軍、樂行童軍、領袖）
    const shoulderTipX = B.torso.w / 2 + B.upperArm.w / 2 + 0.3 + B.sleeve.w / 2 - 0.5;
    const collarInnerX = B.neck.w / 2 + 1.8;
    const strapLen = Math.max(8, shoulderTipX - collarInnerX);
    const strapCx = (shoulderTipX + collarInnerX) / 2;
    if (B.strap) {
      for (const sx of [1, -1]) {
        pushBox(polys, {
          cx: sx * strapCx, cy: topY + B.strap.t / 2 + 0.1, cz: 0,
          w: strapLen, h: B.strap.t, d: B.strap.w,
          color: mixHex(P.shirt, "#000000", 0.08), bias: 0.7
        });
      }
    }

    // 5. 兩隻手臂與短袖（穿著者左 +X、穿著者右 -X）
    const armX = B.torso.w / 2 + B.upperArm.w / 2 + 0.4;
    const shoulderY = topY - 1.0;
    const armAngle = 0.055; // 微向外展
    const sleeveSeamY = topY;
    for (const sx of [1, -1]) {
      const rz = sx * armAngle;
      // 上袖
      const slCy = sleeveSeamY - B.sleeve.len / 2;
      const slCx = sx * (armX + Math.sin(armAngle) * (B.sleeve.len / 2 - 1));
      pushBox(polys, {
        cx: slCx, cy: slCy, cz: 0,
        w: B.sleeve.w, h: B.sleeve.len, d: B.sleeve.d,
        rot: [0, 0, rz], color: P.shirt
      });
      // 小童軍白色袖口邊
      if (section === "grasshopper") {
        const bandCy = sleeveSeamY - B.sleeve.len + B.sleeve.band / 2;
        const bandCx = sx * (armX + Math.sin(armAngle) * (B.sleeve.len - B.sleeve.band / 2 - 1));
        pushBox(polys, {
          cx: bandCx, cy: bandCy, cz: 0,
          w: B.sleeve.w + 0.3, h: B.sleeve.band, d: B.sleeve.d + 0.3,
          rot: [0, 0, rz], color: P.cuff, bias: 0.25
        });
      }
      // 露出的前臂與手掌
      const armOffset = B.sleeve.len - 2;
      const bareLen = B.upperArm.h + B.lowerArm.h - armOffset;
      const bareCy = sleeveSeamY - armOffset - bareLen / 2;
      const bareCx = sx * (armX + Math.sin(armAngle) * (armOffset + bareLen / 2 - 1));
      pushBox(polys, {
        cx: bareCx, cy: bareCy, cz: 0,
        w: B.lowerArm.w, h: bareLen, d: B.lowerArm.d,
        rot: [0, 0, rz], color: COLOURS.skin
      });
      const handCy = sleeveSeamY - armOffset - bareLen - B.hand.h / 2 + 0.8;
      const handCx = sx * (armX + Math.sin(armAngle) * (armOffset + bareLen + B.hand.h / 2 - 1.5));
      pushBox(polys, {
        cx: handCx, cy: handCy, cz: 0,
        w: B.hand.w, h: B.hand.h, d: B.hand.d,
        rot: [0, 0, rz], color: COLOURS.skin
      });
    }

    // 6. 衣領、旅巾＋巾圈（或典禮領呔）
    const collarZ = B.torso.d / 2 + 0.25;
    for (const sx of [1, -1]) {
      pushQuad(polys, [
        [sx * 0.6, topY - 4.8, collarZ + 0.15],
        [sx * (B.neck.w / 2 + 3.2), topY - 3.6, collarZ],
        [sx * (B.neck.w / 2 + 2.0), topY + 0.2, collarZ],
        [sx * 0.4, topY + 0.1, collarZ]
      ], P.collar, { stroke: "rgba(30,25,18,0.18)", bias: 0.55, doubleSided: true });
    }

    if (wearTie && P.tie) {
      const tz = B.torso.d / 2 + 0.75;
      // 領呔結 + 呔身
      pushBox(polys, {
        cx: 0, cy: topY - 1.6, cz: tz,
        w: 3.4, h: 3.0, d: 1.4, color: P.tie, bias: 0.9
      });
      pushQuad(polys, [
        [-2.2, topY - 22, tz], [2.2, topY - 22, tz],
        [1.4, topY - 3.0, tz], [-1.4, topY - 3.0, tz]
      ], P.tie, { stroke: "rgba(0,0,0,0.22)", bias: 0.88, doubleSided: true });
      pushQuad(polys, [
        [0, topY - 25.5, tz], [2.2, topY - 22, tz],
        [-2.2, topY - 22, tz], [0, topY - 25.5, tz]
      ], P.tie, { stroke: "rgba(0,0,0,0.22)", bias: 0.88, doubleSided: true });
    } else {
      // 旅巾頸環
      pushBox(polys, {
        cx: 0, cy: topY + 0.9, cz: 0,
        w: B.neck.w + 3.6, h: 2.6, d: B.neck.d + 3.6,
        color: P.necker, bias: 0.75
      });
      // 旅巾背後三角（垂至背擔干）
      const backZ = -B.torso.d / 2 - 0.55;
      pushQuad(polys, [
        [0, topY - B.necker.backH, backZ - 0.2],
        [-B.necker.backW / 2, topY + 0.4, backZ],
        [B.necker.backW / 2, topY + 0.4, backZ],
        [0, topY - B.necker.backH, backZ - 0.2]
      ], P.necker, { stroke: "rgba(0,0,0,0.2)", bias: 0.78, doubleSided: true });
      // 旅巾前幅兩條巾尾＋巾圈
      const frontZ = B.torso.d / 2 + 0.75;
      const wogY = topY - B.necker.wogDrop;
      pushBox(polys, {
        cx: 0, cy: wogY, cz: frontZ + 0.45,
        w: 3.6, h: 2.5, d: 2.2, color: P.woggle, bias: 1.05
      });
      for (const sx of [1, -1]) {
        const tailBot = topY - B.necker.tailLen;
        pushQuad(polys, [
          [sx * 0.3, wogY - 0.8, frontZ + 0.15],
          [sx * 3.4, tailBot, frontZ + 0.2],
          [sx * 2.2, wogY - 0.2, frontZ + 0.1],
          [sx * 0.2, topY + 0.3, frontZ + 0.1]
        ], P.necker, { stroke: "rgba(0,0,0,0.2)", bias: 0.92, doubleSided: true });
      }
    }

    // 7. 頸、頭、五官與髮型
    pushBox(polys, {
      cx: 0, cy: B.neck.y + B.neck.h / 2, cz: 0,
      w: B.neck.w, h: B.neck.h, d: B.neck.d, color: COLOURS.skin
    });
    const headCy = B.head.y + B.head.h / 2;
    pushBox(polys, {
      cx: 0, cy: headCy, cz: 0.4,
      w: B.head.w, h: B.head.h, d: B.head.d, color: COLOURS.skin
    });
    // 頭髮頂＋後枕＋兩側
    const hairTopY = B.head.y + B.head.h;
    pushBox(polys, {
      cx: 0, cy: hairTopY - 2.2, cz: 0.2,
      w: B.head.w + 0.6, h: 5.0, d: B.head.d + 0.6, color: COLOURS.hair, bias: 0.25
    });
    pushBox(polys, {
      cx: 0, cy: headCy + 1.0, cz: -B.head.d / 2 + 2.2,
      w: B.head.w + 0.5, h: isFemale ? B.head.h - 1 : B.head.h * 0.68, d: 4.5,
      color: COLOURS.hair, bias: 0.22
    });
    if (isFemale) {
      // 女生雙側長髮／小馬尾示意
      for (const sx of [1, -1]) {
        pushBox(polys, {
          cx: sx * (B.head.w / 2 + 1.5), cy: B.head.y + 4.5, cz: -1.5,
          w: 3.4, h: 12.5, d: 4.0, color: COLOURS.hair, bias: 0.2
        });
      }
    }
    // 五官（面向 +Z）
    const faceZ = 0.4 + B.head.d / 2 + 0.14;
    for (const sx of [1, -1]) {
      const ex = sx * (B.head.w * 0.23);
      pushQuad(polys, [
        [ex - 1.1, B.head.y + 9.2, faceZ], [ex + 1.1, B.head.y + 9.2, faceZ],
        [ex + 1.1, B.head.y + 11.4, faceZ], [ex - 1.1, B.head.y + 11.4, faceZ]
      ], COLOURS.eye, { stroke: "none", bias: 0.35, doubleSided: true });
      pushQuad(polys, [
        [ex - 1.5, B.head.y + 12.6, faceZ], [ex + 1.5, B.head.y + 12.6, faceZ],
        [ex + 1.5, B.head.y + 13.3, faceZ], [ex - 1.5, B.head.y + 13.3, faceZ]
      ], COLOURS.hair, { stroke: "none", bias: 0.35, doubleSided: true });
      pushQuad(polys, [
        [sx * (B.head.w * 0.31) - 1.2, B.head.y + 6.4, faceZ],
        [sx * (B.head.w * 0.31) + 1.2, B.head.y + 6.4, faceZ],
        [sx * (B.head.w * 0.31) + 1.2, B.head.y + 7.6, faceZ],
        [sx * (B.head.w * 0.31) - 1.2, B.head.y + 7.6, faceZ]
      ], COLOURS.blush, { stroke: "none", bias: 0.35, doubleSided: true });
    }
    pushQuad(polys, [
      [-1.8, B.head.y + 4.5, faceZ], [1.8, B.head.y + 4.5, faceZ],
      [1.8, B.head.y + 5.2, faceZ], [-1.8, B.head.y + 5.2, faceZ]
    ], COLOURS.mouth, { stroke: "none", bias: 0.35, doubleSided: true });

    // 8. 支部帽子（小童軍不戴帽；幼童軍男鴨舌/女圓帽；海童軍白頂帽；陸空軟帽；女領袖硬帽或編號 6 軟帽）
    const browY = hairTopY - 6.8;
    let capBadgePose = null;
    if (P.hat === "cubCap") {
      const base = hairTopY - 4.2;
      const cw = B.head.w + 1.4, ch = 6.6, cd = B.head.d + 1.4;
      pushBox(polys, { cx: 0, cy: base + ch / 2, cz: 0.4, w: cw, h: ch, d: cd, color: P.hatColor, bias: 0.55 });
      // 黃色間條
      pushBox(polys, { cx: 0, cy: base + ch - 0.5, cz: 0.4, w: 1.2, h: 1.0, d: cd + 0.3, color: COLOURS.capPiping, bias: 0.7 });
      pushBox(polys, { cx: 0, cy: base + 0.6, cz: 0.4 + cd / 2 + 3.6, w: cw - 2.2, h: 0.9, d: 8.2, rot: [0.08, 0, 0], color: P.hatColor, bias: 0.6 });
      capBadgePose = { cx: 0, cy: base + ch * 0.54, cz: 0.4 + cd / 2 + 0.25, w: 3.2, h: 2.5, rot: [0, 0, 0] };
    } else if (P.hat === "cubRound") {
      const base = hairTopY - 4.2;
      const cw = B.head.w + 1.6, ch = 7.0, cd = B.head.d + 1.6;
      pushBox(polys, { cx: 0, cy: base + ch / 2, cz: 0.4, w: cw, h: ch, d: cd, color: P.hatColor, bias: 0.55 });
      pushBox(polys, { cx: 0, cy: base + 0.4, cz: 0.4, w: cw + 6.5, h: 0.9, d: cd + 6.5, color: P.hatColor, bias: 0.5 });
      capBadgePose = { cx: 0, cy: base + ch * 0.54, cz: 0.4 + cd / 2 + 0.25, w: 3.2, h: 2.5, rot: [0, 0, 0] };
    } else if (P.hat === "seaCap") {
      const base = browY + 2.5;
      const bw = B.head.w + 1.2, bd = B.head.d + 1.2;
      pushBox(polys, { cx: 0, cy: base + 1.3, cz: 0.4, w: bw, h: 2.6, d: bd, color: COLOURS.capPeak, bias: 0.55 });
      pushFrustum(polys, {
        cx: 0, cy: base + 4.8, cz: 0.4,
        tw: bw + 4.6, td: bd + 4.6, bw: bw + 0.6, bd: bd + 0.6,
        h: 4.6, color: COLOURS.seaCapTop, bias: 0.6
      });
      pushBox(polys, { cx: 0, cy: base + 0.1, cz: 0.4 + bd / 2 + 3.4, w: bw - 1.8, h: 0.9, d: 7.5, rot: [0.1, 0, 0], color: COLOURS.capPeak, bias: 0.65 });
      capBadgePose = { cx: 0, cy: base + 4.6, cz: 0.4 + bd / 2 + 1.8, w: 3.2, h: 3.2, rot: [-0.28, 0, 0] };
    } else if (P.hat === "hardHat") {
      const base = browY + 3.6;
      const cw = B.head.w + 1.2, ch = 7.0, cd = B.head.d + 1.2;
      pushBox(polys, { cx: 0, cy: base + ch / 2, cz: 0.4, w: cw, h: ch, d: cd, color: P.hatColor, bias: 0.55 });
      pushBox(polys, { cx: 0, cy: base + 1.0, cz: 0.4, w: cw + 0.3, h: 1.0, d: cd + 0.3, color: COLOURS.gold, bias: 0.7 });
      pushBox(polys, { cx: 0, cy: base + 0.3, cz: 0.4, w: cw + 5.8, h: 0.9, d: cd + 5.8, color: P.hatColor, bias: 0.5 });
      // 女領袖硬帽職級帽章戴於右邊（-X，略偏前太陽穴上方）
      capBadgePose = { cx: -(cw / 2 + 0.28), cy: base + 3.6, cz: 2.2, w: 2.8, h: 3.6, rot: [0, -Math.PI / 2, 0] };
    } else if (P.hat === "beret") {
      const bandY = browY + 2.8;
      const bw = B.head.w + 0.9, bd = B.head.d + 0.9;
      pushBox(polys, { cx: 0, cy: bandY, cz: 0.4, w: bw, h: 2.0, d: bd, color: COLOURS.beretBand, bias: 0.55 });
      const cw = B.head.w + 3.4, ch = 3.6, cd = B.head.d + 2.8;
      pushBox(polys, {
        cx: -1.8, cy: bandY + 2.5, cz: 0.0,
        w: cw, h: ch, d: cd, rot: [-0.06, 0, 0.16], color: P.hatColor, bias: 0.6
      });
      const eyeX = B.head.w / 2 - 4.8; // 左眼上方（+X）
      capBadgePose = { cx: eyeX, cy: bandY + 2.9, cz: 0.0 + cd / 2 + 0.25, w: 2.8, h: 2.8, rot: [-0.06, 0, 0.16] };
    }

    // 9. 基本徽章立體幾何標記（依實際厘米位置貼於胸袋、雙袖、雙肩及帽）
    if (showBadges && Array.isArray(badges)) {
      const pk = B.pocket;
      const pkFrontZ = B.torso.d / 2 + 0.65;
      const pkTop = pk ? topY - pk.top : topY - 12;
      const pkCentreY = pk ? pkTop - pk.flap - (pk.h - pk.flap) / 2 : topY - 14;

      for (const b of badges) {
        if (b.id === "capbadge") {
          if (capBadgePose) pushBadge(polys, b, capBadgePose);
          continue;
        }
        if (b.id === "epaulette") {
          if (!B.strap) continue;
          const bw = b.wCm || 4.6, bh = b.hCm || 3.65;
          const epY = topY + B.strap.t + 0.35;
          const epX = section === "leader" ? (shoulderTipX - 0.4 - bh / 2) : strapCx;
          const wX = section === "leader" ? bh : bw;
          const dZ = section === "leader" ? bw : bh;
          for (const sx of [1, -1]) {
            pushBadge(polys, b, {
              cx: sx * epX, cy: epY, cz: 0,
              w: wX, h: dZ,
              rot: [-Math.PI / 2, 0, 0],
              bias: 1.85
            });
          }
          continue;
        }
        if (b.mount === "torso") {
          const isLeft = b.side === "left";
          const sx = isLeft ? 1 : -1;
          const bx = pk ? sx * pk.x : sx * 6.5;
          let by = pkCentreY;
          if (b.anchor === "aboveFlap" && pk) {
            by = pkTop + (b.gapCm ?? 3.0) + (b.hCm || 4) / 2;
          } else if (b.anchor === "chest") {
            by = topY - 10.5;
          }
          pushBadge(polys, b, {
            cx: bx, cy: by, cz: pkFrontZ,
            w: b.wCm || 4.0, h: b.hCm || 4.0,
            rot: [0, 0, 0],
            bias: 1.75
          });
          continue;
        }
        if (b.mount === "sleeveR") {
          const rotY = -Math.PI / 2;
          let bv = 3.1;
          let bu = 0; // +bu = 近胸 (+Z)
          if (b.anchor === "troop") { bv = 2 + (b.hCm || 2.2) / 2; bu = 0; }
          else if (b.anchor === "region") { bv = 2 + 2.2 + 2.0 + (b.hCm || 5.0) / 2; bu = 2.4; }
          else if (b.anchor === "district") { bv = 2 + 2.2 + 2.0 + (b.hCm || 5.0) / 2; bu = -2.4; }
          else if (b.anchor === "districtSolo") { bv = 2 + 2.2 + 2.0 + (b.hCm || 5.0) / 2; bu = 0; }
          else if (b.anchor === "patrol") { bv = B.sleeve.len - B.sleeve.band - 3.0 - (b.hCm || 1.6) / 2; bu = 0; }
          const by = sleeveSeamY - bv;
          const bx = -(armX + Math.sin(armAngle) * (bv - 1) + B.sleeve.w / 2 + 0.42);
          pushBadge(polys, b, {
            cx: bx, cy: by, cz: bu,
            w: b.wCm || 3.8, h: b.hCm || 3.8,
            rot: [0, rotY, 0],
            bias: 1.75
          });
          continue;
        }
        if (b.mount === "sleeveL") {
          const rotY = Math.PI / 2;
          const bv = b.anchor === "cuff" ? (B.sleeve.len - B.sleeve.band - 3.0) : (B.sleeve.len * 0.45);
          const by = sleeveSeamY - bv;
          const bx = armX + Math.sin(armAngle) * (bv - 1) + B.sleeve.w / 2 + 0.42;
          pushBadge(polys, b, {
            cx: bx, cy: by, cz: 0,
            w: b.wCm || 4.2, h: b.hCm || 4.2,
            rot: [0, rotY, 0],
            bias: 1.75
          });
        }
      }
    }

    return { polys, body: B, palette: P };
  }

  /* ── 相機預設視角（對應穿著者真實角度；正 pitch = 由上俯視）── */
  const CAMERA_PRESETS = {
    front:     { yaw: 0,               pitch: 0.10, zoom: 1.12, focusY: 0.55 },
    left:      { yaw: -Math.PI * 0.36, pitch: 0.12, zoom: 1.52, focusY: 0.67 }, // 3/4 視角看穿著者左胸＋左袖 (+X)
    right:     { yaw: Math.PI * 0.36,  pitch: 0.12, zoom: 1.52, focusY: 0.67 }, // 3/4 視角看穿著者右胸＋右袖 (-X)
    shoulders: { yaw: 0.22,            pitch: 0.72, zoom: 1.65, focusY: 0.82 }, // 由上俯視雙肩肩章
    back:      { yaw: Math.PI,         pitch: 0.12, zoom: 1.12, focusY: 0.55 }
  };

  function viewToCamera(preset, heightCm) {
    const p = CAMERA_PRESETS[preset] || CAMERA_PRESETS.front;
    return {
      yaw: p.yaw,
      pitch: p.pitch,
      zoom: p.zoom,
      targetY: heightCm * p.focusY
    };
  }

  /* ── 視點投影與光影繪製 ── */
  function projectPoint(p, cam, W, H, heightCm) {
    // 先把對象移至相機目標點 (0, cam.targetY, 0)
    const x0 = p[0];
    const y0 = p[1] - cam.targetY;
    const z0 = p[2];

    // 繞 Y 軸旋轉 yaw（正 yaw = 相機移往 -X 右側）
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw);
    const x1 = x0 * cy + z0 * sy;
    const z1 = -x0 * sy + z0 * cy;
    const y1 = y0;

    // 繞 X 軸旋轉 pitch（正 pitch = 相機由上俯視，+Y 移向 +Z 更近相機）
    const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const y2 = y1 * cp - z1 * sp;
    const z2 = y1 * sp + z1 * cp;
    const x2 = x1;

    const camDist = Math.max(245, heightCm * 1.95) / Math.max(0.6, cam.zoom);
    const depth = camDist - z2; // > 0 在相機前面
    const fovScale = Math.min(W, H) * 0.88 * (camDist / Math.max(245, heightCm * 1.95)) * cam.zoom;
    const persp = fovScale / Math.max(40, depth);
    return {
      sx: W * 0.5 + x2 * persp,
      sy: H * 0.52 - y2 * persp,
      depth,
      x2, y2, z2
    };
  }

  function lightFactor(normal, cam, doubleSided) {
    // 視點方向固定為相機到物體；將法線轉至相機空間檢查是否朝向相機，並配合世界主光/補光著色
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw);
    const nx1 = normal[0] * cy + normal[2] * sy;
    const nz1 = -normal[0] * sy + normal[2] * cy;
    const ny1 = normal[1];
    const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const nz2 = ny1 * sp + nz1 * cp;
    if (!doubleSided && nz2 <= -0.04) return null; // backface cull
    const nEff = doubleSided && nz2 < 0 ? [-normal[0], -normal[1], -normal[2]] : normal;

    const key = norm3([0.38, 0.72, 0.58]);
    const fill = norm3([-0.5, 0.3, -0.4]);
    const d1 = Math.max(0, dot3(nEff, key));
    const d2 = Math.max(0, dot3(nEff, fill));
    return 0.62 + d1 * 0.34 + d2 * 0.14;
  }

  function drawAffinedPatch(ctx, p0, p1, p3, drawFn) {
    // p0=bottom-left, p1=bottom-right, p3=top-left (canvas pixel coords)
    // Map unit square [0..1, 0..1] (with u along p0->p1, v along p3->p0) to triangle
    const ux = p1.sx - p0.sx, uy = p1.sy - p0.sy;
    const vx = p0.sx - p3.sx, vy = p0.sy - p3.sy;
    const det = ux * vy - uy * vx;
    if (Math.abs(det) < 6) return false;
    ctx.save();
    ctx.transform(ux, uy, vx, vy, p3.sx, p3.sy);
    drawFn(ctx);
    ctx.restore();
    return true;
  }

  function pointInQuad(px, py, pts) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const xi = pts[i].sx, yi = pts[i].sy;
      const xj = pts[j].sx, yj = pts[j].sy;
      const intersect = ((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / ((yj - yi) || 1e-6) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  /* ── 控制器類別：綁定 Canvas + 工具列 + 徽章列表 ── */
  function createViewer(container, opts = {}) {
    if (!container) return null;

    let state = {
      section: opts.section || "cub",
      branch: opts.branch || "land",
      gender: opts.gender || "male",
      bottom: opts.bottom || "skirt",
      mode: opts.mode || "upgrade",
      lang: opts.lang || "zh-HK",
      badges: opts.badges || [],
      strings: opts.strings || {},
      checklistMap: opts.checklistMap || {},
      onInspect: opts.onInspect || null
    };

    let selectedBadgeId = opts.selectedBadgeId || (opts.badges && opts.badges[0] && opts.badges[0].id) || null;
    let hoveredBadgeId = null;
    let showBadges = true;
    let wearTie = false;
    let activePreset = "front";
    let scene = buildScene(state, state.badges, { showBadges, wearTie });
    let cam = viewToCamera("front", scene.body.height);
    let goal = null;
    let rafId = 0;
    let hitBadges = [];

    function esc(s) {
      return String(s ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
    }

    // 建立 DOM（嚴守 DESIGN.md 實色設計，無 gradient / 無 uppercase）
    container.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "scout3d-stage-wrap";
    wrap.innerHTML = `
      <div class="scout3d-toolbar" role="toolbar">
        <div class="scout3d-views"></div>
        <div class="scout3d-toggles"></div>
      </div>
      <div class="scout3d-grid">
        <div class="scout3d-canvas-box">
          <canvas class="scout3d-canvas" tabindex="0"></canvas>
          <div class="scout3d-hud">
            <span class="scout3d-hud-label"></span>
            <div class="scout3d-zoom-btns">
              <button type="button" class="scout3d-zoom-btn" data-zoom="in">+</button>
              <button type="button" class="scout3d-zoom-btn" data-zoom="out">−</button>
              <button type="button" class="scout3d-zoom-btn" data-zoom="reset">1:1</button>
            </div>
          </div>
        </div>
        <aside class="scout3d-sidebar">
          <div class="scout3d-badge-pills"></div>
          <div class="scout3d-inspector"></div>
        </aside>
      </div>
      <p class="cite scout3d-disclaimer"></p>`;
    container.appendChild(wrap);

    const canvas = wrap.querySelector(".scout3d-canvas");
    const viewsEl = wrap.querySelector(".scout3d-views");
    const togglesEl = wrap.querySelector(".scout3d-toggles");
    const hudLabel = wrap.querySelector(".scout3d-hud-label");
    const pillsEl = wrap.querySelector(".scout3d-badge-pills");
    const inspectorEl = wrap.querySelector(".scout3d-inspector");
    const disclaimerEl = wrap.querySelector(".scout3d-disclaimer");

    const ctx = typeof canvas.getContext === "function" ? canvas.getContext("2d") : null;

    function t(key, fallback) {
      return (state.strings && state.strings[key] != null) ? state.strings[key] : fallback;
    }

    function renderChrome() {
      const views = [
        ["front", t("viewFront", "正面")],
        ["left", t("viewLeft", "左胸・左袖")],
        ["right", t("viewRight", "右胸・右袖")],
        ["shoulders", t("viewShoulders", "雙肩")],
        ["back", t("viewBack", "背面")]
      ];
      viewsEl.setAttribute("aria-label", t("viewsAria", "3D 視角選擇"));
      viewsEl.innerHTML = views.map(([id, label]) =>
        `<button type="button" class="scout3d-view-btn${activePreset === id ? " active" : ""}" data-view="${esc(id)}" aria-pressed="${activePreset === id}">${esc(label)}</button>`
      ).join("");

      const hasTie = ["venture", "rover", "leader"].includes(state.section);
      togglesEl.innerHTML = `
        <button type="button" class="scout3d-opt-btn${showBadges ? " active" : ""}" data-toggle="badges" aria-pressed="${showBadges}">${esc(t("toggleBadges", "基本章示意"))}</button>
        ${hasTie ? `<button type="button" class="scout3d-opt-btn${wearTie ? " active" : ""}" data-toggle="tie" aria-pressed="${wearTie}">${esc(t("toggleTie", "典禮領呔"))}</button>` : ""}`;

      canvas.setAttribute("aria-label", t("canvasAria", "3D 童軍制服及基本章模型，可拖曳旋轉"));
      wrap.querySelector('[data-zoom="in"]').setAttribute("aria-label", t("zoomIn", "放大"));
      wrap.querySelector('[data-zoom="out"]').setAttribute("aria-label", t("zoomOut", "縮小"));
      wrap.querySelector('[data-zoom="reset"]').setAttribute("aria-label", t("zoomReset", "重設視角"));
      wrap.querySelector('[data-zoom="reset"]').textContent = t("zoomResetShort", "重設");

      hudLabel.textContent = `${t("dragHint", "拖曳旋轉 360° · 點擊徽章看說明")} (~${scene.body.height} cm)`;
      disclaimerEl.textContent = t("disclaimer", "幾何立體位置示意，不含官方徽號原圖；實際針繡樣式與尺碼間距以香港童軍總會《儀容與制服手冊》為準。");

      renderSidebar();
    }

    function renderSidebar() {
      const list = state.badges || [];
      pillsEl.innerHTML = `
        <div class="scout3d-pills-title">${esc(t("badgesHeading", "基本章位置（點擊即轉向對準）"))}</div>
        <div class="scout3d-pills-list">
          ${list.map(b => {
            const active = selectedBadgeId === b.id;
            return `<button type="button" class="scout3d-pill${active ? " active" : ""}" data-badge-id="${esc(b.id)}" aria-pressed="${active}">
              <span class="scout3d-pill-dot" style="background:${esc(b.color || "#1B4332")}"></span>
              <span>${esc(b.name)}</span>
            </button>`;
          }).join("")}
        </div>`;

      const sel = list.find(b => b.id === selectedBadgeId) || list[0] || null;
      if (!sel) {
        inspectorEl.innerHTML = `<p class="cite">${esc(t("emptyInspector", "目前選擇沒有須顯示的徽章。"))}</p>`;
        return;
      }
      const sep = t("statusSep", "：");
      const matchedItems = (sel.itemIds || []).map(id => state.checklistMap[id]).filter(Boolean);
      const statusHtml = matchedItems.length
        ? matchedItems.map(it => {
            const cls = it.status === "need" ? "need" : it.status === "have" ? "have" : "check";
            const statusText = it.status === "need" ? t("statusNeed", "需購買") : it.status === "have" ? t("statusHave", "可沿用") : t("statusCheck", "向團長查詢");
            return `<span class="scout3d-status-chip ${cls}">${esc(it.title)}${esc(sep)}${esc(statusText)}</span>`;
          }).join("")
        : "";

      inspectorEl.innerHTML = `
        <div class="scout3d-inspect-card">
          <div class="scout3d-inspect-head">
            <span class="scout3d-inspect-tag" style="background:${esc(sel.color || "#1B4332")}">${esc(sel.code || sel.name)}</span>
            <h4>${esc(sel.name)}</h4>
          </div>
          <p class="scout3d-inspect-where"><strong>${esc(t("whereLabel", "位置："))}</strong>${esc(sel.where)}</p>
          ${sel.sizeLabel ? `<p class="scout3d-inspect-size"><strong>${esc(t("sizeLabel", "手冊尺寸："))}</strong>${esc(sel.sizeLabel)}</p>` : ""}
          <p class="scout3d-inspect-rule">${esc(sel.rule)}</p>
          ${statusHtml ? `<div class="scout3d-inspect-status">${statusHtml}</div>` : ""}
        </div>`;
    }

    function drawFrame() {
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const cssW = Math.max(240, Math.round(rect.width || container.clientWidth || 360));
      const cssH = Math.max(260, Math.round(rect.height || 360));
      const dpr = Math.min(2, global.devicePixelRatio || 1);
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // 實色暖紙背景（DESIGN.md 零漸層）
      ctx.fillStyle = "#f6f1e5";
      ctx.fillRect(0, 0, cssW, cssH);

      // 地面方向羅盤環（標示穿著者左／右／前／後，防止家長混淆左右）
      const ringR = 40;
      const dirs = [
        [0, ringR, t("dirFront", "前")],
        [0, -ringR, t("dirBack", "後")],
        [ringR, 0, t("dirWearerLeft", "左(穿著者)")],
        [-ringR, 0, t("dirWearerRight", "右(穿著者)")]
      ];
      ctx.save();
      ctx.font = "600 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const [dx, dz, lbl] of dirs) {
        const pr = projectPoint([dx, 0.5, dz], cam, cssW, cssH, scene.body.height);
        if (pr.depth > 30) {
          ctx.fillStyle = "rgba(27, 67, 50, 0.48)";
          ctx.fillText(lbl, pr.sx, pr.sy);
        }
      }
      ctx.restore();

      // 投影與深度排序（畫家演算法）
      const drawList = [];
      for (const poly of scene.polys) {
        const light = lightFactor(poly.normal, cam, poly.doubleSided);
        if (light == null) continue;
        const proj = poly.pts.map(pt => projectPoint(pt, cam, cssW, cssH, scene.body.height));
        const avgDepth = proj.reduce((s, q) => s + q.depth, 0) / proj.length - (poly.bias || 0) * 1.1;
        drawList.push({ poly, proj, light, avgDepth });
      }
      drawList.sort((a, b) => b.avgDepth - a.avgDepth);

      hitBadges = [];
      for (const item of drawList) {
        const { poly, proj, light } = item;
        if (poly.kind === "badge") {
          const b = poly.badge;
          const isSel = selectedBadgeId === b.id;
          const isHov = hoveredBadgeId === b.id;
          const fill = isSel || isHov ? mixHex(poly.color, "#f2791c", 0.35) : shadeRgb(poly.color, Math.min(1.08, light));
          let texture = null;
          if (b.image) {
            texture = BADGE_TEXTURES.get(b.image);
            if (!texture) {
              texture = new Image();
              texture.onload = () => drawFrame();
              texture.onerror = () => { BADGE_TEXTURES.delete(b.image); };
              texture.src = b.image;
              BADGE_TEXTURES.set(b.image, texture);
            }
          }
          const drawn = drawAffinedPatch(ctx, proj[0], proj[1], proj[3], (c) => {
            c.beginPath();
            if (b.shape === "circle") {
              c.arc(0.5, 0.5, 0.48, 0, Math.PI * 2);
            } else {
              c.rect(0, 0, 1, 1);
            }
            c.fillStyle = fill;
            c.fill();
            if (texture && texture.complete && texture.naturalWidth) {
              c.save();
              c.clip();
              c.drawImage(texture, 0, 0, 1, 1);
              c.restore();
            }

            if (!texture && b.shape === "grid") {
              // 小童軍 2×2 進步獎章四色格（紅／啡／藍／綠）
              const gridCols = ["#2458a6", "#2e7d4f", "#c43b3b", "#7a4e2d"];
              for (let r = 0; r < 2; r++) {
                for (let col = 0; col < 2; col++) {
                  c.fillStyle = gridCols[r * 2 + col];
                  c.fillRect(col * 0.5 + 0.04, r * 0.5 + 0.04, 0.42, 0.42);
                }
              }
            }

            c.lineWidth = isSel || isHov ? 0.14 : 0.07;
            c.strokeStyle = isSel || isHov ? "#f9b233" : "#ffffff";
            c.stroke();
          });

          if (drawn) {
            const cx = proj.reduce((s, q) => s + q.sx, 0) / proj.length;
            const cy = proj.reduce((s, q) => s + q.sy, 0) / proj.length;
            hitBadges.push({ id: b.id, pts: proj, cx, cy, isSel, isHov, code: b.code || "" });
          }
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(proj[0].sx, proj[0].sy);
        for (let i = 1; i < proj.length; i++) ctx.lineTo(proj[i].sx, proj[i].sy);
        ctx.closePath();
        ctx.fillStyle = shadeRgb(poly.color, Math.min(1.06, light));
        ctx.fill();
        if (poly.stroke && poly.stroke !== "none") {
          ctx.lineWidth = 0.85;
          ctx.strokeStyle = poly.stroke;
          ctx.stroke();
        }
      }

      // 浮動標籤只繪製於「已選取」或「懸停」徽章上方，避免平時重疊遮蓋色塊位置
      for (const hb of hitBadges) {
        if (!hb.isSel && !hb.isHov) continue;
        if (!hb.code) continue;
        ctx.save();
        ctx.font = "700 10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const tw = ctx.measureText(hb.code).width;
        const ty = Math.max(12, hb.cy - 14);
        ctx.fillStyle = hb.isSel ? "#1B4332" : "#2f3d35";
        ctx.fillRect(hb.cx - tw / 2 - 5, ty - 8, tw + 10, 16);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(hb.code, hb.cx, ty);
        ctx.restore();
      }

      ctx.restore();
    }

    function startAnim() {
      if (rafId || !ctx) return;
      let last = 0;
      const tick = (ts) => {
        const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0.016;
        last = ts;
        if (goal) {
          const a = 1 - Math.exp(-dt * 10);
          // 最短路徑轉 yaw
          let dyaw = ((goal.yaw - cam.yaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
          cam.yaw += dyaw * a;
          cam.pitch += (goal.pitch - cam.pitch) * a;
          cam.zoom += (goal.zoom - cam.zoom) * a;
          cam.targetY += (goal.targetY - cam.targetY) * a;
          if (Math.abs(dyaw) < 0.004 && Math.abs(goal.pitch - cam.pitch) < 0.004 &&
              Math.abs(goal.zoom - cam.zoom) < 0.004 && Math.abs(goal.targetY - cam.targetY) < 0.15) {
            cam = { ...goal };
            goal = null;
          }
        }
        drawFrame();
        if (goal) rafId = global.requestAnimationFrame(tick);
        else rafId = 0;
      };
      rafId = global.requestAnimationFrame(tick);
    }

    function setCamera(preset, extra = {}) {
      activePreset = preset;
      const base = viewToCamera(preset, scene.body.height);
      goal = {
        yaw: extra.yaw ?? base.yaw,
        pitch: extra.pitch ?? base.pitch,
        zoom: extra.zoom ?? base.zoom,
        targetY: extra.targetY ?? base.targetY
      };
      renderChrome();
      if (ctx) startAnim();
    }

    function focusBadge(id) {
      const b = (state.badges || []).find(x => x.id === id);
      if (!b) return;
      selectedBadgeId = b.id;
      const isHardHatCap = b.id === "capbadge" && scene.palette.hat === "hardHat";
      const preset = isHardHatCap ? "right" : (b.view || "front");
      const base = viewToCamera(preset, scene.body.height);
      const focusY = b.id === "capbadge" ? scene.body.height * 0.88
        : b.id === "epaulette" ? scene.body.height * 0.81
        : scene.body.height * 0.68;
      setCamera(preset, {
        yaw: isHardHatCap ? Math.PI * 0.42 : base.yaw,
        pitch: preset === "shoulders" ? 0.72 : 0.1,
        zoom: b.id === "capbadge" ? 1.85 : 1.72,
        targetY: focusY
      });
      if (typeof state.onInspect === "function") state.onInspect(b);
    }

    // 指標拖曳旋轉 + 滾輪縮放 + 點擊選取徽章
    const activePointers = new Map();
    let drag = null;
    let pinchStart = null;
    const pointerDistance = () => {
      const points = [...activePointers.values()];
      return points.length > 1 ? Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y) : 0;
    };
    canvas.addEventListener("pointerdown", (e) => {
      goal = null;
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (activePointers.size === 1) {
        drag = { x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY, moved: false };
      } else if (activePointers.size === 2) {
        if (drag) drag.moved = true;
        pinchStart = { distance: pointerDistance(), zoom: cam.zoom };
      }
      if (canvas.setPointerCapture) {
        try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      }
    });
    canvas.addEventListener("pointermove", (e) => {
      if (activePointers.has(e.pointerId)) activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (activePointers.size > 1 && pinchStart) {
        const distance = pointerDistance();
        if (distance > 0 && pinchStart.distance > 0) {
          cam.zoom = Math.max(0.75, Math.min(2.6, pinchStart.zoom * distance / pinchStart.distance));
          activePreset = "";
          drawFrame();
        }
        return;
      }
      if (drag) {
        const dx = e.clientX - drag.x;
        const dy = e.clientY - drag.y;
        drag.x = e.clientX;
        drag.y = e.clientY;
        if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 5) drag.moved = true;
        cam.yaw -= dx * 0.011;
        cam.pitch = Math.max(-0.25, Math.min(1.08, cam.pitch + dy * 0.009));
        activePreset = "";
        drawFrame();
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left, py = e.clientY - rect.top;
      let hit = null;
      for (let i = hitBadges.length - 1; i >= 0; i--) {
        if (pointInQuad(px, py, hitBadges[i].pts)) { hit = hitBadges[i].id; break; }
      }
      if (hit !== hoveredBadgeId) {
        hoveredBadgeId = hit;
        canvas.style.cursor = hit ? "pointer" : "grab";
        drawFrame();
      }
    });
    const endPointer = (e) => {
      const wasPinching = activePointers.size > 1 || !!pinchStart;
      if (drag && !drag.moved && !wasPinching) {
        const rect = canvas.getBoundingClientRect();
        const px = e.clientX - rect.left, py = e.clientY - rect.top;
        for (let i = hitBadges.length - 1; i >= 0; i--) {
          if (pointInQuad(px, py, hitBadges[i].pts)) {
            focusBadge(hitBadges[i].id);
            break;
          }
        }
      }
      activePointers.delete(e.pointerId);
      if (activePointers.size < 2) pinchStart = null;
      const remaining = [...activePointers.values()][0];
      drag = remaining ? { x: remaining.x, y: remaining.y, startX: remaining.x, startY: remaining.y, moved: true } : null;
      drawFrame();
    };
    canvas.addEventListener("pointerup", endPointer);
    canvas.addEventListener("pointercancel", endPointer);
    canvas.addEventListener("lostpointercapture", endPointer);
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      goal = null;
      const factor = e.deltaY < 0 ? 1.12 : 0.89;
      cam.zoom = Math.max(0.75, Math.min(2.6, cam.zoom * factor));
      drawFrame();
    }, { passive: false });
    canvas.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goal = null; cam.yaw -= 0.18; drawFrame(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goal = null; cam.yaw += 0.18; drawFrame(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); goal = null; cam.pitch = Math.min(1.08, cam.pitch + 0.12); drawFrame(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); goal = null; cam.pitch = Math.max(-0.25, cam.pitch - 0.12); drawFrame(); }
      else if (e.key === "+" || e.key === "=") { e.preventDefault(); cam.zoom = Math.min(2.6, cam.zoom * 1.15); drawFrame(); }
      else if (e.key === "-") { e.preventDefault(); cam.zoom = Math.max(0.75, cam.zoom / 1.15); drawFrame(); }
      else if (e.key === "0") { e.preventDefault(); setCamera("front"); }
    });

    wrap.addEventListener("click", (e) => {
      const viewBtn = e.target.closest("[data-view]");
      if (viewBtn) { setCamera(viewBtn.getAttribute("data-view")); return; }

      const toggleBtn = e.target.closest("[data-toggle]");
      if (toggleBtn) {
        const what = toggleBtn.getAttribute("data-toggle");
        if (what === "badges") showBadges = !showBadges;
        else if (what === "tie") wearTie = !wearTie;
        scene = buildScene(state, state.badges, { showBadges, wearTie });
        renderChrome();
        drawFrame();
        return;
      }

      const zoomBtn = e.target.closest("[data-zoom]");
      if (zoomBtn) {
        const z = zoomBtn.getAttribute("data-zoom");
        if (z === "reset") { setCamera("front"); return; }
        goal = null;
        cam.zoom = z === "in" ? Math.min(2.6, cam.zoom * 1.2) : Math.max(0.75, cam.zoom / 1.2);
        drawFrame();
        return;
      }

      const pill = e.target.closest("[data-badge-id]");
      if (pill) {
        focusBadge(pill.getAttribute("data-badge-id"));
      }
    });

    let resizeObs = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObs = new ResizeObserver(() => drawFrame());
      resizeObs.observe(canvas);
    }

    function update(nextOpts = {}) {
      const prevSec = state.section;
      state = { ...state, ...nextOpts };
      const list = state.badges || [];
      if (!list.some(b => b.id === selectedBadgeId)) {
        selectedBadgeId = list[0] ? list[0].id : null;
      }
      if (!["venture", "rover", "leader"].includes(state.section)) wearTie = false;
      scene = buildScene(state, state.badges, { showBadges, wearTie });
      if (prevSec !== state.section) {
        activePreset = "front";
        cam = viewToCamera("front", scene.body.height);
        goal = null;
      }
      renderChrome();
      drawFrame();
    }

    renderChrome();
    drawFrame();

    return {
      update,
      setCamera,
      focusBadge,
      redraw: drawFrame,
      destroy() {
        if (rafId && global.cancelAnimationFrame) global.cancelAnimationFrame(rafId);
        if (resizeObs) resizeObs.disconnect();
      }
    };
  }

  global.Scout3D = {
    createViewer,
    buildScene,
    getBody,
    getPalette,
    CAMERA_PRESETS
  };
})(typeof window !== "undefined" ? window : globalThis);
