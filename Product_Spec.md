# Portfolio.OS - Product Specification

> Version: 0.3.0  
> Status: Current baseline  
> Scope: React portfolio site for Dev Vachhani

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Persona](#2-persona)
3. [Page Definitions](#3-page-definitions)
4. [Content Architecture](#4-content-architecture)
5. [Design System Summary](#5-design-system-summary)
6. [Constraints And Decisions Log](#6-constraints-and-decisions-log)

---

## 1. Product Overview

`Portfolio.OS` is a single-page React portfolio site for **Dev Vachhani**. Its job is to present projects, writing, background, and contact information in a high-polish editorial style that feels more like a designed product than a generic portfolio template.

Primary audience:
- Colleges and summer programs
- Internship and collaboration leads
- Design competition judges
- Peers, mentors, and community members

Primary product goals:
- Show credible project work through a filterable portfolio and a project-detail route
- Present writing and ideas through an articles index and article-detail experience
- Communicate personality, leadership, and context through the Me page
- Provide a direct contact path through a client-side contact flow

Technical implementation details belong in `docs/Architecture.md`. This document focuses on product intent, content shape, and UX decisions.

---

## 2. Persona

This portfolio is for **Dev Vachhani**. All content in `src/data/person.ts`, `src/data/projects.ts`, and `src/data/articles.ts` is currently placeholder content from the original Stitch AI template (`Dev Vachhani`, sample projects, sample articles) and is being progressively replaced with Dev Vachhani's real content.

**Rule:** When writing or editing any copy, data, or UI strings — use `Dev Vachhani`. The name `Dev Vachhani` should never appear in production content.

Canonical source once personalised: `src/data/person.ts`

| Field | Placeholder (template) | To be replaced with |
|---|---|---|
| Name | Dev Vachhani | Dev Vachhani |
| Role | UI/UX Designer · High School Junior | Year 11 Student |
| Location | San Francisco Bay Area, CA | Mansfield, Nottinghamshire, UK |
| School | Westlake High School | Nottingham High School |
| Bio, stats, skills, interests | Sample content | Dev's real content |

---

## 3. Page Definitions

All routes are defined in `src/App.tsx`.

### Home

| Attribute | Detail |
|---|---|
| URL | `/` |
| Purpose | Establish identity, credibility, and visual tone quickly |
| Primary modules | Hero banner, availability chip, 4-slide carousel, stats row, skills bento, accomplishments cards, CTA banner |
| Main sources | `src/pages/HomePage.tsx`, `src/components/home/*` |

Behavior summary:
- The hero introduces the persona and drives users to Projects or Me.
- The carousel uses image-driven storytelling rather than a static portrait block.
- The page closes with a collaboration CTA to push users toward Contact.

### Projects Index

| Attribute | Detail |
|---|---|
| URL | `/projects` |
| Purpose | Show the portfolio breadth in a browsable, timeline-oriented format |
| Primary modules | Page header, filter pills, alternating project timeline, CTA banner |
| Main sources | `src/pages/ProjectsPage.tsx`, `src/data/projects.ts`, `src/components/projects/*` |

Current behavior:
- Filters are `All Projects`, `Design`, `Research`, and `Dev`.
- The data layer currently contains four projects.
- Each card links to `/projects/:id`, even though only one record currently has full detail content.

### Project Detail

| Attribute | Detail |
|---|---|
| URL | `/projects/:id` |
| Purpose | Present a single project as a case-study-style narrative |
| Primary modules | `ProjectHero`, `ProjectMission`, `ProjectTechBento`, `ProjectEvolution`, `ProjectImpact` |
| Main sources | `src/pages/ProjectPage.tsx`, `src/types/index.ts`, `src/data/projects.ts` |

Current behavior:
- The route renders only when the project record includes a `detail` payload.
- The `detail` model includes role, mission paragraphs, objectives, tech cards, evolution stages, and metrics.
- At the moment, only `neural-synthesis-interface` has populated detail data.

### Articles Index

| Attribute | Detail |
|---|---|
| URL | `/articles` |
| Purpose | Present Alex as a designer who also writes and reflects |
| Primary modules | Author chip, featured bento, filter bar, article grid, newsletter card |
| Main sources | `src/pages/ArticlesPage.tsx`, `src/data/articles.ts`, `src/data/person.ts` |

Current behavior:
- Featured editorial picks are shown above the filter bar and always remain visible.
- The filter taxonomy is `All`, `Design`, `Tech`, and `Culture`.
- Three articles are marked featured; the remaining articles render in the list.

### Article Detail

| Attribute | Detail |
|---|---|
| URL | `/articles/:slug` |
| Purpose | Deliver a longform reading experience with supporting context |
| Primary modules | Reading progress bar, hero header, prose body, floating social sidebar, related articles module, newsletter card |
| Main sources | `src/pages/ArticlePage.tsx`, `src/components/article/FloatingSocialSidebar.tsx`, `src/components/article/ProseArticle.tsx`, `src/data/articles.ts` |

Current behavior:
- The hero uses the article image as a low-opacity background layer.
- The page pulls author identity from `person.ts`.
- Only the first article currently ships with a populated HTML `body`; the remaining article routes resolve, but their body area is effectively empty.

### Me

| Attribute | Detail |
|---|---|
| URL | `/me` |
| Purpose | Add personal depth beyond the project cards |
| Primary modules | Portrait panel, quick facts, bio, stats grid, skill bars, education timeline, activities list, interests bento, CTA |
| Main sources | `src/pages/MePage.tsx`, `src/data/person.ts`, `src/components/me/*` |

Current behavior:
- This is the most complete persona-driven route in the app.
- Most of the content is structured data rather than hardcoded JSX.
- Skills animate into view through the intersection-observer hook layer.

### Contact

| Attribute | Detail |
|---|---|
| URL | `/contact` |
| Purpose | Convert interest into outreach while reinforcing credibility |
| Primary modules | Hero/contact info, contact form, social links card, response-time panel, availability panel, portfolio highlights |
| Main sources | `src/pages/ContactPage.tsx`, `src/components/contact/ContactForm.tsx`, `.env.example` |

Current behavior:
- The form posts to Formspree using `VITE_FORMSPREE_ID`.
- Success and error states are handled client-side.
- The repository ships only a placeholder env template, so submissions work only after the form ID is configured.

---

## 4. Content Architecture

Primary structured content lives in:
- `src/data/person.ts`
- `src/data/projects.ts`
- `src/data/articles.ts`

Shared content models live in:
- `src/types/index.ts`

Current architecture reality:
- There is no CMS, no database, and no runtime content API.
- Project, article, and persona records are typed TypeScript exports.
- Some route-level copy is still embedded directly inside page components, especially on Home and Contact.
- Images used by the current experience are remote Google Aida CDN URLs rather than a local media library.

Content responsibilities:

| Content area | Source of truth |
|---|---|
| Persona, biography, stats, education, activities, interests | `src/data/person.ts` |
| Project cards and project detail payloads | `src/data/projects.ts` |
| Article metadata, featured flags, tags, and body HTML | `src/data/articles.ts` |
| Route headlines, CTA copy, some contact labels | Page components in `src/pages/` |

---

## 5. Design System Summary

Canonical token source: `src/styles/globals.css`

### Visual Direction

The site uses the Kinetic Cobalt system: dark editorial surfaces, a cobalt primary accent, rounded geometry, glassmorphism overlays, and restrained glow effects.

### Core Tokens

| Token group | Current values |
|---|---|
| Background | `#0b0c10` |
| Surface base | `#111318` |
| Surface ladder | `#1a1c1e`, `#1e1f23`, `#282a2f`, `#33353a` |
| Primary | `#0052FF` |
| Primary container | `#0041ca` |
| Text default | `#e2e2e6` |
| Text secondary | `#c4c6d0` |

### Typography

| Role | Font |
|---|---|
| Headline | Plus Jakarta Sans Variable |
| Body | Inter |
| Label | Inter |

### Shape Language

| Token | Value |
|---|---|
| Default radius | `1rem` |
| Small radius | `0.5rem` |
| Medium radius | `0.75rem` |
| Large radius | `2rem` |
| Extra large radius | `3rem` |
| Full pill radius | `9999px` |

### Utility Patterns

Defined utility classes and component styles:
- `.glass-panel`: translucent elevated panel with blur
- `.text-glow`: blue glow treatment for hero emphasis
- `.prose-article`: standardized article typography
- `.scrollbar-none`: hidden scrollbar utility

### Layout Principles

- Prefer layered surface changes over heavy separators.
- Use pill CTAs and rounded containers consistently.
- Keep the brightest accents for focus states, hero emphasis, and calls to action.
- Preserve the editorial bento-grid feeling on Home, Articles, and Me.

---

## 6. Constraints And Decisions Log

| Decision | Current choice | Reasoning |
|---|---|---|
| Frontend architecture | React SPA on Vite | The current codebase is route-driven and client-rendered, with shared layout and hook-based interactions. |
| Routing | React Router nested routes | All page structure is defined in `src/App.tsx`; the site does not use file-based routing or SSR. |
| Styling model | Tailwind CSS v4 with CSS-first `@theme` tokens | Tokens and utilities are centralized in `globals.css`, which keeps styling consistent across routes. |
| Content storage | Typed TypeScript data files | Structured portfolio content is stored locally in `src/data/`, which keeps the site portable and easy to edit. |
| Rich project storytelling | Optional `Project.detail` payload | The data model supports deep case studies without forcing every project to provide one yet. |
| Longform writing model | HTML string in `Article.body` | The current article renderer expects pre-authored HTML instead of markdown or CMS content. |
| Contact handling | Formspree via `VITE_FORMSPREE_ID` | The form can submit without a custom backend, but deployment must configure the env var. |
| Metadata | `react-helmet-async` in a client-rendered SPA | This keeps page titles and descriptions route-aware, with the known limitation that some social scrapers will miss JS-rendered `og:*` tags. |
| Image sourcing | Remote Google Aida CDN URLs | Current content and page imagery use remote URLs instead of a local image pipeline. |
| Documentation split | Product spec separate from architecture reference | `docs/Architecture.md` handles file-by-file technical reference so this spec can stay product-focused. |
| Persona source of truth | `src/data/person.ts` | The data file is more reliable than scattered inline strings, especially where naming drift exists. |

