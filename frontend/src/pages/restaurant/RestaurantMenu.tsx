import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../../context/MenuContext';
import { ActionButton } from '../../components/common/ActionButton';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { FilterBar } from '../../components/common/FilterBar';
import { notifyError, notifySuccess, confirmDialog } from '../../utils/notify';
import { IconPencil, IconTrash } from '@tabler/icons-react';

const getAvail = (dish: { isAvailable?: boolean; available?: boolean }) =>
  dish.isAvailable ?? dish.available ?? false;

/* ── Category modal ── */
const CategoryModal: React.FC<{
  categories: any[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
  onClose: () => void;
}> = ({ categories, selectedIds, onToggle, onClear, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(15,23,42,0.45)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.15s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform: translateY(20px) scale(0.97) } to { opacity:1; transform: translateY(0) scale(1) } }
      `}</style>
      <div style={{
        background: '#fff', borderRadius: 20, width: '100%', maxWidth: 520,
        boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
        animation: 'slideUp 0.2s ease',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px' }}>Lọc theo loại món</h3>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>{selectedIds.length > 0 ? `Đang chọn ${selectedIds.length} danh mục` : 'Chọn một hoặc nhiều danh mục'}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {selectedIds.length > 0 && (
              <button
                onClick={onClear}
                style={{ padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: '#fef2f2', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)', cursor: 'pointer' }}
              >
                Xóa lọc
              </button>
            )}
            <button
              onClick={onClose}
              style={{ padding: '8px 12px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
        </div>
        {/* Categories grid */}
        <div style={{ padding: '16px 24px 24px', maxHeight: '55vh', overflowY: 'auto' }}>
          {categories.length === 0 ? (
            <p style={{ fontSize: 13, color: '#94a3b8', textAlign: 'center', padding: '20px 0' }}>Chưa có danh mục nào.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {categories.map((cat: any) => {
                const selected = selectedIds.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onToggle(cat.id)}
                    style={{
                      borderRadius: 12, border: selected ? '1.5px solid #f97316' : '1.5px solid #e2e8f0',
                      padding: '10px 12px', textAlign: 'left', cursor: 'pointer',
                      background: selected ? 'linear-gradient(135deg, #fff7ed, #ffedd5)' : '#fff',
                      transition: 'all 0.15s',
                      boxShadow: selected ? '0 2px 8px rgba(249,115,22,0.15)' : 'none',
                    }}
                    onMouseEnter={e => { if (!selected) { (e.currentTarget as HTMLElement).style.borderColor = '#fdba74'; (e.currentTarget as HTMLElement).style.background = '#fffbf5'; } }}
                    onMouseLeave={e => { if (!selected) { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.background = '#fff'; } }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 5, border: selected ? '2px solid #f97316' : '2px solid #d1d5db',
                        background: selected ? '#f97316' : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        transition: 'all 0.15s',
                      }}>
                        {selected && (
                          <svg width="10" height="10" viewBox="0 0 9 9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                            <polyline points="1.3 4.5 3.5 6.7 7.7 2" />
                          </svg>
                        )}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: selected ? '#c2410c' : '#0f172a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.name}</p>
                        {cat.description && <p style={{ fontSize: 10, color: '#94a3b8', margin: '1px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.description}</p>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const RestaurantMenu: React.FC = () => {
  const navigate = useNavigate();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const {
    dishes, categories, loading, error, filters, pagination,
    setFilters, loadDishes, loadCategories, updateDishAvailability, deleteDish, clearError,
  } = useMenu();

  useEffect(() => {
    loadDishes().catch(() => { });
    loadCategories().catch(() => { });
  }, [loadDishes, loadCategories]);

  useEffect(() => {
    if (error) { notifyError(error); clearError(); }
  }, [error, clearError]);

  const handleAvailabilityChange = async (dishId: string, current: boolean) => {
    try {
      await updateDishAvailability(dishId, !current);
      notifySuccess('Cập nhật trạng thái thành công');
    } catch (err: any) {
      notifyError(err?.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  const handleDelete = async (dishId: string) => {
    const confirmed = await confirmDialog('Xác nhận xóa', 'Bạn chắc chắn muốn xóa món ăn này?');
    if (!confirmed) return;
    try {
      await deleteDish(dishId);
      notifySuccess('Xóa món thành công');
    } catch (err: any) {
      notifyError(err?.response?.data?.message || 'Xóa thất bại');
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    const updated = { ...filters, [key]: value, page: 1 };
    setFilters(updated);
    loadDishes(updated).catch(() => { });
  };

  const toggleCategory = (catId: string) => {
    const next = filters.categoryIds.includes(catId)
      ? filters.categoryIds.filter((id: string) => id !== catId)
      : [...filters.categoryIds, catId];
    const updated = { ...filters, categoryIds: next, page: 1 };
    setFilters(updated);
    loadDishes(updated).catch(() => { });
  };

  const clearCategories = () => {
    const updated = { ...filters, categoryIds: [], page: 1 };
    setFilters(updated);
    loadDishes(updated).catch(() => { });
  };

  const handlePageChange = React.useCallback((next: number) => {
    if (next < 1 || next > pagination.totalPages) return;
    const updated = { ...filters, page: next };
    setFilters(updated);
    loadDishes(updated).catch(() => { });
  }, [filters, pagination.totalPages, setFilters, loadDishes]);

  const currentPage = pagination.page;

  const selectedCatCount = filters.categoryIds.length;

  return (
    <ErrorBoundary>
      <div className="space-y-5">
        <style>{`
          .dish-card { transition: box-shadow 0.2s, transform 0.2s; }
          .dish-card:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.11) !important; transform: translateY(-3px); }
          .dish-img { transition: transform 0.5s ease; }
          .dish-card:hover .dish-img { transform: scale(1.06); }
          .dish-title { min-height: 2.5rem; }
          .dish-desc { min-height: 3rem; }
          .dish-actions { min-height: 2.75rem; }
        `}</style>

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.6px' }}>
              Quản lý thực đơn
            </h1>
            {pagination?.totalItems > 0 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4, padding: '3px 10px', borderRadius: 99, background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', border: '1px solid rgba(249,115,22,0.25)' }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: '#f97316', letterSpacing: '-0.5px', lineHeight: 1 }}>{pagination.totalItems.toLocaleString()}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#c2410c' }}>món trong thực đơn</span>
              </div>
            )}
          </div>
          <ActionButton
            label="Thêm món mới"
            onClick={() => navigate('/dashboard/menu/create')}
            variant="primary"
            size="md"
            icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            }
          />
        </div>

        {/* Toolbar: category button and filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <button
              type="button"
              onClick={() => setShowCategoryModal(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '9px 16px', borderRadius: 12,
                border: selectedCatCount > 0 ? '1.5px solid #f97316' : '1.5px solid #e2e8f0',
                background: selectedCatCount > 0 ? 'linear-gradient(135deg, #fff7ed, #ffedd5)' : '#fff',
                color: selectedCatCount > 0 ? '#c2410c' : '#374151',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Loại món
              {selectedCatCount > 0 ? (
                <span style={{ background: '#f97316', color: '#fff', borderRadius: 99, padding: '1px 7px', fontSize: 11, fontWeight: 800 }}>
                  {selectedCatCount}
                </span>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              options={[
                { label: 'Tên món', key: 'search', type: 'text', placeholder: 'Nhập tên món...' },
                { label: 'Giá từ', key: 'minPrice', type: 'number', placeholder: '0', min: 0, step: 1000 },
                { label: 'Giá đến', key: 'maxPrice', type: 'number', placeholder: '500.000', min: 0, step: 1000 },
              ]}
            />
          </div>
        </div>

        {/* Active category chips */}
        {selectedCatCount > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            {filters.categoryIds.slice(0, 3).map((id: string) => {
              const cat = categories.find((c: any) => c.id === id);
              return cat ? (
                <span key={id} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                  background: 'rgba(249,115,22,0.1)', color: '#c2410c', border: '1px solid rgba(249,115,22,0.2)',
                }}>
                  {cat.name}
                  <button onClick={() => toggleCategory(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#f97316', lineHeight: 1, fontSize: 14 }}>×</button>
                </span>
              ) : null;
            })}
            {selectedCatCount > 3 && (
              <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>+{selectedCatCount - 3} khác</span>
            )}
            <button onClick={clearCategories} style={{ fontSize: 11, color: '#dc2626', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px' }}>
              Xóa tất cả
            </button>
          </div>
        )}

        {/* Dish grid — 5 per row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ height: 240, borderRadius: 16, background: 'linear-gradient(90deg, #f1f5f9 25%, #f8fafc 50%, #f1f5f9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
            ))
          ) : dishes.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', borderRadius: 20, border: '2px dashed #e2e8f0', background: '#fff', color: '#94a3b8' }}>
              <p style={{ margin: '16px 0 4px', fontSize: 16, fontWeight: 700, color: '#475569' }}>Chưa có món ăn nào</p>
              <p style={{ margin: 0, fontSize: 13 }}>Hãy thêm món đầu tiên!</p>
            </div>
          ) : (
            dishes.map((dish: any) => {
              const avail = getAvail(dish);
              return (
                <div key={dish.id} className="dish-card" style={{ borderRadius: 16, border: '1px solid #f1f5f9', background: '#fff', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                  {/* Image */}
                  <div style={{ position: 'relative', height: 130, overflow: 'hidden', background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)' }}>
                    {dish.images?.[0] ? (
                      <img className="dish-img" src={dish.images[0].imageUrl} alt={dish.name} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#cbd5e1' }}>🍽️</div>
                    )}
                    {/* Availability pill */}
                    <span style={{
                      position: 'absolute', top: 8, right: 8,
                      padding: '3px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700,
                      background: avail ? 'rgba(16,185,129,0.9)' : 'rgba(100,116,139,0.85)',
                      color: '#fff', backdropFilter: 'blur(4px)',
                    }}>
                      {avail ? '● Có sẵn' : '○ Tạm hết'}
                    </span>
                    {/* Category */}
                    {dish.categories?.length > 0 && (
                      <span style={{
                        position: 'absolute', bottom: 8, left: 8,
                        padding: '2px 8px', borderRadius: 99, fontSize: 9, fontWeight: 800,
                        background: 'rgba(249,115,22,0.9)', color: '#fff',
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                        backdropFilter: 'blur(4px)',
                      }}>
                        {dish.categories[0].name}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column' }}>
                    <div className="dish-title" style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: '1.25rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
                        {dish.name}
                      </p>
                    </div>
                    {dish.description && (
                      <p className="dish-desc" style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 8px', lineHeight: '1rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as any }}>
                        {dish.description}
                      </p>
                    )}
                    <p style={{ fontSize: 15, fontWeight: 800, color: '#f97316', margin: '0 0 10px', letterSpacing: '-0.3px', minHeight: '1.5rem' }}>
                      {(dish.priceAmount ?? 0).toLocaleString()}₫
                    </p>

                    {/* Actions */}
                    <div className="dish-actions" style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handleAvailabilityChange(dish.id, avail)}
                        aria-label={avail ? 'Có sẵn' : 'Tạm hết'}
                        style={{
                          position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 60, height: 30, borderRadius: 999,
                          border: `1px solid ${avail ? '#16a34a' : 'rgba(100,116,139,0.85)'}`,
                          background: avail ? 'rgba(16,185,129,0.18)' : 'rgba(100,116,139,0.12)',
                          color: 'transparent',
                          fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', padding: 0,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = avail ? 'rgba(16,185,129,0.25)' : 'rgba(100,116,139,0.18)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = avail ? 'rgba(16,185,129,0.18)' : 'rgba(100,116,139,0.12)'; }}
                      >
                        <span style={{
                          position: 'absolute', left: avail ? 'calc(100% - 22px)' : '4px',
                          width: 18, height: 18, borderRadius: '50%',
                          background: avail ? '#16a34a' : 'rgba(100,116,139,0.85)',
                          transition: 'left 0.15s ease',
                        }} />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/dashboard/menu/edit/${dish.id}`)}
                        aria-label="Sửa món"
                        style={{ marginLeft: 77, width: 34, height: 30, borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', padding: 0 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#f1f5f9'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f8fafc'; }}
                      >
                        <IconPencil size={16} stroke={2} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(dish.id)}
                        aria-label="Xóa món"
                        style={{ width: 34, height: 30, borderRadius: 8, border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(254,242,242,0.8)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', padding: 0 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fef2f2'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.4)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(254,242,242,0.8)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.2)'; }}
                      >
                        <IconTrash size={16} stroke={2} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (() => {
          const total = pagination.totalPages;
          const cur = currentPage;
          const windowSize = 5;
          // Compute the window start: keep current page roughly centered, clamped
          const windowStart = Math.max(1, Math.min(cur - Math.floor(windowSize / 2), total - windowSize + 1));
          const windowEnd = Math.min(total, windowStart + windowSize - 1);
          const pages = Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => windowStart + i);

          const btnBase: React.CSSProperties = {
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: 10,
            border: '1px solid #e2e8f0', background: '#fff',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.15s', padding: 0, flexShrink: 0,
          };
          const btnActive: React.CSSProperties = {
            ...btnBase, color: '#374151',
          };
          const btnNav: React.CSSProperties = {
            ...btnBase, fontSize: 16,
          };
          const btnNavDisabled: React.CSSProperties = {
            ...btnBase, fontSize: 16, color: '#cbd5e1', cursor: 'not-allowed', background: '#f8fafc',
          };
          const btnCurrent: React.CSSProperties = {
            ...btnBase,
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            color: '#fff', border: '1px solid #f97316',
            boxShadow: '0 3px 8px rgba(249,115,22,0.3)',
            fontWeight: 700,
          };

          return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '12px 16px', borderRadius: 14, background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              {/* First page << */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={cur <= 1}
                title="Trang đầu"
                style={cur <= 1 ? btnNavDisabled : btnNav}
              >«</button>

              {/* Prev page < */}
              <button
                onClick={() => handlePageChange(cur - 1)}
                disabled={cur <= 1}
                title="Trang trước"
                style={cur <= 1 ? btnNavDisabled : btnNav}
              >‹</button>

              {/* Page number buttons */}
              {pages.map(p => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  style={p === cur ? btnCurrent : btnActive}
                >
                  {p}
                </button>
              ))}

              {/* Next page > */}
              <button
                onClick={() => handlePageChange(cur + 1)}
                disabled={cur >= total}
                title="Trang sau"
                style={cur >= total ? btnNavDisabled : btnNav}
              >›</button>

              {/* Last page >> */}
              <button
                onClick={() => handlePageChange(total)}
                disabled={cur >= total}
                title="Trang cuối"
                style={cur >= total ? btnNavDisabled : btnNav}
              >»</button>
            </div>
          );
        })()}

        {/* Category Modal */}
        {showCategoryModal && (
          <CategoryModal
            categories={categories}
            selectedIds={filters.categoryIds}
            onToggle={toggleCategory}
            onClear={clearCategories}
            onClose={() => setShowCategoryModal(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};
