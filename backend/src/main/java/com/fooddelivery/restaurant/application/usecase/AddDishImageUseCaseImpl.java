package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.AddDishImageInput;
import com.fooddelivery.restaurant.application.output.DishImageOutput;
import com.fooddelivery.restaurant.domain.aggregate.Dish;
import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.restaurant.domain.repository.DishImageRepository;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishOutputMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddDishImageUseCaseImpl implements AddDishImageUseCase {

    private final DishRepository dishRepository;
    private final DishImageRepository dishImageRepository;
    private final DishOutputMapper dishOutputMapper;

    @Override
    public DishImageOutput execute(UUID dishId, AddDishImageInput input) {
        Dish dish = dishRepository.findById(dishId)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + dishId));

        DishImage image = new DishImage(
                UUID.randomUUID(),
                dishId,
                input.getImageUrl(),
                input.getDisplayOrder() != null ? input.getDisplayOrder() : 0
        );

        DishImage saved = dishImageRepository.save(image);
        return dishOutputMapper.toDishImageOutput(saved);
    }
}
