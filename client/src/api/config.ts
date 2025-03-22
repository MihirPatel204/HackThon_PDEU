// API Configuration

// Base URL for API requests
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Default headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Token storage keys
export const TOKEN_STORAGE_KEY = 'credit_aggregator_token';
export const REFRESH_TOKEN_STORAGE_KEY = 'credit_aggregator_refresh_token';

// Helper function to get token from storage
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

// Helper function to set token in storage
export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

// Helper function to set refresh token in storage
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
};

// Helper function to get refresh token from storage
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
};

// Helper function to clear tokens from storage
export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
};

// API request helper function with token handling
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();
  
  const headers = {
    ...DEFAULT_HEADERS,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  const config = {
    ...options,
    headers,
  };
  
  return fetch(`${API_BASE_URL}${url}`, config);
};

// Generic API handler with JSON response
export const apiHandler = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'An unknown error occurred',
    }));
    
    throw new Error(errorData.message || `HTTP error ${response.status}`);
  }
  
  return response.json() as Promise<T>;
}; 