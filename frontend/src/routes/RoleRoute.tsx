import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';
import { getHomePathForRole } from '../utils/role';

interface RoleRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export default function RoleRoute({ allowedRoles, children }: RoleRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/lightFood" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={getHomePathForRole(user.role)} replace />;
  }

  return <>{children}</>;
}
