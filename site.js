(function () {
  marked.setOptions({ gfm: true, breaks: false });

  async function loadMarkdown(el) {
    const file = el.dataset.markdown;
    try {
      const response = await fetch(file, { cache: 'no-store' });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const markdown = await response.text();
      el.innerHTML = marked.parse(markdown);

      // For the publications preview, limit EACH Journal/Conference list
      // independently. publications.md is maintained newest-first, so we
      // keep the first N entries in each list.
      const limit = Number(el.dataset.publicationLimit || 0);
      if (limit > 0) {
        const lists = el.querySelectorAll('ol, ul');
        lists.forEach((list) => {
          list.classList.add('publication-list');
          [...list.children].slice(limit).forEach((li) => li.remove());
        });
      }
    } catch (err) {
      el.innerHTML = `<p class="markdown-error">Could not load ${file}. This site must be served over HTTP (GitHub Pages works automatically).</p>`;
      console.error(err);
    }
  }

  document.querySelectorAll('[data-markdown]').forEach(loadMarkdown);
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
