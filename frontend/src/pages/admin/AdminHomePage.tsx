import { useAuth } from '../../context/AuthContext';

export default function AdminHomePage() {
  const { user } = useAuth();

  return (
    <section className="card dashboard-card">
      <span className="badge">ROLE_ADMIN</span>
      <h1>Khu vực quản trị</h1>
      <p className="muted">Xin chào {user?.email}. Trang mẫu dành cho admin hệ thống.</p>
      <ul className="sample-list">
        <li>Quản lý người dùng</li>
        <li>Theo dõi hoa hồng nền tảng</li>
        <li>Giám sát đơn hàng toàn hệ thống</li>
      </ul>
    </section>
  );
}
