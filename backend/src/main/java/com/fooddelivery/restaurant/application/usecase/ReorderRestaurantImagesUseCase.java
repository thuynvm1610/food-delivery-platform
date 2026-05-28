package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.RestaurantImageOutput;

import java.util.List;
import java.util.UUID;

public interface ReorderRestaurantImagesUseCase {
    List<RestaurantImageOutput> execute(UUID restaurantId, List<UUID> imageIds);
}
