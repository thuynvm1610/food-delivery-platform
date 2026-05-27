package com.fooddelivery.restaurant.domain.repository;

import com.fooddelivery.restaurant.domain.aggregate.Dish;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DishRepository {
    Dish save(Dish dish);

    Optional<Dish> findById(UUID id);

    List<Dish> findByRestaurantId(UUID restaurantId);

    void delete(Dish dish);
}
