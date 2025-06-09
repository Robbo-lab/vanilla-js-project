/**
 * Asynchronously loads project data from the local JSON file.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of project objects.
 */
export async function loadProjects() {
  const response = await fetch("data/projects.json");
  return await response.json();
}
