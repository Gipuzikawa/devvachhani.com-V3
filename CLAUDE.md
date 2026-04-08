# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

This is a React 19 + Vite 8 + TypeScript 6 portfolio site for **Dev Vachhani**, styled with Tailwind CSS v4. It follows the Kinetic Cobalt visual system defined in `src/styles/globals.css`.

Canonical structure:
- Routes live in `src/App.tsx`
- Shared shell lives in `src/layouts/PageLayout.tsx`
- Structured content lives in `src/data/person.ts`, `src/data/projects.ts`, and `src/data/articles.ts`
- Shared types live in `src/types/index.ts`

Do not treat this as a static HTML export. The old root-HTML description is obsolete.

## Tech Stack

| Layer | Current stack |
|---|---|
| App | React 19 |
| Build tool | Vite 8 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 with CSS-first `@theme` tokens |
| Routing | React Router 7 |
| Head metadata | `react-helmet-async` |
| Forms | `@tailwindcss/forms` |

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Routing And Structure

Routes currently defined in `src/App.tsx`:
- `/`
- `/projects`
- `/projects/:id`
- `/articles`
- `/articles/:slug`
- `/contact`
- `/me`
- `*`

Code organization rules:
- `src/pages/` contains one route component per page
- `src/components/<feature>/` contains feature-specific UI
- `src/components/layout/` contains shared shell components
- `src/components/ui/` contains reusable primitives
- `src/hooks/` contains reusable client hooks
- `src/data/` is the canonical structured content layer

## Content Rules

- Treat `src/data/person.ts` as the source of truth for the portfolio persona.
- Treat `src/data/projects.ts` as the source of truth for project cards and project-detail payloads.
- Treat `src/data/articles.ts` as the source of truth for article metadata and article bodies.
- Not every UI string has been externalized. Some page-level marketing copy still lives directly inside page components.
- The data files currently contain placeholder content from the original Stitch AI template (`Alex Chen`, sample projects, sample articles). This is being progressively replaced with Dev Vachhani's real content. When writing copy or data, use `Dev Vachhani` — never `Alex Chen`.

## Design System Rules

The design tokens live in `src/styles/globals.css`.

Key tokens and rules:
- Background: `#0b0c10`
- Primary: `#0052FF`
- Surface hierarchy: `surface` -> `surface-container-low` -> `surface-container` -> `surface-container-high` -> `surface-container-highest`
- Headline font: Plus Jakarta Sans Variable
- Body and label font: Inter
- Radius overrides: default `1rem`, `lg` `2rem`, `xl` `3rem`, `full` pill radius
- Utility classes: `.glass-panel`, `.text-glow`, `.scrollbar-none`
- Article prose styling is centralized under `.prose-article`

Visual guidance:
- Prefer tonal separation over heavy dividers
- The Kinetic Cobalt system uses layered surfaces more than hard borders
- Keep pills, rounded panels, and glow treatments consistent with existing components

## Asset Rules

- Current page and data imagery uses Google Aida CDN URLs (`lh3.googleusercontent.com/aida-public/...`)
- Do not assume local images are part of the active content pipeline
- Always preserve descriptive `alt` text

## Current Product Reality

- The project-detail route exists, but only one project currently includes a populated `detail` payload
- Seven article records exist; only the first article currently has a non-empty `body`
- The contact form posts to Formspree and depends on `VITE_FORMSPREE_ID`
- Page metadata is rendered client-side through `react-helmet-async`; this is good enough for the SPA, but some social preview scrapers will not see the final `og:*` tags

## Implementation Workflow

**Default to Codex for all code implementation.** When a task involves writing or modifying source files, delegate it to the `codex:rescue` subagent via `/codex:rescue` rather than writing code directly. Claude should plan, review, and guide — Codex implements.

Workflow:
1. Claude reads context, plans the approach, and identifies files to change
2. Claude hands off to Codex with a precise, self-contained prompt
3. Claude reviews Codex's output before considering the task done

Only write code directly when the change is trivially small (e.g. a single-line data edit) or when Codex is unavailable.

## Repository Etiquette

- Work from feature branches; do not commit directly to `main`
- Keep changes scoped and traceable
- Do not edit design-reference exports unless the task explicitly targets them
- If you change structured content, keep the corresponding types in sync

## Documentation Map

Read these before making broad product or architecture changes:
- `docs/Architecture.md` — technical reference and file map
- `docs/Product_Spec.md` — product intent, persona, page definitions, design summary
- `docs/Project_Status.md` — milestone state and known gaps
- `docs/Changelog.md` — milestone history
- `docs/guide.md` — site-personalization guide
- `AGENTS.md` — agent routing guide; which plugin skill or subagent to use for each task type

