import { loadProjects } from "./modules/dataLoader.js";
import { renderProjects, addProjectModals } from "./modules/uiRenderer.js";
import {
  filterAndSort,
  darkModeToggle,
  offlineStatus,
  updateFavouritesandTags,
} from "./modules/eventHandlers.js";

// List of project data
let projects = [];

/**
 * When the page loads or is reloaded the following runs asynchronously:
 * - Loads project data ()
 * - Renders the project templates
 * - Adds modal,filters,dark mode,offline status,edit favourites
 */
async function init() {
  projects = await loadProjects();
  renderProjects(projects);
  addProjectModals(projects);
  filterAndSort(projects, renderProjects);
  darkModeToggle();
  offlineStatus();
  updateFavouritesandTags(projects, renderProjects);
}

init();
