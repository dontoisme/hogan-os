# HoganOS Visual Style Guide

> Use this as a reference for visual design decisions and as a prompt for AI image generation (ChatGPT/DALL-E, Midjourney, etc.)

---

## Brand Essence

**HoganOS** is a personal portfolio website using a desktop OS metaphor (Windows 95/macOS inspired) to showcase Don Hogan's work as a Growth Product Manager.

### The Vibe

| Element | Description |
|---------|-------------|
| **Outdoorsy/Adventure** | Mountain biking, rock climbing, fly fishing, Austin TX hill country, trails |
| **Puzzle-Solving/Experimentation** | A/B testing, data visualization, connecting dots, discovery |
| **Growth/Momentum** | Upward trajectories, funnels, compounding, seeds becoming trees |

### Personality
- "Just a dude having fun"
- Technically capable but not taking himself too seriously
- Douglas Adams energy — curious, witty, slightly absurdist
- Bikes trails on weekends, runs A/B tests on weekdays

---

## Color Palette

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Blue | `#1e3a5f` | Primary backgrounds, headers |
| Warm Orange | `#e07a3d` | Accent, CTAs, highlights |
| Forest Green | `#2d5a45` | Success states, growth indicators |

### Secondary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Terracotta | `#c45d3a` | Warm accent variation |
| Purple/Dusk | `#6b5b95` | Secondary accent, links |
| Cream/Sand | `#f5f0e6` | Light backgrounds |
| Slate | `#4a5568` | Text, subtle UI elements |

### Mood
- Modern but warm, not corporate
- Earth tones grounded by bold accents
- Golden hour Austin hill country feeling

---

## Wallpapers

Desktop wallpapers should be **subtle enough that icons and windows are readable on top**, but visually interesting. 16:9 aspect ratio (1920x1080 or 2x for retina).

### Concept A: "Trail Map"
Abstract topographic map lines blending into a subtle data visualization / funnel chart. Hills become metrics trending upward. Muted earth tones with accent color highlights on key "peaks."

### Concept B: "Growth Rings"
Cross-section of a tree trunk where the growth rings subtly transform into concentric circles of a target/bullseye or ripples in water. Represents organic growth and hitting targets.

### Concept C: "Austin Gradient"
Minimalist gradient inspired by Austin hill country at golden hour — layers of rolling hills fading into the distance, abstract and geometric. Warm oranges to cool purples.

### Concept D: "Experiment Grid"
Subtle grid pattern (like graph paper) with organic elements growing through it — vines, roots, or water flowing. Represents structured experimentation meeting organic growth.

---

## Icon Set

Style: **Outlined/duotone, friendly but professional, slight hand-drawn or organic feel**. Each icon conceptually 64x64px.

| Icon Name | File | Concept |
|-----------|------|---------|
| Projects | `icon-projects.svg` | Folder with a compass or trail marker |
| Resume | `icon-resume.svg` | Document with a small mountain peak or upward arrow |
| Experience | `icon-experience.svg` | Winding trail/path or river from bird's eye view |
| Job Journal | `icon-journal.svg` | Notebook with a small chart/graph element |
| Contact | `icon-contact.svg` | Speech bubble with a campfire or signal fire |
| About Me | `icon-about.svg` | Person silhouette with binoculars or on a bike |
| Settings | `icon-settings.svg` | Gear made of leaves or natural elements |
| Start Here | `icon-start.svg` | Trailhead sign or "You Are Here" map marker |

---

## Logo

The HoganOS logo should work as:
- A small favicon (simple, recognizable at 32x32)
- A larger wordmark for the Start menu
- A standalone mark for social/branding

### Concept A: "H" as Trail/Peak
The letter H where the crossbar is a mountain ridge or trail path, with subtle upward momentum.

### Concept B: "Window to the Outdoors"
A classic OS window shape (rectangle with title bar) but the "content" area shows a minimalist mountain/trail scene.

### Concept C: "Growth Terminal"
Retro terminal cursor "_" or ">" combined with an organic growth element (sprout, ring, or upward line).

---

## Typography

### Current Stack (via Next.js)
- **Primary:** Geist Sans — clean, modern, readable
- **Mono:** Geist Mono — for code snippets, terminal elements

### Hierarchy
- Window titles: Semi-bold, slightly larger
- Body text: Regular weight, comfortable reading size
- Labels/Captions: Smaller, muted color

---

## UI Elements

### Windows
- Rounded corners (8px)
- Subtle shadow for depth
- Title bar with traffic light controls (close, minimize, maximize)
- Draggable by title bar

### Buttons
- Primary: Accent color background, white text
- Secondary: Outlined, subtle hover state
- Hover states should feel responsive but not jarring

### Cards/Containers
- Subtle borders using CSS variables
- Background variations for hierarchy (bg-secondary, bg-tertiary)

---

## Themes

HoganOS supports three themes:

### Dark (Default)
- Deep blue/slate backgrounds
- Light text
- Accent colors pop

### Light
- Cream/white backgrounds
- Dark text
- Softer accent colors

### Retro
- More saturated, nostalgic colors
- Slightly more contrast
- Windows 95/98 energy

---

## Image Generation Prompt

Use this prompt with ChatGPT/DALL-E or similar:

```
Generate visual assets for HoganOS, a personal portfolio website with a desktop OS metaphor. The vibe blends:

- Outdoorsy/Adventure: Mountain biking, rock climbing, fly fishing, Austin TX hill country
- Puzzle-Solving: A/B testing, data visualization, experimentation
- Growth/Momentum: Upward trajectories, funnels, organic growth

Color palette: Deep blues, warm oranges/terracotta, forest greens, purple accents. Modern but warm, not corporate.

[Then specify: wallpaper, icon set, or logo from the concepts above]
```

---

## File Structure

```
public/
├── images/
│   ├── wallpapers/
│   │   ├── trail-map.png
│   │   ├── growth-rings.png
│   │   ├── austin-gradient.png
│   │   └── experiment-grid.png
│   ├── icons/
│   │   ├── icon-projects.svg
│   │   ├── icon-resume.svg
│   │   └── ...
│   └── logo/
│       ├── hoganos-logo.svg
│       ├── hoganos-favicon.ico
│       └── hoganos-wordmark.svg
```

---

## Don'ts

- Avoid generic corporate/tech stock imagery
- No flat, lifeless gradients
- Don't make it look like every other portfolio site
- Avoid overly busy patterns that compete with UI elements

---

*Last updated: January 2026*
