import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken, removeAuthToken, setAuthToken, isAuthenticated as checkAuth } from './api';
import { api, handleApiResponse } from './api';

export interface User {
  id: string;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isVerified: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuthentication = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Verify token by fetching user profile
      const response = await api.getUserProfile();
      const userData = await handleApiResponse<User>(response);
      setUser(userData);
      setAuthenticated(true);
    } catch (error) {
      // Token is invalid, remove it
      removeAuthToken();
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const login = useCallback(async (token: string, userData?: User) => {
    setAuthToken(token);
    if (userData) {
      setUser(userData);
      setAuthenticated(true);
    } else {
      // Fetch user profile if not provided
      await checkAuthentication();
    }
  }, [checkAuthentication]);

  const logout = useCallback(() => {
    removeAuthToken();
    setUser(null);
    setAuthenticated(false);
    router.push('/auth/login');
  }, [router]);

  return {
    user,
    authenticated,
    loading,
    login,
    logout,
    refresh: checkAuthentication,
  };
}

