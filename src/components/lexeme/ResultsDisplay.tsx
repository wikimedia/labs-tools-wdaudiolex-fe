import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  CircularProgress
} from "@mui/material";
import { AudioFile as AudioFileIcon } from "@mui/icons-material";
import { WikiCard, WikiMessage, WikiButton } from "../wikimedia";

interface AudioFile {
  id: string;
  name: string;
  url: string;
  language?: string;
}

interface Lexeme {
  id: string;
  lemma: string;
  language: string;
  forms: string[];
  existingAudioIds?: string[];
}

interface Match {
  audioFile: AudioFile;
  lexeme: Lexeme;
  confidence: number; // 0-100
}

interface ResultsDisplayProps {
  matches: Match[];
  loading: boolean;
  error: string | null;
  onSelectMatch: (match: Match) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  matches,
  loading,
  error,
  onSelectMatch
}) => {
  if (loading) {
    return (
      <WikiCard sx={{ mb: 4, textAlign: "center" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
          <CircularProgress size={40} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Matching lexemes with audio files...
          </Typography>
        </Box>
      </WikiCard>
    );
  }

  if (error) {
    return (
      <WikiCard sx={{ mb: 4 }}>
        <WikiMessage type="error" title="Error">
          {error}
        </WikiMessage>
      </WikiCard>
    );
  }

  if (matches.length === 0) {
    return (
      <WikiCard sx={{ mb: 4, textAlign: "center" }}>
        <WikiMessage type="notice">
          No matches found. Try a different pattern or category.
        </WikiMessage>
      </WikiCard>
    );
  }

  return (
    <WikiCard 
      title={`Results (${matches.length} matches)`}
      sx={{ mb: 4 }}
    >
      <List sx={{ width: "100%" }}>
        {matches.map((match, index) => (
          <React.Fragment key={`${match.audioFile.id}-${match.lexeme.id}`}>
            {index > 0 && <Divider component="li" />}
            <ListItem
              alignItems="flex-start"
              sx={{
                "&:hover": { bgcolor: "action.hover" },
                borderLeft: `4px solid ${getConfidenceColor(match.confidence)}`,
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <AudioFileIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1" component="span" sx={{ mr: 1 }}>
                      {match.lexeme.lemma}
                    </Typography>
                    <Chip
                      label={`${match.confidence}% match`}
                      size="small"
                      sx={{
                        bgcolor: getConfidenceColor(match.confidence),
                        color: "white",
                      }}
                    />
                  </Box>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ display: "block" }}
                    >
                      Audio file: {match.audioFile.name}
                    </Typography>
                    <Typography component="span" variant="body2" sx={{ display: "block" }}>
                      Lexeme ID: {match.lexeme.id} • Language: {match.lexeme.language}
                    </Typography>
                    <Typography component="span" variant="body2" sx={{ display: "block" }}>
                      Forms: {match.lexeme.forms.join(", ")}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <WikiButton
                        action="progressive"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => onSelectMatch(match)}
                      >
                        Select Match
                      </WikiButton>
                      <WikiButton
                        size="small"
                        component="a"
                        href={`https://www.wikidata.org/wiki/Lexeme:${match.lexeme.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Lexeme
                      </WikiButton>
                    </Box>
                  </React.Fragment>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </WikiCard>
  );
};

// Helper function to get color based on confidence score
const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 90) return "#14866d"; // Wikimedia green
  if (confidence >= 70) return "#3366cc"; // Wikimedia blue
  if (confidence >= 50) return "#fc3";    // Wikimedia yellow
  if (confidence >= 30) return "#ff9900"; // Wikimedia orange
  return "#d33";                          // Wikimedia red
};

export default ResultsDisplay; 