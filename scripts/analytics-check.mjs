import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { gunzipSync } from 'node:zlib';

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4327';
const browser = await chromium.launch({
  headless: true,
  channel: process.platform === 'win32' ? 'msedge' : undefined,
});
try {
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36',
  });
  // PostHog intentionally filters automated browsers. Bypass this only in QA.
  await context.addInitScript(() =>
    Object.defineProperty(navigator, 'webdriver', { get: () => false }),
  );
  const events = [];
  const externalScripts = [];
  await context.route('https://us.i.posthog.com/**', async (route) => {
    const request = route.request();
    const data = request.postDataBuffer();
    if (data) {
      let body;
      if (data[0] === 0x1f && data[1] === 0x8b)
        body = JSON.parse(gunzipSync(data).toString());
      else {
        try {
          body = JSON.parse(data.toString());
        } catch {
          body = JSON.parse(
            Buffer.from(
              new URLSearchParams(data.toString()).get('data'),
              'base64',
            ).toString(),
          );
        }
      }
      events.push(...(Array.isArray(body) ? body : body.batch || [body]));
    }
    await route.fulfill({ json: { status: 1 } });
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('request', (r) => {
    if (
      r.resourceType() === 'script' &&
      new URL(r.url()).origin !== new URL(base).origin
    )
      externalScripts.push(r.url());
  });
  await page.goto(base);
  await page.waitForFunction(() => window.posthog?.__loaded);
  await page.waitForTimeout(100);
  const first = events.filter((e) => e.event === '$pageview');
  assert.equal(first.length, 1, 'Exactly one initial pageview is captured');
  assert.equal(first[0].properties.$pathname, '/');
  const identity = await page.evaluate(() => ({
    visitor: window.posthog.get_distinct_id(),
    session: window.posthog.get_session_id(),
  }));
  assert.ok(identity.visitor);
  assert.ok(identity.session);
  // Exercise the real unload handler while the document is alive so Playwright
  // can intercept its beacon before navigation destroys the request's frame.
  await page.evaluate(() =>
    window.dispatchEvent(new PageTransitionEvent('pagehide')),
  );
  await page.waitForTimeout(100);
  await page.goto(base + '/about');
  await page.waitForFunction(() => window.posthog?.__loaded);
  await page.waitForTimeout(100);
  const views = events.filter((e) => e.event === '$pageview');
  assert.equal(views.length, 2);
  assert.equal(views[1].properties.$pathname, '/about');
  assert.deepEqual(
    await page.evaluate(() => ({
      visitor: window.posthog.get_distinct_id(),
      session: window.posthog.get_session_id(),
    })),
    identity,
    'Visitor identity and session survive navigation',
  );
  assert.ok(
    events.some((e) => e.event === '$pageleave'),
    'Pageleave still records visit duration',
  );
  assert.deepEqual(
    externalScripts,
    [],
    'Analytics must not download any third-party scripts',
  );
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify(
      {
        pageviews: views.length,
        pageleave: events.some((e) => e.event === '$pageleave'),
        identityPreserved: true,
        externalScripts: externalScripts.length,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
