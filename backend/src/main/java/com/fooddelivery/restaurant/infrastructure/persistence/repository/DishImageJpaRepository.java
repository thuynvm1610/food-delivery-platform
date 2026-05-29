package com.fooddelivery.restaurant.infrastructure.persistence.repository;

import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishImageJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Collection;
import java.util.UUID;

public interface DishImageJpaRepository extends JpaRepository<DishImageJpaEntity, UUID> {
    List<DishImageJpaEntity> findByDish_Id(UUID dishId);

    @Modifying
    @Query("delete from DishImageJpaEntity i where i.dish.id = :dishId and i.id in :imageIds")
    int deleteByDishIdAndIdIn(@Param("dishId") UUID dishId, @Param("imageIds") Collection<UUID> imageIds);
}
