import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRoleLabel } from '../utils/role';

export default function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <header className="dashboard-header">
        <div>
          <div className="brand">Food Delivery</div>
          {user && (
            <div className="muted">
              {user.email} · {getRoleLabel(user.role)}
            </div>
          )}
        </div>
        <div className="button-row" style={{ marginTop: 0 }}>
          <Link className="btn btn-secondary" to="/">
            Trang công khai
          </Link>
          <button type="button" className="btn btn-secondary" onClick={() => logout()}>
            Đăng xuất
          </button>
        </div>
      </header>
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
