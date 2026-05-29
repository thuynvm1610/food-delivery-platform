import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getHomePathForRole } from '../../utils/role';

export default function HomePage() {
  const { isLoading, isAuthenticated, user } = useAuth();

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

  return (
    <section className="mx-auto flex min-h-[72vh] max-w-5xl flex-col justify-center gap-8 rounded-[28px] border border-slate-200 bg-white p-10 shadow-sm sm:p-14">
      <span className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
        lightFood
      </span>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Đặt món nhanh, giao tận nơi
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          lightFood là nền tảng đặt đồ ăn kiểu Shopee Food. Khách hàng, quán và tài xế có luồng đăng nhập riêng,
          đăng ký riêng, và session sẽ được khôi phục tự động nếu cookie còn hợp lệ.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link className="inline-flex items-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700" to="/login">
          Đăng nhập
        </Link>
        <Link className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-700" to="/register">
          Đăng ký
        </Link>
      </div>
      <ul className="list-disc space-y-2 pl-5 text-slate-600">
        <li>Khách hàng: tìm quán, đặt món, theo dõi đơn</li>
        <li>Quán: quản lý menu, đơn hàng và giờ hoạt động</li>
        <li>Tài xế: nhận đơn giao và cập nhật trạng thái</li>
      </ul>
    </section>
  );
}
