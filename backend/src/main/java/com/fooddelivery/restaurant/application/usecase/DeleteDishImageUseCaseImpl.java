package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.restaurant.domain.repository.DishImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeleteDishImageUseCaseImpl implements DeleteDishImageUseCase {

    private final DishImageRepository dishImageRepository;

    @Override
    @Transactional
    public void execute(UUID imageId) {
        DishImage image = dishImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Dish image not found with id: " + imageId));

        dishImageRepository.delete(image);
    }

    @Override
    @Transactional
    public void execute(UUID dishId, List<UUID> imageIds) {
        if (imageIds == null || imageIds.isEmpty()) {
            return;
        }

        dishImageRepository.deleteByDishIdAndImageIds(dishId, imageIds);
    }
}
