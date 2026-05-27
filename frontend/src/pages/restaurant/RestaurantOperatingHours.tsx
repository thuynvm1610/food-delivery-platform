import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { ActionButton } from '../../components/common/ActionButton';
import { Toast } from '../../components/common/Toast';

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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadOperatingHours().catch(() => {});
  }, []);

  useEffect(() => {
    // Initialize hours from operatingHours
    const hoursMap: Record<number, { open: number; close: number; active: boolean }> = {};
    DAYS.forEach(day => {
      const existing = operatingHours.find(h => h.dayOfWeek === day.value);
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
          dayOfWeek: parseInt(day),
          openHour: h.open,
          closeHour: h.close,
        }));

      await updateOperatingHours(hoursToSave);
      setToastMessage('✓ Cập nhật giờ hoạt động thành công');
    } catch (err) {
      setToastMessage('✕ Cập nhật thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Giờ hoạt động</h1>

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
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            {DAYS.map(day => (
              <div key={day.value} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                <label className="flex items-center gap-2 w-28">
                  <input
                    type="checkbox"
                    checked={hours[day.value]?.active || false}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        [day.value]: { ...hours[day.value], active: e.target.checked },
                      })
                    }
                    className="w-4 h-4"
                  />
                  <span className="font-semibold">{day.label}</span>
                </label>

                {hours[day.value]?.active && (
                  <>
                    <div className="flex items-center gap-2">
                      <label className="text-sm">Mở lúc:</label>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={hours[day.value]?.open || 9}
                        onChange={(e) =>
                          setHours({
                            ...hours,
                            [day.value]: { ...hours[day.value], open: parseInt(e.target.value) },
                          })
                        }
                        className="w-16 border border-gray-300 rounded px-2 py-1"
                      />
                      <span>h</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-sm">Đóng lúc:</label>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={hours[day.value]?.close || 22}
                        onChange={(e) =>
                          setHours({
                            ...hours,
                            [day.value]: { ...hours[day.value], close: parseInt(e.target.value) },
                          })
                        }
                        className="w-16 border border-gray-300 rounded px-2 py-1"
                      />
                      <span>h</span>
                    </div>
                  </>
                )}

                {!hours[day.value]?.active && <span className="text-gray-500 italic">Nghỉ cả ngày</span>}
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded border-l-4 border-blue-500">
            <p className="text-sm text-blue-800">
              💡 Nếu giờ đóng &lt; giờ mở, hệ thống sẽ tính là qua đêm (ví dụ: 22h - 02h)
            </p>
          </div>

          <ActionButton label="💾 Lưu giờ hoạt động" onClick={handleSave} className="mt-6 w-full" />
        </div>
      )}
    </div>
  );
};
