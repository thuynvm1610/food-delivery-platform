package com.fooddelivery.ordering.domain.repository;

import com.fooddelivery.ordering.domain.value.OrderStatus;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface OrderRepository {

    Map<OrderStatus, Long> countOrdersByStatus(UUID restaurantId);

    double getTotalRevenue(UUID restaurantId);

    double getTodayRevenue(UUID restaurantId);

    double getMonthlyRevenue(UUID restaurantId);

    /**
     * Returns top N dishes by revenue for a given restaurant.
     * Each entry: dishId, dishName, soldCount, revenue
     */
    List<TopDishStats> getTopDishesByRevenue(UUID restaurantId, int limit);

    record TopDishStats(
            UUID dishId,
            String dishName,
            long soldCount,
            double revenue
    ) {}
}