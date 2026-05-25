package com.fooddelivery.restaurant.infrastructure.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RestaurantOperatingHourJpaRepository extends JpaRepository<RestaurantOperatingHourJpaEntity, UUID> {
    List<RestaurantOperatingHourJpaEntity> findByRestaurant_Id(UUID restaurantId);

    Optional<RestaurantOperatingHourJpaEntity> findByRestaurant_IdAndDayOfWeek(UUID restaurantId, Integer dayOfWeek);
}
