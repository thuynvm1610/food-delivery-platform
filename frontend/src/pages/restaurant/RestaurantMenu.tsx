import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../../context/MenuContext';
import { ActionButton } from '../../components/common/ActionButton';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { FilterBar } from '../../components/common/FilterBar';
import { Toast } from '../../components/common/Toast';
import './menu.css';

export const RestaurantMenu: React.FC = () => {
  const navigate = useNavigate();
  const {
    dishes,
    categories,
    loading,
    error,
    filters,
    pagination,
    setFilters,
    loadDishes,
    loadCategories,
    updateDishAvailability,
    deleteDish,
    clearError,
  } = useMenu();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const getDishAvailability = (dish: { isAvailable?: boolean; available?: boolean }) =>
    dish.isAvailable ?? dish.available ?? false;

  useEffect(() => {
    loadDishes().catch(() => {});
    loadCategories().catch(() => {});
  }, []);

  // ── Handlers ──────────────────────────────────────────────

  const handleAvailabilityChange = async (dishId: string, currentIsAvailable: boolean) => {
    try {
      await updateDishAvailability(dishId, !currentIsAvailable);
      setToastMessage('✓ Cập nhật thành công');
    } catch {
      setToastMessage('✕ Cập nhật thất bại');
    }
  };

  const handleDelete = async (dishId: string) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa món ăn này?')) return;
    try {
      await deleteDish(dishId);
      setToastMessage('✓ Xóa thành công');
    } catch {
      setToastMessage('✕ Xóa thất bại');
    }
  };


  const handleFilterChange = (key: string, value: any) => {
    const updated = { ...filters, [key]: value, page: 1 };
    setFilters(updated);
    loadDishes(updated).catch(() => {});
  };

  const toggleCategoryFilter = (categoryId: string) => {
    const nextCategoryIds = filters.categoryIds.includes(categoryId)
      ? filters.categoryIds.filter(id => id !== categoryId)
      : [...filters.categoryIds, categoryId];

    const updated = { ...filters, categoryIds: nextCategoryIds, page: 1 };
    setFilters(updated);
    loadDishes(updated).catch(() => {});
  };

  const clearCategoryFilters = () => {
    const updated = { ...filters, categoryIds: [], page: 1 };
    setFilters(updated);
    loadDishes(updated).catch(() => {});
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    const updated = { ...filters, page: newPage };
    setFilters(updated);
    loadDishes(updated).catch(() => {});
  };

  // ── Render ────────────────────────────────────────────────

  return (
    <ErrorBoundary>
      <div className="space-y-6" style={{ fontFamily: 'var(--menu-font-body)' }}>

      {/* Page header */}
      <div className="menu-page-header">
        <div>
          <h1>Quản lý menu</h1>
          <p>Thêm, sửa, xóa và quản lý tính khả dụng của các món ăn</p>
          <p style={{ color: '#6b7280', marginTop: 6 }}>
            Tổng: {pagination?.totalItems?.toLocaleString?.() ?? 0} món
          </p>
        </div>
        <ActionButton
          label="➕ Thêm món mới"
          onClick={() => navigate('/dashboard/menu/create')}
          variant="primary"
          size="md"
          className="menu-btn-primary"
        />
      </div>

      {/* Toasts */}
      {error && (
        <Toast
          message={error}
          type="error"
          onClose={clearError}
          className="menu-toast error-toast"
        />
      )}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastMessage.includes('✓') ? 'success' : 'error'}
          onClose={() => setToastMessage(null)}
          className={`menu-toast ${toastMessage.includes('✓') ? 'success-toast' : 'error-toast'}`}
        />
      )}

      {/* Filter bar */}
      <div className="bg-white rounded-lg shadow p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Lọc theo loại món</h2>
            <p className="text-xs text-gray-500">Bạn có thể chọn nhiều loại cùng lúc.</p>
          </div>
          <ActionButton
            label="Xóa chọn"
            onClick={clearCategoryFilters}
            variant="secondary"
            size="sm"
            disabled={filters.categoryIds.length === 0}
          />
        </div>

        {categories.length === 0 ? (
          <p className="text-sm text-gray-500">Chưa có danh mục nào để lọc.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(category => {
              const selected = filters.categoryIds.includes(category.id);

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategoryFilter(category.id)}
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

        {filters.categoryIds.length > 0 && (
          <p className="text-sm text-gray-500">
            Đang lọc theo: {filters.categoryIds.map(id => categories.find(c => c.id === id)?.name || id).join(', ')}
          </p>
        )}
      </div>

      <FilterBar
        className="menu-filter-bar"
        filters={filters}
        onFilterChange={handleFilterChange}
        options={[
          {
            label: 'Tìm tên món',
            key: 'search',
            type: 'text',
            placeholder: 'Nhập tên món...',
          },
          {
            label: 'Giá từ',
            key: 'minPrice',
            type: 'number',
            placeholder: '0',
            min: 0,
            step: 1000,
          },
          {
            label: 'Giá đến',
            key: 'maxPrice',
            type: 'number',
            placeholder: '500000',
            min: 0,
            step: 1000,
          },
        ]}
      />

      {/* Dish grid */}
      <div className="menu-dish-grid">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="menu-skeleton" />
          ))
        ) : dishes.length === 0 ? (
          <div className="menu-empty">
            <div className="menu-empty-icon">🍽️</div>
            <p>Chưa có món ăn nào</p>
          </div>
        ) : (
          dishes.map(dish => (
            <div key={dish.id} className="menu-dish-card">

              {/* Image */}
              <div className="menu-dish-img-wrap" style={{ position: 'relative', height: 152, flexShrink: 0 }}>
                {dish.images?.[0] ? (
                  <img
                    src={dish.images[0].imageUrl}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 40, opacity: 0.3,
                    background: 'linear-gradient(135deg, #f8f4ef, #ede9e2)',
                  }}>
                    🍽️
                  </div>
                )}

                {/* Availability badge */}
                {(() => {
                  const isAvailable = getDishAvailability(dish);
                  return (
                    <span className={`menu-avail-badge ${isAvailable ? 'on' : 'off'}`}>
                      {isAvailable ? 'Có sẵn' : 'Tạm hết'}
                    </span>
                  );
                })()}
              </div>

              {/* Card body */}
              <div className="menu-dish-body">
                {dish.categories?.length ? (
                  <span className="menu-dish-category">{dish.categories[0].name}</span>
                ) : null}
                <p className="menu-dish-name">{dish.name}</p>
                {dish.description && (
                  <p className="menu-dish-desc">{dish.description}</p>
                )}
                <p className="menu-dish-price">
                  {dish.priceAmount?.toLocaleString?.() ?? 0}₫
                </p>

                {/* Availability toggle + action buttons */}
                <div className="menu-avail-row">
                  <label className="menu-toggle" title="Bật/tắt khả dụng">
                    <span className="menu-toggle-track">
                      <input
                        type="checkbox"
                        checked={getDishAvailability(dish)}
                        onChange={() => handleAvailabilityChange(dish.id, getDishAvailability(dish))}
                      />
                      <span className="menu-toggle-thumb" />
                    </span>
                    <span className="menu-toggle-label">
                      {getDishAvailability(dish) ? 'Có sẵn' : 'Tạm hết'}
                    </span>
                  </label>

                  <ActionButton
                    label="Sửa"
                    onClick={() => navigate(`/dashboard/menu/edit/${dish.id}`)}
                    variant="secondary"
                    size="sm"
                    className="menu-btn-ghost"
                  />
                  <ActionButton
                    label="Xóa"
                    onClick={() => handleDelete(dish.id)}
                    variant="danger"
                    size="sm"
                    className="menu-btn-danger-ghost"
                  />
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="menu-pagination" style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center', marginTop: 20 }}>
          <ActionButton
            label="‹ Trước"
            onClick={() => handlePageChange(filters.page - 1)}
            variant="secondary"
            size="sm"
            className="menu-btn-ghost"
            disabled={filters.page <= 1}
          />
          <span style={{ fontSize: 14, color: '#4b5563' }}>
            Trang {filters.page} / {pagination.totalPages}
          </span>
          <ActionButton
            label="Sau ›"
            onClick={() => handlePageChange(filters.page + 1)}
            variant="secondary"
            size="sm"
            className="menu-btn-ghost"
            disabled={filters.page >= pagination.totalPages}
          />
        </div>
      )}

      </div>
    </ErrorBoundary>
  );
};
