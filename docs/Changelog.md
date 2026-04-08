# Changelog

All notable product milestones for this portfolio are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [0.3.0] - 2026-04-08

### Added
- Project detail routing at `/projects/:id`
- `ProjectDetail`, `TechCard`, `EvolutionStage`, and `MetricItem` models in `src/types/index.ts`
- Project-detail component set in `src/components/project/`: `ProjectHero`, `ProjectMission`, `ProjectTechBento`, `ProjectEvolution`, and `ProjectImpact`
- Detailed case-study content for `neural-synthesis-interface` in `src/data/projects.ts`
- Example documentation models in `docs/Example Documentation/`

### Changed
- `src/App.tsx` now includes the `projects/:id` route
- `src/components/projects/ProjectCard.tsx` now drives users into the project-detail route instead of a static case-study placeholder

## [0.2.0] - 2026-04-08

### Added
- Core documentation trio: `docs/Architecture.md`, `docs/guide.md`, and `docs/react-primer.md`
- `FloatingSocialSidebar` and `ArticleSidebarRelated` for the article-detail experience
- Article-page planning docs for the richer longform layout

### Changed
- `src/pages/ArticlePage.tsx` was upgraded from the initial detail route to a fuller editorial experience with hero metadata, action rail, author panel, and related content
- `src/data/articles.ts` was expanded to support richer article detail content

## [0.1.0] - 2026-04-06

### Added
- Initial Vite + React 19 + TypeScript 6 scaffold
- Tailwind CSS v4 setup with centralized theme tokens and utilities in `src/styles/globals.css`
- React Router route tree for Home, Projects, Articles, Article detail, Contact, Me, and Not Found
- Shared layout shell with navigation, mobile menu, footer, and scroll restoration
- Structured content layer in `src/data/` and shared interfaces in `src/types/index.ts`
- Custom hooks for carousel autoplay, reading progress, and intersection observation
- Initial article-detail support with `ProseArticle`, `ReadingProgressBar`, and `RelatedArticlesSidebar`
- Netlify SPA routing support via `public/_redirects`

### Changed
- The repository moved from the old static-export model to a typed React application with `npm run dev`, `npm run build`, `npm run preview`, and `npm run lint`
