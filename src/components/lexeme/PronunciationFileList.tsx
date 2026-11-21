import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import type { CommonsFile } from "../../services/types";
import { commonsFileUrl } from "../../utils/urls";
import { displayWord } from "../../utils/words";

interface PronunciationFileListProps {
  files: CommonsFile[];
  loading: boolean;
  error: string | null;
  selectedTitle: string | null;
  onSelect: (file: CommonsFile) => void;
  onRetry?: () => void;
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
  onRetry,
}) => {
  return (
    <Box>
      {loading && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, py: 4 }} role="status">
          <CircularProgress size={22} />
          <Typography variant="body2" sx={{ color: "#72777d" }}>
            Loading pronunciation files…
          </Typography>
        </Box>
      )}

      {!loading && error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              Try again
            </Button>
          ) : undefined}
        >
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
                  secondary={
                    <>
                      <span>{speaker} · </span>
                      <Link
                        href={commonsFileUrl(file.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {file.title}
                      </Link>
                    </>
                  }
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
