import { useAuth } from '../../context/AuthContext';

export default function RestaurantHomePage() {
  const { user } = useAuth();

  return (
    <section className="card dashboard-card">
      <span className="badge">ROLE_RESTAURANT</span>
      <h1>Khu vực nhà hàng</h1>
      <p className="muted">Xin chào {user?.email}. Trang mẫu cho chủ quán/nhà hàng.</p>
      <ul className="sample-list">
        <li>Quản lý thực đơn</li>
        <li>Xác nhận đơn mới</li>
        <li>Cập nhật trạng thái chuẩn bị món</li>
      </ul>
    </section>
  );
}
