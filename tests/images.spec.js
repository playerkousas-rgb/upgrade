const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const baseURL = process.env.TEST_BASE_URL || 'http://127.0.0.1:8000';
const origin = new URL(baseURL).origin;
const itemSelector = id => `#checklist [data-item-id="${id}"]`;
const loaded = image => expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);

async function choose(page, section, branch = 'land', gender = 'male') {
  await page.evaluate(({ section, branch, gender }) => {
    selectSection(section);
    setSource(null);
    setBranch('to', branch);
    setGender(gender);
  }, { section, branch, gender });
  const part = page.locator('#part-checklist');
  if (!await part.evaluate(node => node.open)) await part.locator(':scope > summary').click();
}
async function expandItem(page, id) {
  const item = page.locator(itemSelector(id));
  await item.locator('.item-row').first().click();
  await expect(item).toHaveClass(/expanded/);
  await item.locator('.item-fig').scrollIntoViewIfNeeded();
  return item;
}

test.beforeEach(async ({ page }) => {
  // All tests work with the public hosts unavailable; never depend on hotlink access.
  await page.route('**/*', route => new URL(route.request().url()).origin === origin
    ? route.continue() : route.abort());
});

const badgeCases = [
  ['cub', 'land', 'male', 'capbadge-cub', 'capbadge-cub.webp'],
  ['cub', 'land', 'female', 'capbadge-cub', 'cap-cub-female.webp'],
  ['scout', 'land', 'male', 'capbadge-scout', 'capbadge-scout.webp'],
  ['venture', 'sea', 'male', 'capbadge-venture-sea', 'capbadge-sea-youth.webp'],
  ['rover', 'sea', 'female', 'capbadge-rover-sea', 'capbadge-sea-youth.webp'],
  ['leader', 'air', 'male', 'capbadge-rank', 'capbadge-rank.webp'],
  ['leader', 'sea', 'female', 'capbadge-sea-leader', 'capbadge-sea-leader.webp'],
];
for (const [section, branch, gender, id, file] of badgeCases) {
  test(`${section}/${branch}/${gender}: cap badge loads locally, not via a fake fallback`, async ({ page }) => {
    const errors = [];
    const requests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => requests.push(request.url()));
    await page.goto(baseURL);
    await choose(page, section, branch, gender);
    const item = await expandItem(page, id);
    await expect(item.locator('img')).toHaveCount(2);
    for (const image of await item.locator('img').all()) {
      await loaded(image);
      await expect(image).toHaveAttribute('src', `assets/reference/${file}`);
    }
    await expect(item.locator('.image-thumb img')).toHaveCSS('object-fit', 'contain');
    await expect(item.locator('.item-fig img')).toHaveCSS('object-fit', 'scale-down');
    await expect(item.locator('.item-fig figcaption')).toContainText('官方');
    await expect(item.locator('.item-fig figcaption')).toContainText('本地');
    await expect(item.locator('.image-source')).toHaveAttribute('href', /^https:\/\/(www\.scout|uniform\.scouting)\.org\.hk\//);
    expect(requests.filter(url => /\/files\/(mid|thum)\/(314|1844|1845|3507)_/.test(url))).toEqual([]);
    expect(requests.filter(url => /assets\/items\/capbadge-/.test(url))).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('every shipped reference is present, decodes, and has an attributed source', async ({ page, request }) => {
  await page.goto(baseURL);
  const references = await page.evaluate(() => {
    const refs = [...Object.values(ITEM_REFERENCES), itemReference('capbadge-cub', 'female')];
    for (const [section, branches] of Object.entries(LOCAL_UNIFORMS)) {
      for (const [branch, genders] of Object.entries(branches)) {
        for (const gender of Object.keys(genders)) refs.push(officialPhoto(section, branch, gender).images[0]);
      }
    }
    return refs;
  });
  for (const ref of references) {
    expect(ref.src).toMatch(/^assets\/reference\/[a-z-]+\.webp$/);
    expect(ref.sourceUrl).toMatch(/^https:\/\/(www\.scout|uniform\.scouting)\.org\.hk\//);
    expect(ref.alt).toBeTruthy();
    expect(ref.note).toBeTruthy();
  }
  const paths = [...new Set(references.map(ref => ref.src))];
  expect(paths).toHaveLength(15);
  for (const src of paths) {
    const response = await request.get(`${baseURL.replace(/\/$/, '')}/${src}`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/webp');
    expect(await page.evaluate(async src => {
      const image = new Image();
      image.src = src;
      await image.decode();
      return image.naturalWidth > 0 && image.naturalHeight > 0;
    }, src)).toBe(true);
  }
});

test('four exact uniform references survive blocked external images', async ({ page }) => {
  await page.goto(baseURL);
  for (const [section, branch, gender, file] of [
    ['cub', 'land', 'male', 'cub-male.webp'],
    ['cub', 'land', 'female', 'cub-female.webp'],
    ['scout', 'land', 'female', 'scout-land-female.webp'],
    ['venture', 'air', 'male', 'venture-air-male.webp'],
  ]) {
    await choose(page, section, branch, gender);
    for (const selector of ['#preview', '#official-photo-box']) {
      const frame = page.locator(`${selector} .reference-image`);
      await frame.scrollIntoViewIfNeeded();
      await loaded(frame.locator('img'));
      await expect(frame.locator('img')).toHaveAttribute('src', `assets/reference/${file}`);
      await expect(frame.locator('figcaption')).toContainText('非實物照片');
      await expect(frame.locator('figcaption')).toContainText('本地');
    }
  }
});

test('all uniform mappings match section, branch and gender; no land-only fallback', async ({ page }) => {
  await page.goto(baseURL);
  const errors = await page.evaluate(() => {
    const failures = [];
    for (const [section, spec] of Object.entries(UNIFORM_SPEC)) {
      for (const [branch, genders] of Object.entries(spec)) {
        for (const gender of Object.keys(genders)) {
          const photo = officialPhoto(section, branch, gender);
          const remote = OFFICIAL_IMG_BASE + OFFICIAL_PHOTOS[section][branch][gender];
          const local = LOCAL_UNIFORMS[section]?.[branch]?.[gender];
          const expected = local ? [local, remote] : [remote];
          if (JSON.stringify(photo.images.map(image => image.src)) !== JSON.stringify(expected)) failures.push(`${section}/${branch}/${gender}`);
        }
      }
    }
    if (officialPhoto('scout', 'unknown', 'male') !== null) failures.push('invalid branch');
    if (officialPhoto('cub', 'sea', 'male') !== null) failures.push('unsupported sea Cub');
    return failures;
  });
  expect(errors).toEqual([]);
  for (const [section, branch, gender] of [['scout', 'sea', 'male'], ['scout', 'air', 'female'], ['leader', 'sea', 'female']]) {
    await choose(page, section, branch, gender);
    for (const selector of ['#preview', '#official-photo-box']) {
      const frame = page.locator(`${selector} .reference-image`);
      await frame.scrollIntoViewIfNeeded();
      await expect(frame.locator('.image-unavailable')).toBeVisible();
      await expect(frame.locator('img')).toHaveCount(0);
      await expect(frame.locator('.image-caption-label')).toHaveText('參考圖暫時未能載入');
      await expect(frame.locator('.image-source')).toBeVisible();
    }
  }
  await expect(page.locator('img[src=""], img[src*="assets/images/"]')).toHaveCount(0);
});

test('a missing local uniform may use only its matching official image, and updates the caption', async ({ page }) => {
  const bytes = fs.readFileSync(path.join(__dirname, '../assets/reference/cub-female.webp'));
  await page.route('**/assets/reference/cub-female.webp', route => route.abort());
  await page.route('https://www.scout.org.hk/uploads/member/Cub_G.jpg', route => route.fulfill({ contentType: 'image/webp', body: bytes }));
  await page.goto(baseURL);
  await choose(page, 'cub', 'land', 'female');
  const frame = page.locator('#preview .reference-image');
  await frame.scrollIntoViewIfNeeded();
  await expect(frame.locator('img')).toHaveAttribute('src', 'https://www.scout.org.hk/uploads/member/Cub_G.jpg');
  await loaded(frame.locator('img'));
  await expect(frame.locator('.image-caption-label')).toHaveText('官方制服參考圖');
  await expect(frame.locator('img')).toHaveAttribute('alt', /女裝制服參考圖/);
  await expect(frame.locator('.image-source')).toHaveAttribute('href', /cub-scouts/);
});

test('a missing local badge shows an honest notice and keeps its handbook link', async ({ page }) => {
  let attempts = 0;
  const requests = [];
  await page.route('**/assets/reference/capbadge-scout.webp', route => { attempts++; return route.abort(); });
  page.on('request', request => requests.push(request.url()));
  await page.goto(baseURL);
  await choose(page, 'scout');
  const item = await expandItem(page, 'capbadge-scout');
  await expect(item.locator('img')).toHaveCount(0);
  await expect(item.locator('.item-fig .image-unavailable')).toBeVisible();
  await expect(item.locator('.image-caption-label')).toHaveText('參考圖暫時未能載入');
  await expect(item.locator('.image-source')).toHaveAttribute('href', /uniformhandbook_p96-106\.pdf#page=7$/);
  expect(attempts).toBeGreaterThan(0);
  expect(attempts).toBeLessThanOrEqual(2); // thumbnail + detail, never an error loop
  expect(requests.filter(url => /capbadge-.*\.svg|\/files\/(mid|thum)\/314_/.test(url))).toEqual([]);
  await expect(page.locator('img[src=""]')).toHaveCount(0);
});

test('ordinary clothing fallback is labelled as an illustration without losing its product link', async ({ page }) => {
  await page.goto(baseURL);
  await choose(page, 'cub');
  const item = await expandItem(page, 'shirt-beige');
  const frame = item.locator('.item-fig');
  await expect(frame.locator('img')).toHaveAttribute('src', 'assets/items/shirt-beige.jpg');
  await loaded(frame.locator('img'));
  await expect(frame.locator('img')).toHaveAttribute('alt', /非實物照片/);
  await expect(frame.locator('.image-caption-label')).toHaveText('款式示意（非實物照片）');
  await expect(frame.locator('.image-note')).toContainText('供應社圖片暫時未能載入');
  await expect(frame.locator('.image-source')).toHaveAttribute('href', /id=369$/);
});

test('when both product and illustration fail, there is no broken image, empty src, or retry loop', async ({ page }) => {
  let attempts = 0;
  const errors = [];
  await page.route('**/assets/items/shirt-beige.jpg', route => { attempts++; return route.abort(); });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(baseURL);
  await choose(page, 'cub');
  const item = await expandItem(page, 'shirt-beige');
  await expect(item.locator('img')).toHaveCount(0);
  await expect(item.locator('.item-fig .image-unavailable')).toBeVisible();
  await expect(item.locator('.image-source')).toHaveAttribute('href', /id=369$/);
  expect(attempts).toBeGreaterThan(0);
  expect(attempts).toBeLessThanOrEqual(2);
  expect(errors).toEqual([]);
  await expect(page.locator('img[src=""]')).toHaveCount(0);
});

test('unverified insignia never fall back to invented artwork', async ({ page }) => {
  await page.goto(baseURL);
  for (const [section, id] of [['scout', 'patrol-badge'], ['leader', 'epaulette-rank']]) {
    await choose(page, section);
    const item = await expandItem(page, id);
    await expect(item.locator('img')).toHaveCount(0);
    await expect(item.locator('.item-fig .image-unavailable')).toBeVisible();
    await expect(item.locator('.image-source')).toHaveAttribute('href', /www\.hkscoutshop\.org\.hk/);
  }
});

test('badge advice matches the references without discarding existing checklist item IDs', async ({ page }) => {
  await page.goto(baseURL);
  const result = await page.evaluate(() => {
    const cub = buildChecklist({ section:'cub', branch:'land', gender:'male', mode:'new' }).find(item => item.id === 'capbadge-cub');
    const sea = buildChecklist({ section:'rover', branch:'sea', gender:'female', mode:'upgrade', fromSection:'venture', fromBranch:'sea' }).find(item => item.id === 'capbadge-rover-sea');
    return { cub, sea, rank:ITEM_REFERENCES['capbadge-rank'], sourceIds:UNIFORM_SPEC.venture.sea.female };
  });
  expect(result.cub.desc).toContain('布質帽章');
  expect(result.cub.detail).toContain('毋須另購');
  expect(result.cub.status).toBe('check');
  expect(result.sea.id).toBe('capbadge-rover-sea');
  expect(result.sea.status).toBe('have');
  expect(result.sourceIds).toContain('capbadge-venture-sea');
  expect(result.rank.note).toContain('只示範綠色團長款');
  await expect(page.locator('#budget-dynamic')).toContainText('已連帽，毋須另購');
});

for (const width of [320, 390]) {
  test(`new images and source captions fit a ${width}px mobile viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(baseURL);
    // Use real CJK glyph metrics when the optional local test font is installed.
    const font = path.join(__dirname, '../node_modules/@fontsource/noto-sans-hk/400.css');
    if (fs.existsSync(font)) {
      await page.addStyleTag({ url:`${baseURL}/node_modules/@fontsource/noto-sans-hk/400.css` });
      await page.addStyleTag({ content:'body,button{font-family:"Noto Sans HK",sans-serif}' });
      await page.evaluate(() => document.fonts.ready);
    }
    await choose(page, 'scout');
    const item = await expandItem(page, 'capbadge-scout');
    await loaded(item.locator('.item-fig img'));
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const boxes = await item.locator('.item-fig, .item-fig img, figcaption, .image-source').evaluateAll(nodes => nodes.map(node => {
      const box = node.getBoundingClientRect();
      return { left:box.left, right:box.right };
    }));
    for (const box of boxes) {
      expect(box.left).toBeGreaterThanOrEqual(0);
      expect(box.right).toBeLessThanOrEqual(width);
    }
  });
}
