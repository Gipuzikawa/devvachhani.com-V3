# React Primer for This Project

This is not a full React course. It is a focused introduction to the concepts you need to feel comfortable reading and editing the code in this portfolio — explained using real files from `src/`.

If you already know HTML, CSS, and basic JavaScript, you are in good shape. React builds on those skills rather than replacing them.

For a map of all the files mentioned here, see [Architecture.md](Architecture.md). For personalisation instructions, see [guide.md](guide.md).

---

## Contents

1. [What is this stack?](#1-what-is-this-stack)
2. [Components — the basic building block](#2-components)
3. [Props — passing data into components](#3-props)
4. [State — data that changes](#4-state)
5. [Effects — reacting to changes](#5-effects)
6. [Custom hooks — reusable logic](#6-custom-hooks)
7. [TypeScript interfaces — shapes for your data](#7-typescript-interfaces)
8. [React Router — navigation without page reloads](#8-react-router)
9. [How data flows through a page](#9-how-data-flows-through-a-page)
10. [Reading an error](#10-reading-an-error)
11. [Next steps](#11-next-steps)

---

## 1. What is this stack?

The project uses five tools together. Here is what each one does:

**Vite** is the build tool and development server. When you run `npm run dev`, Vite starts a local server and watches your files. Save a file and the browser updates in under a second. When you run `npm run build`, Vite bundles everything into optimised files for deployment. You rarely need to think about Vite directly — it just works in the background.

**React** is a JavaScript library for building user interfaces. Instead of writing HTML directly, you write components (TypeScript functions) that return a description of what to render. React figures out the most efficient way to update the actual browser DOM. The key mental model: your UI is a function of your data.

**TypeScript** is JavaScript with types. A "type" is a description of what shape a value has. For example, you can say "this variable must always be a string". TypeScript checks your code before it runs and tells you when something doesn't match. In this project, it catches mistakes in the data files (`src/data/`) before you ever open the browser.

**Tailwind CSS** is a CSS framework where you style things by adding class names to HTML elements. Instead of writing `color: #0052ff` in a CSS file, you add the class `text-primary` to the element. The design tokens (your brand colours, fonts, spacing) are defined in `src/styles/globals.css` and then available as Tailwind classes everywhere.

**React Router** handles navigation. In a traditional website, clicking a link loads a new HTML page from the server. React Router intercepts those clicks and swaps out the content on the current page without a full reload. This makes the site feel instant. The routes are defined in `src/App.tsx`.

---

## 2. Components

A React component is a TypeScript function that returns JSX — a syntax that looks like HTML but is actually JavaScript.

Here is the simplest component in this project, `src/components/ui/Tag.tsx`:

```tsx
export default function Tag({ text, variant = 'neutral', className = '' }) {
  return (
    <span className={`text-xs rounded-full px-3 py-1 ${className}`}>
      {text}
    </span>
  )
}
```

A few things to notice:

- It is a regular function. The name starts with a capital letter (`Tag`, not `tag`) — this is required by React.
- It returns JSX: markup that looks like HTML. The actual HTML tag here is `<span>`.
- **Curly braces `{}` inside JSX** mean "run JavaScript here". `{text}` inserts the value of the `text` variable. `{`text-xs ...`}` builds a string for the class.
- `export default` makes this function available to import in other files.

**Why components?** You write `Tag` once and reuse it everywhere. If you decide all tags should have a different style, you change one file and every tag on the site updates.

---

## 3. Props

Props (short for "properties") are the inputs to a component — how a parent passes data to a child.

Look at `src/components/ui/StatCard.tsx`:

```tsx
interface StatCardProps {
  value: string
  label: string
  className?: string    // The ? means this is optional
}

export default function StatCard({ value, label, className = '' }: StatCardProps) {
  return (
    <div className={`rounded-2xl bg-surface-container-high p-5 ${className}`}>
      <p className="text-3xl font-black text-primary">{value}</p>
      <p className="text-on-surface-variant text-xs mt-1">{label}</p>
    </div>
  )
}
```

The `interface StatCardProps` defines what props this component accepts. When a page uses this component, it looks like:

```tsx
<StatCard value="12+" label="Projects shipped" />
```

The `interface` is TypeScript's way of saying "this component requires a `value` string and a `label` string". If you pass a number where a string is expected, TypeScript will tell you before the browser ever runs the code.

**The destructuring pattern** `{ value, label, className = '' }` is standard JavaScript — it pulls named values out of the props object. The `= ''` sets a default if no `className` is passed.

---

## 4. State

State is data inside a component that can change, and when it changes, React re-renders the component automatically.

Look at `src/layouts/PageLayout.tsx`:

```tsx
import { useState } from 'react'

export default function PageLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  // ...

  return (
    <>
      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
```

`useState(false)` creates a piece of state with an initial value of `false`. It returns two things:
- `menuOpen` — the current value (starts as `false`)
- `setMenuOpen` — a function to change the value

When the hamburger button is tapped, `setMenuOpen(true)` is called. React sees the state changed and re-renders `PageLayout`. Now `menuOpen` is `true`, so `MobileMenuOverlay` receives `isOpen={true}` as a prop and shows itself.

**The rule:** Never change state directly (don't write `menuOpen = true`). Always use the setter function (`setMenuOpen(true)`). This is how React knows to re-render.

---

## 5. Effects

An effect is code that runs in response to something changing — after the component renders. The `useEffect` hook is how you declare side effects.

Back in `src/layouts/PageLayout.tsx`, there are two effects:

```tsx
import { useState, useEffect } from 'react'

// Effect 1: lock scrolling when the menu is open
useEffect(() => {
  document.body.style.overflow = menuOpen ? 'hidden' : ''
  return () => {
    document.body.style.overflow = ''   // Cleanup when unmounted
  }
}, [menuOpen])                           // Run whenever menuOpen changes

// Effect 2: close the menu when the route changes
useEffect(() => {
  setMenuOpen(false)
}, [location.pathname])                  // Run whenever the URL path changes
```

The structure is:
- `useEffect(() => { ... })` — the function to run
- The optional `return () => { ... }` inside — cleanup code (runs when the component is removed or before the effect re-runs)
- `[dependency]` — the dependency array. React only re-runs the effect when one of these values changes. An empty `[]` means "run once when the component first appears".

**When to use effects:** Talking to the browser directly (like `document.body.style`), setting up timers, or syncing with something external. For simple UI logic driven by state changes, you usually don't need effects.

---

## 6. Custom Hooks

A custom hook is a function that uses other hooks and packages that logic for reuse. Custom hooks must start with `use`.

Look at `src/hooks/useCarousel.ts`:

```tsx
export function useCarousel(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(nextSlide, 5000)  // Advance every 5 seconds
  }, [nextSlide])

  const stopAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()   // Stop the timer when the component unmounts
  }, [startAutoPlay, stopAutoPlay])

  return { currentSlide, goToSlide, stopAutoPlay, startAutoPlay }
}
```

This hook contains all the carousel logic (current slide, auto-advance timer, pause on hover). The component that uses it (`src/components/home/HeroCarousel.tsx`) just calls `useCarousel(4)` and gets back `currentSlide` and control functions. The component doesn't need to know how the timer works.

**Why custom hooks?** They let you pull complex stateful logic out of components, keeping components focused on rendering. They are also easy to test and reuse.

---

## 7. TypeScript Interfaces

An interface is TypeScript's way of describing the "shape" of a data object — what properties it has and what type each property is.

Look at `src/types/index.ts`:

```ts
export interface Project {
  id: string
  year: number
  category: 'Research' | 'Design' | 'Dev'   // Only these three strings are valid
  title: string
  description: string
  tags: string[]                              // An array of strings
  imageUrl: string | null                     // A string, OR null
  caseStudyUrl: string
  accentColor?: 'primary' | 'tertiary' | 'yellow'   // Optional (the ? means it can be missing)
  award?: string
}
```

Now look at `src/data/projects.ts`:

```ts
import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'my-project',
    year: 2024,
    category: 'Design',
    // ...
  },
]
```

The `: Project[]` on line 3 tells TypeScript "this array must contain only objects that match the `Project` interface". If you accidentally type `category: 'design'` (lowercase), TypeScript will underline it in red and say `'design'` is not assignable to `'Research' | 'Design' | 'Dev'`. This catches typos before you even open the browser.

**In practice:** You will encounter TypeScript mostly in the data files. The interfaces are already written — you just need to make sure the values you put in match the expected types. If you see a red underline, TypeScript is telling you something doesn't match.

---

## 8. React Router

React Router lets the app have multiple "pages" (URLs) without loading separate HTML files.

Look at `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          {/* more routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

The `PageLayout` route wraps all the others — it is the parent. This is how the Navbar and Footer appear on every page without being repeated in each page component.

Inside `src/layouts/PageLayout.tsx`, there is an `<Outlet />` component. This is a placeholder that React Router fills in with whichever child route matches the current URL. So when you navigate to `/projects`, React Router renders `PageLayout` with `ProjectsPage` inserted where `<Outlet />` is.

**`:slug` in the path** — the `:` prefix makes a path segment dynamic. When the URL is `/articles/my-article-title`, React Router captures `my-article-title` as `slug`. Inside `ArticlePage.tsx`, you can read this with `const { slug } = useParams()` and use it to look up the right article from `src/data/articles.ts`.

**Navigation** — use the `<Link>` component from React Router instead of `<a href>` for internal links. `<Link to="/projects">` updates the URL without a full page reload.

---

## 9. How Data Flows Through a Page

Here is a concrete example: the Me page.

1. **Data source** — `src/data/person.ts` exports `person`, an object satisfying the `PersonData` interface from `src/types/index.ts`

2. **Page component** — `src/pages/MePage.tsx` imports `person`:
   ```tsx
   import { person } from '../data/person'
   ```

3. **Rendering** — the page passes fields from `person` down to child components as props:
   ```tsx
   <SkillBar name={skill.name} percent={skill.percent} />
   <EducationTimeline items={person.education} />
   ```

4. **Child components** — `SkillBar` receives `name` and `percent` and renders the bar. It doesn't know where the data came from — it just receives values through props and displays them.

This is the standard pattern throughout the project:
- Data files hold the content
- Page components import the data and orchestrate the layout
- Child components receive specific data through props and focus on rendering it

When you change a value in `src/data/person.ts`, it flows automatically to every component that uses it.

---

## 10. Reading an Error

You will encounter two kinds of errors:

**TypeScript errors (red underlines in your editor / terminal output during build)**

These appear before the code runs. They usually mean:
- You typed a field name wrong (e.g., `titel` instead of `title`)
- You used the wrong type (e.g., a number where a string is expected)
- A required field is missing

The error message tells you the file and line number. Fix the typo — the error will disappear.

**React runtime errors (red screen in the browser)**

These appear when the code runs. They usually mean:
- You tried to use a value that is `undefined` (e.g., accessing a property on a null object)
- A component received an unexpected prop type

Read the stack trace on the red screen — it shows the chain of components that led to the error. The top entry is usually closest to the cause.

**The most common mistakes in this project:**
- Forgetting a comma between objects in an array in `src/data/projects.ts` or `src/data/articles.ts` (TypeScript will catch this)
- Using a `category` value that doesn't match the allowed options (TypeScript will catch this)
- Putting a local image path in `imageUrl` without placing the image in `public/` first

When in doubt: check the browser console (right-click → Inspect → Console) and the terminal where `npm run dev` is running.

---

## 11. Next Steps

This primer covers the concepts used in this project. When you want to go deeper:

- **React fundamentals:** [react.dev/learn](https://react.dev/learn) — the official React docs are excellent and beginner-friendly
- **TypeScript basics:** [typescriptlang.org/docs/handbook/intro.html](https://www.typescriptlang.org/docs/handbook/intro.html)
- **Vite:** [vite.dev/guide](https://vite.dev/guide)
- **Tailwind CSS v4:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **React Router:** [reactrouter.com/start/library/routing](https://reactrouter.com/start/library/routing)

The best way to get comfortable is to make a small change — swap a colour, add a project, rewrite a bio paragraph — and watch how it propagates through the site. The data layer (`src/data/`) is safe to experiment with; TypeScript will tell you when something is wrong.
