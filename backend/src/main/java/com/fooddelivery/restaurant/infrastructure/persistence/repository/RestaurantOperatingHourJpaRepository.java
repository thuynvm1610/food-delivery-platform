package com.fooddelivery.restaurant.infrastructure.persistence.repository;

import com.fooddelivery.restaurant.infrastructure.persistence.entity.RestaurantOperatingHourJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RestaurantOperatingHourJpaRepository extends JpaRepository<RestaurantOperatingHourJpaEntity, UUID> {
    List<RestaurantOperatingHourJpaEntity> findByRestaurantId(UUID restaurantId);

    Optional<RestaurantOperatingHourJpaEntity> findByRestaurantIdAndDayOfWeek(UUID restaurantId, Integer dayOfWeek);
}
