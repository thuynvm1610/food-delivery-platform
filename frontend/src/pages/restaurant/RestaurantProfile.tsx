import React, { useEffect, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import Swal from 'sweetalert2';
import { useRestaurant } from '../../context/RestaurantContext';
import { ActionButton } from '../../components/common/ActionButton';
import { ImageUploader } from '../../components/common/ImageUploader';
import { GoongAddressPicker } from '../../components/common/GoongAddressPicker';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { confirmDialog, notifyError, notifySuccess } from '../../utils/notify';

export const RestaurantProfile: React.FC = () => {
  const {
    restaurant,
    loading,
    error,
    images,
    loadRestaurantProfile,
    updateRestaurantProfile,
    updateStatus,
    uploadImages,
    deleteImage,
    loadImages,
    clearError,
  } = useRestaurant();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    streetAddress: '',
    city: '',
    district: '',
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
  });
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [pendingImages, setPendingImages] = useState<File[]>([]);
  const [uploaderKey, setUploaderKey] = useState(0);

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name,
        description: restaurant.description || '',
        streetAddress: restaurant.streetAddress || '',
        city: restaurant.city,
        district: restaurant.district,
        latitude: restaurant.latitude ?? undefined,
        longitude: restaurant.longitude ?? undefined,
      });
    }
  }, [restaurant]);

  useEffect(() => {
    if (error) {
      notifyError(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    loadImages().catch(() => { });
  }, [loadImages]);

  const handleStatusToggle = async () => {
    try {
      const newStatus = restaurant?.status === 'OPEN' ? 'CLOSED' : 'OPEN';
      await updateStatus(newStatus);
      notifySuccess(`Cửa hàng ${newStatus === 'OPEN' ? 'đã mở bán' : 'đã ngừng bán'}`);
    } catch (err: any) {
      notifyError(err?.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  const handleImagesSelected = async (files: File[]) => {
    setPendingImages(files);
  };

  const toggleImageSelection = (imageId: string) => {
    setSelectedImageIds(prev =>
      prev.includes(imageId) ? prev.filter(id => id !== imageId) : [...prev, imageId]
    );
  };

  const clearSelection = () => {
    setSelectedImageIds([]);
  };

  const handleDeleteSelectedImages = async () => {
    if (selectedImageIds.length === 0) {
      return;
    }

    if (images.length - selectedImageIds.length < 1) {
      notifyError('Quán phải giữ lại ít nhất 1 ảnh.');
      return;
    }

    const confirmed = await confirmDialog(
      'Xóa ảnh',
      'Bạn có chắc muốn xóa các ảnh đã chọn? Quán phải giữ lại ít nhất 1 ảnh.'
    );
    if (!confirmed) {
      return;
    }

    try {
      for (const imageId of selectedImageIds) {
        await deleteImage(imageId);
      }
      await loadImages();
      clearSelection();
      notifySuccess('Xóa ảnh thành công');
    } catch (err: any) {
      notifyError(err?.response?.data?.message || 'Xóa ảnh thất bại');
    }
  };

  const handleSave = async () => {
    const hasPendingImages = pendingImages.length > 0;

    try {
      Swal.fire({
        title: hasPendingImages ? 'Đang lưu thay đổi và tải ảnh...' : 'Đang lưu thay đổi...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await updateRestaurantProfile(formData);

      if (hasPendingImages) {
        const payload = new FormData();
        pendingImages.forEach(file => payload.append('images', file));
        await uploadImages(payload);
        setPendingImages([]);
        setUploaderKey(prev => prev + 1);
      }

      await Promise.all([loadRestaurantProfile(), loadImages()]);
      Swal.close();
      notifySuccess('Cập nhật thông tin quán thành công');
    } catch (err: any) {
      Swal.close();
      notifyError(err?.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Thông tin quán</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ActionButton
              label={restaurant?.status === 'OPEN' ? 'Ngừng bán' : 'Mở bán'}
              onClick={handleStatusToggle}
              variant={restaurant?.status === 'OPEN' ? 'danger' : 'success'}
            />
            <ActionButton
              label="Lưu thay đổi"
              onClick={handleSave}
              variant="primary"
              disabled={loading}
              loading={loading}
            />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-1">
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">Cập nhật tên, địa chỉ và mô tả quán.</h2>
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
            </div>

            <GoongAddressPicker
              value={{
                streetAddress: formData.streetAddress,
                city: formData.city,
                district: formData.district,
                latitude: formData.latitude,
                longitude: formData.longitude,
              }}
              onChange={next =>
                setFormData(prev => ({
                  ...prev,
                  streetAddress: next.streetAddress,
                  city: next.city,
                  district: next.district,
                  latitude: next.latitude,
                  longitude: next.longitude,
                }))
              }
            />

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Mô tả</span>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[128px] w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
              />
            </label>

          </div>
        </div>

        {/* Ảnh quán – đặt ở cuối trang */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">Ảnh quán</h2>
            <p className="text-sm text-slate-500">Quản lý hình ảnh hiển thị của quán.</p>
          </div>

          <div className="mb-4 space-y-3">
            {images.length > 0 ? (
              <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-8">
                {images.map((image, index) => {
                  const selected = selectedImageIds.includes(image.id);

                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => toggleImageSelection(image.id)}
                      className="group relative aspect-square overflow-hidden rounded-2xl border p-0 text-left transition"
                      style={{
                        borderColor: selected ? '#f97316' : '#e2e8f0',
                        boxShadow: selected ? '0 0 0 2px rgba(249,115,22,0.18)' : 'none',
                        background: selected ? '#fff7ed' : '#f8fafc',
                      }}
                    >
                      <img
                        src={image.imageUrl}
                        alt={`Restaurant ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-slate-950/80 to-transparent p-2">
                        <span className="text-[10px] font-semibold text-white/80">#{index + 1}</span>
                        {selected ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white/70">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <rect x="3" y="3" width="18" height="18" rx="3" />
                              <polyline points="9 11 12 14 22 4" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                Chưa có ảnh nào cho quán.
              </div>
            )}

            {selectedImageIds.length > 0 && (
              <div className="flex items-center gap-3 pt-1">
                <ActionButton
                  label={`Xóa ${selectedImageIds.length} ảnh`}
                  onClick={handleDeleteSelectedImages}
                  variant="danger"
                  size="sm"
                  icon={<IconTrash size={14} strokeWidth={2.2} />}
                />
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
                >
                  Bỏ chọn
                </button>
              </div>
            )}

            <p className="text-xs text-slate-400">Quán phải luôn có ít nhất 1 ảnh hiển thị.</p>
          </div>

          <ImageUploader key={uploaderKey} onImagesSelected={handleImagesSelected} maxFiles={5} />
        </div>
      </div>
    </ErrorBoundary>
  );
};