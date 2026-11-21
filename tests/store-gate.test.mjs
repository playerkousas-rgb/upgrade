import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(join(ROOT, file), 'utf8');
const gateSource = read('store_gate_v1.0.js');
const indexHtml = read('index.html');
const cjs = { exports: {} };
vm.runInNewContext(gateSource, { URL, module: cjs, exports: cjs.exports });
const gate = cjs.exports;

const gateScriptMatch = indexHtml.match(/initStoreGate\(\{([\s\S]*?)\}\);/);
assert.ok(gateScriptMatch, 'index.html must initialize the store gate');
const gateOptions = vm.runInNewContext(`({${gateScriptMatch[1]}})`);

function makeMockEnv({ referrer = '', standalone = false, navigatorStandalone = false } = {}) {
  const timers = [];
  const makeElement = (tag) => {
    const attrs = new Map();
    const el = {
      tagName: String(tag).toUpperCase(),
      id: '',
      className: '',
      textContent: '',
      href: '',
      target: '',
      rel: '',
      children: [],
      parentNode: null,
      get firstChild() { return this.children[0] || null; },
      setAttribute(name, value) {
        attrs.set(name, String(value));
        if (name === 'id') this.id = String(value);
      },
      getAttribute(name) { return attrs.has(name) ? attrs.get(name) : null; },
      appendChild(child) {
        child.parentNode = this;
        this.children.push(child);
        return child;
      },
      removeChild(child) {
        const index = this.children.indexOf(child);
        if (index >= 0) this.children.splice(index, 1);
        child.parentNode = null;
        return child;
      },
    };
    return el;
  };

  const html = makeElement('html');
  html.setAttribute('lang', 'zh-HK');
  html.setAttribute('data-lang', 'zh');
  const head = makeElement('head');
  const body = makeElement('body');
  html.appendChild(head);
  html.appendChild(body);

  const findById = (node, id) => {
    if (node.id === id) return node;
    for (const child of node.children) {
      const found = findById(child, id);
      if (found) return found;
    }
    return null;
  };
  const doc = {
    referrer,
    documentElement: html,
    head,
    body,
    createElement: makeElement,
    getElementById: (id) => findById(html, id),
    addEventListener() {},
  };

  const session = new Map();
  const win = {
    document: doc,
    navigator: { standalone: navigatorStandalone },
    location: { origin: 'https://upgrade-ashen.vercel.app', replacedWith: null },
    matchMedia: (query) => ({ matches: query === '(display-mode: standalone)' && standalone }),
    sessionStorage: {
      getItem: (key) => session.get(key) ?? null,
      setItem: (key, value) => session.set(key, String(value)),
    },
    setTimeout(fn, ms) { timers.push({ fn, ms }); return timers.length; },
  };
  win.self = win;
  win.top = win;
  return { win, doc, session, timers };
}

test('SG/V1: vendored gate is byte-identical to the approved truth-repo v1.0 copy', () => {
  assert.equal(gate.VERSION, 'v1.0');
  assert.equal(
    createHash('sha256').update(gateSource).digest('hex'),
    '5b222329392bc901482688b8a9296a4bf0488a929fe8b481a656cd915b5c6162',
  );
});

test('SG1/SG19: gate is after charset and uses only APP STORE plus silent library', () => {
  const charset = indexHtml.indexOf('<meta charset="UTF-8">');
  const script = indexHtml.indexOf('<script src="/store_gate_v1.0.js"></script>');
  const title = indexHtml.indexOf('<title>');
  assert.ok(charset >= 0 && charset < script && script < title, 'gate must load after charset and before title');
  assert.equal(gateOptions.appKey, 'upgrade');
  assert.equal(gateOptions.mode, 'entry-gate');
  assert.deepEqual(Array.from(gateOptions.portalIds), ['appstore']);
  assert.deepEqual(Array.from(gateOptions.silentPortalIds), ['library']);
  assert.equal(gateOptions.allowStandalone, true);
  assert.equal(gateOptions.autoRedirectSeconds, 0);
  assert.equal(gateOptions.supportNudge, undefined);
  assert.equal(gateOptions.trackEndpoint, undefined);
  assert.doesNotMatch(gateScriptMatch[1], /\b(member|district|gemini)\b/);

  const portals = gate.normalizePortals(gateOptions);
  assert.deepEqual(Array.from(portals, ({ id, silent }) => [id, silent]), [
    ['appstore', false],
    ['library', true],
  ]);
});

test('SG3/SG5/SG10: APP STORE and library referrers pass with matched portal IDs', () => {
  for (const [referrer, expected] of [
    ['https://scoutappstore.vercel.app/?app=upgrade', 'appstore'],
    ['https://scout-circulars.vercel.app/tools', 'library'],
  ]) {
    const env = makeMockEnv({ referrer });
    const result = gate.initStoreGate(gateOptions, env.win);
    assert.equal(result.allowed, true, `${expected} referrer should pass`);
    assert.equal(result.reason, 'referrer-whitelist');
    assert.equal(result.matchedPortalId, expected);
    assert.equal(env.session.get('upgrade.store_pass'), '1');
  }
});

test('SG3/SG19: direct URL shows one short APP STORE button, no redirect or blank page', () => {
  const env = makeMockEnv();
  const result = gate.initStoreGate(gateOptions, env.win);
  assert.equal(result.allowed, false);
  assert.equal(result.reason, 'missing-whitelist-entry');

  const dialog = env.doc.getElementById('scoutStoreGate');
  assert.ok(dialog, 'a direct open must render an explanation card');
  assert.equal(dialog.getAttribute('role'), 'dialog');
  const title = dialog.children.find((child) => child.tagName === 'H1');
  assert.equal(title.textContent, '需經由 SCOUT APP STORE 開啟');
  const actions = dialog.children.find((child) => child.className === 'sg-actions');
  assert.equal(actions.children.length, 1, 'silent library must not become a second button');
  assert.equal(actions.children[0].href, 'https://scoutappstore.vercel.app/');
  assert.equal(actions.children[0].target, '_top');
  assert.equal(actions.children[0].textContent, '前往 APP STORE');
  assert.equal(env.timers.length, 0, 'autoRedirectSeconds=0 must leave the card in place');
});

test('SG7: standalone PWA launches directly; support links fail closed if helper is missing', () => {
  assert.equal(JSON.parse(read('manifest.webmanifest')).display, 'standalone');
  const env = makeMockEnv({ standalone: true });
  const result = gate.initStoreGate(gateOptions, env.win);
  assert.equal(result.allowed, true);
  assert.equal(result.reason, 'standalone-pwa');

  const initMatch = indexHtml.match(/<script id="scout-store-support-init">([\s\S]*?)<\/script>/);
  assert.ok(initMatch, 'SG18 helper initializer must be present');

  const makeEls = () => ({
    storeSupportTop: { hidden: true, href: '' },
    storeSupportBar: { hidden: true },
    storeSupportFoot: { href: '' },
  });

  // 1) Missing ScoutStoreGate: both top button and footer bar must stay hidden with empty href
  const missingEls = makeEls();
  vm.runInNewContext(initMatch[1], {
    document: { getElementById: (id) => missingEls[id] || null },
  });
  assert.equal(missingEls.storeSupportTop.hidden, true);
  assert.equal(missingEls.storeSupportTop.href, '', 'no stale or hard-coded link when ScoutStoreGate is absent');
  assert.equal(missingEls.storeSupportBar.hidden, true);
  assert.equal(missingEls.storeSupportFoot.href, '');

  // 2) Standard ScoutStoreGate.getAppStoreUrl path
  const okEls = makeEls();
  vm.runInNewContext(initMatch[1], {
    document: { getElementById: (id) => okEls[id] || null },
    ScoutStoreGate: { getAppStoreUrl: gate.getAppStoreUrl },
  });
  assert.equal(okEls.storeSupportTop.href, 'https://scoutappstore.vercel.app/?app=upgrade');
  assert.equal(okEls.storeSupportTop.hidden, false);
  assert.equal(okEls.storeSupportFoot.href, 'https://scoutappstore.vercel.app/?app=upgrade');
  assert.equal(okEls.storeSupportBar.hidden, false);

  // 3) Backwards-compatible ScoutStoreGate.getPortal('appstore') fallback (readme docs/60)
  const fallbackEls = makeEls();
  vm.runInNewContext(initMatch[1], {
    document: { getElementById: (id) => fallbackEls[id] || null },
    ScoutStoreGate: { getPortal: gate.getPortal },
  });
  assert.equal(fallbackEls.storeSupportTop.href, 'https://scoutappstore.vercel.app/?app=upgrade');
  assert.equal(fallbackEls.storeSupportTop.hidden, false);
  assert.equal(fallbackEls.storeSupportFoot.href, 'https://scoutappstore.vercel.app/?app=upgrade');
  assert.equal(fallbackEls.storeSupportBar.hidden, false);
});

test('SG18 (docs/60): top CTA + footer bar are bilingual, SVG-backed, accessible, hidden in print, and responsive without a nudge', () => {
  const localeContext = vm.createContext({});
  vm.runInContext(`${read('data.js')}\n${read('locale-en.js')}\nthis.__ui = { zh: LOCALES['zh-HK'].UI, en: LOCALES.en.UI };`, localeContext);
  assert.equal(localeContext.__ui.zh.supportBtn, '讚好／收藏');
  assert.equal(localeContext.__ui.en.supportBtn, 'Like / Save');
  assert.ok(localeContext.__ui.zh.supportLinkAria);
  assert.ok(localeContext.__ui.en.supportLinkAria);
  assert.ok(localeContext.__ui.zh.supportPrompt);
  assert.ok(localeContext.__ui.en.supportPrompt);
  assert.ok(localeContext.__ui.zh.supportFootBtn);
  assert.ok(localeContext.__ui.en.supportFootBtn);
  for (const key of ['supportBtn', 'supportLinkAria', 'supportPrompt', 'supportFootBtn']) {
    assert.ok(!/[\u3400-\u9FFF]/.test(localeContext.__ui.en[key]), `en.UI.${key} must contain no CJK`);
  }

  // Topbar button (inline SVG heart + span label, hidden by default)
  assert.match(indexHtml, /<a id="storeSupportTop" class="support-btn" target="_blank" rel="noopener" hidden/);
  assert.match(indexHtml, /aria-label="前往主站讚好或收藏此程式（開新分頁）" title="前往主站讚好或收藏此程式（開新分頁）"/);
  assert.match(indexHtml, /<a id="storeSupportTop"[\s\S]*?<svg[^>]*aria-hidden="true"[\s\S]*?<span id="storeSupportTopLabel" data-i18n="supportBtn">讚好／收藏<\/span><\/a>/);

  // Footer lightweight support bar (hidden by default)
  assert.match(indexHtml, /<div id="storeSupportBar" class="support-bar" hidden>/);
  assert.match(indexHtml, /<span id="storeSupportPrompt" data-i18n="supportPrompt">/);
  assert.match(indexHtml, /<a id="storeSupportFoot" class="support-foot-btn" target="_blank" rel="noopener"/);

  // CSS rules: [hidden] display:none, focus-visible, >=40px touch target, narrow screen, print hidden
  assert.match(indexHtml, /\.support-btn\[hidden\],\.support-bar\[hidden\]\s*\{\s*display:\s*none!important\s*\}/);
  assert.match(indexHtml, /\.support-btn:focus-visible/);
  assert.match(indexHtml, /footer \.support-foot-btn:focus-visible/);
  assert.match(indexHtml, /\.support-btn\{[^}]*min-height:44px/s);
  assert.match(indexHtml, /footer \.support-foot-btn\{[^}]*min-height:44px/s);
  assert.match(indexHtml, /@media\(max-width:430px\)\{[\s\S]*?\.header-actions\{[^}]*flex-direction:column[\s\S]*?\.support-bar\{[^}]*flex-direction:column/);
  assert.match(indexHtml, /@media print\{[^}]*\.support-btn,\.support-bar[^}]*\}/);

  // App bilingual wiring preserves SVG by updating label span + updates footer bar
  const appSource = read('app.js');
  assert.match(appSource, /const supportLabel = \$\("storeSupportTopLabel"\)/);
  assert.match(appSource, /supportLabel\.textContent = t\.supportBtn/);
  assert.match(appSource, /supportLink\.setAttribute\("aria-label", t\.supportLinkAria\)/);
  assert.match(appSource, /supportPrompt\.textContent = t\.supportPrompt/);
  assert.match(appSource, /supportFoot\.textContent = t\.supportFootBtn/);

  // Zero direct Supabase / bump_hearts / bump_stars calls (SG18 hard ban)
  for (const file of ['index.html', 'app.js', 'data.js', 'locale-en.js']) {
    assert.doesNotMatch(read(file), /bump_hearts|bump_stars|supabase/i, `${file} must never call main-site Supabase directly`);
  }
});

test('S4/SG3: build and live verification both include the gate runtime', () => {
  assert.match(read('build-site.mjs'), /'store_gate_v1\.0\.js'/);
  assert.match(read('scripts/check.js'), /"store_gate_v1\.0\.js"/);
  assert.match(read('scripts/lint.js'), /"store_gate_v1\.0\.js"/);
  assert.match(read('.github/workflows/verify-live.yml'), /"store_gate_v1\.0\.js"/);
});
