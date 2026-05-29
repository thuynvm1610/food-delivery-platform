import { FormEvent, useState } from 'react';
import { isAxiosError } from 'axios';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import { getHomePathForRole } from '../../utils/role';
import type { RegisterRole } from '../../types/auth';
import { notifyError } from '../../utils/notify';

const REGISTER_ROLES: Array<{ value: RegisterRole; label: string }> = [
  { value: 'ROLE_CUSTOMER', label: 'Khách hàng' },
  { value: 'ROLE_RESTAURANT', label: 'Quán / nhà hàng' },
  { value: 'ROLE_DRIVER', label: 'Tài xế' },
];

export default function RegisterPage() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { email?: string } | null;
  const [email, setEmail] = useState(state?.email ?? '');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [roleName, setRoleName] = useState<RegisterRole>('ROLE_CUSTOMER');
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
      const result = await registerApi({
        email,
        password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        roleName,
      });

      navigate('/login', {
        replace: true,
        state: {
          email: result.email,
          message: 'Đăng ký thành công. Vui lòng đăng nhập để tiếp tục.',
        },
      });
    } catch (err) {
      const message = isAxiosError(err)
        ? err.response?.data?.message ?? 'Đăng ký thất bại'
        : 'Đăng ký thất bại';
      void notifyError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <form
        className="w-full max-w-xl space-y-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
        onSubmit={handleSubmit}
      >
        <span className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
          Đăng ký
        </span>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Tạo tài khoản mới</h1>
          <p className="text-slate-600">Chỉ hỗ trợ khách hàng, quán/nhà hàng và tài xế.</p>
        </div>

        <div className="grid gap-4">
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

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Họ
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoComplete="given-name"
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Tên
              <input
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                autoComplete="family-name"
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Vai trò
            <select
              value={roleName}
              onChange={(event) => setRoleName(event.target.value as RegisterRole)}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            >
              {REGISTER_ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          className="inline-flex w-full items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-300"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>

        <p className="text-center text-sm text-slate-500">
          Đã có tài khoản?{' '}
          <Link className="font-semibold text-orange-600 hover:text-orange-700" to="/login">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}
