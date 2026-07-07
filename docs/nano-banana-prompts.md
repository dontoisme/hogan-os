# Dingo Mascot Sprite Prompts (nano banana)

Saved BEFORE generation per rate-limit protocol: sequential only, 60s wait on
RESOURCE_EXHAUSTED, stop after 2 consecutive failures, cap 5 per session.

**Shared style block (prepend to every prompt):**
> Retro pixel-art sprite of a friendly dingo (Australian wild dog), warm tan/ginger
> fur with cream chest and muzzle, alert pointed ears, curled tail. Chunky 48x48
> pixel-art style like a 16-bit SNES game sprite, thick dark outlines, limited
> palette (5-6 colors), single subtle orange accent. Plain solid white background
> (will be made transparent), full body visible, centered, no text, no watermark.

| # | File | Pose prompt (append to style block) |
|---|------|-------------------------------------|
| 1 | `dingo-idle.png` | Sitting upright facing the viewer, calm friendly expression, tail wrapped around front paws. |
| 2 | `dingo-wave.png` | Sitting facing the viewer with one front paw raised in a cheerful wave, mouth slightly open in a happy pant. |
| 3 | `dingo-walk-1.png` | Side profile facing right, mid-trot, front-left and back-right legs extended (walk cycle frame A). |
| 4 | `dingo-walk-2.png` | Side profile facing right, mid-trot, opposite legs extended, body slightly lower (walk cycle frame B — must match frame A's size and proportions exactly). |
| 5 | `dingo-sleep.png` | Curled up asleep in a ball, eyes closed, tail over nose, small "z z z" pixels floating above (pixel z's allowed, no other text). |
| 6 | `dingo-confused.png` | Sitting facing the viewer with head tilted sharply to one side, one ear flopped, a pixel-art question mark floating beside its head. |

Post-processing per image: remove white background to transparency, trim, save to
`public/images/dingo/<name>.png`. Rendered in-app at 2-3x with `image-rendering: pixelated`.

## Status
- [x] ALL 6 DONE — 2026-07-07, via a single ChatGPT-generated sprite sheet
  (`docs/dingo-sprite-sheet.png`) instead of nano banana (which stayed
  quota-blocked). Sliced/keyed/normalized with ImageMagick into
  `public/images/dingo/`. These prompts kept for future sprite additions.
