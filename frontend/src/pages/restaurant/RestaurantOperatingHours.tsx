import React, { useState, useEffect } from 'react';
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
  const { operatingHours, loading, error, loadOperatingHours, updateOperatingHours, clearError } = useRestaurant();
  const [hours, setHours] = useState<Record<number, { open: number; close: number; active: boolean }>>({});

  useEffect(() => {
    loadOperatingHours().catch(() => {});
  }, []);

  useEffect(() => {
    if (error) {
      void notifyError(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    const hoursMap: Record<number, { open: number; close: number; active: boolean }> = {};
    DAYS.forEach((day) => {
      const existing = operatingHours.find((h) => h.dayOfWeek === day.value);
      hoursMap[day.value] = {
        open: existing?.openHour || 9,
        close: existing?.closeHour || 22,
        active: !!existing,
      };
    });
    setHours(hoursMap);
  }, [operatingHours]);

  const handleSave = async () => {
    try {
      const hoursToSave = Object.entries(hours)
        .filter(([_, h]) => h.active)
        .map(([day, h]) => ({
          dayOfWeek: parseInt(day, 10),
          openHour: h.open,
          closeHour: h.close,
        }));

      await updateOperatingHours(hoursToSave);
      void notifySuccess('Cập nhật giờ hoạt động thành công');
    } catch {
      void notifyError('Cập nhật thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Giờ hoạt động</h1>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Đang tải dữ liệu...</div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <div className="space-y-4">
            {DAYS.map((day) => (
              <div key={day.value} className="flex flex-col gap-4 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-3 text-slate-800 font-semibold">
                  <input
                    type="checkbox"
                    checked={hours[day.value]?.active || false}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        [day.value]: { ...hours[day.value], active: e.target.checked },
                      })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                  />
                  {day.label}
                </label>

                {hours[day.value]?.active ? (
                  <div className="grid gap-3 sm:grid-cols-[auto_auto_1fr] sm:items-center">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <span>Mở lúc:</span>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={hours[day.value]?.open || 9}
                        onChange={(e) =>
                          setHours({
                            ...hours,
                            [day.value]: { ...hours[day.value], open: parseInt(e.target.value, 10) || 0 },
                          })
                        }
                        className="w-16 rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                      <span>h</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <span>Đóng lúc:</span>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={hours[day.value]?.close || 22}
                        onChange={(e) =>
                          setHours({
                            ...hours,
                            [day.value]: { ...hours[day.value], close: parseInt(e.target.value, 10) || 0 },
                          })
                        }
                        className="w-16 rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                      />
                      <span>h</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm italic text-slate-500">Nghỉ cả ngày</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border-l-4 border-blue-500 bg-blue-50 p-4 text-sm text-blue-800">
            💡 Nếu giờ đóng &lt; giờ mở, hệ thống sẽ tính là qua đêm (ví dụ: 22h - 02h)
          </div>

          <ActionButton label="💾 Lưu giờ hoạt động" onClick={handleSave} className="mt-6 w-full" />
        </div>
      )}
    </div>
  );
};
