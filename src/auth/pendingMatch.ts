import type { CommonsFile, FormCandidate } from "../services/types";

const PENDING_MATCH_KEY = "pendingMatch";

export interface PendingMatch {
  lang: string;
  file: CommonsFile;
  formId: string;
  candidate: FormCandidate;
}

function asText(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asFile(value: unknown): CommonsFile | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  const file = value as CommonsFile;
  if (!file.title) {
    return null;
  }
  return {
    title: file.title,
    url: asText(file.url),
    iso3: asText(file.iso3),
    lang_qid: asText(file.lang_qid),
    speaker: asText(file.speaker),
    word: asText(file.word),
    transcription: asText(file.transcription),
  };
}

function asCandidate(value: unknown, formId: string): FormCandidate | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  const row = value as FormCandidate;
  if (row.form_id !== formId) {
    return null;
  }
  const features = Array.isArray(row.grammatical_features)
    ? row.grammatical_features.filter((item): item is string => typeof item === "string")
    : [];
  return {
    lexeme_id: asText(row.lexeme_id),
    form_id: formId,
    lemma: asText(row.lemma),
    lemma_language: asText(row.lemma_language),
    description: asText(row.description),
    language_qid: asText(row.language_qid),
    form_representation: asText(row.form_representation),
    grammatical_features: features,
    confidence: row.confidence === "close" ? "close" : "exact",
    already_has_audio: Boolean(row.already_has_audio),
    matched_on: row.matched_on === "lemma" ? "lemma" : "form",
  };
}

export function readPendingMatch(): PendingMatch | null {
  const raw = sessionStorage.getItem(PENDING_MATCH_KEY);
  if (!raw) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    const row = parsed as Partial<PendingMatch>;
    const lang = asText(row.lang);
    const formId = asText(row.formId);
    const file = asFile(row.file);
    if (!lang || !formId || !file) {
      return null;
    }
    const candidate = asCandidate(row.candidate, formId);
    if (!candidate) {
      return null;
    }
    return { lang, file, formId, candidate };
  } catch {
    return null;
  }
}

export function savePendingMatch(match: PendingMatch): void {
  sessionStorage.setItem(PENDING_MATCH_KEY, JSON.stringify(match));
}

export function clearPendingMatch(): void {
  sessionStorage.removeItem(PENDING_MATCH_KEY);
}
