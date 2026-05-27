package com.fooddelivery.restaurant.infrastructure.persistence.repository;

import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishImageJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DishImageJpaRepository extends JpaRepository<DishImageJpaEntity, UUID> {
    List<DishImageJpaEntity> findByDish_Id(UUID dishId);
}
