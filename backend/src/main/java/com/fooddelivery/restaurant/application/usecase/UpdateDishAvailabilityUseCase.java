package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishOutput;

import java.util.UUID;

public interface UpdateDishAvailabilityUseCase {
    DishOutput execute(UUID dishId, boolean isAvailable);
}
