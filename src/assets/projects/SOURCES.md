# Project screenshot sources

- Arc: unaltered `Tests/arc0.PNG` (map) and `Tests/arc2.PNG` (directions), linked from https://github.com/pphilfre/arc/blob/main/README.md. Downloaded 4 October 2026.
- Glyph: captured from the real public reader at https://glyph-gules.vercel.app/p/test on 4 October 2026.
- Markup: existing portfolio asset `src/assets/markup-4.jpg`, showing the actual mind map workspace.
- App icons: the respective local project assets for Markup, Glyph and Arc.

Updated 19 October 2026:

- The collection now uses the existing `src/assets/markup-1.png` editor screenshot and the existing Glyph reader capture. All five Markup gallery images remain.
- Dispatch: `dispatch-inbox.png` is the unaltered “Inbox redesign” simulator capture from the sibling Mail checkout's `build/interaction-evidence-1/screenshots/FF64E28A-4EF9-4695-B4A7-BE2B3895CC48.png`. `dispatch-reader.png` is the unaltered “Redesigned reader” capture from `build/mail-polish-second-results/screenshots/80F1C5D8-F2F8-41E8-8734-F0BB31937E0D.png`. Their XCTest export manifests identify them; both show sample/test messages rather than private mail. These are development captures, not evidence of successful live Gmail delivery.
- Waypoint: `waypoint-applications.jpg` and `waypoint-detail.jpg` capture the existing `ApplicationWorkspace` and `Navbar` components and their real styles at 1600 × 1000. An isolated local fixture supplies clearly illustrative employer/application records through mocked data hooks. It neither changes Waypoint's source nor contacts its backend. Case-study captions identify the example data. This is the existing interface, not a fabricated UI or proof of production authentication. The icon in `public/projects/icons/waypoint.svg` is copied unchanged from the repository's `public/favicon.svg` at `37c72f983e5dd6c770e090d29f4b0fbe9700c413`.
- Personal Portfolio: `portfolio.jpg` is a fresh 1920 × 1080 home-page capture. Responsive image output uses increased quality, and the card preserves the full screenshot's aspect ratio within the existing artwork treatment.
- Arc assets and its case-study source remain intact; Arc is no longer featured.
- Home Lab: `homelab.svg` is a vector service overview derived solely from the existing Home Lab page: Proxmox, Raspberry Pi/Pi-hole DNS, Oracle Cloud/Linux, Docker Compose/Traefik, Tailscale, Wazuh, Prometheus and Grafana. It groups services without adding network connections or security claims. It replaces the sparse card diagram and its decorative green dot, and is reused on the case-study page.
- Final image delivery uses quality 95 and native-width-capped responsive variants on collection cards. Case studies provide full-size source links so screenshots can be inspected without thumbnail scaling.

Updated 26 October 2026:

- Dispatch: both previews now come from the real iPhone 17e simulator in [GitHub Actions run 40326122825](https://github.com/pphilfre/mail/actions/runs/40326122825), capture commit `a769491` on `codex/portfolio-screenshots-20261026`, based on app UI revision `001afd987cc8598fcf27f0b08cc63a477288cae7` from `codex/mail-ui-refresh-release`. `dispatch-inbox.png` is the unaltered XCTest attachment `42C2C5E5-E0FA-4602-8553-C1291667C4F9.png` ("Portfolio inbox"). `dispatch-reader.png` is an unaltered full-frame still at 80.648333 seconds from the simulator's exported screen recording `C8D4672C-3424-4887-B07A-99CD84FFB5E9.mp4`. Both are 1170 × 2532 and show the app's sample mail. The build succeeded; the capture test subsequently failed because its selector expected a connected-account reader control absent from sample mail. That test failure is not presented as a passing app test. No AI-generated interface imagery is used.
- Dispatch's portfolio identifier (`public/projects/icons/dispatch.svg`) is a hand-authored envelope symbol using the app's documented plum (`#705267`) and paper (`#FAF9F6`) colours. The app repository has no AppIcon asset; this symbol identifies its portfolio links rather than claiming to be an extracted app icon.
- Personal Portfolio: `portfolio.jpg` is a fresh, unaltered 1920 × 1080 capture of the local home page after the content, navigation and project-icon updates. The development toolbar is hidden for the capture.
- Social preview: `public/social.png` is rendered from `scripts/social-preview.html`, with the old development and cybersecurity title removed.
