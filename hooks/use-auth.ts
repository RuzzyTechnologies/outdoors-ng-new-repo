/**
 * useAuth Hook
 * Manages authentication state and provides auth utilities
 */

'use client';

import { useEffect, useState } from 'react';
import { getToken, getStoredAdmin, clearAuth, isAuthenticated as checkAuth, StoredAdmin } from '@/lib/auth-storage';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<StoredAdmin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated on mount
    const storedToken = getToken();
    const storedAdmin = getStoredAdmin();

    setToken(storedToken);
    setAdmin(storedAdmin);
    setIsAuthenticated(checkAuth());
    setIsLoading(false);
  }, []);

  const logout = () => {
    clearAuth();
    setToken(null);
    setAdmin(null);
    setIsAuthenticated(false);
    router.push('/admin-dash1234/login');
  };

  return {
    token,
    admin,
    isLoading,
    isAuthenticated,
    logout,
  };
}

/**
 * ProtectedRoute Component
 * Redirects to login if not authenticated
 */
export function useProtectedRoute() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/admin-dash1234/login');
      return;
    }
    setIsReady(true);
  }, [router]);

  return isReady;
}
