import React from "react";
import { Box, Typography, Link, Container, Divider } from "@mui/material";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        bgcolor: "#f8f9fa", 
        borderTop: '1px solid #eaecf0',
        mt: 'auto' 
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TextSnippetIcon sx={{ fontSize: 18, color: '#72777d', mr: 1 }} />
          <Typography 
            variant="body2" 
            sx={{ color: '#54595d' }}
          >
            © {new Date().getFullYear()} Audio Lexeme Matching Tool
          </Typography>
        </Box>
        
        <Typography variant="caption" sx={{ color: '#72777d', display: 'block', mb: 2 }}>
          A Wikimedia Foundation tool for adding pronunciation audio to lexemes
        </Typography>
        
        <Divider sx={{ my: 1, borderColor: '#eaecf0' }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          <Link 
            href="https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use" 
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              color: '#3366cc', 
              textDecoration: 'none',
              fontSize: '0.75rem', 
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Terms of Use
          </Link>
          
          <Link 
            href="https://foundation.wikimedia.org/wiki/Policy:Privacy_policy" 
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              color: '#3366cc', 
              textDecoration: 'none', 
              fontSize: '0.75rem',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Privacy Policy
          </Link>
          
          <Link 
            href="https://www.mediawiki.org/" 
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              color: '#3366cc', 
              textDecoration: 'none', 
              fontSize: '0.75rem',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            MediaWiki
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 