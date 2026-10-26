import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { pageUpdates } from '../data/updates';
export const prerender = true;
export const GET: APIRoute = async () => {
  const pages = [
    '',
    'about',
    'projects',
    'projects/glyph',
    'projects/arc',
    'projects/markup',
    'projects/dispatch',
    'projects/waypoint',
    'projects/portfolio',
    'projects/homelab',
    'certifications',
    'blog',
    'contact',
  ];
  const blog = await getCollection('blog', ({ data }) => !data.draft);
  const ctf = await getCollection('ctf', ({ data }) => !data.draft);
  const routes = [
    ...pages,
    ...(ctf.length ? ['projects/ctf'] : []),
    ...blog.map((entry) => 'blog/' + entry.id),
    ...ctf.map((entry) => 'ctf/' + entry.id),
  ];
  const modified = new Map(
    Object.entries(pageUpdates).map(([route, date]) => [route.slice(1), date]),
  );
  for (const entry of blog)
    modified.set(
      'blog/' + entry.id,
      (entry.data.updatedDate || entry.data.pubDate).toISOString(),
    );
  for (const entry of ctf)
    modified.set(
      'ctf/' + entry.id,
      (entry.data.updatedDate || entry.data.pubDate).toISOString(),
    );
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    routes
      .map(
        (route) =>
          '<url><loc>https://freddiephilpot.dev/' +
          route +
          '</loc>' +
          (modified.has(route)
            ? '<lastmod>' + modified.get(route) + '</lastmod>'
            : '') +
          '</url>',
      )
      .join('') +
    '</urlset>';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
