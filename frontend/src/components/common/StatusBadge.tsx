import React from 'react';
import type { OrderStatus } from '../../types/restaurant';

const statusConfig: Record<OrderStatus, {
  bg: string; text: string; border: string; dot: string; label: string;
}> = {
  PENDING: {
    bg: 'rgba(245,158,11,0.10)',
    text: '#92400e',
    border: 'rgba(245,158,11,0.25)',
    dot: '#f59e0b',
    label: 'Chờ xác nhận',
  },
  CONFIRMED: {
    bg: 'rgba(59,130,246,0.10)',
    text: '#1e40af',
    border: 'rgba(59,130,246,0.25)',
    dot: '#3b82f6',
    label: 'Đã xác nhận',
  },
  PREPARING: {
    bg: 'rgba(232,93,4,0.10)',
    text: '#9a3412',
    border: 'rgba(232,93,4,0.25)',
    dot: '#e85d04',
    label: 'Đang nấu',
  },
  READY_FOR_PICKUP: {
    bg: 'rgba(4,120,87,0.10)',
    text: '#065f46',
    border: 'rgba(4,120,87,0.25)',
    dot: '#047857',
    label: 'Sẵn sàng lấy',
  },
  CANCELLED_BY_RESTAURANT: {
    bg: 'rgba(220,38,38,0.10)',
    text: '#991b1b',
    border: 'rgba(220,38,38,0.25)',
    dot: '#dc2626',
    label: 'Đã hủy',
  },
  COMPLETED: {
    bg: 'rgba(107,114,128,0.10)',
    text: '#374151',
    border: 'rgba(107,114,128,0.2)',
    dot: '#9ca3af',
    label: 'Hoàn thành',
  },
};

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const cfg = statusConfig[status];
  const padding = size === 'sm' ? '2px 8px' : size === 'lg' ? '6px 14px' : '3px 10px';
  const fontSize = size === 'sm' ? 11 : size === 'lg' ? 14 : 12;
  const dotSize = size === 'sm' ? 5 : size === 'lg' ? 8 : 6;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding,
        borderRadius: 999,
        fontSize,
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.text,
        border: `1px solid ${cfg.border}`,
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: 'nowrap',
        letterSpacing: '0.01em',
      }}
    >
      <span style={{
        width: dotSize, height: dotSize,
        borderRadius: '50%',
        background: cfg.dot,
        flexShrink: 0,
        boxShadow: `0 0 0 2px ${cfg.dot}30`,
      }} />
      {cfg.label}
    </span>
  );
};