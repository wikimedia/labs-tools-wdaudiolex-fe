import type { AuthSession } from "../services/types";

const TOKEN_KEY = "authToken";
const USERNAME_KEY = "authUsername";
const PREF_LANGS_KEY = "authPrefLangs";
const REQUEST_TOKEN_KEY = "request_token";

export interface StoredSession {
  token: string;
  username: string;
  prefLangs: string;
}

export function readToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function readSession(): StoredSession | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const username = localStorage.getItem(USERNAME_KEY);
  if (!token || !username) {
    return null;
  }
  return {
    token,
    username,
    prefLangs: localStorage.getItem(PREF_LANGS_KEY) ?? "",
  };
}

export function saveSession(session: AuthSession): void {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USERNAME_KEY, session.username);
  localStorage.setItem(PREF_LANGS_KEY, session.pref_langs ?? "");
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PREF_LANGS_KEY);
}

export function readRequestToken(): string | null {
  return localStorage.getItem(REQUEST_TOKEN_KEY);
}

export function saveRequestToken(requestToken: string): void {
  localStorage.setItem(REQUEST_TOKEN_KEY, requestToken);
}

export function clearRequestToken(): void {
  localStorage.removeItem(REQUEST_TOKEN_KEY);
}
