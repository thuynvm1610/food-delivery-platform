package com.fooddelivery.restaurant.application.usecase;

import java.util.UUID;

public interface DeleteRestaurantImageUseCase {
    void execute(UUID imageId);
}
