package com.fooddelivery.restaurant.infrastructure.persistence.repository;

import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface DishJpaRepository extends JpaRepository<DishJpaEntity, UUID>, JpaSpecificationExecutor<DishJpaEntity> {

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(value = "update dishes set is_available = :isAvailable where id = :dishId", nativeQuery = true)
    int updateAvailability(@Param("dishId") UUID dishId, @Param("isAvailable") boolean isAvailable);

}
