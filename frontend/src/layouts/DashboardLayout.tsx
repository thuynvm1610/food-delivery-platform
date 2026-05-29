import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRoleLabel } from '../utils/role';

export default function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex flex-col gap-4 px-6 py-5 bg-white border-b border-slate-200 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xl font-semibold text-slate-900">Food Delivery</div>
          {user && (
            <div className="text-sm text-slate-500">
              {user.email} · {getRoleLabel(user.role)}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-700"
            to="/"
          >
            Trang công khai
          </Link>
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-700"
            onClick={() => logout()}
          >
            Đăng xuất
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
