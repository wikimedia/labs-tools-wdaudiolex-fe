import { saveRequestToken } from "./session";
import { startLogin } from "../services/api";

/**
 * Ask the API for a Wikimedia authorize URL, keep the request token in the
 * browser, then leave for Wikidata. The token has to be stored first: the
 * callback page reads it after the redirect.
 */
export async function redirectToWikimediaLogin(): Promise<void> {
  const start = await startLogin();
  saveRequestToken(start.request_token);
  window.location.assign(start.redirect_string);
}
