/**
 * Get the language of client browser
 * @returns string
 */
export function getCurrentLanguage(): string {
    if (navigator.languages !== undefined) {
        return navigator.languages[0] ?? "en-US";
    }

    return navigator.language;
}