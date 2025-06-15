/**
 * Enables filtering, category selection, and sorting by name or date.
 * Also enables tag-click filtering in each project card.
 *
 * @param {Array} projects - The full list of project data.
 * @param {Function} renderCallback - Function used to render the filtered project list.
 */
export function filterAndSort(projects, renderCallback) {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortNameBtn = document.getElementById("sortName");
  const sortDateBtn = document.getElementById("sortDate");

  /**
   * Filters and renders projects based on search and category inputs.
   */
  function filterAndRender() {
    const term = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = projects
      .filter(
        (project) =>
          project.name.toLowerCase().includes(term) ||
          project.tags.some((tag) => tag.toLowerCase().includes(term))
      )
      .filter((project) => !category || project.category === category);

    renderCallback(filtered);
  }

  searchInput.addEventListener("input", filterAndRender);
  categoryFilter.addEventListener("change", filterAndRender);

  sortNameBtn.addEventListener("click", () => {
    projects.sort((a, b) => a.name.localeCompare(b.name));
    filterAndRender();
  });

  sortDateBtn.addEventListener("click", () => {
    projects.sort((a, b) => new Date(b.date) - new Date(a.date));
    filterAndRender();
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("tag")) {
      const tagValue = e.target.textContent.trim().toLowerCase();
      searchInput.value = tagValue;
      filterAndRender();
    }
  });
}

/**
 * Provides a dark/light theme toggle.
 * Saves the theme state to localStorage and updates the button label.
 */
export function darkModeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  /**
   * Applies/removes dark mode based on storage state.
   *
   * @param {boolean} state - true: dark mode, false: light mode.
   */
  function applyDarkMode(state) {
    if (state) {
      body.classList.add("has-background-dark", "has-text-white");
      if (toggleBtn) toggleBtn.textContent = "Light Mode";
    } else {
      body.classList.remove("has-background-dark", "has-text-white");
      if (toggleBtn) toggleBtn.textContent = "Dark Mode";
    }
  }

  // Load initial theme state from localStorage
  const stored = localStorage.getItem("darkMode");
  const isDark = stored === "true";
  applyDarkMode(isDark);

  // Attach toggle handler
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isNowDark = !body.classList.contains("has-background-dark");
      localStorage.setItem("darkMode", isNowDark);
      applyDarkMode(isNowDark);
    });
  }
}

/**
 * Displays or hides the offline status based on browser connectivity.
 * Listens to online/offline events and updates the DOM.
 */
export function offlineStatus() {
  const badge = document.getElementById("offlineBadge");

  /**
   * Updates visibility of the offline badge.
   */
  function updateStatus() {
    if (!navigator.onLine) {
      badge.classList.remove("is-hidden");
    } else {
      badge.classList.add("is-hidden");
    }
  }

  window.addEventListener("offline", updateStatus);
  window.addEventListener("online", updateStatus);
  updateStatus();
}

/**
 * Enables toggling of favourite projects and saving their state in localStorage.
 * Adds a "Show favourites" button to filter the project list by starred items.
 *
 * @param {Array} projects - The original full list of project data.
 * @param {Function} renderCallback - The rendering function to re-display filtered results.
 */
export function updateFavouritesandTags(projects, renderCallback) {
  const favKey = "favouriteProjects";

  /**
   * Retrieves the list of favourite project IDs from localStorage.
   *
   * @returns {number[]} An array of favourited project IDs or empty if none
   */
  const getfavourites = () => JSON.parse(localStorage.getItem(favKey)) || [];

  // Handle favourite and tag button events
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("favourite-toggle")) {
      const id = parseInt(e.target.dataset.id);
      let favourites = getfavourites();

      favourites = favourites.includes(id)
        ? favourites.filter((filteredId) => filteredId !== id)
        : [...favourites, id];

      localStorage.setItem(favKey, JSON.stringify(favourites));
      renderCallback(projects);
    }

    // Handle tag-based filtering from cards
    if (e.target.matches(".tag.is-clickable")) {
      const tagValue = e.target.textContent.trim().toLowerCase();
      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
        searchInput.value = tagValue;

        // Creates a new input event to the tag buttons
        searchInput.dispatchEvent(new Event("input"));
      }
    }
  });

  const favouriteBtn = document.getElementById("showfavouritesBtn");
  if (favouriteBtn) {
    favouriteBtn.addEventListener("click", () => {
      const favourites = getfavourites();
      const filtered = projects.filter((p) => favourites.includes(p.id));
      renderCallback(filtered);
    });
  }
}
