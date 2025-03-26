/* eslint-env jest, node */

// Setup file for Jest tests
import '@testing-library/jest-dom';

// Mock data for API responses
global.mockCategories = [
  { id: "pronunciation_recordings", name: "Pronunciation recordings", count: 5432 },
  { id: "audio_pronunciation_en", name: "English pronunciation audio", count: 1275 },
  { id: "audio_pronunciation_fr", name: "French pronunciation audio", count: 987 },
];

// Mock API calls
jest.mock('./services/api', () => ({
  categoriesApi: {
    getCategories: jest.fn().mockResolvedValue({ data: global.mockCategories }),
  },
  lexemeApi: {
    matchLexemes: jest.fn(),
    addPronunciation: jest.fn(),
  },
  userApi: {
    login: jest.fn(),
    getContributions: jest.fn(),
  },
}));

// Mock for HTML5 audio
window.HTMLMediaElement.prototype.load = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();

// Clear all mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
}); 