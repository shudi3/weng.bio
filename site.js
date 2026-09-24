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

    // News is static (no automatic rolling). The window grows naturally for
    // 1–6 items, then stops at exactly the height needed for the first six.
    // Any remaining items can be reached manually with the mouse wheel,
    // trackpad, scrollbar, or keyboard.
    container.classList.add("news-scroll-window");
    container.setAttribute("tabindex", "0");
    container.setAttribute("role", "region");
    container.setAttribute("aria-label", "News. Scroll to see older items.");
    list.classList.add("news-scroll-list");

    const items = Array.from(list.children);
    if (items.length <= 6) {
      container.classList.add("news-six-or-fewer");
      return;
    }

    const sixthItem = items[5];
    const containerTop = container.getBoundingClientRect().top;
    const sixthBottom = sixthItem.getBoundingClientRect().bottom;
    const sixthStyle = window.getComputedStyle(sixthItem);
    const bottomMargin = parseFloat(sixthStyle.marginBottom) || 0;
    const containerStyle = window.getComputedStyle(container);
    const bottomPadding = parseFloat(containerStyle.paddingBottom) || 0;

    container.style.maxHeight = `${Math.ceil(
      sixthBottom - containerTop + bottomMargin + bottomPadding
    )}px`;
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
