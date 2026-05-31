package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.CreateDishImageInput;
import com.fooddelivery.restaurant.application.output.DishImageOutput;

import java.util.UUID;

public interface CreateDishImageUseCase {
    DishImageOutput execute(UUID dishId, CreateDishImageInput input);
}
