import { chromium, webkit } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

export async function checkMenu(page, base) {
  const menu = page.locator('.mobile-menu');
  const trigger = menu.locator('summary');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const route of ['/', '/projects', '/about']) {
    await page.goto(base + route);
    for (const theme of ['light', 'dark']) {
      await page.evaluate(
        (value) =>
          document.documentElement.classList.toggle('dark', value === 'dark'),
        theme,
      );
      await trigger.click();
      const growth = await menu.evaluate((element) => {
        const surface = element.querySelector('.menu-surface');
        const animations = element
          .querySelector('nav')
          .getAnimations({ subtree: true });
        const rect = () => {
          const r = surface.getBoundingClientRect();
          return { width: r.width, height: r.height };
        };
        animations.forEach((a) => {
          a.pause();
          a.currentTime = 0;
        });
        const start = rect();
        animations.forEach((a) => {
          a.currentTime = 100;
        });
        const middle = rect();
        const state = () => [
          getComputedStyle(surface).transform,
          ...[...element.querySelectorAll('.menu-pages, .menu-utilities')].map(
            (e) => getComputedStyle(e).opacity,
          ),
        ];
        const before = state();
        element.querySelector('summary').click();
        const closing = state();
        element.querySelector('summary').click();
        const reopening = state();
        animations.forEach((a) => a.finish());
        return { start, middle, before, closing, reopening };
      });
      assert.ok(Math.abs(growth.start.width - 44) < 0.1);
      assert.ok(Math.abs(growth.start.height - 44) < 0.1);
      assert.ok(growth.middle.width > 44 && growth.middle.width < 280);
      assert.ok(growth.middle.height > 44);
      assert.deepEqual(
        growth.closing,
        growth.before,
        'Close preserves the current frame',
      );
      assert.deepEqual(
        growth.reopening,
        growth.before,
        'Reopen preserves the current frame',
      );
      await page.waitForFunction(() =>
        document.querySelector('.mobile-menu').hasAttribute('data-filled'),
      );
      assert.equal(await menu.locator('nav').evaluate((e) => e.inert), false);
      const surface = menu.locator('.menu-surface');
      assert.equal(
        await surface.evaluate((e) => getComputedStyle(e).display),
        'block',
      );
      assert.notEqual(
        await surface.evaluate((e) => getComputedStyle(e).backgroundColor),
        'rgba(0, 0, 0, 0)',
      );
      await page.screenshot({
        path: `tmp/menu-${route === '/' ? 'home' : route.slice(1)}-${theme}-smooth.png`,
      });
      await page.keyboard.press('Escape');
      assert.equal(await menu.locator('nav').evaluate((e) => e.inert), true);
      await page.waitForFunction(
        () => !document.querySelector('.mobile-menu').open,
      );
      assert.equal(
        await trigger.evaluate((e) => e === document.activeElement),
        true,
      );
      const rapid = await menu.evaluate(async (element) => {
        const summary = element.querySelector('summary');
        const surface = element.querySelector('.menu-surface');
        let samples = 0;
        const failures = [];
        let watching = true;
        const inspect = () => {
          if (element.open) {
            samples++;
            const style = getComputedStyle(surface);
            if (
              style.display === 'none' ||
              style.backgroundColor === 'rgba(0, 0, 0, 0)'
            )
              failures.push('Missing surface');
          }
          if (watching) requestAnimationFrame(inspect);
        };
        requestAnimationFrame(inspect);
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        for (const delay of [35, 65, 110, 180, 70, 240, 40, 80, 20]) {
          summary.click();
          await wait(delay);
        }
        await wait(400);
        const finalVisible =
          element.hasAttribute('data-filled') &&
          [...element.querySelectorAll('.menu-pages, .menu-utilities')].every(
            (e) => Number(getComputedStyle(e).opacity) === 1,
          );
        summary.click();
        summary.click();
        summary.click();
        await wait(400);
        watching = false;
        return {
          failures,
          samples,
          finalVisible,
          closed: !element.open,
          animations: surface.getAnimations().length,
        };
      });
      assert.deepEqual(rapid.failures, []);
      assert.ok(rapid.samples > 10);
      assert.equal(rapid.finalVisible, true);
      assert.equal(rapid.closed, true);
      assert.equal(rapid.animations, 0);
    }
  }
  // Same-frame taps, outside clicks, breakpoint changes and motion changes.
  await menu.evaluate((e) => {
    const s = e.querySelector('summary');
    s.click();
    s.click();
    s.click();
  });
  await page.waitForFunction(() =>
    document.querySelector('.mobile-menu').hasAttribute('data-filled'),
  );
  await page.mouse.click(20, 700);
  await page.waitForFunction(
    () => !document.querySelector('.mobile-menu').open,
  );
  await trigger.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForFunction(
    () => !document.querySelector('.mobile-menu').open,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await trigger.click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() =>
    document.querySelector('.mobile-menu').hasAttribute('data-filled'),
  );
  assert.equal(
    await menu
      .locator('.menu-surface')
      .evaluate((e) => e.getAnimations().length),
    0,
  );
  await page.keyboard.press('Escape');
  await trigger.focus();
  await page.keyboard.press('Enter');
  assert.equal(await menu.evaluate((e) => e.open), true);
  await page.keyboard.press('Escape');
  assert.equal(await menu.evaluate((e) => e.open), false);
  // A short landscape viewport can scroll links without moving the background.
  await page.setViewportSize({ width: 844, height: 390 });
  await trigger.click();
  const scroll = await menu.evaluate((e) => {
    const scroller = e.querySelector('.menu-scroll');
    const surface = e.querySelector('.menu-surface');
    const before = surface.getBoundingClientRect().toJSON();
    scroller.scrollTop = scroller.scrollHeight;
    const after = surface.getBoundingClientRect().toJSON();
    const last = e
      .querySelector('.menu-utilities a:last-child')
      .getBoundingClientRect();
    const nav = e.querySelector('nav').getBoundingClientRect();
    return {
      before,
      after,
      canScroll: scroller.scrollHeight > scroller.clientHeight,
      lastVisible: last.bottom <= nav.bottom && last.top >= nav.top,
    };
  });
  assert.equal(scroll.canScroll, true);
  assert.equal(scroll.lastVisible, true);
  assert.deepEqual(scroll.after, scroll.before);
  await page.keyboard.press('Escape');
}

if (process.argv[1].replaceAll('\\', '/').endsWith('/menu-check.mjs')) {
  await fs.mkdir('tmp', { recursive: true });
  const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4323';
  for (const [name, engine, options] of [
    ['chromium', chromium, { channel: 'msedge' }],
    ['webkit', webkit, {}],
  ]) {
    const browser = await engine.launch({ headless: true, ...options });
    try {
      const context = await browser.newContext();
      await context.route(
        /posthog\.com|googletagmanager\.com|google-analytics\.com/,
        (route) => route.abort(),
      );
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      if (name === 'chromium') {
        const cdp = await context.newCDPSession(page);
        await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      }
      await checkMenu(page, base);
      const fallback = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 390, height: 844 },
      });
      const noJS = await fallback.newPage();
      await noJS.goto(base);
      await noJS.locator('.mobile-menu summary').click();
      assert.ok(
        await noJS
          .getByRole('navigation', { name: 'Mobile navigation' })
          .getByRole('link', { name: 'About', exact: true })
          .isVisible(),
      );
      assert.deepEqual(errors, []);
      console.log(
        `${name}: menu reversals, rapid taps, keyboard, reduced motion, short viewport scrolling and no-JS fallback passed.`,
      );
    } finally {
      await browser.close();
    }
  }
}
