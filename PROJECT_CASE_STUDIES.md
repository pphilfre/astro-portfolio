# Project case-study update — 19 October 2026

The existing Astro design, shared header, gallery, themes and navigation remain.
The project collection is ordered Markup, Dispatch, Waypoint, Glyph, Personal
Portfolio and Home Lab, all in the same grid. Home Lab retains its own infrastructure case study. The home-page deck
uses the first three projects. Arc's source and assets are retained.

## Evidence inspected

GitHub repository trees were read through the connected GitHub API before edits.
Documentation and relevant implementation were inspected at these revisions:

| Repository                                               | Revision                                   | Main evidence                                                                                                                                           |
| -------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Markup](https://github.com/pphilfre/markup)             | `4f4000b17b5c80dafef5619ca19dbe9c2c11ddbe` | README; `projects/website-portfolio.md`; `src/lib/db-provider.ts`, `convex-sync.tsx`, `sync-state.ts`, `tauri-file-sync.tsx`; existing screenshots      |
| [Dispatch](https://github.com/pphilfre/mail)             | `d0ae57a7637a9ab49416998f438d7af48b91c50e` | README; Gmail provider README; `docs/gmail-sync-investigation.md`, `stages.md`, `mail-ui-ai-polish.md`; release workflow; v0.8.0 release and IPA assets |
| [Waypoint](https://github.com/pphilfre/waypoint)         | `37c72f983e5dd6c770e090d29f4b0fbe9700c413` | README; `convex/schema.ts`, `auth.ts`, `applications.ts`; application workspace component; `docs/web-authentication.md`; v0.0.4 release                 |
| [Glyph](https://github.com/pphilfre/glyph)               | `055281f1f2e30498bffe23646277c3a4348a64a7` | README; `convex/notes.ts`; `tests/notes-security.test.ts`; existing reader capture                                                                      |
| [Portfolio](https://github.com/pphilfre/astro-portfolio) | `95a48c611038d28dfa5e2d8b46448d78596dce75` | Repository tree; local Astro config, layout, pages, scripts, contact tests and Vercel config                                                            |

Local sibling checkouts supplied additional readable context (Waypoint's original
career-tracker brief and Dispatch's Windows development brief). Repository source
and current GitHub documentation take precedence over proposed feature lists.

## Content boundaries

- Markup's README emphasises PostgreSQL, but provider code defaults to Convex.
  The page describes both implementations without guessing the live provider.
- Dispatch's release API confirms an unsigned v0.8.0 IPA. The README contains
  older v0.4/v0.5 status text, so the page avoids calling that the latest release.
  Gmail core behaviour is implemented. Zoho and APNs are future work. Newer
  background-refresh code is distinguished from verified device delivery.
- Dispatch's latest UI/AI notes record an initial CI run with UI failures and
  further device checks. The page does not imply all current changes passed,
  that model quality was measured, or that live Gmail delivery was retested.
- Waypoint's authentication repair was verified locally according to its notes.
  A public sign-in screen does not verify the authenticated production flow.
- Glyph's README and backend describe upload validation, sanitised rendering,
  ownership checks and revocable subsequent public reads. Previously downloaded
  content cannot be recalled. No claim of a complete security audit is made.
- Motivation follows the supplied brief and project documentation. Learning is
  framed as understanding gained, without inventing usage, performance or
  educational achievements. Involvement includes planning, configuring,
  reviewing and testing alongside implementation.
- Home Lab's service overview is redrawn using only the services already documented
  on its page. The technical writing, DNS example and links are retained; no infrastructure
  or security configurations were added. The old decorative green dot is removed.

## Links and imagery

GitHub repository metadata was successfully retrieved for all five repositories
and Home Lab. Every newly linked source path is present in its inspected tree.
Release endpoints confirm Markup desktop packages, Dispatch IPAs and Waypoint's
release. Glyph has no published releases, so no release link was added.

Fresh Edge checks returned HTTP 200 for Markup, Waypoint and the portfolio.
Waypoint rendered its sign-in screen; Glyph's example reader returned HTTP 200
and rendered its mathematical note. An initial Markup browser navigation aborted,
but a separate direct request returned its application HTML successfully.

No credentials were supplied or private workspace records created. Full live
authentication, synchronisation, mail delivery, signed-device installation and
the exact production database configuration were not verified by this update.
The case studies omit claims that depend on those checks.

Existing screenshot assets and the complete Markup gallery remain. Dispatch now
uses real simulator screenshots found in the local build evidence. Waypoint uses
captures of its unchanged application components with illustrative fixture data;
no private records or production authentication bypass is involved. The portfolio
capture is 1920 × 1080, framed within the card without distorting its aspect ratio.
See `src/assets/projects/SOURCES.md` for precise provenance.

## Changed files

- Collection and navigation: `src/data/projects.ts`,
  `src/components/ProjectCollection.astro`, `src/pages/projects/index.astro`,
  `src/pages/index.astro`, `src/pages/sitemap.xml.ts`.
- Case studies: `src/pages/projects/markup.astro`, `glyph.astro`, `dispatch.astro`,
  `waypoint.astro`, `portfolio.astro`, `homelab.astro`.
- Styles: `src/styles/global.css` (image presentation and muted card backgrounds),
  `src/styles/landing.css` (longer project labels at the existing 360px breakpoint).
- Images: `src/assets/projects/dispatch-inbox.png`, `dispatch-reader.png`,
  `waypoint-applications.jpg`, `waypoint-detail.jpg`, `portfolio.jpg`,
  `homelab.svg`,
  `public/projects/icons/waypoint.svg`, `src/assets/projects/SOURCES.md`.
- Verification/documentation: `scripts/browser-check.mjs`,
  `scripts/landing-check.mjs`, `README.md`, this document.

The full browser suite covers 21 routes at 15 widths from 320 to 1920px, including
900, 1000 and 1100px (315 layout checks), plus 42 light/dark accessibility scans.
All passed with zero accessibility violations or browser errors. It includes the
new routes, collection order, shared Home Lab card, sitemap and existing
interactions. Landing checks passed 116 layouts and 12 accessibility scans,
including intermediate desktop widths and short viewports, without dropping
gesture, keyboard, navigation, theme or no-JavaScript coverage. The narrow-desktop
breakpoint now applies through 1150px to avoid copy/card overlap at 1100px.

The existing five unit tests pass. Astro check reports zero errors and zero
warnings; hints remain in unused components and generated local cache files. The production build passes. An earlier development
bundle cache produced a React hydration error in the contact check; setting the
generated Vite cache aside and rerunning the suite resolved it without changes to
the contact form.

## Final visual refinements

All six cards share the same artwork treatment. Their backgrounds are sage
(`#c5d7cd`), smoke blue (`#ccd7e4`), sand (`#e4d7bd`), mauve (`#d9cedf`), rose
(`#e3ccc7`) and stone (`#cfd3d2`), respectively. The Home Lab SVG groups documented
services rather than implying physical connections or firewall rules.

Collection images use quality 95 and responsive widths capped at each source's
native width, including higher-density variants. Case-study images open their
unaltered full-size sources in a new tab; Markup's existing gallery retains that
behaviour. The Home Lab diagram remains vector at every size.
