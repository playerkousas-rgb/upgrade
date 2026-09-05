const { test, expect } = require('@playwright/test');

const baseURL = process.env.TEST_BASE_URL || 'http://127.0.0.1:8000';
const parts = '.container > details.part';
const storageKey = 'scout_parts_v1';
const openIds = page => page.locator(`${parts}[open]`).evaluateAll(nodes => nodes.map(node => node.id));
const states = page => page.locator(parts).evaluateAll(nodes => Object.fromEntries(nodes.map(node => [node.id, node.open])));

// Keep the tests independent of the official sites' image availability.
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => new URL(route.request().url()).origin === new URL(baseURL).origin
    ? route.continue() : route.abort());
});

test('every PART is a disclosure; only the first two start open', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(baseURL);
  await expect(page.locator(parts)).toHaveCount(13);
  await expect(page.locator('.container > .card:not(details.part)')).toHaveCount(0);
  await expect(page.locator(`${parts} > summary > h2`)).toHaveCount(13);
  await expect(page.locator(`${parts} > .part-content`)).toHaveCount(13);
  expect(Object.keys(await states(page))).toHaveLength(13);
  expect(await openIds(page)).toEqual(['part-situation', 'part-options']);
  await expect(page.locator('#checklist .item').first()).toBeAttached();
  await expect(page.locator('#part-toolbar')).toBeVisible();
  expect(errors).toEqual([]);
});

test('all 13 PARTs toggle independently without changing other PARTs', async ({ page }) => {
  await page.goto(baseURL);
  const checked = new Set();
  for (const section of ['cub', 'scout', 'leader']) {
    await page.locator(`.path-step[data-section="${section}"]`).click();
    const visibleIds = await page.locator(`${parts}:visible`).evaluateAll(nodes => nodes.map(node => node.id));
    for (const id of visibleIds) {
      if (checked.has(id)) continue;
      const before = await states(page);
      const part = page.locator(`#${id}`);
      await part.locator(':scope > summary').click();
      await expect(part).toHaveJSProperty('open', !before[id]);
      expect(await states(page)).toEqual({ ...before, [id]: !before[id] });
      const label = await part.locator(':scope > summary .part-toggle').evaluate(node => getComputedStyle(node, '::before').content);
      expect(label).toBe(before[id] ? '"展開"' : '"收起"');
      if (before[id]) await expect(part.locator(':scope > .part-content')).toBeHidden();
      else await expect(part.locator(':scope > .part-content')).toBeVisible();
      await part.locator(':scope > summary').click();
      await expect(part).toHaveJSProperty('open', before[id]);
      checked.add(id);
    }
  }
  expect(checked.size).toBe(13);
});

test('Enter and Space toggle; Tab skips controls in collapsed content', async ({ page }) => {
  await page.goto(baseURL);
  const summary = page.locator('#part-options > summary');
  await summary.focus();
  await summary.press('Enter');
  await expect(page.locator('#part-options')).toHaveJSProperty('open', false);
  await expect(summary).toBeFocused();
  await expect(summary).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Tab');
  await expect(page.locator('#part-checklist > summary')).toBeFocused();
  await summary.focus();
  await summary.press('Space');
  await expect(page.locator('#part-options')).toHaveJSProperty('open', true);
});

test('bulk controls affect only visible PARTs and reflect their state', async ({ page }) => {
  await page.goto(baseURL);
  await page.getByRole('button', { name: '全部展開', exact: true }).click();
  await expect(page.locator(`${parts}:visible:not([open])`)).toHaveCount(0);
  await expect(page.locator('#expand-all-parts')).toBeDisabled();
  await expect(page.locator('#part-leader')).toHaveJSProperty('open', false);
  await expect(page.locator('#part-branches')).toHaveJSProperty('open', false);
  await expect(page.locator('details:not(.part)[open]')).toHaveCount(0);

  await page.locator('.path-step[data-section="grasshopper"]').click();
  await expect(page.locator(`${parts}:visible`)).toHaveCount(5);
  await expect(page.locator('#expand-all-parts')).toBeDisabled();
  await page.getByRole('button', { name: '全部收起', exact: true }).click();
  await expect(page.locator(`${parts}:visible[open]`)).toHaveCount(0);
  await expect(page.locator('#collapse-all-parts')).toBeDisabled();
  await expect(page.locator('#part-budget')).toBeHidden();
  await expect(page.locator('#part-budget')).toHaveJSProperty('open', true);

  await page.locator('#part-situation > summary').click();
  await page.locator('.path-step[data-section="leader"]').click();
  await expect(page.locator('#part-budget')).toBeVisible();
  await expect(page.locator('#part-budget')).toHaveJSProperty('open', true);
  await expect(page.locator('#part-leader')).toBeVisible();
  await expect(page.locator('#part-leader')).toHaveJSProperty('open', false);
  await expect(page.locator('#part-branches')).toBeHidden();
  await expect(page.locator('#expand-all-parts')).toBeEnabled();
});

test('nested FAQs keep their own state and correct plus/minus indicators', async ({ page }) => {
  await page.goto(baseURL);
  const parent = page.locator('#part-faq');
  await parent.locator(':scope > summary').click();
  const faq = parent.locator('.part-content > details:not([data-show-for])');
  const indicator = () => faq.locator('summary').evaluate(node => getComputedStyle(node, '::after').content);
  expect(await indicator()).toBe('"+"');
  await faq.locator('summary').click();
  await expect(faq).toHaveJSProperty('open', true);
  expect(await indicator()).toBe('"−"');
  await parent.locator(':scope > summary').click();
  await expect(parent).toHaveJSProperty('open', false);
  await expect(faq).toHaveJSProperty('open', true);
  await parent.locator(':scope > summary').click();
  await expect(faq.locator('p').first()).toBeVisible();
  await page.locator('#collapse-all-parts').click();
  await page.locator('#expand-all-parts').click();
  await expect(faq).toHaveJSProperty('open', true);
});

test('closed dynamic content still updates without reopening PARTs', async ({ page }) => {
  await page.goto(baseURL);
  const before = await states(page);
  await page.locator('.path-step[data-section="scout"]').click();
  await page.evaluate(() => { setSource(null); setBranch('to', 'sea'); setGender('female'); });
  expect(await states(page)).toEqual(before);
  await expect(page.locator('#preview')).toContainText('海童軍');
  await expect(page.locator('#preview')).toContainText('女團員');
  await expect(page.locator('#budget-dynamic')).toContainText('全新全購');
  await page.locator('#part-checklist > summary').click();
  await expect(page.locator('#preview')).toBeVisible();
  await expect(page.locator('#checklist')).toContainText('深藍色裙褲');
});

test('PART state survives reload without interfering with owned items', async ({ page }) => {
  await page.goto(baseURL);
  await page.locator('#part-checklist > summary').click();
  const item = page.locator('#checklist .item').first();
  await item.getByRole('button').click();
  await expect(item).toHaveClass(/owned/);
  await item.locator('.item-row').first().click();
  await expect(item).toHaveClass(/expanded/);
  await page.locator('#part-checklist > summary').click();
  await page.locator('#part-checklist > summary').click();
  await expect(item).toHaveClass(/expanded/);
  await expect(item).toHaveClass(/owned/);
  await page.locator('#part-care > summary').click();
  await page.locator('#part-options > summary').click();
  const before = await states(page);
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key)), storageKey)).toEqual(before);
  await page.reload();
  expect(await states(page)).toEqual(before);
  await expect(page.locator('#checklist .item').first()).toHaveClass(/owned/);
});

for (const saved of ['{invalid json', 'null', '[]', 'false', '{"part-checklist":"true","part-options":1}']) {
  test(`invalid saved state falls back safely: ${saved}`, async ({ page }) => {
    await page.addInitScript(({ key, saved }) => localStorage.setItem(key, saved), { key: storageKey, saved });
    await page.goto(baseURL);
    expect(await openIds(page)).toEqual(['part-situation', 'part-options']);
    await page.locator('#expand-all-parts').click();
    await expect(page.locator(`${parts}:visible:not([open])`)).toHaveCount(0);
  });
}

test('unavailable localStorage does not break native or bulk toggles', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    Storage.prototype.getItem = Storage.prototype.setItem = () => { throw new DOMException('Blocked', 'SecurityError'); };
  });
  await page.goto(baseURL);
  await page.locator('#part-checklist > summary').click();
  await expect(page.locator('#checklist .item').first()).toBeVisible();
  await page.locator('#collapse-all-parts').click();
  await expect(page.locator(`${parts}:visible[open]`)).toHaveCount(0);
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1280]) {
  test(`PART headers and controls fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(baseURL);
    await page.locator('#collapse-all-parts').click();
    await page.locator('#part-situation > summary').click();
    await page.locator('.path-step[data-section="leader"]').click();
    await page.locator('#collapse-all-parts').click();
    const headers = await page.locator(`${parts}:visible > summary`).evaluateAll(nodes => nodes.map(node => {
      const box = node.getBoundingClientRect();
      const title = node.querySelector('h2').getBoundingClientRect();
      const toggle = node.querySelector('.part-toggle').getBoundingClientRect();
      return { left: box.left, right: box.right, height: box.height, titleRight: title.right, toggleLeft: toggle.left };
    }));
    for (const header of headers) {
      expect(header.left).toBeGreaterThanOrEqual(0);
      expect(header.right).toBeLessThanOrEqual(width);
      expect(header.height).toBeGreaterThanOrEqual(44);
      expect(header.titleRight).toBeLessThan(header.toggleLeft);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}

test.describe('touch input', () => {
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  test('tapping a PART title or its indicator opens and closes the content', async ({ page }) => {
    await page.goto(baseURL);
    await page.locator('#part-checklist > summary h2').tap();
    await expect(page.locator('#part-checklist > .part-content')).toBeVisible();
    await page.locator('#part-checklist > summary .part-toggle').tap();
    await expect(page.locator('#part-checklist > .part-content')).toBeHidden();
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('PARTs remain usable and inactive bulk controls stay hidden', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page.locator('#part-toolbar')).toBeHidden();
    await expect(page.locator('#part-shopping > .part-content')).toBeHidden();
    await page.locator('#part-shopping > summary').click();
    await expect(page.locator('#part-shopping > .part-content')).toBeVisible();
    await page.locator('#part-shopping > summary').press('Space');
    await expect(page.locator('#part-shopping > .part-content')).toBeHidden();
  });
});
