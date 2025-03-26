import React, { useState } from "react";
import { Box, Typography, Container, Divider, Grid, Button } from "@mui/material";
import CategorySelector from "../components/lexeme/CategorySelector";
import PatternInput from "../components/lexeme/PatternInput";
import ResultsDisplay from "../components/lexeme/ResultsDisplay";
import AudioPlayer from "../components/audio/AudioPlayer";
import AddPronunciationForm from "../components/lexeme/AddPronunciationForm";
import AudioPronunciationExample from "../components/lexeme/AudioPronunciationExample";
import AddPronunciationButton from "../components/lexeme/AddPronunciationButton";
import { lexemeApi } from "../services/api";
// Import Codex design tokens CSS
import '@wikimedia/codex-design-tokens/theme-wikimedia-ui.css';
// Import our custom Wikimedia-styled components
import { WikiMessage, WikiCard } from "../components/wikimedia";

// Updated examples with working audio URLs and fallbacks
const EXAMPLE_AUDIOS = [
  {
    id: "File:en-us-read.ogg",
    name: "English pronunciation of 'read'",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d7/En-us-read_%282%29.ogg",
    fallbackUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/7/77/En-us-example.ogg",
    ],
    language: "en-us"
  },
  {
    id: "File:fr-bonjour.ogg",
    name: "French pronunciation of 'bonjour'",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Fr-bonjour-2.ogg",
    fallbackUrls: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/De-Demonstration.ogg",
    ],
    language: "fr"
  }
];

// Mock interfaces and types
interface AudioFile {
  id: string;
  name: string;
  url: string;
  fallbackUrls?: string[];
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
  confidence: number;
}

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [matchError, setMatchError] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Reset other states when category changes
    setSelectedPattern(null);
    setMatches([]);
    setSelectedMatch(null);
    setShowAddForm(false);
  };

  const handlePatternSubmit = async (pattern: string) => {
    if (!selectedCategory) {
      setMatchError("Please select a category first.");
      return;
    }

    setSelectedPattern(pattern);
    setIsMatching(true);
    setMatchError(null);
    setMatches([]);
    setSelectedMatch(null);
    setShowAddForm(false);
    
    try {
      // In a real implementation, this would call the backend API
      // const response = await lexemeApi.matchLexemes(selectedCategory, pattern);
      // setMatches(response.data);
      
      // Mock data for demonstration purposes
      setTimeout(() => {
        const mockMatches: Match[] = [
          {
            audioFile: {
              id: "File:en-us-lexeme.ogg",
              name: "en-us-lexeme.ogg",
              url: "https://upload.wikimedia.org/wikipedia/commons/e/e2/En-us-lexeme.ogg",
              fallbackUrls: [
                "https://upload.wikimedia.org/wikipedia/commons/7/77/En-us-example.ogg",
                "https://cdn.pixabay.com/download/audio/2022/03/10/audio_1da2fc9e01.mp3"
              ],
              language: "en-us"
            },
            lexeme: {
              id: "L123456",
              lemma: "lexeme",
              language: "English",
              forms: ["lexeme", "lexemes"],
              existingAudioIds: []
            },
            confidence: 95
          },
          {
            audioFile: {
              id: "File:En-us-example.ogg",
              name: "en-us-example.ogg",
              url: "https://upload.wikimedia.org/wikipedia/commons/7/77/En-us-example.ogg",
              fallbackUrls: [
                "https://upload.wikimedia.org/wikipedia/commons/e/e2/En-us-lexeme.ogg",
                "https://cdn.pixabay.com/download/audio/2022/03/10/audio_1da2fc9e01.mp3"
              ],
              language: "en-us"
            },
            lexeme: {
              id: "L123789",
              lemma: "example",
              language: "English",
              forms: ["example", "examples"],
              existingAudioIds: []
            },
            confidence: 87
          },
          {
            audioFile: {
              id: "File:De-Demonstration.ogg",
              name: "De-demonstration.ogg",
              url: "https://upload.wikimedia.org/wikipedia/commons/9/9e/De-Demonstration.ogg",
              fallbackUrls: [
                "https://upload.wikimedia.org/wikipedia/commons/1/1a/Fr-bonjour-2.ogg",
                "https://cdn.pixabay.com/download/audio/2021/08/08/audio_dc39bbc478.mp3"
              ],
              language: "de"
            },
            lexeme: {
              id: "L987654",
              lemma: "demonstration",
              language: "German",
              forms: ["demonstration", "demonstrations"],
              existingAudioIds: []
            },
            confidence: 75
          }
        ];
        
        setMatches(mockMatches);
        setIsMatching(false);
      }, 1500);
    } catch (err) {
      setMatchError("Failed to match lexemes. Please try again.");
      setIsMatching(false);
    }
  };

  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match);
    setShowAddForm(false);
  };

  const handleAddPronunciation = () => {
    if (selectedMatch) {
      setShowAddForm(true);
    }
  };

  const handlePronunciationAdded = () => {
    // In a real implementation, we would refresh the matches or update the current one
    setShowAddForm(false);
    
    // Remove the match from the list after successful submission
    if (selectedMatch) {
      setMatches(prev => prev.filter(
        match => match.audioFile.id !== selectedMatch.audioFile.id || 
                match.lexeme.id !== selectedMatch.lexeme.id
      ));
      setSelectedMatch(null);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Audio Lexeme Matching Tool
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Match audio files from Commons with lexemes on Wikidata and add pronunciation statements.
        </Typography>
        
        {/* Use our custom WikiMessage component */}
        <Box sx={{ mt: 2 }}>
          <WikiMessage type="notice">
            This tool uses the Mediawiki API to find lexemes that match audio files.
          </WikiMessage>
        </Box>
      </Box>

      {/* Feature showcase section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Featured Examples
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <AudioPronunciationExample 
              audioFile={EXAMPLE_AUDIOS[0]}
              lexeme={{
                id: "L123456",
                lemma: "example",
                language: "English",
                forms: ["example", "examples"],
                existingAudioIds: []
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <AudioPronunciationExample 
              audioFile={EXAMPLE_AUDIOS[1]}
              lexeme={{
                id: "L654321",
                lemma: "bonjour",
                language: "French",
                forms: ["bonjour"],
                existingAudioIds: []
              }}
            />
          </Grid>
        </Grid>
      </Box>
      
      <CategorySelector onCategorySelect={handleCategorySelect} />
      
      {selectedCategory && (
        <PatternInput onPatternSubmit={handlePatternSubmit} />
      )}
      
      {(isMatching || matchError || matches.length > 0) && (
        <ResultsDisplay 
          matches={matches} 
          loading={isMatching} 
          error={matchError} 
          onSelectMatch={handleSelectMatch} 
        />
      )}
      
      {selectedMatch && !showAddForm && (
        <Box sx={{ mb: 4 }}>
          <WikiCard 
            title="Selected Match"
            footer={
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <AddPronunciationButton
                  audioFile={selectedMatch.audioFile}
                  lexeme={selectedMatch.lexeme}
                  variant="button"
                  onSuccess={handlePronunciationAdded}
                />
              </Box>
            }
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Audio File
              </Typography>
              <AudioPlayer 
                audioUrl={selectedMatch.audioFile.url} 
                title={selectedMatch.audioFile.name}
                showDownload={true}
              />
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Lexeme
              </Typography>
              <Typography variant="body1">
                {selectedMatch.lexeme.lemma} ({selectedMatch.lexeme.id})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Language: {selectedMatch.lexeme.language}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Forms: {selectedMatch.lexeme.forms.join(", ")}
              </Typography>
              {selectedMatch.lexeme.existingAudioIds && selectedMatch.lexeme.existingAudioIds.length > 0 && (
                <Typography variant="body2" color="text.secondary">
                  Has existing audio: Yes ({selectedMatch.lexeme.existingAudioIds.length})
                </Typography>
              )}
            </Box>
          </WikiCard>
        </Box>
      )}
      
      {selectedMatch && showAddForm && (
        <AddPronunciationForm
          audioFile={selectedMatch.audioFile}
          lexeme={selectedMatch.lexeme}
          onSubmitSuccess={handlePronunciationAdded}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </Container>
  );
};

export default HomePage;
