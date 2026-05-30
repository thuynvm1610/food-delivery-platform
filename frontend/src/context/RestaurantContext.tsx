import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { restaurantApi } from '../api/restaurant';
import type { Restaurant, RestaurantOperatingHour, RestaurantImage } from '../types/restaurant';

interface RestaurantContextType {
  restaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
  images: RestaurantImage[];
  operatingHours: RestaurantOperatingHour[];
  
  // Actions
  loadRestaurantProfile: () => Promise<void>;
  updateRestaurantProfile: (data: Partial<Restaurant>) => Promise<void>;
  updateStatus: (status: 'OPEN' | 'CLOSED') => Promise<void>;
  loadImages: () => Promise<void>;
  loadOperatingHours: () => Promise<void>;
  updateOperatingHours: (hours: Partial<RestaurantOperatingHour>[]) => Promise<void>;
  uploadImages: (formData: FormData) => Promise<void>;
  deleteImage: (imageId: string) => Promise<void>;
  reorderImages: (imageIds: string[]) => Promise<void>;
  clearError: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [images, setImages] = useState<RestaurantImage[]>([]);
  const [operatingHours, setOperatingHours] = useState<RestaurantOperatingHour[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRestaurantProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await restaurantApi.getMyProfile();
      setRestaurant(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load restaurant profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRestaurantProfile = useCallback(async (data: Partial<Restaurant>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await restaurantApi.updateProfile(data);
      setRestaurant(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update restaurant profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (status: 'OPEN' | 'CLOSED') => {
    try {
      setError(null);
      const response = await restaurantApi.updateStatus(status);
      setRestaurant(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update restaurant status');
      throw err;
    }
  }, []);

  const loadImages = useCallback(async () => {
    try {
      setError(null);
      const response = await restaurantApi.getRestaurantImages();
      setImages(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load images');
      throw err;
    }
  }, []);

  const loadOperatingHours = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await restaurantApi.getOperatingHours();
      setOperatingHours(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load operating hours');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOperatingHours = useCallback(async (hours: Partial<RestaurantOperatingHour>[]) => {
    try {
      setLoading(true);
      setError(null);
      const response = await restaurantApi.updateOperatingHours(hours);
      setOperatingHours(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update operating hours');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadImages = useCallback(async (formData: FormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await restaurantApi.uploadRestaurantImages(formData);
      setImages(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload images');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteImage = useCallback(async (imageId: string) => {
    try {
      setError(null);
      await restaurantApi.deleteRestaurantImage(imageId);
      const response = await restaurantApi.getRestaurantImages();
      setImages(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete image');
      throw err;
    }
  }, []);

  const reorderImages = useCallback(async (imageIds: string[]) => {
    try {
      setError(null);
      const response = await restaurantApi.reorderRestaurantImages(imageIds);
      setImages(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reorder images');
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load profile on mount
  useEffect(() => {
    loadRestaurantProfile().catch(() => {
      // Error handling is done in the callback
    });
    loadImages().catch(() => {
      // Error handling is done in the callback
    });
  }, [loadRestaurantProfile, loadImages]);

  const value: RestaurantContextType = {
    restaurant,
    loading,
    error,
    images,
    operatingHours,
    loadRestaurantProfile,
    updateRestaurantProfile,
    updateStatus,
    loadImages,
    loadOperatingHours,
    updateOperatingHours,
    uploadImages,
    deleteImage,
    reorderImages,
    clearError,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within RestaurantProvider');
  }
  return context;
};
