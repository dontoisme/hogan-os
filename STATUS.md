# HoganOS — Status

**Last updated:** 2026-07-06

**Mission:** Turn hoganos into a recruiter-ready portfolio link for the PM job search. Full plan: [docs/IMPROVEMENT-PLAN.md](docs/IMPROVEMENT-PLAN.md). Tasks in beads (`bd list`, `bd ready`).

## Where things stand

- ✅ **P0 Epics 1–2 (credibility + first impression): LIVE IN PROD** — real resume PDF, honest contact, de-Bonterra'd, single source of truth (`profile.ts`), MSK role added, boot hero, working OG/link previews, SEO basics.
- ✅ **Epic 7 — Sizzle: built and verified locally, committed, NOT yet pushed.**
  - App registry (`src/data/apps.tsx`) — 11 apps, one definition each, `next/dynamic` (also closed `jlw.4`/`jlw.5`)
  - Motion: windows fly open from their icon/menu/CTA, animate closed, minimize flies into the taskbar button (state survives), icon micro-motion, full reduced-motion support
  - Retro boot: BIOS POST lines → logo flash → hero stagger (SSR crawlability preserved, verified)
  - Start Here auto-opens from its icon on first visit; chiptunes toast asks once (~4s later); sound stays default-off
  - New apps: **Terminal** (`git log --oneline` = career as commits, `sudo hire don`, `man don`), thoughts.txt, Recycle Bin (joke files), System Profiler reskin of The Journey, notifications bell, right-click menu, idle screensaver
  - **Dusty the dingo** (spirit animal) replaces Clippy; cameos in screensaver/recycle bin/404/boot
- ⚠️ **Dingo sprites blocked**: gemini CLI needs re-auth (quota + interactive login). Prompts ready in `docs/nano-banana-prompts.md`; transparent placeholders shipped so nothing is broken. → `hogan-os-tiq.13`
- Lint: 3 pre-existing errors remain (HackerMode, PresentationEditor, SystemTray ThemeIcon) → `hogan-os-jlw.2`

## Next up

1. Push + prod smoke test (Epic 7 ships on push)
2. `tiq.13/14` — generate dingo sprites after gemini re-auth, drop into `public/images/dingo/`
3. `tiq.15` — final QA sweep (retro/light themes on new surfaces, reduced-motion emulation, real mobile)
4. Epic 3 (Wellcore + Mattermost case study decks) · Epic 4 remainder (back-button history, keyboard access, contrast) · Epic 5 (PostHog analytics) · Epic 6 remainder (README, lint, asset diet)

## Blocked on Don

- Run `gemini` once to re-authenticate (for sprite generation)
