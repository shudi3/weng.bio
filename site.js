(function () {
  marked.setOptions({ gfm: true, breaks: false });

  const publicationTags = {
    Resilience: 'tag-resilience',
    Privacy: 'tag-privacy',
    Efficiency: 'tag-efficiency'
  };

  function renderPublicationTags(container) {
    container.querySelectorAll('ol > li').forEach((item) => {
      // Supported Markdown:
      // 1. {Resilience} {Privacy} **Paper title**
      const html = item.innerHTML;
      const tagPattern = /^\s*(?:\{(Resilience|Privacy|Efficiency)\}\s*)+/i;
      const match = html.match(tagPattern);
      if (!match) return;

      const names = [...match[0].matchAll(/\{(Resilience|Privacy|Efficiency)\}/gi)]
        .map((m) => m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase());

      const badges = names.map((name) =>
        `<span class="pub-tag ${publicationTags[name]}">${name}</span>`
      ).join('');

      item.innerHTML = html.replace(tagPattern, badges + ' ');
    });
  }

  async function loadMarkdown(el) {
    const file = el.dataset.markdown;
    try {
      const response = await fetch(file, { cache: 'no-store' });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const markdown = await response.text();
      el.innerHTML = marked.parse(markdown);

      // Convert custom publication tags on both homepage and full-list page.
      if (file === 'publications.md') {
        renderPublicationTags(el);
      }

      // Homepage only: keep the first (newest) N papers in EACH subsection.
      const limit = Number(el.dataset.publicationLimit || 0);
      if (limit > 0) {
        const lists = el.querySelectorAll('ol');
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
