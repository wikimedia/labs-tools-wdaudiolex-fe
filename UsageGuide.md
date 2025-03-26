# Audio Lexeme Matching Tool - Usage Guide

This guide provides practical step-by-step instructions for using the Audio Lexeme Matching Tool to match audio files from Wikimedia Commons with lexemes and add pronunciation data.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Finding Audio Files](#finding-audio-files)
3. [Matching with Lexemes](#matching-with-lexemes)
4. [Adding Pronunciations](#adding-pronunciations)
5. [Troubleshooting](#troubleshooting)

## Getting Started

### Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-organization/WDAudioLex-FE.git
   cd WDAudioLex-FE
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

## Finding Audio Files

The Audio Lexeme Matching Tool allows you to find audio files from Wikimedia Commons by category.

### Step 1: Select a Category

1. From the homepage, locate the "Category Selection" section
2. Click on one of the category cards (e.g., "Pronunciation")
3. The selected category will be highlighted and the search interface will appear

![Category Selection](https://example.org/category-selection.png)

### Step 2: Browse Available Audio Files

Once you've selected a category, you can browse the available audio files:

1. The tool will load a preview of available audio files in that category
2. Each audio file will show its:
   - Title
   - Language (if available)
   - Duration
   - File format

### Example Audio Files

The tool includes examples from Wikimedia Commons:

- English pronunciations: "example", "read", "lexeme"
- French pronunciations: "bonjour", "merci"
- And many more from various languages

## Matching with Lexemes

After finding audio files, you can match them with lexemes on Wikidata.

### Step 1: Enter a Pattern

1. In the "Pattern Input" section, type a lexeme pattern (e.g., "lexeme")
2. Click the "Search" button or press Enter
3. The tool will search for matching lexemes

### Step 2: Review Matches

1. The "Results" section will display potential matching lexemes
2. Each match shows:
   - Lexeme lemma
   - Language
   - Lexical category
   - Existing pronunciations (if any)

### Step 3: Select a Match

1. Click on a lexeme to select it for adding pronunciation data
2. The selected lexeme will be highlighted
3. You can now add pronunciation data to this lexeme

## Adding Pronunciations

After selecting a lexeme, you can add pronunciation data using the associated audio file.

### Step 1: Click "Add Pronunciation"

1. On the selected lexeme, click the "Add Pronunciation" button
2. A dialog will open with a form for adding pronunciation information

### Step 2: Fill the Pronunciation Form

1. The form will show the selected audio file and lexeme
2. Select a pronunciation variety from the dropdown (e.g., "Received Pronunciation" for English)
3. Click "Submit" to add the pronunciation

### Step 3: Verify Success

1. After submission, a success message will appear
2. The lexeme will now display the added pronunciation
3. You can repeat this process for other lexemes or audio files

## Troubleshooting

### Audio Playback Issues

If you encounter issues playing audio files:

1. **Try Alternative Formats**: The player automatically attempts to play fallback formats if the primary format fails. You can manually click "Try Alternative Format" if the automatic fallback doesn't work.

2. **Use Native Player**: Click "Show Native Player" to use your browser's built-in audio player as a fallback.

3. **Check Format Support**: Different browsers support different audio formats:
   - Chrome and Edge: Good support for MP3, WAV, and OGG
   - Firefox: Best support for OGG
   - Safari: Best support for MP3 and WAV, limited OGG support

4. **Direct Download**: Click "Open Audio File" to open the audio file directly in your browser.

### Search Issues

If you're not finding the expected lexemes:

1. **Check Spelling**: Ensure the pattern is spelled correctly
2. **Try Different Patterns**: Try variations or partial patterns
3. **Change Category**: Try searching in a different category

### Submission Errors

If you encounter errors when adding pronunciations:

1. **Check Network Connection**: Ensure you're connected to the internet
2. **Try Again Later**: The Wikimedia API might be temporarily unavailable
3. **Different Browser**: Try using a different browser

## Example Workflow

Here's a complete example workflow:

1. Select the "Pronunciation" category
2. Enter "lexeme" in the pattern search
3. Select the "lexeme" match from the results
4. Click "Add Pronunciation"
5. Select "General American" as the variety
6. Submit the form
7. Verify the pronunciation has been added

This guide provides basic instructions for using the Audio Lexeme Matching Tool. For technical details about how the tool is implemented, refer to the [Explanation.md](./Explanation.md) document. 