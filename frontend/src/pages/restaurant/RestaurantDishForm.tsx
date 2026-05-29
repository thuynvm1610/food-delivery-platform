import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionButton } from '../../components/common/ActionButton';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { ImageUploader } from '../../components/common/ImageUploader';
import { restaurantApi } from '../../api/restaurant';
import { useMenu } from '../../context/MenuContext';
import { notifyError, notifySuccess } from '../../utils/notify';
import Swal from 'sweetalert2';
import type { Dish, DishImage } from '../../types/restaurant';

const initialFormState = {
    name: '',
    description: '',
    priceAmount: 0,
    priceCurrency: 'VND',
};

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    borderRadius: 12, border: '1.5px solid #e2e8f0',
    background: '#f8fafc', fontSize: 13, color: '#0f172a',
    outline: 'none', transition: 'all 0.15s',
    fontFamily: 'inherit',
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

    const loadDish = useCallback(async () => {
        if (!id) return;
        setLoading(true);
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
            setSelectedCategoryIds(loadedDish.categories?.map((c: any) => c.id) || []);
        } catch (err: any) {
            notifyError(err?.response?.data?.message || 'Không thể tải dữ liệu món ăn.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => { loadCategories().catch(() => { }); }, [loadCategories]);

    useEffect(() => {
        if (isEdit) { loadDish(); return; }
        setDish(null);
        setFormData(initialFormState);
        setExistingImages([]);
        setSelectedImageIds([]);
        setSelectedCategoryIds([]);
        setNewImages([]);
    }, [isEdit, loadDish]);

    const toggleImageSelection = (imageId: string) =>
        setSelectedImageIds(prev => prev.includes(imageId) ? prev.filter(i => i !== imageId) : [...prev, imageId]);

    const toggleCategorySelection = (categoryId: string) =>
        setSelectedCategoryIds(prev => prev.includes(categoryId) ? prev.filter(i => i !== categoryId) : [...prev, categoryId]);

    const handleDeleteSelectedImages = async () => {
        if (!dish || selectedImageIds.length === 0) return;
        if (existingImages.length - selectedImageIds.length === 0 && newImages.length === 0) {
            notifyError('Ít nhất một ảnh phải được giữ lại hoặc tải ảnh mới trước khi xóa.');
            return;
        }
        setLoading(true);
        try {
            await deleteDishImages(dish.id, selectedImageIds);
            setExistingImages(existingImages.filter(img => !selectedImageIds.includes(img.id)));
            setSelectedImageIds([]);
            notifySuccess('Xóa ảnh thành công.');
        } catch (err: any) {
            notifyError(err?.response?.data?.message || 'Không thể xóa ảnh.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) { notifyError('Tên món không được để trống.'); return; }
        if (formData.priceAmount <= 0) { notifyError('Giá món phải lớn hơn 0.'); return; }
        setLoading(true);
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

            let imageUploadFailed = false;
            if (newImages.length > 0 && createdDishId) {
                // Hiện SweetAlert loading — block toàn bộ tương tác
                Swal.fire({
                    title: 'Đang tải ảnh lên...',
                    html: `<p style="color:#64748b;font-size:14px;margin:0">Vui lòng không đóng trang này</p>`,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    showConfirmButton: false,
                    didOpen: () => Swal.showLoading(),
                    customClass: {
                        popup: 'swal-upload-popup',
                    },
                });

                const formPayload = new FormData();
                newImages.forEach(file => formPayload.append('images', file));
                try {
                    await restaurantApi.uploadDishImages(createdDishId, formPayload);
                } catch (uploadErr: any) {
                    imageUploadFailed = true;
                    notifyError(uploadErr?.response?.data?.message || 'Tải ảnh thất bại sau khi lưu món.');
                } finally {
                    // Đóng SweetAlert dù thành công hay thất bại
                    Swal.close();
                }
            }

            if (!imageUploadFailed) {
                notifySuccess(isEdit ? 'Cập nhật món thành công.' : 'Tạo món thành công.');
            } else {
                notifySuccess(isEdit ? 'Cập nhật món thành công. Một số ảnh chưa được tải lên.' : 'Tạo món thành công. Một số ảnh chưa được tải lên.');
            }
            navigate('/dashboard/menu');
        } catch (err: any) {
            notifyError(err?.response?.data?.message || 'Có lỗi xảy ra khi lưu món ăn.');
        } finally {
            setLoading(false);
        }
    };

    const selectedCategoryLabels = selectedCategoryIds
        .map(cid => categories.find(c => c.id === cid)?.name)
        .filter(Boolean);

    return (
        <ErrorBoundary>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <style>{`
          .form-input:focus { border-color: #f97316 !important; background: #fff !important; box-shadow: 0 0 0 3px rgba(249,115,22,0.1) !important; }
          .form-input:hover { border-color: #cbd5e1 !important; }
          .cat-btn { transition: all 0.15s; }
          .cat-btn:hover { transform: translateY(-1px); }
          .img-thumb:hover .img-overlay { opacity: 1 !important; }
        `}</style>

                {/* Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
                            {isEdit ? 'Chỉnh sửa món ăn' : 'Thêm món ăn mới'}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <ActionButton label="Trở về" onClick={() => navigate('/dashboard/menu')} variant="secondary" size="md" />
                        <ActionButton label={isEdit ? 'Lưu thay đổi' : 'Tạo món'} onClick={handleSubmit} variant="primary" size="md" disabled={loading} loading={loading} />
                    </div>
                </div>

                {/* Body */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, alignItems: 'start' }}>
                    {/* Left — form */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* Basic info card */}
                        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                            <p style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 14px' }}>Thông tin cơ bản</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 5 }}>Tên món</label>
                                    <input
                                        className="form-input"
                                        style={inputStyle}
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Nhập tên món"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 5 }}>Giá (VND)</label>
                                    <input
                                        className="form-input"
                                        style={inputStyle}
                                        type="number"
                                        value={formData.priceAmount}
                                        onChange={e => setFormData({ ...formData, priceAmount: Number(e.target.value) })}
                                        min={0} step={1000} placeholder="0"
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 5 }}>Mô tả</label>
                                <textarea
                                    className="form-input"
                                    style={{ ...inputStyle, minHeight: 96, resize: 'vertical' }}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Mô tả món ăn"
                                />
                            </div>
                        </div>

                        {/* Categories card */}
                        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Loại món</p>
                                    <p style={{ fontSize: 12, color: '#cbd5e1', margin: '2px 0 0' }}>Chọn các loại phù hợp</p>
                                </div>
                                {selectedCategoryIds.length > 0 && (
                                    <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: 'rgba(249,115,22,0.1)', color: '#c2410c' }}>
                                        {selectedCategoryIds.length} đã chọn
                                    </span>
                                )}
                            </div>
                            {categories.length === 0 ? (
                                <p style={{ fontSize: 12, color: '#94a3b8' }}>Chưa có loại món nào.</p>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
                                    {categories.map(cat => {
                                        const selected = selectedCategoryIds.includes(cat.id);
                                        return (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                className="cat-btn"
                                                onClick={() => toggleCategorySelection(cat.id)}
                                                style={{
                                                    borderRadius: 12, border: selected ? '1.5px solid #f97316' : '1.5px solid #e2e8f0',
                                                    padding: '10px 12px', textAlign: 'left', cursor: 'pointer',
                                                    background: selected ? 'linear-gradient(135deg, #fff7ed, #ffedd5)' : '#f8fafc',
                                                    boxShadow: selected ? '0 2px 8px rgba(249,115,22,0.12)' : 'none',
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <span style={{
                                                        width: 16, height: 16, borderRadius: 5,
                                                        border: selected ? '2px solid #f97316' : '2px solid #d1d5db',
                                                        background: selected ? '#f97316' : '#fff',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s',
                                                    }}>
                                                        {selected && (
                                                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
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
                            {selectedCategoryLabels.length > 0 && (
                                <p style={{ fontSize: 11, color: '#94a3b8', margin: '12px 0 0' }}>
                                    Đang chọn: <span style={{ color: '#f97316', fontWeight: 600 }}>{selectedCategoryLabels.join(', ')}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right — images */}
                    <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', position: 'sticky', top: 20 }}>
                        <p style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Ảnh món ăn</p>
                        <p style={{ fontSize: 12, color: 'rgb(148, 163, 184)', margin: '0 0 14px' }}>Quản lý ảnh và tải ảnh mới</p>

                        {/* Existing images — compact grid */}
                        {isEdit && existingImages.length > 0 && (
                            <div style={{ marginBottom: 14 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 10 }}>
                                    {existingImages.map(image => {
                                        const selected = selectedImageIds.includes(image.id);
                                        return (
                                            <button
                                                key={image.id}
                                                type="button"
                                                className="img-thumb"
                                                onClick={() => toggleImageSelection(image.id)}
                                                style={{
                                                    position: 'relative', overflow: 'hidden', borderRadius: 10,
                                                    border: selected ? '2px solid #f97316' : '2px solid transparent',
                                                    padding: 0, cursor: 'pointer', aspectRatio: '1', background: '#f1f5f9',
                                                    boxShadow: selected ? '0 0 0 2px rgba(249,115,22,0.25)' : 'none',
                                                    transition: 'all 0.15s',
                                                }}
                                            >
                                                <img src={image.imageUrl} alt="Dish" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                <div
                                                    className="img-overlay"
                                                    style={{
                                                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        opacity: selected ? 1 : 0, transition: 'opacity 0.15s',
                                                    }}
                                                >
                                                    {selected ? (
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                    ) : (
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3" /><polyline points="9 11 12 14 22 4" /></svg>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {selectedImageIds.length > 0 && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                        <ActionButton
                                            label={`Xóa ${selectedImageIds.length} ảnh`}
                                            onClick={handleDeleteSelectedImages}
                                            variant="danger"
                                            size="sm"
                                            disabled={loading}
                                        />
                                        <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{existingImages.length} ảnh hiện có</p>
                                    </div>
                                )}

                                <div style={{ height: 1, background: '#f1f5f9', margin: '12px 0' }} />
                            </div>
                        )}

                        <ImageUploader onImagesSelected={setNewImages} maxFiles={5} />
                        <p style={{ fontSize: 12, color: 'rgb(148, 163, 184)', margin: '10px 0 0' }}>Tối đa 5 ảnh.</p>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};