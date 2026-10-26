import { checkMenu } from './menu-check.mjs';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4323';
const output = 'tmp/qa';
await fs.mkdir(output, { recursive: true });
const routes = [
  '/',
  '/projects',
  '/projects/glyph',
  '/projects/arc',
  '/projects/markup',
  '/projects/dispatch',
  '/projects/waypoint',
  '/projects/portfolio',
  '/projects/homelab',
  '/about',
  '/certifications',
  '/blog',
  '/contact',
  '/projects/ctf',
  '/404',
  '/blog/building-my-home-lab',
  '/blog/cloud-hosting-oracle-free-tier',
  '/blog/enterprise-security-experience',
  '/blog/pihole-dns-filtering',
  '/blog/setting-up-tailscale-vpn',
  '/blog/zero-trust-with-twingate',
];
const widths = [
  320, 375, 390, 430, 600, 700, 701, 768, 900, 1000, 1024, 1100, 1280, 1440,
  1920,
];
const browser = await chromium.launch({
  headless: true,
  channel:
    process.env.BROWSER_CHANNEL ||
    (process.platform === 'win32' ? 'msedge' : undefined),
});
const context = await browser.newContext({ reducedMotion: 'reduce' });
// External services are not part of the local visual regression run.
await context.route(
  /challenges\.cloudflare\.com|posthog\.com|googletagmanager\.com|google-analytics\.com/,
  (route) => route.abort(),
);
const page = await context.newPage();
const setTheme = async (theme) => {
  await page.locator('.theme-menu summary').click();
  await page
    .getByRole('button', { name: 'Use ' + theme + ' theme', exact: true })
    .click();
};
const localLinks = new Set();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const report = { checks: [], accessibility: [], errors, interactions: [] };
try {
  for (const route of routes) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(base + route, {
      waitUntil: 'networkidle',
    });
    assert.equal(response.status(), route === '/404' ? 404 : 200, route);
    await page.evaluate(() => document.fonts.ready);
    // Full-page screenshots must include cards that start below the viewport.
    await page.locator('img[loading="lazy"]').evaluateAll((images) =>
      images.forEach((image) => {
        image.loading = 'eager';
      }),
    );
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((items) => items.map((a) => a.getAttribute('href'))))
      localLinks.add(href);
    await page.addStyleTag({
      content: 'astro-dev-toolbar{display:none!important}',
    });
    assert.equal(
      await page.locator('#main h1').count(),
      1,
      route + ' should have one h1',
    );
    assert.equal(
      await page.locator('body .site-frame > main').count(),
      1,
      route + ' should have one main',
    );
    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.waitForFunction(() =>
        [...document.images]
          .filter((image) => image.getBoundingClientRect().height > 0)
          .every((image) => image.complete),
      );
      const geometry = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
        brokenImages: [...document.images]
          .filter(
            (i) =>
              i.getBoundingClientRect().height > 0 &&
              i.complete &&
              !i.naturalWidth,
          )
          .map((i) => i.src),
        clipped: [...document.querySelectorAll('h1,h2,h3,p,button,select')]
          .filter(
            (el) =>
              el.getBoundingClientRect().width > 0 &&
              el.scrollWidth > el.clientWidth + 2,
          )
          .map((el) => el.textContent.slice(0, 70)),
      }));
      report.checks.push({ route, width, ...geometry });
      assert.ok(
        geometry.content <= geometry.viewport,
        route + ' overflows at ' + width,
      );
      assert.deepEqual(geometry.brokenImages, [], route + ' broken images');
      if ([375, 1000, 1440].includes(width)) {
        await page.screenshot({
          path:
            output +
            '/' +
            (route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')) +
            '-' +
            width +
            '.png',
          fullPage: true,
        });
      }
    }
    for (const theme of ['light', 'dark']) {
      await page.setViewportSize({
        width: theme === 'light' ? 1440 : 390,
        height: 1000,
      });
      await setTheme(theme);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      report.accessibility.push({
        route,
        theme,
        violations: result.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      });
      if (
        theme === 'dark' &&
        [
          '/',
          '/about',
          '/projects/markup',
          '/blog/setting-up-tailscale-vpn',
        ].includes(route)
      )
        await page.screenshot({
          path:
            output +
            '/' +
            (route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')) +
            '-dark.png',
          fullPage: true,
        });
    }
    await setTheme('light');
    console.log(
      'Checked ' + route + ' at ' + widths.length + ' widths and both themes.',
    );
  }
  // The shared header retains the same links, dot, frame and theme control.
  const headerStates = [];
  for (const route of ['/', '/projects', '/about']) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base + route);
    assert.equal(await page.locator('.mobile-menu').isVisible(), false);
    assert.ok(await page.locator('.brand-avatar').isVisible());
    headerStates.push(
      await page.evaluate(() => {
        const active = document.querySelector('.desktop-nav a[aria-current]');
        const dot = getComputedStyle(active, '::before');
        const trigger = getComputedStyle(
          document.querySelector('.theme-menu summary'),
        );
        return {
          links: [...document.querySelectorAll('.desktop-nav a')].map(
            (link) => [link.getAttribute('href'), link.textContent.trim()],
          ),
          dot: [dot.width, dot.height, dot.borderRadius],
          theme: [trigger.width, trigger.height, trigger.borderRadius],
          frame: getComputedStyle(document.body).backgroundColor,
          navbar: document
            .querySelector('.desktop-nav')
            .getBoundingClientRect()
            .toJSON(),
          linkPositions: [...document.querySelectorAll('.desktop-nav a')].map(
            (link) => link.getBoundingClientRect().toJSON(),
          ),
        };
      }),
    );
    for (const width of [320, 390, 768, 844]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.locator('.desktop-nav').isVisible(), false);
      assert.ok(await page.locator('.mobile-menu').isVisible());
      const fits = await page.evaluate(() => {
        const brand = document.querySelector('.brand').getBoundingClientRect();
        const actions = document
          .querySelector('.header-actions')
          .getBoundingClientRect();
        return (
          brand.right <= actions.left &&
          actions.right < innerWidth &&
          brand.left > 0
        );
      });
      assert.ok(fits, `${route} ${width} header fits`);
    }
  }
  assert.deepEqual(headerStates[1], headerStates[0]);
  assert.deepEqual(headerStates[2], headerStates[0]);
  // Menu utilities remain available across navigation, with home-only warmth.
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', '/projects', '/about']) {
    await page.goto(base + route);
    await page.addStyleTag({
      content: 'astro-dev-toolbar{display:none!important}',
    });
    for (const theme of ['light', 'dark']) {
      await setTheme(theme);
      await page.locator('.mobile-menu summary').click();
      assert.ok(
        await page
          .locator('.menu-utilities a[href="https://github.com/pphilfre"]')
          .isVisible(),
      );
      assert.ok(
        await page
          .locator('.menu-utilities a[href="/cv.pdf"]')
          .getAttribute('download'),
      );
      assert.equal(
        await page
          .locator('.menu-icon')
          .evaluate((el) => getComputedStyle(el).transform),
        'none',
      );
      const highlight = await page
        .locator('.menu-pages a[aria-current]')
        .evaluate((el) => getComputedStyle(el).backgroundImage);
      assert.equal(highlight.includes('linear-gradient'), route === '/');
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      assert.deepEqual(
        result.violations.map((v) => v.id),
        [],
        `${route} ${theme} open navigation`,
      );
      await page.keyboard.press('Escape');
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + '/projects');
  const projectCards = await page.locator('.project-link').evaluateAll((els) =>
    els.map((el) => ({
      href: el.getAttribute('href'),
      width: el.getBoundingClientRect().width,
      artHeight: el.querySelector('.project-art').getBoundingClientRect()
        .height,
    })),
  );
  assert.deepEqual(
    projectCards.map((card) => card.href),
    [
      '/projects/markup',
      '/projects/dispatch',
      '/projects/waypoint',
      '/projects/glyph',
      '/projects/portfolio',
      '/projects/homelab',
    ],
  );
  assert.equal(await page.locator('.project-collection').count(), 1);
  assert.equal(await page.locator('.homelab-project').count(), 1);
  assert.equal(await page.locator('.lab-dot').count(), 0);
  const cardColours = await page
    .locator('.project-art')
    .evaluateAll((cards) =>
      cards.map((card) => getComputedStyle(card).backgroundColor),
    );
  assert.equal(
    new Set(cardColours).size,
    6,
    'Each card has its own background',
  );
  const lab = projectCards.find((card) => card.href === '/projects/homelab');
  assert.equal(lab.width, projectCards[0].width);
  assert.equal(lab.artHeight, projectCards[0].artHeight);
  report.interactions.push(
    'Requested project order, Home Lab in the shared grid, six distinct backgrounds, no status dot and equal card dimensions',
  );
  for (const project of [
    'dispatch',
    'waypoint',
    'glyph',
    'portfolio',
    'homelab',
  ]) {
    await page.goto(base + '/projects/' + project);
    const imageLinks = page.locator('.case-image-link');
    assert.ok(await imageLinks.count(), project + ' full-size images');
    for (const href of await imageLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')),
    )) {
      assert.ok(
        (await context.request.get(base + href)).ok(),
        href + ' full-size source',
      );
    }
  }
  report.interactions.push(
    'Case-study images link to their full-size source assets',
  );
  await checkMenu(page, base);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  report.interactions.push(
    'Smooth menu growth, frame-continuous reversals, rapid taps and landscape scrolling',
  );
  // Keyboard disclosure and focus restoration.
  await page.goto(base + '/');
  await page.setViewportSize({ width: 375, height: 844 });
  await page.locator('.mobile-menu summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.mobile-menu').getAttribute('open'), '');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.mobile-menu').getAttribute('open'), null);
  assert.equal(
    await page.evaluate(() => document.activeElement?.tagName),
    'SUMMARY',
  );
  await setTheme('dark');
  await page.reload();
  assert.ok(
    await page.locator('html').evaluate((el) => el.classList.contains('dark')),
  );
  report.interactions.push(
    'Mobile menu Enter/Escape, focus restoration, theme persistence',
  );
  // Icon menu surfaces and system preference updates.
  for (const theme of ['light', 'dark']) {
    await setTheme(theme);
    await page.locator('.theme-menu summary').focus();
    await page.keyboard.press('Enter');
    assert.ok(
      await page.getByRole('button', { name: 'Use system theme' }).isVisible(),
    );
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    assert.deepEqual(
      result.violations.map((v) => v.id),
      [],
      'Open theme menu accessibility',
    );
    const colours = await page.locator('.theme-options').evaluate((el) => ({
      popup: getComputedStyle(el).backgroundColor,
      page: getComputedStyle(document.body).getPropertyValue('--canvas').trim(),
    }));
    assert.equal(
      colours.popup,
      await page.evaluate((colour) => {
        const sample = document.createElement('span');
        sample.style.color = colour;
        document.body.append(sample);
        const normalized = getComputedStyle(sample).color;
        sample.remove();
        return normalized;
      }, colours.page),
      'Theme popup follows page background',
    );
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.theme-menu').getAttribute('open'), null);
  }
  await setTheme('system');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForFunction(() =>
    document.documentElement.classList.contains('dark'),
  );
  await page.emulateMedia({ colorScheme: 'light' });
  await page.waitForFunction(
    () => !document.documentElement.classList.contains('dark'),
  );
  report.interactions.push(
    'Theme icon menu keyboard access, themed surfaces, accessibility and automatic system preference updates',
  );
  // Filter results and empty state.
  await page.goto(base + '/blog');
  await page.locator('#post-search').fill('no-such-post');
  assert.equal(await page.locator('[data-post]:visible').count(), 0);
  assert.ok(await page.locator('#no-posts').isVisible());
  await page.locator('#post-search').fill('');
  await page.getByRole('button', { name: 'Networking', exact: true }).click();
  assert.equal(await page.locator('[data-post]:visible').count(), 3);
  report.interactions.push(
    'Writing search, topic filtering and empty-state feedback',
  );
  // Manual gallery and no autoplay.
  await page.goto(base + '/projects/markup');
  await page
    .getByRole('button', { name: 'Show screenshot 3', exact: true })
    .click();
  assert.equal(await page.locator('[data-slide]:visible').count(), 1);
  assert.equal(
    await page.locator('[data-slide-button="2"]').getAttribute('aria-pressed'),
    'true',
  );
  assert.equal(
    await page.locator('#gallery-status').textContent(),
    'PDF annotation · 3 of 5',
  );
  report.interactions.push('Manual gallery selection and live status');
  // Aliases and unpublished content.
  for (const route of ['/projects/tools', '/projects/markupproject']) {
    const response = await context.request.get(base + route, {
      maxRedirects: 0,
    });
    assert.equal(response.status(), 301);
    assert.equal(response.headers().location, '/projects/markup');
  }
  assert.equal(
    (await context.request.get(base + '/ctf/example-challenge')).status(),
    404,
  );
  const sitemap = await (
    await context.request.get(base + '/sitemap.xml')
  ).text();
  assert.ok(sitemap.includes('/projects/glyph'));
  for (const project of ['dispatch', 'waypoint', 'portfolio']) {
    assert.ok(sitemap.includes('/projects/' + project));
  }
  assert.ok(!sitemap.includes('example-challenge'));
  report.interactions.push(
    'Legacy 301 redirects, unpublished CTF 404 and generated sitemap',
  );
  for (const href of localLinks) {
    const response = await context.request.get(base + href);
    assert.ok(response.ok(), href + ' is broken');
  }
  report.interactions.push('Every internal page and asset link resolves');
  // API tests deliberately avoid delivering email.
  for (const [data, headers, status] of [
    ['{', { 'Content-Type': 'application/json' }, 400],
    [JSON.stringify({ name: 1 }), { 'Content-Type': 'application/json' }, 400],
    ['hello', { 'Content-Type': 'text/plain' }, 415],
    ['x'.repeat(20001), { 'Content-Type': 'application/json' }, 413],
  ]) {
    const response = await context.request.post(base + '/api/contact', {
      data,
      headers: { ...headers, Origin: base },
    });
    assert.equal(response.status(), status);
    assert.equal(response.headers()['cache-control'], 'no-store');
  }
  report.interactions.push(
    'API rejects malformed, incorrectly typed and oversized requests',
  );
  // Stub CAPTCHA and email transport to test form UX without external effects.
  await context.unroute(/challenges\.cloudflare\.com|posthog\.com/);
  await context.route(/challenges\.cloudflare\.com/, (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: "window.turnstile={render:(el,opts)=>{window.testCaptcha=opts;opts.callback('mock-token');return 'mock-id'},reset:()=>{window.testReset=true},remove:()=>{}};",
    }),
  );
  await context.route('**/api/contact', (route) =>
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    }),
  );
  await page.goto(base + '/contact', { waitUntil: 'networkidle' });
  await page.locator('#name').fill('Local browser test');
  await page.locator('#email').fill('test@example.com');
  await page
    .locator('#message')
    .fill('This is a mocked local test, never delivered.');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await page.getByRole('status').filter({ hasText: 'Message sent.' }).waitFor();
  assert.equal(await page.locator('#name').inputValue(), '');
  assert.ok(await page.evaluate(() => window.testReset === true));
  assert.ok(
    await page
      .getByRole('button', { name: 'Send message', exact: true })
      .isDisabled(),
  );
  report.interactions.push(
    'Mocked form success persists, clears fields and resets CAPTCHA',
  );
  await page.evaluate(() => window.testCaptcha.callback('second-mock-token'));
  await page.locator('#name').fill('Retain this name');
  await page.locator('#email').fill('test@example.com');
  await page
    .locator('#message')
    .fill('Keep this message after a simulated failure.');
  await context.unroute('**/api/contact');
  await context.route('**/api/contact', (route) =>
    route.fulfill({
      status: 502,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'Simulated delivery failure. Please use email.',
      }),
    }),
  );
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await page
    .getByRole('status')
    .filter({ hasText: 'Simulated delivery failure.' })
    .waitFor();
  assert.equal(await page.locator('#name').inputValue(), 'Retain this name');
  await page.evaluate(() => {
    window.testCaptcha.callback('third-mock-token');
    window.testCaptcha['expired-callback']();
  });
  assert.ok(
    await page
      .getByRole('button', { name: 'Send message', exact: true })
      .isDisabled(),
  );
  report.interactions.push(
    'Mocked delivery errors retain content and expired CAPTCHA disables sending',
  );

  assert.deepEqual(errors, [], 'Browser errors');
  await fs.writeFile(output + '/report.json', JSON.stringify(report, null, 2));
  const violations = report.accessibility.flatMap((r) =>
    r.violations.map((v) => ({ route: r.route, theme: r.theme, ...v })),
  );
  console.log(
    JSON.stringify(
      {
        routeWidthChecks: report.checks.length,
        accessibilityChecks: report.accessibility.length,
        violations,
        interactions: report.interactions,
      },
      null,
      2,
    ),
  );
  if (violations.length) process.exitCode = 1;
} finally {
  await fs.writeFile(output + '/report.json', JSON.stringify(report, null, 2));
  await browser.close();
}
