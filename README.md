# Freddie Philpot — portfolio

A portfolio for my applications, home lab, work experience and technical writing.

## Development

Requires Node.js 22.12 or newer. Use npm and the committed package-lock.json.

    npm ci
    npm run dev
    npm run check
    npm test
    npm run build

There was no standalone lint command in the original project. Astro check validates the
Astro/TypeScript source; the build validates generated pages and assets.

## Structure

- Astro prerenders every public content page. The contact endpoint and two legacy redirects run on Vercel.
- Shared metadata, theme initialisation, navigation and footer live in src/layouts/main.astro.
- The global CSS defines the palette, type scale, responsive layouts and reduced-motion behaviour.
- Satoshi is self-hosted as one variable WOFF2; its licence is included in public/fonts.
- src/components/ProjectCollection.astro presents Glyph, Markup and the home lab.
- Astro Image produces responsive WebP versions of the existing Markup screenshots.
- Blog and CTF Markdown live in src/content. Drafts are excluded from routes, indexes and the generated sitemap.
- React hydrates only the contact form, when visible. Navigation, filters and the gallery use small native scripts.
- The existing PostHog integration is centralised and deferred until after load, only in production.

## Contact

Copy .env.example to .env and configure RESEND_API_KEY, TURNSTILE_SECRET_KEY and
optionally CONTACT_EMAIL. The public Turnstile site key is in ContactForm.tsx;
its domain configuration must allow the deployment.

Incoming JSON is validated for types, email shape and length limits. Messages are
sent as plain text after server-side Turnstile verification. Responses are never cached.
The direct email address remains available when JavaScript or verification is unavailable.

## Browser checks

    npm run dev -- --host 127.0.0.1 --port 4323
    npm run test:browser

The browser script uses installed Edge on Windows or Playwright Chromium elsewhere.
Install Chromium with npx playwright install chromium when needed. PREVIEW_URL and
BROWSER_CHANNEL override the defaults.

Checks cover all public page layouts at 375, 390, 430, 768, 1024, 1440 and 1920px,
light/dark accessibility, heading structure, overflow, images, keyboard navigation,
search, gallery, redirects and API rejection paths. Successful form submission uses
mocked CAPTCHA and email responses; the test never sends a real message.

Screenshots and the JSON report are written to ignored tmp/qa. Browser checks require
a local preview, not the live site. npm test covers the pure contact validation rules.

## Deployment and content

The existing Vercel adapter remains. vercel.json adds cache policies for fonts,
credentials and the CV. Astro fingerprints generated assets for long-lived caching.
The CV uses revalidation so an updated download does not stay stale.

Legacy /projects/tools and /projects/markupproject redirect permanently to
/projects/markup. /projects is now the project collection; the infrastructure case
study is /projects/homelab. The placeholder CTF is a draft and has no published route.

public/cv.pdf matches the supplied current CV. Education, placement descriptions,
course dates and article corrections follow PORTFOLIO_AUDIT.md and the supplied CV.
Do not promote plans into completed achievements or add undocumented lab topology.

The pre-existing edited HomelabBento.tsx and its Radix sheet foundation are retained
but are not imported by any public page. Both package manifests and locks are updated by npm for the redesigned dependency set;
npm is the supported install workflow.

## Dependency advisory

Astro and its integrations were updated to Astro 7.3.5, React integration 7.0.0 and
Vercel adapter 11.0.11 during the redesign. The major upgrade was checked against
the official Astro v7 migration guide and verified by the build and browser checks.

As of 3 October 2026, npm audit reports three high-severity entries stemming from
one underlying http-cache-semantics advisory (GHSA-ch52-4w7c-c8xp), including its
Astro and adapter dependency chains. The advisory lists no patched version:
https://github.com/advisories/GHSA-ch52-4w7c-c8xp

This site prerenders public content, uses local project images, and explicitly
disables caching for contact responses. No authenticated response cache is
configured. Do not apply npm audit's suggested downgrade to obsolete Astro versions
as a remediation. Recheck the advisory when a supported fix becomes available.
