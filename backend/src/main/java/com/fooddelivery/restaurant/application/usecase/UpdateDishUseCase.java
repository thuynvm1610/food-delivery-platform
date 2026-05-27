package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.UpdateDishInput;
import com.fooddelivery.restaurant.application.output.DishOutput;

import java.util.UUID;

public interface UpdateDishUseCase {
    DishOutput execute(UUID dishId, UpdateDishInput input);
}
