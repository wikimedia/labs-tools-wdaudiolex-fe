/** Drop a leading apostrophe Lingua Libre sometimes stores on the word. */
export function displayWord(word: string | null | undefined): string {
  return (word || "").replace(/^['\u2018\u2019\u201b\u2032]+/, "").trim();
}
