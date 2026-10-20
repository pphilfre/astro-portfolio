import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';
import { checkMenu } from './menu-check.mjs';

// Exercise the production build with its generated CSP HTTP headers, rather
// than the development server (where Astro intentionally disables CSP).
const root = path.resolve('.vercel/output/static');
const output = JSON.parse(
  await fs.readFile('.vercel/output/config.json', 'utf8'),
);
const config = JSON.parse(await fs.readFile('vercel.json', 'utf8'));
const policies = output.routes.filter(
  (r) => r.headers?.['content-security-policy'],
);
assert.ok(policies.length >= 20, 'Every prerendered page needs a CSP header');
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

for (const { src, headers } of policies) {
  const csp = headers['content-security-policy'];
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /script-src-attr 'none'/);
  const scripts = csp
    .split(';')
    .find((d) => d.trim().startsWith('script-src '));
  assert.ok(
    !scripts.includes('unsafe-inline') && !scripts.includes('unsafe-eval'),
  );
  const file =
    src === '/404' ? '404.html' : path.join(src.slice(1), 'index.html');
  const html = await fs.readFile(path.join(root, file), 'utf8');
  for (const [, attributes, body] of html.matchAll(
    /<script\b([^>]*)>([\s\S]*?)<\/script>/g,
  )) {
    if (/\bsrc=/.test(attributes) || !body.trim()) continue;
    const hash = createHash('sha256').update(body).digest('base64');
    assert.ok(
      csp.includes(`'sha256-${hash}'`),
      `Inline script authorized on ${src}`,
    );
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  for (const { key, value } of config.headers[0].headers)
    res.setHeader(key, value);
  const pathname = url.pathname.replace(/\/$/, '') || '/';
  const policy = policies.find((r) => r.src === pathname);
  if (policy)
    res.setHeader(
      'Content-Security-Policy',
      // This preview uses HTTP. WebKit upgrades even loopback subresources
      // to HTTPS; production already serves HTTPS. Exercise every other
      // directive unchanged here and verify the full header after deployment.
      policy.headers['content-security-policy'].replace(
        'upgrade-insecure-requests;',
        '',
      ),
    );
  try {
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + path.sep))
      throw Error('Invalid path');
    if ((await fs.stat(file)).isDirectory())
      file = path.join(file, 'index.html');
    res.setHeader(
      'Content-Type',
      types[path.extname(file)] || 'application/octet-stream',
    );
    res.end(await fs.readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(await fs.readFile(path.join(root, '404.html')));
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({
  headless: true,
  channel: process.platform === 'win32' ? 'msedge' : undefined,
});
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  await context.addInitScript(() => {
    window.cspViolations = [];
    document.addEventListener('securitypolicyviolation', (e) =>
      window.cspViolations.push({
        directive: e.effectiveDirective,
        blocked: e.blockedURI,
      }),
    );
  });
  await context.route(/googletagmanager\.com\/gtag\/js/, (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: 'window.googleTagAllowed=true;',
    }),
  );
  await context.route(/google-analytics\.com|us\.i\.posthog\.com/, (route) =>
    route.fulfill({ status: 204 }),
  );
  await context.route(/challenges\.cloudflare\.com/, (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: "window.turnstile={render:(el,opts)=>{opts.callback('mock-token');return 'mock-id'},reset:()=>{},remove:()=>{}};",
    }),
  );
  await context.route('**/api/contact', (route) =>
    route.fulfill({ json: { ok: true } }),
  );
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const { src } of policies) {
    const response = await page.goto(base + src);
    assert.ok(response.headers()['content-security-policy']);
    await page.waitForTimeout(150);
    assert.deepEqual(await page.evaluate(() => window.cspViolations), [], src);
    assert.ok(await page.locator('h1').count(), `Content rendered on ${src}`);
  }
  await checkMenu(page, base);
  await page.goto(base + '/contact');
  await page.locator('#name').fill('Security browser test');
  await page.locator('#email').fill('test@example.com');
  await page
    .locator('#message')
    .fill('A mocked contact submission, never delivered.');
  await page.getByRole('button', { name: /send message/i }).click();
  await page.getByText(/message sent/i).waitFor();
  await page.waitForFunction(() => window.googleTagAllowed === true);
  assert.deepEqual(await page.evaluate(() => window.cspViolations), []);
  assert.deepEqual(errors, []);
  await page.evaluate(() => {
    const script = document.createElement('script');
    script.textContent = 'window.untrustedScriptExecuted=true';
    document.body.append(script);
    const button = document.createElement('button');
    button.setAttribute('onclick', 'window.untrustedHandlerExecuted=true');
    document.body.append(button);
    button.click();
  });
  assert.equal(
    await page.evaluate(() =>
      Boolean(
        window.untrustedScriptExecuted || window.untrustedHandlerExecuted,
      ),
    ),
    false,
  );
  assert.ok((await page.evaluate(() => window.cspViolations)).length >= 2);
  console.log(
    `${policies.length} page policies verified; menu, contact hydration/submission and Google tag passed; injected scripts and event handlers blocked.`,
  );
  for (const script of ['analytics-check.mjs', 'back-navigation-check.mjs']) {
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [path.join('scripts', script)], {
        env: { ...process.env, PREVIEW_URL: base },
        stdio: 'inherit',
      });
      child.on('error', reject);
      child.on('exit', (code) =>
        code === 0 ? resolve() : reject(Error(`${script} exited ${code}`)),
      );
    });
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
