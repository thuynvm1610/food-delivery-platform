package com.fooddelivery.restaurant.domain.repository;

import com.fooddelivery.restaurant.domain.aggregate.DishCategory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DishCategoryRepository {
    DishCategory save(DishCategory category);

    Optional<DishCategory> findById(UUID id);

    List<DishCategory> findAllOrderByName();

    void delete(DishCategory category);
}
