# Portfolio redesign

Implemented 3 October 2026.

## Design and route coverage

A shared Satoshi type system, blue project stage, neutral light/dark palettes and
consistent spacing replace the repeated bento layouts. The homepage uses the
existing Markup image and a typographic Glyph illustration; there is no fabricated
Glyph application screenshot.

Updated routes: /, /about, /certifications, /contact, /blog and all six articles,
/projects, /projects/markup, /projects/ctf and /404. Added /projects/glyph and
/projects/homelab. Both old Markup URLs permanently redirect to /projects/markup.
The sample CTF is a draft and its URL returns 404.

Mobile uses a named 76px header with 44px controls, a composed project hero,
full-width project previews, a vertical timeline, compact credential rows and
single-column forms. The gallery is manual, with named views and full-size links.

Motion uses 120–220ms feedback, one short homepage entrance and native page
transitions in supporting browsers. Reduced-motion preference disables animation
and smooth scrolling. No permission-dependent haptic workaround was added.

## Accuracy

Education, GCSE results and CV follow the supplied CV (10).pdf. Tesco activity is
described as observation/shadowing, with the 2025 placement and invitation back.
Cisco issue dates and Forage simulation tasks are corrected. Unsupported
certification equivalence, proficiency levels, award counts and precise blog
statistics were removed. All articles have revision dates and corrected technical
explanations. PostgreSQL and Convex are described as alternative Markup providers.

Homelab material is a service overview and illustrative diagnostics. No detailed
VLAN configuration, recovery test or failure anecdote was invented. The public
repository still needs that evidence. Glyph's case study links its actual
ownership checks and security tests.

## Performance and implementation

Public content is prerendered; only the contact form hydrates React, when visible.
Astro creates responsive WebP assets and hashed URLs. Satoshi is a single locally
served variable WOFF2. Analytics is centralised and deferred until after load.
Removed the continuous graphics/logo loops, autoplay and their unused dependencies.
Added a generated sitemap, canonical/social metadata and a branded sharing image.
CV downloads revalidate; hashed assets use Astro/Vercel caching.

Astro was upgraded to 7.3.5 and its integrations updated to address dependency
advisories. HTML whitespace behaviour is explicitly preserved across the upgrade.
The existing pre-edited HomelabBento.tsx and its sheet dependencies remain in source,
unreferenced by public pages. Both lockfiles were updated by npm during dependency
changes. The pre-redesign edited CV was retained locally in ignored tmp/qa.

## Verification and limitations

Run npm run check, npm test, npm run build and npm run test:browser.
Final results:

- Astro check: 0 errors, 0 warnings; 6 unused-import hints in the retained pre-existing HomelabBento.
- Validation tests: 5 passed.
- Production build: passed.
- 17 page routes × 7 viewport widths = 119 geometry checks, no overflow or clipped text.
- 34 light/dark axe scans: no WCAG A/AA violations reported.
- All internal links and assets resolved.
- Keyboard menu, theme persistence, search, gallery, legacy redirects, draft 404,
  sitemap, malformed API input, mocked submission success/error and CAPTCHA expiry passed.
- No browser JavaScript errors.
- No standalone lint task existed; the changed source was formatted with Prettier.

Browser screenshots and a machine-readable report are in ignored tmp/qa.
The built homepage has no React islands; the contact page has one. Screenshot
variants range from about 5–10 kB at 480px to 43–92 kB at the largest generated size.
No Lighthouse score or live delivery result is claimed.

Live email delivery and deployed Turnstile domain configuration are not verified.
Contact success and error paths use mocked services; no message was sent. No
deployment was performed.

npm audit retains three high entries caused by one upstream http-cache-semantics
advisory without a published patch. See README.md for the advisory and scope.

## Follow-up refinements

Replaced the header monogram with the pphilfre GitHub avatar. The theme menu
now uses accessible sun, moon and system buttons, with a themed popup surface.
Simplified page and section headings, removed the Glyph asterisk and invented
project motivations, and made the CV download a single arrow-labelled control.
Added Anthropic Claude 101, issuer logos and credential IDs; names and dates
follow Freddie's supplied list, including July 2024 for the introductory Cisco
courses. The home-lab overview now uses continuous branches on desktop and a
shared side connector on phones. Logos are local SVG assets; the Forage mark
reuses the existing portfolio asset, and the others are from Simple Icons.

Follow-up validation: Astro typecheck and production build passed, as did all
five existing tests. Browser verification passed 119 route/width checks and
34 light/dark accessibility scans, plus checks of the open theme menu, Escape
handling, themed popup colours and automatic system preference changes.
No browser errors or broken images were reported. Avoid running a production
build alongside Astro dev: both use the Vite cache and can cause the preview
to load a production JSX runtime. The preview cache was refreshed after build.
