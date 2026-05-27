import { apiClient } from './client';
import type {
  BaseResponse,
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
  getDishes: (filters?: { category?: string; search?: string; page?: number; limit?: number }) =>
    apiClient.get<BaseResponse<Dish[]>>('/restaurants/me/dishes', { params: filters }),

  createDish: (data: Partial<Dish>) =>
    apiClient.post<BaseResponse<Dish>>('/restaurants/me/dishes', data),

  updateDish: (dishId: string, data: Partial<Dish>) =>
    apiClient.put<BaseResponse<Dish>>(`/restaurants/me/dishes/${dishId}`, data),

  deleteDish: (dishId: string) =>
    apiClient.delete<BaseResponse<void>>(`/restaurants/me/dishes/${dishId}`),

  updateDishAvailability: (dishId: string, isAvailable: boolean) =>
    apiClient.patch<BaseResponse<Dish>>(
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
