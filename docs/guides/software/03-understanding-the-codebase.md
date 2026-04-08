# Guide: Understanding the Codebase

You do not need to understand the full codebase to personalise the site — the data files in `src/data/` are enough for all content changes. But if you want to understand how the pieces fit together, or need to change something that is not in a data file, this guide explains it.

---

## The big picture

This site is a **React** application. React is a JavaScript library for building user interfaces. Instead of one big HTML file, the site is split into many small **components** — reusable pieces of UI like a navigation bar, a project card, or an article list.

When you visit the site, React reads your data files (`person.ts`, `projects.ts`, `articles.ts`) and builds the HTML on the fly in the browser. There is no database, no server generating pages — it is all JavaScript running in the visitor's browser.

**Vite** is the tool that compiles and bundles everything before deployment, and also runs the local development server.

**TypeScript** is the language used instead of plain JavaScript. The main difference you will notice: variables have types declared (like `: string` or `: number`). This helps catch mistakes early. You do not need to write TypeScript — just be careful not to break the existing type annotations when editing.

---

## The folder structure — what lives where

```
src/
├── data/           ← YOUR CONTENT. Edit these files.
│   ├── person.ts   ← Your identity, bio, skills, education
│   ├── projects.ts ← Your portfolio projects
│   └── articles.ts ← Your articles/writing
│
├── types/
│   └── index.ts    ← The shape of the data (what fields are allowed)
│                      Read this to understand what you can put in the data files.
│
├── pages/          ← One file per page of the site
│   ├── HomePage.tsx
│   ├── ProjectsPage.tsx
│   ├── ArticlesPage.tsx
│   ├── ArticlePage.tsx
│   ├── MePage.tsx
│   ├── ContactPage.tsx
│   └── NotFoundPage.tsx
│
├── components/     ← Reusable UI pieces
│   ├── layout/     ← Navbar, Footer, mobile menu
│   ├── ui/         ← Generic primitives (buttons, cards, tags)
│   ├── home/       ← Components used only on the home page
│   ├── projects/   ← Components used only on the projects page
│   ├── articles/   ← Components used only on the articles page
│   ├── article/    ← Components used on the single article page
│   ├── contact/    ← The contact form
│   └── me/         ← Components used only on the Me page
│
├── styles/
│   └── globals.css ← All colours, fonts, and design tokens
│
├── layouts/
│   └── PageLayout.tsx ← The shared wrapper: Navbar + page content + Footer
│
└── App.tsx         ← Defines which URL maps to which page component
```

---

## The page files

Each file in `src/pages/` is a **page component** — it defines what appears at a particular URL.

| File | URL | What it shows |
|---|---|---|
| `HomePage.tsx` | `/` | Hero carousel, skills grid, accomplishments |
| `ProjectsPage.tsx` | `/projects` | Timeline of all projects |
| `ArticlesPage.tsx` | `/articles` | Featured bento + filterable article list |
| `ArticlePage.tsx` | `/articles/:slug` | Single article reading view |
| `MePage.tsx` | `/me` | Bio, skills, education, interests |
| `ContactPage.tsx` | `/contact` | Contact form |
| `NotFoundPage.tsx` | `*` (anything else) | 404 page |

If you need to change hard-coded text on a page (like the heading or intro paragraph), open the relevant page file and look for it directly. These files are readable even without knowing React — the structure looks like HTML.

---

## What `.tsx` files look like

A `.tsx` file is TypeScript with HTML-like syntax mixed in (called JSX). It looks like this:

```tsx
export default function ProjectsPage() {
  return (
    <section>
      <h1>My Projects</h1>
      <p>Here are things I've built.</p>
    </section>
  )
}
```

The HTML-looking parts (`<section>`, `<h1>`, etc.) are not real HTML — they are JSX, which React converts to real HTML. For the purposes of editing text, you can treat them exactly like HTML.

---

## The design system — colours and fonts

All visual design tokens (colours, border radius, fonts) are defined in `src/styles/globals.css` inside a `@theme {}` block. Tailwind reads these and turns them into utility classes.

You do not need to edit this file unless you want to change the colour scheme or typography. If you do, the key colour token is:

```css
--color-primary: #0052FF;  /* the blue used everywhere */
```

Change this one value and the entire site's blue accent colour updates.

---

## Where page titles and SEO tags live

Each page file has a `<Helmet>` block near the top that sets the browser tab title and social preview metadata:

```tsx
<Helmet>
  <title>Projects | Alex Chen · Portfolio</title>
  <meta name="description" content="..." />
</Helmet>
```

You need to update these in each page file to use your own name. Search for `Alex Chen` across all files in `src/pages/` and replace with your name.

---

## What you should NOT touch

Unless you know what you are doing:

- `src/main.tsx` — the app entry point. No reason to edit this.
- `vite.config.ts` — the build configuration. Only edit if you know Vite.
- `tsconfig.json` / `tsconfig.app.json` — TypeScript settings. Leave these alone.
- `stitch_ambitious_student_portfolio/` — the original design export. Read-only reference. Not used by the live site.
- `node_modules/` — automatically generated. Never edit files here.
- `dist/` — the build output. Never edit files here; they get overwritten on the next build.

---

## Making non-content changes

For anything beyond content changes — changing a layout, adding a new section, modifying a component — follow the workflow in `CLAUDE.md`: describe what you want to Claude Code, and it will implement the change using Codex. You do not need to write React or TypeScript yourself.
