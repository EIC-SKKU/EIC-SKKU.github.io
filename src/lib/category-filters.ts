/** Keep category controls in place when filtering makes the page shorter. */
export function initCategoryFilters(list: HTMLElement | null) {
  if (!list) return;
  const filters = document.querySelectorAll<HTMLButtonElement>("[data-filter]");
  const items = list.querySelectorAll<HTMLElement>("[data-category]");
  if (!filters.length) return;

  const preserveScroll = (update: () => void) => {
    const { scrollX, scrollY, innerHeight } = window;
    list.style.minHeight = "";
    update();

    // Use the actual content bottom: scrollHeight is at least the viewport
    // height, which would hide the shortfall on a tall screen.
    const contentBottom = document.body.getBoundingClientRect().bottom + window.scrollY;
    const shortfall = scrollY + innerHeight - contentBottom;
    if (shortfall > 0) {
      list.style.minHeight = `${Math.ceil(list.getBoundingClientRect().height + shortfall)}px`;
    }
    window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.getAttribute("aria-pressed") === "true") return;
      preserveScroll(() => {
        const value = button.dataset.filter;
        filters.forEach((other) =>
          other.setAttribute("aria-pressed", String(other === button))
        );
        items.forEach((item) => {
          item.hidden = value !== "all" && item.dataset.category !== value;
        });
      });
    });
  });

  // Recompute only the space needed after a resize, rather than retaining a
  // large gap from a previous viewport or reserving the entire unfiltered list.
  let resizeFrame = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => preserveScroll(() => {}));
  });
}
