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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
              <strong>Choose a language</strong> from the language selector to load available pronunciation files from Commons.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Choose a file</strong> from the pronunciation list to listen to the audio recording.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Search</strong> Wikidata for lexeme forms matching the spoken word.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Match</strong> the recording by selecting the correct candidate form and confirming to publish the pronunciation statement (P443) on Wikidata.
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
          <Typography variant="subtitle1">How does matching work?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            After choosing a language and selecting a recording, the tool searches Wikidata for lexeme forms that match the spoken word. You can also search for different words manually. Once you find the matching form candidate, click &quot;Match audio&quot; and confirm to publish the statement to Wikidata.
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