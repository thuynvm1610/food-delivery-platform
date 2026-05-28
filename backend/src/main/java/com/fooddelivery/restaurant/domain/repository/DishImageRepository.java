package com.fooddelivery.restaurant.domain.repository;

import com.fooddelivery.restaurant.domain.entity.DishImage;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DishImageRepository {
    DishImage save(DishImage image);

    Optional<DishImage> findById(UUID id);

    List<DishImage> findByDishId(UUID dishId);

    void delete(DishImage image);

    void deleteByDishIdAndImageIds(UUID dishId, List<UUID> imageIds);
}
