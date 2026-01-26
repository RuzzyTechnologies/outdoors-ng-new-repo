/**
 * JWT Token Management
 * Securely store and retrieve authentication tokens
 */

const TOKEN_KEY = 'outdoors_admin_token';
const ADMIN_KEY = 'outdoors_admin_user';

export interface StoredAdmin {
  id: string;
  email: string;
  username: string;
}

/**
 * Store token and admin info in localStorage
 */
export function storeToken(token: string, admin: StoredAdmin): void {
  if (typeof window !== 'undefined') {
    try {
      console.log('[v0] storeToken called, token length:', token?.length || 0);
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
      console.log('[v0] Token stored successfully');
      console.log('[v0] Verifying: stored token length:', localStorage.getItem(TOKEN_KEY)?.length || 0);
    } catch (error) {
      console.error('[v0] Failed to store token:', error);
    }
  }
}

/**
 * Get stored token
 */
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      console.log('[v0] getToken - token exists:', !!token, 'token length:', token?.length || 0);
      return token;
    } catch (error) {
      console.error('[v0] Failed to retrieve token:', error);
      return null;
    }
  }
  console.log('[v0] getToken - window undefined (server-side)');
  return null;
}

/**
 * Get stored admin info
 */
export function getStoredAdmin(): StoredAdmin | null {
  if (typeof window !== 'undefined') {
    try {
      const admin = localStorage.getItem(ADMIN_KEY);
      return admin ? JSON.parse(admin) : null;
    } catch (error) {
      console.error('[v0] Failed to retrieve admin info:', error);
      return null;
    }
  }
  return null;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

/**
 * Clear token and admin info on logout
 */
export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ADMIN_KEY);
    } catch (error) {
      console.error('[v0] Failed to clear auth:', error);
    }
  }
}

/**
 * Check token validity (basic check - doesn't validate signature)
 */
export function isTokenValid(token: string): boolean {
  if (!token) return false;
  
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    // Try to decode payload
    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64').toString('utf-8')
    );

    // Check if token is expired (if it has exp field)
    if (payload.exp) {
      const expiryTime = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < expiryTime;
    }

    return true;
  } catch {
    return false;
  }
}
