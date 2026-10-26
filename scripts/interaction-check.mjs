import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
await fs.mkdir('tmp/qa', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'no-preference',
});
await context.route(
  /posthog\.com|googletagmanager\.com|google-analytics\.com|challenges\.cloudflare\.com/,
  (r) => r.abort(),
);
await context.addInitScript(() => {
  addEventListener('pagereveal', (e) => {
    if (!e.viewTransition) return;
    e.viewTransition.ready
      .then(() => {
        window.__navTransition = document.getAnimations().map((a) => ({
          name: a.animationName,
          pseudo: a.effect?.pseudoElement,
        }));
      })
      .catch(() => {});
  });
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4323';
try {
  await page.goto(base + '/blog', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: 'astro-dev-toolbar{display:none!important}',
  });
  assert.equal(await page.locator('[data-post]:visible').count(), 6);
  assert.equal(await page.locator('main select').count(), 0);
  const list = await page
    .locator('[data-post]')
    .evaluateAll((es) => es.map((e) => e.getBoundingClientRect().toJSON()));
  assert.ok(
    list.slice(1).every((r, i) => r.top >= list[i].bottom - 1),
    'Articles form a vertical list',
  );
  await page.getByRole('button', { name: 'Networking', exact: true }).click();
  assert.equal(await page.locator('[data-post]:visible').count(), 3);
  await page.locator('#post-search').fill('dns');
  assert.equal(await page.locator('[data-post]:visible').count(), 1);
  await page.locator('#post-search').fill('unmatched-article');
  assert.equal(await page.locator('[data-post]:visible').count(), 0);
  await page
    .getByRole('button', { name: 'Clear filters', exact: true })
    .click();
  assert.equal(await page.locator('[data-post]:visible').count(), 6);
  await page.locator('main h1').click();
  await page.locator('#post-search').click({ position: { x: 300, y: 25 } });
  const focus = await page.locator('.field-aura > span').evaluate((el) => {
    const a = el.getAnimations()[0];
    if (!a) return null;
    a.pause();
    a.currentTime = 250;
    return {
      frames: a.effect.getKeyframes(),
      outline: getComputedStyle(document.activeElement).outlineStyle,
    };
  });
  assert.ok(focus, 'Pointer focus starts a finite border reveal');
  assert.equal(focus.outline, 'none');
  assert.ok(
    /30[0-4]px/.test(focus.frames[0].clipPath),
    'Reveal starts where the field was clicked',
  );
  await page.screenshot({ path: 'tmp/qa/writing-focus.png', fullPage: true });
  await page
    .locator('.field-aura > span')
    .evaluate((el) => el.getAnimations().forEach((a) => a.finish()));
  await page.waitForTimeout(200);
  assert.equal(
    await page
      .locator('.field-aura > span')
      .evaluate(
        (el) =>
          el.getAnimations().filter((a) => a.playState === 'running').length,
      ),
    0,
  );
  await page.locator('.desktop-nav a[href="/contact"]').click();
  await page.waitForURL('**/contact');
  await page.waitForLoadState('networkidle');
  assert.ok(
    (await page.evaluate(() => window.__navTransition)).some(
      (a) => a.pseudo === '::view-transition-group(nav-blob)',
    ),
    'One continuous native marker transition',
  );
  assert.equal(await page.locator('.desktop-nav .nav-blob').count(), 1);
  await page.locator('#name').fill('Test Visitor');
  await page.locator('#email').fill('test@example.com');
  await page.locator('#message').click({ position: { x: 160, y: 50 } });
  await page.locator('#message').fill('A local test message, never submitted.');
  assert.equal(await page.locator('#name').inputValue(), 'Test Visitor');
  await page.waitForTimeout(750);
  const rotating = () =>
    page.evaluate(
      () =>
        document
          .getAnimations()
          .filter(
            (a) =>
              a.animationName === 'aura-orbit' && a.playState === 'running',
          ).length,
    );
  assert.equal(await rotating(), 1, 'Only the focused field animates');
  const before = await page
    .locator('#message + .field-aura > span')
    .evaluate((el) => getComputedStyle(el, '::before').transform);
  await page.waitForTimeout(150);
  const after = await page
    .locator('#message + .field-aura > span')
    .evaluate((el) => getComputedStyle(el, '::before').transform);
  assert.notEqual(
    before,
    after,
    'Gradient keeps moving after the entry reveal',
  );
  await page.locator('main h1').click();
  assert.equal(await rotating(), 0, 'Unfocused fields do not keep animating');
  await page.locator('#message').focus();
  assert.equal(
    await page
      .locator('#message')
      .evaluate((el) => getComputedStyle(el).outlineStyle),
    'none',
    'Keyboard focus has one border',
  );
  await page.addStyleTag({
    content: 'astro-dev-toolbar{display:none!important}',
  });
  await page.screenshot({ path: 'tmp/qa/contact-focus.png', fullPage: true });
  for (const theme of ['light', 'dark']) {
    await page.evaluate(
      (t) => document.documentElement.classList.toggle('dark', t === 'dark'),
      theme,
    );
    await page.waitForTimeout(250);
    const result = await new AxeBuilder({ page }).analyze();
    if (result.violations.length)
      console.log(
        JSON.stringify(
          result.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
        ),
      );
    assert.deepEqual(
      result.violations.map((v) => v.id),
      [],
      `contact ${theme}`,
    );
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('#name').click();
  assert.equal(
    await page
      .locator('.field-aura > span')
      .evaluateAll((es) => es.flatMap((e) => e.getAnimations()).length),
    0,
  );
  await page.keyboard.press('Tab');
  assert.equal(
    await page.locator('#email').evaluate((e) => e === document.activeElement),
    true,
  );
  assert.equal(
    await page
      .locator('#email')
      .evaluate((e) => getComputedStyle(e).outlineStyle),
    'none',
  );
  for (const route of ['/blog', '/contact', '/']) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth + 1,
        ),
        false,
        `${route} overflow ${width}`,
      );
    }
    if (route === '/')
      assert.equal(await page.locator('.project-tabs img').count(), 0);
    if (route === '/blog') {
      await page.waitForTimeout(250);
      const result = await new AxeBuilder({ page }).analyze();
      if (result.violations.length)
        console.log(
          JSON.stringify(
            result.violations.map((v) => ({
              id: v.id,
              nodes: v.nodes.map((n) => ({
                target: n.target,
                summary: n.failureSummary,
              })),
            })),
          ),
        );
      assert.deepEqual(
        result.violations.map((v) => v.id),
        [],
        'writing accessibility',
      );
      await page.setViewportSize({ width: 390, height: 844 });
      await page.addStyleTag({
        content: 'astro-dev-toolbar{display:none!important}',
      });
      await page.screenshot({
        path: 'tmp/qa/writing-list-mobile.png',
        fullPage: true,
      });
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    'Writing filters/list, native page transition, pointer-origin reveal, focused-only continuous gradient, keyboard/reduced motion, responsive and accessibility checks passed.',
  );
} finally {
  await browser.close();
}
