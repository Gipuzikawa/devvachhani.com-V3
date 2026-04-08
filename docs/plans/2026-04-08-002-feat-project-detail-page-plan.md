---
title: "feat: Add Project Detail Page (Stitch Kinetic Cobalt layout)"
type: feat
status: active
date: 2026-04-08
---

# feat: Add Project Detail Page (Stitch Kinetic Cobalt layout)

## Overview

Add a `ProjectPage` route (`/projects/:id`) that renders a rich case-study layout mirroring the Stitch AI design template at `Stitch_AI_Design/project_page_template/code.html`. The page is composed of five sections: Hero, Mission, Technical Architecture bento, Project Evolution timeline, and Impact & Scale metrics grid.

## Problem Frame

The Projects list currently links "View Case Study" to `#`. The Stitch template gives us a full detailed project page layout that matches the Kinetic Cobalt design system already used site-wide. This page closes the dead-link gap and lets each project have its own case study page.

## Requirements Trace

- R1. Route `/projects/:id` renders a project detail page for each `Project` with a `detail` field.
- R2. Layout matches the Stitch template: hero + mission + tech bento + evolution timeline + metrics.
- R3. Design follows Kinetic Cobalt rules (tonal layering, no-line rule, text-glow, pill badges, bento grids).
- R4. `ProjectCard` "View Case Study" links navigate to `/projects/:id` instead of `#`.
- R5. Missing project IDs render a 404-style not-found state (same pattern as `ArticlePage`).
- R6. At least one project (`neural-synthesis-interface`) has full `detail` data populated.

## Scope Boundaries

- No backend, no CMS — all data stays in `src/data/projects.ts`.
- No new shared CSS file — styles stay inline with Tailwind classes (existing convention).
- Does not add pagination or navigation between project pages.
- Does not change the Projects list page layout.

## Context & Research

### Relevant Code and Patterns

- **ArticlePage pattern**: `src/pages/ArticlePage.tsx` — dynamic route via `useParams`, data lookup from array, not-found fallback, `<Helmet>` meta, section composition. This page follows the exact same pattern.
- **Existing Project type**: `src/types/index.ts` — `Project` has `id`, `title`, `description`, `tags`, `imageUrl`, `duration`, `team`, `caseStudyUrl`. `detail` field must be added as optional.
- **Data file**: `src/data/projects.ts` — exports `projects: Project[]`. Detail data added inline to the same file.
- **ProjectCard links**: `src/components/projects/ProjectCard.tsx` — currently renders `<a href={project.caseStudyUrl}>`. Should become a React Router `<Link to={/projects/${project.id}}>` for projects that have detail data.
- **Tailwind config**: Identical block on every page / global in `index.html` or Vite config — all color tokens (`surface-container`, `primary`, `on-surface-variant`, etc.) and font families available.
- **Component location pattern**: Page-specific components live under `src/components/<feature>/`.
- **Stitch source template**: `Stitch_AI_Design/project_page_template/code.html` — reference only, do not edit.

### Institutional Learnings

- None applicable from `docs/solutions/`.

## Key Technical Decisions

- **Extend `Project` type with optional `detail?: ProjectDetail`** rather than a separate data structure: keeps the lookup path simple (one array, one `.find()`), mirrors how `Article` embeds its `body`. Rationale: avoids a second map/join and keeps the data co-located with the project record.
- **Separate sub-types** (`TechCard`, `EvolutionStage`, `MetricItem`) defined in `src/types/index.ts` for type safety without over-engineering.
- **React Router `<Link>`** replaces raw `<a>` in `ProjectCard` for internal navigation; `caseStudyUrl` field kept for future external link opt-out.
- **No new layout wrapper** — `ProjectPage` renders inside the existing `PageLayout` (Navbar + Footer) exactly like `ArticlePage`.
- **Component split**: One component per section (`ProjectHero`, `ProjectMission`, `ProjectTechBento`, `ProjectEvolution`, `ProjectImpact`) matches the granularity of the Stitch design and the article page components (`ProseArticle`, `RelatedArticlesSidebar`, etc.).

## Open Questions

### Resolved During Planning

- **Should all four projects get full detail data?** No — populate only `neural-synthesis-interface` for now; others get the not-found/placeholder state. This keeps the plan small and unblocks the design review.
- **Where do hero images come from?** Same Google Aida CDN URLs used in `projects.ts` and `code.html`. No change to image sourcing.

### Deferred to Implementation

- **Exact `role` and `objectives` copy** for projects other than `neural-synthesis-interface`: determined at data-fill time.
- **Animation timing** on evolution timeline dots (`group-hover:scale-125`) — Tailwind `group` nesting with React should work without changes, but verify at runtime.

## Implementation Units

- [ ] **Unit 1: Extend type definitions**

**Goal:** Add `ProjectDetail`, `TechCard`, `EvolutionStage`, and `MetricItem` interfaces to the type file, and add an optional `detail?: ProjectDetail` field to the `Project` interface.

**Requirements:** R1, R6

**Dependencies:** None

**Files:**
- Modify: `src/types/index.ts`

**Approach:**
- `ProjectDetail`: `{ role: string; mission: string[]; objectives: string[]; techCards: TechCard[]; evolution: EvolutionStage[]; metrics: MetricItem[] }`
- `TechCard`: `{ icon: string; title: string; description: string; tags: string[]; variant: 'standard' | 'elevated' | 'mini' }`
- `EvolutionStage`: `{ month: string; title: string; description: string; imageUrl: string; imageAlt: string }`
- `MetricItem`: `{ value: string; label: string }`

**Execution note:** Execution target: external-delegate

**Test scenarios:**
- Happy path: TypeScript compiler accepts a `Project` object with and without the `detail` field (optional).
- Edge case: `detail` fields with empty arrays compile without error.

**Verification:**
- `pnpm build` (or `npm run build`) passes with no type errors after the change.

---

- [ ] **Unit 2: Populate detail data for `neural-synthesis-interface`**

**Goal:** Add a `detail` object to the `neural-synthesis-interface` entry in `src/data/projects.ts` matching the content in `code.html` (mission copy, 5 objectives, 5 tech cards, 4 evolution stages, 4 metrics).

**Requirements:** R6

**Dependencies:** Unit 1

**Files:**
- Modify: `src/data/projects.ts`

**Approach:**
- Copy mission paragraphs, objectives list, tech stack cards (Neural Engine + Real-time Viz as `elevated` variant; Distributed Processing / Data Ingestion / Privacy Layer as `mini`), 4 evolution stages (Concept / R&D / Prototype / V1.0), and metrics (92% / 4.2x / 12k+ / A++) directly from `code.html`.
- Use the existing `imageUrl` values already in the `code.html` for evolution stage images.
- `role: 'Lead Architect'`

**Execution note:** Execution target: external-delegate

**Patterns to follow:**
- `src/data/articles.ts` — how long structured content objects are laid out inline in the data array.

**Test scenarios:**
- Happy path: `projects.find(p => p.id === 'neural-synthesis-interface')?.detail` is defined and has all required fields populated.
- Edge case: Array fields (`techCards`, `evolution`, `metrics`) each have the expected item counts (5, 4, 4).

**Verification:**
- TypeScript build passes; no runtime undefined access in the page.

---

- [ ] **Unit 3: Build ProjectPage and section components**

**Goal:** Create `src/pages/ProjectPage.tsx` and five section components under `src/components/project/` that together render the full Stitch layout.

**Requirements:** R1, R2, R3, R5

**Dependencies:** Unit 1, Unit 2

**Files:**
- Create: `src/pages/ProjectPage.tsx`
- Create: `src/components/project/ProjectHero.tsx`
- Create: `src/components/project/ProjectMission.tsx`
- Create: `src/components/project/ProjectTechBento.tsx`
- Create: `src/components/project/ProjectEvolution.tsx`
- Create: `src/components/project/ProjectImpact.tsx`

**Approach:**

*ProjectPage.tsx*
- `useParams<{ id: string }>()` to get project id.
- Find project in `projects` array; if not found or `!project.detail`, render a not-found block matching `ArticlePage`'s not-found pattern.
- Renders `<Helmet>`, then each section component in order: `ProjectHero`, `ProjectMission`, `ProjectTechBento`, `ProjectEvolution`, `ProjectImpact`.
- `max-w-7xl mx-auto px-6 md:px-12 space-y-32 pt-32 pb-24` wrapper, matching `code.html`'s `<main>`.

*ProjectHero.tsx*
- Props: `project: Project & { detail: ProjectDetail }` (or just accept both separately).
- Badge chip: `inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high border border-outline-variant/20` with `animate-pulse` blue dot and `text-xs font-label tracking-widest uppercase text-primary` "Case Study • {year}".
- Title: `text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter text-glow`, with `<br/>` and `<span class="text-primary">` on last word.
- Subtitle: `text-xl md:text-2xl text-on-surface-variant max-w-2xl font-light leading-relaxed`.
- Right column metadata: role + duration with `text-sm font-label uppercase tracking-widest text-secondary` labels and `h-px w-12 bg-primary` divider rule.
- Hero image: `aspect-[21/9]` container, `grayscale hover:grayscale-0 transition-all duration-700`, gradient overlay `bg-gradient-to-t from-background via-transparent to-transparent`.

*ProjectMission.tsx*
- Props: `{ mission: string[]; objectives: string[] }`.
- 4/8 col grid: left = "The Mission" h2 + `w-16 h-1.5 bg-primary rounded-full` rule. Right = mission paragraphs + objectives card.
- Objectives card: `bg-primary/5 rounded-2xl border border-primary/20` with absolute glow blob, `bg-primary p-4 rounded-xl` icon block (`target` icon), h3 "Core Objectives", 2-col grid of `<li>` with blue dot bullets.

*ProjectTechBento.tsx*
- Props: `{ techCards: TechCard[] }`.
- Section heading `text-3xl md:text-4xl font-headline font-extrabold tracking-tight` "Technical Architecture".
- `grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6`.
- `variant === 'elevated'`: `lg:col-span-3 p-10 bg-surface-container-high rounded-xl border border-primary/20`, tags with `bg-primary/10 text-primary` pills.
- `variant === 'standard'`: `lg:col-span-3 p-10 bg-surface-container rounded-xl border border-outline-variant/5`, tags with `bg-background` pills.
- `variant === 'mini'`: `md:col-span-2 p-8 bg-surface-container-low rounded-xl border border-outline-variant/5 group hover:bg-surface-container transition-colors`, icon transitions `text-secondary group-hover:text-primary`.
- **Important**: use explicit full Tailwind class strings in `if/switch` branches — never interpolate `bg-${variant}`. Tailwind's JIT scanner cannot detect dynamically constructed class names. See existing precedent in `ProjectCard.tsx` where accent color branches are written as full strings.

*ProjectEvolution.tsx*
- Props: `{ stages: EvolutionStage[] }`.
- Center-aligned section heading.
- Relative container for the vertical timeline line: `absolute left-6 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block`.
- Each stage: 12-col grid — 2 cols (month label + ring dot), 5 cols (text card), 5 cols (image).
- Text card alternates `bg-surface-container` / `bg-surface-container-high` (even/odd index).
- Image: `opacity-60 hover:opacity-100 transition-opacity duration-500`.

*ProjectImpact.tsx*
- Props: `{ metrics: MetricItem[] }`.
- 5/7 col grid inside `bg-primary/5 rounded-xl border border-primary/10 overflow-hidden`.
- Left: h2 "Impact & Scale", subtext, "Download Report" pill button with `download` icon.
- Right: `grid-cols-2 gap-px bg-primary/20` — each metric cell `bg-background/80 p-12 flex flex-col items-center text-center`, value in `text-6xl font-headline font-black text-primary`, label in `text-xs font-label uppercase tracking-widest text-secondary`.

**Execution note:** Execution target: external-delegate

**Patterns to follow:**
- `src/pages/ArticlePage.tsx` — page structure, not-found fallback, Helmet usage.
- `src/components/article/ProseArticle.tsx` — section component shape.
- `src/components/projects/ProjectCard.tsx` — how Kinetic Cobalt tokens are applied in this codebase.

**Test scenarios:**
- Happy path: navigating to `/projects/neural-synthesis-interface` renders all 5 sections without console errors.
- Happy path: hero image appears with grayscale-on-load, removes grayscale on hover.
- Happy path: evolution timeline dots show ring and scale on hover.
- Edge case: navigating to `/projects/nonexistent` renders the not-found block with a back link to `/projects`.
- Edge case: project without `detail` (e.g., `atmosphere-io`) also renders not-found (or redirects) rather than crashing.
- Integration: all 4 metric cells display the correct value and label from data.

**Verification:**
- All 5 sections visible at `http://localhost:5173/projects/neural-synthesis-interface`.
- No TypeScript errors in build.
- 404 state renders for unknown IDs.

---

- [ ] **Unit 4: Wire route and update ProjectCard links**

**Goal:** Register `/projects/:id` in `App.tsx` and change `ProjectCard`'s "View Case Study" anchor to a React Router `<Link>` pointing to `/projects/${project.id}`.

**Requirements:** R1, R4

**Dependencies:** Unit 3

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/projects/ProjectCard.tsx`

**Approach:**
- `App.tsx`: add `import ProjectPage from './pages/ProjectPage'` and `<Route path="projects/:id" element={<ProjectPage />} />` as a child of the root layout route, after the `projects` index route.
- `ProjectCard.tsx`: replace `<a href={project.caseStudyUrl}>` with `<Link to={/projects/${project.id}}>` (import `Link` from `react-router-dom`). The `caseStudyUrl` field on the type can stay for future external use but is no longer used in this component.

**Execution note:** Execution target: external-delegate

**Patterns to follow:**
- `src/App.tsx` — existing route registrations for `articles/:slug`.
- `src/pages/ArticlePage.tsx` — how the dynamic segment is consumed.

**Test scenarios:**
- Happy path: clicking "View Case Study" on the `neural-synthesis-interface` card navigates to `/projects/neural-synthesis-interface` without a full page reload.
- Happy path: clicking "View Case Study" on `atmosphere-io` navigates to `/projects/atmosphere-io` and renders the not-found state (no crash).
- Integration: browser back button from project page returns to `/projects` list.

**Verification:**
- No `<a href="#">` dead links remain in ProjectCard.
- Route renders `ProjectPage` component at `/projects/:id`.

---

## System-Wide Impact

- **Interaction graph:** Only `App.tsx` (route) and `ProjectCard.tsx` (link) are changed outside the new files. No middleware or observers affected.
- **Error propagation:** Missing project or missing `detail` is caught at page level with a graceful not-found block — no unhandled undefined access propagates to components.
- **State lifecycle risks:** All data is static import — no async state, no partial-write risk.
- **API surface parity:** N/A — no API.
- **Unchanged invariants:** Projects list page, filtering, and timeline layout are untouched.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Tailwind purge doesn't include dynamic class strings like `bg-${variant}` | Use explicit full class names in component conditionals, not interpolated strings (existing pattern in `ProjectCard.tsx`) |
| Google Aida CDN image URLs in `evolution` stages may 404 later | Same risk as existing images — acceptable, no local fallback needed |
| `aspect-[21/9]` requires Tailwind arbitrary value support | Already used in other pages; CDN build supports it |

## Sources & References

- Stitch template: `Stitch_AI_Design/project_page_template/code.html`
- Design spec: `Stitch_AI_Design/project_page_template/DESIGN.md`
- Pattern reference: `src/pages/ArticlePage.tsx`
- Pattern reference: `src/components/projects/ProjectCard.tsx`
- Type definitions: `src/types/index.ts`
- Data file: `src/data/projects.ts`
- Route config: `src/App.tsx`
