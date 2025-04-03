/**
 * Generate a random username that excludes special characters
 * @param firstName
 * @param lastName
 * @returns
 */

export function randomUsername(firstName?: string, lastName?: string) {
  if (!firstName && !lastName) {
    return `user${Math.floor(Math.random() * 1000)}`; // Fallback if no names
  }
  return `${firstName || ""}${lastName || ""}`
    .normalize("NFD") // Handle diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-zA-Z0-9]/g, "") // Remove special chars
    .toLowerCase();
}
