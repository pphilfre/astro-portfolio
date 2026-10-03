# Portfolio audit

Audit date: 3 October 2026

**Your work is stronger than the portfolio currently makes it look.** The site presents you mainly through broad infrastructure claims, repeated cards and future qualifications. Your current CV and repositories provide much more convincing material: two substantial applications, actual desktop releases, security checks and tests, and specific Tesco work experience.

I audited [the live portfolio](https://freddiephilpot.dev/), the local source, your supplied CV, public GitHub repositories, Cisco badges and Forage certificates. I checked desktop widths of 1024, 1440 and 1920px, and mobile widths of 375, 390 and 430px, including both themes, all six blog articles, project variants and the 404 page.

**No files were modified during the audit.** Existing changes were left untouched. This Markdown file was subsequently created at your request. I did not submit the contact form, run project tests or perform a Lighthouse benchmark. LinkedIn could not be independently verified.

## Critical

### 1. Education and the downloadable CV are inconsistent

The site says you are “currently completing my GCSEs”, while other text says you are studying A-levels. Your supplied CV states that you are **in Year 12**, studying **Mathematics, Further Mathematics, Physics and Economics, 2026–2028**.

There are also three different CV versions:

| Source | What it contains | Recommended change |
|---|---|---|
| Supplied CV | Current Year 12 status and completed 2026 GCSE results | Use this as the primary source for the portfolio’s education copy. |
| Local `public/cv.pdf` | Different grades and Creative iMedia Distinction | Reconcile it with the supplied CV before publishing. |
| Live downloadable CV | Predicted GCSE grades, three planned A-levels, older project information | Replace the published download with the reconciled current version. |

The supplied results are:

- **Grade 8:** Mathematics, Physics, Computer Science.
- **Grade 7:** Biology, Chemistry, English Literature.
- **Grade 6:** Spanish, Art, English Language.
- **Creative iMedia:** Level 2 Merit.

The older versions differ in Biology, Chemistry, Spanish, English Literature and Creative iMedia. These are conflicts between versions; I would not guess which historical predictions or earlier entries were intended.

**Exact change:** update the About introduction, education sheet, timeline and “Next steps” together. Replace the age-based homepage metadata with your current educational stage; “16-year-old” is unverified and will become stale.

Sources: [supplied CV](<C:/Users/Freddie/Downloads/CV (10).pdf>), [local older CV](C:/Users/Freddie/Documents/astro-portfolio/public/cv.pdf), [published CV](https://freddiephilpot.dev/cv.pdf).

### 2. Some experience and qualification wording exceeds the evidence

| Current claim | Evidence and problem | Exact recommended change |
|---|---|---|
| “Enterprise experience”, Windows Server administration, Active Directory and Group Policy | Your current CV describes shadowing and observing teams. It does not establish responsibility for administering enterprise systems. | Describe the actual activities: shadowed IT operations, observed security alert handling, attended stand-ups, and observed code reviews, testing and deployment. Retain additional activities only if you can confirm them. |
| “Advanced” Linux experience and material “equivalent to CCNA and CompTIA A+” | Your projects support practical Linux experience. They do not establish certification equivalence or a defined advanced proficiency level. | Replace level labels with actions: “Run Linux services with Docker Compose, configure DNS and remote access, and monitor systems.” Remove the equivalence claim. |
| Azure SSO and conditional-access implementation | This is a prominent achievement, but the supplied CV and inspected repositories do not substantiate the full description. | Add a specific case study and configuration evidence, or reduce/remove the claim pending confirmation. |
| Seven Headteacher Awards for academic excellence | The local older CV says seven for effort/contribution; the live CV says six. The current CV omits the count. | Confirm the count and reason. Until then, omit the number and “academic excellence”. |
| “Earlier this year” in the January 2026 Tesco article | Your current CV places the cyber/software placement in 2025. | Replace it with “In 2025”. |

The Tesco invitation to return for a dedicated cybersecurity week is worth including: it is specific and supported by your current CV. It does not need inflated wording around it.

### 3. Credential dates and descriptions need correction

Cisco’s public records confirm:

| Badge | Verified issue date | Site action |
|---|---|---|
| [Endpoint Security](https://www.credly.com/badges/ca4e6574-c9fa-4659-a304-81892d9f6159/public_url) | 7 February 2026 | February is correct. |
| [Network Defense](https://www.credly.com/badges/01c39b81-fb15-494d-9b44-6626c50f3156/public_url) | 7 February 2026 | February is correct. |
| [Introduction to Cybersecurity](https://www.credly.com/badges/298659f6-54ff-4143-9a7d-62d555f88271/public_url) | 27 August 2024 | Change “Issued Jul 2024” to August. |
| [Introduction to IoT](https://www.credly.com/badges/ccce8102-43f9-4d1e-90cd-9983457e756f/public_url) | 28 August 2024 | Change “Issued Jul 2024” to August. |

Your CV’s July **completion** date could precede the August **issue** date. Keep those concepts separate.

The Forage certificates support the following:

- **Tata, 4 February 2026:** IAM fundamentals, strategy assessment, custom IAM solutions and platform integration. Describe these as simulated tasks, rather than work protecting an employer’s enterprise systems. [Certificate](C:/Users/Freddie/Documents/astro-portfolio/public/certifications/tata.pdf).
- **Datacom, 4 February 2026:** introduction to cybersecurity and cybersecurity risk assessment. The current description adds SOC alert investigation and incident-response activities that the certificate does not substantiate. Replace it with the documented risk-assessment tasks unless further evidence supports those additions. [Certificate](C:/Users/Freddie/Documents/astro-portfolio/public/certifications/datacom.pdf).
- **AIG, 3 February 2026:** responding to a zero-day vulnerability and technically bypassing ransomware. These specific tasks are clearer than the current broad description. [Certificate](C:/Users/Freddie/Documents/astro-portfolio/public/certifications/aig.pdf).

Rename the section **“Courses and job simulations”**. Remove “Advanced Certs” from the timeline. These credentials are useful evidence of learning, but should be presented at their actual scope.

### 4. Unfinished and duplicate content is publicly exposed

- **The CTF section contains a published placeholder.** “Example CTF Challenge”, its placeholder description and `flag{example_flag_here}` significantly undermine credibility. Mark it as a draft and remove it from the public index until there is a genuine write-up.
- **Markup has competing presentations.** Navigation leads to `/projects/tools`, a long text page, while `/projects/markup` contains screenshots. Consolidate into one canonical case study and redirect the old route.
- **`/projects/markupproject` exposes an unstyled duplicate document**, with no meaningful page title or normal layout. Move its source outside the page-routing directory or remove that obsolete route.
- **All six blog posts repeat their title as two H1 headings.** Keep the title rendered by the article layout and remove the repeated Markdown H1.

These are concrete defects, rather than aesthetic preferences.

### 5. Keyboard access and light-mode code contrast are broken

The About, Homelab and Achievements components use clickable `<article>` elements to open details. They are not normal keyboard-operable buttons or links, so keyboard users cannot reliably reach substantial content.

**Exact change:** use real links for project case studies and explicit buttons for expandable details. Add visible focus states and accessible names to icon-only controls, including sheet close buttons and mobile theme choices. Use an accessible disclosure/menu implementation for the Projects dropdown.

Highlighted code in light mode renders approximately **`#dbe4ff` on `#f5f5f5`**, producing roughly **1.16:1 contrast**. It is nearly unreadable.

**Exact change:** provide separate light and dark syntax themes. The current blue `#3b82f6` also gives only about **3.68:1** against white; use a darker light-theme colour for small links, such as `#1d4ed8`, and check highlighted tokens individually.

Relevant source: [AboutBento.tsx](C:/Users/Freddie/Documents/astro-portfolio/src/components/AboutBento.tsx), [AchievementsBento.tsx](C:/Users/Freddie/Documents/astro-portfolio/src/components/AchievementsBento.tsx), [Navbar.tsx](C:/Users/Freddie/Documents/astro-portfolio/src/components/Navbar.tsx).

## Worth changing

### 6. Put the strongest verified projects first

| Project | What the inspected source supports | What the portfolio should show |
|---|---|---|
| **Glyph** | Next.js, TypeScript, Clerk, Convex, Markdown/maths functionality, backend ownership checks, publication revocation and security tests covering anonymous access and cross-user isolation | Add a prominent case study: editing screenshot, ownership model, one security decision, and links to implementation/tests. |
| **Markup** | Next.js, TypeScript, CodeMirror, maths/diagrams, Tauri, PostgreSQL/Prisma and Convex sync paths; actual Windows and macOS release assets | Show screenshots, web/desktop status, downloads and three concrete engineering decisions. |
| **Homelab** | The CV supports Linux, Oracle Cloud, Proxmox, Docker Compose, Traefik, Tailscale, Pi-hole, Wazuh, Grafana and Prometheus | Show a dated topology, selected configuration examples and one troubleshooting account. |

Glyph’s [ownership checks](https://github.com/pphilfre/glyph/blob/main/convex/notes.ts) and [security tests](https://github.com/pphilfre/glyph/blob/main/tests/notes-security.test.ts) are particularly relevant to your cybersecurity interest. I inspected these tests; I did not execute them.

Markup’s [v1.1.7 release](https://github.com/pphilfre/markup/releases/tag/v1.1.7) contains real desktop packages. That is stronger evidence than another feature list.

One important qualification: Markup contains **both database providers**, and its [provider-selection code](https://github.com/pphilfre/markup/blob/main/src/lib/db-provider.ts) defaults to Convex. Describe the PostgreSQL/Prisma implementation accurately without claiming the hosted application now exclusively uses PostgreSQL unless that deployment setting is confirmed.

The current [homelab repository](https://github.com/pphilfre/homelab) contains only a minimal README. It does not validate the portfolio’s more detailed claims about four VLANs, OPNsense, Suricata, enforced DNS or automated backups. Those may be real; they need supporting documentation before becoming headline evidence.

### 7. The visual design is too interchangeable

**Yes: replacing the name, projects and accent colour would leave something resembling many generic developer portfolios.**

The reasons are specific:

- A giant centred introduction over an animated gradient.
- Repeated icon → heading → description → tag cards.
- Most content placed inside similar rounded boxes.
- Credential cards nested inside larger cards.
- A moving vendor-logo strip that says little about your own work.
- Elaborate tilted, locked cards for qualifications you have not earned.
- Broad claims such as “systems thinking” replacing examples.

This describes the presentation; it does not establish how the site was authored.

**Exact change:** create a quieter page structure built around your own screenshots, diagrams and explanations. Use cards for genuinely separate projects, ordinary text for biography, compact rows for credentials, and a vertical list for experience. Retain tags only where they help identify technologies or navigate content.

There is no need to remove every radius or border. The site’s shadows are generally restrained. The problem is repetition and equal emphasis, not the existence of cards.

### 8. Desktop and mobile need different compositions

| Area | Current problem → consequence | Exact recommended change |
|---|---|---|
| Homepage | The introduction occupies the opening view, while “View Projects” leads straight to Homelab → visitors miss your applications | Shorten the hero and place Glyph, Markup and Homelab directly below it. Make “View projects” reach that collection. |
| Mobile navigation | The header measures about 33px high, with 36px controls and no central identity → cramped controls and weak orientation | Give it a deliberate 56–64px height, a visible name/home link and approximately 44px control areas. |
| Mobile homepage title | The 48px name almost reaches the edges at 375px → visually cramped despite fitting | Use a responsive 36–44px scale and consistent 20–24px side padding. |
| About | Three introductory cards delay useful evidence; skills become small, heavily wrapped tiles | Use one biography paragraph, one short career-direction sentence, then skills linked to projects. Remove the separate “Approach” card. |
| Timeline | Fixed-width events scroll horizontally; mobile reveals roughly one at a time → important current information is hidden | Use a vertical timeline on mobile, with 3–5 important events. Put current education and recent experience first. |
| Homelab | Six similar cards describe infrastructure without showing it → the project feels abstract | Lead with a topology diagram, then service groups and selected technical details. Use readable stacked explanations on mobile. |
| Markup | The linked text page is roughly 4,000px tall at 375px → repeated features bury links and evidence | Put screenshot, status and repository/download links at the top. Keep three decisions, one difficulty and a short feature summary. |
| Markup gallery | Desktop screenshots are letterboxed into a tall carousel; controls and title compete with the image → small-screen details are hard to read | Separate text from imagery. Use a full-width static image, labelled detail crops and a manual gallery. |
| Achievements | About 3,500–3,700px of mobile content, including large future-certification cards → aspirations compete with completed work | Lead with Tesco experience, use compact credential rows, and reduce future plans to one sentence. |
| Blog index | Large padded cards expose only a few posts per desktop screen → unnecessary scrolling | Use compact rows with date, title and one sentence. A three-column grid is unnecessary for six articles. |
| Contact | Six cards, a non-clickable “Open to” card and a form repeat the same purpose → the simplest contact route is obscured | Lead with your email, followed by compact LinkedIn/GitHub links. Keep the form secondary. |

**No page-wide horizontal overflow was found at 375, 390 or 430px.** That is a good foundation. Code blocks scroll internally as expected, although very long commands would benefit from line breaks and copy controls.

Wide screens do not require every paragraph to expand. Keep blog reading columns narrow; use the extra space for project imagery and comparisons.

### 9. Make the writing sound like your actual work

A suitable homepage introduction would be:

> I’m Freddie, a Year 12 student building web applications and running a Linux home lab. I’m looking for cybersecurity work experience.

Other specific edits:

| Current wording/pattern | Exact change |
|---|---|
| “Student Technologist”, “enterprise-level”, “comprehensive”, “highest standards” | Use student status, actual technologies and specific activities instead. |
| “Fully featured”, “productivity-first”, repeated feature claims | Describe what the application does once, then show evidence. |
| “Background and skills”, “Get in touch”, repeated heading/subtitle pairs | Remove subtitles that merely repeat the heading. Keep ones that establish useful scope. |
| Primary GitHub described as school/personal work; secondary account labelled “Production” | Label `pphilfre` as your main GitHub and the other account as lab write-ups, unless there is a substantiated production distinction. |
| “Security-first”, “Systems Thinking”, “Risk Management” tags | Replace with a short example: an ownership check, a restricted access rule or a recovery decision. |
| Blog structure repeatedly ending in generic lessons and recommendations | Organise each article around one actual problem, the configuration used, what happened and what you changed. |

For Markup, a clearer opening is:

> A Markdown workspace with linked notes, maths and diagrams, cloud synchronisation, and local files through Tauri.

Some blog numbers and anecdotes—blocking percentages, request volumes, cost totals and failure stories—lack supporting evidence in the supplied sources. That does **not** make them false. Retain them if they are your confirmed observations, with dates and context; otherwise remove the precision.

### 10. Correct technical explanations in the blog

These matter because the articles are being used as evidence of technical understanding.

- **Tailscale:** the setup jumps from installing/authenticating a device to accessing the home LAN. Explain whether this is endpoint access or subnet routing. Subnet routing requires forwarding, advertised routes, approval and access rules. Also replace the hard-coded Ubuntu release instructions under the broad “Ubuntu/Debian” label with instructions matching the actual machine. [Official subnet-router documentation](https://tailscale.com/docs/features/subnet-routers).
- **Pi-hole:** “avoiding third-party DNS” conflicts with the described Cloudflare upstream. Explain that Pi-hole filters requests while permitted public queries still use that upstream. Replace ordinary home-DNS `.local` examples with `home.arpa` or a subdomain you own; `home.arpa` is designated for residential networks. [RFC 8375](https://www.rfc-editor.org/rfc/rfc8375).
- **Twingate/Tailscale:** avoid implying that all Tailscale devices inherently have unrestricted access. Explain the policies in your actual setup. Two parallel remote-access routes do not automatically create two successive security barriers.
- **Oracle Cloud:** replace “free forever” and blanket assurances about charges with a dated explanation of the resources you used and their limits. Explain backup/recovery rather than presenting a small cron job as a reliability guarantee; Oracle documents reclamation of idle Always Free compute resources. [Oracle’s resource documentation](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm).
- **Historical setup:** distinguish the January configuration from the current configuration. Monitoring listed as a future step in an old article may legitimately be installed now; add “last updated” information rather than leaving readers to reconcile it.

### 11. Simplify the implementation without rewriting it

The Astro/React architecture is suitable. The following targeted changes would improve it:

- **Shared layout:** repeated page head markup, theme setup and analytics increase maintenance and allow metadata to drift. Put these into the existing shared layout with page-specific title/description inputs.
- **Repeated components:** consolidate common card/dialog behaviour where it actually repeats. Keep page-specific content structures; forcing every page into one bento component would preserve the design problem.
- **Semantic HTML:** add a homepage `<main>`, a skip link and active-navigation indication. Correct skipped heading levels on project pages.
- **Motion:** the WebGL background and logo conveyor run continuous animation. The conveyor’s CSS reduced-motion rule does not stop its JavaScript animation. Stop the animation loops when reduced motion is requested; provide a static background fallback and remove carousel autoplay.
- **Hydration:** avoid hydrating static information simply because it lives inside a React component. Keep JavaScript for navigation, forms, filtering and genuinely useful interactions.
- **Images:** provide intrinsic dimensions and responsive image sizes for project screenshots. The five screenshots total roughly 1MB; serving appropriately sized images would help mobile visitors.
- **Dependencies:** review unused Three.js/react-three, react-bits and unintegrated MDX dependencies. Remove them after checking imports. Installed package size alone does not establish browser bundle size.

### 12. Harden the contact form’s validation and feedback

In [the contact endpoint](C:/Users/Freddie/Documents/astro-portfolio/src/pages/api/contact.ts), a TypeScript type assertion and truthiness checks do not validate incoming JSON. User values are interpolated directly into email HTML.

**Exact change:** validate trimmed strings, email format and sensible length limits; escape values in HTML or send plain text. Keep the existing server-side CAPTCHA verification.

On the client, add a visible CAPTCHA-load/error fallback, clear stale tokens when recreating the widget, and reset it after successful submission. Use persistent success/error feedback with `aria-live` and keep the direct email link available.

The CAPTCHA did not render reliably during inspection. **Email delivery remains unverified**, because I did not submit a message; I would not label the entire form broken from that observation alone.

## Minor polish

- Standardise page-heading placement and outer margins. Use one broad content container for overview pages and a deliberate narrower reading column for articles.
- Use a consistent spacing scale, such as 8, 16, 24, 40 and 64px. The current Tailwind usage does not warrant a wholesale cleanup.
- Reserve 8–12px radii for project panels and controls; avoid arbitrary shifts between similar surfaces.
- Keep body text around 16px with comfortable line spacing. Increase useful skill text currently reduced to 12px.
- Standardise “A-level”, “cybersecurity”, “GitHub”, dates and technology names.
- Remove empty reserved space when the TryHackMe embed fails; offer an ordinary profile link as fallback.
- Generate the sitemap from published routes. The current version omits articles/project pages and uses old uniform modification dates.
- Add accurate canonical URLs and sharing metadata after consolidating routes.
- Update the repository README to match the implementation; installed libraries do not necessarily describe features the site uses.

## Keep

- **Astro with focused React components.** A framework rewrite would not solve these issues.
- **The restrained neutral palette and blue accent.** Correct contrast without inventing a new identity.
- **Readable article column widths.** Wide monitors do not require wide text.
- **The existing screenshots.** Their presentation needs work; the images themselves are valuable.
- **Direct repository, credential, CV and contact links.**
- **The underlying responsive foundation.** The tested pages fit all three mobile widths.
- **The real Tesco experience, completed credentials, KS4 Computer Science award and DofE Bronze.**
- **The existing Radix sheet foundation**, with accessible triggers and labelled controls.
- **The clear recovery link on the 404 page.** Its animation is lower priority than substantive project content.

## Final assessment

1. **Accuracy problems found:** outdated education, three conflicting CV versions, incorrect Cisco issue months, conflicting award counts/reasons, a placement-year wording error and claims exceeding the supplied evidence.

2. **Missing information/opportunities:** Glyph’s security implementation, Markup’s actual desktop releases, TypeScript/React/Next.js development, current monitoring tools and the invitation back to Tesco deserve greater prominence.

3. **Desktop problems:** an oversized opening, repeated card grids, a sparse oversized Tesco panel, hidden timeline events and project evidence separated from the main navigation.

4. **Mobile problems:** cramped navigation, small skill text, excessive stacking, a horizontal timeline and difficult screenshot presentation. Page-wide overflow was not found.

5. **Generic/AI-looking patterns:** centred animated hero, interchangeable icon cards, repeated subtitles/tags, vendor-logo animation and elaborate future-qualification displays. Authentic project evidence should provide the visual identity.

6. **Content/copy problems:** inflated proficiency language, repetitive feature lists, formulaic article conclusions, unsupported precision and outdated temporal wording.

7. **Technical problems:** inaccessible card triggers, duplicate headings, unreadable light-theme code, exposed duplicate routes, continuous animation, weak runtime form validation and duplicated layout code.

8. **What should remain unchanged:** the stack, restrained colours, reading widths, direct links, real credentials and experience, screenshots and responsive foundation.

9. **Recommended overall visual direction:** a calm student engineering portfolio with a short introduction, immediately visible projects, real screenshots and diagrams, specific technical explanations and compact credentials. Let the work establish distinction.

10. **Prioritised implementation plan:** after your approval, first reconcile facts and CVs; remove placeholder/duplicate content; fix keyboard access, headings and contrast; bring Glyph, Markup and Homelab into one visible project collection; simplify mobile navigation and content; correct articles and contact handling; then optimise images, motion, shared layout and metadata. Verify the changed routes, keyboard flows and requested widths before publishing.
