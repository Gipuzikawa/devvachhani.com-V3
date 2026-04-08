# Guide: Using Images

Images on this site are referenced by **URL** — a web link that points to a publicly accessible image file. The site does not store images in the project folder; it loads them from the internet at runtime.

This means: to use an image, you need to host it somewhere online first, then paste the URL into the data file.

---

## Option 1 — Cloudinary (recommended for project screenshots)

[Cloudinary](https://cloudinary.com) has a generous free tier (25GB storage, 25GB bandwidth/month).

1. Create a free account at cloudinary.com
2. Go to **Media Library** and click **Upload**
3. Upload your image
4. Click the image, then click **Copy URL**
5. Paste the URL into your data file

Cloudinary also lets you resize images on-the-fly by editing the URL — useful for making thumbnails load faster. You do not need to do this, but it is available if you want it.

---

## Option 2 — GitHub (free, simple)

If your portfolio repo is public on GitHub, you can host images there:

1. In your repo on GitHub, navigate to `public/images/` (create the folder if it does not exist)
2. Click **Add file → Upload files** and upload your image
3. Click the image in GitHub — it opens in a preview
4. Right-click the image → **Copy image address**
5. Paste into your data file

The URL will look like:
```
https://raw.githubusercontent.com/your-username/your-repo/main/public/images/filename.jpg
```

---

## Option 3 — Imgur (quick and easy)

1. Go to [imgur.com](https://imgur.com) — no account needed for basic uploads
2. Drag and drop your image
3. Once uploaded, right-click the image → **Copy image address**
4. Paste into your data file

Note: Imgur occasionally removes images that get no traffic. Fine for development; less reliable long-term.

---

## Option 4 — Your own domain / CDN

If you are deploying to Netlify, Vercel, or similar, you can put images in the `public/` folder of this project and reference them with a path like `/images/my-photo.jpg`. This works but means images are bundled with your deployment.

---

## Image size recommendations

| Use | Recommended dimensions | Notes |
|---|---|---|
| Avatar (circular photo) | 400×400 px | Square crop works best |
| Portrait (Me page) | 800×1000 px | Portrait orientation |
| Project card thumbnail | 1200×675 px | 16:9 aspect ratio |
| Article thumbnail | 1200×675 px | 16:9 aspect ratio |
| Project detail / evolution images | 1200×800 px | Landscape |
| Article hero image | 1600×900 px | Wide, landscape |
| Interest image card | 1200×600 px | Wide, landscape |

You do not need to be exact — these are just guides. Images that are too large will load slowly; too small will look blurry. Aim for under 500KB per image.

---

## Using `null` for missing images

Everywhere an `imageUrl` field exists, you can safely set it to `null` (no quotes). The site will show a placeholder icon instead of a broken image.

```ts
imageUrl: null,
```

This is the right approach when you do not have an image yet — never leave the field as an empty string `''` or a broken URL.

---

## The current placeholder images

The existing data files use Google's Aida CDN (`lh3.googleusercontent.com/aida-public/...`). These are AI-generated images from the template and may be taken down at any point. Replace them with your own images as soon as you can.
