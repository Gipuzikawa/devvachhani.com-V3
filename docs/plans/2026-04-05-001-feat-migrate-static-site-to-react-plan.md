---
title: "feat: Migrate static HTML portfolio to React + Vite + Tailwind v4"
type: feat
status: active
date: 2026-04-05
deepened: 2026-04-05
---

# feat: Migrate static HTML portfolio to React + Vite + Tailwind v4

## Overview

Convert 6 self-contained static HTML files into a properly structured React SPA. The visual output must be pixel-faithful to the existing Kinetic Cobalt design. Mechanical conversion units are delegated to Codex (high reasoning). Architectural decisions and integration are reserved for human/Claude review.

## Problem Frame

**Note on scope:** The functional gaps (duplicated nav, dead filter bars, no contact backend) could theoretically be patched with minimal vanilla JS. This plan instead migrates to React — the driver is long-term developer experience and codebase maintainability, not purely the listed functional deficiencies. That is an accepted and intentional choice.

The site was built as a Google Stitch export — each page is a ~300–500 line monolithic HTML file with inline Tailwind CDN config, duplicated nav/footer HTML, and vanilla JS IIFEs. Updating one nav link requires editing 6 files. The `projects.html` filter bar has `data-filter` attributes on the buttons but no JS event listener wired — dead code. The `articles.html` filter bar is purely decorative markup with no data attributes at all, and the inline category labels on article cards ("Sustainability", "Psychology", "Ethics", etc.) do not match the filter button labels ("All", "Design", "Tech", "Culture") — both the attribute system and the category taxonomy need to be established in React. The contact form has no submission backend. Moving to React resolves all of these and makes the codebase maintainable.

## Requirements Trace

**Design & Visual Fidelity**
- R1. All 6 pages render identically to their HTML counterparts (design fidelity)

**Navigation & Routing**
- R2. Navigation links update the URL and render the correct page without a full reload
- R3. Mobile hamburger menu works on all pages

**Client Interactions**
- R4. Hero carousel (home) auto-advances, pauses on hover/touch, resumes on leave
- R5. Projects and Articles filter bars actually filter content client-side (currently dead code)

**Backend & Integration**
- R6. Contact form submits to a real email endpoint (Formspree free tier) and shows success state

**SEO & Metadata**
- R7. Each page has a correct `<title>` and `<meta description>` for SEO

**Build & Deployment**
- R8. `npm run build` produces a static bundle deployable to Netlify/Vercel with no server

**Data Architecture**
- R9. Content (projects, articles, person bio) lives in typed `.ts` data files, not JSX

## Scope Boundaries

- No CMS, no database, no API routes — remains a fully static site
- No authentication, no user accounts
- No SSR/SSG framework (Astro, Next.js) — Vite SPA with `react-helmet-async`. **Known limitation:** meta tags only load after JS executes, so social preview scrapers (LinkedIn, Slack, Twitter) will not see og:title/og:description. Googlebot does index JS-rendered meta correctly. This limitation is accepted for this phase; a prerendering pass can be added later if social sharing metadata becomes important.
- Article pages are static templates; no markdown-file-based article system in this phase
- Design tokens are not changed — Kinetic Cobalt palette is migrated as-is
- Image URLs remain external CDN links; replacing them with real photos is out of scope

## Context & Research

### Relevant Code and Patterns

- All 6 HTML files share an **identical Tailwind config block** (verbatim) — single migration target
- **4 shared inline CSS rules** present on every page: `.glass-panel`, `.text-glow`, `.material-symbols-outlined`, `body` base styles — move to `src/styles/globals.css`
- **Nav + MobileMenu + Footer** HTML is copy-pasted verbatim across all 6 files — highest-impact deduplication
- **Carousel JS** (`index.html`): uses `clearInterval`/`setInterval` stored in `autoPlay` var, `mouseenter`/`mouseleave` handlers, and `goToSlide(i)` called via inline `onclick` — has a bug: `touchstart` stops autoplay but there is no `touchend` resume. Must be fixed in the React migration.
- **Filter bars**: `projects.html` has `data-filter` attributes on buttons with no JS wired — dead UI with a clear attribute system to port. `articles.html` has plain pill buttons with no data attributes and article card categories ("Sustainability", "Psychology", "Ethics", "Technology", "Design Systems", "Cybersecurity", "Culture", "UX Writing") that do not map to the filter labels ("All", "Design", "Tech", "Culture"). The category taxonomy and mapping must be defined in Unit 3, not extracted from HTML.
- **Skill bar animation** (`me.html`): `transition: width 1s ease-out` triggered once on page load via `setTimeout` — needs an `IntersectionObserver` hook in React for proper scroll-triggered animation
- **All images** are external `lh3.googleusercontent.com/aida-public/` URLs. Keep as-is; they are valid `src` values in JSX

### Institutional Learnings

- No `docs/solutions/` exists yet — this migration is the founding work

### External References

- Tailwind v4 with Vite: `@tailwindcss/vite` plugin replaces PostCSS setup; config moves from `tailwind.config.js` into CSS `@theme {}` block
- React Router v7 library mode: `<BrowserRouter>` + `<Routes>` + `<Route>` — no file-based routing needed at this scale
- Fontsource for self-hosted fonts: `@fontsource-variable/plus-jakarta-sans`, `@fontsource/inter`
- Material Symbols: no stable self-hosted option — keep Google Fonts `<link>` in `index.html`
- Formspree: free tier handles 50 submissions/month; `fetch` POST to `https://formspree.io/f/{id}` returns JSON — no server needed

## Key Technical Decisions

- **Tailwind v4, not v3**: Tailwind v4 is the current standard (Jan 2025). The `@tailwindcss/vite` plugin is the preferred integration. Config migrates to `@theme {}` in `src/styles/globals.css`. The existing 40+ color tokens use hyphenated names (`on-surface-variant`) which map directly to `--color-on-surface-variant` CSS custom properties and generate the same utility classes (`bg-on-surface-variant`, `text-on-surface-variant`). Risk: `borderRadius.DEFAULT` key → use `--radius-DEFAULT` in v4. Fallback: if v4 token mapping breaks any existing utility class, pin to v3 and use `tailwind.config.ts` with the same token map.
- **React Router v7 library mode, not framework mode**: 6 pages, no data loaders, no SSR. `<BrowserRouter>` + nested `<Route path="/" element={<Layout />}>` with page routes as children. Add a `_redirects` file for Netlify (`/* /index.html 200`) to support direct URL access.
- **`react-helmet-async` for per-page SEO**: `<HelmetProvider>` in `App.tsx`, `<Helmet>` in each page component. This is the lightweight choice over Next.js-style head management.
- **Formspree for contact form**: The simplest real email backend for a static site. No environment variable needed for the endpoint ID (it is public by design). Wire the existing form fields (name, email, subject, message) to a `fetch` POST. Show the existing success state on `200`; show an inline error message on failure.
- **Fontsource for text fonts, CDN for Material Symbols**: Self-hosting Plus Jakarta Sans and Inter is more professional and privacy-respecting. Material Symbols variable font has no maintained npm package — keep the `<link>` in `index.html`.
- **`useState` + `useRef` for carousel**: Use `useRef` for the `setInterval` handle (not `useState`) to avoid triggering re-renders on interval changes. `currentSlide` is `useState`. Fix the missing `touchend` resume handler from the HTML version.
- **`IntersectionObserver` hook for skill bar animation**: The HTML version animates on `setTimeout(250ms)` — this fires regardless of scroll position. A proper `useIntersectionObserver` hook fires once when the element enters the viewport.
- **Content in typed `.ts` data files**: All portfolio content (projects, articles, bio) lives in `src/data/`. Pages import the data and pass it to components as props. No content hardcoded in JSX.
- **Codex delegation for mechanical units**: Units that are pure scaffold, config migration, HTML→JSX conversion, or data extraction are marked `Execution target: external-delegate`. Codex should be invoked with the o3 or o4 reasoning model. Units involving architectural wiring, hook design, or integration are reserved for Claude/human review.

## Open Questions

### Resolved During Planning

- **Which Tailwind version?** v4. Rationale: it is the 2026 standard; the `@theme` CSS variable approach is cleaner than duplicating a JS config; the existing token names map directly to v4 CSS custom property naming.
- **Which router?** React Router v7 library mode. Rationale: no file-based routing overhead needed for 6 pages; zero new concepts vs v6.
- **Contact form backend?** Formspree free tier. Rationale: zero server cost, static-friendly, handles 50 submissions/month which is sufficient for a student portfolio.
- **Self-host fonts?** Yes for Plus Jakarta Sans + Inter (Fontsource). No for Material Symbols (keep CDN link).
- **SPA vs SSG?** SPA via Vite. Rationale: `react-helmet-async` handles the SEO requirement sufficiently; Astro would require rewriting components in a new paradigm.

### Deferred to Implementation

- **Formspree form ID**: Create a Formspree account, register the form endpoint, and substitute the `{id}` in the fetch URL. Cannot be pre-determined in planning.
- **Exact v4 `--radius-DEFAULT` behaviour**: Verify that `rounded` (no suffix) generates correctly from `--radius-DEFAULT: 1rem` during scaffold setup. If not, use `--radius-base` or hardcode the value.
- **`@tailwindcss/forms` plugin in v4**: The plugin is imported as `@plugin "@tailwindcss/forms"` in the CSS file in v4. Verify this works with the form inputs in `contact.html` — the plugin resets native input styles that the contact form relies on.
- **Container queries plugin in v4**: ~~Deferred~~ **Resolved: drop it.** The Tailwind CDN in the HTML was loaded with `?plugins=forms,container-queries`, but a search of all 6 HTML files confirms zero `@container` rules are used anywhere. The plugin is included by the CDN default, not by intent. Do not install `@tailwindcss/container-queries` in the React project.

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

```
App.tsx
└── HelmetProvider                          (react-helmet-async)
    └── BrowserRouter
        └── Routes
            └── Route path="/"  element=<PageLayout>
                    ├── index     element=<HomePage>
                    ├── projects  element=<ProjectsPage>
                    ├── articles  element=<ArticlesPage>
                    ├── articles/:slug  element=<ArticlePage>
                    ├── contact   element=<ContactPage>
                    └── me        element=<MePage>

PageLayout.tsx
├── <Navbar currentPage={...} />             shared across all routes
├── <MobileMenuOverlay isOpen onClose />     controlled by Navbar state
├── <Outlet />                               React Router page slot
└── <Footer />                               shared across all routes

Data flow: pages import from src/data/, pass typed arrays to components as props.
No prop drilling beyond one level — each page owns its data imports.
```

## Implementation Units

---

### Phase 1 — Foundation

- [ ] **Unit 1: Scaffold Vite + React + TS project**

**Goal:** Create the base project with all dependencies installed and folder structure established.

**Requirements:** R8

**Dependencies:** None

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`
- Create: `src/main.tsx`, `src/App.tsx`
- Create: `src/styles/globals.css`
- Create: `src/components/`, `src/pages/`, `src/layouts/`, `src/data/`, `src/hooks/`, `src/assets/`
- Create: `public/_redirects` (Netlify SPA routing)
- Create: `index.html` (Vite entry, includes Material Symbols `<link>`, Fontsource handled via npm)

**Approach:**
- **Pre-step (required before scaffold):** Move all 6 existing root HTML files (`index.html`, `projects.html`, `articles.html`, `article.html`, `contact.html`, `me.html`) to `stitch_ambitious_student_portfolio/html_source_backup/`. Running `npm create vite@latest .` in a non-empty directory with conflicting filenames will either prompt interactively (blocking Codex) or overwrite files. This pre-step ensures a clean scaffold target while preserving all source files for reference.
- Run `npm create vite@latest . -- --template react-ts` in the project root
- Install: `react-router-dom`, `react-helmet-async`, `@tailwindcss/vite`, `tailwindcss`, `@tailwindcss/forms`, `@fontsource-variable/plus-jakarta-sans`, `@fontsource/inter`
- `vite.config.ts` adds both `react()` and `tailwindcss()` plugins
- `public/_redirects` contains `/* /index.html 200`
- The existing `stitch_ambitious_student_portfolio/` directory is untouched

**Execution note:** Execution target: external-delegate. Codex should scaffold, install deps, and create the directory skeleton. No component code in this unit — just the project shell.

**Test scenarios:**
- Happy path: `npm run dev` starts without errors; `localhost:5173` serves a blank page with no console errors
- Happy path: `npm run build` completes and `dist/index.html` exists
- Edge case: All 6 production HTML files are successfully moved to `stitch_ambitious_student_portfolio/html_source_backup/` before scaffold runs

**Verification:** `npm run dev` and `npm run build` both succeed from a clean install.

---

- [ ] **Unit 2: Tailwind v4 design tokens + global CSS**

**Goal:** Migrate the inline `tailwind.config` block (identical across all 6 HTML files) to `@theme {}` in `src/styles/globals.css`. Establish all shared component classes.

**Requirements:** R1

**Dependencies:** Unit 1

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `vite.config.ts` (confirm `@tailwindcss/vite` plugin, add `@tailwindcss/forms` plugin)

**Approach:**
- `globals.css` structure:
  ```
  @import "tailwindcss";
  @plugin "@tailwindcss/forms";

  /* Tailwind v4 equivalent of darkMode: "class" — all existing HTML uses <html class="dark"> */
  @custom-variant dark (&:is(.dark *));

  @theme {
    /* 40+ color tokens from the existing config */
    --color-background: #0b0c10;
    --color-primary: #0052FF;
    /* ... all tokens ... */

    /* Border radius */
    --radius-DEFAULT: 1rem;
    --radius-lg: 2rem;
    --radius-xl: 3rem;
    --radius-full: 9999px;

    /* Fonts */
    --font-headline: "Plus Jakarta Sans Variable", sans-serif;
    --font-body: "Inter", sans-serif;
    --font-label: "Inter", sans-serif;
  }

  @layer base {
    body { background-color: #0b0c10; color: #e2e2e6; font-family: theme(--font-body); }
    ::selection { background-color: theme(--color-primary-container); color: theme(--color-on-primary-container); }
  }

  @layer utilities {
    .glass-panel { background: rgba(40, 42, 47, 0.4); backdrop-filter: blur(24px); }
    .text-glow { text-shadow: 0 0 20px rgba(0, 82, 255, 0.3); }
    .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
  }
  ```
- Import `globals.css` in `src/main.tsx`
- Import Fontsource in `src/main.tsx`: `@fontsource-variable/plus-jakarta-sans` and `@fontsource/inter/400.css`, `500.css`, `600.css`

**Execution note:** Execution target: external-delegate. Codex should perform the mechanical token migration. The token list is defined above in Key Technical Decisions — all 40+ colors from the existing config verbatim.

**Patterns to follow:**
- Existing Tailwind config in any of the 6 root HTML files — the token names must be identical so existing class names in components work without modification

**Test scenarios:**
- Happy path: `bg-primary` renders as `#0052FF` in the browser
- Happy path: `font-headline` applies Plus Jakarta Sans
- Happy path: `glass-panel` class applies `backdrop-filter: blur(24px)`
- Edge case: `rounded` (no suffix) renders as `1rem` (tests `--radius-DEFAULT`)
- Edge case: `rounded-full` renders as `9999px`
- Error path: if `--radius-DEFAULT` does not work, deferred note says to use `rounded-[1rem]` as a fallback while the v4 issue is resolved

**Verification:** A test component with `className="bg-primary rounded font-headline glass-panel text-glow"` visually matches the design system in browser.

---

- [ ] **Unit 3: Typed data files**

**Goal:** Extract all hardcoded portfolio content from HTML into typed TypeScript data files.

**Requirements:** R9

**Dependencies:** Unit 1

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/articles.ts`
- Create: `src/data/person.ts`
- Create: `src/types/index.ts` (shared interfaces)

**Approach:**

`src/types/index.ts` defines: `Project`, `Article`, `PersonData` interfaces. **Note:** `NavLink` and `SubjectOption` interfaces are not needed — nav links are inlined in `Navbar.tsx` and subject options are inlined in `ContactForm.tsx` (see Unit 4 and Unit 10 approaches).

`src/data/projects.ts` — 4 projects: Neural Synthesis Interface (2024, Research), Atmosphere.IO (2024, Design), Lumina Reading Aid (2023, Design), Civic Connect (2023, Dev). Each entry: `id`, `year`, `category`, `title`, `description`, `tags[]`, `duration`, `team`, `imageUrl | null`, `placeholderIcon?`, `caseStudyUrl`.

`src/data/articles.ts` — 8 articles with `id`, `slug`, `title`, `excerpt`, `category`, `readTime`, `date`, `imageUrl | null`, `featured: boolean`, `featuredSize?: 'large' | 'side'`, `body: string`.

**Slug convention:** The HTML source has no slugs — all article links point to `article.html` with no id or path. Slugs must be generated by kebab-casing article titles: `slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')`. The test scenario at `/articles/architectural-dynamics` corresponds to the article titled "Architectural Dynamics: The Future of User Interfaces".

**Featured articles (must match the `articles.html` bento layout):** Article 1 (Architectural Dynamics) → `featured: true, featuredSize: 'large'`. Article 2 (Cognitive Dissonance in Modern UX) → `featured: true, featuredSize: 'side'`. Article 3 (The Ethics of Persuasive Design) → `featured: true, featuredSize: 'side'`. Articles 4–8 → `featured: false`.

**Article body:** The `body` field contains the full prose HTML for the single article that exists in `article.html`. Codex should extract it verbatim. For articles 2–8 (which have no detail page in the HTML source), set `body: ''` as an acknowledged placeholder — the route will match but `ProseArticle` renders nothing until body content is added.

**Category taxonomy for articles filter:** Map each article's inline category label to one of the 4 filter values: `'Design'` | `'Tech'` | `'Culture'`. Codex should assign based on content. The filter bar renders these 4 buttons: "All", "Design", "Tech", "Culture".

`src/data/person.ts` — drives `me.html`: bio paragraphs, stats array, skills array (name + percent + color), education timeline, activities, interests bento items.

**Nav links (no separate data file):** Define `NAV_LINKS` as a `const` array directly inside `Navbar.tsx` — 5 items, never changes at runtime, only consumed by `Navbar.tsx` and `MobileMenuOverlay.tsx`. No `src/data/nav.ts` needed.

**Contact form constants (no separate data file):** Define `SUBJECT_OPTIONS` and `AVAILABILITY` as `const` arrays directly inside `ContactForm.tsx` — these are form UI constants, not portfolio content. No `src/data/contact.ts` needed.

**Execution note:** Execution target: external-delegate. Codex should read the 6 HTML files directly to extract content — do not invent placeholder text.

**Test scenarios:**
- Happy path: `projects.ts` exports exactly 4 items matching the HTML source
- Happy path: `articles.ts` exports exactly 8 items; 1 is `featuredSize: 'large'`, 2 are `featuredSize: 'side'`
- Edge case: TypeScript compiler (`tsc --noEmit`) reports zero errors on the data files

**Verification:** `tsc --noEmit` passes with zero errors. Each data file's array length matches the corresponding HTML page's item count.

---

### Phase 2 — Shared Components

- [ ] **Unit 4: Layout components (Navbar, MobileMenu, Footer, PageLayout)**

**Goal:** Extract the shared nav, mobile overlay, and footer into reusable React components. Wire mobile menu open/close state.

**Requirements:** R2, R3

**Dependencies:** Units 1, 2, 3

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/MobileMenuOverlay.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/layouts/PageLayout.tsx`

**Approach:**
- `PageLayout.tsx`: renders `<Navbar>`, `<MobileMenuOverlay>`, `<Outlet />`, `<Footer />`. Holds `const [menuOpen, setMenuOpen] = useState(false)`. Passes `menuOpen` and `setMenuOpen` down. Locks body scroll via `useEffect` when `menuOpen` is true (`document.body.style.overflow = menuOpen ? 'hidden' : ''`).
- `Navbar.tsx`: receives `currentPage` prop (or reads from `useLocation()` hook — prefer `useLocation()` so the page doesn't need to pass a prop). Maps the current pathname to the active nav link. Renders hamburger button that calls `onMenuOpen()`.
- `MobileMenuOverlay.tsx`: receives `isOpen` + `onClose`. Conditionally renders (or uses CSS `opacity`/`pointer-events` for animation). Same 5 nav links + "Hire Me" CTA.
- `Footer.tsx`: no props. Static wordmark + copyright + social links.
- Active link detection: compare `location.pathname` to each link's `href` using React Router's `useLocation()`. Active class: `text-primary font-bold border-b-2 border-primary pb-1`. Inactive: `text-on-surface-variant hover:text-white transition-colors hover:scale-105 duration-300`.

**Execution note:** Execution target: external-delegate. Codex can do the mechanical HTML-to-JSX conversion and state wiring. Use high reasoning model to correctly handle the `useLocation` active link logic.

**Patterns to follow:**
- Nav HTML from any of the 6 root HTML files — exact class names must be preserved
- `useLocation()` from `react-router-dom` for active state detection

**Test scenarios:**
- Happy path: visiting `/projects` highlights the Projects nav link
- Happy path: hamburger button opens the mobile menu overlay
- Happy path: clicking the close button or a nav link closes the overlay
- Happy path: clicking a mobile menu link navigates and closes the menu
- Happy path: body scroll is locked when menu is open
- Edge case: visiting `/articles/some-slug` should highlight the Articles link (pathname `startsWith('/articles')`)
- Edge case: `Footer` renders three social links all pointing to `#` (no real URLs yet)

**Verification:** All 5 nav links highlight correctly when navigating between routes. Mobile menu opens and closes on all viewport sizes.

---

- [ ] **Unit 5: Shared UI primitives**

**Goal:** Build the small reusable components that appear across multiple pages.

**Requirements:** R1

**Dependencies:** Units 1, 2

**Files:**
- Create: `src/components/ui/Tag.tsx`
- Create: `src/components/ui/GlassPanel.tsx`
- Create: `src/components/ui/StatCard.tsx`
- Create: `src/components/ui/SectionIntro.tsx`
- Create: `src/components/ui/CTABanner.tsx`

**Approach:**
- `Tag.tsx`: props `text: string`, `variant: 'primary' | 'tertiary' | 'secondary' | 'neutral'`. Maps variant to class sets. Primary: `bg-primary/10 text-primary-dim`. Tertiary: `bg-tertiary/10 text-tertiary-dim`. Secondary: `bg-secondary/10 text-secondary-dim`. Neutral: `bg-surface-container-high text-on-surface-variant`. Shape: `rounded-full px-3 py-1 text-xs font-medium`.
- `GlassPanel.tsx`: wrapper `<div>` applying `glass-panel` utility + optional `border border-outline-variant/10` via `bordered?: boolean` prop. Passes through `className` and `children`.
- `StatCard.tsx`: props `value: string`, `label: string`. Renders `rounded-2xl bg-surface-container-high p-5 text-center` with a large primary-colored value and subdued label.
- `SectionIntro.tsx`: props `label: string`, `heading: ReactNode` (allows gradient spans), `subtitle?: string`. Renders the label/heading/subtitle triplet pattern.
- `CTABanner.tsx`: props `heading: ReactNode`, `body: string`, `primaryLabel: string`, `primaryHref: string`, `secondaryLabel?: string`, `secondaryHref?: string`. Renders the glass CTA card with gradient background and pill buttons.

**Execution note:** Execution target: external-delegate.

**Test scenarios:**
- Happy path: `<Tag text="Design" variant="primary" />` renders with `bg-primary/10 text-primary-dim` classes
- Happy path: `<GlassPanel bordered>` renders with both `glass-panel` and `border border-outline-variant/10`
- Edge case: `<CTABanner>` without `secondaryLabel` renders only the primary button

**Verification:** Components render without TypeScript errors. Visual output matches corresponding HTML source sections.

---

### Phase 3 — Page Components

- [ ] **Unit 6: Home page components**

**Goal:** Build the three home-page-specific components: `HeroCarousel`, `BentoSkillsGrid`, and `AccomplishmentCard`.

**Requirements:** R1, R4

**Dependencies:** Units 2, 5

**Files:**
- Create: `src/components/home/HeroCarousel.tsx`
- Create: `src/hooks/useCarousel.ts`
- Create: `src/components/home/BentoSkillsGrid.tsx`
- Create: `src/components/home/AccomplishmentCard.tsx`
- Create: `src/pages/HomePage.tsx`

**Approach:**

`useCarousel.ts` hook:
- `currentSlide: number` via `useState(0)`
- `intervalRef: useRef<ReturnType<typeof setInterval> | null>(null)`
- `startAutoPlay()`: sets interval on `intervalRef.current` to call `nextSlide` every 5000ms
- `stopAutoPlay()`: clears `intervalRef.current`
- `useEffect` on mount: calls `startAutoPlay()`, returns cleanup that calls `stopAutoPlay()`
- Returns: `{ currentSlide, goToSlide, stopAutoPlay, startAutoPlay }`
- **Fix from HTML version**: the HTML has `touchstart` stop but no `touchend` resume. Add `onTouchEnd={startAutoPlay}` in the component.
- **Critical: stale closure fix:** The `nextSlide` function inside the interval callback **must** use the functional state updater form: `setCurrentSlide(prev => (prev + 1) % totalSlides)`. Do NOT read `currentSlide` directly inside the interval callback — doing so closes over the initial value (0) and the carousel will only ever advance to slide 1 then reset. The `useRef` approach for the interval handle does not prevent this; only the functional updater does.

`HeroCarousel.tsx`:
- Props: `slides: Array<{ src: string; alt: string }>`
- **Sizing model (different from HTML source):** The original HTML sets `style="width:400%"` on the carousel strip and uses `translateX(-25%)` per step (25% of 400% = one slide width). The React implementation deliberately changes this: each slide uses `min-w-full flex-shrink-0` with no explicit strip width. This makes the strip's own width equal to its parent (block formatting context), so `translateX(-${currentSlide * 100}%)` correctly shifts exactly one slide width per step. Do **not** copy the HTML's `width:400%` / `25%` pattern — it no longer applies. Do **not** change this to `25%` — that is only correct on the HTML version with explicit `width:400%`.
- Dot buttons: rendered from `slides.map(...)`, `onClick={() => goToSlide(i)}`
- Attach `onMouseEnter={stopAutoPlay}`, `onMouseLeave={startAutoPlay}`, `onTouchStart={stopAutoPlay}`, `onTouchEnd={startAutoPlay}` to the outer carousel container
- The glass info card (`Alex Chen` identity chip) is positioned `absolute bottom-8 left-0 lg:-left-6 z-30` — on mobile (`lg:` breakpoint not met) it sits inside the container without negative margin overflow

`BentoSkillsGrid.tsx`:
- Props: `skills: Skill[]` (from a local type, not from `src/data` since these are static)
- Renders the 6-cell asymmetric bento using `grid-cols-6` with hardcoded `col-span` values per cell (as in the HTML — the spans are part of the design, not data-driven)

`AccomplishmentCard.tsx`:
- Props: `title: string`, `date: string`, `description: string`, `tags: string[]`, `imageUrl: string`, `accentColor?: 'primary' | 'primary-dim'`

**Execution note:** Execution target: external-delegate. Use high reasoning model for `useCarousel.ts` hook — the `clearInterval`/`setInterval` lifecycle with React's `useEffect` cleanup and `useRef` is a common source of bugs (stale closure on `currentSlide`, interval not cleared on unmount). The reasoning model should produce clean, bug-free hook code.

**Test scenarios:**
- Happy path: carousel advances slide index every 5 seconds automatically
- Happy path: `goToSlide(2)` sets `currentSlide` to 2 and the strip translates to the correct position
- Happy path: `onMouseEnter` stops the interval; `onMouseLeave` restarts it
- Edge case: `onTouchEnd` resumes autoplay (this was missing in the HTML version)
- Edge case: component unmounts while interval is active — `useEffect` cleanup must clear the interval (no memory leak / `setState on unmounted component` warning)
- Edge case: calling `goToSlide` while interval is running does not create a second interval

**Verification:** Carousel advances automatically; pauses on hover; dot buttons navigate; no console warnings about unmounted component state updates.

---

- [ ] **Unit 7: Projects page components**

**Goal:** Build the `ProjectTimeline` with alternating layout, and implement the `FilterBar` filter logic (currently dead code in HTML).

**Requirements:** R1, R5

**Dependencies:** Units 2, 3, 5

**Files:**
- Create: `src/components/projects/ProjectCard.tsx`
- Create: `src/components/projects/ProjectTimeline.tsx`
- Create: `src/components/projects/FilterBar.tsx`
- Create: `src/pages/ProjectsPage.tsx`

**Approach:**
- `FilterBar.tsx`: props `filters: string[]`, `active: string`, `onChange: (f: string) => void`. Renders pill buttons — active one gets `bg-primary-container text-on-primary-container`, inactive ones get `bg-surface-container-high text-on-surface-variant hover:bg-surface-bright`. Fires `onChange` on click. **Mobile overflow:** wrap the pill row in `overflow-x-auto scrollbar-none` so pills scroll horizontally on small screens rather than wrapping to multiple lines.
- `ProjectsPage.tsx`: holds `const [activeFilter, setActiveFilter] = useState('all')`. Derives `filteredProjects` by filtering `projects` data array on `category` field (or shows all when `activeFilter === 'all'`).
- `ProjectCard.tsx`: props `project: Project`, `side: 'left' | 'right'`. The `side` prop controls which CSS order classes to apply on the two-column timeline row. Image on opposite side to text.
- `ProjectTimeline.tsx`: maps `filteredProjects` to `<ProjectCard side={index % 2 === 0 ? 'left' : 'right'} />`. Renders the vertical gradient line pseudo-element via an absolutely positioned `<div>` (not CSS `::before` which is harder to control in Tailwind).

**Execution note:** Execution target: external-delegate. High reasoning model for filter logic to avoid stale renders and ensure the alternating `side` prop recalculates correctly when filter changes (index resets to 0 for the filtered subset).

**Test scenarios:**
- Happy path: all 4 projects visible when filter is "All"
- Happy path: filter "Design" shows only Design-category projects
- Happy path: alternating left/right layout holds when a filtered subset has fewer than 4 items
- Edge case: switching filter resets to alternating layout from index 0 (not from original dataset index)
- Edge case: filter with zero matches shows empty state — centered `text-on-surface-variant text-sm` reading "No projects in this category yet." No icon needed.

**Verification:** Each filter pill correctly shows/hides projects. The timeline layout alternates correctly on every filter change.

---

- [ ] **Unit 8: Articles page + ArticleCard component**

**Goal:** Build `FeaturedBento`, `ArticleCard`, and `ArticleFilterBar` with working client-side filter.

**Requirements:** R1, R5

**Dependencies:** Units 2, 3, 5

**Files:**
- Create: `src/components/articles/FeaturedBento.tsx`
- Create: `src/components/articles/ArticleCard.tsx`
- Create: `src/components/articles/ArticleFilterBar.tsx`
- Create: `src/components/articles/NewsletterCard.tsx`
- Create: `src/pages/ArticlesPage.tsx`

**Approach:**
- `ArticlesPage.tsx`: holds `const [activeCategory, setActiveCategory] = useState('All')`. Derives `filteredArticles` from non-featured articles filtered by category.
- `FeaturedBento.tsx`: receives featured articles array (those with `featured: true`). Renders the 1 large + 2 side bento with `md:grid-cols-12` and fixed `md:h-[600px]` on desktop, `h-auto` on mobile. **FeaturedBento always renders regardless of which category filter is active** — it is above the filter bar and shows only editorial picks, not filtered content.
- `ArticleCard.tsx`: reusable card used in the articles list and in `article.html` related articles sidebar. Props: `article: Article`, `size?: 'default' | 'compact'`. **Compact variant spec** (for the related articles sidebar): no image, single-line truncated title (`truncate`), category tag + read time only (no excerpt), `border-b border-outline-variant/10` separator between adjacent sidebar items.
- `NewsletterCard.tsx`: email input + subscribe button. No JS submit handler wired — submit fires `alert('Thanks!')` as a placeholder pending a real newsletter service integration.

**Execution note:** Execution target: external-delegate.

**Test scenarios:**
- Happy path: `FeaturedBento` renders the large card and 2 side cards from featured articles
- Happy path: `ArticleFilterBar` "Technology" filter shows only tech-category articles
- Happy path: `ArticleCard` renders with `grayscale group-hover:grayscale-0` image treatment
- Edge case: filter shows empty state when no articles match — centered `text-on-surface-variant text-sm` reading "No articles in this category yet." `FeaturedBento` remains visible above the filter bar.

**Verification:** Featured bento visible at top. Filter bar changes the list below it. All article cards link to `/articles/:slug`.

---

- [ ] **Unit 9: Article detail page components**

**Goal:** Build the single article page with reading progress bar and prose content rendering.

**Requirements:** R1

**Dependencies:** Units 2, 3, 5, 8

**Files:**
- Create: `src/hooks/useReadingProgress.ts`
- Create: `src/components/article/ArticleHero.tsx`
- Create: `src/components/article/ReadingProgressBar.tsx`
- Create: `src/components/article/ProseArticle.tsx`
- Create: `src/components/article/RelatedArticlesSidebar.tsx`
- Create: `src/pages/ArticlePage.tsx`

**Approach:**
- `useReadingProgress.ts`: attaches `scroll` listener in `useEffect`, computes `(scrollY / (documentElement.scrollHeight - window.innerHeight)) * 100`, returns `progress: number` (0–100). Cleanup removes the listener on unmount.
- `ReadingProgressBar.tsx`: fixed `top-0 left-0 h-[3px] bg-primary z-[200]`. `style={{ width: \`${progress}%\` }}`. Rendered inside `ArticlePage.tsx` outside the page layout scrolling area.
- `ArticlePage.tsx`: for now uses the single hardcoded article object from `articles.ts` where `slug` matches `useParams()`. Returns a 404-style message if no match. In future, article body content would come from a CMS or markdown files.
- `ProseArticle.tsx`: renders the article body (`article.body`). Prose typography rules (h2, h3, blockquote, ul li with blue dot marker) go in `@layer components` in `globals.css` as a `.prose-article` class block.
- `RelatedArticlesSidebar.tsx`: receives the full `articles` array, filters out the current article by slug, takes the first 3. Maps them to `<ArticleCard size="compact" />`. This is the sidebar visible in `article.html` — it must be in scope to achieve R1 fidelity for the article page.

**Execution note:** Execution target: external-delegate. High reasoning model for `useReadingProgress.ts` — scroll event cleanup, passive listener, and correct `scrollHeight` calculation are easy to get subtly wrong.

**Test scenarios:**
- Happy path: scrolling down the article page advances the progress bar from 0% to ~100%
- Happy path: `/articles/architectural-dynamics` renders the correct article content
- Edge case: `/articles/nonexistent-slug` renders a "not found" message, not a crash
- Edge case: scroll listener is removed when navigating away from the article (no listener leak)

**Verification:** Progress bar animates correctly while scrolling. Article content renders with correct heading hierarchy and blockquote styling.

---

- [ ] **Unit 10: Contact page + Formspree integration**

**Goal:** Wire the contact form to Formspree and implement the React controlled form with success/error states.

**Requirements:** R1, R6

**Dependencies:** Units 1, 2, 5

**Files:**
- Create: `src/components/contact/ContactForm.tsx`
- Create: `src/components/contact/SocialSidebar.tsx`
- Create: `src/components/contact/AvailabilityCard.tsx`
- Create: `src/pages/ContactPage.tsx`

**Approach:**
- `ContactForm.tsx`:
  - Fields: name, email, subject (select from `SUBJECT_OPTIONS`), message
  - State: `const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')`
  - On submit: `fetch(\`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}\`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name, email, subject, message }) })`. On `200`: set status to `'success'`. On non-200 or fetch error: set status to `'error'`.
  - **Do not use `FormData` as the body** — mixing `FormData` with `Accept: application/json` is valid but invites adding `Content-Type: application/json` alongside it, which breaks multipart boundaries. Use `JSON.stringify` + explicit `Content-Type: application/json` exclusively.
  - **Formspree ID:** Read from `import.meta.env.VITE_FORMSPREE_ID`. Add a `.env.example` file with `VITE_FORMSPREE_ID=your_form_id_here`. Add a dev-time assertion: `if (!import.meta.env.VITE_FORMSPREE_ID) console.error('[ContactForm] VITE_FORMSPREE_ID is not set — form submissions will fail')`. Do NOT hardcode the ID as a string constant.
  - **Error state UI:** Error message appears above the submit button. `text-error` color. Copy: "Something went wrong. Please try again." Form field values are **preserved** on error (do not reset the form).
  - Success state: renders the existing success panel (check icon, "Message Sent!" heading, body text, "Send another" reset button).
  - Submitting state: button shows a spinner or "Sending…" text; fields are `disabled`.
- The "Work that speaks volumes" editorial section from `contact.html` moves into `ContactPage.tsx` directly as JSX.

**Execution note:** Execution target: external-delegate. High reasoning model for the `fetch` Formspree integration and status state machine — the 4-state (`idle | submitting | success | error`) pattern is simple but easy to get partially right.

**Test scenarios:**
- Happy path: form fills out, submits, success state replaces form view
- Happy path: "Send another message" button resets status to `'idle'` and shows the form again
- Error path: if fetch throws (network error) or returns non-200, inline error message appears and form remains interactive
- Edge case: submit button is disabled while `status === 'submitting'` (prevents double-submit)
- Edge case: all fields are HTML5-validated (required attributes) before Formspree call

**Verification:** Form submits to Formspree with valid data; success panel appears; form can be reset. Error state is visible when fetch fails.

---

- [ ] **Unit 11: Me (about) page components**

**Goal:** Build the `SkillBar` with scroll-triggered animation, `EducationTimeline`, `ActivitiesList`, and `InterestsBento`.

**Requirements:** R1

**Dependencies:** Units 2, 3, 5

**Files:**
- Create: `src/hooks/useIntersectionObserver.ts`
- Create: `src/components/me/SkillBar.tsx`
- Create: `src/components/me/EducationTimeline.tsx`
- Create: `src/components/me/ActivitiesList.tsx`
- Create: `src/components/me/InterestsBento.tsx`
- Create: `src/pages/MePage.tsx`

**Approach:**
- `useIntersectionObserver.ts`: generic hook — takes a `ref` and an options object, returns `isIntersecting: boolean`. Uses `IntersectionObserver` with `threshold: 0.2`. Cleanup disconnects observer on unmount. Used by `SkillBar` for scroll-trigger.
- `SkillBar.tsx`:
  - Props: `name: string`, `percent: number`, `color: 'primary' | 'tertiary' | 'secondary'`
  - Attach `ref` to the bar element; use `useIntersectionObserver` to get `isIntersecting`
  - Fill width: `style={{ width: isIntersecting ? \`${percent}%\` : '0%', transition: 'width 1s ease-out' }}`
  - This replaces the `setTimeout(250ms)` pattern in the HTML — animation now fires when the element scrolls into view
- `InterestsBento.tsx`: maps `person.interests` array to cells. Cells with `type: 'image'` render an image card with overlay; cells with `type: 'card'` render gradient/icon cards.

**Execution note:** Execution target: external-delegate. Use high reasoning model for `useIntersectionObserver.ts` — ref attachment timing and observer cleanup are subtle.

**Test scenarios:**
- Happy path: skill bars are at 0% on initial load if below the fold
- Happy path: skill bars animate to their target width when scrolled into view
- Edge case: `IntersectionObserver` is disconnected when `MePage` unmounts — no observer leak
- Happy path: `InterestsBento` renders image-type cells with overlay and card-type cells with gradient background

**Verification:** Skill bars animate on scroll. Interests bento renders all cells from `person.interests` data.

---

### Phase 4 — Routing, SEO, and Integration

- [ ] **Unit 12: App.tsx routing + page assembly + SEO**

**Goal:** Wire all pages into React Router, wrap in `PageLayout`, and add per-page `<Helmet>` meta tags.

**Requirements:** R2, R7, R8

**Dependencies:** Units 1, 3, 4, 6, 7, 8, 9, 10, 11

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx` (add `HelmetProvider`)
- Create: `src/components/layout/ScrollToTop.tsx`
- Modify: `src/layouts/PageLayout.tsx` (add `ScrollToTop`, add `useEffect` to reset `menuOpen` on route change)
- Modify: each page file to add `<Helmet>` tags

**Approach:**
- `App.tsx` route tree (see High-Level Technical Design above)
- `main.tsx`: wrap `<App />` in `<HelmetProvider>`
- `ScrollToTop.tsx`: reads `location.pathname` via `useLocation()`, calls `window.scrollTo(0, 0)` in `useEffect([pathname])`, returns `null`. Rendered inside `PageLayout` above `<Outlet />`.
- `PageLayout.tsx`: add `useEffect(() => { setMenuOpen(false) }, [location.pathname])` so the mobile overlay auto-closes on every route change.
- Per-page Helmet (example for Home):
  ```
  <Helmet>
    <title>Alex Chen | Portfolio.OS</title>
    <meta name="description" content="Alex Chen — UI/UX designer..." />
    <meta property="og:title" content="Alex Chen | Portfolio.OS" />
    <meta property="og:description" content="..." />
    <meta property="og:type" content="website" />
  </Helmet>
  ```
- Article page: `<title>` is dynamic from `article.title`
- `index.html` (Vite entry): add `<link>` for Material Symbols Outlined in `<head>`; remove any static content (Vite's template has a placeholder `<div id="root">`). Add `class="dark"` to the `<html>` tag — every production HTML file has `<html class="dark">` and the Tailwind v4 `@custom-variant dark` rule requires this class to be present for the dark palette to activate.
- `NotFoundPage.tsx`: a standalone page rendered by the `<Route path="*">` catch-all, **wrapped inside `PageLayout`** so the nav and footer remain visible. Content: large `text-primary text-8xl font-extrabold` "404", `text-2xl font-headline` heading "Page not found", `text-on-surface-variant` body "The page you're looking for doesn't exist.", pill button `bg-primary text-white` "Go home" linking to `/`.

**Execution note:** This unit is reserved for Claude/human review. It is the integration seam that connects all other units. Routing mistakes here cause silent 404s or render blank pages, and the errors can look identical regardless of which unit caused them.

**Test scenarios:**
- Happy path: navigating to `/` renders `HomePage` content
- Happy path: navigating to `/projects` renders `ProjectsPage` content
- Happy path: navigating to `/articles` renders `ArticlesPage` content
- Happy path: navigating to `/articles/architectural-dynamics` renders the article content
- Happy path: navigating to `/contact` renders `ContactPage` content
- Happy path: navigating to `/me` renders `MePage` content
- Happy path: each page `<title>` is correct (verified with browser tab text)
- Edge case: navigating directly to `/projects` (no client-side navigation, just typing URL) renders correctly — requires `_redirects` to be present on Netlify
- Edge case: unknown route (`/xyz`) renders `NotFoundPage` with nav and footer visible; "Go home" button navigates to `/`
- Edge case: navigating from a scrolled-down page to any other page resets scroll to top (tests `ScrollToTop`)
- Edge case: mobile menu is open when a nav link is tapped — after navigation the overlay is closed (tests `menuOpen` reset on `pathname` change)

**Verification:** All 6 routes render their correct page. Browser tab shows the correct title. Back/forward navigation works. Direct URL access works (with Netlify `_redirects`).

---

### Phase 5 — QA

- [ ] **Unit 13: Build verification + design fidelity check**

**Goal:** Confirm `npm run build` produces a clean bundle and that the visual output matches the original HTML files.

**Requirements:** R1, R8

**Dependencies:** Unit 12

**Files:**
- No new files — this is a verification unit

**Approach:**
- Run `npm run build` and confirm no TypeScript errors, no Tailwind warnings
- Open each built page against its corresponding `stitch_ambitious_student_portfolio/screen.png` screenshot for visual comparison
- Spot-check: pill nav active states, carousel controls, mobile menu overlay, filter bars, skill bar animation, contact form success state, article reading progress bar
- Verify `dist/` is a self-contained folder that can be deployed to Netlify by dragging

**Execution note:** Human review. Screenshot comparison against original `screen.png` files is the acceptance criterion for R1.

**Test scenarios:**
- Happy path: `npm run build` exits with code 0
- Happy path: `npm run preview` serves the built app and all routes respond
- Happy path: mobile breakpoint shows hamburger menu, not desktop nav (at 375px viewport)
- Happy path: hero carousel dot navigation works in the built app
- Happy path: contact form submits and shows success panel (requires valid Formspree ID to be set)
- Edge case: `dist/` total size is under 5 MB (reasonable for a portfolio with no local large assets)

**Verification:** All routes render correctly in the built app. Visual output is pixel-faithful to the HTML screenshots.

---

## System-Wide Impact

- **Interaction graph:** `PageLayout` holds `menuOpen` state — any change to nav structure affects all 6 pages simultaneously (positive: the key point of this migration)
- **Scroll restoration on route change:** React Router v7 in library mode (`<BrowserRouter>`) does **not** scroll to top automatically on route transitions. Without explicit handling, navigating from a long page (e.g., `/me`) to a short page (e.g., `/contact`) leaves the user mid-page. Fix: add a `<ScrollToTop>` utility component in `src/components/layout/ScrollToTop.tsx` that calls `window.scrollTo(0, 0)` inside a `useEffect` on `location.pathname` change. Render it inside `<PageLayout>` above `<Outlet />`. This must be in Unit 12 (routing assembly).
- **Mobile menu auto-close on navigate:** `PageLayout` holds `menuOpen` state and passes `onClose` to `MobileMenuOverlay`. When a user clicks a nav link inside the overlay, the `<Link>` component triggers a route change — but `menuOpen` is not automatically reset. Fix: `PageLayout` adds `useEffect(() => { setMenuOpen(false) }, [location.pathname])`. Without this, the overlay remains open after navigation on mobile.
- **Error propagation:** Formspree fetch errors are caught in `ContactForm`; all other pages have no async calls. Route 404 is caught by the `*` catch-all route.
- **State lifecycle risks:** `useCarousel` interval must be cleaned up on unmount. `useReadingProgress` scroll listener must be cleaned up on route change. `useIntersectionObserver` must disconnect on unmount. All three are `useEffect`-with-cleanup patterns — high reasoning model should handle them correctly.
- **API surface parity:** `ArticleCard` is used in both `ArticlesPage` (list) and `ArticlePage` (related articles sidebar) — the `size` prop must support both contexts without layout breakage.
- **Integration coverage:** The carousel's `translateX` math is `currentSlide * 100%` — this is correct for a block-level flex strip (see Unit 6 approach). Verify visually in the built app that no slide transition overshoots or undershoots.
- **Unchanged invariants:** Kinetic Cobalt color tokens, font choices, border-radius scale, and glassmorphism rules are not changed — only migrated.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Tailwind v4 `--radius-DEFAULT` does not generate `rounded` utility | Fall back to `--radius-base: 1rem` or use `rounded-[1rem]` throughout; document the deviation |
| `@tailwindcss/forms` plugin v4 syntax differs from v3 | Verify `@plugin "@tailwindcss/forms"` in CSS during Unit 2; fall back to PostCSS config if needed |
| Google Aida CDN image URLs expire or change | Images are treated as temporary placeholders; this is a known accepted risk per scope boundaries |
| Formspree free tier (50/month) is too low | Acceptable for a student portfolio; upgrade path exists if needed |
| Carousel `translateX` calculation produces blank frames | Verified by Unit 13 visual check against `screen.png` |
| Codex produces stale-closure bugs in hooks | All hook units specify high reasoning model; Unit 13 exercises all hooks in the built app |
| `useLocation` active link matching fails for nested routes (`/articles/:slug`) | Use `pathname.startsWith(link.href)` not strict equality for active detection |

## Documentation / Operational Notes

- Deploy to Netlify: drag `dist/` folder to Netlify drop zone, or connect repo and set build command to `npm run build`, publish directory to `dist`
- Netlify `public/_redirects`: `/* /index.html 200` — must be present in `public/` before build
- Formspree: create account at formspree.io, register form, copy form ID, replace `'YOUR_FORM_ID'` in `ContactForm.tsx` before deploying
- CLAUDE.md: update after migration to reflect the new React stack, `npm run dev` / `npm run build` commands, and component structure

## Sources & References

- Existing HTML source: `stitch_ambitious_student_portfolio/*/code.html`
- Design spec: `stitch_ambitious_student_portfolio/kinetic_ledger_soft/DESIGN.md`
- Current production HTML: `index.html`, `projects.html`, `articles.html`, `article.html`, `contact.html`, `me.html`
- CLAUDE.md (architecture reference)
- Tailwind v4 Vite integration: `@tailwindcss/vite` plugin, `@theme {}` CSS block
- React Router v7 library mode: `<BrowserRouter>` + `<Routes>`
- Formspree static form handling
