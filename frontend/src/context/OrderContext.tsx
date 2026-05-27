import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { restaurantApi } from '../api/restaurant';
import type { Order, OrderStatus } from '../types/restaurant';

interface OrderContextType {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
  filters: { status?: OrderStatus; page: number; limit: number };
  
  // Actions
  loadOrders: (filters?: Partial<{ status?: OrderStatus; page?: number; limit?: number }>) => Promise<void>;
  getOrderDetail: (orderId: string) => Promise<void>;
  confirmOrder: (orderId: string) => Promise<void>;
  startPreparing: (orderId: string) => Promise<void>;
  markReady: (orderId: string) => Promise<void>;
  cancelOrder: (orderId: string, reason?: string) => Promise<void>;
  setSelectedOrder: (order: Order | null) => void;
  setFilters: (filters: Partial<{ status?: OrderStatus; page?: number; limit?: number }>) => void;
  clearError: () => void;
  connectWebSocket: (restaurantId: string) => void;
  disconnectWebSocket: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ status: undefined as OrderStatus | undefined, page: 1, limit: 20 });
  const wsRef = useRef<WebSocket | null>(null);

  const loadOrders = useCallback(async (newFilters?: Partial<{ status?: OrderStatus; page?: number; limit?: number }>) => {
    try {
      setLoading(true);
      setError(null);
      
      const actualFilters = newFilters ? { ...filters, ...newFilters } : filters;
      const response = await restaurantApi.getOrders({
        status: actualFilters.status,
        page: actualFilters.page,
        limit: actualFilters.limit,
      });
      
      setOrders(response.data.data);
      if (newFilters) {
        setFilters(actualFilters);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load orders');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const getOrderDetail = useCallback(async (orderId: string) => {
    try {
      setError(null);
      const response = await restaurantApi.getOrderDetail(orderId);
      setSelectedOrder(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load order detail');
      throw err;
    }
  }, []);

  const confirmOrder = useCallback(async (orderId: string) => {
    try {
      setError(null);
      const response = await restaurantApi.confirmOrder(orderId);
      updateOrderInList(response.data.data);
      setSelectedOrder(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to confirm order');
      throw err;
    }
  }, []);

  const startPreparing = useCallback(async (orderId: string) => {
    try {
      setError(null);
      const response = await restaurantApi.startPreparing(orderId);
      updateOrderInList(response.data.data);
      setSelectedOrder(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to start preparing');
      throw err;
    }
  }, []);

  const markReady = useCallback(async (orderId: string) => {
    try {
      setError(null);
      const response = await restaurantApi.markReady(orderId);
      updateOrderInList(response.data.data);
      setSelectedOrder(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to mark as ready');
      throw err;
    }
  }, []);

  const cancelOrder = useCallback(async (orderId: string, reason?: string) => {
    try {
      setError(null);
      const response = await restaurantApi.cancelOrder(orderId, reason);
      updateOrderInList(response.data.data);
      setSelectedOrder(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to cancel order');
      throw err;
    }
  }, []);

  const updateOrderInList = (updatedOrder: Order) => {
    setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const connectWebSocket = useCallback((restaurantId: string) => {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/v1/ws/restaurant/orders/${restaurantId}`;
      
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.type === 'NEW_ORDER') {
            setOrders(prev => [message.data, ...prev]);
          } else if (message.type === 'ORDER_UPDATED') {
            updateOrderInList(message.data);
          }
        } catch (err) {
          console.error('Failed to parse WebSocket message', err);
        }
      };

      wsRef.current.onerror = (event) => {
        console.error('WebSocket error', event);
        setError('Connection lost');
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket closed');
      };
    } catch (err) {
      console.error('Failed to connect WebSocket', err);
      setError('Failed to connect to real-time updates');
    }
  }, []);

  const disconnectWebSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const value: OrderContextType = {
    orders,
    selectedOrder,
    loading,
    error,
    filters,
    loadOrders,
    getOrderDetail,
    confirmOrder,
    startPreparing,
    markReady,
    cancelOrder,
    setSelectedOrder,
    setFilters,
    clearError,
    connectWebSocket,
    disconnectWebSocket,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};
