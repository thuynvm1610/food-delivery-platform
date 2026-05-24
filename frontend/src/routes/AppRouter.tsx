import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import CustomerHomePage from '../pages/customer/CustomerHomePage';
import DriverHomePage from '../pages/driver/DriverHomePage';
import RestaurantHomePage from '../pages/restaurant/RestaurantHomePage';
import AdminHomePage from '../pages/admin/AdminHomePage';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

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
          path="/restaurant"
          element={
            <RoleRoute allowedRoles={['ROLE_RESTAURANT']}>
              <RestaurantHomePage />
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
