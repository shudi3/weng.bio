# Shudi Weng — flat Markdown GitHub Pages site

This site is intentionally flat: every file lives in the repository root and there are no subfolders.

## Homepage section order

1. Biography — `biography.md`
2. Education — `education.md`
3. Publications — `publications.md` (homepage shows the latest 10)
4. Awards and Grants — `awards.md`
5. Talks — `talks.md`
6. Service — `service.md`
7. Work Experience — `experience.md`
8. Teaching — `teaching.md`
9. Supervision — `supervision.md`

## Profile photo

Add your portrait to the repository root and name it exactly:

`photo.jpg`

The homepage will display it at the top-right. A portrait-oriented crop works best. If `photo.jpg` is absent, the photo area is automatically hidden rather than showing a broken image.

## Publications

Maintain all publications in `publications.md`, newest first.

- `index.html` automatically shows only the first/latest 10 entries.
- The `[Full publication list]` link opens `publications.html`, which displays the entire `publications.md` file.

You therefore only need to edit one publication source.

## Deploy with GitHub Pages

Keep all files in the repository root and configure:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

After each commit to `main`, GitHub Pages will redeploy the site.

## Local preview

Because Markdown is loaded with JavaScript, use a small local web server instead of double-clicking `index.html`:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publications workflow

Maintain all papers in the single root-level file `publications.md`.

- Put journal papers under `### Journal`.
- Put conference papers under `### Conference`.
- Keep each subsection in newest-first order.
- The homepage displays at most the first 10 entries from **each** subsection.
- `publications.html` displays the complete Journal and Conference lists.

When adding a new paper, add it to the top of the appropriate numbered list in `publications.md`. You do not need to edit `index.html` or `publications.html`.

## Publication numbering

In `publications.md`, write every paper with `1.`:

```markdown
### Journal

1. **Newest paper**
   Authors...
   Venue, year.

1. **Next paper**
   Authors...
   Venue, year.
```

Markdown automatically renders the entries as 1, 2, 3, ... within each
subsection. Keep papers newest-first. The homepage shows the latest 10
Journal papers and latest 10 Conference papers independently; the full
publication page shows all papers.

## Publication topic tags

Put tags immediately before a publication title in `publications.md`:

```markdown
1. {Resilience} {Privacy} **Paper title**
   Authors...
   Venue, year.

1. {Efficiency} **Another paper**
   Authors...
   Venue, year.
```

Available tags:
- `Resilience` — blue
- `Privacy` — green
- `Efficiency` — purple

The badges appear on both the homepage preview and the full publication page.
