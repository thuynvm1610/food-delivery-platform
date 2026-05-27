package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.UpdateRestaurantProfileInput;
import com.fooddelivery.restaurant.application.output.RestaurantProfileOutput;

import java.util.UUID;

public interface UpdateRestaurantProfileUseCase {
    RestaurantProfileOutput execute(UUID restaurantId, UpdateRestaurantProfileInput input);
}
