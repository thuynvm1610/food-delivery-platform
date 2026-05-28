package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishImageOutput;

import java.util.List;
import java.util.UUID;

public interface ReorderDishImagesUseCase {
    List<DishImageOutput> execute(UUID dishId, List<UUID> imageIds);
}
