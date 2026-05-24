import { useAuth } from '../../context/AuthContext';

export default function DriverHomePage() {
  const { user } = useAuth();

  return (
    <section className="card dashboard-card">
      <span className="badge">ROLE_DRIVER</span>
      <h1>Khu vực tài xế (shipper)</h1>
      <p className="muted">Xin chào {user?.email}. Trang mẫu dành cho shipper/tài xế giao hàng.</p>
      <ul className="sample-list">
        <li>Bật trạng thái online</li>
        <li>Nhận hoặc từ chối đơn giao</li>
        <li>Cập nhật tiến trình giao hàng</li>
      </ul>
    </section>
  );
}
