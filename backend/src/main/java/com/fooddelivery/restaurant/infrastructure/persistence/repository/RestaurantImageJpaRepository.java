package com.fooddelivery.restaurant.infrastructure.persistence.repository;

import com.fooddelivery.restaurant.infrastructure.persistence.entity.RestaurantImageJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface RestaurantImageJpaRepository extends JpaRepository<RestaurantImageJpaEntity, UUID> {
    List<RestaurantImageJpaEntity> findByRestaurant_Id(UUID restaurantId);

    @Modifying
    @Transactional
    @Query("delete from RestaurantImageJpaEntity i where i.id = :id")
    int deleteByImageId(UUID id);
}
