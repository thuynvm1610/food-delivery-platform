package com.fooddelivery.ordering.infrastructure.persistence.adapter;

import com.fooddelivery.ordering.domain.repository.OrderRepository;
import com.fooddelivery.ordering.domain.value.OrderStatus;
import com.fooddelivery.ordering.infrastructure.persistence.repository.OrderJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderRepositoryImpl implements OrderRepository {

    private final OrderJpaRepository jpaRepository;

    @Override
    public Map<OrderStatus, Long> countOrdersByStatus(UUID restaurantId) {
        return jpaRepository.countOrdersByStatus(restaurantId)
                .stream()
                .collect(Collectors.toMap(
                        row -> OrderStatus.valueOf((String) row[0]),
                        row -> ((Number) row[1]).longValue()
                ));
    }

    @Override
    public double getTotalRevenue(UUID restaurantId) {
        return jpaRepository.getTotalRevenue(restaurantId);
    }

    @Override
    public double getTodayRevenue(UUID restaurantId) {
        return jpaRepository.getTodayRevenue(restaurantId);
    }

    @Override
    public double getMonthlyRevenue(UUID restaurantId) {
        return jpaRepository.getMonthlyRevenue(restaurantId);
    }

    @Override
    public List<TopDishStats> getTopDishesByRevenue(UUID restaurantId, int limit) {
        return jpaRepository.getTopDishesByRevenue(restaurantId, limit)
                .stream()
                .map(row -> new TopDishStats(
                        (UUID) row[0],
                        (String) row[1],
                        ((Number) row[2]).longValue(),
                        ((Number) row[3]).doubleValue()
                ))
                .toList();
    }
}