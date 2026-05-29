import React, { useEffect } from 'react';
import { useOrder } from '../../context/OrderContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ActionButton } from '../../components/common/ActionButton';
import { FilterBar } from '../../components/common/FilterBar';
import { notifyError, notifySuccess } from '../../utils/notify';
import type { OrderStatus } from '../../types/restaurant';

export const RestaurantOrders: React.FC = () => {
  const { orders, loading, error, filters, loadOrders, setFilters, confirmOrder, startPreparing, markReady, cancelOrder, clearError } = useOrder();

  useEffect(() => {
    loadOrders().catch(() => {});
  }, []);

  useEffect(() => {
    if (error) {
      notifyError(error);
      clearError();
    }
  }, [error, clearError]);

  const handleStatusFilter = (status: OrderStatus) => {
    setFilters({ ...filters, status, page: 1 });
    loadOrders({ ...filters, status, page: 1 }).catch(() => {});
  };

  const handleActionClick = async (action: () => Promise<void>, message: string) => {
    try {
      await action();
      notifySuccess(message);
    } catch (err: any) {
      notifyError(err?.message || 'Có lỗi xảy ra');
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

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Không có đơn hàng</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm p-5 transition hover:shadow-md">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-900">Đơn #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('vi-VN')} {new Date(order.createdAt).toLocaleTimeString('vi-VN')}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 border-y border-slate-200">
                <div>
                  <p className="text-xs text-gray-500">Số món</p>
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

              <div className="flex flex-wrap gap-2 mt-3">
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
