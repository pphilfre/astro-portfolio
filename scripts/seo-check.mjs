import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('.vercel/output/static');
const htmlFiles = [];
async function walk(folder) {
  for (const entry of await fs.readdir(folder, { withFileTypes: true })) {
    const p = path.join(folder, entry.name);
    if (entry.isDirectory()) await walk(p);
    else if (entry.name.endsWith('.html')) htmlFiles.push(p);
  }
}
await walk(root);
const titles = new Set(),
  descriptions = new Set(),
  indexed = [];
for (const file of htmlFiles) {
  const html = await fs.readFile(file, 'utf8');
  const get = (pattern) => html.match(pattern)?.[1];
  const title = get(/<title>(.*?)<\/title>/s);
  assert.ok(title?.includes('Freddie Philpot'), file + ' title');
  assert.equal(
    (title.match(/Freddie Philpot/g) || []).length,
    1,
    file + ' duplicate name in title',
  );
  const description = get(/<meta name="description" content="([^"]*)"/);
  assert.ok(description?.length > 40, file + ' description');
  const canonical = get(/<link rel="canonical" href="([^"]*)"/);
  assert.ok(canonical?.startsWith('https://freddiephilpot.dev/'));
  assert.ok(!canonical.includes('?'));
  assert.equal(get(/<meta property="og:title" content="([^"]*)"/), title);
  if (/<meta name="robots" content="noindex"/.test(html)) continue;
  assert.ok(title.length >= 30, file + ' descriptive title');
  assert.match(html, /<html[^>]*lang="en-GB"/);
  assert.match(
    html,
    /rel="apple-touch-icon"[^>]*href="\/apple-touch-icon.png"/,
  );
  assert.match(html, /rel="stylesheet"[^>]*href="\/_astro\//);
  for (const [, css] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g))
    assert.ok(css.length < 5000, file + ' no large inline stylesheet');
  assert.ok(!titles.has(title), file + ' duplicate title');
  titles.add(title);
  assert.ok(!descriptions.has(description), file + ' duplicate description');
  descriptions.add(description);
  const graph = JSON.parse(
    get(/<script type="application\/ld\+json">(.*?)<\/script>/s),
  )['@graph'];
  assert.equal(
    graph.find((n) => n['@type'] === 'Person').name,
    'Freddie Philpot',
  );
  assert.equal(
    graph.find((n) => n['@type'] === 'WebSite').name,
    'Freddie Philpot',
  );
  assert.equal(
    graph.find((n) => n['@type'] === 'WebSite').publisher['@id'],
    'https://freddiephilpot.dev/#person',
  );
  assert.ok(
    graph
      .find((n) => n['@type'] === 'Person')
      .image.endsWith('/apple-touch-icon.png'),
  );
  if (canonical.endsWith('/about'))
    assert.ok(graph.find((n) => n['@type'] === 'ProfilePage'));
  if (canonical.includes('/blog/')) {
    const article = graph.find((n) => n['@type'] === 'BlogPosting');
    assert.ok(article?.datePublished);
    assert.equal(article.author['@id'], 'https://freddiephilpot.dev/#person');
  }
  indexed.push(canonical);
}
const sitemap = await fs.readFile(path.join(root, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.deepEqual(
  locations.sort(),
  indexed.sort(),
  'Sitemap must contain exactly the indexable public pages',
);
const robots = await fs.readFile(path.join(root, 'robots.txt'), 'utf8');
assert.match(robots, /Allow: \//);
assert.match(robots, /Sitemap: https:\/\/freddiephilpot.dev\/sitemap.xml/);
const home = await fs.readFile(path.join(root, 'index.html'), 'utf8');
assert.match(home, /26 October 2026/);
assert.match(sitemap, /<lastmod>2026-10-26/);
const llms = await fs.readFile(path.join(root, 'llms.txt'), 'utf8');
assert.match(llms, /^# Freddie Philpot/);
assert.match(llms, /https:\/\/freddiephilpot.dev\/projects\/dispatch/);
await fs.access(path.join(root, 'apple-touch-icon.png'));
const headers = JSON.parse(await fs.readFile('vercel.json', 'utf8')).headers[0]
  .headers;
assert.equal(headers.find((h) => h.key === 'Content-Language').value, 'en-GB');
assert.match(
  headers.find((h) => h.key === 'Permissions-Policy').value,
  /camera=\(\), microphone=\(\)/,
);
assert.ok(
  !headers.some(
    (h) =>
      h.key.toLowerCase() === 'access-control-allow-origin' && h.value === '*',
  ),
);
assert.match(home, /I’m Freddie Philpot/);
assert.match(home, /<link rel="preconnect" href="https:\/\/us.i.posthog.com"/);
console.log(
  `${indexed.length} indexable pages: unique titles/descriptions, canonical URLs, social metadata, valid identity/article JSON-LD, robots and sitemap passed.`,
);
