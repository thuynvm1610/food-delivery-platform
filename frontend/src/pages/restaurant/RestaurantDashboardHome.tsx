import React, { useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useOrder } from '../../context/OrderContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { StatCard } from '../../components/common/StatCard';
import { Toast } from '../../components/common/Toast';

export const RestaurantDashboardHome: React.FC = () => {
  const { stats, loading, error, clearError } = useDashboard();
  const { restaurant } = useRestaurant();
  const { orders } = useOrder();

  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{restaurant?.name}</h1>
          <p className="text-gray-600 mt-1">Tổng quan kinh doanh</p>
        </div>
        <div className="text-right">
          <span
            className={`inline-block px-4 py-2 rounded-full font-semibold ${
              restaurant?.status === 'OPEN'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {restaurant?.status === 'OPEN' ? '🟢 Đang mở cửa' : '🔴 Đã đóng cửa'}
          </span>
        </div>
      </div>

      {/* Alert for pending orders */}
      {pendingOrders > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-800 font-semibold">
            🔔 Có {pendingOrders} đơn hàng chờ xác nhận
          </p>
        </div>
      )}

      {error && (
        <Toast
          message={error}
          type="error"
          onClose={clearError}
        />
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg animate-pulse" />
          ))
        ) : stats ? (
          <>
            <StatCard
              title="Tổng đơn hàng"
              value={stats.totalOrders}
              icon="📦"
              trend={{ value: 12, direction: 'up' }}
            />
            <StatCard
              title="Đơn hàng thành công"
              value={stats.successfulOrders}
              icon="✓"
              trend={{ value: 8, direction: 'up' }}
            />
            <StatCard
              title="Đơn hàng hủy"
              value={stats.cancelledOrders}
              icon="✕"
            />
            <StatCard
              title="Tổng doanh thu"
              value={`${stats.totalRevenue.toLocaleString()}₫`}
              icon="💰"
            />
          </>
        ) : null}
      </div>

      {/* Revenue Summary */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-gray-900 mb-4">Doanh thu hôm nay</h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.todayRevenue.toLocaleString()}₫
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-gray-900 mb-4">Doanh thu tháng này</h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats.monthlyRevenue.toLocaleString()}₫
            </p>
          </div>
        </div>
      )}

      {/* Top Dishes */}
      {stats && stats.topDishes.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-gray-900 mb-4">🔥 Món ăn bán chạy</h3>
          <div className="space-y-3">
            {stats.topDishes.map((dish, idx) => (
              <div key={dish.dishId} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-gray-400">#{idx + 1}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{dish.dishName}</p>
                    <p className="text-sm text-gray-500">{dish.soldCount} bán</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">{dish.revenue.toLocaleString()}₫</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cancel Rate */}
      {stats && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-gray-900 mb-4">Tỷ lệ hủy đơn</h3>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full border-8 border-red-300 flex items-center justify-center">
              <span className="text-2xl font-bold text-red-600">{Math.round(stats.cancelRate)}%</span>
            </div>
            <p className="text-gray-600">
              {stats.cancelRate > 10
                ? '⚠️ Tỷ lệ hủy cao, hãy cải thiện chất lượng'
                : '✓ Tỷ lệ hủy ở mức bình thường'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
