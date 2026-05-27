import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getHomePathForRole } from '../../utils/role';

export default function HomePage() {
  const { isLoading, isAuthenticated, user } = useAuth();

  if (isLoading) {
    return <div className="page-center">Đang khôi phục phiên đăng nhập...</div>;
  }

  if (isAuthenticated && user) {
    return <Navigate to={getHomePathForRole(user.role)} replace />;
  }

  return (
    <section className="card hero hero-home">
      <span className="badge">lightFood</span>
      <h1>Đặt món nhanh, giao tận nơi</h1>
      <p>
        lightFood là nền tảng đặt đồ ăn kiểu Shopee Food. Khách hàng, quán và tài xế có luồng đăng nhập riêng,
        đăng ký riêng, và session sẽ được khôi phục tự động nếu cookie còn hợp lệ.
      </p>
      <div className="button-row">
        <Link className="btn btn-primary" to="/login">
          Đăng nhập
        </Link>
        <Link className="btn btn-secondary" to="/register">
          Đăng ký
        </Link>
      </div>
      <ul className="sample-list">
        <li>Khách hàng: tìm quán, đặt món, theo dõi đơn</li>
        <li>Quán: quản lý menu, đơn hàng và giờ hoạt động</li>
        <li>Tài xế: nhận đơn giao và cập nhật trạng thái</li>
      </ul>
    </section>
  );
}
