import React, { useEffect, useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { ActionButton } from '../../components/common/ActionButton';
import { ImageUploader } from '../../components/common/ImageUploader';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { notifyError, notifySuccess } from '../../utils/notify';

export const RestaurantProfile: React.FC = () => {
  const { restaurant, loading, error, updateRestaurantProfile, updateStatus, uploadImages, clearError } = useRestaurant();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    streetAddress: '',
    city: '',
    district: '',
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name,
        description: restaurant.description || '',
        streetAddress: restaurant.streetAddress || '',
        city: restaurant.city,
        district: restaurant.district,
        latitude: restaurant.latitude || 0,
        longitude: restaurant.longitude || 0,
      });
    }
  }, [restaurant]);

  useEffect(() => {
    if (error) {
      notifyError(error);
      clearError();
    }
  }, [error, clearError]);

  const handleSave = async () => {
    try {
      await updateRestaurantProfile(formData);
      notifySuccess('Cập nhật hồ sơ thành công');
    } catch (err: any) {
      notifyError(err?.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  const handleStatusToggle = async () => {
    try {
      const newStatus = restaurant?.status === 'OPEN' ? 'CLOSED' : 'OPEN';
      await updateStatus(newStatus);
      notifySuccess(`Cửa hàng ${newStatus === 'OPEN' ? 'đã mở' : 'đã đóng'}`);
    } catch (err: any) {
      notifyError(err?.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  const handleImagesSelected = async (files: File[]) => {
    try {
      const payload = new FormData();
      files.forEach(file => payload.append('images', file));
      await uploadImages(payload);
      notifySuccess('Tải ảnh thành công');
    } catch (err: any) {
      notifyError(err?.response?.data?.message || 'Tải ảnh thất bại');
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Thông tin quán</h1>
          </div>
          <ActionButton
            label={restaurant?.status === 'OPEN' ? 'Đóng cửa' : 'Mở cửa'}
            onClick={handleStatusToggle}
            variant={restaurant?.status === 'OPEN' ? 'danger' : 'success'}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">Thông tin quán</h2>
              <p className="text-sm text-slate-500">Cập nhật tên, địa chỉ và mô tả quán.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Tên quán</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Thành phố</span>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Quận/Huyện</span>
                <input
                  type="text"
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Địa chỉ</span>
                <input
                  type="text"
                  value={formData.streetAddress}
                  onChange={e => setFormData({ ...formData, streetAddress: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Mô tả</span>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[128px] w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
              />
            </label>

            <ActionButton label="Lưu thay đổi" onClick={handleSave} variant="primary" size="md" disabled={loading} />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">Ảnh quán</h2>
              <p className="text-sm text-slate-500 mb-2">Tải ảnh mới để làm mới hiển thị trang cửa hàng.</p>
            </div>
            <ImageUploader onImagesSelected={handleImagesSelected} maxFiles={5} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
