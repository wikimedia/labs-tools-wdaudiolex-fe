import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Link
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HelpPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Help & Documentation
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Learn how to use the Audio Lexeme Matching Tool to add pronunciation audio to lexemes.
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Getting Started
        </Typography>
        <Typography variant="body1" paragraph>
          The Audio Lexeme Matching Tool helps you match audio files from Wikimedia Commons with lexemes on Wikidata.
          You can use it to add pronunciation audio statements (P443) to lexemes, improving the linguistic data available on Wikidata.
        </Typography>
        <Typography variant="body1" paragraph>
          Follow these steps to contribute:
        </Typography>
        <ol>
          <li>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Select a category</strong> of audio files from Commons.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Enter a pattern</strong> to match lexemes with audio files.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Review the matches</strong> and select the correct ones.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Add the pronunciation statement</strong> to link the audio with the lexeme.
            </Typography>
          </li>
        </ol>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Frequently Asked Questions
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">What is a lexeme?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            A lexeme in Wikidata represents a unit of lexical meaning, including all its forms. 
            For example, the English lexeme "run" includes forms like "runs", "ran", and "running".
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">How does pattern matching work?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Pattern matching uses simple wildcards to find lexemes that match audio file names:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                *.mp3 — Matches all MP3 files
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                en-*.ogg — Matches English .ogg files
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                [language]-[word].wav — Replace with actual values
              </Typography>
            </li>
          </ul>
          <Typography variant="body1">
            The matching algorithm ignores case sensitivity and punctuation when comparing.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">What is a pronunciation variety?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            A pronunciation variety (P5237) specifies which variant of pronunciation the audio represents, 
            such as "Received Pronunciation" for British English or "General American" for US English.
            This is optional but recommended when adding pronunciation audio.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Do I need to login?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Yes, you need to login with your Wikimedia account to add pronunciation statements 
            to Wikidata. Your contributions will be tracked and credited to your account.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 4 }}>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" gutterBottom>
          Resources
        </Typography>
        <ul>
          <li>
            <Link 
              href="https://www.wikidata.org/wiki/Wikidata:Lexicographical_data" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography variant="body2">Wikidata Lexicographical Data</Typography>
            </Link>
          </li>
          <li>
            <Link 
              href="https://commons.wikimedia.org/wiki/Commons:Pronunciation" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography variant="body2">Wikimedia Commons Pronunciation Guide</Typography>
            </Link>
          </li>
          <li>
            <Link 
              href="https://www.wikidata.org/wiki/Property:P443" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography variant="body2">Pronunciation Audio Property (P443)</Typography>
            </Link>
          </li>
        </ul>
      </Box>
    </Container>
  );
};

export default HelpPage; 