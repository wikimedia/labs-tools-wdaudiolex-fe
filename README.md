# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# React Vite Front-End Project

This project is a React front-end application built with Vite for fast development and optimized builds. It includes linting configurations for ESLint and Stylelint following Wikimedia coding standards.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Setup Instructions](#setup-instructions)
   - [Frontend Setup](#frontend-setup)
   - [ESLint Configuration](#eslint-configuration)
   - [Stylelint Configuration](#stylelint-configuration)
5. [Development Guidelines](#development-guidelines)
6. [Contributing](#contributing)
7. [License](#license)

---

## Project Overview

This is a React-based front-end project designed for building scalable and maintainable user interfaces. The project leverages the following:

- **Vite**: For a fast and modern build process.
- **ESLint**: To ensure consistent JavaScript code quality.
- **Stylelint**: To maintain CSS coding standards.

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: Version 14 or above
Node.js: Download and install from [Node.js official site](https://nodejs.org/en). 
Verify installation by running:
```bash
  node -v
```
- **npm**: Version 6 or above (comes with Node.js) Check the version with:
```bash
  npm -v
```

---

## Installation

To install the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

---

## Setup Instructions

### Frontend Setup

1. Start the development server:

```bash
npm run dev
```

2. Build the project for production:

```bash
npm run build
```

3. Preview the production build:

```bash
npm run preview
```

### ESLint Configuration

This project uses the Wikimedia ESLint configurations to enforce coding standards.

#### Installation

- Install the Wikimedia ESLint configuration package:

```bash
npm install --save-dev eslint-config-wikimedia
```

#### Configuration

Add a .eslintrc.json file to the root directory of your project. Below are examples of different configurations:

- For ES6 code:

```json
{
  "extends": "wikimedia/client/es6"
}
```

- For ES5 code:

```json
{
  "extends": "wikimedia/client/es5"
}
```

Additional Configurations:

- jQuery Support:

```json
{
  "extends": [
    "wikimedia/client/es6",
    "wikimedia/jquery"
  ]
}
```

- MediaWiki Support:

```json
{
  "extends": [
    "wikimedia/client/es6",
    "wikimedia/mediawiki"
  ]
}
```

- QUnit Test Suite:

```json
{
  "extends": [
    "wikimedia/mediawiki/qunit"
  ]
}
```

- Mocha Test Suite:

```json
{
  "root": true,
  "extends": [
    "wikimedia/server",
    "wikimedia/mocha"
  ]
}
```

- Selenium WDIO Test Suite:

```json
{
  "root": true,
  "extends": [
    "wikimedia/selenium"
  ]
}
```

- Typical Node Project:

```json
{
  "extends": "wikimedia/server"
}
```

### Stylelint Configuration

The project uses Wikimedia's Stylelint configurations for CSS.

#### Installation

- Install the Stylelint configuration package:

```bash
npm install -D stylelint-config-wikimedia
```

#### Configuration

Add a .stylelintrc.json file to the root directory of your project. Below are examples of different configurations:

- Basic Setup:

```json
{
  "extends": "stylelint-config-wikimedia"
}
```

- Modern Browser Support:

```json
{
  "extends": "stylelint-config-wikimedia/support-modern"
}
```

- MediaWiki Environment:

```json
{
  "extends": [
    "stylelint-config-wikimedia",
    "stylelint-config-wikimedia/mediawiki"
  ]
}
```

- Combine with Browser Support:

```json
{
  "extends": [
    "stylelint-config-wikimedia/support-modern",
    "stylelint-config-wikimedia/mediawiki"
  ]
}
```

- Override Rules:

```json
{
  "extends": "stylelint-config-wikimedia/support-basic",
  "rules": {
    "@stylistic/max-empty-lines": null
  }
}
```

Running Linting Tools

- To run ESLint:

```bash
npm run lint
```

- To run Stylelint:

```bash
npm run stylelint
```

---

## Development Guidelines

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

```
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
