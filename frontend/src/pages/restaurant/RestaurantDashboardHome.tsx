import React from 'react';
import {
  IconPackage,
  IconCircleCheck,
  IconCircleX,
  IconCurrencyDong,
  IconSun,
  IconCalendarMonth,
  IconFlame,
  IconChartDonut,
  IconBell,
  IconTrendingUp,
  IconTrendingDown,
  IconAlertTriangle,
  IconLoader2,
} from '@tabler/icons-react';
import { useDashboard } from '../../context/DashboardContext';
import { useOrder } from '../../context/OrderContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { Toast } from '../../components/common/Toast';

export const RestaurantDashboardHome: React.FC = () => {
  const { stats, loading, error, clearError } = useDashboard();
  const { restaurant } = useRestaurant();
  const { orders } = useOrder();

  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const cancelRate = stats ? Math.round(stats.cancelRate) : 0;
  // SVG donut: r=32, circumference ≈ 201
  const CIRCUMFERENCE = 201;
  const dashOffset = CIRCUMFERENCE - (cancelRate / 100) * CIRCUMFERENCE;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>
            {restaurant?.name ?? '—'}
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Tổng quan kinh doanh</p>
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 500,
            border: '1px solid',
            ...(restaurant?.status === 'OPEN'
              ? { background: '#EAF3DE', color: '#27500A', borderColor: '#97C459' }
              : { background: '#FCEBEB', color: '#791F1F', borderColor: '#F09595' }),
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: restaurant?.status === 'OPEN' ? '#639922' : '#E24B4A',
              flexShrink: 0,
            }}
          />
          {restaurant?.status === 'OPEN' ? 'Đang mở cửa' : 'Đã đóng cửa'}
        </span>
      </div>

      {/* Pending alert */}
      {pendingOrders > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            background: '#E6F1FB',
            borderLeft: '3px solid #185FA5',
            borderRadius: '0 8px 8px 0',
            fontSize: '14px',
            color: '#0C447C',
          }}
        >
          <IconBell size={18} strokeWidth={1.75} />
          Có <strong style={{ margin: '0 3px' }}>{pendingOrders}</strong> đơn hàng đang chờ xác nhận
        </div>
      )}

      {error && <Toast message={error} type="error" onClose={clearError} />}

      {/* KPI Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
        {loading
          ? Array(4).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                height: 120,
                borderRadius: '8px',
                background: '#e5e7eb',
                animation: 'pulse 1.5s infinite',
              }}
            />
          ))
          : stats && (
            <>
              <StatCard
                label="Tổng đơn hàng"
                value={stats.totalOrders.toLocaleString('vi-VN')}
                icon={<IconPackage size={20} strokeWidth={1.75} />}
                iconBg="#E6F1FB"
                iconColor="#185FA5"
              />
              <StatCard
                label="Thành công"
                value={stats.successfulOrders.toLocaleString('vi-VN')}
                icon={<IconCircleCheck size={20} strokeWidth={1.75} />}
                iconBg="#EAF3DE"
                iconColor="#3B6D11"
              />
              <StatCard
                label="Đơn hủy"
                value={stats.cancelledOrders.toLocaleString('vi-VN')}
                icon={<IconCircleX size={20} strokeWidth={1.75} />}
                iconBg="#FCEBEB"
                iconColor="#A32D2D"
              />
              <StatCard
                label="Đang xử lý"
                value={stats.inProgressOrders.toLocaleString('vi-VN')}
                icon={<IconLoader2 size={20} strokeWidth={1.75} />}
                iconBg="#EEF2FF"
                iconColor="#3730A3"
              />
              <StatCard
                label="Tổng doanh thu"
                value={`${(stats.totalRevenue / 1_000_000).toFixed(1)}tr₫`}
                icon={<IconCurrencyDong size={20} strokeWidth={1.75} />}
                iconBg="#FAEEDA"
                iconColor="#633806"
              />
            </>
          )}
      </div>

      {/* Revenue summary */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={cardStyle}>
            <p style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
              <IconSun size={16} strokeWidth={1.75} color="#BA7517" /> Doanh thu hôm nay
            </p>
            <p style={{ fontSize: '24px', fontWeight: 600, margin: 0, color: '#3B6D11' }}>
              {stats.todayRevenue.toLocaleString('vi-VN')}₫
            </p>
          </div>
          <div style={cardStyle}>
            <p style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
              <IconCalendarMonth size={16} strokeWidth={1.75} color="#185FA5" /> Doanh thu tháng
            </p>
            <p style={{ fontSize: '24px', fontWeight: 600, margin: 0, color: '#185FA5' }}>
              {stats.monthlyRevenue.toLocaleString('vi-VN')}₫
            </p>
          </div>
        </div>
      )}

      {/* Top Dishes */}
      {stats && stats.topDishes.length > 0 && (
        <div style={cardStyle}>
          <p style={{ ...sectionTitleStyle }}>
            <IconFlame size={18} strokeWidth={1.75} color="#D85A30" />
            Món ăn bán chạy
          </p>
          <div>
            {stats.topDishes.map((dish, idx) => (
              <div
                key={dish.dishId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  borderBottom: idx < stats.topDishes.length - 1 ? '1px solid #f3f4f6' : 'none',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    flexShrink: 0,
                    ...(idx < 2
                      ? { background: '#FAEEDA', color: '#633806' }
                      : { background: '#f3f4f6', color: '#6b7280' }),
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {dish.dishName}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{dish.soldCount} phần đã bán</p>
                </div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#374151', margin: 0, whiteSpace: 'nowrap' }}>
                  {dish.revenue.toLocaleString('vi-VN')}₫
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cancel Rate */}
      {stats && (
        <div style={cardStyle}>
          <p style={sectionTitleStyle}>
            <IconChartDonut size={18} strokeWidth={1.75} color="#185FA5" />
            Tỷ lệ hủy đơn
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="32" stroke="#f3f4f6" strokeWidth="10" />
                <circle
                  cx="40" cy="40" r="32"
                  stroke={cancelRate > 10 ? '#F09595' : '#97C459'}
                  strokeWidth="10"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#111827',
                }}
              >
                {cancelRate}%
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
              {cancelRate > 10 ? (
                <>
                  <p style={{ margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 6, color: '#A32D2D', fontWeight: 500 }}>
                    <IconAlertTriangle size={15} strokeWidth={1.75} /> Tỷ lệ hủy hơi cao
                  </p>
                  <p style={{ margin: 0, fontSize: '13px' }}>Kiểm tra lại quy trình xác nhận đơn và thời gian chuẩn bị.</p>
                </>
              ) : (
                <>
                  <p style={{ margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 6, color: '#3B6D11', fontWeight: 500 }}>
                    <IconCircleCheck size={15} strokeWidth={1.75} /> Tỷ lệ hủy ở mức bình thường
                  </p>
                  <p style={{ margin: 0, fontSize: '13px' }}>Tiếp tục duy trì chất lượng dịch vụ tốt.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Sub-components ─── */

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  trend?: { value: number; direction: 'up' | 'down' };
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, iconBg, iconColor, trend }) => (
  <div
    style={{
      background: '#f9fafb',
      borderRadius: '8px',
      padding: '16px',
      border: '1px solid #f3f4f6',
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: '8px',
        background: iconBg,
        color: iconColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
      }}
    >
      {icon}
    </div>
    <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px' }}>{label}</p>
    <p style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: 0 }}>{value}</p>
    {trend && (
      <p
        style={{
          fontSize: '12px',
          margin: '4px 0 0',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          color: trend.direction === 'up' ? '#3B6D11' : '#A32D2D',
        }}
      >
        {trend.direction === 'up'
          ? <IconTrendingUp size={13} strokeWidth={2} />
          : <IconTrendingDown size={13} strokeWidth={2} />}
        {trend.value}%
      </p>
    )}
  </div>
);

/* ─── Shared styles ─── */

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '20px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#6b7280',
  margin: '0 0 8px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 600,
  color: '#111827',
  margin: '0 0 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};