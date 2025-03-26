import axios from 'axios';

// Create axios instance with baseURL from environment variable or default
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API endpoints for the Audio Lexeme Matching Tool
export const categoriesApi = {
  getCategories: (query?: string) => 
    apiClient.get('/categories', { params: { query } }),
};

export const lexemeApi = {
  matchLexemes: (categoryId: string, pattern: string) => 
    apiClient.post('/match-lexemes', { categoryId, pattern }),
  addPronunciation: (lexemeId: string, audioId: string, variety?: string) => 
    apiClient.post('/add-pronunciation', { lexemeId, audioId, variety }),
};

export const userApi = {
  login: (code: string) => 
    apiClient.post('/auth/oauth/callback', { code }),
  getContributions: () => 
    apiClient.get('/user/contributions'),
};

export default apiClient; 