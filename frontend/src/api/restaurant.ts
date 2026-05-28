import { apiClient } from './client';
import type { BaseResponse, PageResponse } from '../types/api';
import type {
  Restaurant,
  Dish,
  Order,
  DashboardStats,
  Voucher,
  Wallet,
  WalletTransaction,
  DishReview,
  RestaurantOperatingHour,
  RestaurantImage,
  DishCategory,
  DishImage,
  DishUpsertPayload,
} from '../types/restaurant';

// Restaurant Profile
export const restaurantApi = {
  // Profile
  getMyProfile: () => apiClient.get<BaseResponse<Restaurant>>('/restaurants/me'),
  
  updateProfile: (data: Partial<Restaurant>) =>
    apiClient.put<BaseResponse<Restaurant>>('/restaurants/me', data),

  updateStatus: (status: 'OPEN' | 'CLOSED') =>
    apiClient.put<BaseResponse<Restaurant>>('/restaurants/me/status', { status }),

  // Operating Hours
  getOperatingHours: () =>
    apiClient.get<BaseResponse<RestaurantOperatingHour[]>>('/restaurants/me/operating-hours'),

  updateOperatingHours: (hours: Partial<RestaurantOperatingHour>[]) =>
    apiClient.put<BaseResponse<RestaurantOperatingHour[]>>(
      '/restaurants/me/operating-hours',
      { hours }
    ),

  // Images
  uploadRestaurantImages: (formData: FormData) =>
    apiClient.post<BaseResponse<RestaurantImage[]>>('/restaurants/me/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteRestaurantImage: (imageId: string) =>
    apiClient.delete<BaseResponse<void>>(`/restaurants/me/images/${imageId}`),

  reorderRestaurantImages: (imageIds: string[]) =>
    apiClient.put<BaseResponse<RestaurantImage[]>>('/restaurants/me/images/reorder', {
      imageIds,
    }),

  // Dashboard
  getDashboardStats: () =>
    apiClient.get<BaseResponse<DashboardStats>>('/restaurants/me/dashboard/stats'),

  // Orders
  getOrders: (filters?: { status?: string; page?: number; limit?: number }) =>
    apiClient.get<BaseResponse<Order[]>>('/restaurants/me/orders', { params: filters }),

  getOrderDetail: (orderId: string) =>
    apiClient.get<BaseResponse<Order>>(`/restaurants/me/orders/${orderId}`),

  confirmOrder: (orderId: string) =>
    apiClient.post<BaseResponse<Order>>(`/restaurants/me/orders/${orderId}/confirm`),

  startPreparing: (orderId: string) =>
    apiClient.post<BaseResponse<Order>>(`/restaurants/me/orders/${orderId}/start-preparing`),

  markReady: (orderId: string) =>
    apiClient.post<BaseResponse<Order>>(`/restaurants/me/orders/${orderId}/ready`),

  cancelOrder: (orderId: string, reason?: string) =>
    apiClient.post<BaseResponse<Order>>(`/restaurants/me/orders/${orderId}/cancel`, { reason }),

  // Menu
  getDishes: (filters?: { categoryIds?: string[]; search?: string; page?: number; limit?: number; minPrice?: number; maxPrice?: number }) => {
    const params = new URLSearchParams();

    if (filters?.categoryIds?.length) {
      filters.categoryIds.forEach(categoryId => params.append('categoryIds', categoryId));
    }
    if (filters?.search) params.set('search', filters.search);
    if (filters?.page != null) params.set('page', String(filters.page));
    if (filters?.limit != null) params.set('limit', String(filters.limit));
    if (filters?.minPrice != null) params.set('minPrice', String(filters.minPrice));
    if (filters?.maxPrice != null) params.set('maxPrice', String(filters.maxPrice));

    return apiClient.get<BaseResponse<PageResponse<Dish[]>>>('/restaurants/me/dishes', { params });
  },

  getDishById: (dishId: string) =>
    apiClient.get<BaseResponse<Dish>>(`/restaurants/me/dishes/${dishId}`),

  createDish: (data: DishUpsertPayload) =>
    apiClient.post<BaseResponse<Dish>>('/restaurants/me/dishes', data),

  updateDish: (dishId: string, data: DishUpsertPayload) =>
    apiClient.put<BaseResponse<Dish>>(`/restaurants/me/dishes/${dishId}`, data),

  deleteDish: (dishId: string) =>
    apiClient.delete<BaseResponse<void>>(`/restaurants/me/dishes/${dishId}`),

  updateDishAvailability: (dishId: string, isAvailable: boolean) =>
    apiClient.put<BaseResponse<Dish>>(
      `/restaurants/me/dishes/${dishId}/availability`,
      { isAvailable }
    ),

  // Dish Images
  uploadDishImages: (dishId: string, formData: FormData) =>
    apiClient.post<BaseResponse<DishImage[]>>(
      `/restaurants/me/dishes/${dishId}/images`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ),

  deleteDishImage: (dishId: string, imageId: string) =>
    apiClient.delete<BaseResponse<void>>(`/restaurants/me/dishes/${dishId}/images/${imageId}`),

  deleteDishImages: (dishId: string, imageIds: string[]) =>
    apiClient.delete<BaseResponse<void>>(`/restaurants/me/dishes/${dishId}/images`, {
      data: { imageIds },
    }),

  reorderDishImages: (dishId: string, imageIds: string[]) =>
    apiClient.put<BaseResponse<DishImage[]>>(
      `/restaurants/me/dishes/${dishId}/images/reorder`,
      { imageIds }
    ),

  // Dish Categories (read-only)
  getDishCategories: () =>
    apiClient.get<BaseResponse<DishCategory[]>>('/dish-categories'),

  // Vouchers
  getVouchers: () =>
    apiClient.get<BaseResponse<Voucher[]>>('/restaurants/me/vouchers'),

  createVoucher: (data: Partial<Voucher>) =>
    apiClient.post<BaseResponse<Voucher>>('/restaurants/me/vouchers', data),

  updateVoucher: (voucherId: string, data: Partial<Voucher>) =>
    apiClient.put<BaseResponse<Voucher>>(`/restaurants/me/vouchers/${voucherId}`, data),

  deleteVoucher: (voucherId: string) =>
    apiClient.delete<BaseResponse<void>>(`/restaurants/me/vouchers/${voucherId}`),

  // Wallet & Revenue
  getWallet: () =>
    apiClient.get<BaseResponse<Wallet>>('/restaurants/me/wallet'),

  getWalletTransactions: (filters?: { type?: string; startDate?: string; endDate?: string; page?: number; limit?: number }) =>
    apiClient.get<BaseResponse<WalletTransaction[]>>('/restaurants/me/wallet/transactions', {
      params: filters,
    }),

  // Reviews
  getRestaurantReviews: (filters?: { dishId?: string; rating?: number; page?: number; limit?: number }) =>
    apiClient.get<BaseResponse<DishReview[]>>('/restaurants/me/reviews', { params: filters }),

  getDishReviews: (dishId: string, filters?: { page?: number; limit?: number }) =>
    apiClient.get<BaseResponse<DishReview[]>>(
      `/restaurants/me/dishes/${dishId}/reviews`,
      { params: filters }
    ),
};
