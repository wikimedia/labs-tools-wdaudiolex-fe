import React from "react";
import {
  Alert,
  Box,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import AudioPlayer from "../audio/AudioPlayer";
import type { CommonsFile } from "../../services/types";

interface PronunciationFileListProps {
  files: CommonsFile[];
  loading: boolean;
  error: string | null;
  selectedTitle: string | null;
  onSelect: (file: CommonsFile) => void;
}

const NO_FALLBACKS: string[] = [];

function fileKey(file: CommonsFile, index: number): string {
  return file.title || `file-${index}`;
}

const PronunciationFileList: React.FC<PronunciationFileListProps> = ({
  files,
  loading,
  error,
  selectedTitle,
  onSelect,
}) => {
  const selected = files.find((file) => file.title === selectedTitle) ?? null;
  const canPlay = Boolean(selected?.url && selected.url.startsWith("http"));

  return (
    <Box>
      {selected && canPlay && selected.url && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            {selected.word || selected.title}
          </Typography>
          <AudioPlayer
            key={selected.title}
            audioUrl={selected.url}
            title={selected.word || selected.title}
            fallbackFormats={NO_FALLBACKS}
          />
        </Box>
      )}

      {selected && !canPlay && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          This file has no playable URL yet.
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && files.length === 0 && (
        <Alert severity="info">No pronunciation files for this language.</Alert>
      )}

      {files.length > 0 && (
        <List aria-label="Pronunciation files">
          {files.map((file, index) => {
            const word = file.word || "Word not parsed";
            const speaker = file.speaker || "Unknown speaker";
            return (
              <ListItemButton
                key={fileKey(file, index)}
                selected={file.title === selectedTitle}
                onClick={() => onSelect(file)}
              >
                <ListItemText
                  primary={word}
                  secondary={`${speaker} · ${file.title}`}
                />
              </ListItemButton>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default PronunciationFileList;
