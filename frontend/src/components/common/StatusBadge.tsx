import React from 'react';
import type { OrderStatus } from '../../types/restaurant';

const statusConfig: Record<OrderStatus, { bg: string; text: string; label: string }> = {
  PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ xác nhận' },
  CONFIRMED: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Đã xác nhận' },
  PREPARING: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Đang nấu' },
  READY_FOR_PICKUP: { bg: 'bg-green-100', text: 'text-green-800', label: 'Sẵn sàng lấy' },
  CANCELLED_BY_RESTAURANT: { bg: 'bg-red-100', text: 'text-red-800', label: 'Hủy' },
  COMPLETED: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Hoàn thành' },
};

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = statusConfig[status];
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : size === 'lg' ? 'px-4 py-2 text-base' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-block rounded-full font-semibold ${sizeClass} ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};
