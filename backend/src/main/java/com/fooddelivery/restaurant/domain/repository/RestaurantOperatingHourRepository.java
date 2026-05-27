package com.fooddelivery.restaurant.domain.repository;

import com.fooddelivery.restaurant.domain.entity.RestaurantOperatingHour;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RestaurantOperatingHourRepository {
    RestaurantOperatingHour save(RestaurantOperatingHour hour);

    Optional<RestaurantOperatingHour> findById(UUID id);

    List<RestaurantOperatingHour> findByRestaurantId(UUID restaurantId);

    Optional<RestaurantOperatingHour> findByRestaurantIdAndDayOfWeek(UUID restaurantId, Integer dayOfWeek);

    void delete(RestaurantOperatingHour hour);

    void deleteAll(List<RestaurantOperatingHour> hours);
}
