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
} from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';
import { useRestaurant } from '../context/RestaurantContext';
import { RestaurantProvider } from '../context/RestaurantContext';
import { OrderProvider } from '../context/OrderContext';
import { MenuProvider } from '../context/MenuContext';
import { DashboardProvider } from '../context/DashboardContext';

interface RestaurantLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/dashboard/home', label: 'Tổng quan', Icon: IconLayoutDashboard },
  { path: '/dashboard/orders', label: 'Đơn hàng', Icon: IconPackage },
  { path: '/dashboard/menu', label: 'Menu', Icon: IconToolsKitchen2 },
  { path: '/dashboard/profile', label: 'Hồ sơ', Icon: IconBuildingStore },
  { path: '/dashboard/operating-hours', label: 'Giờ hoạt động', Icon: IconClock },
  { path: '/dashboard/vouchers', label: 'Khuyến mãi', Icon: IconTicket },
  { path: '/dashboard/revenue', label: 'Doanh thu', Icon: IconCoin },
  { path: '/dashboard/reviews', label: 'Đánh giá', Icon: IconStar },
];

const RestaurantTopBar: React.FC = () => {
  const { restaurant } = useRestaurant();

  return (
    <div
      style={{
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        padding: '14px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}
    >
      <div>
        <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 2px' }}>Xin chào,</p>
        <h2 style={{ fontSize: 17, fontWeight: 600, color: '#111827', margin: 0 }}>
          {restaurant?.name || '—'}
        </h2>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 2px' }}>
          {new Date().toLocaleDateString('vi-VN')}
        </p>
        <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
          {new Date().toLocaleTimeString('vi-VN')}
        </p>
      </div>
    </div>
  );
};

export const RestaurantLayout: React.FC<RestaurantLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <RestaurantProvider>
      <OrderProvider>
        <MenuProvider>
          <DashboardProvider>
            <div style={{ display: 'flex', height: '100vh', background: '#f3f4f6', overflow: 'hidden' }}>

              {/* ── Sidebar ── */}
              <div
                style={{
                  width: sidebarOpen ? 240 : 64,
                  background: '#111827',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'width 0.25s ease',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {/* Logo row */}
                <div
                  style={{
                    padding: '16px 12px',
                    borderBottom: '1px solid #1f2937',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: sidebarOpen ? 'space-between' : 'center',
                    minHeight: 60,
                  }}
                >
                  {sidebarOpen && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <IconPizza size={22} strokeWidth={1.75} color="#f97316" />
                      <span style={{ fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap' }}>RestaurantHub</span>
                    </div>
                  )}
                  <button
                    onClick={() => setSidebarOpen(v => !v)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      padding: 4,
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    aria-label="Toggle sidebar"
                  >
                    <IconMenu2 size={20} strokeWidth={1.75} />
                  </button>
                </div>

                {/* Nav links */}
                <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {navItems.map(({ path, label, Icon }) => {
                    const isActive = location.pathname === path;
                    return (
                      <Link
                        key={path}
                        to={path}
                        title={label}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: sidebarOpen ? '10px 12px' : '10px 0',
                          justifyContent: sidebarOpen ? 'flex-start' : 'center',
                          borderRadius: 8,
                          textDecoration: 'none',
                          fontSize: 14,
                          fontWeight: isActive ? 600 : 400,
                          background: isActive ? '#2563eb' : 'transparent',
                          color: isActive ? '#fff' : '#9ca3af',
                          transition: 'background 0.15s, color 0.15s',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }}
                        onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = '#1f2937'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                        onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#9ca3af'; } }}
                      >
                        <Icon size={18} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                        {sidebarOpen && <span>{label}</span>}
                      </Link>
                    );
                  })}
                </nav>

                {/* Logout */}
                <div style={{ padding: '12px 8px', borderTop: '1px solid #1f2937' }}>
                  <button
                    onClick={() => logout()}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: sidebarOpen ? 'flex-start' : 'center',
                      gap: 8,
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: 'none',
                      background: 'transparent',
                      color: '#f87171',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 500,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1f2937'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    <IconLogout size={18} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                    {sidebarOpen && <span>Đăng xuất</span>}
                  </button>
                  {sidebarOpen && (
                    <p style={{ fontSize: 11, color: '#6b7280', marginTop: 8, paddingLeft: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user?.email}
                    </p>
                  )}
                </div>
              </div>

              {/* ── Main area ── */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
                {/* Top bar */}
                <RestaurantTopBar />

                {/* Page content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
                  {children}
                </div>
              </div>

            </div>
          </DashboardProvider>
        </MenuProvider>
      </OrderProvider>
    </RestaurantProvider>
  );
};