import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4323';
const output = 'tmp/landing-qa';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  channel:
    process.env.BROWSER_CHANNEL ||
    (process.platform === 'win32' ? 'msedge' : undefined),
});
const context = await browser.newContext({ reducedMotion: 'reduce' });
await context.route(/posthog\.com/, (route) => route.abort());
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const report = { layouts: [], accessibility: [], interactions: [], errors };
const sizes = [
  [320, 568],
  [375, 667],
  [390, 844],
  [430, 932],
  [430, 780],
  [430, 720],
  [600, 800],
  [768, 1024],
  [1024, 768],
  [1280, 720],
  [1440, 900],
  [1920, 1080],
  [844, 390],
];
const hideToolbar = (p) =>
  p.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
const theme = async (value) => {
  await page.locator('.theme-menu summary').click();
  await page
    .getByRole('button', { name: `Use ${value} theme`, exact: true })
    .click();
};
const setView = async (value) => {
  if ((await page.locator('.experience').getAttribute('data-view')) !== value)
    await page.locator('[data-view-toggle]').click();
};
const geometry = async (width, height, view, safeArea = false) => {
  await page.waitForFunction(() =>
    [...document.querySelectorAll('.project-card img')].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
  const result = await page.evaluate(() => {
    const canvas = document
      .querySelector('.experience')
      .getBoundingClientRect();
    const elements = [
      ...document.querySelectorAll(
        '.experience-header .brand,.experience-header summary,.landing-links a,.project-tabs button,.deck-actions button',
      ),
    ].filter((e) => e.getBoundingClientRect().width);
    const rect = (e) => {
      const r = e.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
    };
    const outside = elements
      .filter((e) => {
        const r = rect(e);
        return (
          r.left < canvas.left - 1 ||
          r.right > canvas.right + 1 ||
          r.top < canvas.top - 1 ||
          r.bottom > canvas.bottom + 1
        );
      })
      .map((e) => e.textContent || e.getAttribute('aria-label'));
    const overlaps = [];
    for (let i = 0; i < elements.length; i++)
      for (let j = i + 1; j < elements.length; j++) {
        const a = rect(elements[i]),
          b = rect(elements[j]);
        if (
          Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 &&
          Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2
        )
          overlaps.push([elements[i].textContent, elements[j].textContent]);
      }
    const copy = rect(document.querySelector('.landing-copy'));
    const footer = rect(document.querySelector('.landing-footer'));
    const cardRects = [...document.querySelectorAll('.project-card')].map(
      (e) => ({ name: e.dataset.projectName, ...rect(e) }),
    );
    const copyCardOverlap = cardRects
      .filter(
        (r) =>
          Math.min(copy.right, r.right) - Math.max(copy.left, r.left) > 15 &&
          Math.min(copy.bottom, r.bottom) - Math.max(copy.top, r.top) > 10,
      )
      .map((r) => r.name);
    const footerCardOverlap =
      innerWidth <= 700
        ? cardRects.filter((r) => r.bottom > footer.top + 1).map((r) => r.name)
        : [];
    const mobileButtons =
      innerWidth <= 700
        ? [...document.querySelectorAll('.deck-actions button')]
            .filter((e) => !e.inert)
            .map((e) => ({
              width: e.getBoundingClientRect().width,
              height: e.getBoundingClientRect().height,
            }))
        : [];
    const screenshotRatios =
      innerWidth <= 700 &&
      document.querySelector('.experience').dataset.view === 'stack'
        ? [...document.querySelectorAll('.project-visual')].map(
            (e) => e.clientWidth / e.clientHeight,
          )
        : [];
    const clipped = cardRects
      .filter(
        (r) =>
          r.left < canvas.left - 2 ||
          r.right > canvas.right + 2 ||
          r.top < canvas.top - 2 ||
          r.bottom > canvas.bottom + 2,
      )
      .map((r) => r.name);
    const brokenImages = [...document.querySelectorAll('.project-card img')]
      .filter((e) => !e.complete || !e.naturalWidth)
      .map((e) => e.src);
    return {
      viewportWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      outside,
      overlaps,
      copyCardOverlap,
      footerCardOverlap,
      mobileButtons,
      screenshotRatios,
      clipped,
      brokenImages,
      cardRects,
      copy,
    };
  });
  report.layouts.push({ width, height, view, safeArea, ...result });
  assert.ok(
    result.scrollWidth <= result.viewportWidth,
    `${width}x${height} ${view} horizontal scroll`,
  );
  assert.equal(
    result.scrollHeight,
    height,
    `${width}x${height} ${view} vertical scroll`,
  );
  for (const key of [
    'outside',
    'overlaps',
    'copyCardOverlap',
    'footerCardOverlap',
    'clipped',
    'brokenImages',
  ])
    assert.deepEqual(result[key], [], `${width}x${height} ${view} ${key}`);
  for (const button of result.mobileButtons) {
    assert.equal(button.width, 44);
    assert.equal(button.height, 44);
  }
  for (const ratio of result.screenshotRatios)
    assert.ok(
      Math.abs(ratio - 1.82) < 0.04,
      `${width}x${height} screenshot proportions`,
    );
};
try {
  await page.goto(base);
  await hideToolbar(page);
  await page.evaluate(() => document.fonts.ready);
  for (const value of ['light', 'dark', 'system']) {
    await theme(value);
    for (const [width, height] of sizes) {
      await page.setViewportSize({ width, height });
      for (const view of ['stack', 'list']) {
        await setView(view);
        await geometry(width, height, view);
      }
    }
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
      for (const view of ['stack', 'list']) {
        await setView(view);
        const scan = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        const violations = scan.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        }));
        report.accessibility.push({ theme: value, width, view, violations });
        assert.deepEqual(
          violations,
          [],
          `${value} ${width} ${view} accessibility`,
        );
      }
    }
    console.log(
      `Verified ${value}: ${sizes.length * 2} layouts and four accessibility scans.`,
    );
  }
  // Safari's visible viewport can be shorter while its toolbars are expanded.
  // Reserve notch/home-indicator space as well as testing the viewport height.
  await setView('stack');
  for (const height of [780, 720]) {
    await page.setViewportSize({ width: 430, height });
    const safe = await page.addStyleTag({
      content: 'body.landing-page{padding-top:47px;padding-bottom:34px}',
    });
    await geometry(430, height, 'stack', true);
    await safe.evaluate((element) => element.remove());
  }
  for (const [width, height] of [
    [430, 780],
    [1440, 900],
  ]) {
    await page.setViewportSize({ width, height });
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('.landing-copy .cv-link').click(),
    ]);
    assert.equal(download.suggestedFilename(), 'Freddie-Philpot-CV.pdf');
    assert.equal(await download.failure(), null);
    const pdf = await fs.readFile(await download.path());
    assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
    await page.screenshot({ path: `${output}/home-cv-${width}.png` });
  }
  report.interactions.push(
    'Home-page CV button downloads the PDF on mobile and desktop',
  );
  await setView('stack');
  for (const [index, name] of ['Markup', 'Glyph', 'Arc'].entries()) {
    await page.getByRole('button', { name, exact: true }).click();
    assert.equal(
      await page
        .locator(`[data-project-card="${name.toLowerCase()}"]`)
        .getAttribute('data-depth'),
      '0',
    );
    assert.equal(
      await page
        .locator(`[data-project-switch="${index}"]`)
        .getAttribute('aria-pressed'),
      'true',
    );
  }
  await page.locator('[data-project-next]').click();
  assert.equal(
    await page
      .locator('[data-project-card="markup"]')
      .getAttribute('data-depth'),
    '0',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.mobile-menu summary').focus();
  await page.keyboard.press('Enter');
  assert.ok(await page.locator('.mobile-menu').evaluate((e) => e.open));
  await page.keyboard.press('Escape');
  assert.ok(
    await page
      .locator('.mobile-menu summary')
      .evaluate((e) => e === document.activeElement),
  );
  await page.locator('[data-project-switch="0"]').focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(
    await page
      .locator('[data-project-card="glyph"]')
      .getAttribute('data-depth'),
    '0',
  );
  await theme('dark');
  await page.reload();
  await hideToolbar(page);
  assert.ok(
    await page.locator('html').evaluate((e) => e.classList.contains('dark')),
  );
  await theme('system');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.waitForFunction(
    () => !document.documentElement.classList.contains('dark'),
  );
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForFunction(() =>
    document.documentElement.classList.contains('dark'),
  );
  report.interactions.push(
    'Three project choices, wraparound, keyboard controls, menu and persistent/system themes',
  );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(950);
  const still = await page
    .locator('[data-project-card="markup"]')
    .boundingBox();
  await page.mouse.move(1000, 400);
  await page.waitForTimeout(500);
  assert.deepEqual(
    await page.locator('[data-project-card="markup"]').boundingBox(),
    still,
    'Hover leaves the project cards still',
  );
  assert.equal(await page.locator('[data-motion-toggle]').count(), 0);
  await page.mouse.move(1050, 500);
  await page.mouse.wheel(100, 0);
  await page.waitForTimeout(950);
  assert.equal(
    await page
      .locator('[data-project-card="glyph"]')
      .getAttribute('data-depth'),
    '0',
  );
  await page.mouse.wheel(0, 160);
  await page.waitForTimeout(200);
  assert.equal(
    await page
      .locator('[data-project-card="glyph"]')
      .getAttribute('data-depth'),
    '0',
  );
  await page.mouse.wheel(-100, 0);
  await page.waitForTimeout(950);
  assert.equal(
    await page
      .locator('[data-project-card="markup"]')
      .getAttribute('data-depth'),
    '0',
  );
  await setView('list');
  await page.waitForTimeout(450);
  assert.equal(await page.locator('[data-project-next]').isVisible(), false);
  assert.equal(await page.locator('.project-tabs').isVisible(), false);
  assert.ok(await page.locator('[data-view-toggle]').isVisible());
  await setView('stack');
  await page.getByRole('button', { name: 'Arc', exact: true }).click();
  await page.waitForTimeout(950);
  await page.locator('[data-project-card="arc"]').click();
  assert.ok(await page.locator('.project-departure').count());
  await page.waitForURL('**/projects/arc');
  assert.equal(await page.locator('#main h1').textContent(), 'Arc');
  assert.ok(
    await page
      .locator('html')
      .evaluate((e) => e.classList.contains('project-arrival')),
  );
  await page.goBack();
  await hideToolbar(page);
  assert.equal(await page.locator('.project-departure').count(), 0);
  report.interactions.push(
    'Static hover, simplified list controls, animated Arc navigation, arrival and browser back',
  );
  const touch = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce',
  });
  const tp = await touch.newPage();
  await tp.goto(base);
  await hideToolbar(tp);
  const cdp = await touch.newCDPSession(tp);
  const swipe = async (from, to) => {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: from[0], y: from[1] }],
    });
    await tp.waitForTimeout(70);
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: (from[0] + to[0]) / 2, y: (from[1] + to[1]) / 2 }],
    });
    await tp.waitForTimeout(70);
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: to[0], y: to[1] }],
    });
    await tp.waitForTimeout(70);
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
  };
  assert.equal(
    await tp
      .locator('.project-deck')
      .evaluate((e) => getComputedStyle(e).touchAction),
    'pan-y pinch-zoom',
  );
  await tp.evaluate(() => {
    window.verticalCancelled = false;
    document.addEventListener(
      'pointercancel',
      () => {
        window.verticalCancelled = true;
      },
      { once: true },
    );
  });
  await swipe([200, 620], [200, 470]);
  assert.equal(
    await tp.locator('[data-project-card="markup"]').getAttribute('data-depth'),
    '0',
  );
  assert.ok(
    await tp.evaluate(() => window.verticalCancelled),
    'Browser takes ownership of vertical scrolling gestures',
  );
  await swipe([270, 530], [130, 530]);
  assert.equal(
    await tp.locator('[data-project-card="glyph"]').getAttribute('data-depth'),
    '0',
  );
  await swipe([130, 530], [270, 530]);
  assert.equal(
    await tp.locator('[data-project-card="markup"]').getAttribute('data-depth'),
    '0',
  );
  await swipe([270, 530], [130, 530]);
  assert.equal(
    await tp.locator('[data-project-card="glyph"]').getAttribute('data-depth'),
    '0',
  );
  assert.equal(new URL(tp.url()).pathname, '/');
  await tp.locator('[data-project-card="glyph"]').tap();
  await tp.waitForURL('**/projects/glyph');
  await touch.close();
  report.interactions.push(
    'Left/right touch swipes browse, vertical gestures stay native, and the next tap opens the project',
  );
  const noJS = await browser.newContext({
    viewport: { width: 320, height: 568 },
    javaScriptEnabled: false,
  });
  const np = await noJS.newPage();
  await np.goto(base);
  assert.equal(await np.locator('[data-project-card]').count(), 3);
  for (const href of await np
    .locator('[data-project-card]')
    .evaluateAll((es) => es.map((e) => e.getAttribute('href'))))
    assert.ok((await context.request.get(base + href)).ok(), href);
  await noJS.close();
  await page.goto(base + '/about');
  assert.ok(await page.locator('.site-footer').isVisible());
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollHeight > innerHeight,
    ),
  );
  report.interactions.push(
    'No-JavaScript project links and normal scrolling on inner pages',
  );
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify(
      {
        layouts: report.layouts.length,
        accessibility: report.accessibility.length,
        interactions: report.interactions,
      },
      null,
      2,
    ),
  );
} finally {
  await fs.writeFile(output + '/report.json', JSON.stringify(report, null, 2));
  await browser.close();
}
