package com.fooddelivery.restaurant.infrastructure.persistence.repository;

import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishCategoryJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DishCategoryJpaRepository extends JpaRepository<DishCategoryJpaEntity, UUID> {
    List<DishCategoryJpaEntity> findAllByOrderByNameAsc();
}
