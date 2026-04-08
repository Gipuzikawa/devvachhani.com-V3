# Guide: Adding & Editing Projects

**File to edit:** `src/data/projects.ts`

This file contains the list of all your projects. They appear on the `/projects` page as a vertical timeline. If a project has a full case study written, clicking the card goes to `/projects/your-project-id` for the detail view.

---

## How the file is structured

The file is a **list** (array) of projects. Each project is a block that starts with `{` and ends with `},`. Here is the full picture:

```
export const projects = [
  {
    ... first project ...
  },
  {
    ... second project ...
  },
]
```

Projects appear on the page **in the order they are listed here**. Put your best/most recent first.

---

## Editing an existing project

Find the project you want to change (you can use `Ctrl+F` to search for the title). Only change the text between quote marks. Leave all commas, brackets, and field names untouched.

**Example — changing a title:**
```ts
title: 'My Real Project Name',
```

---

## Adding a new project (simple card)

Copy this block and paste it at the top of the list, just after the opening `[`:

```ts
{
  id: 'my-project-name',           // unique ID — lowercase, hyphens only, no spaces
  year: 2025,                      // the year — no quotes around numbers
  category: 'Dev',                 // must be exactly: 'Research', 'Design', or 'Dev'
  title: 'My Project Name',
  description: 'One or two sentences. What it does and why it matters.',
  tags: ['React', 'TypeScript'],   // 2–4 short labels shown as pills on the card
  duration: '3 months',
  team: 'Solo',                    // e.g. 'Solo', 'Team of 4', 'Open source'
  imageUrl: 'https://...',         // a photo/screenshot URL — see 04-images.md
  caseStudyUrl: '#',               // '#' means no link. Use a real URL if you have one.
  accentColor: 'primary',          // 'primary' (blue), 'tertiary', or 'yellow'
},
```

**If you do not have an image yet**, use `null` (no quotes) and add a placeholder icon:
```ts
imageUrl: null,
placeholderIcon: 'code',          // any Material Symbol name
```

**To add an award badge**, add this line inside the block:
```ts
award: 'Hackathon Winner · 1st Place',
```

---

## Adding a full case study (`detail`)

This unlocks the `/projects/your-id` detail page. Add a `detail:` section inside your project block, after the other fields:

```ts
{
  id: 'my-project-name',
  // ... all the simple fields above ...

  detail: {
    role: 'Lead Developer',

    mission: [
      'First paragraph — describe the problem you were solving.',
      'Second paragraph — describe your approach and what made it challenging.',
    ],

    objectives: [
      'What you were trying to achieve #1',
      'What you were trying to achieve #2',
      'What you were trying to achieve #3',
    ],

    techCards: [
      {
        icon: 'code',
        title: 'Frontend',
        description: 'React 19 with TypeScript and Tailwind CSS.',
        tags: ['React', 'TypeScript', 'Tailwind'],
        variant: 'elevated',
      },
      {
        icon: 'storage',
        title: 'Database',
        description: 'Supabase for storage and auth.',
        tags: [],
        variant: 'mini',
      },
    ],

    evolution: [
      {
        month: 'Month 01',
        title: 'Research',
        description: 'What you did in this phase and what you learned.',
        imageUrl: 'https://...',
        imageAlt: 'Describe what the image shows',
      },
      {
        month: 'Month 02',
        title: 'Build',
        description: 'What you built and key decisions made.',
        imageUrl: 'https://...',
        imageAlt: 'Describe what the image shows',
      },
      {
        month: 'Month 03',
        title: 'Launch',
        description: 'How it went live and the results.',
        imageUrl: 'https://...',
        imageAlt: 'Describe what the image shows',
      },
    ],

    metrics: [
      { value: '40%', label: 'Faster than before' },
      { value: '500+', label: 'Users in week one' },
      { value: '98',   label: 'Lighthouse score' },
      { value: '0',    label: 'Critical bugs post-launch' },
    ],
  },
},
```

### Tech cards — which `variant` to use

| `variant` | Size | Shows tags? | Use for |
|---|---|---|---|
| `'elevated'` | Large | Yes | The 1–2 main technologies |
| `'mini'` | Small | No | Supporting tools and services |

### Evolution — the timeline

Each entry is a phase. 3–5 phases reads well. The `imageUrl` can be a screenshot, wireframe, photo — anything that shows progress. The `imageAlt` text describes the image for screen readers — don't skip it.

---

## Removing the placeholder projects

The existing projects (`neural-synthesis-interface`, `atmosphere-io`, etc.) are all fake template content. To remove one, delete everything from the `{` that starts it to the `},` that closes it.

Keep at least one project in the list to avoid an empty page.

---

## Quick reference — the `category` filter tabs

The filter bar on `/projects` shows only the categories that exist in your data. Valid options:

- `'Research'`
- `'Design'`
- `'Dev'`

If all your projects are `'Dev'`, only the "Dev" and "All" tabs appear — the others hide automatically.
