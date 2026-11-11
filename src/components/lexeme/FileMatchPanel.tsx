import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { readToken, saveRequestToken } from "../../auth/session";
import AudioPlayer from "../audio/AudioPlayer";
import {
  addPronunciation,
  apiErrorMessage,
  matchLexemes,
  startLogin,
} from "../../services/api";
import type { CommonsFile, FormCandidate } from "../../services/types";
import { displayWord } from "../../utils/words";

const NO_FALLBACKS: string[] = [];

interface FileMatchPanelProps {
  file: CommonsFile;
  lang: string;
  langQid: string | null;
  languageLabel: string;
}

function lexemeIdFromForm(formId: string): string {
  return formId.replace(/-F.*$/, "");
}

function wikidataFormUrl(formId: string): string {
  return `https://www.wikidata.org/wiki/Lexeme:${lexemeIdFromForm(formId)}`;
}

function wikidataSearchUrl(word: string): string {
  const params = new URLSearchParams({
    search: word,
    title: "Special:Search",
    ns146: "1",
  });
  return `https://www.wikidata.org/w/index.php?${params.toString()}`;
}

function candidateKey(candidate: FormCandidate, index: number): string {
  return candidate.form_id || `${candidate.lexeme_id || "lexeme"}-${index}`;
}

function lemmaLanguageLabel(candidate: FormCandidate, languageLabel: string, langQid: string | null): string {
  const code = candidate.lemma_language;
  const sameLanguage = Boolean(langQid && candidate.language_qid === langQid);
  const name = sameLanguage ? languageLabel : null;
  if (name && code) {
    return `${name} · ${code}`;
  }
  return name || code || "Language unknown";
}

const FileMatchPanel: React.FC<FileMatchPanelProps> = ({
  file,
  lang,
  langQid,
  languageLabel,
}) => {
  const parsedWord = displayWord(file.word);
  const [query, setQuery] = useState(parsedWord);
  const [candidates, setCandidates] = useState<FormCandidate[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  const [loginOpen, setLoginOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const [postSuccess, setPostSuccess] = useState<string | null>(null);

  const canPlay = Boolean(file.url && file.url.startsWith("http"));
  const selected = candidates.find((candidate) => candidate.form_id === selectedFormId) ?? null;
  const searchSeq = useRef(0);

  const runSearch = useCallback((word: string) => {
    const trimmed = word.trim();
    const seq = searchSeq.current + 1;
    searchSeq.current = seq;
    setSelectedFormId(null);
    setPostSuccess(null);
    setCandidates([]);
    if (!trimmed) {
      setSearchError("Enter a word to search Wikidata.");
      setSearching(false);
      return;
    }

    setSearching(true);
    setSearchError(null);
    matchLexemes(lang, [{
      title: file.title,
      word: trimmed,
      url: file.url,
    }])
      .then((response) => {
        if (searchSeq.current !== seq) {
          return;
        }
        const result = response.results?.[0];
        if (result?.error) {
          setCandidates([]);
          setSearchError(result.error);
          return;
        }
        setCandidates(result?.candidates ?? []);
      })
      .catch((error: unknown) => {
        if (searchSeq.current !== seq) {
          return;
        }
        setCandidates([]);
        setSearchError(apiErrorMessage(error));
      })
      .finally(() => {
        if (searchSeq.current === seq) {
          setSearching(false);
        }
      });
  }, [file.title, file.url, lang]);

  useEffect(() => {
    setQuery(parsedWord);
    setPostError(null);
    setConfirmOpen(false);
    setLoginOpen(false);
    runSearch(parsedWord);
  }, [file.title, lang, parsedWord, runSearch]);

  const handleMatch = () => {
    if (!selected?.form_id) {
      return;
    }
    setPostError(null);
    if (!readToken()) {
      setLoginError(null);
      setLoginOpen(true);
      return;
    }
    setConfirmOpen(true);
  };

  const handleLogin = () => {
    setLoginLoading(true);
    setLoginError(null);
    startLogin()
      .then((start) => {
        saveRequestToken(start.request_token);
        window.location.assign(start.redirect_string);
      })
      .catch((error: unknown) => {
        setLoginError(apiErrorMessage(error));
        setLoginLoading(false);
      });
  };

  const handleConfirm = () => {
    if (!selected?.form_id) {
      return;
    }
    if (!langQid) {
      setPostError("This language has no Wikidata QID, so the pronunciation cannot be saved.");
      return;
    }
    setPosting(true);
    setPostError(null);
    addPronunciation({
      formid: selected.form_id,
      filename: file.title,
      lang_wdqid: langQid,
    })
      .then((result) => {
        setPostSuccess(`Added pronunciation on ${result.form_id}.`);
        setConfirmOpen(false);
      })
      .catch((error: unknown) => {
        setPostError(apiErrorMessage(error));
      })
      .finally(() => {
        setPosting(false);
      });
  };

  const shownWord = parsedWord || file.title;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, minWidth: 0 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" component="h2" sx={{ color: "#222", lineHeight: 1.2 }}>
          {shownWord}
        </Typography>
        <Typography variant="body2" sx={{ color: "#72777d", mb: 1.5 }}>
          {file.speaker || "Unknown speaker"}
        </Typography>
        {canPlay && file.url ? (
          <AudioPlayer
            key={file.title}
            compact
            audioUrl={file.url}
            title={shownWord}
            fallbackFormats={NO_FALLBACKS}
          />
        ) : (
          <Alert severity="warning">This file has no playable URL yet.</Alert>
        )}
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" component="h3" sx={{ mb: 1, color: "#222" }}>
        Search Wikidata
      </Typography>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
        <TextField
          placeholder="Type a word, then search"
          value={query}
          fullWidth
          size="small"
          hiddenLabel
          aria-label="Search Wikidata"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              runSearch(query);
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={() => runSearch(query)}
          disabled={searching}
          sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
        >
          Search
        </Button>
      </Box>
      {query.trim() && (
        <Link
          href={wikidataSearchUrl(query.trim())}
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
          sx={{ display: "inline-block", mb: 1.5 }}
        >
          Open this search on Wikidata
        </Link>
      )}

      {searching && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 2 }}>
          <CircularProgress size={22} />
          <Typography variant="body2" sx={{ color: "#72777d" }}>
            Searching lexemes…
          </Typography>
        </Box>
      )}

      {searchError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {searchError}
        </Alert>
      )}

      {!searching && !searchError && candidates.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          No lexeme forms matched this word.
        </Alert>
      )}

      {postSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {postSuccess}
        </Alert>
      )}

      {candidates.length > 0 && (
        <List aria-label="Lexeme forms" sx={{ mb: 1.5, maxHeight: "46vh", overflow: "auto" }}>
          {candidates.map((candidate, index) => {
            const formId = candidate.form_id;
            const primary = candidate.form_representation || candidate.lemma || "Unlabeled form";
            const language = lemmaLanguageLabel(candidate, languageLabel, langQid);
            return (
              <ListItemButton
                key={candidateKey(candidate, index)}
                selected={formId === selectedFormId}
                disabled={!formId}
                onClick={() => setSelectedFormId(formId)}
                sx={{ alignItems: "flex-start", border: "1px solid #eaecf0", borderRadius: 1, mb: 1 }}
              >
                <ListItemText
                  primary={primary}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" sx={{ display: "block", color: "#202122" }}>
                        {language}
                      </Typography>
                      <Typography component="span" variant="body2" sx={{ display: "block", color: "#54595d" }}>
                        {candidate.description || "No description on Wikidata"}
                      </Typography>
                      <Typography component="span" variant="caption" sx={{ display: "block", mt: 0.5 }}>
                        {formId ? (
                          <Link
                            href={wikidataFormUrl(formId)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                          >
                            {formId}
                          </Link>
                        ) : "No form id"}
                        {candidate.already_has_audio ? " · already has audio" : ""}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            );
          })}
        </List>
      )}

      <Button
        variant="contained"
        onClick={handleMatch}
        disabled={!selected?.form_id || searching}
      >
        Match audio
      </Button>
      </Paper>

      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
        <DialogTitle>Login with Wikimedia</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Matching writes the pronunciation on Wikidata as you. Sign in to continue.
            Nothing is saved until you confirm the form.
          </Typography>
          {loginError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {loginError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleLogin} disabled={loginLoading}>
            Login with Wikimedia
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmOpen} onClose={() => !posting && setConfirmOpen(false)}>
        <DialogTitle>Match this recording</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Form {selected?.form_id}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            File {file.title}
          </Typography>
          <Typography variant="body2">
            Language {langQid || "missing QID"}
          </Typography>
          {postError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {postError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={posting}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirm} disabled={posting || !langQid}>
            {posting ? "Saving…" : "Match audio"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FileMatchPanel;
