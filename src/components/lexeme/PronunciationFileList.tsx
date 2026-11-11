import React from "react";
import {
  Alert,
  Box,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import type { CommonsFile } from "../../services/types";
import { displayWord } from "../../utils/words";

interface PronunciationFileListProps {
  files: CommonsFile[];
  loading: boolean;
  error: string | null;
  selectedTitle: string | null;
  onSelect: (file: CommonsFile) => void;
}

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
  return (
    <Box>
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
            const word = displayWord(file.word) || "Word not parsed";
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
