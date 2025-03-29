import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Paper,
  CircularProgress,
  LinearProgress,
  Button
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  DownloadOutlined,
  Speed
} from "@mui/icons-material";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  showDownload?: boolean;
  fallbackFormats?: string[]; // Add this type annotation here
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  title,
  showDownload = false,
  fallbackFormats = []
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [currentSource, setCurrentSource] = useState<string>(audioUrl);
  const [attemptedSources, setAttemptedSources] = useState<string[]>([]);
  const [showNativePlayer, setShowNativePlayer] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate fallback URLs based on the original URL
  const generateFallbackUrls = useCallback((): string[] => {
    const url = new URL(audioUrl);
    const path = url.pathname;
    const basePath = path.substring(0, path.lastIndexOf('.')) || path;
    const generatedUrls: string[] = [];
  
    // Only generate if not already in fallbackFormats
    if (!fallbackFormats?.some((format: string) => format.includes('.mp3'))) {
      generatedUrls.push(`${url.origin}${basePath}.mp3`);
    }
    if (!fallbackFormats?.some((format: string) => format.includes('.ogg'))) {
      generatedUrls.push(`${url.origin}${basePath}.ogg`);
    }
    if (!fallbackFormats?.some((format: string) => format.includes('.wav'))) {
      generatedUrls.push(`${url.origin}${basePath}.wav`);
    }
  
    // Add any explicitly provided fallback formats
    return [...(fallbackFormats || []), ...generatedUrls];
  }, [audioUrl, fallbackFormats]);

  // Try the next fallback source
  const tryNextSource = useCallback(() => {
    const allSources = [audioUrl, ...generateFallbackUrls()];
    const nextSource = allSources.find(source => !attemptedSources.includes(source));

    if (nextSource) {
      console.log(`Trying fallback audio source: ${nextSource}`);
      setAttemptedSources(prev => [...prev, nextSource]);
      setCurrentSource(nextSource);
      setError(null);
      setLoading(true);
    } else {
      setError("Failed to load audio after trying all available formats.");
    }
  }, [audioUrl, attemptedSources, generateFallbackUrls]);

  // Volume control effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Main audio initialization effect
  useEffect(() => {
    // Reset state when URL changes
    setLoading(true);
    setError(null);
    setPosition(0);
    setDuration(0);
    setLoadProgress(0);
    setIsPlaying(false);

    // If this is the first load, initialize the attempted sources
    if (attemptedSources.length === 0) {
      setAttemptedSources([currentSource]);
    }

    // Create audio element
    const audio = new Audio();
    audioRef.current = audio;
    audio.preload = "auto";
    audio.crossOrigin = "anonymous";

    // Event handlers
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setLoading(false);
    };

    const handleTimeUpdate = () => {
      setPosition(audio.currentTime);
      if (canvasRef.current) {
        drawWaveformPosition(audio.currentTime / audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setPosition(0);
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e, audio.error);
      let errorMessage = "Failed to load audio file.";
      
      if (audio.error) {
        switch (audio.error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = "Audio playback was aborted.";
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = "Network error while loading audio.";
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = "Audio format not supported by your browser.";
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = "Audio source not supported.";
            break;
        }
      }

      const canTryNextSource = generateFallbackUrls().some(url => !attemptedSources.includes(url));
      if (canTryNextSource) {
        tryNextSource();
      } else {
        setError(errorMessage);
        setLoading(false);
      }
    };

    const handleProgress = () => {
      if (audio.duration > 0) {
        for (let i = 0; i < audio.buffered.length; i++) {
          if (audio.buffered.start(i) <= audio.currentTime && audio.currentTime <= audio.buffered.end(i)) {
            const loadPercentage = (audio.buffered.end(i) / audio.duration) * 100;
            setLoadProgress(loadPercentage);
            break;
          }
        }
      }
    };

    // Add event listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("progress", handleProgress);

    // Set source
    try {
      audio.src = currentSource;
      audio.load();
      fetchAudioData().catch(console.warn);
    } catch (err) {
      console.error("Error setting up audio:", err);
      setError("Failed to initialize audio player.");
      setLoading(false);
    }

    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("progress", handleProgress);
      audio.src = "";
    };
  }, [currentSource, generateFallbackUrls, tryNextSource, attemptedSources]);

  const fetchAudioData = useCallback(async () => {
    try {
      if (!window.AudioContext && !(window as any).webkitAudioContext) {
        console.log("Web Audio API not supported in this browser. Skipping waveform visualization.");
        return;
      }

      const response = await fetch(currentSource);
      if (!response.ok) {
        console.warn(`Failed to fetch audio data for waveform: ${response.status} ${response.statusText}`);
        return;
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      try {
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        if (canvasRef.current) {
          drawWaveform(audioBuffer);
        }
      } catch (decodeError) {
        console.warn("Unable to decode audio data for waveform visualization.", decodeError);
      }
    } catch (error) {
      console.error("Error fetching audio data:", error);
    }
  }, [currentSource]);

  const drawWaveform = useCallback((audioBuffer: AudioBuffer) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const channelData = audioBuffer.getChannelData(0);
    const step = Math.ceil(channelData.length / width);

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;

      for (let j = 0; j < step; j++) {
        const datum = channelData[(i * step) + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }

      const y1 = ((min + 1) / 2) * height;
      const y2 = ((max + 1) / 2) * height;

      ctx.fillStyle = "#90CAF9";
      ctx.fillRect(i, y1, 1, y2 - y1);
    }
  }, []);

  const drawWaveformPosition = useCallback((percent: number) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const playPosition = width * percent;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = "#1976D2";
    ctx.fillRect(0, 0, playPosition, canvas.height);
  }, []);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handlePositionChange = useCallback((_: Event, newValue: number | number[]) => {
    const newPosition = newValue as number;
    setPosition(newPosition);
    if (audioRef.current) {
      audioRef.current.currentTime = newPosition;
    }
  }, []);

  const handleVolumeChange = useCallback((_: Event, newValue: number | number[]) => {
    const newVolume = newValue as number;
    setVolume(newVolume);
  }, []);

  const handlePlaybackRateChange = useCallback(() => {
    if (audioRef.current) {
      const rates = [1, 1.25, 1.5, 0.75];
      const currentIndex = rates.indexOf(playbackRate);
      const nextIndex = (currentIndex + 1) % rates.length;
      const newRate = rates[nextIndex];

      audioRef.current.playbackRate = newRate;
      setPlaybackRate(newRate);
    }
  }, [playbackRate]);

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = currentSource;
    link.download = title || "audio-file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentSource, title]);

  const formatTime = useCallback((time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center", justifyContent: "center", height: 80 }}>
          <CircularProgress size={30} />
          <Typography variant="caption">Loading audio...</Typography>
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography color="error" variant="body2" sx={{ mb: 1 }}>{error}</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="caption" sx={{ mb: 1 }}>
            Current format: {currentSource.split('.').pop()?.toUpperCase() || 'Unknown'}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {generateFallbackUrls().some(url => !attemptedSources.includes(url)) && (
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={tryNextSource}
              >
                Try Alternative Format
              </Button>
            )}

            <Button
              variant="outlined"
              size="small"
              href={currentSource}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Audio File
            </Button>

            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => setShowNativePlayer(prev => !prev)}
            >
              {showNativePlayer ? "Hide" : "Show"} Native Player
            </Button>
          </Box>

          {showNativePlayer && (
            <Box sx={{ mt: 2, p: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
              <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
                Native browser audio player:
              </Typography>
              <audio
                controls
                src={currentSource}
                style={{ width: "100%" }}
                onError={() => console.log("Native player also failed to load the audio")}
              />
            </Box>
          )}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <canvas
          ref={canvasRef}
          width={500}
          height={60}
          style={{ width: '100%', height: '60px', background: '#f5f5f5', borderRadius: '4px' }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <IconButton onClick={togglePlay} size="small">
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>

        <Box sx={{ mx: 2, flexGrow: 1 }}>
          <Slider
            value={position}
            min={0}
            max={duration}
            onChange={handlePositionChange}
            aria-label="audio position"
            size="small"
          />
          <Box sx={{ position: 'relative', height: '4px', mb: 1, borderRadius: '2px', backgroundColor: '#e0e0e0' }}>
            <LinearProgress
              variant="determinate"
              value={loadProgress}
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent'
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: -1 }}>
            <Typography variant="caption">{formatTime(position)}</Typography>
            <Typography variant="caption">{formatTime(duration)}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={toggleMute} size="small">
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>

          <Slider
            sx={{ width: 100, ml: 1 }}
            value={volume}
            min={0}
            max={100}
            onChange={handleVolumeChange}
            aria-label="volume"
            size="small"
          />
        </Box>

        <Box>
          <IconButton onClick={handlePlaybackRateChange} size="small" title={`Playback speed: ${playbackRate}x`}>
            <Speed />
            <Typography variant="caption" sx={{ ml: 0.5 }}>{playbackRate}x</Typography>
          </IconButton>

          {showDownload && (
            <IconButton onClick={handleDownload} size="small" title="Download audio">
              <DownloadOutlined />
            </IconButton>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default AudioPlayer;