import React, { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  IconButton, 
  Typography,
  Box
} from '@mui/material';
import { Close as CloseIcon, MicOutlined } from '@mui/icons-material';
import AddPronunciationForm from './AddPronunciationForm';

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

interface AddPronunciationButtonProps {
  lexeme: Lexeme;
  audioFile: AudioFile;
  variant?: 'button' | 'icon';
  size?: 'small' | 'medium' | 'large';
  onSuccess?: () => void;
}

const AddPronunciationButton: React.FC<AddPronunciationButtonProps> = ({
  lexeme,
  audioFile,
  variant = 'button',
  size = 'medium',
  onSuccess
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitSuccess = () => {
    // Close the dialog after a successful submission
    setIsDialogOpen(false);
    
    // Call the onSuccess callback if provided
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <>
      {variant === 'button' ? (
        <Button
          variant="contained"
          color="primary"
          size={size}
          onClick={handleOpenDialog}
          startIcon={<MicOutlined />}
        >
          Add Pronunciation
        </Button>
      ) : (
        <IconButton
          color="primary"
          size={size}
          onClick={handleOpenDialog}
          aria-label="Add pronunciation"
          title="Add pronunciation"
        >
          <MicOutlined />
        </IconButton>
      )}

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="inherit" component="span">Add Pronunciation</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Box>
            {isDialogOpen && (
              <AddPronunciationForm
                audioFile={audioFile}
                lexeme={lexeme}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={handleCloseDialog}
              />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPronunciationButton; 