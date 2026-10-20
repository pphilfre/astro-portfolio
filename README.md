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
- src/data/projects.ts defines the featured order: Markup, Dispatch, Waypoint, Glyph, Personal Portfolio and Home Lab.
- src/components/ProjectCollection.astro renders all six projects in the same grid, each with a distinct muted background.
- The home-page deck selects the first three projects from the same data; its existing interactions are retained.
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

`npm run test:menu` checks the menu in Edge/Chromium and WebKit, including 4× CPU
throttling in Chromium, interrupted transitions, rapid taps, keyboard access,
reduced motion, landscape scrolling and the no-JavaScript fallback. Install
WebKit with `npx playwright install webkit` when needed. It uses the same
`PREVIEW_URL` override as the other browser checks.

`npm run test:analytics` targets a production build at `PREVIEW_URL` (default
`http://127.0.0.1:4327`). It intercepts PostHog submissions and stubs Google's tag
locally. It checks pageviews, the pageleave handler, visitor/session continuity,
the GA measurement ID and loading after the page load event. Both trackers are
disabled in development. Visual checks block external analytics, and history QA
uses Google's opt-out flag so the back-forward cache can remain enabled.

`npm run test:back` checks history returns from a project and About in Chromium
and WebKit. Chromium's back-forward cache is explicitly enabled for this check.
The departure overlay and faded copy are cleared on `pagehide` before caching,
so returning home does not briefly restore the outgoing animation. Like the
analytics check, it defaults to the production preview on port 4327.

## Deployment and content

The existing Vercel adapter remains. vercel.json adds cache policies for generated assets,
credentials and the CV. Astro fingerprints generated assets for long-lived caching.
The CV uses revalidation so an updated download does not stay stale.

`npm run test:seo` checks the production HTML for unique titles/descriptions,
canonical and social metadata, valid person/website/article JSON-LD and agreement
between the sitemap and indexable pages. The empty CTF index stays accessible but
is excluded from search until write-ups are published.

The font and responsive WebP avatar use fingerprinted asset URLs with an
immutable one-year cache. Styles are inlined to remove render-blocking stylesheet
requests. Home-page screenshot candidates include small phone previews; full-size
case-study images remain available. PostHog retains pageview analytics but disables
unused replay, surveys, heatmaps and automatic interaction tracking. Its pinned
npm slim ESM asset is imported directly by an inline scheduler after load during
idle time, removing the separate loader request. It is fingerprinted and cacheable;
no PostHog CDN script is downloaded. Google Analytics (`G-WYYGVPXGPG`) is also enabled
at the owner's request, with its direct tag configured in the shared head and its
script loaded asynchronously after page load. Connection hints cover both providers.
Running both trackers necessarily adds Google's script and collection requests.
The pinned PostHog SDK's native-feature compatibility fallbacks remain upstream
code; this project does not rewrite vendor code to suppress a Lighthouse estimate.
The Markup hero
preview also uses a denser set of widths, viewport-height-aware size hints and
WebP quality 70; the full-size case-study originals are unchanged.

SEO metadata identifies Freddie Philpot consistently, links the existing GitHub
and LinkedIn profiles, and attributes published writing with real publication and
update dates. Search Console ownership is already configured by the owner. Submit
`https://freddiephilpot.dev/sitemap.xml` and request indexing of `/` and `/about`
there after deployment. GA is optional tracking and does not enable search indexing.

Legacy /projects/tools and /projects/markupproject redirect permanently to
/projects/markup. /projects is now the project collection; the infrastructure case
study is /projects/homelab. The placeholder CTF is a draft and has no published route.

public/cv.pdf matches the supplied current CV. Education, placement descriptions,
course dates and article corrections follow PORTFOLIO_AUDIT.md and the supplied CV.
Do not promote plans into completed achievements or add undocumented lab topology.

Project research, source revisions, imagery and verification limits for the October
2026 case-study update are recorded in PROJECT_CASE_STUDIES.md.

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
