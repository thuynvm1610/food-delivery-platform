import React, { useState, useEffect } from 'react';
import { useOrder } from '../../context/OrderContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ActionButton } from '../../components/common/ActionButton';
import { FilterBar } from '../../components/common/FilterBar';
import { Toast } from '../../components/common/Toast';
import type { OrderStatus } from '../../types/restaurant';

export const RestaurantOrders: React.FC = () => {
  const { orders, loading, error, filters, loadOrders, setFilters, confirmOrder, startPreparing, markReady, cancelOrder, clearError } = useOrder();
  const { restaurant } = useRestaurant();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadOrders().catch(() => {});
  }, []);

  // WebSocket connection
  useEffect(() => {
    if (restaurant?.id) {
      // connectWebSocket(restaurant.id); // TODO: Enable after WebSocket is implemented
    }
  }, [restaurant?.id]);

  const handleStatusFilter = (status: OrderStatus) => {
    setFilters({ ...filters, status, page: 1 });
    loadOrders({ ...filters, status, page: 1 }).catch(() => {});
  };

  const handleActionClick = async (action: () => Promise<void>, message: string) => {
    try {
      await action();
      setToastMessage(`✓ ${message}`);
    } catch (err: any) {
      setToastMessage(`✕ ${err.message || 'Có lỗi xảy ra'}`);
    }
  };

  const statusOptions = [
    { label: 'Tất cả', value: '' },
    { label: 'Chờ xác nhận', value: 'PENDING' },
    { label: 'Đã xác nhận', value: 'CONFIRMED' },
    { label: 'Đang nấu', value: 'PREPARING' },
    { label: 'Sẵn sàng', value: 'READY_FOR_PICKUP' },
    { label: 'Hủy', value: 'CANCELLED_BY_RESTAURANT' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        <p className="text-gray-600 mt-1">Xác nhận, nấu, và hoàn thành đơn hàng</p>
      </div>

      {error && (
        <Toast
          message={error}
          type="error"
          onClose={clearError}
        />
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastMessage.includes('✓') ? 'success' : 'error'}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={(key, value) => {
          if (key === 'status') {
            handleStatusFilter(value as OrderStatus);
          }
        }}
        options={[
          {
            label: 'Trạng thái',
            key: 'status',
            type: 'select',
            choices: statusOptions,
          },
        ]}
      />

      {/* Orders List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Không có đơn hàng</p>
          </div>
        ) : (
          orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow p-4 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-gray-900">Đơn #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 border-y">
                <div>
                  <p className="text-xs text-gray-500">Số mon</p>
                  <p className="font-semibold">{order.items.length}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tổng tiền</p>
                  <p className="font-semibold">{order.totalAmount.toLocaleString()}₫</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Địa chỉ</p>
                  <p className="font-semibold text-sm truncate">{order.deliveryAddress}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Khách</p>
                  <p className="font-semibold">{order.customerId.slice(0, 8)}...</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {order.status === 'PENDING' && (
                  <ActionButton
                    label="Xác nhận"
                    onClick={() => handleActionClick(() => confirmOrder(order.id), 'Đơn hàng đã được xác nhận')}
                    variant="success"
                    size="sm"
                  />
                )}
                {order.status === 'CONFIRMED' && (
                  <ActionButton
                    label="Bắt đầu nấu"
                    onClick={() => handleActionClick(() => startPreparing(order.id), 'Bắt đầu nấu đơn hàng')}
                    variant="primary"
                    size="sm"
                  />
                )}
                {order.status === 'PREPARING' && (
                  <ActionButton
                    label="Sẵn sàng"
                    onClick={() => handleActionClick(() => markReady(order.id), 'Đơn hàng sẵn sàng')}
                    variant="success"
                    size="sm"
                  />
                )}
                {(order.status === 'PENDING' || order.status === 'CONFIRMED' || order.status === 'PREPARING') && (
                  <ActionButton
                    label="Hủy"
                    onClick={() => handleActionClick(() => cancelOrder(order.id), 'Đơn hàng đã bị hủy')}
                    variant="danger"
                    size="sm"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
