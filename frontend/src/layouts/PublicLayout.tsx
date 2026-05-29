import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getHomePathForRole } from '../utils/role';

export default function PublicLayout() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex flex-col gap-4 px-6 py-5 bg-white border-b border-slate-200 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <Link to="/lightFood" className="text-2xl font-semibold text-slate-900">
          lightFood
        </Link>

        <div className="flex flex-wrap gap-3">
          {isAuthenticated && user ? (
            <Link
              className="inline-flex items-center rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
              to={getHomePathForRole(user.role)}
            >
              Vào khu vực của tôi
            </Link>
          ) : (
            <>
              <Link
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-700"
                to="/register"
              >
                Đăng ký
              </Link>
              <Link
                className="inline-flex items-center rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
                to="/login"
              >
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}