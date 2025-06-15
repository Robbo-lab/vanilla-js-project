import { requireAuth } from "./auth.js";

let projectList = [];
let editingId = null;

export function setupForm(projects, onUpdate) {
  projectList = projects;

  const modal = document.getElementById("projectFormModal");
  const openBtn = document.getElementById("openFormBtn");
  const closeBtn = document.getElementById("closeFormBtn");
  const saveBtn = document.getElementById("saveProjectBtn");
  const deleteBtn = document.getElementById("deleteProjectBtn");

  // OPEN ADD MODE
  openBtn.addEventListener("click", () => {
    if (!requireAuth()) return alert("Access denied");
    editingId = null;
    resetForm();
    document.getElementById("formTitle").textContent = "Add Project";
    deleteBtn.classList.add("is-hidden");
    modal.classList.add("is-active");
  });

  // CLOSE
  closeBtn.addEventListener("click", () => modal.classList.remove("is-active"));

  // SAVE (Add or Edit)
  saveBtn.addEventListener("click", () => {
    const name = document.getElementById("projectName").value.trim();
    const category = document.getElementById("projectCategory").value.trim();
    const description = document
      .getElementById("projectDescription")
      .value.trim();
    const tags = document
      .getElementById("projectTags")
      .value.split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (!name) return alert("Name is required.");

    if (editingId !== null) {
      // Edit
      const index = projectList.findIndex((p) => p.id === editingId);
      if (index !== -1) {
        projectList[index] = {
          ...projectList[index],
          name,
          category,
          description,
          tags,
        };
      }
    } else {
      // Add
      const id = Date.now();
      projectList.push({ id, name, category, description, tags });
    }

    modal.classList.remove("is-active");
    onUpdate([...projectList]);
    resetForm();
  });

  // DELETE (Edit mode only)
  deleteBtn.addEventListener("click", () => {
    if (!requireAuth()) return alert("Access denied");
    if (editingId !== null) {
      projectList = projectList.filter((p) => p.id !== editingId);
      onUpdate([...projectList]);
    }
    modal.classList.remove("is-active");
    resetForm();
  });
}

// Trigger Edit Mode from outside
export function editProject(project) {
  const modal = document.getElementById("projectFormModal");
  document.getElementById("formTitle").textContent = "Edit Project";
  document.getElementById("projectId").value = project.id;
  document.getElementById("projectName").value = project.name;
  document.getElementById("projectCategory").value = project.category;
  document.getElementById("projectDescription").value = project.description;
  document.getElementById("projectTags").value = project.tags.join(", ");
  editingId = project.id;
  document.getElementById("deleteProjectBtn").classList.remove("is-hidden");
  modal.classList.add("is-active");
}

function resetForm() {
  editingId = null;
  document.getElementById("projectForm").reset();
  document.getElementById("projectId").value = "";
}
