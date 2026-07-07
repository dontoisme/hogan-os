# HoganOS — Status

**Last updated:** 2026-07-06

**Mission:** Turn hoganos into a recruiter-ready portfolio link for the PM job search. Full plan: [docs/IMPROVEMENT-PLAN.md](docs/IMPROVEMENT-PLAN.md). Tasks in beads (`bd list`, `bd ready`).

## Where things stand

- ✅ Three-agent review + improvement plan approved (6 epics / 28 tasks)
- ✅ **Epic 1 — Credibility (P0): DONE.** Resume download wired to the real General-archetype PDF; fake contact form replaced with honest mailto/LinkedIn/GitHub CTAs; "Start Here" rewritten company-agnostic (Bonterra content gone); `src/data/profile.ts` is the single source of truth with resume-verified metrics; experience updated with **current MSK role** + GetHealthy (Medicare/CMS/EMR story now visible); customization.ts and firebase-debug.log removed.
- ✅ **Epic 2 — First impression (P0): DONE.** Boot/hero overlay (server-rendered, CTAs deep-link into windows, remembered dismissal, Enter/Esc skip); `metadataBase` + dynamic 1200×630 OG image + twitter card (LinkedIn/Slack previews now work); robots.txt, sitemap.xml, JSON-LD Person; favicon fixed.
- ✅ Bonterra-interview deck pulled from the public site per Don (Presentations surface removed; deck files kept for future Wellcore/Mattermost decks).
- ✅ Bonus: `?app=<id>` deep links work on both shells (half of `hogan-os-6oi.1`).
- ✅ Verified: build/tsc clean, browser-tested (boot flow, CTAs, PDF download 200, deep link, mobile shell, return-visit suppression).
- ⚠️ **Committed locally, not pushed.** Push to `main` = production deploy on Vercel.

## Next up (P1)

- Epic 3 (`hogan-os-2wn`): Wellcore + Mattermost case study decks; outcome-first project copy
- Epic 4 (`hogan-os-6oi`): history/back-button integration, keyboard access, contrast/reduced-motion fixes
- Epic 5 (`hogan-os-919`): PostHog analytics
- Epic 6 (`hogan-os-jlw`, P2): README, lint (3 pre-existing errors), asset diet, code splitting

## Blocked on Don

Nothing — all four input questions answered 2026-07-06.
