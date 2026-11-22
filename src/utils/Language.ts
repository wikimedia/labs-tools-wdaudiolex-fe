const LAST_LANGUAGE_KEY = "lastLanguageCode";

/**
 * Read the last chosen language code from localStorage.
 */
export function readLastLanguage(): string | null {
  try {
    return localStorage.getItem(LAST_LANGUAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Save the last chosen language code to localStorage, or remove it if null.
 */
export function saveLastLanguage(langCode: string | null): void {
  try {
    if (langCode) {
      localStorage.setItem(LAST_LANGUAGE_KEY, langCode);
    } else {
      localStorage.removeItem(LAST_LANGUAGE_KEY);
    }
  } catch {
    // Ignore storage quota or access errors
  }
}
