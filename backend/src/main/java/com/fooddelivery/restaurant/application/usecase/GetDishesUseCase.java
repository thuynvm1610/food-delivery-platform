package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.GetDishesInput;
import com.fooddelivery.restaurant.application.output.DishOutput;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface GetDishesUseCase {
    Page<DishOutput> execute(UUID restaurantId, GetDishesInput input);
}
