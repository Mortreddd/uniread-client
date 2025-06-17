/**
 * Get the language of client browser
 * @returns string
 */
function getCurrentLanguage(): string {
  if (navigator.languages !== undefined) {
    return navigator.languages.at(0) ?? "en-US";
  }

  return navigator.language;
}

/**
 * June 12, 2025 at 06:53 PM
 * @param date
 * @returns string
 */
export function formatDateWithTime(date: Date): string {
  const language = getCurrentLanguage();
  return date.toLocaleString(language, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
