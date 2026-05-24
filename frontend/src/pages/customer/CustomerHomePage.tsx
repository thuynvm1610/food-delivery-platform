import { useAuth } from '../../context/AuthContext';

export default function CustomerHomePage() {
  const { user } = useAuth();

  return (
    <section className="card dashboard-card">
      <span className="badge">ROLE_CUSTOMER</span>
      <h1>Khu vực khách hàng</h1>
      <p className="muted">Xin chào {user?.email}. Đây là trang mẫu sau khi đăng nhập thành công.</p>
      <ul className="sample-list">
        <li>Duyệt nhà hàng gần bạn</li>
        <li>Thêm món vào giỏ</li>
        <li>Theo dõi trạng thái đơn hàng</li>
      </ul>
    </section>
  );
}
