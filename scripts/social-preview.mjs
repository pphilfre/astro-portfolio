import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4323';
const browser = await chromium.launch({
  headless: true,
  channel: process.platform === 'win32' ? 'msedge' : undefined,
});
const context = await browser.newContext();
const social = await context.newPage();
await social.setViewportSize({ width: 1200, height: 630 });
await social.setContent(
  (await fs.readFile('scripts/social-preview.html', 'utf8')).replaceAll(
    'http://127.0.0.1:4323',
    base,
  ),
);
await social.evaluate(() => document.fonts.ready);
await social.screenshot({ path: 'public/social.png' });
await social.close();

await browser.close();
