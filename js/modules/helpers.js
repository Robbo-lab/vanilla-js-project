/**
 * Applies a lazy-load fade-in effect to project cards.
 * Cards are animated when they scroll into view for the first time.
 */
export function lazyLoad() {
  const cards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    card.classList.add("opacity-0");
    observer.observe(card);
  });
}

/**
 * Formats into human-readable data (e.g. "2024-07-20").
 *
 * @param {string} date - A date string in YYYY-MM-DD format.
 * @returns {string} A formatted date string like "Saturday, July 20, 2024"
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
