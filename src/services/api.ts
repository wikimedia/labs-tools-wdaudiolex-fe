import axios from "axios";

import { readToken } from "../auth/session";
import type {
  AddPronunciationBody,
  AddPronunciationResult,
  AuthSession,
  CommonsFilesResponse,
  ContributionRecord,
  Language,
  LoginStart,
  MatchFileInput,
  MatchLexemesResponse,
} from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = readToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function apiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data;
    if (data && typeof data === "object" && "message" in data) {
      const message = (data as { message: unknown }).message;
      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
    if (error.message) {
      return error.message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Request failed";
}

export async function getLanguages(): Promise<Language[]> {
  const { data } = await apiClient.get<Language[]>("/languages");
  return Array.isArray(data) ? data : [];
}

export async function getLanguage(langCode: string): Promise<Language> {
  const { data } = await apiClient.get<Language>(`/languages/${encodeURIComponent(langCode)}`);
  return data;
}

export async function getCommonsFiles(params: {
  lang: string;
  limit?: number;
  continueToken?: string;
  speaker?: string;
}): Promise<CommonsFilesResponse> {
  const { data } = await apiClient.get<CommonsFilesResponse>("/commons/files", {
    params: {
      lang: params.lang,
      limit: params.limit ?? 20,
      continue: params.continueToken,
      speaker: params.speaker,
    },
  });
  return data;
}

export async function matchLexemes(lang: string, files: MatchFileInput[]): Promise<MatchLexemesResponse> {
  const { data } = await apiClient.post<MatchLexemesResponse>("/match-lexemes", { lang, files });
  return data;
}

export async function startLogin(): Promise<LoginStart> {
  const { data } = await apiClient.get<LoginStart>("/auth/login");
  return data;
}

export async function exchangeOAuth(requestToken: string, queryString: string): Promise<AuthSession> {
  const { data } = await apiClient.post<AuthSession>("/oauth-callback", {
    request_token: requestToken,
    query_string: queryString,
  });
  return data;
}

export async function logout(token: string): Promise<void> {
  await apiClient.post("/auth/logout", { token });
}

export async function addPronunciation(body: AddPronunciationBody): Promise<AddPronunciationResult> {
  const { data } = await apiClient.post<AddPronunciationResult>("/lexeme/audio/add", body);
  return data;
}

export async function getContributions(params: {
  username?: string;
  langCode?: string;
} = {}): Promise<ContributionRecord[]> {
  const { data } = await apiClient.get<ContributionRecord[]>("/contributions", {
    params: {
      username: params.username,
      lang_code: params.langCode,
    },
  });
  return Array.isArray(data) ? data : [];
}

export default apiClient;
