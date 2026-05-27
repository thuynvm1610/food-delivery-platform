package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishOutput;

import java.util.UUID;

public interface GetDishByIdUseCase {
    DishOutput execute(UUID dishId);
}
