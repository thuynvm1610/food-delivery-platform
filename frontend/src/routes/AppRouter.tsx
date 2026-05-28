import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import { RestaurantLayout } from '../layouts/RestaurantLayout';
import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import CustomerHomePage from '../pages/customer/CustomerHomePage';
import DriverHomePage from '../pages/driver/DriverHomePage';
import AdminHomePage from '../pages/admin/AdminHomePage';
import { RestaurantDashboardHome } from '../pages/restaurant/RestaurantDashboardHome';
import { RestaurantOrders } from '../pages/restaurant/RestaurantOrders';
import { RestaurantMenu } from '../pages/restaurant/RestaurantMenu';
import { RestaurantProfile } from '../pages/restaurant/RestaurantProfile';
import { RestaurantOperatingHours } from '../pages/restaurant/RestaurantOperatingHours';
import { RestaurantVouchers } from '../pages/restaurant/RestaurantVouchers';
import { RestaurantRevenue } from '../pages/restaurant/RestaurantRevenue';
import { RestaurantReviews } from '../pages/restaurant/RestaurantReviews';
import { RestaurantDishForm } from '../pages/restaurant/RestaurantDishForm';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Navigate to="/lightFood" replace />} />
        <Route path="lightFood" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Customer, Driver, Admin Dashboard */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/customer"
          element={
            <RoleRoute allowedRoles={['ROLE_CUSTOMER']}>
              <CustomerHomePage />
            </RoleRoute>
          }
        />
        <Route
          path="/driver"
          element={
            <RoleRoute allowedRoles={['ROLE_DRIVER']}>
              <DriverHomePage />
            </RoleRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={['ROLE_ADMIN']}>
              <AdminHomePage />
            </RoleRoute>
          }
        />
      </Route>

      {/* Restaurant Dashboard */}
      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={['ROLE_RESTAURANT']}>
              <RestaurantLayout>
                <Routes>
                  <Route path="home" element={<RestaurantDashboardHome />} />
                  <Route path="orders" element={<RestaurantOrders />} />
                  <Route path="menu" element={<RestaurantMenu />} />
                  <Route path="menu/create" element={<RestaurantDishForm />} />
                  <Route path="menu/edit/:id" element={<RestaurantDishForm />} />
                  <Route path="profile" element={<RestaurantProfile />} />
                  <Route path="operating-hours" element={<RestaurantOperatingHours />} />
                  <Route path="vouchers" element={<RestaurantVouchers />} />
                  <Route path="revenue" element={<RestaurantRevenue />} />
                  <Route path="reviews" element={<RestaurantReviews />} />
                  <Route path="*" element={<Navigate to="home" replace />} />
                </Routes>
              </RestaurantLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
        path="/dashboard/*"
      />

      <Route path="*" element={<Navigate to="/lightFood" replace />} />
    </Routes>
  );
}
