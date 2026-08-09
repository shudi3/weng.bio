# Shudi Weng — Markdown-driven GitHub Pages site

This repository is intentionally flat: **no subfolders are required**.

## Homepage section order

The homepage displays:

1. Biography
2. Education
3. Publications
4. Awards & Grants
5. Talks
6. Service
7. Work Experience
8. Teaching

Each section is maintained in its own root-level Markdown file.

## Files to edit

- `biography.md`
- `education.md`
- `publications.md`
- `awards.md`
- `talks.md`
- `service.md`
- `experience.md`
- `teaching.md`

## Photo

Upload your portrait to the repository root and name it exactly:

`photo.jpg`

It will automatically appear at the top-right of the homepage. Until that file
exists, the site displays `photo-placeholder.svg`.

For best results, use a portrait-oriented image. The page crops it to a
160 × 200 px frame on desktop.

## Publications

Maintain only one source file: `publications.md`.

Put the newest publication first. The homepage automatically shows only the
first 10 items and provides a `[Full publication list]` link.

`publications.html` renders the complete `publications.md` file, so you never
need to maintain two publication lists.

## Deploy

In GitHub:

**Settings → Pages → Build and deployment**

Use:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/(root)`

Commit and push changes to `main`; GitHub Pages will redeploy automatically.
