/**
 * Return the URL to a Wikimedia Commons file page for a given file title.
 */
export function commonsFileUrl(title: string): string {
  const normalized = title.startsWith("File:") ? title : `File:${title}`;
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(normalized.replace(/ /g, "_"))}`;
}

/**
 * Return the URL to the Wikidata entity page for a given lexeme form ID.
 * Special:EntityPage resolves directly to the lexeme form anchor on Wikidata.
 */
export function wikidataFormUrl(formId: string): string {
  return `https://www.wikidata.org/wiki/Special:EntityPage/${encodeURIComponent(formId)}`;
}
