export function getAuthTokenSafely() {
  try {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('authTokenExpiry');
    if (!token || !expiry) return null;
    if (new Date(expiry) <= new Date()) {
      // token expired
      localStorage.removeItem('authToken');
      localStorage.removeItem('authTokenExpiry');
      return null;
    }
    return token;
  } catch (err) {
    console.error('Error reading auth token:', err);
    return null;
  }
}

export function handleAuthError() {
  // Do not remove auth tokens here. Higher-level logic can decide whether to
  // keep or clear tokens. Just notify the app that an auth error occurred.
  try {
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('app:signout'));
    }
  } catch (e) {
    // fallback redirect if event dispatch fails
    if (typeof window !== 'undefined') {
      window.location.hash = '#/admin/signin';
    }
  }
}
// (Keep auth helpers minimal: we persist only access token and expiry client-side.)

