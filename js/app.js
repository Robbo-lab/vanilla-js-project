import { loadProjects } from "./modules/dataLoader.js";
import { renderProjects, showProjectModals } from "./modules/uiRenderer.js";
import {
  filterAndSort,
  darkModeToggle,
  offlineStatus,
  updateFavouritesandTags,
} from "./modules/eventHandlers.js";
import { setupForm, editProject } from "./modules/formHandler.js";

// List of project data
let projects = [];

// Re-render and store the new list
function updateProjects(newList) {
  projects = newList;
  renderProjects(projects, handleEdit); // re-render with edit hook
}

// Trigger edit mode
function handleEdit(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    editProject(project);
  }
}

/**
 * When the page loads or is reloaded the following runs asynchronously:
 * - Loads project data ()
 * - Renders the project templates
 * - Adds modal,filters,dark mode,offline status,edit favourites
 */
async function init() {
  projects = await loadProjects();
  renderProjects(projects);
  showProjectModals(projects);
  filterAndSort(projects, renderProjects);
  darkModeToggle();
  offlineStatus();
  updateFavouritesandTags(projects, renderProjects);
  setupForm(projects, updateProjects);
  updateProjects(projects);
}

init();
