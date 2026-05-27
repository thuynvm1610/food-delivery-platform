package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishOutput;
import com.fooddelivery.restaurant.domain.aggregate.Dish;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishOutputMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetDishByIdUseCaseImpl implements GetDishByIdUseCase {

    private final DishRepository dishRepository;
    private final DishOutputMapper dishOutputMapper;

    @Override
    public DishOutput execute(UUID dishId) {
        Dish dish = dishRepository.findById(dishId)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + dishId));

        return dishOutputMapper.toDishOutput(dish);
    }
}
