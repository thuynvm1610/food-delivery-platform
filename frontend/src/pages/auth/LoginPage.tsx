import { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from '../../context/AuthContext';
import { getHomePathForRole } from '../../utils/role';

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('customer1@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirectPath =
    (location.state as { from?: string } | null)?.from ?? (user ? getHomePathForRole(user.role) : '/');

  if (isAuthenticated && user) {
    return <Navigate to={getHomePathForRole(user.role)} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const sessionUser = await login(email, password);
      navigate(getHomePathForRole(sessionUser.role), { replace: true });
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message ?? 'Đăng nhập thất bại');
      } else {
        setError('Đăng nhập thất bại');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <form className="card login-card" onSubmit={handleSubmit}>
        <span className="badge">Đăng nhập</span>
        <h1>Chào mừng trở lại</h1>
        <p className="muted">Token được lưu trong HttpOnly cookie qua Vite proxy.</p>

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

        <label className="form-field">
          Mật khẩu
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />
        </label>

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <p className="muted" style={{ marginTop: '1rem' }}>
          Tài khoản seed: customer1@gmail.com, driver1@gmail.com, resto1@foodapp.vn, admin@foodapp.vn
        </p>
        <p className="muted">
          Sau khi login, bạn sẽ được chuyển tới <code>{redirectPath}</code> theo role.
        </p>
      </form>
    </div>
  );
}
