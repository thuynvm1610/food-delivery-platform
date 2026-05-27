package com.fooddelivery.restaurant.application.usecase;

import java.util.UUID;

public interface DeleteDishUseCase {
    void execute(UUID dishId);
}
