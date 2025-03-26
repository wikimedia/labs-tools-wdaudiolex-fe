
# Development Guidelines

- Write clean and consistent code following the linting rules.
- Follow React best practices for component-based development.
- Commit frequently with meaningful messages.

# WDAudioLex Frontend

A tool for matching audio files from Wikimedia Commons with lexemes on Wikidata and adding pronunciation statements.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Dependencies](#dependencies)
5. [Setup and Installation](#setup-and-installation)
6. [Development](#development)
7. [Contributing](#contributing)

---

## Project Overview

The Audio Lexeme Matching Tool is a frontend application that helps Wikimedia contributors match audio files from Commons with lexemes on Wikidata, facilitating the addition of pronunciation statements. The tool provides a user-friendly interface for searching, matching, and contributing pronunciation data.

## Features

- **Category Selection**: Search for audio files within specific Commons categories
- **Pattern Matching**: Enter patterns to find matching lexemes
- **Audio Playback**: Advanced audio player with format fallbacks and waveform visualization
- **Pronunciation Addition**: Interface for adding pronunciation data to lexemes
- **Multi-format Support**: Support for .ogg, .mp3, and .wav audio formats
- **Error Recovery**: Comprehensive error handling with fallback options

## Project Structure

```tree
src/
├── assets/             # Static assets (images, icons)
├── components/         # Reusable UI components
│   ├── audio/          # Audio-related components
│   │   └── AudioPlayer.tsx
│   ├── common/         # Shared components
│   ├── lexeme/         # Lexeme-related components
│   │   ├── AddPronunciationButton.tsx
│   │   ├── AddPronunciationForm.tsx
│   │   ├── AudioPronunciationExample.tsx
│   │   ├── CategorySelector.tsx
│   │   ├── PatternInput.tsx
│   │   └── ResultsDisplay.tsx
│   ├── Pagination/     # Pagination components
│   └── wikimedia/      # Wikimedia-styled components
├── pages/              # Page components
│   ├── ContributionsPage.tsx
│   ├── HelpPage.tsx
│   ├── HomePage.tsx
│   └── Layout.tsx
├── services/           # API and service functions
│   └── api.ts
├── styles/             # Global styles
├── App.tsx             # Main application component
├── main.jsx            # Application entry point
└── routes.tsx          # Application routes
```

## Dependencies

The project uses the following key technologies and libraries:

### Core Dependencies

- **React**: Frontend UI library (v18.3.x)
- **TypeScript**: Type-safe JavaScript
- **React Router**: For navigation and routing
- **Material UI**: Component library for consistent design
- **@wikimedia/codex**: Wikimedia design system components

### Development Dependencies

- **Vite**: Build tool and development server
- **ESLint**: Code linting with Wikimedia standards
- **Jest**: Testing framework

## Setup and Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-organization/WDAudioLex-FE.git
   cd WDAudioLex-FE
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:

   ```bash
   npm run build
   ```

## Development

### Project Navigation

- **HomePage**: The main interface for matching audio with lexemes
- **ContributionsPage**: View user contributions (work in progress)
- **HelpPage**: Documentation and assistance

### Working with Audio

The project includes a comprehensive audio player with support for multiple formats. When adding new audio files:

1. Provide the main URL to the audio file
2. Include fallback URLs for different formats if available
3. Test with different browsers to ensure compatibility

Example usage:

```jsx
<AudioPlayer 
  audioUrl="https://example.org/audio.ogg" 
  title="Audio Title"
  showDownload={true}
  fallbackFormats={[
    "https://example.org/audio.mp3",
    "https://example.org/audio.wav"
  ]}
/>
```

### Adding New Components

When adding new components:

1. Place them in the appropriate directory under `src/components/`
2. Follow the established naming conventions
3. Use TypeScript interfaces for props
4. Include error handling and loading states

## Contributing

Contributions are welcome! Please refer to the Wikimedia contribution guidelines when making changes to this project:

1. Follow the coding standards using ESLint with Wikimedia configurations
2. Write meaningful commit messages
3. Update documentation as necessary
4. Test your changes thoroughly
5. Submit pull requests for review

For more details on the implementation, see [Explanation.md](./Explanation.md).

---

This project is part of the Wikimedia ecosystem and follows Wikimedia coding standards.
