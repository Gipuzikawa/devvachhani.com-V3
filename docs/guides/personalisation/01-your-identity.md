# Guide: Updating Your Identity

**File to edit:** `src/data/person.ts`

This one file controls everything about **you** — your name, bio, skills, education, and interests. It feeds the Home page hero and the `/me` page.

---

## Before you touch anything — read this

The file is written in **TypeScript** (`.ts`). TypeScript looks like plain text with some special punctuation. You don't need to understand it — you just need to know the rules for editing it safely:

**The rules:**
1. Only change the text between quote marks `'like this'` or `"like this"`
2. Never delete a comma `,` at the end of a line — they hold the structure together
3. Never delete a `{` `}` `[` `]` — these are brackets that group things
4. After saving, if the site breaks, press `Ctrl+Z` to undo

**What a field looks like:**
```
name: 'Alex Chen',
```
The part before the `:` is the field name — **do not change this**.
The part between the quotes is the value — **this is what you change**.

So to change the name:
```
name: 'Dev Vachhani',
```

---

## Opening the file

In VS Code: press `Ctrl+P`, type `person.ts`, hit Enter.

---

## Field-by-field walkthrough

### Your name, role, and location

```ts
name: 'Dev Vachhani',
role: 'Software Developer · Builder',   // your one-line title
location: 'London, UK',
```

`role` appears under your name everywhere your name is shown. Keep it short — under 50 characters.

---

### Your photos

```ts
avatarUrl: 'https://...',      // small circular photo — used in the header card
portraitUrl: 'https://...',    // larger portrait — used on the Me page
```

These need to be public image URLs (web links that end in `.jpg`, `.png`, etc.).

**Easiest way to get a URL for your photo:**
1. Upload your photo to [Google Photos](https://photos.google.com), [Imgur](https://imgur.com), or [Cloudinary (free)](https://cloudinary.com)
2. Get the public share link
3. Paste it here between the quotes

See `docs/guides/personalisation/04-images.md` for more options.

---

### Your bio paragraphs

```ts
bio: [
  'First paragraph of your bio.',
  'Second paragraph of your bio.',
  'Third paragraph if you want one.',
],
```

This is a **list** (array) of text strings. Each string between `'` quotes is one paragraph. You can have as many or as few paragraphs as you like.

**To add a paragraph:** add a new line with `'Your text here.',` before the closing `]`
**To remove a paragraph:** delete the whole line including the quotes and trailing comma

---

### Quick facts — the four pills on the Me page

```ts
quickFacts: [
  { icon: 'school',      text: 'Your School or University' },
  { icon: 'location_on', text: 'Your City, Country' },
  { icon: 'work',        text: 'Your Current Focus' },
  { icon: 'code',        text: 'Your Main Skills' },
],
```

Only change the text after `text:`. Keep the quotes.

The `icon` names come from [Google Material Symbols](https://fonts.google.com/icons) — you can search there and use any icon name (written in `snake_case` like `location_on`, not `Location On`). Only change the icon if you want a different one — the defaults work fine.

---

### Headline stats — the four big numbers

```ts
stats: [
  { value: '3+', label: 'Years building' },
  { value: '8',  label: 'Projects shipped' },
  { value: '2',  label: 'Awards' },
  { value: '5k', label: 'GitHub stars' },
],
```

`value` is the big number shown. `label` is the small text below it. Keep exactly 4.

---

### Skill bars

```ts
skills: [
  { name: 'React / TypeScript', percent: 90, color: 'primary' },
  { name: 'Python / ML',        percent: 65, color: 'tertiary' },
],
```

- `name` — what to label the bar
- `percent` — a number from `0` to `100` (no quotes around numbers!)
- `color` — either `'primary'` (blue), `'tertiary'`, or `'secondary'`

---

### Education

```ts
education: [
  {
    institution: 'Your University or School',
    role: 'BSc Computer Science · 2:1',
    period: '2020 – 2024',
    description: 'Key modules or highlights about this time.',
    accentColor: 'primary',
  },
],
```

List most recent first. You can have 1–3 entries. Each entry starts with `{` and ends with `},`.

`accentColor` is either `'primary'` or `'tertiary'` — this just changes the colour of the timeline dot.

---

### Activities (clubs, open source, volunteering)

```ts
activities: [
  {
    title: 'Role — Organisation Name',
    description: 'What you did and any measurable results.',
    period: '2022 – Now',
  },
],
```

Same pattern — each entry is `{ ... },`. Add or remove entries as needed.

---

### Interests

This section has two types of card: a wide **image card** and a standard **text card**.

**Image card (the wide one):**
```ts
{
  type: 'image',
  title: 'Photography',
  description: 'Short sentence about this interest.',
  imageUrl: 'https://...',
  imageAlt: 'Describe what is in the image',
  icon: 'photo_camera',
  colSpan: 'sm:col-span-2',    // keep this exactly as-is — it makes the card wide
  tags: [],
},
```

**Text card:**
```ts
{
  type: 'card',
  title: 'Reading',
  description: 'Short sentence about this interest.',
  icon: 'menu_book',
  iconColor: 'text-tertiary-dim',
  bgClass: 'bg-surface-container-high border border-outline-variant/20',
  tags: [
    { label: 'Fiction', className: 'text-xs bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded-full font-label' },
  ],
},
```

For the `bgClass` (background colour), here are safe copy-paste options:
- Blue tint: `'bg-gradient-to-br from-primary/10 to-surface-container border border-primary/20'`
- Neutral dark: `'bg-surface-container-high border border-outline-variant/20'`
- Green tint: `'bg-gradient-to-br from-green-900/20 to-surface-container border border-green-900/20'`
- Amber tint: `'bg-gradient-to-br from-yellow-900/20 to-surface-container border border-yellow-900/20'`

---

## Finding text that is NOT in this file

A few bits of text are written directly in the page files, not pulled from `person.ts`:

| Text on site | Where to find it |
|---|---|
| Articles page author card name/subtitle | `src/pages/ArticlesPage.tsx` — search for "Alex Chen" |
| Contact page heading and intro text | `src/pages/ContactPage.tsx` |
| Home page tagline below the hero | `src/pages/HomePage.tsx` |
| Browser tab titles (e.g. "Articles \| Alex Chen") | Top of each `src/pages/*.tsx` file — look for `<title>` |

To find all remaining placeholder text, run this in your terminal:
```bash
grep -r "Alex Chen" src/
```
It will list every file and line number where the old name still appears.
