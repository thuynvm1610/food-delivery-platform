package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.RestaurantProfileOutput;
import com.fooddelivery.restaurant.domain.value.RestaurantStatus;

import java.util.UUID;

public interface UpdateRestaurantStatusUseCase {
    RestaurantProfileOutput execute(UUID restaurantId, RestaurantStatus status);
}
