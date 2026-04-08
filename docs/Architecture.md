# Architecture

A technical reference for the `devvachhani.com-V3` portfolio site. Use this when you need to understand how the project is structured, how routing works, where data lives, or what a specific file does.

---

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| [Vite](https://vite.dev) | 8.x | Build tool and dev server |
| [React](https://react.dev) | 19.x | UI component library |
| [TypeScript](https://www.typescriptlang.org) | 6.x | Typed JavaScript |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first CSS framework |
| [React Router](https://reactrouter.com) | 7.x | Client-side routing (no page reloads) |
| [react-helmet-async](https://github.com/staylor/react-helmet-async) | 3.x | Per-page `<title>` and meta tags |

---

## Directory Structure

```
src/
├── main.tsx              ← App entry point (mounts React, loads fonts/CSS)
├── App.tsx               ← Router definition — all routes live here
├── declarations.d.ts     ← TypeScript declarations for non-TS assets
│
├── styles/
│   └── globals.css       ← Tailwind import + design tokens (@theme block)
│
├── types/
│   └── index.ts          ← All TypeScript interfaces (Project, Article, PersonData, etc.)
│
├── data/                 ← All site content — this is where you personalise the site
│   ├── person.ts         ← Your identity: name, bio, skills, education, interests
│   ├── projects.ts       ← Your project portfolio
│   └── articles.ts       ← Your articles/writing
│
├── assets/               ← Static assets (images, SVGs)
│
├── hooks/                ← Reusable custom React hooks
│   ├── useCarousel.ts    ← Auto-advancing carousel logic (used on Home)
│   ├── useReadingProgress.ts  ← Reading progress bar (used on Article page)
│   └── useIntersectionObserver.ts  ← Trigger animations on scroll
│
├── layouts/
│   └── PageLayout.tsx    ← Shared shell: Navbar + MobileMenuOverlay + Outlet + Footer
│
├── pages/                ← One file per route — the "screens" of the site
│   ├── HomePage.tsx
│   ├── ProjectsPage.tsx
│   ├── ArticlesPage.tsx
│   ├── ArticlePage.tsx   ← Single article view (uses URL slug)
│   ├── MePage.tsx
│   ├── ContactPage.tsx
│   └── NotFoundPage.tsx
│
└── components/           ← Reusable UI pieces, organised by feature area
    ├── layout/           ← Navbar, MobileMenuOverlay, Footer, ScrollToTop
    ├── ui/               ← Generic design-system atoms (Tag, GlassPanel, StatCard, etc.)
    ├── home/             ← HeroCarousel, BentoSkillsGrid, AccomplishmentCard
    ├── projects/         ← FilterBar, ProjectCard, ProjectTimeline
    ├── articles/         ← ArticleCard, FeaturedBento, ArticleFilterBar, NewsletterCard
    ├── article/          ← ReadingProgressBar, ProseArticle, RelatedArticlesSidebar
    ├── contact/          ← ContactForm
    └── me/               ← SkillBar, EducationTimeline, ActivitiesList, InterestsBento
```

### Other directories

| Directory | Purpose |
|-----------|---------|
| `public/` | Static files served as-is (favicon, icons) |
| `dist/` | Build output — created by `npm run build`, not checked in |
| `docs/` | Documentation (this file, plans, guides) |
| `stitch_ambitious_student_portfolio/` | Original design exports from Google Stitch. **Read-only reference — do not edit or link to these files.** |

---

## Entry Point Flow

```
index.html
  └── src/main.tsx          (StrictMode + HelmetProvider + fonts/CSS loaded)
        └── src/App.tsx     (BrowserRouter + Routes)
              └── PageLayout (Navbar, MobileMenuOverlay, Footer always visible)
                    └── <Outlet />  ← current page renders here
                          ├── HomePage
                          ├── ProjectsPage
                          ├── ArticlesPage
                          ├── ArticlePage  (slug-based)
                          ├── MePage
                          ├── ContactPage
                          └── NotFoundPage
```

`PageLayout` is the shared shell. Every page renders inside its `<Outlet />`. This means the Navbar, mobile menu, and Footer are never re-mounted — they persist across navigation.

---

## Routing Table

All routes are defined in `src/App.tsx`.

| URL path | Page component | Notes |
|----------|---------------|-------|
| `/` | `HomePage` | Index route |
| `/projects` | `ProjectsPage` | Timeline of all projects |
| `/articles` | `ArticlesPage` | Article list + featured bento |
| `/articles/:slug` | `ArticlePage` | Single article, slug matches `Article.slug` in data |
| `/contact` | `ContactPage` | Contact form (JS-only success state) |
| `/me` | `MePage` | Bio, skills, education, interests |
| `*` (catch-all) | `NotFoundPage` | 404 |

---

## Data Layer

All site content lives in `src/data/`. These are plain TypeScript files — no database, no API. When you change a value here and save, the site updates instantly (in dev mode).

Each data file exports a typed object or array. The types are defined in `src/types/index.ts`.

| File | Export | Type | Used on |
|------|--------|------|---------|
| `src/data/person.ts` | `person` | `PersonData` | MePage, HomePage (hero) |
| `src/data/projects.ts` | `projects` | `Project[]` | ProjectsPage |
| `src/data/articles.ts` | `articles` | `Article[]` | ArticlesPage, ArticlePage |

### Key types (`src/types/index.ts`)

| Interface | Key fields |
|-----------|-----------|
| `PersonData` | `name`, `role`, `location`, `bio`, `quickFacts`, `stats`, `skills`, `education`, `activities`, `interests`, `avatarUrl`, `portraitUrl` |
| `Project` | `id`, `year`, `category`, `title`, `description`, `tags`, `imageUrl`, `caseStudyUrl`, `accentColor`, `award` |
| `Article` | `id`, `slug`, `title`, `excerpt`, `category`, `readTime`, `date`, `imageUrl`, `featured`, `featuredSize`, `body`, `tags` |

---

## Component Catalogue

### `src/components/layout/`

| Component | Purpose |
|-----------|---------|
| `Navbar.tsx` | Pill-shaped sticky nav with logo, links, hamburger button |
| `MobileMenuOverlay.tsx` | Full-screen overlay for mobile navigation |
| `Footer.tsx` | Site footer with links and copyright |
| `ScrollToTop.tsx` | Scrolls window to top on route change |

### `src/components/ui/`

| Component | Purpose |
|-----------|---------|
| `Tag.tsx` | Pill-shaped label (`text`, `variant` prop) |
| `GlassPanel.tsx` | Container with glassmorphism effect |
| `StatCard.tsx` | Single stat display (`value`, `label` props) |
| `SectionIntro.tsx` | Section heading + optional subheading |
| `CTABanner.tsx` | Call-to-action section with link button |

### `src/components/home/`

| Component | Purpose |
|-----------|---------|
| `HeroCarousel.tsx` | Auto-advancing image carousel in the hero section |
| `BentoSkillsGrid.tsx` | Asymmetric grid showcasing design skills |
| `AccomplishmentCard.tsx` | Card for a single accomplishment/award |

### `src/components/projects/`

| Component | Purpose |
|-----------|---------|
| `FilterBar.tsx` | Category filter tabs (All / Research / Design / Dev) |
| `ProjectCard.tsx` | Single project card (image, title, tags, CTA) |
| `ProjectTimeline.tsx` | Vertical alternating timeline of project cards |

### `src/components/articles/`

| Component | Purpose |
|-----------|---------|
| `ArticleCard.tsx` | Compact article card for the list view |
| `FeaturedBento.tsx` | Asymmetric bento grid for featured articles |
| `ArticleFilterBar.tsx` | Category filter tabs for articles |
| `NewsletterCard.tsx` | Newsletter subscribe prompt card |

### `src/components/article/`

| Component | Purpose |
|-----------|---------|
| `ReadingProgressBar.tsx` | Thin bar at top tracking scroll progress |
| `ProseArticle.tsx` | Renders article `body` HTML with styled typography |
| `RelatedArticlesSidebar.tsx` | Sidebar with links to other articles |

### `src/components/contact/`

| Component | Purpose |
|-----------|---------|
| `ContactForm.tsx` | Contact form with JS-driven success state swap |

### `src/components/me/`

| Component | Purpose |
|-----------|---------|
| `SkillBar.tsx` | Animated progress bar for a skill |
| `EducationTimeline.tsx` | Timeline of education entries |
| `ActivitiesList.tsx` | List of extracurricular activities |
| `InterestsBento.tsx` | Bento grid of personal interests |

---

## Custom Hooks (`src/hooks/`)

| Hook | What it does | Used by |
|------|-------------|---------|
| `useCarousel.ts` | Manages slide index + auto-advance timer with pause/resume | `HeroCarousel.tsx` |
| `useReadingProgress.ts` | Tracks scroll percentage for reading progress bar | `ReadingProgressBar.tsx` |
| `useIntersectionObserver.ts` | Returns `true` when an element enters the viewport | Various components (scroll-triggered animations) |

---

## Design System

All design tokens are defined in the `@theme` block in `src/styles/globals.css` as CSS custom properties. Tailwind v4 reads these automatically — every token becomes a Tailwind class.

### Colour system

The palette uses a **surface hierarchy** — backgrounds get progressively lighter as they stack:

```
background (#0b0c10)          ← page background
  surface (#111318)
    surface-container-low (#1a1c1e)
      surface-container (#1e1f23)
        surface-container-high (#282a2f)
          surface-container-highest (#33353a)    ← topmost card surfaces
```

Key colours:
- `primary` — `#0052FF` (blue — links, CTAs, accents)
- `on-surface` — `#e2e2e6` (default text)
- `on-surface-variant` — `#c4c6d0` (secondary text)

### Typography

| Token | Font | Usage |
|-------|------|-------|
| `font-headline` | Plus Jakarta Sans Variable | All headings |
| `font-body` | Inter | Body text, paragraphs |
| `font-label` | Inter | Labels, tags, small UI text |

### Border radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded` (default) | `1rem` | Standard cards |
| `rounded-lg` | `2rem` | Large cards |
| `rounded-xl` | `3rem` | Hero elements |
| `rounded-full` | `9999px` | Pills (nav, buttons, tags) |

### Utility classes (defined in `globals.css`)

| Class | Effect |
|-------|--------|
| `.glass-panel` | `rgba(40,42,47,0.4)` background + `backdrop-blur` |
| `.text-glow` | Blue drop shadow on text (used on hero headlines) |

---

## Build Commands

```bash
npm run dev       # Start local dev server at http://localhost:5173 (hot reload)
npm run build     # Type-check + compile to dist/
npm run preview   # Serve the built dist/ locally
npm run lint      # Run ESLint
```

---

## `stitch_ambitious_student_portfolio/`

This folder contains the original Google Stitch AI design exports that were used as the visual reference during the React build. It includes screenshot PNGs and design spec markdown files.

**You can ignore this folder entirely.** It is not linked to or imported by any production code. The active design spec is `stitch_ambitious_student_portfolio/kinetic_ledger_soft/DESIGN.md` if you ever need to look up a design decision.
