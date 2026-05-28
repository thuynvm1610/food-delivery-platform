package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishOutput;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishOutputMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateDishAvailabilityUseCaseImpl implements UpdateDishAvailabilityUseCase {

    private final DishRepository dishRepository;
    private final DishOutputMapper dishOutputMapper;

    @Override
    public DishOutput execute(UUID dishId, boolean isAvailable) {
        dishRepository.updateAvailability(dishId, isAvailable);
        return dishRepository.findById(dishId)
                .map(dishOutputMapper::toDishOutput)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + dishId));
    }
}
