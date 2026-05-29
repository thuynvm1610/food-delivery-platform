import React, { useEffect, useState } from 'react';
import { restaurantApi } from '../../api/restaurant';
import { ActionButton } from '../../components/common/ActionButton';
import { notifyError, notifySuccess, confirmDialog } from '../../utils/notify';
import type { Voucher } from '../../types/restaurant';

export const RestaurantVouchers: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVouchers();
  }, []);

  const loadVouchers = async () => {
    try {
      setLoading(true);
      const response = await restaurantApi.getVouchers();
      setVouchers(response.data.data);
    } catch {
      void notifyError('Không thể tải danh sách khuyến mãi');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (voucherId: string) => {
    const confirmed = await confirmDialog('Xác nhận xóa', 'Bạn có chắc muốn xóa khuyến mãi này không?');
    if (!confirmed) return;

    try {
      await restaurantApi.deleteVoucher(voucherId);
      void notifySuccess('Xóa thành công');
      await loadVouchers();
    } catch {
      void notifyError('Xóa thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Quản lý khuyến mãi</h1>
        <ActionButton
          label="➕ Tạo khuyến mãi"
          onClick={() => { /* Navigate to create voucher */ }}
          variant="primary"
        />
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-slate-500">Đang tải dữ liệu...</div>
        ) : vouchers.length === 0 ? (
          <div className="text-center py-12 text-slate-500">Chưa có khuyến mãi nào</div>
        ) : (
          vouchers.map((voucher) => (
            <div key={voucher.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">{voucher.title}</h3>
                  <p className="text-slate-600">Mã: {voucher.code}</p>
                  <p className="text-slate-600">
                    Giảm:{' '}
                    {voucher.discountType === 'PERCENTAGE'
                      ? `${voucher.discountValue}%`
                      : `${voucher.discountValue.toLocaleString()}₫`}
                  </p>
                  <p className="text-sm text-slate-500">
                    Sử dụng: {voucher.usedCount}/{voucher.usageLimit || '∞'}
                  </p>
                  <p className="text-sm text-slate-500">
                    Hiệu lực: {new Date(voucher.validFrom).toLocaleDateString('vi-VN')} -{' '}
                    {new Date(voucher.validTo).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ActionButton label="Sửa" onClick={() => {}} variant="secondary" size="sm" />
                  <ActionButton
                    label="Xóa"
                    onClick={() => void handleDelete(voucher.id)}
                    variant="danger"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
