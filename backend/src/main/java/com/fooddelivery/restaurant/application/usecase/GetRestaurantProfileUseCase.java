package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.RestaurantProfileOutput;

import java.util.UUID;

public interface GetRestaurantProfileUseCase {
    RestaurantProfileOutput execute(UUID restaurantId);
}
