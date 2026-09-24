(function () {
  marked.setOptions({
    gfm: true,
    breaks: false
  });

  const publicationTags = {
    Resilience: "tag-resilience",
    Privacy: "tag-privacy",
    Efficiency: "tag-efficiency"
  };

  function normalizeTagName(rawTag) {
    return rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase();
  }

  function replacePublicationTags(markdown) {
    return markdown.replace(
      /\{(Resilience|Privacy|Efficiency)\}/gi,
      (_, rawTag) => {
        const tag = normalizeTagName(rawTag);
        const cssClass = publicationTags[tag];

        return `<span class="pub-tag ${cssClass}">${tag}</span>`;
      }
    );
  }

  function limitPublicationLists(container, limit) {
    if (!limit || limit <= 0) return;

    const lists = container.querySelectorAll("ol");

    lists.forEach((list) => {
      const items = Array.from(list.children);

      items.slice(limit).forEach((item) => {
        item.remove();
      });
    });
  }

  async function loadMarkdown(element) {
    const file = element.dataset.markdown;

    if (!file) return;

    try {
      const response = await fetch(file, {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error(
          `Failed to load ${file}: ${response.status} ${response.statusText}`
        );
      }

      let markdown = await response.text();

      /*
       * publications.md special handling
       *
       * Supported syntax:
       *
       * 1. {Privacy} **Paper title**
       *
       * 1. {Resilience} {Privacy} **Paper title**
       *
       * 1. {Resilience} {Privacy} {Efficiency} **Paper title**
       *
       * Tags are converted BEFORE marked.parse(), which prevents
       * them from appearing as literal {Privacy}, {Resilience}, etc.
       */
      if (file === "publications.md") {
        markdown = replacePublicationTags(markdown);
      }

      element.innerHTML = marked.parse(markdown);

      /*
       * Homepage publication preview
       *
       * index.html should contain something like:
       *
       * <div
       *   data-markdown="publications.md"
       *   data-publication-limit="10">
       * </div>
       *
       * Each ordered list is limited independently.
       *
       * Therefore:
       * Journal    -> latest 10
       * Conference -> latest 10
       *
       * publications.html should NOT contain
       * data-publication-limit, so it displays all papers.
       */
      if (element.hasAttribute("data-news-roller")) {
        initializeNewsRoller(element);
      }

      if (file === "publications.md") {
        const limit = Number(
          element.dataset.publicationLimit || 0
        );

        limitPublicationLists(element, limit);
      }

    } catch (error) {
      console.error(error);

      element.innerHTML = `
        <p class="markdown-error">
          Could not load ${file}.
        </p>
      `;
    }
  }


  function initializeNewsRoller(container) {
    const list = container.querySelector("ul, ol");
    if (!list) return;

    // Turn the News area into a fixed-height, user-controlled scroll window.
    // Visitors can use the mouse wheel/trackpad, drag the scrollbar, or use
    // keyboard scrolling when the window has focus.
    container.classList.add("news-scroll-window");
    container.setAttribute("tabindex", "0");
    container.setAttribute("role", "region");
    container.setAttribute("aria-label", "News. Scroll to see more items.");
    list.classList.add("news-scroll-list");
  }

  function loadAllMarkdownSections() {
    const markdownElements =
      document.querySelectorAll("[data-markdown]");

    markdownElements.forEach((element) => {
      loadMarkdown(element);
    });
  }

  function updateFooterYear() {
    const yearElement = document.getElementById("year");

    if (yearElement) {
      yearElement.textContent =
        new Date().getFullYear();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadAllMarkdownSections();
    updateFooterYear();
  });
})();
