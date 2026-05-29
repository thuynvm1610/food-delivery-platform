import { useAuth } from '../../context/AuthContext';

export default function AdminHomePage() {
  const { user } = useAuth();

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-10 shadow-sm">
      <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
        ROLE_ADMIN
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Khu vực quản trị</h1>
      <p className="mt-2 text-slate-600">Xin chào {user?.email}. Trang mẫu dành cho admin hệ thống.</p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-600">
        <li>Quản lý người dùng</li>
        <li>Theo dõi hoa hồng nền tảng</li>
        <li>Giám sát đơn hàng toàn hệ thống</li>
      </ul>
    </section>
  );
}
