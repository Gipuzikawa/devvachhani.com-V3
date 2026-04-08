---
title: "feat: Create project documentation trio (Architecture, Guide, React Primer)"
type: feat
status: completed
date: 2026-04-07
---

# feat: Create Project Documentation Trio

## Overview

Create three documentation files in `docs/` that give the site owner a complete reference for understanding, explaining, and personalising this React portfolio site. The owner has no prior React experience and needs both a technical map of the codebase and practical personalisation instructions.

## Problem Frame

The project was migrated from static HTML to a Vite + React + TypeScript + Tailwind v4 stack. The CLAUDE.md still describes the old static structure. The owner wants to:
- Understand how the React project is laid out (Architecture)
- Know exactly what to edit to make the site their own (Guide)
- Learn enough React/TypeScript to feel confident reading and editing the code (React Primer)

## Requirements Trace

- R1. `docs/Architecture.md` accurately describes the current React codebase structure, tech stack, routing, data layer, and build commands
- R2. `docs/guide.md` walks through every personalisation point with exact file paths and field names — someone with no prior React experience can follow it
- R3. `docs/react-primer.md` teaches React, JSX, props, state, hooks, TypeScript basics, and Vite/React Router context at a beginner level, grounded in code patterns from *this specific project*
- R4. The three docs are cross-referenced where relevant (guide.md points to architecture.md; react-primer.md points to real files in `src/`)
- R5. All file paths and field names in the docs must match the actual current codebase (no stale references to the old static HTML site)

## Scope Boundaries

- Do not update CLAUDE.md — that is a separate task
- Do not add a `docs/index.md` or navigation layer — three flat files is sufficient
- Do not include build/deployment tutorials beyond `npm run dev` and `npm run build`
- Do not write a full React course — the primer covers only what is needed to understand and edit this project

## Context & Research

### Relevant Code and Patterns

- Entry point: `src/main.tsx` → wraps app in `StrictMode`, `HelmetProvider`, renders `App`
- Routing: `src/App.tsx` → `BrowserRouter` + `Routes`, all routes nested under `PageLayout`
- Shared layout: `src/layouts/PageLayout.tsx` → renders `Navbar`, `MobileMenuOverlay`, `<Outlet />`, `Footer`
- Data layer: `src/data/person.ts`, `src/data/projects.ts`, `src/data/articles.ts` — typed against `src/types/index.ts`
- Design tokens: `src/styles/globals.css` using Tailwind v4 `@theme` block (CSS custom properties)
- Pages: `src/pages/` — HomePage, ProjectsPage, ArticlesPage, ArticlePage, ContactPage, MePage, NotFoundPage
- Components: `src/components/` — organised by feature area (`layout/`, `ui/`, `home/`, `projects/`, `articles/`, `article/`, `contact/`, `me/`)
- Hooks: `src/hooks/` — `useCarousel.ts`, `useReadingProgress.ts`, `useIntersectionObserver.ts`
- Tech stack: React 19, TypeScript 6, Vite 8, Tailwind v4, React Router v7, react-helmet-async

### Institutional Learnings

- No `docs/solutions/` directory exists yet — no prior institutional knowledge to reference
- The old `stitch_ambitious_student_portfolio/` folder is source reference only; docs should not reference it except to note it can be ignored

### External References

- None needed — all content can be derived from the codebase directly

## Key Technical Decisions

- **Split guide.md and react-primer.md, not one monolithic guide**: The user confirmed this. Personalisation instructions get stale fast and need frequent updates; React fundamentals are stable. Separating them prevents one from cluttering the other and makes each more scannable.
- **Architecture.md is a reference document, not a tutorial**: It should be dense and navigable — headings, tables, file trees — not prose-heavy. Someone who knows React should be able to orient themselves in under 5 minutes.
- **guide.md is task-oriented, not encyclopaedic**: Each section answers "how do I change X?" rather than explaining everything. Exact file paths, exact field names, short code-style excerpts where helpful (showing the data shape, not full code blocks).
- **react-primer.md anchors every concept to a real file in this project**: Abstract React concepts don't stick for beginners without a concrete anchor. Every concept should reference a specific file from `src/` that the reader can open and see.
- **File naming**: `Architecture.md` (capital A, as user specified), `guide.md`, `react-primer.md` — all in `docs/` root
- **Cross-linking**: guide.md and react-primer.md should reference Architecture.md for structural context; Architecture.md stays self-contained

## Open Questions

### Resolved During Planning

- **One file or split?**: Confirmed split — guide.md (personalisation + project explainer) and react-primer.md (React concepts). See R2, R3.
- **Where do the files live?**: `docs/` root, alongside the existing `docs/plans/` directory.
- **Should CLAUDE.md be updated to reflect the React project?**: Out of scope for this plan — noted as a separate task.
- **Should Architecture.md include the stitch folder?**: Mention briefly as "source reference only, safe to ignore."

### Deferred to Implementation

- **Exact section ordering within each doc**: Best determined when writing, based on what flows naturally for a beginner reader
- **Whether to include a component hierarchy diagram**: Mermaid diagram would be valuable in Architecture.md; defer to implementation to judge whether the complexity is worth it once the full list of components is visible

## Implementation Units

- [ ] **Unit 1: docs/Architecture.md**

**Goal:** A technical reference map of the project — stack, directory tree, routing table, data layer, component catalogue, design system tokens, and build commands.

**Requirements:** R1, R5

**Dependencies:** None

**Files:**
- Create: `docs/Architecture.md`

**Approach:**
- Open with a one-paragraph stack summary: Vite 8, React 19, TypeScript 6, Tailwind v4, React Router v7, react-helmet-async
- Directory tree section: annotated listing of `src/` with one-line description per directory and key file
- Entry point flow: index.html → main.tsx → App.tsx → BrowserRouter → PageLayout (Outlet) → Page components
- Routing table: all routes from `src/App.tsx` in a markdown table (path, component, description)
- Data layer section: describe `src/data/*.ts` files, their exported objects/arrays, and the TypeScript types they satisfy from `src/types/index.ts`
- Component catalogue: table of all components grouped by directory (`layout/`, `ui/`, `home/`, etc.) with one-line purpose
- Hooks section: three custom hooks, what each does, which component uses it
- Design system section: explain the `@theme` block in `globals.css` — surface hierarchy, primary colour, fonts, border-radius scale
- Build commands: `npm run dev`, `npm run build`, `npm run preview`, and `npm run lint` with brief description
- Close with a note on `stitch_ambitious_student_portfolio/`: explain it is the original design export and safe to ignore

**Patterns to follow:**
- Use markdown tables for structured lists (routes, components)
- Use fenced code blocks only for command-line examples, not for source code
- Use H2 for major sections, H3 for subsections

**Verification:**
- A developer unfamiliar with the project can find any file's purpose without opening it
- All routes in the routing table match `src/App.tsx` exactly
- All component names in the catalogue match filenames in `src/components/`

---

- [ ] **Unit 2: docs/guide.md**

**Goal:** A personalisation guide that tells the owner exactly which files to edit, which fields to change, and what each change affects on the site — plus a "how it all fits together" section that explains each page's purpose.

**Requirements:** R2, R4, R5

**Dependencies:** Unit 1 (can reference Architecture.md for structural context)

**Files:**
- Create: `docs/guide.md`

**Approach:**

*Section 1 — Quick orientation*: Two paragraphs explaining that all personalisation happens in `src/data/`, that the site rebuilds instantly with `npm run dev`, and a pointer to Architecture.md for the full technical picture.

*Section 2 — Personalising your identity (`src/data/person.ts`)*: Walk through every field in the `PersonData` export:
  - `name`, `role`, `location` — what they appear on in the UI
  - `avatarUrl`, `portraitUrl` — how to replace with your own images (local path vs. hosted URL)
  - `bio` — array of paragraphs shown on the Me page
  - `quickFacts` — icon name (Material Symbols) + text pairs
  - `stats` — the four numbers shown on the Me page
  - `skills` — name, percent (0–100), colour token
  - `education` — institution, role, period, description
  - `activities` — title, description, period
  - `interests` — covers both `type: 'image'` and `type: 'card'` variants

*Section 3 — Adding/editing projects (`src/data/projects.ts`)*: Explain the `Project` interface fields, how to add a project object to the array, and how the `category`, `accentColor`, and `award` fields affect appearance.

*Section 4 — Adding/editing articles (`src/data/articles.ts`)*: Explain the `Article` interface, the `slug` field (used for the URL), the `body` field (plain text / HTML string for article content), `featured` and `featuredSize` for the bento grid.

*Section 5 — Changing colours*: Point to the `@theme` block in `src/styles/globals.css`. Explain the surface hierarchy (background → surface → surface-container-low → … → surface-container-highest). Show the primary colour variable (`--color-primary: #0052FF`) and how to change it. Note that changing these tokens affects the entire site.

*Section 6 — Changing fonts*: Point to `src/main.tsx` font imports and `globals.css` `--font-*` variables.

*Section 7 — Page meta titles and descriptions*: Explain that each page uses `react-helmet-async` via a `<Helmet>` component. Point to any page (e.g., `src/pages/HomePage.tsx`) to show the pattern.

*Section 8 — Page-by-page explainer*: Short paragraph per page (Home, Projects, Articles, Article detail, Me, Contact, 404) describing what it shows and which data or components it draws from.

*Section 9 — The contact form*: Note it is JS-only (no backend), explain the success-state swap, and call out that wiring up a real email service would require adding a backend or third-party form service.

**Patterns to follow:**
- Task-oriented headings: "How to change your name", "How to add a project"
- Use inline code for field names (`name`, `avatarUrl`) and file paths (`src/data/person.ts`)
- No large code blocks — show data shape with a compact 3-5 line excerpt, not the full file

**Verification:**
- The owner can change every piece of visible content on the site by following this guide alone
- Every file path and field name mentioned can be verified to exist in the current codebase
- A reader with zero React experience would not be blocked by unexplained jargon (jargon points to react-primer.md)

---

- [ ] **Unit 3: docs/react-primer.md**

**Goal:** A beginner-friendly introduction to React, TypeScript, Vite, and React Router — explained through the lens of this specific project so every concept has a real anchor the reader can open.

**Requirements:** R3, R4

**Dependencies:** Unit 1 (references Architecture.md for file locations)

**Files:**
- Create: `docs/react-primer.md`

**Approach:**

*Section 1 — What is this stack?*: One paragraph each on Vite (build tool / dev server), React (UI library), TypeScript (typed JavaScript), Tailwind CSS (utility CSS), React Router (client-side navigation). Keep it conceptual — "what problem does it solve?" — not an install guide.

*Section 2 — Components*: Explain that a React component is a TypeScript function that returns JSX. Use `src/components/ui/Tag.tsx` or `src/components/ui/GlassPanel.tsx` as the example (simple, self-contained). Explain JSX syntax (looks like HTML, compiles to JS). Explain why components are reusable.

*Section 3 — Props*: Explain props as the inputs to a component. Point to a component that accepts props (e.g., `StatCard.tsx` or `SectionIntro.tsx`). Show the pattern of defining an interface for props.

*Section 4 — State (useState)*: Explain state as data that can change and cause the UI to re-render. Point to `src/layouts/PageLayout.tsx` where `menuOpen` state controls the mobile menu. Walk through the `useState` call and how it connects to the `onMenuOpen` / `onClose` handlers.

*Section 5 — Effects (useEffect)*: Explain side effects (running code when something changes). Point to `PageLayout.tsx` again — the two `useEffect` calls that lock body scroll and close the menu on route change. Explain the dependency array.

*Section 6 — Custom hooks*: Explain that a hook is just a function that uses other hooks. Point to `src/hooks/useCarousel.ts` as a clear example. Explain the naming convention (`use` prefix).

*Section 7 — TypeScript interfaces*: Explain interfaces as "shapes" for data. Point to `src/types/index.ts`. Connect to how `src/data/person.ts` imports and satisfies `PersonData`. Explain why this catches typos before the browser does.

*Section 8 — React Router*: Explain client-side routing (no page reload). Walk through `src/App.tsx` — the `BrowserRouter`, `Routes`, `Route` tree. Explain the `PageLayout` + `<Outlet />` pattern (how the shared nav/footer wraps every page). Explain `useLocation` and `useNavigate` briefly.

*Section 9 — How data flows through a page*: Pick one page (e.g., `MePage.tsx`) and trace the data: `src/data/person.ts` exports `person` → page imports it → passes fields as props to child components. Make this concrete with field names.

*Section 10 — Reading an error*: Brief practical section: what a TypeScript compile error looks like, what a React runtime error looks like, and where to look first (browser console, terminal). Reassure the reader that most errors are typos in data files.

**Patterns to follow:**
- Every concept section anchors to a real file from `src/` — no abstract examples
- Use inline code for file paths, component names, and short snippets
- Keep each section short (300 words max) — this is an orientation, not a textbook
- End with a "next steps" pointer to official React docs and the Vite docs

**Verification:**
- A reader with only HTML/CSS/JS experience (no React) can read this document and understand what every file in `src/` is doing at a conceptual level
- No concept is introduced without a concrete file reference from this project
- The document does not try to teach React comprehensively — it covers exactly what is needed to feel comfortable editing this codebase

## System-Wide Impact

- **Unchanged invariants:** No source code is modified. All three files are new documentation only.
- **CLAUDE.md**: Currently describes the old static HTML project. This plan does not update it — that is a separate concern. The new docs describe the current React codebase and supersede CLAUDE.md's file structure section for practical purposes.
- **Stale reference risk**: The docs reference specific field names and file paths. If the codebase changes later, the docs can become stale. This is accepted — documentation maintenance is a separate ongoing concern.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Field names or file paths change after docs are written | Use exact names from current codebase; note in each doc that paths reflect the state at time of writing |
| react-primer.md is too abstract and doesn't help the owner | Anchor every concept to a real file — if a section has no file reference, it doesn't belong |
| guide.md becomes too long to navigate | Use clear H2 headings and a short table of contents at the top |
| CLAUDE.md conflicts with Architecture.md | Acceptable short-term; flag that CLAUDE.md should be updated separately |

## Sources & References

- Related plan: [docs/plans/2026-04-05-001-feat-migrate-static-site-to-react-plan.md](plans/2026-04-05-001-feat-migrate-static-site-to-react-plan.md)
- Related code: `src/App.tsx`, `src/main.tsx`, `src/data/person.ts`, `src/types/index.ts`, `src/styles/globals.css`
