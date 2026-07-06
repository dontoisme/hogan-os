# HoganOS — Status

**Last updated:** 2026-07-06

**Mission:** Turn hoganos into a recruiter-ready portfolio link for the PM job search. Full plan: [docs/IMPROVEMENT-PLAN.md](docs/IMPROVEMENT-PLAN.md). Tasks in beads (`bd list`, `bd ready`).

## Where things stand

- ✅ Site concept built and live (Vercel auto-deploy on push to `main`)
- ✅ Three-agent review complete (content, UX, technical) — findings in the plan doc
- ✅ Improvement plan approved; 6 epics / 28 tasks created in beads
- ⬜ No improvement work started yet

## The critical path (P0 — do these before sharing the link anywhere)

1. **Epic 1 — Credibility** (`hogan-os-0g7`): fix dead resume download, fake contact form, Bonterra-specific "Start Here", contradictory metrics
2. **Epic 2 — First impression** (`hogan-os-ssp`): boot/hero overlay, fix broken LinkedIn/Slack link previews (localhost OG image), SEO basics

## Blocked on Don

| Bead | Needed |
|------|--------|
| `hogan-os-0g7.1` | Real resume PDF |
| `hogan-os-0g7.2` | Ruling on contradictory metrics (300 vs 600%, 8 vs 12 yrs, title, @donto) |
| `hogan-os-ssp.1` | Production URL / donhogan.com status |
| `hogan-os-2wn.1` | Keep Bonterra-interview deck public as-is? |

## After P0

- Epic 3 (P1): Wellcore + Mattermost case study decks, outcome-first project copy
- Epic 4 (P1): deep links + back button, keyboard access, contrast/reduced-motion
- Epic 5 (P1): PostHog analytics
- Epic 6 (P2): README, lint, asset diet, code splitting
