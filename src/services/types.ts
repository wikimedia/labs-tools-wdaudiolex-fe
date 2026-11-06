export interface Language {
  iso: string | null;
  iso3: string | null;
  qid: string | null;
  label: string;
  commons_category: string | null;
}

export interface CommonsFile {
  title: string;
  url: string | null;
  iso3: string | null;
  lang_qid: string | null;
  speaker: string | null;
  word: string | null;
  transcription: string | null;
}

export interface CommonsFilesResponse {
  language: Language;
  files: CommonsFile[];
  continue: string | null;
}

export interface MatchFileInput {
  title?: string;
  word?: string | null;
  url?: string | null;
}

export interface FormCandidate {
  lexeme_id: string | null;
  form_id: string | null;
  lemma: string | null;
  form_representation: string | null;
  grammatical_features: string[];
  confidence: "exact" | "close";
  already_has_audio: boolean;
  matched_on: "form" | "lemma";
}

export interface MatchFileResult {
  title: string | null;
  word: string | null;
  url: string | null;
  candidates: FormCandidate[];
  error?: string;
}

export interface MatchLexemesResponse {
  language: Language;
  results: MatchFileResult[];
}

export interface LoginStart {
  redirect_string: string;
  request_token: string;
}

export interface AuthSession {
  token: string;
  username: string;
  pref_langs: string;
}

export interface AddPronunciationBody {
  formid: string;
  filename: string;
  lang_wdqid: string;
  variety_qid?: string;
}

export interface AddPronunciationResult {
  lexeme_id: string;
  form_id: string;
  revision_id: string | null;
  contribution_id: number;
  filename: string;
  warnings: string[];
}

export interface ContributionRecord {
  id: number;
  wd_item: string | null;
  form_id: string | null;
  username: string | null;
  lang_code: string | null;
  audio_filename: string | null;
  variety_qid: string | null;
  edit_type: string | null;
  data: string | null;
  revision_id: string | null;
  date: string | null;
}
