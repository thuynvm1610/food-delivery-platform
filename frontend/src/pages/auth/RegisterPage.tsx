import { FormEvent, useState } from 'react';
import { isAxiosError } from 'axios';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import { getHomePathForRole } from '../../utils/role';
import type { RegisterRole } from '../../types/auth';

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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) {
    return <div className="page-center">Đang khôi phục phiên đăng nhập...</div>;
  }

  if (isAuthenticated && user) {
    return <Navigate to={getHomePathForRole(user.role)} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      const result = await registerApi({
        email,
        password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        roleName,
      });

      setSuccess('Đăng ký thành công. Vui lòng đăng nhập để tiếp tục.');
      navigate('/login', {
        replace: true,
        state: {
          email: result.email,
          message: 'Đăng ký thành công. Vui lòng đăng nhập để tiếp tục.',
        },
      });
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message ?? 'Đăng ký thất bại');
      } else {
        setError('Đăng ký thất bại');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-shell">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <span className="badge">Đăng ký</span>
        <h1>Tạo tài khoản mới</h1>
        <p className="muted">Chỉ hỗ trợ khách hàng, quán/nhà hàng và tài xế.</p>

        {error && <p className="error-text">{error}</p>}

        <label className="form-field">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </label>

        <div className="form-grid">
          <label className="form-field">
            Họ
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              autoComplete="given-name"
            />
          </label>
          <label className="form-field">
            Tên
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              autoComplete="family-name"
            />
          </label>
        </div>

        <label className="form-field">
          Mật khẩu
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </label>

        <label className="form-field">
          Vai trò
          <select value={roleName} onChange={(event) => setRoleName(event.target.value as RegisterRole)}>
            {REGISTER_ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </label>

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>

        {success && <p className="success-text">{success}</p>}

        <p className="muted auth-link-row">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
}
