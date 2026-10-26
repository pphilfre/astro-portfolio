import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { chromium, webkit } from '@playwright/test';

// Exercise the shipped CSS, not Vite's unminified development styles.
const root = path.resolve('.vercel/output/static');
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};
const server = http.createServer(async (req, res) => {
  try {
    let file = path.resolve(
      root,
      '.' + new URL(req.url, 'http://localhost').pathname,
    );
    if (!file.startsWith(root + path.sep)) throw Error('Invalid path');
    if ((await fs.stat(file)).isDirectory())
      file = path.join(file, 'index.html');
    res.setHeader(
      'Content-Type',
      types[path.extname(file)] || 'application/octet-stream',
    );
    res.end(await fs.readFile(file));
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
await fs.mkdir('tmp/qa', { recursive: true });
const base = `http://127.0.0.1:${server.address().port}`;
const pixel = async (buffer, x, y) => [
  ...(await sharp(buffer)
    .extract({ left: Math.round(x), top: Math.round(y), width: 1, height: 1 })
    .removeAlpha()
    .raw()
    .toBuffer()),
];
try {
  for (const [name, engine, options] of [
    ['chromium', chromium, { channel: 'msedge' }],
    ['webkit', webkit, {}],
  ]) {
    const browser = await engine.launch(options);
    try {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        reducedMotion: 'no-preference',
      });
      await context.route(
        /posthog\.com|googletagmanager\.com|google-analytics\.com|challenges\.cloudflare\.com/,
        (r) => r.abort(),
      );
      const page = await context.newPage();
      for (const theme of ['light', 'dark']) {
        await page.goto(base + '/contact', { waitUntil: 'networkidle' });
        await page.evaluate(
          (t) =>
            document.documentElement.classList.toggle('dark', t === 'dark'),
          theme,
        );
        await page.evaluate(() => document.fonts.ready);
        const field = page.locator('#message');
        await page.locator('main h1').click();
        const box = await field.boundingBox();
        const clip = {
          x: Math.floor(box.x) - 3,
          y: Math.floor(box.y) - 3,
          width: Math.ceil(box.width) + 6,
          height: Math.ceil(box.height) + 6,
        };
        const before = await page.screenshot({ clip, animations: 'allow' });
        await field.click({ position: { x: 120, y: 50 } });
        await page.waitForTimeout(800);
        const after = await page.screenshot({
          clip,
          animations: 'allow',
          path: `tmp/qa/border-${name}-${theme}.png`,
        });
        assert.deepEqual(
          await pixel(after, box.width * 0.65 + 3, box.height * 0.6 + 3),
          await pixel(before, box.width * 0.65 + 3, box.height * 0.6 + 3),
          `${name}/${theme}: focus must not colour the input interior`,
        );
        const edge = await pixel(after, 1, box.height * 0.5 + 3);
        assert.ok(
          Math.max(...edge) - Math.min(...edge) > 12,
          `${name}/${theme}: animated colour remains at outside edge`,
        );
        await field.fill(
          'Text remains readable while the outside border moves.',
        );
        await page.locator('#name').focus();
        await page.keyboard.press('Tab');
        assert.equal(
          await page
            .locator('#email')
            .evaluate((el) => getComputedStyle(el).outlineStyle),
          'none',
          `${name}: no duplicate keyboard outline`,
        );
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(
          await page.evaluate(
            () =>
              document
                .getAnimations()
                .filter(
                  (a) =>
                    a.animationName === 'aura-orbit' &&
                    a.playState === 'running',
                ).length,
          ),
          0,
        );
        await page.emulateMedia({ reducedMotion: 'no-preference' });
      }
      await context.close();
      console.log(
        `${name}: production gradient stays outside the field in light/dark themes; keyboard and reduced motion passed.`,
      );
    } finally {
      await browser.close();
    }
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
}
