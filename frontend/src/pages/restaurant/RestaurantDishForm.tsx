import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionButton } from '../../components/common/ActionButton';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { ImageUploader } from '../../components/common/ImageUploader';
import { restaurantApi } from '../../api/restaurant';
import { useMenu } from '../../context/MenuContext';
import type { Dish, DishImage } from '../../types/restaurant';

const initialFormState = {
  name: '',
  description: '',
  priceAmount: 0,
  priceCurrency: 'VND',
};

export const RestaurantDishForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { deleteDishImages, categories, loadCategories } = useMenu();

  const [dish, setDish] = useState<Dish | null>(null);
  const [formData, setFormData] = useState(initialFormState);
  const [existingImages, setExistingImages] = useState<DishImage[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);

  const loadDish = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setPageError(null);

    try {
      const response = await restaurantApi.getDishById(id);
      const loadedDish = response.data.data;

      setDish(loadedDish);
      setFormData({
        name: loadedDish.name || '',
        description: loadedDish.description || '',
        priceAmount: loadedDish.priceAmount || 0,
        priceCurrency: loadedDish.priceCurrency || 'VND',
      });
      setExistingImages(loadedDish.images || []);
      setSelectedCategoryIds(loadedDish.categories?.map(category => category.id) || []);
    } catch (err: any) {
      setPageError(err.response?.data?.message || 'Không thể tải thông tin món ăn.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCategories().catch(() => {});
  }, [loadCategories]);

  useEffect(() => {
    if (isEdit) {
      loadDish();
      return;
    }

    setDish(null);
    setFormData(initialFormState);
    setExistingImages([]);
    setSelectedImageIds([]);
    setSelectedCategoryIds([]);
    setNewImages([]);
    setPageError(null);
  }, [isEdit, loadDish]);

  const handleNewImagesSelected = (files: File[]) => {
    setNewImages(files);
  };

  const toggleImageSelection = (imageId: string) => {
    setSelectedImageIds(prev =>
      prev.includes(imageId)
        ? prev.filter(idToRemove => idToRemove !== imageId)
        : [...prev, imageId]
    );
  };

  const toggleCategorySelection = (categoryId: string) => {
    setSelectedCategoryIds(prev =>
      prev.includes(categoryId)
        ? prev.filter(idToRemove => idToRemove !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleDeleteSelectedImages = async () => {
    if (!dish || selectedImageIds.length === 0) return;

    if (existingImages.length - selectedImageIds.length === 0 && newImages.length === 0) {
      setPageError('Ít nhất một ảnh phải được giữ lại hoặc tải ảnh mới trước khi xóa tất cả.');
      return;
    }

    setLoading(true);
    setPageError(null);

    try {
      await deleteDishImages(dish.id, selectedImageIds);
      setExistingImages(existingImages.filter(image => !selectedImageIds.includes(image.id)));
      setSelectedImageIds([]);
      setToastMessage('Xóa ảnh thành công.');
    } catch (err: any) {
      setPageError(err.response?.data?.message || 'Không thể xóa ảnh.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setPageError('Tên món không được để trống.');
      return;
    }

    if (formData.priceAmount <= 0) {
      setPageError('Giá món phải lớn hơn 0.');
      return;
    }

    setLoading(true);
    setPageError(null);

    try {
      let createdDishId = id;
      const payload = {
        name: formData.name,
        description: formData.description,
        priceAmount: formData.priceAmount,
        priceCurrency: formData.priceCurrency,
        categoryIds: selectedCategoryIds,
      };

      if (isEdit) {
        await restaurantApi.updateDish(id!, payload);
      } else {
        const response = await restaurantApi.createDish(payload);
        createdDishId = response.data.data.id;
      }

      if (newImages.length > 0 && createdDishId) {
        const formPayload = new FormData();
        newImages.forEach(file => formPayload.append('images', file));
        await restaurantApi.uploadDishImages(createdDishId, formPayload);
      }

      setToastMessage(isEdit ? 'Cập nhật món thành công.' : 'Tạo món thành công.');
      navigate('/dashboard/menu');
    } catch (err: any) {
      setPageError(err.response?.data?.message || 'Đã có lỗi xảy ra khi lưu món ăn.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryLabels = selectedCategoryIds
    .map(categoryId => categories.find(category => category.id === categoryId)?.name)
    .filter(Boolean);

  return (
    <ErrorBoundary>
      <div className="space-y-6" style={{ fontFamily: 'var(--menu-font-body)' }}>
        <div className="menu-page-header">
          <div>
            <h1>{isEdit ? 'Chỉnh sửa món ăn' : 'Thêm món ăn mới'}</h1>
            <p>{isEdit ? 'Cập nhật thông tin món và quản lý ảnh.' : 'Tạo món mới, chọn nhiều loại và tải lên ảnh sản phẩm.'}</p>
          </div>
          <div className="flex items-center gap-3">
            <ActionButton
              label="Trở về menu"
              onClick={() => navigate('/dashboard/menu')}
              variant="secondary"
              size="md"
            />
            <ActionButton
              label={isEdit ? 'Lưu thay đổi' : 'Tạo món'}
              onClick={handleSubmit}
              variant="primary"
              size="md"
              disabled={loading}
            />
          </div>
        </div>

        {pageError && (
          <div className="menu-toast error-toast" style={{ maxWidth: 720 }}>
            {pageError}
          </div>
        )}

        {toastMessage && (
          <div className="menu-toast success-toast" style={{ maxWidth: 720 }}>
            {toastMessage}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 max-w-3xl space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold mb-1">Tên món</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Nhập tên món"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Giá (VND)</label>
              <input
                type="number"
                value={formData.priceAmount}
                onChange={e => setFormData({ ...formData, priceAmount: Number(e.target.value) })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                min={0}
                step={1000}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 min-h-[120px]"
              placeholder="Mô tả món ăn"
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 className="font-bold text-lg">Loại món ăn</h2>
              <span className="text-sm text-gray-500">
                Đã chọn {selectedCategoryIds.length} loại
              </span>
            </div>

            {categories.length === 0 ? (
              <p className="text-sm text-gray-500">
                Chưa có dữ liệu loại món. Hãy tải lại trang hoặc kiểm tra backend.
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {categories.map(category => {
                  const selected = selectedCategoryIds.includes(category.id);

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => toggleCategorySelection(category.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition ${
                        selected
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selected}
                          readOnly
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{category.name}</p>
                          {category.description && (
                            <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {selectedCategoryLabels.length > 0 && (
              <p className="text-sm text-gray-500 mt-3">
                Đang chọn: {selectedCategoryLabels.join(', ')}
              </p>
            )}
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3">Ảnh món ăn</h2>
            {isEdit && existingImages.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  {existingImages.map(image => {
                    const selected = selectedImageIds.includes(image.id);

                    return (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() => toggleImageSelection(image.id)}
                        className={`relative overflow-hidden rounded-lg border ${
                          selected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'
                        } focus:outline-none`}
                        style={{ minHeight: 140 }}
                      >
                        <img
                          src={image.imageUrl}
                          alt="Dish"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-gray-700">
                          {selected ? 'Đã chọn' : 'Chọn'}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-3 mb-3">
                  <ActionButton
                    label={`Xóa ảnh đã chọn (${selectedImageIds.length})`}
                    onClick={handleDeleteSelectedImages}
                    variant="danger"
                    size="sm"
                    disabled={selectedImageIds.length === 0 || loading}
                  />
                  <span className="text-sm text-gray-500 self-center">
                    Chọn tối đa {existingImages.length} ảnh để xoá. Nếu xoá hết ảnh hiện tại, hãy thêm ảnh mới trước khi lưu.
                  </span>
                </div>
              </>
            ) : isEdit ? (
              <p className="text-sm text-gray-500 mb-3">Món ăn hiện chưa có ảnh. Hãy tải ảnh mới bên dưới.</p>
            ) : null}

            <ImageUploader onImagesSelected={handleNewImagesSelected} maxFiles={5} />
            <p className="text-sm text-gray-500 mt-2">
              Bạn có thể tải lên nhiều ảnh cùng lúc. Ảnh sẽ được gửi lên Cloudinary qua backend khi lưu.
            </p>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
