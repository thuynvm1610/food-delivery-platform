import React, { createContext, useContext, useState, useCallback } from 'react';
import { restaurantApi } from '../api/restaurant';
import type { DashboardStats } from '../types/restaurant';

interface DashboardContextType {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  loadStats: () => Promise<void>;
  clearError: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await restaurantApi.getDashboardStats();
      setStats(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard stats');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: DashboardContextType = {
    stats,
    loading,
    error,
    loadStats,
    clearError,
  };

  return (
      <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
