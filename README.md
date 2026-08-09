# Shudi Weng — Markdown-driven GitHub Pages site

A flat, one-page academic website inspired by the provided `jqxue1999.github.io` site.

## Flat repository structure

There are **no subfolders**. Every file stays in the repository root:

- `index.html` — homepage shell
- `publications.html` — full publication page
- `site.js` — Markdown loader + homepage top-10 publication limit
- `jemdoc.css` — styling
- `Shudi_Weng_CV.pdf` — CV
- `biography.md`
- `research.md`
- `publications.md`
- `education.md`
- `experience.md`
- `service.md`
- `talks.md`
- `awards.md`
- `skills.md`

## How to update the website

Normally, edit only the relevant `.md` file and commit it to GitHub. You do not need to touch the HTML.

### Publications

Edit `publications.md` and keep entries in newest-first order.

- `index.html` automatically displays the first **10** list items.
- `publications.html` automatically displays **all** entries.
- The homepage includes a **Full publication list** link.

When adding a paper, place it at the top of the numbered list. Markdown renumbering is fine as long as entries remain one top-level list item per publication.

## Publishing

Create (or use) a GitHub repository named:

`YOUR-GITHUB-USERNAME.github.io`

Copy all files from this package directly into the repository root and push to `main`. GitHub Pages will serve the site automatically (or enable it under **Settings → Pages** if needed).

## Local preview

Because the site uses JavaScript `fetch()` to load Markdown, opening `index.html` directly with a `file://` URL may be blocked by the browser. For local preview, serve the folder over HTTP, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Google Scholar

The header currently uses the Google Scholar homepage because the exact profile URL should be verified. Replace it in `index.html` with your complete Scholar profile URL.
