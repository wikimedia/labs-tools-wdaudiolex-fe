import { createTheme } from '@mui/material/styles';

// Wikimedia color palette
const colors = {
  blue: {
    base: '#3366cc', // Progressive blue - primary Wikimedia blue
    darker: '#2a4b8d', // Hover/active state
    lighter: '#eaf3ff', // Background for blue content
  },
  red: {
    base: '#cc3333', // Destructive red
    darker: '#b32424', // Hover/active state
    lighter: '#fee7e6', // Background for red content
  },
  green: {
    base: '#00af89', // Success green
    darker: '#008c6d', // Hover/active state
    lighter: '#d5fdf4', // Background for green content
  },
  yellow: {
    base: '#fc3', // Warning yellow
    darker: '#ac6600', // For text contrast on yellow
    lighter: '#fef6e7', // Background for yellow content
  },
  gray: {
    base: '#f8f9fa', // Background color 
    border: '#eaecf0', // Border color
    text: {
      primary: '#202122', // Base text
      secondary: '#54595d', // Secondary text
      disabled: '#72777d', // Disabled text
    },
    component: {
      light: '#f8f9fa', // Component background
      base: '#eaecf0', // Component border
      dark: '#c8ccd1', // Component hover
    },
  },
};

// Font stack following Wikimedia guidelines
const fontFamily = [
  "'Helvetica Neue'",
  'Helvetica',
  'Arial',
  'sans-serif'
].join(',');

const headingFontFamily = [
  "'Libertinus Serif'",
  "'Linux Libertine'",
  "'Georgia'",
  "'Times'",
  'serif'
].join(',');

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue.base,
      dark: colors.blue.darker,
      light: colors.blue.lighter,
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.gray.component.base,
      dark: colors.gray.component.dark,
      light: colors.gray.component.light,
      contrastText: colors.gray.text.primary,
    },
    error: {
      main: colors.red.base,
      dark: colors.red.darker,
      light: colors.red.lighter,
    },
    warning: {
      main: colors.yellow.base,
      dark: colors.yellow.darker,
      light: colors.yellow.lighter,
      contrastText: colors.yellow.darker,
    },
    success: {
      main: colors.green.base,
      dark: colors.green.darker, 
      light: colors.green.lighter,
    },
    text: {
      primary: colors.gray.text.primary,
      secondary: colors.gray.text.secondary,
      disabled: colors.gray.text.disabled,
    },
    background: {
      default: '#ffffff',
      paper: colors.gray.base,
    },
    divider: colors.gray.border,
  },
  typography: {
    fontFamily,
    h1: {
      fontFamily: headingFontFamily,
    },
    h2: {
      fontFamily: headingFontFamily,
    },
    h3: {
      fontFamily: headingFontFamily,
    },
    h4: {
      fontFamily: headingFontFamily,
    },
    h5: {
      fontFamily: headingFontFamily,
    },
    h6: {
      fontFamily: headingFontFamily,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: colors.gray.border,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.gray.component.base,
            },
            '&:hover fieldset': {
              borderColor: colors.gray.component.dark,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.blue.base,
            },
          },
        },
      },
    },
  },
});

export default theme; 