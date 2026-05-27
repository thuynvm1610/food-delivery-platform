package com.fooddelivery.restaurant.infrastructure.persistence.repository;

import com.fooddelivery.restaurant.infrastructure.persistence.entity.RestaurantImageJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RestaurantImageJpaRepository extends JpaRepository<RestaurantImageJpaEntity, UUID> {
    List<RestaurantImageJpaEntity> findByRestaurant_Id(UUID restaurantId);
}
