import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
export const prerender = true;
export const GET: APIRoute = async () => {
  const pages = [
    '',
    'about',
    'projects',
    'projects/glyph',
    'projects/markup',
    'projects/homelab',
    'projects/ctf',
    'certifications',
    'blog',
    'contact',
  ];
  const blog = await getCollection('blog', ({ data }) => !data.draft);
  const ctf = await getCollection('ctf', ({ data }) => !data.draft);
  const routes = [
    ...pages,
    ...blog.map((entry) => 'blog/' + entry.id),
    ...ctf.map((entry) => 'ctf/' + entry.id),
  ];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    routes
      .map(
        (route) =>
          '<url><loc>https://freddiephilpot.dev/' + route + '</loc></url>',
      )
      .join('') +
    '</urlset>';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
