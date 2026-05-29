import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { restaurantApi } from '../api/restaurant';
import type { Dish, DishCategory, DishUpsertPayload } from '../types/restaurant';

interface PaginationState {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

interface MenuContextType {
  dishes: Dish[];
  categories: DishCategory[];
  selectedDish: Dish | null;
  loading: boolean;
  error: string | null;
  filters: { categoryIds: string[]; search?: string; page: number; limit: number; minPrice?: number; maxPrice?: number };
  pagination: PaginationState;
  
  // Actions
  loadDishes: (filters?: Partial<{ categoryIds?: string[]; search?: string; page?: number; limit?: number; minPrice?: number; maxPrice?: number }>) => Promise<void>;
  loadCategories: () => Promise<void>;
  createDish: (data: DishUpsertPayload) => Promise<void>;
  updateDish: (dishId: string, data: DishUpsertPayload) => Promise<void>;
  deleteDish: (dishId: string) => Promise<void>;
  updateDishAvailability: (dishId: string, isAvailable: boolean) => Promise<void>;
  uploadDishImages: (dishId: string, formData: FormData) => Promise<void>;
  deleteDishImage: (dishId: string, imageId: string) => Promise<void>;
  deleteDishImages: (dishId: string, imageIds: string[]) => Promise<void>;
  reorderDishImages: (dishId: string, imageIds: string[]) => Promise<void>;
  setSelectedDish: (dish: Dish | null) => void;
  setFilters: (filters: Partial<{ categoryIds?: string[]; search?: string; page?: number; limit?: number; minPrice?: number; maxPrice?: number }>) => void;
  clearError: () => void;
  bulkUpdateAvailability: (dishIds: string[], isAvailable: boolean) => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const normalizeDishAvailability = (dish: Dish): Dish => ({
  ...dish,
  isAvailable: dish.isAvailable ?? dish.available ?? false,
});

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<DishCategory[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState({ categoryIds: [] as string[], search: undefined as string | undefined, page: 1, limit: 5, minPrice: undefined as number | undefined, maxPrice: undefined as number | undefined });
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, limit: 5, totalItems: 0, totalPages: 1 });
  const filtersRef = useRef(filters);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const setFilters = useCallback((newFilters: Partial<{ categoryIds?: string[]; search?: string; page?: number; limit?: number; minPrice?: number; maxPrice?: number }>) => {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters,
      categoryIds: newFilters.categoryIds ? [...newFilters.categoryIds] : prev.categoryIds,
    }));
  }, []);

  const loadDishes = useCallback(async (newFilters?: Partial<{ categoryIds?: string[]; search?: string; page?: number; limit?: number; minPrice?: number; maxPrice?: number }>) => {
    try {
      setLoading(true);
      setError(null);

      const currentFilters = filtersRef.current;
      const actualFilters = newFilters
        ? {
            ...currentFilters,
            ...newFilters,
            categoryIds: newFilters.categoryIds ? [...newFilters.categoryIds] : currentFilters.categoryIds,
          }
        : currentFilters;

      const response = await restaurantApi.getDishes({
        categoryIds: actualFilters.categoryIds,
        search: actualFilters.search,
        page: actualFilters.page,
        limit: actualFilters.limit,
        minPrice: actualFilters.minPrice,
        maxPrice: actualFilters.maxPrice,
      });
      
      const paginatedData = response.data.data;
      setDishes((paginatedData.content || []).map(normalizeDishAvailability));
      setPagination({
        page: (paginatedData.number ?? 0) + 1,
        limit: paginatedData.size ?? actualFilters.limit,
        totalItems: paginatedData.totalElements ?? 0,
        totalPages: paginatedData.totalPages ?? 1,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dishes');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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

  const createDish = useCallback(async (data: DishUpsertPayload) => {
    try {
      setError(null);
      const response = await restaurantApi.createDish(data);
      setDishes([...dishes, normalizeDishAvailability(response.data.data)]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create dish');
      throw err;
    }
  }, [dishes]);

  const updateDish = useCallback(async (dishId: string, data: DishUpsertPayload) => {
    try {
      setError(null);
      const response = await restaurantApi.updateDish(dishId, data);
      setDishes(dishes.map(d => d.id === dishId ? normalizeDishAvailability(response.data.data) : d));
      if (selectedDish?.id === dishId) {
        setSelectedDish(normalizeDishAvailability(response.data.data));
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
      setDishes(dishes.map(d => d.id === dishId ? normalizeDishAvailability(response.data.data) : d));
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

  const deleteDishImages = useCallback(async (dishId: string, imageIds: string[]) => {
    try {
      setError(null);
      await restaurantApi.deleteDishImages(dishId, imageIds);
      setDishes(dishes.map(d =>
        d.id === dishId
          ? { ...d, images: d.images.filter(img => !imageIds.includes(img.id)) }
          : d
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete images');
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
    pagination,
    loadDishes,
    loadCategories,
    createDish,
    updateDish,
    deleteDish,
    updateDishAvailability,
    uploadDishImages,
    deleteDishImage,
    deleteDishImages,
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
