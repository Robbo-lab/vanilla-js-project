/**
 * Renders a list of project cards into the #projectContainer element.
 * Each card includes a title, category, description, tags, and favourite toggle.
 *
 * @param {Array} projects - Array of project objects to display.
 */
export function renderProjects(projects) {
  const container = document.getElementById("projectContainer");
  const favourites =
    JSON.parse(localStorage.getItem("favouriteProjects")) || [];
  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML =
      "<p class='has-text-grey pl-4'>No projects found.</p>";
    return;
  }

  projects.forEach((project) => {
    // Outer wrapper column for responsive layout
    const column = document.createElement("div");
    column.className =
      "column is-full-mobile is-half-tablet is-one-third-desktop";

    // Project card box
    const card = document.createElement("div");
    card.className = "box project-card is-flex is-flex-direction-column";
    card.dataset.id = project.id;

    const isFav = favourites.includes(project.id);

    card.innerHTML = `
      <div class="level is-mobile">
        <div class="level-left">
          <h2 class="title is-5 mb-2">${project.name}</h2>
        </div>
        <div class="level-right">
          <button class="button is-small favourite-toggle ${
            isFav ? "is-warning" : "is-light"
          }" data-id="${project.id}" title="Toggle favourite">
            ${isFav ? "★" : "☆"}
          </button>
        </div>
      </div>
      <div class="card-content is-flex-grow-1">
        <p class="has-text-grey-light is-size-7 mb-2">
          <strong class="has-text-grey">Category:</strong> ${project.category}
        </p>
        <p>${project.description}</p>
        <span class="has-text-grey-light is-size-7">read more...<span>
      </div>
      <div class="tags mt-3">
        ${project.tags
          .map(
            (tag) =>
              `<span class="tag is-info is-clickable" data-tag="${tag}">${tag}</span>`
          )
          .join("")}
      </div>
    `;

    column.appendChild(card);
    container.appendChild(column);
  });

  lazyReveal();
}

/**
 * Attaches event handlers to open the modal when a project card is clicked.
 * Prevents modal from opening if the user clicks on a tag or favourite toggle.
 *
 * @param {Array} projects - The same array of project data used to render cards.
 */
export function attachModalHandlers(projects) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const modalFooter = document.getElementById("modalFooter");
  const closeModal = document.getElementById("closeModal");

  document.getElementById("projectContainer").addEventListener("click", (e) => {
    if (
      e.target.classList.contains("favourite-toggle") ||
      e.target.classList.contains("tag")
    ) {
      return; // Don't open modal if clicking on a tag or favourite
    }

    const card = e.target.closest(".project-card");
    if (!card) return;

    const id = parseInt(card.dataset.id);
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    modalTitle.textContent = project.name;
    modalContent.innerHTML = `
      <p class="is-size-6 mb-2"><strong class="has-text-grey">Category:</strong> ${
        project.category
      }</p>
      <p><strong class="has-text-grey">Description:</strong> ${
        project.description
      }</p>
      <p><strong class="has-text-grey">Date:</strong> ${formatDate(
        project.date
      )}</p>
      <div class="tags mt-4">${project.tags
        .map((tag) => `<span class="tag is-info is-light mr-1">${tag}</span>`)
        .join("")}
      </div>
    `;

    modalFooter.classList.add(
      "has-background-white",
      "is-justify-content-flex-end"
    );
    modalFooter.innerHTML = `
      <a href="${project.link}" class="button is-info is-light" target="_blank">Visit Project</a>
    `;

    modal.classList.add("is-active");
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("is-active");
  });
}

/**
 * Applies a lazy-reveal fade-in effect to project cards using IntersectionObserver.
 * Cards are animated when they scroll into view for the first time.
 */
function lazyReveal() {
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
 * Formats a raw date string (e.g. "2024-07-20") into a full human-readable date.
 *
 * @param {string} date - A date string in YYYY-MM-DD format.
 * @returns {string} A formatted date string like "Saturday, July 20, 2024"
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
