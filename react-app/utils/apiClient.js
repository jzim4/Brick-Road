import axios from 'axios';
import { getAuthTokenSafely, handleAuthError } from './authHelpers';

// Create an axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || '',
  timeout: 15000,
});

// Keep client minimal: attach token and centrally handle 401 by clearing auth.

// Attach token to requests when available
apiClient.interceptors.request.use(
  async config => {
    try {
      const token = await getAuthTokenSafely();
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (err) {
      // ignore and continue without token
    }
    return config;
  },
  error => Promise.reject(error)
);

// Centralized response handling for auth failures
apiClient.interceptors.response.use(
  response => response,
  error => {
    const status = error?.response?.status;
    if (status === 401) {
      try { handleAuthError(); } catch (e) {}
      error.isAuthError = true;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
