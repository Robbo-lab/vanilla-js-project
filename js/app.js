// Module imports for data loading, UI template rendering, and feature setup
import { loadProjects } from "./modules/dataLoader.js";
import { renderProjects, attachModalHandlers } from "./modules/uiRenderer.js";
import {
  setupFiltersAndSort,
  setupDarkModeToggle,
  setupOfflineStatus,
  setupfavourites,
} from "./modules/eventHandlers.js";

// Holds the loaded list of project data
let projects = [];

/**
 * Initialises the landing page by:
 * - Loading project data
 * - Rendering the UI templates
 * - Setting up modal, filters, dark mode, offline detection, and favourites features
 */
async function init() {
  projects = await loadProjects(); // Load JSON data
  renderProjects(projects); // Render project cards
  attachModalHandlers(projects); // Set up modal behavior
  setupFiltersAndSort(projects, renderProjects); // Enable search, tag, and sort
  setupDarkModeToggle(); // Enable theme switch
  setupOfflineStatus(); // Show offline badge if needed
  setupfavourites(projects, renderProjects); // Enable favourite toggling
}

init();
