import React, { useState, useEffect } from 'react';
import { useMenu } from '../../context/MenuContext';
import { ActionButton } from '../../components/common/ActionButton';
import { FilterBar } from '../../components/common/FilterBar';
import { Toast } from '../../components/common/Toast';

export const RestaurantMenu: React.FC = () => {
  const { dishes, categories, loading, error, filters, setFilters, loadDishes, loadCategories, updateDishAvailability, deleteDish, clearError } = useMenu();
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedDishes, setSelectedDishes] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadDishes().catch(() => {});
    loadCategories().catch(() => {});
  }, []);

  const handleAvailabilityChange = async (dishId: string, isAvailable: boolean) => {
    try {
      await updateDishAvailability(dishId, !isAvailable);
      setToastMessage('✓ Cập nhật thành công');
    } catch (err: any) {
      setToastMessage('✕ Cập nhật thất bại');
    }
  };

  const handleDelete = async (dishId: string) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa món ăn này?')) return;
    try {
      await deleteDish(dishId);
      setToastMessage('✓ Xóa thành công');
    } catch (err: any) {
      setToastMessage('✕ Xóa thất bại');
    }
  };

  const toggleDishSelection = (dishId: string) => {
    const newSelected = new Set(selectedDishes);
    if (newSelected.has(dishId)) {
      newSelected.delete(dishId);
    } else {
      newSelected.add(dishId);
    }
    setSelectedDishes(newSelected);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý menu</h1>
          <p className="text-gray-600 mt-1">Thêm, sửa, xóa, và quản lý tính khả dụng của các món ăn</p>
        </div>
        <ActionButton
          label="➕ Thêm món mới"
          onClick={() => {/* Navigate to create dish page */}}
          variant="primary"
          size="md"
        />
      </div>

      {error && (
        <Toast message={error} type="error" onClose={clearError} />
      )}
      {toastMessage && (
        <Toast message={toastMessage} type={toastMessage.includes('✓') ? 'success' : 'error'} onClose={() => setToastMessage(null)} />
      )}

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={(key, value) => {
          setFilters({ ...filters, [key]: value, page: 1 });
          loadDishes({ ...filters, [key]: value, page: 1 }).catch(() => {});
        }}
        options={[
          {
            label: 'Danh mục',
            key: 'category',
            type: 'select',
            choices: [{ label: 'Tất cả', value: '' }, ...categories.map(c => ({ label: c.name, value: c.id }))],
          },
          {
            label: 'Tìm kiếm',
            key: 'search',
            type: 'text',
            placeholder: 'Tên món ăn...',
          },
        ]}
      />

      {/* Bulk Actions */}
      {selectedDishes.size > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
          <p className="text-blue-900 font-semibold">{selectedDishes.size} món được chọn</p>
          <div className="flex gap-2">
            <ActionButton label="Bật" onClick={() => {}} variant="success" size="sm" />
            <ActionButton label="Tắt" onClick={() => {}} variant="secondary" size="sm" />
          </div>
        </div>
      )}

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-200 h-64 rounded-lg animate-pulse" />
          ))
        ) : dishes.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>Chưa có món ăn nào</p>
          </div>
        ) : (
          dishes.map(dish => (
            <div key={dish.id} className="bg-white rounded-lg shadow overflow-hidden">
              {dish.images?.[0] && (
                <img src={dish.images[0].imageUrl} alt={dish.name} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <input
                    type="checkbox"
                    checked={selectedDishes.has(dish.id)}
                    onChange={() => toggleDishSelection(dish.id)}
                    className="w-4 h-4 mt-1"
                  />
                  <h3 className="font-bold text-gray-900 flex-1 ml-2">{dish.name}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{dish.description}</p>
                <p className="text-lg font-bold text-green-600 mb-3">{dish.price.toLocaleString()}₫</p>

                <div className="flex items-center gap-2 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dish.isAvailable}
                      onChange={(e) => handleAvailabilityChange(dish.id, dish.isAvailable)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">Có sẵn</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <ActionButton
                    label="Sửa"
                    onClick={() => {/* Navigate to edit dish page */}}
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                  />
                  <ActionButton
                    label="Xóa"
                    onClick={() => handleDelete(dish.id)}
                    variant="danger"
                    size="sm"
                    className="flex-1"
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
