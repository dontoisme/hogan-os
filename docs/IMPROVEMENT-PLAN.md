# HoganOS Improvement Plan

**Goal:** Make hoganos a resume/LinkedIn link that impresses recruiters and hiring managers during an active PM job search — without losing the personality of the desktop-OS concept.

**How this plan was made (July 2026):** Three parallel review agents audited the site — content/positioning (hiring-manager lens), recruiter UX, and technical/SEO/code quality. Their findings converged on one verdict:

> The OS shell is polished, but the three things a recruiter actually comes for — a resume download, a working contact path, and a company-agnostic intro — are respectively **broken**, **fake**, and **addressed to Bonterra**.

Task tracking lives in beads (`bd list`, `bd ready`); human-readable state in `STATUS.md`.

---

## Review findings (summary)

### Credibility
- `ResumeWindow.tsx:11-20` — "Download PDF" button has no handler; no PDF exists anywhere in `public/`. The highest-intent recruiter action silently fails.
- `ContactWindow.tsx:15-23` — contact form shows "Sent!" and discards the message.
- `ReadmeWindow.tsx` — "Start Here.txt" (the flagship entry point) is a Bonterra-specific role-fit analysis with a link to a likely-closed Workday req. Every non-Bonterra recruiter reads someone else's cover letter.
- Contradictory facts across windows: Indeed velocity +300% (`experience.ts:88`) vs +600% (`ReadmeWindow.tsx:133`); "8+ years" (`AboutWindow`, `layout.tsx`) vs "12+ years" (`ResumeWindow`, `ReadmeWindow` — both numbers appear in the same window); Velo AI +70% and churn −60% claims appear only in the readme, absent from canonical experience data.
- The Medicare/CMS/Epic/Cerner/HIPAA health-tech story — Don's rarest differentiator — exists *only* inside the Bonterra pitch.

### First impression
- Auto-open of the intro is disabled (`Desktop.tsx:105-111`): first load is 9 cryptic icons on a wallpaper. No name, title, or value proposition visible without a double-click.
- OG image is baked as `http://localhost:3000/...` (no `metadataBase`) — link previews on LinkedIn/Slack are broken. No twitter card, no 1200×630 image; OG description is "Just a dude having fun."
- Client-only rendering: search engines see icon labels and almost nothing else. No robots/sitemap/JSON-LD.

### Positioning
- Projects read as hobbyist dev copy ("too much nostalgia", "if you know, you know"); the only case study is about a personal CLI tool. Real PM wins — Wellcore (CPA $2500→$600, $1M ARR with 7 people), Mattermost (8%→25% D14 activation), SONOS ($12MM) — are one-line resume bullets.
- Job Journal demo dashboard uses Jan-2024-dated, all-engineering fake applications — undermines the PM story.

### UX / access
- No deep links (`?app=`), no history integration — the back button exits the site (fatal on mobile).
- Keyboard users cannot open anything on the desktop (double-click only). No `role="dialog"`, no focus management, no Escape-close, no `prefers-reduced-motion`, `--text-muted` fails WCAG contrast in both themes.
- Touch devices >1024px (iPad Pro) get the desktop shell with mouse-only drag/resize handlers.

### Technical hygiene
- No analytics of any kind — a Growth PM can't tell if a recruiter ever visited.
- ~6MB of dead assets in `public/icons/`; 1.6MB default wallpaper as an unoptimized CSS background; zero code splitting (both shells always mount).
- Default create-next-app README (the repo is itself a work sample); 6 ESLint errors; dead `persist` middleware in `windowStore.ts`; `firebase-debug.log` untracked and un-gitignored.

### Decisions made
- Deployment stays Vercel-on-push (already live).
- First impression: **boot/hero overlay** (branded boot screen → name, title, pitch, CTAs → desktop).
- Content: draft **Wellcore + Mattermost case study decks** for Don's review.
- Analytics: **PostHog** (on-brand — the UI is already PostHog-inspired; talking point for a growth PM).

---

## Epics

### Epic 1 — Credibility & trust (P0)
Nothing on the site may be broken, fake, or stale.

1. **Wire resume download** — Don supplies PDF → `public/resume/don-hogan-resume.pdf`; button becomes `<a download>`. *Blocked on PDF.*
2. **Honest contact path** — replace fake form with prominent mailto + LinkedIn CTAs. (Optional later: real form via Formspree/Resend.)
3. **De-Bonterra** — rewrite `ReadmeWindow.tsx` as company-agnostic who/what/why-hire; move the Medicare/CMS/EMR story into `experience.ts` + resume summary where it's visible.
4. **Single source of truth** — new `src/data/profile.ts` (name, title, years, canonical metrics, links) consumed by `layout.tsx`, About, Readme, Resume, StartMenu, Contact. Don adjudicates each contradiction. Fix "Lead"→"Led" and circular bullets.
5. **Hygiene** — delete dead `src/data/customization.ts` (placeholder contact data, public on GitHub); gitignore + remove `firebase-debug.log`.

### Epic 2 — First impression: boot overlay + link previews (P0)
1. **Boot/hero overlay** — branded boot sequence → name, "Product leader — growth & health tech", one-sentence pitch, CTAs (Resume / Case Studies / Say Hi, each deep-linking to its window) + "Enter HoganOS". Dismissal remembered; instantly skippable; respects reduced motion; server-renderable text (fixes crawlability).
2. **Link previews** — `metadataBase` (confirm production URL / donhogan.com), 1200×630 OG image, `twitter:card`, unified descriptions from `profile.ts`.
3. **SEO basics** — `robots.ts`, `sitemap.ts`, JSON-LD `Person`; favicon metadata → existing `src/app/icon.png`.

### Epic 3 — PM content upgrade (P1)
1. **Wellcore case study deck** (health-tech zero-to-one) in the existing SlideViewer format — Don reviews numbers.
2. **Mattermost activation case study deck** — same treatment.
3. **Job Journal deck outcome slide** — usage/outcome framing instead of LOC/build stats; drop the "resume you reviewed was generated by this tool" closer.
4. **Projects copy rewrite** — outcome-first; promote agent-pay's write-up to featured; screenshots where missing.
5. **Job Journal demo data refresh** — PM-flavored roles, current dates.

### Epic 4 — Recruiter UX & access (P1)
1. **Deep links + history** — `?app=<id>` opens a window/panel on load; pushState on open so back closes instead of exiting (both shells).
2. **Keyboard access** — Enter/Space opens icons; Escape closes focused window; `role="dialog"` + focus management; menu ARIA on Start button and theme menu.
3. **Navigation coherence** — Presentations + Start Here in the Start menu; one title per window regardless of entry path; decorative tray icons non-interactive.
4. **Contrast + motion** — fix `--text-muted` in both themes; theme-aware badge colors (`ProjectsWindow`, `ReadmeWindow`); global `prefers-reduced-motion` guard.
5. **Touch** — pointer events for window drag/resize.

### Epic 5 — Analytics (P1)
1. **PostHog** — pageviews, window opens, resume downloads, contact clicks, boot CTA clicks.

### Epic 6 — Repo-as-work-sample & performance (P2)
1. **README rewrite** — screenshot, concept, stack, easter-egg teaser.
2. **Lint clean** — 6 errors + 10 unused-import warnings.
3. **Asset diet** — delete dead `public/icons/` sheets/sets (~6MB); wallpapers → compressed WebP.
4. **Code splitting** — `next/dynamic` for windows + case study; mount one shell, not both.
5. **Store cleanup** — remove dead `persist` middleware in `windowStore.ts`.

---

## Needs from Don (blocking inputs)
- Real resume PDF.
- Ruling on each contradictory metric (300 vs 600%, 8 vs 12 years, Velo AI +70%, churn −60%, title Principal vs Staff).
- Production URL / donhogan.com status.
- Whether the Bonterra-interview framing in the Job Journal deck stays public as-is.
- Confirm Twitter `@donto` is his (vs GitHub `@dontoisme`).

## Verification
- `npm run build`, `npm run lint`, `npx tsc --noEmit` all clean.
- Built HTML contains absolute OG URLs, JSON-LD, and crawlable hero text.
- Drive in browser: boot overlay (first visit vs return), `?app=resume`, back-button behavior, keyboard-only navigation, both themes' contrast, 390px + iPad widths, resume download + mailto.
- OG preview checker against production URL after deploy.
