import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { ActionButton } from '../../components/common/ActionButton';
import { ImageUploader } from '../../components/common/ImageUploader';
import { Toast } from '../../components/common/Toast';

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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const handleSave = async () => {
    try {
      await updateRestaurantProfile(formData);
      setToastMessage('✓ Cập nhật thành công');
    } catch (err) {
      setToastMessage('✕ Cập nhật thất bại');
    }
  };

  const handleStatusToggle = async () => {
    try {
      const newStatus = restaurant?.status === 'OPEN' ? 'CLOSED' : 'OPEN';
      await updateStatus(newStatus);
      setToastMessage(`✓ Cửa hàng ${newStatus === 'OPEN' ? 'đã mở' : 'đã đóng'}`);
    } catch (err) {
      setToastMessage('✕ Cập nhật thất bại');
    }
  };

  const handleImagesSelected = async (files: File[]) => {
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));
      await uploadImages(formData);
      setToastMessage('✓ Tải ảnh thành công');
    } catch (err) {
      setToastMessage('✕ Tải ảnh thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Hồ sơ quán</h1>
        <ActionButton
          label={restaurant?.status === 'OPEN' ? '🔴 Đóng cửa' : '🟢 Mở cửa'}
          onClick={handleStatusToggle}
          variant={restaurant?.status === 'OPEN' ? 'danger' : 'success'}
        />
      </div>

      {error && <Toast message={error} type="error" onClose={clearError} />}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastMessage.includes('✓') ? 'success' : 'error'}
          onClose={() => setToastMessage(null)}
        />
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <>
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-bold text-lg mb-4">Thông tin cơ bản</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Tên quán</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Thành phố</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Quận/Huyện</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Địa chỉ đầy đủ</label>
                <input
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
            <ActionButton label="💾 Lưu" onClick={handleSave} className="mt-4 w-full" />
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-bold text-lg mb-4">Ảnh quán</h2>
            <ImageUploader onImagesSelected={handleImagesSelected} maxFiles={5} />
          </div>
        </>
      )}
    </div>
  );
};
