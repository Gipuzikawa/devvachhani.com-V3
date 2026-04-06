# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **static HTML/CSS/JS portfolio website** for Alex Chen — a high school UI/UX designer. No build system, no package manager, no backend. Every page is a self-contained `.html` file served directly.

## File Structure

```
/                          ← Production site (open index.html in browser)
├── index.html             ← Home (hero + carousel + skills + accomplishments)
├── projects.html          ← Projects timeline (vertical, alternating left/right)
├── articles.html          ← Articles list + featured bento grid
├── article.html           ← Single article template (reusable)
├── contact.html           ← Contact form with JS success state
├── me.html                ← About/bio (education + interests bento)
└── stitch_ambitious_student_portfolio/
    ├── */code.html        ← Original Google Stitch exports (source reference only)
    ├── */screen.png       ← Design screenshots
    ├── kinetic_ledger/DESIGN.md        ← Kinetic Professional design spec
    └── kinetic_ledger_soft/DESIGN.md   ← Kinetic Cobalt design spec (active)
```

The `stitch_ambitious_student_portfolio/` folder is **source reference only** — do not edit those files or link to them. All production work lives in the root `.html` files.

## Development

Open any `.html` file directly in a browser — no server needed. For live reload during development, a simple static server works (e.g. `python -m http.server 8080` or VS Code Live Server).

## Architecture

### Every page is self-contained

Each HTML file includes:
- Tailwind CSS via CDN (`https://cdn.tailwindcss.com?plugins=forms,container-queries`)
- Tailwind config in an inline `<script id="tailwind-config">` block (identical across all pages)
- Google Fonts: Plus Jakarta Sans + Inter + Material Symbols Outlined
- All page CSS in a `<style>` block
- All JS inline before `</body>`

No shared CSS file. No shared JS file. This is intentional — keeps deployment trivially simple.

### Navigation

Every page uses the same **pill-style sticky nav** (`rounded-full`, `max-w-5xl`, `sticky top-4`). Nav links: Home → `index.html`, Projects → `projects.html`, Articles → `articles.html`, Me → `me.html`, Contact → `contact.html`. The mobile menu is a full-screen overlay toggled via inline JS using `element.style.display`.

### Design System (Kinetic Cobalt)

The active design spec is `stitch_ambitious_student_portfolio/kinetic_ledger_soft/DESIGN.md`. Key rules:

- **Colors**: Primary `#0052FF`, background `#0b0c10`. Surface hierarchy: `surface` (#111318) → `surface-container-low` (#1a1c1e) → `surface-container` (#1e1f23) → `surface-container-high` (#282a2f) → `surface-container-highest` (#33353a)
- **No-Line Rule**: Separate sections by shifting background color, never with borders or `<hr>`. Use `border-outline-variant/10` only as a "ghost border" when absolute separation is needed.
- **Typography**: Plus Jakarta Sans for all headlines (`font-headline`), Inter for body/labels (`font-body`, `font-label`). Hero text uses `font-extrabold tracking-tighter` at large scale.
- **Glassmorphism**: `rgba(40, 42, 47, 0.4)` + `backdrop-blur-24px` for floating panels (`.glass-panel` class).
- **Buttons**: Pill-shaped (`rounded-full`). Primary = solid `bg-primary`. Hover states use `scale-105`, active states `scale-95`.
- **Elevation**: Achieved through tonal layering (changing surface tier), not shadows. Shadows only for ambient glow: `shadow-primary/10` or `shadow-2xl`.
- **Bento grids**: Use `grid-cols-12` with varying `col-span` values to create asymmetric, editorial layouts.

### Tailwind Config

The full color token set, border-radius overrides (`DEFAULT: 1rem`, `lg: 2rem`, `xl: 3rem`, `full: 9999px`), and font families are defined in the inline `tailwind.config` script on every page. When adding a new page, copy this block verbatim from any existing page.

### Images

All images are Google Aida public CDN URLs (`lh3.googleusercontent.com/aida-public/...`). These are external dependencies with no local fallback. Always use descriptive `alt` attributes.

### Contact Form

`contact.html` has a JS-only success state — the form submit handler calls `e.preventDefault()` and swaps `#form-container` / `#form-success` visibility. No backend, no email service wired up yet.

## Design Patterns to Follow

- **Mobile**: All pages use a hamburger button (`#mobile-menu-btn`) that triggers a full-screen overlay (`#mobile-menu`). Toggle via `element.style.display = 'flex'` / `'none'`.
- **Carousel** (index.html only): Auto-advances every 5s. Pauses on `mouseenter`/`touchstart`, resumes on `mouseleave`. Uses `translateX` on `#carousel-inner`. Dot opacity indicates active slide.
- **Hover interactions**: Cards typically go from `surface-container-low` → `surface-container` on hover. Images use `grayscale` → `grayscale-0` on hover or parent hover (`group-hover`).
- **Text glow**: `.text-glow` class applies a blue drop shadow to hero headlines.
- **Animate pulse**: Used for "available" / "live" status indicators (the green/blue dot next to availability copy).
