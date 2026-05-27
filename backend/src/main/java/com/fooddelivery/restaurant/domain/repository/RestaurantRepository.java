package com.fooddelivery.restaurant.domain.repository;

import com.fooddelivery.restaurant.domain.aggregate.Restaurant;

import java.util.Optional;
import java.util.UUID;

public interface RestaurantRepository {
    Restaurant save(Restaurant restaurant);

    Optional<Restaurant> findById(UUID id);

    Optional<Restaurant> findByOwnerId(UUID ownerId);

    void delete(Restaurant restaurant);
}
