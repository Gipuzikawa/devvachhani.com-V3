# Personalisation Guide

Everything you need to make this portfolio your own, and a page-by-page explainer so you know what each section does.

**If you're new to React**, read [react-primer.md](react-primer.md) first — it explains the concepts (components, props, data files) so this guide makes more sense. For a full technical map of the codebase, see [Architecture.md](Architecture.md).

---

## Contents

1. [Quick orientation](#1-quick-orientation)
2. [Your identity — `src/data/person.ts`](#2-your-identity)
3. [Your projects — `src/data/projects.ts`](#3-your-projects)
4. [Your articles — `src/data/articles.ts`](#4-your-articles)
5. [Changing colours](#5-changing-colours)
6. [Changing fonts](#6-changing-fonts)
7. [Page titles and meta descriptions](#7-page-titles-and-meta-descriptions)
8. [Page-by-page explainer](#8-page-by-page-explainer)
9. [The contact form](#9-the-contact-form)

---

## 1. Quick Orientation

Almost everything visible on the site comes from three files:

```
src/data/person.ts      ← Your name, bio, skills, education, interests
src/data/projects.ts    ← Your portfolio projects
src/data/articles.ts    ← Your writing / articles
```

**The workflow:** Open a terminal in the project folder, run `npm run dev`, then open `http://localhost:5173` in your browser. Edit a data file and save — the browser updates instantly without reloading.

You do **not** need to touch any component files (`src/components/`) or page files (`src/pages/`) to personalise the site. Those files control the layout and style. The data files control the content.

---

## 2. Your Identity

**File:** `src/data/person.ts`

This file exports a single `person` object. Here is what each field does:

### Basic info

```ts
name: 'Alex Chen',
role: 'UI/UX Designer · High School Junior',
location: 'San Francisco Bay Area, CA',
```

- `name` — appears in the nav logo, page headings, and meta titles
- `role` — subtitle under your name on the Me page
- `location` — shown in quick facts on the Me page

### Photos

```ts
avatarUrl: 'https://...',     // Small circular photo (nav, cards)
portraitUrl: 'https://...',   // Larger photo on the Me page
```

To use your own images, you have two options:

**Option A — Hosted URL:** Upload your image to any image host (Cloudinary, Imgur, your own server) and paste the URL here.

**Option B — Local file:** Put the image in `src/assets/` (e.g., `src/assets/avatar.jpg`) and change the value to `'/src/assets/avatar.jpg'`. This only works in dev mode; for the built site, place the file in `public/` and use `'/avatar.jpg'` instead.

### Bio

```ts
bio: [
  "First paragraph of your bio.",
  "Second paragraph.",
],
```

Each string in the array becomes a paragraph on the Me page. You can have as many paragraphs as you want. Just add or remove strings from the array.

### Quick facts

```ts
quickFacts: [
  { icon: 'school', text: 'Junior at Westlake HS, CA' },
  { icon: 'location_on', text: 'San Francisco Bay Area' },
],
```

Each entry shows a Material Symbols icon + a line of text. To change the icon, use any name from [Material Symbols](https://fonts.google.com/icons) — replace spaces with underscores (e.g., `favorite` → `'favorite'`, `thumb up` → `'thumb_up'`).

### Stats

```ts
stats: [
  { value: '3+', label: 'Years designing' },
  { value: '12+', label: 'Projects shipped' },
],
```

Four numbers displayed in a grid on the Me page. Change `value` and `label` to your own numbers. You can have exactly four stats.

### Skills

```ts
skills: [
  { name: 'Figma / Prototyping', percent: 95, color: 'primary' },
  { name: 'React / TypeScript', percent: 80, color: 'primary' },
],
```

Each skill renders as an animated progress bar. `percent` is 0–100. `color` accepts `'primary'` (blue), `'secondary'` (grey-blue), or `'tertiary'` (indigo).

### Education

```ts
education: [
  {
    institution: 'Westlake High School',
    role: 'Junior · GPA 4.2 (Weighted)',
    period: '2022 – 2026',
    description: 'AP Computer Science A, AP Art & Design...',
    accentColor: 'primary',
  },
],
```

Each entry renders as a card in the education timeline on the Me page. `accentColor` is `'primary'` or `'tertiary'` and sets the left-border accent colour. Add as many entries as you like.

### Activities

```ts
activities: [
  {
    title: 'Coding Club — President',
    description: 'Grew membership from 8 to 60+ students.',
    period: '2023 – Now',
  },
],
```

Shown as a list on the Me page. Add or remove objects freely.

### Interests

```ts
interests: [
  // Image-style card (spans wider)
  {
    type: 'image',
    title: 'Photography',
    description: '...',
    imageUrl: 'https://...',
    imageAlt: 'Description for screen readers',
    icon: 'photo_camera',
    colSpan: 'sm:col-span-2',   // Makes it wider in the grid
    tags: [],
  },
  // Text-style card
  {
    type: 'card',
    title: 'Reading',
    description: '...',
    icon: 'menu_book',
    iconColor: 'text-tertiary-dim',
    bgClass: 'bg-gradient-to-br from-tertiary/10 to-primary/5 border border-tertiary/20',
    tags: [
      { label: 'Design', className: 'text-xs bg-tertiary/10 text-tertiary-dim px-2 py-1 rounded-full font-label' },
    ],
  },
],
```

The interests section is a bento grid on the Me page. There are two card types:

- **`type: 'image'`** — shows an image with an overlay. Good for hobbies with a strong visual. Set `colSpan: 'sm:col-span-2'` to make it span two columns (wider).
- **`type: 'card'`** — text-only with a coloured background. Use `bgClass` to set the background gradient/colour and `iconColor` for the icon's text colour.

Tags are optional on both types. Use the `className` property to set their colour — copy the pattern from an existing tag and swap the colour token (e.g., `text-tertiary-dim` → `text-primary-dim`).

---

## 3. Your Projects

**File:** `src/data/projects.ts`

This file exports a `projects` array. Each object is one project card.

```ts
{
  id: 'my-project-slug',           // Unique identifier (use kebab-case, no spaces)
  year: 2024,                       // Displayed in the timeline
  category: 'Design',              // 'Research' | 'Design' | 'Dev'
  title: 'My Project',
  description: 'Short description shown on the card.',
  tags: ['Design', 'Mobile'],      // Small labels on the card
  duration: '4 months',            // Optional — shown in project details
  team: 'Solo',                    // Optional
  imageUrl: 'https://...',         // Set to null if you have no image
  placeholderIcon: 'star',         // Material Symbols icon shown when imageUrl is null
  caseStudyUrl: '#',               // Link for the "View Case Study" button
  accentColor: 'primary',          // 'primary' | 'tertiary' | 'yellow'
  award: 'AIGA 1st Place',         // Optional — shows an award badge on the card
},
```

**To add a project:** Copy an existing object and paste it at the top of the array (projects display in array order, newest first by convention). Change all the fields.

**`category`** drives the filter tabs at the top of the Projects page. Make sure each project uses exactly one of `'Research'`, `'Design'`, or `'Dev'`.

**`imageUrl: null`** — if you don't have an image, set this to `null` and set `placeholderIcon` to a Material Symbols icon name. A coloured background with the icon will be shown instead.

**`accentColor`** sets the left-border accent and hover highlight colour. `'primary'` = blue, `'tertiary'` = indigo, `'yellow'` = yellow.

---

## 4. Your Articles

**File:** `src/data/articles.ts`

Each object in the `articles` array is one article.

```ts
{
  id: '1',                             // Unique string ID
  slug: 'my-article-url-slug',         // Used in the URL: /articles/my-article-url-slug
  title: 'My Article Title',
  excerpt: 'Short summary shown in cards and previews.',
  category: 'Design',                  // 'Design' | 'Tech' | 'Culture'
  readTime: 8,                         // Minutes (you estimate this yourself)
  date: 'January 2025',
  imageUrl: 'https://...',             // Cover image, or null
  featured: true,                      // Show in the featured bento grid?
  featuredSize: 'large',               // 'large' (big tile) | 'side' (smaller tile) — only if featured: true
  tags: ['Design Theory', 'UX'],
  body: `<h2>First heading</h2><p>Article content as HTML...</p>`,
},
```

**`slug`** — this becomes the article's URL. Keep it lowercase with hyphens, no spaces or special characters. Example: `'designing-for-accessibility'` → URL `/articles/designing-for-accessibility`.

**`body`** — the full article content. This is an HTML string. You can use:
- `<h2>`, `<h3>` for headings
- `<p>` for paragraphs
- `<ul>` / `<li>` for lists
- `<blockquote>` for pull quotes
- `<strong>` for bold
- `<img>` for images

The article page applies `.prose-article` styling from `src/styles/globals.css`, which handles spacing and typography automatically.

**`featured`** — set to `true` to show the article in the featured bento grid at the top of the Articles page. `featuredSize: 'large'` makes it the big tile; `featuredSize: 'side'` makes it a smaller tile. You should typically have one `'large'` and one or two `'side'` featured articles.

---

## 5. Changing Colours

**File:** `src/styles/globals.css`

The entire colour palette is defined in the `@theme {}` block at the top of this file as CSS custom properties. Tailwind reads these and makes them available as utility classes.

To change the brand colour (the blue used for CTAs, links, and accents):

```css
--color-primary: #0052FF;           /* Change this hex value */
--color-primary-container: #0041ca; /* Darker shade — used for hover states */
--color-on-primary: #ffffff;        /* Text colour on top of primary buttons */
```

To change the background colour:

```css
--color-background: #0b0c10;
```

The surface hierarchy (card backgrounds) builds on top of this:

```css
--color-surface: #111318;
--color-surface-container-low: #1a1c1e;
--color-surface-container: #1e1f23;
--color-surface-container-high: #282a2f;
--color-surface-container-highest: #33353a;
```

If you change `--color-background`, adjust the entire surface hierarchy proportionally so cards remain visible against the background. A good rule: each step in the hierarchy should be ~4-6 points lighter in lightness than the previous.

**Tip:** Changing `--color-primary` alone is the quickest way to give the site a completely different personality (purple, teal, green, etc.). The rest of the colour system is neutral enough to work with most primary colours.

---

## 6. Changing Fonts

Fonts are loaded in **two places**:

**1. `src/main.tsx`** — font packages are imported at the top:

```ts
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
```

These npm packages bundle the font files so they load without a CDN. To swap fonts, find replacements on [Fontsource](https://fontsource.org), install the package (`npm install @fontsource/your-font`), and replace the import.

**2. `src/styles/globals.css`** — font family tokens:

```css
--font-headline: "Plus Jakarta Sans Variable", "Plus Jakarta Sans", sans-serif;
--font-body: "Inter", sans-serif;
--font-label: "Inter", sans-serif;
```

Update these values to match your chosen font's name. `font-headline` is used for all headings; `font-body` and `font-label` are used for body text and small UI elements respectively.

---

## 7. Page Titles and Meta Descriptions

Each page sets its own `<title>` tag using the `react-helmet-async` library. Look at the top of any page file:

```tsx
// src/pages/HomePage.tsx
import { Helmet } from 'react-helmet-async'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Dev Vachhani | Portfolio.OS</title>
        <meta name="description" content="..." />
      </Helmet>
      {/* rest of page */}
    </>
  )
}
```

To change a page's browser tab title or the description shown in Google results, open the relevant file from `src/pages/` and edit the text inside `<Helmet>`.

**Pages to update:**
- `src/pages/HomePage.tsx`
- `src/pages/ProjectsPage.tsx`
- `src/pages/ArticlesPage.tsx`
- `src/pages/MePage.tsx`
- `src/pages/ContactPage.tsx`

---

## 8. Page-by-Page Explainer

### Home (`/`)

The landing page. It has three sections:

1. **Hero** — large heading, a short tagline, two CTA buttons ("View Projects" and "Read Articles"), and a `HeroCarousel` showing 4 rotating images. The carousel images are defined in `src/pages/HomePage.tsx` in the `CAROUSEL_SLIDES` array — swap the `src` URLs to use your own photos.
2. **Skills grid** — a bento grid of design tool cards (`BentoSkillsGrid`). The content here is hardcoded in the component itself (`src/components/home/BentoSkillsGrid.tsx`) rather than coming from the data layer.
3. **Accomplishments** — cards for awards and highlights. Also hardcoded in `AccomplishmentCard.tsx`.

### Projects (`/projects`)

A vertical alternating timeline of your projects. Driven entirely by `src/data/projects.ts`. The filter tabs at the top filter by `category`. Projects display in the order they appear in the array.

### Articles (`/articles`)

Two sections:

1. **Featured bento** — a grid showing articles with `featured: true` from `src/data/articles.ts`
2. **Article list** — all articles as cards with category filter tabs

### Article detail (`/articles/:slug`)

The full article view. The page finds the correct article by matching the URL slug to `Article.slug` in `src/data/articles.ts`, then renders the `body` HTML through the `ProseArticle` component. The reading progress bar at the top is driven by `useReadingProgress`.

### Me (`/me`)

Your bio page. Pulls entirely from `src/data/person.ts`. Contains: portrait, bio paragraphs, quick facts, stats grid, skills bars, education timeline, activities list, and interests bento.

### Contact (`/contact`)

A contact form. See [Section 9](#9-the-contact-form) below.

### 404 (`*`)

A simple "page not found" screen with a button back to home. No personalisation needed.

---

## 9. The Contact Form

**File:** `src/components/contact/ContactForm.tsx`

The contact form is **JavaScript-only** — when submitted, it swaps the form out for a success message. No email is actually sent. There is no backend connected.

This is fine for a portfolio site where the primary contact method is social links or email — you can display your email address directly on the page instead.

**To wire up real email delivery**, you would need to integrate a third-party form service. Popular options for static sites:
- [Formspree](https://formspree.io) — add their endpoint as the form `action`
- [EmailJS](https://www.emailjs.com) — call their API from the submit handler
- [Netlify Forms](https://www.netlify.com/products/forms/) — works automatically if you deploy to Netlify

None of these require a backend — they're all client-side or serverless. Pick whichever matches your hosting setup.
