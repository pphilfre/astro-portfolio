import { chromium, webkit } from '@playwright/test';
import assert from 'node:assert/strict';

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4327';
for (const [name, engine, options] of [
  [
    'chromium',
    chromium,
    { channel: process.platform === 'win32' ? 'msedge' : undefined },
  ],
  ['webkit', webkit, {}],
]) {
  const browser = await engine.launch({ headless: true, ...options });
  try {
    for (const mobile of [false, true]) {
      const context = await browser.newContext({
        viewport: mobile
          ? { width: 390, height: 844 }
          : { width: 1440, height: 900 },
        hasTouch: mobile,
        reducedMotion: 'no-preference',
      });
      await context.route(
        /posthog\.com|googletagmanager\.com|google-analytics\.com|ingest\.de\.sentry\.io/,
        (route) => route.abort(),
      );
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(base);
      await page.locator('[data-project-next]').click();
      await page.locator('[data-view-toggle]').click();
      await page.waitForFunction(() =>
        [...document.images].every(
          (image) => image.complete && image.naturalWidth > 0,
        ),
      );
      const homeState = await page.evaluateHandle(() => ({
        document,
        images: [...document.images],
      }));
      const requests = [];
      page.on('request', (request) => {
        if (request.isNavigationRequest() || request.resourceType() === 'image')
          requests.push(request.url());
      });
      const activate = (locator) => (mobile ? locator.tap() : locator.click());
      for (let i = 0; i < 3; i++) await activate(page.locator('.brand'));
      if (mobile) await activate(page.locator('.mobile-menu summary'));
      const home = page
        .getByRole('navigation', {
          name: mobile ? 'Mobile navigation' : 'Main navigation',
          exact: true,
        })
        .getByRole('link', { name: 'Home', exact: true });
      await activate(home);
      await page.locator('.brand').focus();
      await page.keyboard.press('Enter');
      // Allow a mistakenly started document navigation to commit.
      await page.waitForTimeout(400);
      assert.deepEqual(
        requests,
        [],
        'Home and brand must not reload the document or images when already home',
      );
      assert.equal(
        await page.evaluate(
          (state) =>
            document === state.document &&
            state.images.every(
              (image, index) => image === document.images[index],
            ),
          homeState,
        ),
        true,
      );
      assert.equal(
        await page.locator('[data-experience]').getAttribute('data-view'),
        'list',
      );
      assert.equal(
        await page
          .locator('[data-project-card="dispatch"]')
          .getAttribute('data-depth'),
        '0',
      );
      assert.equal(
        await page.locator('.mobile-menu').evaluate((menu) => menu.open),
        false,
      );

      // The same controls must still navigate home from other routes.
      for (const selector of [
        '.brand',
        mobile ? '.mobile-menu a[href="/"]' : '.desktop-nav a[href="/"]',
      ]) {
        await page.goto(base + '/about');
        if (mobile && selector !== '.brand')
          await activate(page.locator('.mobile-menu summary'));
        await activate(page.locator(selector));
        await page.waitForURL(base + '/');
        await page.waitForFunction(() =>
          [...document.images].every(
            (image) => image.complete && image.naturalWidth > 0,
          ),
        );
        assert.equal(
          await page.locator('[data-experience]').getAttribute('data-view'),
          'stack',
        );
        assert.equal(await page.locator('.project-departure').count(), 0);
        assert.equal(
          await page
            .locator('html')
            .evaluate((html) => html.classList.contains('project-arrival')),
          false,
        );
      }
      assert.deepEqual(errors, []);
      console.log(
        `${name} ${mobile ? 'mobile taps' : 'desktop clicks'}: repeated Home/brand activation preserves document, images and deck; return links work.`,
      );
      await context.close();
    }
  } finally {
    await browser.close();
  }
}
