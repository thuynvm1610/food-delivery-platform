package com.fooddelivery.restaurant.presentation.response;

import lombok.Data;
import java.util.List;

@Data
public class DashboardStatsResponse {
    private Long totalOrders;
    private Long successfulOrders;
    private Long cancelledOrders;
    private Long inProgressOrders;
    private Double totalRevenue;
    private Double todayRevenue;
    private Double monthlyRevenue;
    private List<TopDishResponse> topDishes;
    private Double cancelRate;

    @Data
    public static class TopDishResponse {
        private String dishId;
        private String dishName;
        private Long soldCount;
        private Double revenue;

        public TopDishResponse(String dishId, String dishName, Long soldCount, Double revenue) {
            this.dishId = dishId;
            this.dishName = dishName;
            this.soldCount = soldCount;
            this.revenue = revenue;
        }
    }
}
