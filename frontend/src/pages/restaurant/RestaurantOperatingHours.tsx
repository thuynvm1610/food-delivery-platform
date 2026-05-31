import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRestaurant } from '../../context/RestaurantContext';
import { ActionButton } from '../../components/common/ActionButton';
import { notifyError, notifySuccess } from '../../utils/notify';

const DAYS = [
  { value: 2, label: 'Thứ Hai' },
  { value: 3, label: 'Thứ Ba' },
  { value: 4, label: 'Thứ Tư' },
  { value: 5, label: 'Thứ Năm' },
  { value: 6, label: 'Thứ Sáu' },
  { value: 7, label: 'Thứ Bảy' },
  { value: 8, label: 'Chủ Nhật' },
];

export const RestaurantOperatingHours: React.FC = () => {
  const { operatingHours, loading, error, loadOperatingHours, updateOperatingHours, clearError } =
    useRestaurant();
  const [hours, setHours] = useState<Record<number, { open: number; close: number; active: boolean }>>({});

  useEffect(() => {
    loadOperatingHours().catch(() => { });
  }, []);

  useEffect(() => {
    if (error) {
      void notifyError(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    const map: Record<number, { open: number; close: number; active: boolean }> = {};
    DAYS.forEach((day) => {
      const existing = operatingHours.find((h) => h.dayOfWeek === day.value);
      const isActive = !!existing && !(existing.openHour === 0 && existing.closeHour === 0);
      map[day.value] = {
        open: existing?.openHour ?? 9,
        close: existing?.closeHour ?? 22,
        active: isActive,
      };
    });
    setHours(map);
  }, [operatingHours]);

  const handleSave = async () => {
    try {
      const payload = DAYS.map((day) => {
        const h = hours[day.value];
        return {
          dayOfWeek: day.value,
          openHour: h?.active ? h.open : 0,
          closeHour: h?.active ? h.close : 0,
        };
      });
      await updateOperatingHours(payload);
      void notifySuccess('Cập nhật giờ hoạt động thành công');
    } catch {
      void notifyError('Cập nhật thất bại');
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-medium text-slate-900">Giờ hoạt động</h1>

      {loading ? (
        <div className="py-16 text-center text-sm text-slate-400">Đang tải dữ liệu...</div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {DAYS.map((day, idx) => {
              const h = hours[day.value];
              const isLast = idx === DAYS.length - 1;
              return (
                <div
                  key={day.value}
                  className={[
                    'flex items-center justify-between gap-4 px-5 py-3.5 transition-colors',
                    h?.active ? 'bg-orange-50/60' : 'bg-white',
                    !isLast ? 'border-b border-slate-100' : '',
                  ].join(' ')}
                >
                  {/* Left: checkbox + day label */}
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={h?.active ?? false}
                      onChange={(e) =>
                        setHours({ ...hours, [day.value]: { ...h, active: e.target.checked } })
                      }
                      className="h-4 w-4 cursor-pointer rounded border-slate-300 text-orange-500 focus:ring-orange-400 focus:ring-offset-0"
                    />
                    <span className="w-20 text-sm font-medium text-slate-800">{day.label}</span>
                  </label>

                  {/* Right: time inputs or closed label */}
                  {h?.active ? (
                    <div className="flex items-center gap-4">
                      <TimeField
                        label="Mở"
                        value={h.open ?? 9}
                        onChange={(v) => setHours({ ...hours, [day.value]: { ...h, open: v } })}
                      />
                      <span className="text-xs text-slate-300">—</span>
                      <TimeField
                        label="Đóng"
                        value={h.close ?? 22}
                        onChange={(v) => setHours({ ...hours, [day.value]: { ...h, close: v } })}
                      />
                    </div>
                  ) : (
                    <span className="text-xs italic text-slate-400">Nghỉ cả ngày</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <ActionButton
              label="Lưu thay đổi"
              onClick={async () => {
                const result = await Swal.fire({
                  title: 'Xác nhận lưu',
                  text: 'Bạn có chắc muốn cập nhật giờ hoạt động?',
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonText: 'Lưu',
                  cancelButtonText: 'Huỷ',
                  confirmButtonColor: '#f97316',
                  cancelButtonColor: '#94a3b8',
                  reverseButtons: true,
                });
                if (result.isConfirmed) {
                  await handleSave();
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

interface TimeFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
}

const TimeField: React.FC<TimeFieldProps> = ({ label, value, onChange }) => (
  <div className="flex items-center gap-1.5">
    <span className="text-xs text-slate-400">{label}</span>
    <input
      type="number"
      min={0}
      max={23}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
      className="w-12 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
    />
    <span className="text-xs text-slate-400">h</span>
  </div>
);