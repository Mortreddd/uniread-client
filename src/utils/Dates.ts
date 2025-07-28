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

export function formatShortDateWithTime(date: Date): string {
  const language = getCurrentLanguage();
  return date.toLocaleString(language, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Wed, Nov 2, 2022
 * @param date
 */
export function formatWeekdayWithDate(date: Date): string {
  const language = getCurrentLanguage();
  return date.toLocaleDateString(language, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "short"
  })
}