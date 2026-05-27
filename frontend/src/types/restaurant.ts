// Restaurant Types
export interface Restaurant {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  streetAddress?: string;
  city: string;
  district: string;
  latitude?: number;
  longitude?: number;
  coverImageUrl?: string;
  status: 'OPEN' | 'CLOSED';
  createdAt: string;
}

// Dish Types
export interface Dish {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  price: number;
  isAvailable: boolean;
  images: DishImage[];
  categories: DishCategory[];
  rating?: number;
  reviewCount?: number;
}

export interface DishImage {
  id: string;
  dishId: string;
  imageUrl: string;
  displayOrder: number;
}

export interface DishCategory {
  id: string;
  name: string;
  description?: string;
}

// Order Types
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'CANCELLED_BY_RESTAURANT' | 'COMPLETED';

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  status: OrderStatus;
  items: OrderItem[];
  deliveryAddress: string;
  deliveryCity: string;
  deliveryDistrict: string;
  deliveryLatitude?: number;
  deliveryLongitude?: number;
  subtotalAmount: number;
  deliveryFeeAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  voucherId?: string;
  createdAt: string;
  statusHistory: OrderStatusHistory[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  dishId: string;
  dishName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  note?: string;
  createdAt: string;
}

// Operating Hours
export interface RestaurantOperatingHour {
  id: string;
  restaurantId: string;
  dayOfWeek: number; // 2-8 (Mon-Sun)
  openHour: number; // 0-23
  closeHour: number; // 0-23
}

// Voucher Types
export interface Voucher {
  id: string;
  code: string;
  restaurantId: string;
  title: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  validFrom: string;
  validTo: string;
  usageLimit?: number;
  usedCount: number;
}

// Wallet Types
export interface Wallet {
  id: string;
  userId: string;
  balanceAmount: number;
  currency: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'DELIVERY_EARNING' | 'RESTAURANT_REVENUE' | 'COMMISSION_FEE' | 'REFUND';
  referenceOrderId?: string;
  createdAt: string;
}

// Review Types
export interface DishReview {
  id: string;
  dishId: string;
  customerId: string;
  orderId: string;
  ratingStars: number; // 1-5
  comment?: string;
  createdAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalOrders: number;
  successfulOrders: number;
  cancelledOrders: number;
  inProgressOrders: number;
  totalRevenue: number;
  todayRevenue: number;
  monthlyRevenue: number;
  topDishes: TopDish[];
  orderTrendData: TrendData[];
  cancelRate: number;
}

export interface TopDish {
  dishId: string;
  dishName: string;
  soldCount: number;
  revenue: number;
}

export interface TrendData {
  date: string;
  orders: number;
  revenue: number;
}

// Restaurant Image
export interface RestaurantImage {
  id: string;
  restaurantId: string;
  imageUrl: string;
  displayOrder: number;
}
