import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { isAxiosError } from 'axios';
import {
  fetchCurrentUser,
  login as loginApi,
  logout as logoutApi,
  refreshAccessToken,
} from '../api/auth';
import { onAuthExpired } from '../api/authSessionEvents';
import type { SessionUser } from '../types/auth';

interface AuthContextValue {
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<SessionUser>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<SessionUser | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const sessionUser = await fetchCurrentUser();
      setUser(sessionUser);
      return sessionUser;
    } catch (error) {
      if (!isAxiosError(error) || (error.response?.status !== 401 && error.response?.status !== 403)) {
        setUser(null);
        return null;
      }

      try {
        await refreshAccessToken();
        const sessionUser = await fetchCurrentUser();
        setUser(sessionUser);
        return sessionUser;
      } catch {
        setUser(null);
        return null;
      }
    }
  }, []);

  useEffect(() => {
    refreshSession().finally(() => setIsLoading(false));
  }, [refreshSession]);

  useEffect(() => onAuthExpired(() => setUser(null)), []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginApi(email, password);
    const sessionUser: SessionUser = {
      userId: result.userId,
      email: result.email,
      role: result.role,
    };
    setUser(sessionUser);
    return sessionUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      logout,
      refreshSession,
    }),
    [user, isLoading, login, logout, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
