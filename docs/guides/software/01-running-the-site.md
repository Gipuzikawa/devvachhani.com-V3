# Guide: Running the Site Locally

This guide walks you through getting the site running on your own computer so you can see your changes live as you make them.

---

## What you need installed

Before anything else, check you have these two tools installed:

### 1. Node.js

Node.js is the engine that runs the development server.

**Check if you have it:**
Open a terminal (Command Prompt, PowerShell, or Windows Terminal) and run:
```
node --version
```
If you see a version number like `v20.11.0` or higher, you are good. If you get an error, go to [nodejs.org](https://nodejs.org) and download the **LTS** version.

### 2. Git

Git is the version control tool for this project.

**Check if you have it:**
```
git --version
```
If you get an error, download from [git-scm.com](https://git-scm.com).

### 3. VS Code (recommended editor)

[Download VS Code](https://code.visualstudio.com). It is free and works well with this project.

---

## First-time setup

You only need to do these steps once.

### Step 1 — Open the project folder in a terminal

In VS Code, open the project folder (`devvachhani.com-V3`), then open the integrated terminal:
- **Menu:** Terminal → New Terminal
- **Shortcut:** `` Ctrl+` `` (backtick)

The terminal should show your project path, e.g.:
```
C:\Users\devvv\...\devvachhani.com-V3>
```

### Step 2 — Install dependencies

Run:
```
npm install
```

This downloads all the packages the project needs into a folder called `node_modules`. It may take a minute or two. You will see a progress bar. When it finishes, you will be back at the prompt.

You only need to run this once (or again if someone adds a new package to the project).

---

## Starting the development server

Every time you want to work on the site, run:
```
npm run dev
```

After a second or two you will see something like:
```
  VITE v8.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open your browser and go to `http://localhost:5173`. You will see the site.

**Hot reload** — whenever you save a file, the browser automatically updates. You do not need to refresh the page manually.

**To stop the server:** press `Ctrl+C` in the terminal.

---

## Making a change and seeing it

1. Start the dev server (`npm run dev`) and open `http://localhost:5173` in your browser
2. Open `src/data/person.ts` in VS Code
3. Change `'Alex Chen'` to `'Dev Vachhani'`
4. Press `Ctrl+S` to save
5. Look at the browser — the name updates automatically

That is the entire workflow for content changes.

---

## Commands reference

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local development server at localhost:5173 |
| `npm run build` | Compiles the site into a `dist/` folder ready to deploy |
| `npm run preview` | Serves the compiled `dist/` folder so you can check it before deploying |
| `npm run lint` | Checks for code errors (you do not need this for content changes) |

---

## If something goes wrong

**"command not found: npm"** — Node.js is not installed. Go to nodejs.org and install the LTS version.

**The browser shows a blank page or errors** — check the terminal. The error message will usually point to the line in a file that caused the problem. The most common cause is accidentally deleting a comma or bracket while editing a data file. Press `Ctrl+Z` to undo until the site works again.

**"Port 5173 is already in use"** — you have another dev server running. Either close it (find the other terminal tab running `npm run dev` and press `Ctrl+C`), or Vite will automatically try port 5174 instead.

**`node_modules` folder is missing or corrupt** — delete the `node_modules` folder and run `npm install` again.
