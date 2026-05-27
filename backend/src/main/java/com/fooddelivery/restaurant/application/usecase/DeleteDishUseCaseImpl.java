package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.domain.aggregate.Dish;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeleteDishUseCaseImpl implements DeleteDishUseCase {

    private final DishRepository dishRepository;

    @Override
    public void execute(UUID dishId) {
        Dish dish = dishRepository.findById(dishId)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + dishId));

        dishRepository.delete(dish);
    }
}
