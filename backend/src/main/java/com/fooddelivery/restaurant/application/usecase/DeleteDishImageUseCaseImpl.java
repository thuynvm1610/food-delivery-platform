package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.restaurant.domain.repository.DishImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeleteDishImageUseCaseImpl implements DeleteDishImageUseCase {

    private final DishImageRepository dishImageRepository;

    @Override
    public void execute(UUID imageId) {
        DishImage image = dishImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Dish image not found with id: " + imageId));

        dishImageRepository.delete(image);
    }
}
