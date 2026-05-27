package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.ordering.domain.repository.OrderRepository;
import com.fooddelivery.ordering.domain.value.OrderStatus;
import com.fooddelivery.restaurant.application.output.DashboardStatsOutput;
import com.fooddelivery.restaurant.domain.aggregate.Restaurant;
import com.fooddelivery.restaurant.domain.repository.RestaurantRepository;
import com.fooddelivery.shared.exception.DomainException;
import com.fooddelivery.shared.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.fooddelivery.ordering.domain.value.OrderStatus.*;

@Service
@RequiredArgsConstructor
public class GetDashboardStatsUseCaseImpl implements GetDashboardStatsUseCase {

    private final RestaurantRepository restaurantRepository;
    private final OrderRepository orderRepository;

    @Override
    public DashboardStatsOutput execute(UUID ownerId) {
        Restaurant restaurant = restaurantRepository.findByOwnerId(ownerId)
                .orElseThrow(() -> new DomainException(ErrorCode.RESTAURANT_NOT_FOUND_BY_OWNER));

        UUID restaurantId = restaurant.getId();

        Map<OrderStatus, Long> statusMap =
                orderRepository.countOrdersByStatus(restaurantId);

        long totalOrders = statusMap.values().stream().mapToLong(Long::longValue).sum();

        long successfulOrders = statusMap.entrySet().stream()
                .filter(e -> e.getKey() == DELIVERED || e.getKey() == CUSTOMER_CONFIRMED)
                .mapToLong(Map.Entry::getValue)
                .sum();

        long cancelledOrders = statusMap.entrySet().stream()
                .filter(e -> e.getKey().isCancelled())
                .mapToLong(Map.Entry::getValue)
                .sum();

        long inProgressOrders = statusMap.entrySet().stream()
                .filter(e -> e.getKey().isInProgress())
                .mapToLong(Map.Entry::getValue)
                .sum();

        double cancelRate = totalOrders > 0
                ? (cancelledOrders * 100.0) / totalOrders
                : 0.0;

        List<DashboardStatsOutput.TopDishOutput> topDishes = orderRepository
                .getTopDishesByRevenue(restaurantId, 5)
                .stream()
                .map(dish -> new DashboardStatsOutput.TopDishOutput(
                        dish.dishId().toString(),
                        dish.dishName(),
                        dish.soldCount(),
                        dish.revenue()
                ))
                .toList();

        DashboardStatsOutput output = new DashboardStatsOutput();
        output.setTotalOrders(totalOrders);
        output.setSuccessfulOrders(successfulOrders);
        output.setCancelledOrders(cancelledOrders);
        output.setInProgressOrders(inProgressOrders);
        output.setTotalRevenue(orderRepository.getTotalRevenue(restaurantId));
        output.setTodayRevenue(orderRepository.getTodayRevenue(restaurantId));
        output.setMonthlyRevenue(orderRepository.getMonthlyRevenue(restaurantId));
        output.setCancelRate(cancelRate);
        output.setTopDishes(topDishes);
        return output;
    }
}