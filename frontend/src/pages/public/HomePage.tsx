import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="card hero">
      <span className="badge">Trang công khai</span>
      <h1>Đặt món nhanh, giao tận nơi</h1>
      <p>
        Đây là trang landing mẫu. Người dùng chưa đăng nhập có thể xem thông tin cơ bản và chuyển
        sang trang đăng nhập.
      </p>
      <div className="button-row">
        <Link className="btn btn-primary" to="/login">
          Đăng nhập
        </Link>
      </div>
      <ul className="sample-list">
        <li>Khách hàng: đặt món, theo dõi đơn</li>
        <li>Tài xế: nhận đơn giao, cập nhật trạng thái</li>
        <li>Nhà hàng: quản lý menu và đơn</li>
        <li>Admin: quản trị hệ thống</li>
      </ul>
    </section>
  );
}
