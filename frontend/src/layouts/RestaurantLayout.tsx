import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  IconLayoutDashboard,
  IconPackage,
  IconToolsKitchen2,
  IconBuildingStore,
  IconClock,
  IconTicket,
  IconCoin,
  IconStar,
  IconLogout,
  IconMenu2,
  IconPizza,
  IconChevronLeft,
} from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';
import { useRestaurant } from '../context/RestaurantContext';
import { RestaurantProvider } from '../context/RestaurantContext';
import { OrderProvider } from '../context/OrderContext';
import { MenuProvider } from '../context/MenuContext';
import { DashboardProvider } from '../context/DashboardContext';
import type { RestaurantOperatingHour } from '../types/restaurant';

interface RestaurantLayoutProps {
  children: React.ReactNode;
}

const DAY_LABELS: Record<number, string> = {
  2: 'Thứ Hai',
  3: 'Thứ Ba',
  4: 'Thứ Tư',
  5: 'Thứ Năm',
  6: 'Thứ Sáu',
  7: 'Thứ Bảy',
  8: 'Chủ Nhật',
};

const getCurrentDayOfWeek = (date: Date) => {
  const day = date.getDay();
  return day === 0 ? 8 : day + 1;
};

const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}:00`;

const formatOperatingHours = (hour: RestaurantOperatingHour | undefined) => {
  if (!hour) {
    return 'Nghỉ cả ngày';
  }

  if (hour.openHour === 0 && hour.closeHour === 0) {
    return 'Nghỉ cả ngày';
  }

  if (hour.openHour === hour.closeHour) {
    return `${formatHour(hour.openHour)} - ${formatHour(hour.closeHour)}`;
  }

  const isOvernight = hour.closeHour < hour.openHour;
  return `${formatHour(hour.openHour)} - ${formatHour(hour.closeHour)}${isOvernight ? ' (qua đêm)' : ''}`;
};

const isOpenNow = (
  status: 'OPEN' | 'CLOSED' | undefined,
  hour: RestaurantOperatingHour | undefined,
  now: Date,
) => {
  if (status !== 'OPEN' || !hour) {
    return false;
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = hour.openHour * 60;
  const closeMinutes = hour.closeHour * 60;

  if (hour.closeHour > hour.openHour) {
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }

  if (hour.closeHour < hour.openHour) {
    return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  }

  return false;
};

const navItems = [
  { path: '/dashboard/home', label: 'Tổng quan', Icon: IconLayoutDashboard, color: '#fb923c' },
  { path: '/dashboard/orders', label: 'Đơn hàng', Icon: IconPackage, color: '#60a5fa' },
  { path: '/dashboard/menu', label: 'Menu', Icon: IconToolsKitchen2, color: '#34d399' },
  { path: '/dashboard/profile', label: 'Hồ sơ', Icon: IconBuildingStore, color: '#a78bfa' },
  { path: '/dashboard/operating-hours', label: 'Giờ hoạt động', Icon: IconClock, color: '#fbbf24' },
  { path: '/dashboard/vouchers', label: 'Khuyến mãi', Icon: IconTicket, color: '#f472b6' },
  { path: '/dashboard/revenue', label: 'Doanh thu', Icon: IconCoin, color: '#4ade80' },
  { path: '/dashboard/reviews', label: 'Đánh giá', Icon: IconStar, color: '#facc15' },
];

const RestaurantTopBar: React.FC = () => {
  const { restaurant, operatingHours, loadOperatingHours } = useRestaurant();
  const [time, setTime] = React.useState(new Date());
  const [hoursLoaded, setHoursLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    loadOperatingHours()
      .catch(() => {})
      .finally(() => setHoursLoaded(true));
  }, [loadOperatingHours]);

  const todayDayOfWeek = getCurrentDayOfWeek(time);
  const todayOperatingHour = operatingHours.find(hour => hour.dayOfWeek === todayDayOfWeek);
  const openNow = isOpenNow(restaurant?.status, todayOperatingHour, time);
  const isSelling = restaurant?.status === 'OPEN';
  const statusLabel = isSelling ? (openNow ? 'Trong giờ làm' : 'Ngoài giờ làm') : 'Ngừng bán';
  const statusColor = openNow ? 'text-emerald-700' : 'text-slate-500';
  const dotColor = openNow ? 'bg-emerald-500' : 'bg-slate-400';
  const todayHoursLabel = isSelling && hoursLoaded
    ? `${DAY_LABELS[todayDayOfWeek] ?? 'Hôm nay'}: ${formatOperatingHours(todayOperatingHour)}`
    : null;

  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/90 backdrop-blur-sm px-7 py-4 shadow-sm">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Xin chào,</p>
        <h2 className="mt-0.5 text-base font-bold text-slate-900 tracking-tight">
          {restaurant?.name || '—'}
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className={`relative flex h-2.5 w-2.5`}>
              {isSelling && openNow && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColor}`} />
            </span>
            <span className={`text-sm font-semibold ${statusColor}`}>
              {statusLabel}
            </span>
          </div>
          {todayHoursLabel && <p className="text-[11px] text-slate-400">{todayHoursLabel}</p>}
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div className="text-right">
          <p className="text-sm font-bold text-slate-900">
            {time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-[11px] text-slate-400">{time.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
        </div>
      </div>
    </div>
  );
};

export const RestaurantLayout: React.FC<RestaurantLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(true);

  return (
    <RestaurantProvider>
      <OrderProvider>
        <MenuProvider>
          <DashboardProvider>
            <div className="flex h-screen overflow-hidden bg-slate-100">
              {/* Sidebar */}
              <aside
                className={`relative flex flex-col shadow-2xl transition-[width] duration-300 ease-in-out ${open ? 'w-[220px]' : 'w-[64px]'}`}
                style={{
                  background: 'linear-gradient(165deg, #0f172a 0%, #1e1b4b 40%, #1a0a2e 100%)',
                }}
              >
                {/* Decorative glow blobs */}
                <div style={{
                  position: 'absolute', top: -40, left: -40, width: 160, height: 160,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(251,146,60,0.18) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: 80, right: -30, width: 120, height: 120,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                {/* Logo area */}
                <div className="flex items-center justify-between gap-2 p-3 border-b border-white/10">
                  {open && (
                    <div className="flex items-center gap-2.5">
                      <div style={{
                        width: 38, height: 38, borderRadius: 12,
                        background: 'linear-gradient(135deg, #f97316, #dc2626)',
                        boxShadow: '0 4px 14px rgba(249,115,22,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <IconPizza size={18} strokeWidth={2} color="#fff" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-white leading-tight">RestaurantHub</p>
                        <p className="text-[9px] text-white/40 font-medium uppercase tracking-wider">Dashboard</p>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/15 hover:text-white"
                    aria-label="Toggle sidebar"
                  >
                    {open ? <IconChevronLeft size={16} strokeWidth={2} /> : <IconMenu2 size={16} strokeWidth={2} />}
                  </button>
                </div>

                {/* Nav */}
                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2.5 pb-4">
                  {open && (
                    <p className="px-2 pt-2 pb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
                      Navigation
                    </p>
                  )}
                  {navItems.map(({ path, label, Icon, color }) => {
                    const isActive =
                      location.pathname === path ||
                      location.pathname.startsWith(path + '/');
                    return (
                      <Link
                        key={path}
                        to={path}
                        title={label}
                        className={`group relative flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[13px] font-medium transition-all duration-150 ${open ? 'justify-start' : 'justify-center'
                          }`}
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${color}22, ${color}12)`
                            : 'transparent',
                          color: isActive ? color : 'rgba(255,255,255,0.5)',
                          border: isActive ? `1px solid ${color}30` : '1px solid transparent',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                            (e.currentTarget as HTMLElement).style.color = '#fff';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                          }
                        }}
                      >
                        {/* Icon with colored bg when active */}
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all"
                          style={{
                            background: isActive ? `${color}25` : 'transparent',
                            color: isActive ? color : 'inherit',
                          }}
                        >
                          <Icon size={16} strokeWidth={isActive ? 2.2 : 1.75} />
                        </span>
                        {open && <span className="truncate">{label}</span>}
                        {open && isActive && (
                          <span
                            className="ml-auto h-1.5 w-1.5 rounded-full"
                            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                          />
                        )}
                        {/* Tooltip when collapsed */}
                        {!open && (
                          <span className="pointer-events-none absolute left-full ml-2 z-50 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 border border-white/10">
                            {label}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="border-t border-white/10 p-2.5">
                  {open && user?.email && (
                    <div className="mb-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold">Tài khoản</p>
                      <p className="mt-0.5 truncate text-[12px] text-white/70">{user.email}</p>
                    </div>
                  )}
                  <button
                    onClick={() => logout()}
                    className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-[13px] font-medium transition-all ${open ? 'justify-start' : 'justify-center'
                      } text-rose-400/70 hover:bg-rose-500/10 hover:text-rose-300 border border-transparent hover:border-rose-500/20`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                      <IconLogout size={16} strokeWidth={1.75} />
                    </span>
                    {open && <span>Đăng xuất</span>}
                  </button>
                </div>
              </aside>

              {/* Main */}
              <main className="flex min-h-screen flex-1 flex-col overflow-hidden">
                <RestaurantTopBar />
                <div className="flex-1 overflow-y-auto bg-slate-50 p-6 pt-5.5 md:p-7 md:pt-4">{children}</div>
              </main>
            </div>
          </DashboardProvider>
        </MenuProvider>
      </OrderProvider>
    </RestaurantProvider>
  );
};

