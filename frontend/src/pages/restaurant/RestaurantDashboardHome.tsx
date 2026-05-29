import React, { useEffect } from 'react';
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
  IconAlertTriangle,
  IconLoader2,
  
} from '@tabler/icons-react';
import { useDashboard } from '../../context/DashboardContext';
import { useOrder } from '../../context/OrderContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { notifyError } from '../../utils/notify';

const HEADING_FONT = "'Sora', sans-serif";

const Skeleton: React.FC<{ h?: number; r?: number }> = ({ h = 120, r = 16 }) => (
  <div style={{
    height: h, borderRadius: r,
    background: 'linear-gradient(90deg, #f1f5f9 25%, #f8fafc 50%, #f1f5f9 75%)',
    backgroundSize: '200% 100%',
    animation: 'dash-shimmer 1.4s infinite',
  }} />
);

export const RestaurantDashboardHome: React.FC = () => {
  const { stats, loading, error, loadStats, clearError } = useDashboard();
  const { restaurant } = useRestaurant();
  const { orders } = useOrder();

  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const cancelRate = stats ? Math.round(stats.cancelRate) : 0;
  const CIRCUMFERENCE = 201;
  const dashOffset = CIRCUMFERENCE - (cancelRate / 100) * CIRCUMFERENCE;

  useEffect(() => {
    if (error) { notifyError(error); clearError(); }
  }, [error, clearError]);

  useEffect(() => {
    loadStats().catch(() => {
      // Error handling is done in the callback above.
    });
  }, [loadStats]);

  return (
    <div className="flex flex-col gap-5 font-sans">
      <style>{`
        @keyframes dash-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.9); opacity: 0.8; }
          70%  { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .kpi-card { transition: box-shadow 0.2s, transform 0.2s; }
        .kpi-card:hover { box-shadow: 0 10px 28px rgba(0,0,0,0.10) !important; transform: translateY(-3px); }
        .revenue-card { transition: box-shadow 0.2s, transform 0.2s; }
        .revenue-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.09) !important; transform: translateY(-2px); }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, animation: 'fade-up 0.35s ease both' }}>
        <div>
          <h1 style={{fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.6px' }}>
            Tổng quan kinh doanh
          </h1>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 16px', borderRadius: 999,
          fontSize: 13, fontWeight: 700,
          border: '1.5px solid',
          backdropFilter: 'blur(8px)',
          ...(restaurant?.status === 'OPEN'
            ? { background: 'rgba(16,185,129,0.08)', color: '#059669', borderColor: 'rgba(16,185,129,0.25)' }
            : { background: 'rgba(239,68,68,0.07)', color: '#dc2626', borderColor: 'rgba(239,68,68,0.2)' }),
        }}>
          <span style={{ position: 'relative', display: 'inline-flex', width: 9, height: 9 }}>
            {restaurant?.status === 'OPEN' && (
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: '#10b981', opacity: 0.6,
                animation: 'pulse-ring 1.8s ease-out infinite',
              }} />
            )}
            <span style={{
              position: 'relative', width: 9, height: 9, borderRadius: '50%',
              background: restaurant?.status === 'OPEN' ? '#10b981' : '#ef4444',
            }} />
          </span>
          {restaurant?.status === 'OPEN' ? 'Đang mở cửa' : 'Đã đóng cửa'}
        </div>
      </div>

      {/* Pending alert */}
      {pendingOrders > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 18px',
          borderRadius: 14,
          background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
          border: '1px solid rgba(59,130,246,0.25)',
          borderLeft: '4px solid #3b82f6',
          animation: 'fade-up 0.4s ease 0.1s both',
          boxShadow: '0 2px 12px rgba(59,130,246,0.1)',
        }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
            <IconBell size={16} strokeWidth={2} />
          </div>
          <p style={{ fontSize: 13, color: '#1e40af', margin: 0, fontWeight: 500 }}>
            Có <strong style={{ fontWeight: 800 }}>{pendingOrders}</strong> đơn hàng đang chờ xác nhận
          </p>
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, animation: 'fade-up 0.4s ease 0.15s both' }}>
        {loading
          ? Array(5).fill(0).map((_, i) => <Skeleton key={i} h={108} />)
          : stats && [
            { label: 'Tổng đơn', value: stats.totalOrders.toLocaleString('vi-VN'), icon: <IconPackage size={17} strokeWidth={1.75} />, accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)', glow: 'rgba(59,130,246,0.15)' },
            { label: 'Thành công', value: stats.successfulOrders.toLocaleString('vi-VN'), icon: <IconCircleCheck size={17} strokeWidth={1.75} />, accent: '#10b981', bg: 'rgba(16,185,129,0.08)', glow: 'rgba(16,185,129,0.15)' },
            { label: 'Đơn hủy', value: stats.cancelledOrders.toLocaleString('vi-VN'), icon: <IconCircleX size={17} strokeWidth={1.75} />, accent: '#ef4444', bg: 'rgba(239,68,68,0.08)', glow: 'rgba(239,68,68,0.12)' },
            { label: 'Đang xử lý', value: stats.inProgressOrders.toLocaleString('vi-VN'), icon: <IconLoader2 size={17} strokeWidth={1.75} />, accent: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', glow: 'rgba(139,92,246,0.12)' },
            { label: 'Doanh thu', value: `${(stats.totalRevenue / 1_000_000).toFixed(1)}tr₫`, icon: <IconCurrencyDong size={17} strokeWidth={1.75} />, accent: '#f97316', bg: 'rgba(249,115,22,0.08)', glow: 'rgba(249,115,22,0.15)' },
          ].map((card, i) => (
            <MiniStatCard key={i} {...card} />
          ))}
      </div>

      {/* Revenue row */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, animation: 'fade-up 0.4s ease 0.2s both' }}>
          <RevenueCard label="Doanh thu hôm nay" value={stats.todayRevenue.toLocaleString('vi-VN') + '₫'} icon={<IconSun size={15} strokeWidth={1.75} />} color="#f97316" bg="linear-gradient(135deg, #fff7ed, #ffedd5)" border="rgba(249,115,22,0.2)" />
          <RevenueCard label="Doanh thu tháng" value={stats.monthlyRevenue.toLocaleString('vi-VN') + '₫'} icon={<IconCalendarMonth size={15} strokeWidth={1.75} />} color="#3b82f6" bg="linear-gradient(135deg, #eff6ff, #dbeafe)" border="rgba(59,130,246,0.2)" />
        </div>
      )}

      {/* Top Dishes + Cancel Rate */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, animation: 'fade-up 0.4s ease 0.25s both' }}>
          {stats.topDishes.length > 0 && (
            <div style={cardStyle}>
              <SectionTitle icon={<IconFlame size={15} strokeWidth={1.75} color="#f97316" />} label="Món bán chạy" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {stats.topDishes.map((dish, idx) => (
                  <div key={dish.dishId} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 10px', borderRadius: 10,
                    background: idx === 0 ? 'rgba(249,115,22,0.05)' : 'transparent',
                    transition: 'background 0.15s',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.03)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = idx === 0 ? 'rgba(249,115,22,0.05)' : 'transparent'}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 800,
                      background: idx === 0 ? 'linear-gradient(135deg, #f97316, #dc2626)' : idx === 1 ? 'rgba(249,115,22,0.12)' : '#f1f5f9',
                      color: idx < 2 ? (idx === 0 ? '#fff' : '#f97316') : '#94a3b8',
                    }}>
                      {idx + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dish.dishName}</p>
                      <p style={{ fontSize: 10, color: '#94a3b8', margin: '1px 0 0', fontWeight: 500 }}>{dish.soldCount} phần</p>
                    </div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#f97316', margin: 0, whiteSpace: 'nowrap' }}>{dish.revenue.toLocaleString('vi-VN')}₫</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={cardStyle}>
            <SectionTitle icon={<IconChartDonut size={15} strokeWidth={1.75} color="#8b5cf6" />} label="Tỷ lệ hủy đơn" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '6px 0' }}>
              <div style={{ position: 'relative', width: 88, height: 88, flexShrink: 0 }}>
                <svg width="88" height="88" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="32" stroke="#f1f5f9" strokeWidth="8" />
                  <circle
                    cx="40" cy="40" r="32"
                    stroke={cancelRate > 10 ? '#ef4444' : '#10b981'}
                    strokeWidth="8"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                    style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)' }}
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: cancelRate > 10 ? '#ef4444' : '#10b981', fontFamily: HEADING_FONT, lineHeight: 1 }}>{cancelRate}%</span>
                </div>
              </div>
              <div>
                {cancelRate > 10 ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#dc2626', fontWeight: 700, fontSize: 12, marginBottom: 5 }}>
                      <IconAlertTriangle size={13} strokeWidth={2} /> Tỷ lệ hủy cao
                    </div>
                    <p style={{ fontSize: 11, color: '#64748b', margin: 0, lineHeight: 1.6 }}>Kiểm tra lại quy trình xác nhận và thời gian chuẩn bị.</p>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#059669', fontWeight: 700, fontSize: 12, marginBottom: 5 }}>
                      <IconCircleCheck size={13} strokeWidth={2} /> Mức bình thường
                    </div>
                    <p style={{ fontSize: 11, color: '#64748b', margin: 0, lineHeight: 1.6 }}>Tiếp tục duy trì chất lượng dịch vụ tốt nhé!</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MiniStatCard: React.FC<{ label: string; value: string; icon: React.ReactNode; accent: string; bg: string; glow: string }> = ({ label, value, icon, accent, bg, glow }) => (
  <div className="kpi-card" style={{
    background: '#ffffff',
    borderRadius: 14, padding: '14px 16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: accent, opacity: 0.7, borderRadius: '14px 14px 0 0' }} />
    <div style={{ position: 'absolute', top: -20, right: -20, width: 70, height: 70, borderRadius: '50%', background: glow, filter: 'blur(20px)', pointerEvents: 'none' }} />
    <div style={{ width: 34, height: 34, borderRadius: 10, background: bg, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
      {icon}
    </div>
    <p style={{ fontSize: 10, color: '#94a3b8', margin: '0 0 3px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</p>
    <p style={{ fontSize: 19, fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Sora', sans-serif", letterSpacing: '-0.5px' }}>{value}</p>
  </div>
);

const RevenueCard: React.FC<{ label: string; value: string; icon: React.ReactNode; color: string; bg: string; border: string }> = ({ label, value, icon, color, bg, border }) => (
  <div className="revenue-card" style={{ ...cardStyle, background: bg, border: `1px solid ${border}`, boxShadow: 'none' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color, fontSize: 12, fontWeight: 700, margin: '0 0 8px' }}>
      {icon} {label}
    </div>
    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800, color, margin: 0, letterSpacing: '-0.5px' }}>{value}</p>
  </div>
);

const SectionTitle: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
    {icon}
    <span style={{ fontSize: 13, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.2px' }}>{label}</span>
  </div>
);

const cardStyle: React.CSSProperties = {
  height: 'fit-content',
  background: '#ffffff',
  border: '1px solid #f1f5f9',
  borderRadius: 14,
  padding: '18px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
};
