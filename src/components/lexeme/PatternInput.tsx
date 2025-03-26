import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box, 
  Chip,
  Tooltip,
  IconButton,
  Collapse
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface PatternInputProps {
  onPatternSubmit: (pattern: string) => void;
}

const PatternInput: React.FC<PatternInputProps> = ({ onPatternSubmit }) => {
  const [pattern, setPattern] = useState<string>("");
  const [recentPatterns, setRecentPatterns] = useState<string[]>([]);
  const [helpOpen, setHelpOpen] = useState<boolean>(false);

  const handlePatternChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPattern(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (pattern.trim()) {
      onPatternSubmit(pattern);
      
      // Add pattern to recent patterns if it's not already there
      if (!recentPatterns.includes(pattern)) {
        setRecentPatterns(prev => [pattern, ...prev].slice(0, 5));
      }
    }
  };

  const handleRecentPatternClick = (selectedPattern: string) => {
    setPattern(selectedPattern);
    onPatternSubmit(selectedPattern);
  };

  const patternExamples = [
    { pattern: "*.mp3", description: "Match all MP3 files" },
    { pattern: "[a-z]*-pronunciation.ogg", description: "Match files ending with -pronunciation.ogg" },
    { pattern: "en-us-*.wav", description: "Match US English pronunciation files" },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Pattern Matching</Typography>
        <Tooltip title="Toggle pattern matching help">
          <IconButton 
            size="small" 
            sx={{ ml: 1 }} 
            onClick={() => setHelpOpen(!helpOpen)}
            aria-label="pattern help"
          >
            {helpOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      
      <Collapse in={helpOpen}>
        <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "background.default" }}>
          <Typography variant="subtitle2" gutterBottom>
            Pattern Matching Guide
          </Typography>
          <Typography variant="body2" paragraph>
            Enter a pattern to match audio files with lexemes. The matching algorithm ignores case sensitivity and punctuation.
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            Example Patterns:
          </Typography>
          
          {patternExamples.map((example, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography variant="body2" component="span" sx={{ fontFamily: "monospace", fontWeight: "bold" }}>
                {example.pattern}
              </Typography>
              <Typography variant="body2" component="span" sx={{ ml: 1, color: "text.secondary" }}>
                - {example.description}
              </Typography>
            </Box>
          ))}

          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>Wildcards:</strong> Use * to match any number of characters, ? to match a single character.
          </Typography>
        </Paper>
      </Collapse>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Enter pattern for matching"
          variant="outlined"
          value={pattern}
          onChange={handlePatternChange}
          placeholder="e.g., *.mp3 or [language]-[word].ogg"
          sx={{ mb: 2 }}
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          disabled={!pattern.trim()}
          sx={{ mb: 2 }}
        >
          Match Files
        </Button>
      </form>

      {recentPatterns.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Recent Patterns:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {recentPatterns.map((recentPattern, index) => (
              <Chip
                key={index}
                label={recentPattern}
                onClick={() => handleRecentPatternClick(recentPattern)}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default PatternInput; 