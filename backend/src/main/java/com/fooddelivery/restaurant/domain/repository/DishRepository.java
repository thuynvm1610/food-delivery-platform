package com.fooddelivery.restaurant.domain.repository;

import com.fooddelivery.restaurant.domain.aggregate.Dish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DishRepository {
    Dish save(Dish dish);

    Optional<Dish> findById(UUID id);

    Page<Dish> findByRestaurantId(UUID restaurantId, Pageable pageable, String search, BigDecimal minPrice, BigDecimal maxPrice);

    Page<Dish> findByRestaurantIdAndCategoryIds(UUID restaurantId, List<UUID> categoryIds, Pageable pageable, String search, BigDecimal minPrice, BigDecimal maxPrice);

    void updateAvailability(UUID dishId, boolean isAvailable);

    void delete(Dish dish);
}
