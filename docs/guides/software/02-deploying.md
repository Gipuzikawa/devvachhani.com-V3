# Guide: Deploying to GitHub Pages with a Custom Domain

This site is deployed automatically to GitHub Pages every time you push to the `main` branch. The workflow is already configured in `.github/workflows/deploy.yml`.

---

## How it works (the overview)

1. You push code to GitHub
2. GitHub Actions runs automatically — it installs packages, builds the site, and deploys it
3. GitHub Pages serves the built files at your domain

You never run `npm run build` manually or upload files yourself.

---

## One-time setup

### Step 1 — Push your code to GitHub

If your repo is not on GitHub yet:

1. Go to [github.com](https://github.com) → **New repository**
2. Name it whatever you like. Set it to **public** (GitHub Pages requires this on free accounts)
3. In your terminal (in the project folder), run:
   ```
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

### Step 2 — Enable GitHub Pages in your repo settings

1. On GitHub, open your repository
2. Click **Settings** (the tab along the top)
3. In the left sidebar, click **Pages**
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

That is it. The next push to `main` will trigger the workflow and deploy the site.

### Step 3 — Add your domain to the CNAME file

Open `public/CNAME` in VS Code. It currently contains:
```
devvachhani.com
```

If your domain is different, change it to match exactly (no `https://`, no trailing slash). For example:
```
devvachhani.com
```
or if you prefer the `www` version:
```
www.devvachhani.com
```

Save and push — this file tells GitHub Pages which domain to respond to.

### Step 4 — Add your domain in GitHub Pages settings

1. Still on **Settings → Pages**
2. Under **Custom domain**, type your domain (e.g. `devvachhani.com`)
3. Click **Save**
4. Tick **Enforce HTTPS** once the green tick appears (may take a few minutes)

### Step 5 — Point your domain's DNS to GitHub

Log into wherever you bought your domain (GoDaddy, Namecheap, Google Domains, Cloudflare, etc.) and update the DNS records.

**For a root domain (e.g. `devvachhani.com`):**

Add four `A` records pointing to GitHub's IP addresses:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**For a `www` subdomain (`www.devvachhani.com`):**

Add one `CNAME` record:

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `your-username.github.io` |

DNS changes can take anywhere from a few minutes to 48 hours to propagate. Once it works, GitHub will issue a free HTTPS certificate automatically.

> **Tip:** Cloudflare is a good free DNS provider that also makes DNS changes propagate instantly (within their network).

---

## Setting up the contact form secret

The contact form uses Formspree and needs a secret ID. GitHub Actions needs this secret to inject it into the build.

**Step 1 — Get your Formspree ID:**
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — name it "Portfolio Contact"
3. Copy your Form ID — it looks like `xkgwqpbn`

**Step 2 — Add it to GitHub secrets:**
1. In your GitHub repo, go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `VITE_FORMSPREE_ID`
4. Value: your Formspree form ID
5. Click **Add secret**

The next deploy will automatically use it.

**Step 3 — For local development:**
Create a file called `.env.local` in the root of the project (same folder as `package.json`):
```
VITE_FORMSPREE_ID=xkgwqpbn
```
Replace `xkgwqpbn` with your actual ID. This file is already in `.gitignore` — it will never be pushed to GitHub. Restart your dev server after creating it.

---

## Day-to-day workflow (once set up)

1. Make your changes locally (edit data files, etc.)
2. Start the dev server (`npm run dev`) and check everything looks right
3. Commit your changes in Git:
   ```
   git add .
   git commit -m "Update project list"
   git push
   ```
4. Go to your repo on GitHub → **Actions** tab
5. Watch the deploy workflow run — it takes about 60–90 seconds
6. Visit your domain — the new version is live

---

## Checking the deploy status

- Go to your repo on GitHub → **Actions** tab
- You will see a list of workflow runs — a green tick means it deployed successfully
- Click any run to see the detailed log if something went wrong

---

## Why the 404 fix is needed

React Router handles URLs client-side — when you navigate to `/projects`, React intercepts that and renders the right page without ever leaving the site. But if someone goes directly to `https://devvachhani.com/projects` (or refreshes the page), GitHub Pages looks for a physical file at `/projects/index.html`, finds nothing, and shows a 404.

The fix is already in the workflow: after building, it copies `dist/index.html` to `dist/404.html`. GitHub Pages serves `404.html` for any URL it cannot find a file for — which means your React app loads, React Router reads the URL, and renders the correct page. The visitor never sees a 404.

You do not need to do anything — this is handled automatically in `.github/workflows/deploy.yml`.
