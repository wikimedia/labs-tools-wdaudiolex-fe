import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  Chip,
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

import { redirectToWikimediaLogin } from "../../auth/login";
import { clearPendingMatch, readPendingMatch, savePendingMatch } from "../../auth/pendingMatch";
import { readToken } from "../../auth/session";
import AudioPlayer from "../audio/AudioPlayer";
import LicenceNotice from "../licence-notice";
import {
  addPronunciation,
  apiErrorMessage,
  matchLexemes,
} from "../../services/api";
import type { CommonsFile, FormCandidate } from "../../services/types";
import { commonsFileUrl, wikidataFormUrl } from "../../utils/urls";
import { displayWord } from "../../utils/words";

const NO_FALLBACKS: string[] = [];

interface FileMatchPanelProps {
  file: CommonsFile;
  lang: string;
  langQid: string | null;
  languageLabel: string;
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
  const resumedConfirm = useRef(false);

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
    const pending = readPendingMatch();
    const resume = Boolean(
      pending
      && readToken()
      && pending.lang === lang
      && pending.file.title === file.title
      && pending.formId,
    );

    setQuery(parsedWord);
    setPostError(null);
    setLoginOpen(false);

    if (resume && pending) {
      resumedConfirm.current = true;
      setSearchError(null);
      setSearching(false);
      setCandidates([pending.candidate]);
      setSelectedFormId(pending.formId);
      setConfirmOpen(true);
      return;
    }

    resumedConfirm.current = false;
    setConfirmOpen(false);
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
    if (!selected?.form_id) {
      return;
    }
    setLoginLoading(true);
    setLoginError(null);
    savePendingMatch({
      lang,
      file,
      formId: selected.form_id,
      candidate: selected,
    });
    redirectToWikimediaLogin()
      .catch((error: unknown) => {
        clearPendingMatch();
        setLoginError(apiErrorMessage(error));
        setLoginLoading(false);
      });
  };

  const dismissConfirm = () => {
    if (posting) {
      return;
    }
    clearPendingMatch();
    setConfirmOpen(false);
    if (resumedConfirm.current) {
      setSelectedFormId(null);
      resumedConfirm.current = false;
    }
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
        clearPendingMatch();
        resumedConfirm.current = false;
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
          {file.speaker || "Unknown speaker"} ·{" "}
          <Link
            href={commonsFileUrl(file.title)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {file.title}
          </Link>
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
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <span>{primary}</span>
                      {candidate.confidence && (
                        <Chip
                          label={candidate.confidence}
                          size="small"
                          color={candidate.confidence === "exact" ? "success" : "default"}
                          sx={{ textTransform: "capitalize", height: 20, fontSize: "0.75rem" }}
                        />
                      )}
                      {candidate.already_has_audio && (
                        <Chip
                          label="already has audio"
                          size="small"
                          color="warning"
                          variant="outlined"
                          sx={{ height: 20, fontSize: "0.75rem" }}
                        />
                      )}
                    </Box>
                  }
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

      <Dialog open={confirmOpen} onClose={dismissConfirm}>
        <DialogTitle>Match this recording</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Form{" "}
            {selected?.form_id ? (
              <Link
                href={wikidataFormUrl(selected.form_id)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selected.form_id}
              </Link>
            ) : (
              "none"
            )}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            File{" "}
            <Link
              href={commonsFileUrl(file.title)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.title}
            </Link>
          </Typography>
          <Typography variant="body2">
            Language {langQid || "missing QID"}
          </Typography>
          <LicenceNotice />
          {postError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {postError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={dismissConfirm} disabled={posting}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirm} disabled={posting || !langQid}>
            {posting ? "Saving…" : "Match audio"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FileMatchPanel;
