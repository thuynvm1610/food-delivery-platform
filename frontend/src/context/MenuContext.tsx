import React, { createContext, useContext, useState, useCallback } from 'react';
import { restaurantApi } from '../api/restaurant';
import type { Dish, DishCategory, DishImage } from '../types/restaurant';

interface MenuContextType {
  dishes: Dish[];
  categories: DishCategory[];
  selectedDish: Dish | null;
  loading: boolean;
  error: string | null;
  filters: { category?: string; search?: string; page: number; limit: number };
  
  // Actions
  loadDishes: (filters?: Partial<{ category?: string; search?: string; page?: number; limit?: number }>) => Promise<void>;
  loadCategories: () => Promise<void>;
  createDish: (data: Partial<Dish>) => Promise<void>;
  updateDish: (dishId: string, data: Partial<Dish>) => Promise<void>;
  deleteDish: (dishId: string) => Promise<void>;
  updateDishAvailability: (dishId: string, isAvailable: boolean) => Promise<void>;
  uploadDishImages: (dishId: string, formData: FormData) => Promise<void>;
  deleteDishImage: (dishId: string, imageId: string) => Promise<void>;
  reorderDishImages: (dishId: string, imageIds: string[]) => Promise<void>;
  setSelectedDish: (dish: Dish | null) => void;
  setFilters: (filters: Partial<{ category?: string; search?: string; page?: number; limit?: number }>) => void;
  clearError: () => void;
  bulkUpdateAvailability: (dishIds: string[], isAvailable: boolean) => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<DishCategory[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ category: undefined as string | undefined, search: undefined as string | undefined, page: 1, limit: 20 });

  const loadDishes = useCallback(async (newFilters?: Partial<{ category?: string; search?: string; page?: number; limit?: number }>) => {
    try {
      setLoading(true);
      setError(null);
      
      const actualFilters = newFilters ? { ...filters, ...newFilters } : filters;
      const response = await restaurantApi.getDishes({
        category: actualFilters.category,
        search: actualFilters.search,
        page: actualFilters.page,
        limit: actualFilters.limit,
      });
      
      setDishes(response.data.data);
      if (newFilters) {
        setFilters(actualFilters);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dishes');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const loadCategories = useCallback(async () => {
    try {
      setError(null);
      const response = await restaurantApi.getDishCategories();
      setCategories(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load categories');
      throw err;
    }
  }, []);

  const createDish = useCallback(async (data: Partial<Dish>) => {
    try {
      setError(null);
      const response = await restaurantApi.createDish(data);
      setDishes([...dishes, response.data.data]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create dish');
      throw err;
    }
  }, [dishes]);

  const updateDish = useCallback(async (dishId: string, data: Partial<Dish>) => {
    try {
      setError(null);
      const response = await restaurantApi.updateDish(dishId, data);
      setDishes(dishes.map(d => d.id === dishId ? response.data.data : d));
      if (selectedDish?.id === dishId) {
        setSelectedDish(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update dish');
      throw err;
    }
  }, [dishes, selectedDish]);

  const deleteDish = useCallback(async (dishId: string) => {
    try {
      setError(null);
      await restaurantApi.deleteDish(dishId);
      setDishes(dishes.filter(d => d.id !== dishId));
      if (selectedDish?.id === dishId) {
        setSelectedDish(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete dish');
      throw err;
    }
  }, [dishes, selectedDish]);

  const updateDishAvailability = useCallback(async (dishId: string, isAvailable: boolean) => {
    try {
      setError(null);
      const response = await restaurantApi.updateDishAvailability(dishId, isAvailable);
      setDishes(dishes.map(d => d.id === dishId ? response.data.data : d));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update dish availability');
      throw err;
    }
  }, [dishes]);

  const uploadDishImages = useCallback(async (dishId: string, formData: FormData) => {
    try {
      setError(null);
      const response = await restaurantApi.uploadDishImages(dishId, formData);
      setDishes(dishes.map(d => 
        d.id === dishId 
          ? { ...d, images: response.data.data }
          : d
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload images');
      throw err;
    }
  }, [dishes]);

  const deleteDishImage = useCallback(async (dishId: string, imageId: string) => {
    try {
      setError(null);
      await restaurantApi.deleteDishImage(dishId, imageId);
      setDishes(dishes.map(d => 
        d.id === dishId 
          ? { ...d, images: d.images.filter(img => img.id !== imageId) }
          : d
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete image');
      throw err;
    }
  }, [dishes]);

  const reorderDishImages = useCallback(async (dishId: string, imageIds: string[]) => {
    try {
      setError(null);
      const response = await restaurantApi.reorderDishImages(dishId, imageIds);
      setDishes(dishes.map(d => 
        d.id === dishId 
          ? { ...d, images: response.data.data }
          : d
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reorder images');
      throw err;
    }
  }, [dishes]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const bulkUpdateAvailability = useCallback(async (dishIds: string[], isAvailable: boolean) => {
    try {
      setError(null);
      // Execute all updates in parallel
      await Promise.all(
        dishIds.map(dishId => restaurantApi.updateDishAvailability(dishId, isAvailable))
      );
      // Reload dishes to sync
      await loadDishes();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update availability');
      throw err;
    }
  }, [loadDishes]);

  const value: MenuContextType = {
    dishes,
    categories,
    selectedDish,
    loading,
    error,
    filters,
    loadDishes,
    loadCategories,
    createDish,
    updateDish,
    deleteDish,
    updateDishAvailability,
    uploadDishImages,
    deleteDishImage,
    reorderDishImages,
    setSelectedDish,
    setFilters,
    clearError,
    bulkUpdateAvailability,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within MenuProvider');
  }
  return context;
};
