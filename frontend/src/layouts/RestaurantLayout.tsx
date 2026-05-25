import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RestaurantProvider } from '../context/RestaurantContext';
import { OrderProvider } from '../context/OrderContext';
import { MenuProvider } from '../context/MenuContext';
import { DashboardProvider } from '../context/DashboardContext';

interface RestaurantLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/dashboard/home', label: '📊 Tổng quan', icon: '📊' },
  { path: '/dashboard/orders', label: '📦 Đơn hàng', icon: '📦' },
  { path: '/dashboard/menu', label: '🍽️ Menu', icon: '🍽️' },
  { path: '/dashboard/profile', label: '🏪 Hồ sơ', icon: '🏪' },
  { path: '/dashboard/operating-hours', label: '⏰ Giờ hoạt động', icon: '⏰' },
  { path: '/dashboard/vouchers', label: '🎟️ Khuyến mãi', icon: '🎟️' },
  { path: '/dashboard/revenue', label: '💰 Doanh thu', icon: '💰' },
  { path: '/dashboard/reviews', label: '⭐ Đánh giá', icon: '⭐' },
];

export const RestaurantLayout: React.FC<RestaurantLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <RestaurantProvider>
      <OrderProvider>
        <MenuProvider>
          <DashboardProvider>
            <div className="flex h-screen bg-gray-100">
              {/* Sidebar */}
              <div
                className={`${
                  sidebarOpen ? 'w-64' : 'w-20'
                } bg-gray-900 text-white transition-all duration-300 flex flex-col overflow-hidden`}
              >
                {/* Logo */}
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                  {sidebarOpen && <h1 className="font-bold text-xl">🍕 RestaurantHub</h1>}
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1 hover:bg-gray-800 rounded"
                  >
                    ☰
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                  {navItems.map(item => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-4 py-3 rounded transition ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                        title={item.label}
                      >
                        {sidebarOpen ? (
                          <span>{item.label}</span>
                        ) : (
                          <span className="text-xl">{item.icon}</span>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-gray-800">
                  <button
                    onClick={() => logout()}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
                  >
                    {sidebarOpen ? '🚪 Đăng xuất' : '🚪'}
                  </button>
                  {sidebarOpen && (
                    <p className="text-xs text-gray-400 mt-2 truncate">{user?.email}</p>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Xin chào,</p>
                      <h2 className="text-xl font-bold text-gray-900">{user?.firstName || user?.email}</h2>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{new Date().toLocaleDateString('vi-VN')}</p>
                        <p className="text-sm text-gray-500">{new Date().toLocaleTimeString('vi-VN')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-8">
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
