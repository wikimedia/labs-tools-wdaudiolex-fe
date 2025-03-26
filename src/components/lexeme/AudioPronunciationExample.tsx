import React from 'react';
import { Box, Typography, Divider, Card, CardContent } from '@mui/material';
import AudioPlayer from '../audio/AudioPlayer';
import AddPronunciationButton from './AddPronunciationButton';

// Example data with multiple format options
const EXAMPLE_AUDIO = {
  id: "commons-123456",
  name: "English pronunciation of 'lexeme'",
  url: "https://upload.wikimedia.org/wikipedia/commons/e/e2/En-us-lexeme.ogg",
  // Additional format URLs to try if the primary one fails
  fallbackUrls: [
    "https://upload.wikimedia.org/wikipedia/commons/7/77/En-us-example.ogg",
    "https://cdn.pixabay.com/download/audio/2022/03/10/audio_1da2fc9e01.mp3"
  ],
  language: "en"
};

const EXAMPLE_LEXEME = {
  id: "L123456",
  lemma: "lexeme",
  language: "English",
  forms: ["lexeme", "lexemes"],
  existingAudioIds: []
};

interface AudioPronunciationExampleProps {
  audioFile?: {
    id: string;
    name: string;
    url: string;
    fallbackUrls?: string[];
    language?: string;
  };
  lexeme?: {
    id: string;
    lemma: string;
    language: string;
    forms: string[];
    existingAudioIds?: string[];
  };
}

const AudioPronunciationExample: React.FC<AudioPronunciationExampleProps> = ({
  audioFile = EXAMPLE_AUDIO,
  lexeme = EXAMPLE_LEXEME
}) => {
  const handlePronunciationSuccess = () => {
    console.log('Pronunciation added successfully!');
    // In a real app, you might want to refresh data or show a notification
  };

  return (
    <Card elevation={2} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {lexeme.lemma} <Typography component="span" variant="body2" color="text.secondary">({lexeme.language})</Typography>
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" gutterBottom>
          Pronunciation
        </Typography>
        
        <AudioPlayer 
          audioUrl={audioFile.url} 
          title={audioFile.name}
          showDownload={true}
          fallbackFormats={audioFile.fallbackUrls || []}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Source: Wikimedia Commons
          </Typography>
          
          <AddPronunciationButton
            audioFile={audioFile}
            lexeme={lexeme}
            variant="button"
            size="small"
            onSuccess={handlePronunciationSuccess}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AudioPronunciationExample; 