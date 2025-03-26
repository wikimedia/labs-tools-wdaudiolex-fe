import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Divider,
  Button,
  SelectChangeEvent
} from "@mui/material";
import { lexemeApi } from "../../services/api";
import { WikiMessage } from "../wikimedia";

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

interface AddPronunciationFormProps {
  audioFile: AudioFile;
  lexeme: Lexeme;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

// Varieties for demonstration purposes
const PRONUNCIATION_VARIETIES = [
  { code: "received-pronunciation", name: "Received Pronunciation" },
  { code: "general-american", name: "General American" },
  { code: "standard", name: "Standard" },
  { code: "australian", name: "Australian" },
  { code: "international", name: "International" }
];

const AddPronunciationForm: React.FC<AddPronunciationFormProps> = ({
  audioFile,
  lexeme,
  onSubmitSuccess,
  onCancel
}) => {
  const [variety, setVariety] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleVarietyChange = (event: SelectChangeEvent) => {
    setVariety(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the backend API
      // For now, just simulate a successful request with a delay
      // await lexemeApi.addPronunciation(lexeme.id, audioFile.id, variety);
      
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        
        // Notify parent of successful submission after 1.5 seconds
        setTimeout(() => {
          onSubmitSuccess();
        }, 1500);
      }, 1000);
    } catch (err) {
      setError("Failed to add pronunciation. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <WikiMessage type="success" title="Success">
          Pronunciation added successfully! The audio file has been linked to the lexeme.
        </WikiMessage>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add Pronunciation
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Audio File:
        </Typography>
        <Typography variant="body2">
          {audioFile.name}
        </Typography>
        
        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          Lexeme:
        </Typography>
        <Typography variant="body2">
          {lexeme.lemma} ({lexeme.id}) - {lexeme.language}
        </Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel id="variety-select-label">Pronunciation Variety (Optional)</InputLabel>
          <Select
            labelId="variety-select-label"
            value={variety}
            onChange={handleVarietyChange}
            label="Pronunciation Variety (Optional)"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {PRONUNCIATION_VARIETIES.map((v) => (
              <MenuItem key={v.code} value={v.code}>
                {v.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {error && (
          <Box sx={{ mb: 2 }}>
            <WikiMessage type="error">
              {error}
            </WikiMessage>
          </Box>
        )}
        
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button 
            variant="outlined"
            color="inherit"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Add Pronunciation"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddPronunciationForm; 