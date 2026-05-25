import React, { useEffect, useState } from 'react';
import { restaurantApi } from '../../api/restaurant';
import { ActionButton } from '../../components/common/ActionButton';
import { Toast } from '../../components/common/Toast';
import type { Voucher } from '../../types/restaurant';

export const RestaurantVouchers: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadVouchers();
  }, []);

  const loadVouchers = async () => {
    try {
      setLoading(true);
      const response = await restaurantApi.getVouchers();
      setVouchers(response.data.data);
    } catch (err) {
      setToastMessage('✕ Không thể tải danh sách khuyến mãi');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (voucherId: string) => {
    if (!window.confirm('Xác nhận xóa khuyến mãi?')) return;
    try {
      await restaurantApi.deleteVoucher(voucherId);
      setToastMessage('✓ Xóa thành công');
      await loadVouchers();
    } catch (err) {
      setToastMessage('✕ Xóa thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý khuyến mãi</h1>
        <ActionButton
          label="➕ Tạo khuyến mãi"
          onClick={() => {/* Navigate to create voucher */}}
          variant="primary"
        />
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastMessage.includes('✓') ? 'success' : 'error'}
          onClose={() => setToastMessage(null)}
        />
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : vouchers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Chưa có khuyến mãi nào</div>
        ) : (
          vouchers.map(voucher => (
            <div key={voucher.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">{voucher.title}</h3>
                  <p className="text-gray-600">Mã: {voucher.code}</p>
                  <p className="text-gray-600">
                    Giảm:{' '}
                    {voucher.discountType === 'PERCENTAGE'
                      ? `${voucher.discountValue}%`
                      : `${voucher.discountValue.toLocaleString()}₫`}
                  </p>
                  <p className="text-sm text-gray-500">
                    Sử dụng: {voucher.usedCount}/{voucher.usageLimit || '∞'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Hiệu lực: {new Date(voucher.validFrom).toLocaleDateString('vi-VN')} -{' '}
                    {new Date(voucher.validTo).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <ActionButton label="Sửa" onClick={() => {}} variant="secondary" size="sm" />
                  <ActionButton
                    label="Xóa"
                    onClick={() => handleDelete(voucher.id)}
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
