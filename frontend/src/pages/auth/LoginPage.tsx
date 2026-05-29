import { FormEvent, useState } from 'react';
import { isAxiosError } from 'axios';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getHomePathForRole } from '../../utils/role';
import { notifyError } from '../../utils/notify';

export default function LoginPage() {
  const { login, isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: string; email?: string; message?: string } | null;
  const [email, setEmail] = useState(state?.email ?? 'customer1@gmail.com');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-slate-500">
        Đang khôi phục phiên đăng nhập...
      </div>
    );
  }

  if (isAuthenticated && user) {
    return <Navigate to={getHomePathForRole(user.role)} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const sessionUser = await login(email, password);
      navigate(getHomePathForRole(sessionUser.role), { replace: true });
    } catch (err) {
      const message = isAxiosError(err)
        ? err.response?.data?.message ?? 'Đăng nhập thất bại'
        : 'Đăng nhập thất bại';
      void notifyError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <form
        className="w-full max-w-md space-y-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
        onSubmit={handleSubmit}
      >
        <span className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
          Đăng nhập
        </span>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Chào mừng trở lại</h1>
          <p className="text-slate-600">Cookie HttpOnly sẽ được backend tự set sau khi xác thực thành công.</p>
        </div>

        {state?.message && (
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {state.message}
          </div>
        )}

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </label>
        </div>

        <button
          className="inline-flex w-full items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-300"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <p className="text-center text-sm text-slate-500">
          Chưa có tài khoản?{' '}
          <Link className="font-semibold text-orange-600 hover:text-orange-700" to="/register">
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
}
