import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getHomePathForRole } from '../utils/role';

export default function PublicLayout() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="layout">
      <header className="layout-header">
        <Link to="/" className="brand">
          Food Delivery
        </Link>
        <nav className="button-row" style={{ marginTop: 0 }}>
          {isAuthenticated && user ? (
            <Link className="btn btn-primary" to={getHomePathForRole(user.role)}>
              Vào khu vực của tôi
            </Link>
          ) : (
            <Link className="btn btn-primary" to="/login">
              Đăng nhập
            </Link>
          )}
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
