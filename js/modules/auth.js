const PASSWORD = "letmein";

export function requireAuth() {
  const input = prompt("Enter admin password:");
  return input === PASSWORD;
}
