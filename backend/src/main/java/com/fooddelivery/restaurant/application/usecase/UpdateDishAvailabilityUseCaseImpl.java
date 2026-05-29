package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishOutput;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateDishAvailabilityUseCaseImpl implements UpdateDishAvailabilityUseCase {

    private final DishRepository dishRepository;
    private final DishMapper dishMapper;

    @Override
    public DishOutput execute(UUID dishId, boolean isAvailable) {
        dishRepository.updateAvailability(dishId, isAvailable);
        return dishRepository.findById(dishId)
                .map(dishMapper::toDishOutput)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + dishId));
    }
}
