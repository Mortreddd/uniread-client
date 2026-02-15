/**
 * Get the language of client browser
 * @returns string
 */
function getCurrentLanguage(): string {
  if (navigator.languages !== undefined) {
    return navigator.languages[0] ?? "en-US";
  }

  return navigator.language;
}

/**
 * Format a date to only show the date (e.g. "June 12, 2025")
 * @param date
 * @returns string
 */
export function formatDateOnly(date: Date): string {
  const language = getCurrentLanguage();
  return date.toLocaleDateString(language, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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

/**
 * Format a date with time in short format (e.g. "Jun 12, 2025 at 06:53 PM")
 * @param date
 * @returns string
 */
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
    weekday: "short",
  });
}

/**
 * Less than 24 hours ago: "x hours ago"
 * Less than 7 days ago: "x days ago"
 * Otherwise: "MMM D, YYYY"
 * @param date
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  return formatDateOnly(date);
}
