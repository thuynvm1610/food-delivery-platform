package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.CreateDishInput;
import com.fooddelivery.restaurant.application.output.DishOutput;

import java.util.UUID;

public interface CreateDishUseCase {
    DishOutput execute(UUID restaurantId, CreateDishInput input);
}
