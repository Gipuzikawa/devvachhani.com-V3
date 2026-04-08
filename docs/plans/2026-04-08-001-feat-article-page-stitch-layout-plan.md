---
title: "feat: Implement Stitch Article Page Layout (Three-Column Grid)"
type: feat
status: active
date: 2026-04-08
---

# feat: Implement Stitch Article Page Layout (Three-Column Grid)

## Overview

The Stitch AI Design reference (`Stitch_AI_Design/article_page_template_v2_cohesive_theme/code.html`) defines a three-column article layout that is not reflected in the current React `ArticlePage.tsx`. The current page uses a simple centered single-column layout. This plan brings the article page into alignment with the approved design.

## Problem Frame

The current `ArticlePage.tsx` is functional but visually diverges from the Stitch design in four ways:

1. **Missing left floating social sidebar** — The design shows sticky like/share/bookmark icon buttons in a `col-span-1` left column (desktop only).
2. **No styled article card** — The article body should be wrapped in a `bg-surface-container-low rounded-xl shadow-2xl` card.
3. **No right sidebar** — The design puts compact related articles and a newsletter card in a `col-span-4` right column. Currently both are either missing (newsletter) or shown at the bottom in a three-column card grid (related articles).
4. **Hero alignment** — The Stitch hero is left-aligned on desktop (`md:text-left`, `md:items-start`) with a `min-h-[716px]` full-bleed background image at `scale-105`, `opacity-20`. The current hero is centered.

## Requirements Trace

- R1. Left sticky social sidebar with Like, Share, Bookmark circular buttons (desktop only, `hidden lg:flex`)
- R2. Article section uses `grid grid-cols-1 lg:grid-cols-12 gap-12` with three columns: 1 / 7 / 4
- R3. Article body rendered inside a `bg-surface-container-low rounded-xl` card with proper padding and border
- R4. Right sidebar contains: compact related articles card (thumbnail + title + read time) + newsletter card
- R5. Newsletter card appears on the article page via the right sidebar (currently missing)
- R6. Hero is left-aligned on desktop, full-bleed bg image at `scale-105 opacity-20` with gradient overlay, `min-h-[60vh]` or `min-h-[716px]`
- R7. Bottom "Related Articles" section is removed — replaced by the right sidebar

## Scope Boundaries

- No backend wiring for like/share/bookmark — buttons are visual only
- Newsletter subscription uses the same mock `alert()` behavior as the existing `NewsletterCard`
- No changes to routing, data, `articles.ts`, or any other page
- No changes to `ProseArticle`, `ReadingProgressBar`, or global CSS

## Context & Research

### Relevant Code and Patterns

- Reference design: `Stitch_AI_Design/article_page_template_v2_cohesive_theme/code.html` (lines 149–268: the 12-col grid section)
- Current implementation: `src/pages/ArticlePage.tsx` — full file, ~175 lines
- `src/components/article/RelatedArticlesSidebar.tsx` — currently renders `ArticleCard` grid (wrong format for sidebar)
- `src/components/articles/NewsletterCard.tsx` — reusable, already exists, can be imported directly
- `src/components/articles/ArticleCard.tsx` — full card format, not suitable for compact sidebar
- `src/styles/globals.css` — `.glass-panel`, `.text-glow`, `.prose-article` are defined here

### Patterns to Follow

- Column structure: `hidden lg:flex lg:col-span-1` for the left sidebar (mirrors Stitch exactly)
- Sticky sidebar: `sticky top-32 h-fit` (same pattern used in the Stitch reference)
- Compact article row in sidebar: `flex gap-4` with `w-20 h-20 rounded-lg` thumbnail — matches Stitch sidebar related articles pattern
- Circular action button: `w-12 h-12 rounded-full bg-surface-container-high hover:bg-primary/20 border border-outline-variant/10` — defined in Stitch reference, consistent with other icon buttons in the codebase
- Newsletter card: reuse `src/components/articles/NewsletterCard.tsx` — already styled with gradient and form

## Key Technical Decisions

- **New `FloatingSocialSidebar` component**: Extracted to `src/components/article/FloatingSocialSidebar.tsx` rather than inlined in `ArticlePage.tsx` — keeps the page file manageable and the component is named clearly.
- **New `ArticleSidebarRelated` component** (not updating `RelatedArticlesSidebar`): The existing `RelatedArticlesSidebar` renders full `ArticleCard` instances in a three-column bottom grid and serves the current bottom section layout. Creating a separate compact component avoids coupling and leaves the bottom section available if the design changes again. The bottom related articles section is removed once the right sidebar is implemented (R7).
- **Reuse `NewsletterCard` directly**: No prop variants needed — the existing card style from `src/components/articles/NewsletterCard.tsx` is compatible with the sidebar slot.
- **Hero restructure in `ArticlePage.tsx`**: No new component — the hero is page-specific. The change is to update alignment classes and add `min-h-[60vh]`, `scale-105` on the bg image, and switch from centered to `md:text-left md:items-start`.

## Open Questions

### Resolved During Planning

- **Should the bottom related articles section be kept?** No — R7 removes it. The Stitch design consolidates related articles entirely into the right sidebar. The existing `RelatedArticlesSidebar` component remains in the codebase but is no longer used by `ArticlePage`.
- **Should `FloatingSocialSidebar` use `onClick` handlers?** No functional wiring — the buttons are visual only per scope boundary. Use `type="button"` with no handler, or an `href="#"` pattern matching the Stitch reference.
- **Can `NewsletterCard` from `src/components/articles/` be used in `src/pages/ArticlePage.tsx`?** Yes — it is a shared component under `src/components/`, cross-page imports are standard in this React architecture.

### Deferred to Implementation

- Whether the social sidebar needs `aria-label` additions — implementer should check against the existing accessibility patterns in the codebase.

## Implementation Units

- [ ] **Unit 1: `FloatingSocialSidebar` component**

  **Goal:** Create the sticky left sidebar with Like, Share, Bookmark circular icon buttons.

  **Requirements:** R1

  **Dependencies:** None

  **Files:**
  - Create: `src/components/article/FloatingSocialSidebar.tsx`

  **Approach:**
  - Render a `<aside>` with `hidden lg:flex lg:col-span-1 flex-col items-center gap-6 sticky top-32 h-fit`
  - Three `<button type="button">` elements, each `w-12 h-12 rounded-full bg-surface-container-high hover:bg-primary/20 border border-outline-variant/10 flex items-center justify-center transition-all group`
  - Icons: `thumb_up`, `share`, `bookmark` from `material-symbols-outlined`
  - Icon color: `text-on-surface-variant group-hover:text-primary transition-colors`
  - No click handlers (visual only per scope)

  **Patterns to follow:**
  - Stitch reference lines 152–160 for exact classes
  - Icon button pattern from `src/components/articles/ArticleFilterBar.tsx` if present, otherwise direct from Stitch

  **Test scenarios:**
  - Happy path: Three buttons render with correct icons on desktop (`lg:` classes apply)
  - Happy path: Sidebar is hidden on mobile (verify `hidden lg:flex` renders no visible element on small viewport)
  - Edge case: No crashes when rendered without any props

  **Verification:**
  - Component renders without TypeScript errors; buttons visible on desktop, hidden on mobile

---

- [ ] **Unit 2: `ArticleSidebarRelated` component**

  **Goal:** Compact related articles list for the right sidebar (thumbnail + title + read time, vertical stack).

  **Requirements:** R4

  **Dependencies:** None (reads from `Article` type)

  **Files:**
  - Create: `src/components/article/ArticleSidebarRelated.tsx`

  **Approach:**
  - Accepts `{ currentSlug: string; allArticles: Article[] }` — same interface as `RelatedArticlesSidebar`
  - Filters out current article, takes first 3
  - Wraps in a card: `bg-surface-container-high rounded-lg p-6 border border-outline-variant/10`
  - Header: `h3` with `trending_up` icon and "Related Articles" text (matches Stitch line 217–219)
  - Each related article: `<Link>` with `flex gap-4` layout — `w-20 h-20 rounded-lg` thumbnail, title in `font-semibold text-sm group-hover:text-primary`, read time + date in `text-xs text-on-surface-variant`
  - Image fallback: if `imageUrl` is null, render a `bg-surface-container-highest` placeholder div of same size
  - "View All Articles" link button at bottom: `w-full py-3 rounded-full border border-primary/20 text-primary text-sm font-bold hover:bg-primary/10`
  - Link destination for individual articles: `/articles/${article.slug}`; for View All: `/articles`

  **Patterns to follow:**
  - Stitch reference lines 221–252 for card structure
  - `src/components/articles/ArticleCard.tsx` for Link and image patterns

  **Test scenarios:**
  - Happy path: Three related articles render with thumbnails, titles, and read-time text
  - Happy path: Current article is excluded from the list
  - Edge case: Article with `imageUrl: null` renders placeholder div, not broken `<img>` tag
  - Edge case: Fewer than 3 other articles — renders however many exist without errors

  **Verification:**
  - Component renders 0–3 articles without errors; null image case shows placeholder

---

- [ ] **Unit 3: Restructure `ArticlePage.tsx`**

  **Goal:** Update the article page to use the three-column grid layout and left-aligned hero per the Stitch design.

  **Requirements:** R2, R3, R4, R5, R6, R7

  **Dependencies:** Unit 1 (`FloatingSocialSidebar`), Unit 2 (`ArticleSidebarRelated`)

  **Files:**
  - Modify: `src/pages/ArticlePage.tsx`

  **Approach:**

  **Hero section changes:**
  - Add `min-h-[60vh]` (or `min-h-[600px]`) to the section; keep `relative overflow-hidden`
  - Background image: add `scale-105` class alongside the existing `opacity-20`
  - Change hero content container from `max-w-4xl mx-auto ... text-center` to `max-w-5xl w-full md:text-left` — mirrors Stitch line 120
  - Change author/meta flex row from `justify-center` to `md:justify-start`
  - Category badge and tag row: `justify-center md:justify-start`
  - Keep the "← View All Articles" back link, position it `self-center md:self-start`

  **Article section restructure:**
  - Replace the current `<article className="max-w-3xl mx-auto px-6 pb-20">` block and the `<section>` Related Articles block with a single `<section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-[-4rem] relative z-20 pb-20">`
  - Column 1 (left sidebar): `<FloatingSocialSidebar />`
  - Column 2 (main article, `lg:col-span-7`): `<article className="bg-surface-container-low rounded-xl p-8 md:p-12 shadow-2xl border border-outline-variant/10">`
    - Inside: `<ProseArticle body={article.body} />`
    - Then: tags section (move from bottom)
    - Then: share buttons row (move from bottom)
    - Then: author card (move from below article)
  - Column 3 (right sidebar, `lg:col-span-4`): `<aside className="space-y-6">`
    - `<ArticleSidebarRelated currentSlug={slug ?? ''} allArticles={articles} />`
    - `<NewsletterCard />`
  - Remove the old bottom Related Articles `<section>` entirely (R7)

  **Imports to add:**
  - `FloatingSocialSidebar` from `../components/article/FloatingSocialSidebar`
  - `ArticleSidebarRelated` from `../components/article/ArticleSidebarRelated`
  - `NewsletterCard` from `../components/articles/NewsletterCard`

  **Patterns to follow:**
  - Stitch reference lines 149–268 for the overall grid and column structure
  - Existing `src/pages/ArticlesPage.tsx` for how `NewsletterCard` is used in page context

  **Test scenarios:**
  - Happy path: Full article page renders — hero, left sidebar, article card, right sidebar all visible
  - Happy path: Right sidebar newsletter card form renders with email input and subscribe button
  - Happy path: Left social sidebar is hidden on mobile, visible on `lg` and above
  - Happy path: Article with no `imageUrl` renders hero without a broken background image
  - Edge case: Navigating to a non-existent slug still renders the "not found" fallback without layout errors
  - Integration: `ReadingProgressBar` still visible (fixed overlay, unaffected by layout change)

  **Verification:**
  - `npm run build` passes without TypeScript errors
  - Page at `/articles/architectural-dynamics-the-future-of-user-interfaces` shows three-column layout on desktop
  - Newsletter card is visible in right sidebar
  - Left sidebar buttons are hidden on mobile

## System-Wide Impact

- **Interaction graph:** Only `ArticlePage.tsx` and two new article-namespace components are changed. `RelatedArticlesSidebar` is no longer imported by `ArticlePage` — it remains in the codebase but is now unused. If it's used nowhere else, it can be deleted as dead code (out of scope for this plan).
- **Error propagation:** No new async behavior or data fetching. All data comes from the static `articles` array.
- **Unchanged invariants:** Routing, `articles.ts` data, `ProseArticle`, `ReadingProgressBar`, `Helmet` meta tags, and the 404 fallback path are untouched.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| `mt-[-4rem]` negative margin on the grid section creates overlap with the hero — may need adjustment for mobile | Test on mobile viewport; fall back to `mt-0` on mobile with `lg:-mt-16` |
| Importing `NewsletterCard` from `src/components/articles/` into `src/pages/ArticlePage.tsx` is a cross-directory import — acceptable here but not a pattern to generalise | Acceptable per existing architecture (no shared `components/common/` restriction found) |
| `RelatedArticlesSidebar` becomes dead code — a stale import warning could appear in the future | The component file remains but its import in `ArticlePage.tsx` is removed; no immediate risk |

## Sources & References

- Reference design: `Stitch_AI_Design/article_page_template_v2_cohesive_theme/code.html`
- Related files: `src/pages/ArticlePage.tsx`, `src/components/article/RelatedArticlesSidebar.tsx`, `src/components/articles/NewsletterCard.tsx`
- Design spec: `stitch_ambitious_student_portfolio/kinetic_ledger_soft/DESIGN.md` (if present) or inline Tailwind config
