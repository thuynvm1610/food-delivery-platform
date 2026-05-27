package com.fooddelivery.restaurant.application.usecase;

import java.util.UUID;

public interface DeleteDishImageUseCase {
    void execute(UUID imageId);
}
