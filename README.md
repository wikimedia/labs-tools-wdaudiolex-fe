# Development Guidelines

- Write clean and consistent code following the linting rules.
- Follow React best practices for component-based development.
- Commit frequently with meaningful messages.

# WDAudioLex Frontend

A tool for matching audio files from Wikimedia Commons with lexemes on Wikidata and adding pronunciation statements.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Landing Flow](#landing-flow)
4. [Project Structure](#project-structure)
5. [Dependencies](#dependencies)
6. [Setup and Installation](#setup-and-installation)
7. [Environment Configuration](#environment-configuration)
8. [Authentication and OAuth](#authentication-and-oauth)
9. [Development](#development)
10. [Contributing](#contributing)

---

## Project Overview

WDAudioLex is a web application that helps Wikimedia contributors match audio pronunciation files from Wikimedia Commons with lexemes on Wikidata, facilitating the addition of pronunciation statements (P443). The tool provides an interface for browsing recordings by language, searching for corresponding lexemes, and contributing verified pronunciation data to Wikidata.

- **Frontend Repository**: [labs/tools/wdaudiolex-fe](https://gerrit.wikimedia.org/r/labs/tools/wdaudiolex-fe)
- **Backend API Repository**: [labs/tools/wdaudiolex-be](https://gerrit.wikimedia.org/r/labs/tools/wdaudiolex-be)
- **Live Site**: https://wdaudiolex.toolforge.org
- **Live API**: https://wdaudiolex-api.toolforge.org

## Features

- **Language Selection**: Select from supported languages to fetch relevant recordings
- **Commons Audio Browsing**: Browse pronunciation audio recordings from Wikimedia Commons
- **Audio Playback**: Advanced audio player with format fallbacks, waveform visualization, and speed controls
- **Lexeme Search & Matching**: Search Wikidata lexemes and view candidate forms for matching
- **Pronunciation Statements**: Authenticated submission of pronunciation audio statements (P443) to Wikidata
- **Wikimedia OAuth**: Seamless sign-in with a Wikimedia account

## Landing Flow

The primary workflow on the home page (`/`) consists of the following steps:

1. **Select Language**: On page load, the frontend fetches supported languages from the backend (`GET /languages`). The user selects a language from the dropdown menu.
2. **Browse Audio Files**: Once a language is selected, the application queries Wikimedia Commons for pronunciation audio files (`GET /commons/files?lang=<lang>&limit=20`) and lists them on the left panel.
3. **Audio Playback**: When an audio recording is selected, it opens in the right panel (`FileMatchPanel`), where the user can listen to the recording using the integrated audio player.
4. **Search and Match Lexemes**: The user searches for matching Wikidata lexeme forms (or reviews candidate matches) corresponding to the spoken word.
5. **Confirm and Save**: After verifying the form, the user confirms the match. This submits a pronunciation statement (P443) to Wikidata via the backend API (`POST /lexeme/audio/add`) under the contributor's Wikimedia account.

## Project Structure

```tree
src/
├── assets/             # Static assets (images, icons)
├── auth/               # OAuth login and session handling
│   ├── login.ts
│   └── session.ts
├── components/         # Reusable UI components
│   ├── audio/          # Audio-related components
│   │   └── AudioPlayer.tsx
│   ├── common/         # Shared components
│   ├── lexeme/         # Lexeme-related components
│   │   ├── FileMatchPanel.tsx
│   │   ├── LanguageSelect.tsx
│   │   └── PronunciationFileList.tsx
│   ├── Pagination/     # Pagination components
│   └── wikimedia/      # Wikimedia-styled components
├── pages/              # Page components
│   ├── ContributionsPage.tsx
│   ├── HelpPage.tsx
│   ├── HomePage.tsx
│   ├── Layout.tsx
│   └── OAuthCallbackPage.tsx
├── services/           # API client and service functions
│   ├── api.ts
│   └── types.ts
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
- **Jest / Vitest**: Testing frameworks

## Setup and Installation

1. **Clone the repository**:

   ```bash
   git clone https://gerrit.wikimedia.org/r/labs/tools/wdaudiolex-fe
   cd wdaudiolex-fe
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create or update `.env.local` to configure the backend API URL (see [Environment Configuration](#environment-configuration)):

   ```bash
   cp .env.local.example .env.local  # or edit .env.local directly
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Build for production**:

   ```bash
   npm run build
   ```

## Environment Configuration

The frontend uses Vite environment variables prefixed with `VITE_`.

### `VITE_API_BASE_URL`

- **Purpose**: Defines the base URL for the WDAudioLex backend API.
- **Default**: If unset, defaults to `http://localhost:5000/api` in `src/services/api.ts`.
- **Usage**:
  - For local backend development:
    ```bash
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
  - For development against the Toolforge staging/production API:
    ```bash
    VITE_API_BASE_URL=https://wdaudiolex-api.toolforge.org/api
    ```

Set this variable in `.env.local` at the root of the project.

## Authentication and OAuth

WDAudioLex integrates with Wikimedia OAuth 1.0a for user authentication:

### OAuth Flow and Callback Path

- **Callback Path**: `/oauth-callback`
- **Flow Details**:
  1. The user clicks the login button in the navigation bar to start the sign-in flow.
  2. The application requests a temporary request token from the backend via `POST /login` (`startLogin()`), saves it to browser session storage, and redirects the browser to the Wikimedia authorization URL.
  3. Upon authorizing, Wikimedia redirects the user back to the application at the OAuth callback path:
     ```
     https://<host>/oauth-callback?oauth_token=<token>&oauth_verifier=<verifier>
     ```
  4. The `OAuthCallbackPage` component (`src/pages/OAuthCallbackPage.tsx`) reads the `oauth_token` and `oauth_verifier` query parameters from the URL, retrieves the stored request token, and sends them to the backend via `POST /oauth-callback` (`exchangeOAuth()`).
  5. The backend verifies the credentials with Wikimedia, establishes the user session, and returns the session details.
  6. The frontend saves the session in storage, cleans up the temporary request token, and redirects the user to the landing page (`/`).

## Development

### Project Navigation

- **HomePage** (`/`): The main landing flow for browsing audio files, searching lexemes, and matching pronunciations.
- **ContributionsPage** (`/contributions`): Displays user contributions and history.
- **HelpPage** (`/help`): Documentation and guidance for contributors.
- **OAuthCallbackPage** (`/oauth-callback`): Handles the Wikimedia OAuth redirect and session exchange.

### Working with Audio

The project includes an audio player with format fallbacks and playback speed options. When handling audio recordings:

1. Use the Commons file URL as the primary source.
2. Provide fallback formats (`.ogg`, `.mp3`, `.wav`) when available.
3. Test across major browsers to ensure smooth playback.

## Contributing

Contributions are welcome! Please refer to the Wikimedia contribution guidelines when making changes to this project:

1. Follow Wikimedia coding standards and run linter checks before committing:
   ```bash
   npm run lint
   ```
2. Write meaningful commit messages referencing Phabricator tasks (e.g., `Bug: T445431`).
3. Update documentation whenever modifying features, configurations, or routes.
4. Push patches to Gerrit for code review:
   ```bash
   git review
   # or
   git push origin HEAD:refs/for/main
   ```

---

This project is part of the Wikimedia ecosystem and follows Wikimedia coding standards.
