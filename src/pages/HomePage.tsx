import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Container, Paper, Typography } from "@mui/material";

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

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mb: 5, mt: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 400 }}>
          Match pronunciation files to Wikidata lexemes
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: "auto" }}>
          Pick a language to see Lingua Libre recordings. Play a file, then look up the lexeme it pronounces.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
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
            textAlign: "center",
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
        <Box>
          <Typography variant="h6" component="h2" gutterBottom>
            {selectedLanguage.label}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {selectedLanguage.commons_category || "Lingua Libre pronunciation files"}
          </Typography>
          <PronunciationFileList
            files={files}
            loading={filesLoading}
            error={filesError}
            selectedTitle={selectedTitle}
            onSelect={(file) => setSelectedTitle(file.title)}
          />
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
