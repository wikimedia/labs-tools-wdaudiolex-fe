import React from 'react';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import Codex design tokens CSS
import '@wikimedia/codex-design-tokens/theme-wikimedia-ui.css';

// Define Wikimedia theme colors and styles
const wikiTheme = createTheme({
  palette: {
    primary: {
      main: '#3366cc', // Wikimedia blue
      dark: '#2a4b8d',
      light: '#447ff5',
      contrastText: '#fff',
    },
    secondary: {
      main: '#36c', // Another shade of Wikimedia blue
      dark: '#3366cc',
      light: '#447ff5',
      contrastText: '#fff',
    },
    error: {
      main: '#d33', // Wikimedia red
      dark: '#b32424',
      light: '#e67c73',
    },
    warning: {
      main: '#fc3', // Wikimedia yellow
      dark: '#ac8600',
      light: '#fef6e7',
    },
    info: {
      main: '#3366cc', // Wikimedia blue
      dark: '#2a4b8d',
      light: '#eaecf0',
    },
    success: {
      main: '#14866d', // Wikimedia green
      dark: '#097a4e',
      light: '#d5fdf4',
    },
    text: {
      primary: '#202122',
      secondary: '#54595d',
      disabled: '#72777d',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    divider: '#c8ccd1',
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      fontFamily: '"Linux Libertine", "Libertinus Serif", "Georgia", "Times", serif',
    },
    h2: {
      fontFamily: '"Linux Libertine", "Libertinus Serif", "Georgia", "Times", serif',
    },
    h3: {
      fontFamily: '"Linux Libertine", "Libertinus Serif", "Georgia", "Times", serif',
    },
    h4: {
      fontFamily: '"Linux Libertine", "Libertinus Serif", "Georgia", "Times", serif',
    },
    h5: {
      fontFamily: '"Linux Libertine", "Libertinus Serif", "Georgia", "Times", serif',
    },
    h6: {
      fontFamily: '"Linux Libertine", "Libertinus Serif", "Georgia", "Times", serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '2px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#3366cc',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});

interface WikiThemeProviderProps {
  children: React.ReactNode;
}

/**
 * WikiThemeProvider provides Wikimedia styling to the entire application.
 * It wraps Material UI's ThemeProvider with a custom theme based on Wikimedia design.
 */
const WikiThemeProvider: React.FC<WikiThemeProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={wikiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default WikiThemeProvider; 