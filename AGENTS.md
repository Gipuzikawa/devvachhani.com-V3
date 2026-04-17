# Repository Guidelines

## Project Structure & Module Organization

This repository is a React 19 + Vite + TypeScript single-page portfolio site for Dev Vachhani. Application code lives in `src/`, with routing in `src/App.tsx`.

- `src/components/`: reusable UI components.
- `src/pages/`: route-level page components.
- `src/layouts/`: shared page layout wrappers.
- `src/data/`: portfolio content sources such as `person.ts`, `projects.ts`, and `articles.ts`.
- `src/types/`: shared TypeScript contracts. Keep these in sync with data schema changes.
- `src/styles/`: global styles and Tailwind v4 design tokens.
- `src/assets/`: imported source assets.
- `public/`: static files served as-is, including `favicon.svg`, `icons.svg`, `CNAME`, and `_redirects`.
- `docs/`: project documentation and plans.

## Build, Test, and Development Commands

- `npm run dev`: start the Vite development server.
- `npm run build`: run TypeScript project builds, then create the production Vite build.
- `npm run lint`: run ESLint across the repository.
- `npm run preview`: preview the production build locally.

Before finishing a change, run `npm run build` and `npm run lint`.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Prefer existing local patterns over new abstractions. Name components and layouts with PascalCase, for example `PageLayout.tsx`; name hooks with `use` prefixes, for example `useScrollSpy.ts`; keep data modules in camelCase.

ESLint is configured in `eslint.config.js` with TypeScript, React Hooks, and React Refresh rules. Follow the Kinetic Cobalt visual system: background `#0b0c10`, primary `#0052FF`. Do not modify `src/styles/globals.css` design tokens unless the task targets the design system.

## Testing Guidelines

No dedicated test runner or test script is currently configured. For now, treat `npm run build` and `npm run lint` as required verification. If tests are added, place them near the module they cover using `*.test.ts` or `*.test.tsx`, and add an `npm test` script.

## Commit & Pull Request Guidelines

Use concise, imperative commit subjects such as `Add project detail cards` or `Fix article metadata types`. Keep each commit focused on one logical change.

Pull requests should include a short summary, verification results for build and lint, linked issues when applicable, and screenshots or screen recordings for visible UI changes.

## Security & Configuration Tips

Do not commit secrets. Use `.env.example` to document required environment variables. Keep third-party form, analytics, or API configuration isolated and reviewed before merging.
