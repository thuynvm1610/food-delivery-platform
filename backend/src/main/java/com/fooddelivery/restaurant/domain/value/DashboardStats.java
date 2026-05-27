package com.fooddelivery.restaurant.domain.value;

import java.util.List;
import java.util.UUID;

/**
 * Value object representing dashboard statistics for a restaurant.
 * Immutable and contains all KPI metrics.
 */
public record DashboardStats(
    long totalOrders,
    long successfulOrders,
    long cancelledOrders,
    double totalRevenue,
    double todayRevenue,
    double monthlyRevenue,
    double cancelRate,
    List<TopDish> topDishes
) {
    /**
     * Nested record for top-selling dishes.
     */
    public record TopDish(
        UUID dishId,
        String dishName,
        long soldCount,
        double revenue
    ) {}
}
