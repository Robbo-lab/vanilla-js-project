
let projects = [];

const listContainer = document.getElementById('projectList');
const searchInput = document.getElementById('searchInput');
const sortNameBtn = document.getElementById('sortName');
const sortDateBtn = document.getElementById('sortDate');

async function loadData() {
  const res = await fetch('data/projects.json');
  projects = await res.json();
  renderProjects(projects);
}

function renderProjects(data) {
  listContainer.innerHTML = '';
  data.forEach(project => {
    const col = document.createElement('div');
    col.className = 'column is-one-third';

    const tagHTML = project.tags.map(tag => `<span class="tag is-info is-light mr-1">${tag}</span>`).join('');

    col.innerHTML = `
      <div class="box project-card" data-id="\${project.id}">
        <h2 class="title is-5">\${project.name}</h2>
        <p>\${project.description}</p>
        <p class="is-size-7 has-text-grey">Created: \${project.date}</p>
        <div class="tags mt-2">\${tagHTML}</div>
      </div>
    `;

    col.querySelector('.box').addEventListener('click', (e) => {
      const projectId = parseInt(e.currentTarget.dataset.id);
      showModal(projectId);
    });

    listContainer.appendChild(col);
  });
}

function showModal(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  document.getElementById('modalTitle').textContent = project.name;

  const tagHTML = project.tags.map(tag => `<span class="tag is-primary is-light mr-1">\${tag}</span>`).join('');
  document.getElementById('modalContent').innerHTML = `
    <p><strong>Description:</strong> \${project.description}</p>
    <p><strong>Date:</strong> \${project.date}</p>
    <div class="tags mt-2">\${tagHTML}</div>
  `;

  modal.classList.add('is-active');
}

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('projectModal').classList.remove('is-active');
});

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = projects.filter(p => p.name.toLowerCase().includes(term));
  renderProjects(filtered);
});

sortNameBtn.addEventListener('click', () => {
  const sorted = [...projects].sort((a, b) => a.name.localeCompare(b.name));
  renderProjects(sorted);
});

sortDateBtn.addEventListener('click', () => {
  const sorted = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
  renderProjects(sorted);
});

loadData();
=======
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
