package com.fooddelivery.restaurant.domain.repository;

import com.fooddelivery.restaurant.domain.entity.RestaurantImage;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RestaurantImageRepository {
    RestaurantImage save(RestaurantImage image);

    Optional<RestaurantImage> findById(UUID id);

    List<RestaurantImage> findByRestaurantId(UUID restaurantId);

    void delete(RestaurantImage image);

    void deleteAll(List<RestaurantImage> images);
}
