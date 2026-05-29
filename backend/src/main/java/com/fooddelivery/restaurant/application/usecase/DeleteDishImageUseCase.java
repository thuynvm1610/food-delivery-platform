package com.fooddelivery.restaurant.application.usecase;

import java.util.UUID;
import java.util.List;

public interface DeleteDishImageUseCase {
    void execute(UUID imageId);

    void execute(UUID dishId, List<UUID> imageIds);
}
