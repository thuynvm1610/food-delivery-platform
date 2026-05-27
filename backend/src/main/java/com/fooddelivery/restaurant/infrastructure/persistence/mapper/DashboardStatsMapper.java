package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.application.output.DashboardStatsOutput;
import com.fooddelivery.restaurant.presentation.response.DashboardStatsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DashboardStatsMapper {

    public DashboardStatsResponse toDashboardStatsResponse(DashboardStatsOutput output) {
        DashboardStatsResponse response = new DashboardStatsResponse();
        response.setTotalOrders(output.getTotalOrders());
        response.setSuccessfulOrders(output.getSuccessfulOrders());
        response.setCancelledOrders(output.getCancelledOrders());
        response.setInProgressOrders(output.getInProgressOrders());
        response.setTotalRevenue(output.getTotalRevenue());
        response.setTodayRevenue(output.getTodayRevenue());
        response.setMonthlyRevenue(output.getMonthlyRevenue());
        response.setCancelRate(output.getCancelRate());
        response.setTopDishes(
                output.getTopDishes().stream()
                        .map(dish -> new DashboardStatsResponse.TopDishResponse(
                                dish.getDishId(),
                                dish.getDishName(),
                                dish.getSoldCount(),
                                dish.getRevenue()
                        ))
                        .collect(Collectors.toList())
        );
        return response;
    }
}
