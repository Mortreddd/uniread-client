import { getCurrentLanguage } from "@/utils/Language.ts";

export class Formatters {
  // Use a static property to group Date functions
  static Date = class {
    /**
     * Format a date to only show the date (e.g. "June 12, 2025")
     */
    static formatDateOnly(date: Date): string {
      const language = getCurrentLanguage();
      return date.toLocaleDateString(language, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }

    /**
     * June 12, 2025 at 06:53 PM
     */
    static formatDateWithTime(date: Date): string {
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
     */
    static formatShortDateWithTime(date: Date): string {
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
     */
    static formatWeekdayWithDate(date: Date): string {
      const language = getCurrentLanguage();
      return date.toLocaleDateString(language, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        weekday: "short",
      });
    }

    /**
     * Relative time logic
     */
    static formatRelativeTime(date: Date): string {
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return "Just now";

      if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      }

      if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      }

      if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? "s" : ""} ago`;
      }

      // Accessing other static method in the same class
      return this.formatDateOnly(date);
    }

    static formatShortenDate(date: Date): string {
      const now = new Date();
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / 60000,
      );
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInDays < 1) {
        const language = getCurrentLanguage();
        return date.toLocaleTimeString(language, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      }

      const day = date.getDate();
      const month = date.toLocaleString(getCurrentLanguage(), {
        month: "short",
      });
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    }
  };

  static Number = class {
    /**
     * Formats a number into a more human-readable string with suffixes (K for thousands, M for millions).
     * For example:
     * - 1500 becomes "1.5K"
     * - 2000000 becomes "2M"
     * - 500 remains "500"
     * @param num
     * @returns
     */
    static formatRelativeNumber(num: number): string {
      if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
      }
      if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
      }
      return num.toString();
    }
  };
}
