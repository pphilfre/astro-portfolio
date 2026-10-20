import { chromium, webkit } from '@playwright/test';
import assert from 'node:assert/strict';
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4327';
for (const [name, engine, options] of [
  [
    'chromium',
    chromium,
    {
      channel: process.platform === 'win32' ? 'msedge' : undefined,
      ignoreDefaultArgs: ['--disable-back-forward-cache'],
    },
  ],
  ['webkit', webkit, {}],
]) {
  const browser = await engine.launch({ headless: true, ...options });
  try {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'no-preference',
    });
    // Do not intercept requests: routing disables the normal history/cache path.
    // The SDK filters the automated browser, so it sends no analytics events.
    await page.addInitScript(() =>
      window.addEventListener(
        'pageshow',
        (event) => {
          const scene = document.querySelector('[data-experience]');
          if (scene)
            sessionStorage.setItem(
              'qa-home-show',
              JSON.stringify({
                persisted: event.persisted,
                overlay: !!document.querySelector('.project-departure'),
                leaving: scene.hasAttribute('data-leaving'),
                opacity: getComputedStyle(
                  document.querySelector('.landing-copy'),
                ).opacity,
                menuOpen: !!document.querySelector('.mobile-menu[open]'),
              }),
            );
        },
        { capture: true },
      ),
    );
    for (const route of ['/projects/markup', '/about']) {
      await page.goto(base);
      await page.evaluate(() =>
        window.addEventListener('pagehide', (event) =>
          sessionStorage.setItem(
            'qa-home-hide',
            JSON.stringify({
              persisted: event.persisted,
              overlay: !!document.querySelector('.project-departure'),
              leaving: document
                .querySelector('[data-experience]')
                .hasAttribute('data-leaving'),
            }),
          ),
        ),
      );
      if (route === '/projects/markup')
        await page.locator('[data-project-card="markup"]').click();
      else {
        await page.locator('.mobile-menu summary').click();
        await page
          .getByRole('navigation', { name: 'Mobile navigation' })
          .getByRole('link', { name: 'About', exact: true })
          .click();
      }
      await page.waitForURL('**' + route);
      const hidden = await page.evaluate(() =>
        JSON.parse(sessionStorage.getItem('qa-home-hide')),
      );
      assert.equal(
        hidden.overlay,
        false,
        'Departure overlay must be removed before caching',
      );
      assert.equal(
        hidden.leaving,
        false,
        'Home copy must not be cached in its faded state',
      );
      await page.evaluate(() => history.back());
      await page.waitForURL(base + '/', { waitUntil: 'commit' });
      const shown = await page.evaluate(() =>
        JSON.parse(sessionStorage.getItem('qa-home-show')),
      );
      assert.equal(
        shown.overlay,
        false,
        'No overlay at the very start of pageshow',
      );
      assert.equal(shown.leaving, false);
      assert.equal(shown.opacity, '1');
      assert.equal(
        shown.menuOpen,
        false,
        'Do not restore an open navigation panel',
      );
      if (name === 'chromium')
        assert.equal(
          shown.persisted,
          true,
          'Exercise the actual back-forward cache',
        );
      // Return controls are usable immediately after restoration.
      await page.locator('[data-project-next]').click();
      assert.equal(
        await page
          .locator('[data-project-card="dispatch"]')
          .getAttribute('data-depth'),
        '0',
      );
      console.log(
        `${name} ${route}: clean pagehide and immediate history restoration (cached=${shown.persisted}).`,
      );
    }
  } finally {
    await browser.close();
  }
}
