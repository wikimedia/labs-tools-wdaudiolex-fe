# Audio Lexeme Matching Tool - Implementation Guide

This document provides a step-by-step explanation of the codebase, implementation decisions, and guidance for further modifications.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [AudioPlayer Component Implementation](#audioplayer-component-implementation)
3. [Pronunciation System Implementation](#pronunciation-system-implementation)
4. [User Interface Design and Implementation](#user-interface-design-and-implementation)
5. [Error Handling Strategy](#error-handling-strategy)
6. [Modification Guidelines](#modification-guidelines)

## Architecture Overview

The application follows a component-based architecture using React with TypeScript. Here's the high-level architecture:

```tree
├── Components (Reusable UI elements)
├── Pages (Route-specific views)
├── Services (API interactions)
└── Application State (Local component state)
```

**Design Decision**: We chose not to implement global state management (like Redux) at this stage since component state is sufficient for the current requirements. This can be added later if needed.

## AudioPlayer Component Implementation

The AudioPlayer is a core component that handles audio file playback with multiple format support and fallback mechanisms.

### Step 1: Component Structure and State

```tsx
// Key state variables in AudioPlayer
const [isPlaying, setIsPlaying] = useState<boolean>(false);
const [duration, setDuration] = useState<number>(0);
const [position, setPosition] = useState<number>(0);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
const [currentSource, setCurrentSource] = useState<string>(audioUrl);
const [attemptedSources, setAttemptedSources] = useState<string[]>([]);
const [showNativePlayer, setShowNativePlayer] = useState<boolean>(false);
```

**Design Decision**: I chose to keep all playback state within the component rather than lifting it up, making the player self-contained and reusable anywhere.

### Step 2: Audio Format Detection and Initialization

```tsx
// Format detection implementation
const audioElement = document.createElement('audio');
const fileExtension = currentSource.split('.').pop()?.toLowerCase();
let formatSupported = false;

// Check format support with specific MIME types and codecs
if (fileExtension === 'mp3' && (
  audioElement.canPlayType('audio/mpeg') !== '' || 
  audioElement.canPlayType('audio/mp3') !== ''
)) {
  formatSupported = true;
} 
// Similar checks for other formats...
```

**Why This Works**: This approach detects browser-specific format support before attempting playback, allowing the component to make informed decisions about which formats to try.

### Step 3: Fallback URL Generation

```tsx
// Generate fallback URLs dynamically
const generateFallbackUrls = (): string[] => {
  const url = new URL(audioUrl);
  const path = url.pathname;
  const basePath = path.substring(0, path.lastIndexOf('.')) || path;
  const generatedUrls: string[] = [];
  
  // Generate URLs for different formats
  if (!fallbackFormats.some(format => format.includes('.mp3'))) {
    generatedUrls.push(`${url.origin}${basePath}.mp3`);
  }
  // Additional formats...
  
  return [...fallbackFormats, ...generatedUrls];
};
```

**Design Decision**: By dynamically generating fallback URLs based on the original URL pattern, we avoid requiring users to manually specify all possible format variations.

### Step 4: Audio Loading and Event Handling

```tsx
// Setup audio element with event listeners
const audio = new Audio();
audioRef.current = audio;
audio.volume = volume / 100;
audio.preload = "auto";
audio.crossOrigin = "anonymous";

// Key event listeners
audio.addEventListener("loadedmetadata", () => {
  setDuration(audio.duration);
  setLoading(false);
});

audio.addEventListener("error", (e) => {
  // Error handling and fallback logic
  if (canTryNextSource) {
    tryNextSource();
  } else {
    setError(errorMessage);
    setLoading(false);
  }
});
```

**Implementation Note**: The error event handler is crucial - it determines whether to try alternative formats or display an error.

### Step 5: Waveform Visualization

```tsx
const fetchAudioData = async () => {
  try {
    // Only attempt visualization if Web Audio API is supported
    if (!window.AudioContext && !(window as any).webkitAudioContext) {
      return;
    }

    const response = await fetch(currentSource);
    if (!response.ok) {
      return;
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    drawWaveform(audioBuffer);
  } catch (error) {
    console.error("Error fetching audio data:", error);
  }
};
```

**Why This Works**: The waveform visualization uses the Web Audio API to analyze the audio file's frequency data, but is implemented as a non-blocking enhancement - playback works even if visualization fails.

### Modification Points for AudioPlayer

1. **Adding new audio formats**: Extend the format detection checks in the useEffect hook
2. **Custom visualization styles**: Modify the drawWaveform and drawWaveformPosition functions
3. **Additional controls**: Add new state variables and UI elements for features like loop or EQ

## Pronunciation System Implementation

The pronunciation system consists of several interconnected components that work together to allow users to add pronunciation data.

### Step 1: AddPronunciationButton Implementation

```tsx
// Core button component with dialog
const AddPronunciationButton: React.FC<AddPronunciationButtonProps> = ({
  lexeme,
  audioFile,
  variant = 'button',
  size = 'medium',
  onSuccess
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  
  // Dialog open/close handlers
  const handleOpenDialog = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDialogOpen(true);
  };
  
  return (
    <>
      {variant === 'button' ? (
        <Button /* ...props */ onClick={handleOpenDialog}>
          Add Pronunciation
        </Button>
      ) : (
        <IconButton /* ...props */ onClick={handleOpenDialog}>
          <MicOutlined />
        </IconButton>
      )}

      <Dialog /* ...props */ open={isDialogOpen}>
        {/* Dialog content and form */}
      </Dialog>
    </>
  );
};
```

**Design Decision**: I created a flexible component that can be rendered as either a standard button or icon button, allowing for different UI contexts.

### Step 2: AddPronunciationForm Implementation

```tsx
// Form component for pronunciation data
const AddPronunciationForm: React.FC<AddPronunciationFormProps> = ({
  audioFile,
  lexeme,
  onSubmitSuccess,
  onCancel
}) => {
  const [variety, setVariety] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      // API call would go here in a real implementation
      // await lexemeApi.addPronunciation(lexeme.id, audioFile.id, variety);
      
      // Simulate API call with timeout
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(onSubmitSuccess, 1500);
      }, 1000);
    } catch (err) {
      setError("Failed to add pronunciation. Please try again.");
      setLoading(false);
    }
  };
  
  // Form JSX with fields and controls
};
```

**Implementation Note**: The form currently uses a simulated API call. For real implementation, uncomment the lexemeApi.addPronunciation call and remove the timeout simulation.

### Modification Points for Pronunciation System

1. **API integration**: Replace simulated API calls with actual Wikimedia API calls
2. **Additional fields**: Add form fields for more detailed pronunciation metadata
3. **Validation logic**: Enhance form validation for required fields and formats

## User Interface Design and Implementation

### Step 1: Component Hierarchy and Layout

The application follows a nested component structure:

```tree
HomePage
├── CategorySelector
├── PatternInput
├── ResultsDisplay
│   └── [Rendered search results]
└── Selected Match View
    ├── AudioPlayer
    └── AddPronunciationButton
        └── AddPronunciationForm
```

**Design Decision**: This hierarchy allows components to focus on specific tasks while enabling data flow between related components.

### Step 2: Data Flow Implementation

Data flows primarily through props, with each component maintaining its own local state:

```tsx
// Example from HomePage showing data flow
const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Reset dependent states
    setSelectedPattern(null);
    setMatches([]);
    setSelectedMatch(null);
  };
  
  const handlePatternSubmit = async (pattern: string) => {
    // Use pattern to fetch matches
    setMatches(mockMatches); // Would be API response in real implementation
  };
  
  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match);
  };
  
  return (
    <Container>
      <CategorySelector onCategorySelect={handleCategorySelect} />
      
      {selectedCategory && (
        <PatternInput onPatternSubmit={handlePatternSubmit} />
      )}
      
      {/* Additional components */}
    </Container>
  );
};
```

**Implementation Note**: Each step in the workflow conditionally renders the next component only when required data is available.

### Modification Points for UI

1. **Responsive design**: Enhance Grid layouts for better mobile support
2. **Theme customization**: Implement theme provider for light/dark mode
3. **Accessibility**: Add more ARIA attributes and keyboard navigation

## Error Handling Strategy

Error handling is implemented at multiple levels:

### Step 1: Component-Level Error States

```tsx
// Example error state pattern
const [error, setError] = useState<string | null>(null);

// Later in the component:
if (error) {
  return (
    <Paper>
      <Typography color="error">{error}</Typography>
      {/* Recovery options */}
    </Paper>
  );
}
```

### Step 2: Fallback UI for Failures

```tsx
// Example fallback UI from AudioPlayer
if (error) {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography color="error" variant="body2" sx={{ mb: 1 }}>{error}</Typography>
      
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Format information */}
        <Typography variant="caption" sx={{ mb: 1 }}>
          Current format: {currentSource.split('.').pop()?.toUpperCase() || 'Unknown'}
        </Typography>
        
        {/* Recovery options */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {/* Try another format button */}
          {/* Open direct link button */}
          {/* Show native player button */}
        </Box>
        
        {/* Native HTML5 audio fallback */}
        {showNativePlayer && (
          <Box sx={{ mt: 2, p: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
            <audio controls src={currentSource} />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
```

**Design Decision**: Errors are transformed into actionable recovery options rather than just error messages, improving the user experience.

### Step 3: API Error Handling (Planned)

```tsx
// Pattern for API error handling
try {
  const response = await apiCall();
  // Handle success
} catch (error) {
  if (axios.isAxiosError(error)) {
    // Handle specific HTTP errors
    switch (error.response?.status) {
      case 401:
        // Handle authentication error
        break;
      case 404:
        // Handle not found
        break;
      default:
        // Generic error
    }
  } else {
    // Handle unexpected errors
  }
}
```

**Implementation Note**: The API error handling is currently stubbed but follows this pattern for implementation.

### Modification Points for Error Handling

1. **Global error boundary**: Add React error boundaries for unexpected errors
2. **Error logging**: Implement error logging service
3. **Retry mechanisms**: Add automatic retry logic for transient failures

## Modification Guidelines

When extending this codebase, consider these guidelines:

### 1. Adding New Audio Formats

```tsx
// In AudioPlayer.tsx
// Step 1: Add format detection
if (fileExtension === 'flac' && (
  audioElement.canPlayType('audio/flac') !== '' ||
  audioElement.canPlayType('audio/x-flac') !== ''
)) {
  formatSupported = true;
  console.log('FLAC format is supported');
}

// Step 2: Add to fallback URL generation
if (!fallbackFormats.some(format => format.includes('.flac'))) {
  generatedUrls.push(`${url.origin}${basePath}.flac`);
}
```

### 2. Implementing Live API Connections

```tsx
// In api.ts
// Step 1: Configure API base and authentication
const apiClient = axios.create({
  baseURL: 'https://api.example.org',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Step 2: Implement specific API methods
export const lexemeApi = {
  matchLexemes: (categoryId: string, pattern: string) => 
    apiClient.post('/match-lexemes', { categoryId, pattern }),
  addPronunciation: (lexemeId: string, audioId: string, variety?: string) => 
    apiClient.post('/add-pronunciation', { lexemeId, audioId, variety }),
};

// Step 3: In components, replace mock data with API calls
const handlePatternSubmit = async (pattern: string) => {
  try {
    const response = await lexemeApi.matchLexemes(selectedCategory!, pattern);
    setMatches(response.data);
  } catch (error) {
    setMatchError("Failed to match lexemes. Please try again.");
  }
};
```

### 3. Enhancing Waveform Visualization

```tsx
// In AudioPlayer.tsx
// For a colored waveform, modify drawWaveform:
const drawWaveform = (audioBuffer: AudioBuffer) => {
  // ... existing setup code ...
  
  // Create gradient for waveform
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#8A2BE2');  // BlueViolet
  gradient.addColorStop(1, '#FF69B4');  // HotPink
  
  // Draw the waveform with gradient
  for (let i = 0; i < width; i++) {
    // ... calculate min/max logic ...
    
    const y1 = ((min + 1) / 2) * height;
    const y2 = ((max + 1) / 2) * height;
    
    ctx.fillStyle = gradient;
    ctx.fillRect(i, y1, 1, y2 - y1);
  }
};
```

This implementation guide provides detailed insights into the codebase structure, key implementation decisions, and guidance for future modifications. By understanding these patterns, you should be able to extend and customize the system to meet evolving requirements.
