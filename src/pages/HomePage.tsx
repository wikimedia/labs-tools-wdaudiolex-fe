import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Paper, Typography } from "@mui/material";

import FileMatchPanel from "../components/lexeme/FileMatchPanel";
import LanguageSelect, { languageCode } from "../components/lexeme/LanguageSelect";
import PronunciationFileList from "../components/lexeme/PronunciationFileList";
import { apiErrorMessage, getCommonsFiles, getLanguages } from "../services/api";
import type { CommonsFile, Language } from "../services/types";

const FILE_PAGE_SIZE = 20;

const HomePage: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languagesLoading, setLanguagesLoading] = useState(true);
  const [languagesError, setLanguagesError] = useState<string | null>(null);
  const [languageAttempt, setLanguageAttempt] = useState(0);

  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [files, setFiles] = useState<CommonsFile[]>([]);
  const [filesLoading, setFilesLoading] = useState(false);
  const [filesError, setFilesError] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLanguagesLoading(true);
    setLanguagesError(null);

    getLanguages()
      .then((rows) => {
        if (!cancelled) {
          setLanguages(rows);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setLanguagesError(apiErrorMessage(error));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLanguagesLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [languageAttempt]);

  useEffect(() => {
    if (!selectedLanguage) {
      setFiles([]);
      setFilesError(null);
      setSelectedTitle(null);
      return;
    }

    const lang = languageCode(selectedLanguage);
    if (!lang) {
      setFiles([]);
      setFilesError("This language has no code the API can use.");
      return;
    }

    let cancelled = false;
    setFilesLoading(true);
    setFilesError(null);
    setSelectedTitle(null);

    getCommonsFiles({ lang, limit: FILE_PAGE_SIZE })
      .then((response) => {
        if (!cancelled) {
          setFiles(response.files ?? []);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setFiles([]);
          setFilesError(apiErrorMessage(error));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setFilesLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedLanguage]);

  const selectedFile = files.find((file) => file.title === selectedTitle) ?? null;
  const selectedLang = selectedLanguage ? languageCode(selectedLanguage) : "";

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 400, color: "#222" }}>
          Match pronunciation files to Wikidata lexemes
        </Typography>
        <Typography variant="body2" sx={{ color: "#72777d" }}>
          Choose a language and a recording. The player, search, and matches stay on the right.
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <LanguageSelect
          languages={languages}
          value={selectedLanguage}
          loading={languagesLoading}
          onChange={setSelectedLanguage}
        />
      </Box>

      {languagesError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => setLanguageAttempt((attempt) => attempt + 1)}>
              Try again
            </Button>
          }
        >
          {languagesError}
        </Alert>
      )}

      {!selectedLanguage && !languagesError && (
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            backgroundColor: "#f8f9fa",
            borderColor: "#a2a9b1",
          }}
        >
          <Typography color="text.secondary">
            {languagesLoading
              ? "Loading languages…"
              : "Select a language to see pronunciation files."}
          </Typography>
        </Paper>
      )}

      {selectedLanguage && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2fr) minmax(0, 3fr)" },
            gap: 4,
            alignItems: "start",
          }}
        >
          <Box>
            <Typography variant="h6" component="h2" gutterBottom sx={{ color: "#222" }}>
              {selectedLanguage.label}
            </Typography>
            <Typography variant="body2" sx={{ color: "#72777d", mb: 2 }}>
              {selectedLanguage.commons_category || "Lingua Libre pronunciation files"}
            </Typography>
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                backgroundColor: "#f8f9fa",
                border: "1px solid #a2a9b1",
                maxHeight: { md: "70vh" },
                overflow: "auto",
              }}
            >
              <PronunciationFileList
                files={files}
                loading={filesLoading}
                error={filesError}
                selectedTitle={selectedTitle}
                onSelect={(file: CommonsFile) => setSelectedTitle(file.title)}
              />
            </Box>
          </Box>

          <Box sx={{ position: { md: "sticky" }, top: { md: 16 } }}>
            {selectedFile && selectedLang ? (
              <FileMatchPanel
                file={selectedFile}
                lang={selectedLang}
                langQid={selectedLanguage.qid}
                languageLabel={selectedLanguage.label}
              />
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  backgroundColor: "#f8f9fa",
                  borderColor: "#a2a9b1",
                }}
              >
                <Typography sx={{ color: "#72777d" }}>
                  Select a recording to open the player, search Wikidata, and match a lexeme form.
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
