# Guide: Adding & Editing Articles

**File to edit:** `src/data/articles.ts`

This file contains all your articles/writing. They appear in two places:
- The `/articles` page — a featured bento grid at the top, then a filterable card list below
- The `/articles/your-slug` page — the full article reading view (only if `body` has content)

---

## How the file is structured

Same as projects — a list of objects, each starting with `{` and ending with `},`:

```
export const articles = [
  {
    ... first article ...
  },
  {
    ... second article ...
  },
]
```

---

## Adding a new article (card only — no full text yet)

Copy and paste this block at the top of the list:

```ts
{
  id: '9',                              // unique — just use the next number in sequence
  slug: 'my-article-title-here',       // the URL: /articles/my-article-title-here
                                        // lowercase, hyphens, no spaces or special chars
  title: 'My Article Title',
  excerpt: 'One or two sentences shown on the card as a preview. Make it intriguing.',
  category: 'Tech',                    // must be exactly: 'Design', 'Tech', or 'Culture'
  readTime: 6,                         // number of minutes — roughly your word count ÷ 200
  date: 'April 2025',                  // displayed as-is, so write it how you want it
  imageUrl: 'https://...',             // card thumbnail image — or null for no image
  featured: false,
  body: '',                            // empty for now — fill this in when you write the piece
},
```

**No image?** Use `null` (no quotes):
```ts
imageUrl: null,
```
The card will show a generic article icon as the placeholder.

---

## Featuring an article in the bento grid

The bento grid at the top of `/articles` shows your featured articles as big visual cards. To feature an article, add these two fields:

```ts
featured: true,
featuredSize: 'large',    // or 'side'
```

**Rules for the bento:**
- Exactly **1** article should have `featuredSize: 'large'` — this is the big card on the left
- Up to **2** articles can have `featuredSize: 'side'` — these are the smaller cards stacked on the right
- Featured articles should always have an `imageUrl` — the bento uses the image as a full background

Everything else should have `featured: false` (and no `featuredSize` line needed).

---

## Writing the full article text (`body`)

The `body` field holds the full article content as **HTML** — a formatting language used on all websites. You do not need to know HTML deeply; just use the building blocks below.

The content goes between backticks `` ` `` instead of quote marks, because it spans multiple lines:

```ts
body: `
  <h2>Your section heading</h2>

  <p>Your first paragraph of text.</p>

  <p>Your second paragraph.</p>

  <h3>A sub-heading</h3>

  <p>More text.</p>
`,
```

### HTML building blocks to copy and paste

**Paragraph** — for normal text:
```html
<p>Your text goes here.</p>
```

**Section heading** — big heading between paragraphs:
```html
<h2>Your Heading</h2>
```

**Sub-heading** — smaller heading:
```html
<h3>Your Sub-Heading</h3>
```

**Bullet list:**
```html
<ul>
  <li>First point</li>
  <li>Second point</li>
  <li>Third point</li>
</ul>
```

**Numbered list:**
```html
<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>
```

**Pull quote** — highlighted quote box:
```html
<blockquote>
  <p>"The thing you want to stand out."</p>
</blockquote>
```

**Bold text** (inside a paragraph):
```html
<p>This is <strong>important</strong> and this is not.</p>
```

**Link:**
```html
<a href="https://example.com">link text here</a>
```

**Image inside the article:**
```html
<img src="https://..." alt="Describe what is in the image" />
```

**Hero image at the top of the article** (wide, rounded):
```html
<div class="rounded-2xl overflow-hidden mb-10 -mt-4">
  <img src="https://..." alt="Describe what is in the image" class="w-full h-[400px] object-cover" />
</div>
```

**Code snippet** (inline, inside a sentence):
```html
<p>Run <code>npm install</code> to get started.</p>
```

---

### Tip: write in Markdown, convert to HTML

If writing raw HTML feels awkward, write your article normally in a Markdown editor (like [Notion](https://notion.so), [HackMD](https://hackmd.io), or even VS Code's Markdown preview), then convert it:

1. Write in Markdown (use `##` for headings, `**bold**`, etc.)
2. Paste into [markdowntohtml.com](https://markdowntohtml.com)
3. Copy the HTML output into the `body` field

---

## Adding tags (shown on the article detail page)

Optional — tags appear at the top of the full article view:

```ts
tags: ['Design Theory', 'UX Research', 'Accessibility'],
```

---

## Checklist for a new article

- [ ] `id` — unique string (next number in the sequence)
- [ ] `slug` — kebab-case URL, no spaces (becomes `/articles/your-slug`)
- [ ] `title` and `excerpt` written
- [ ] `category`, `readTime`, `date` filled in
- [ ] `imageUrl` set (or `null`)
- [ ] `featured: false` unless it goes in the bento grid
- [ ] `body: ''` is fine to start with — fill it in when you write the article

---

## Removing the placeholder articles

All 8 existing articles (`architectural-dynamics-the-future-of-user-interfaces`, etc.) are fake template content. Delete their blocks and replace with your own writing.

Keep at least one article to avoid an empty page.
