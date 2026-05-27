import { FormEvent, useState } from 'react';
import { isAxiosError } from 'axios';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getHomePathForRole } from '../../utils/role';

export default function LoginPage() {
  const { login, isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: string; email?: string; message?: string } | null;
  const [email, setEmail] = useState(state?.email ?? 'customer1@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
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
    <div className="auth-shell">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <span className="badge">Đăng nhập</span>
        <h1>Chào mừng trở lại</h1>
        <p className="muted">Cookie HttpOnly sẽ được backend tự set sau khi xác thực thành công.</p>

        {state?.message && <p className="success-text">{state.message}</p>}
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

        <p className="muted auth-link-row">
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </form>
    </div>
  );
}
