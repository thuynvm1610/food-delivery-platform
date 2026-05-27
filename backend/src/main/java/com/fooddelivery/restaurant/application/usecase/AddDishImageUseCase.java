package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.AddDishImageInput;
import com.fooddelivery.restaurant.application.output.DishImageOutput;

import java.util.UUID;

public interface AddDishImageUseCase {
    DishImageOutput execute(UUID dishId, AddDishImageInput input);
}
