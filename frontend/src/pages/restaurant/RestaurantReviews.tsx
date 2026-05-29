import React, { useEffect, useState } from 'react';
import { restaurantApi } from '../../api/restaurant';
import { notifyError } from '../../utils/notify';
import type { DishReview } from '../../types/restaurant';

export const RestaurantReviews: React.FC = () => {
  const [reviews, setReviews] = useState<DishReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => {
    loadReviews();
  }, [filterRating]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await restaurantApi.getRestaurantReviews({ rating: filterRating || undefined });
      setReviews(response.data.data);
    } catch (err) {
      notifyError('Không thể tải đánh giá');
    } finally {
      setLoading(false);
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    return (reviews.reduce((sum, r) => sum + r.ratingStars, 0) / reviews.length).toFixed(1);
  };

  const getRatingCount = (stars: number) => {
    return reviews.filter(r => r.ratingStars === stars).length;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Đánh giá từ khách hàng</h1>

      <div className="bg-white rounded-3xl shadow-sm p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="text-center lg:text-left">
            <p className="text-4xl font-bold text-orange-500">{getAverageRating()}</p>
            <p className="text-gray-600">Đánh giá trung bình</p>
            <p className="text-sm text-gray-500">({reviews.length} đánh giá)</p>
          </div>

          <div className="flex-1 space-y-3">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm font-semibold">{stars}⭐</span>
                <div className="flex-1 overflow-hidden rounded-full bg-gray-200 h-2">
                  <div
                    className="h-2 rounded-full bg-orange-400"
                    style={{ width: `${(getRatingCount(stars) / reviews.length) * 100 || 0}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{getRatingCount(stars)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[null, 5, 4, 3, 2, 1].map(rating => (
          <button
            key={rating ?? 'all'}
            onClick={() => setFilterRating(rating)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filterRating === rating
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {rating ? `${rating}⭐` : 'Tất cả'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Không có đánh giá</div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="bg-white rounded-3xl shadow-sm p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">Khách #{review.customerId.slice(0, 8)}</p>
                  <p className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>
                <p className="text-lg font-bold">{'⭐'.repeat(review.ratingStars)}</p>
              </div>
              {review.comment && (
                <p className="text-gray-700 bg-gray-50 p-4 rounded-3xl">{review.comment}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
