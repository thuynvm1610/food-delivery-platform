package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.UpdateDishInput;
import com.fooddelivery.restaurant.application.output.DishOutput;
import com.fooddelivery.restaurant.domain.aggregate.Dish;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishOutputMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateDishUseCaseImpl implements UpdateDishUseCase {

    private final DishRepository dishRepository;
    private final DishOutputMapper dishOutputMapper;

    @Override
    public DishOutput execute(UUID dishId, UpdateDishInput input) {
        Dish dish = dishRepository.findById(dishId)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + dishId));

        dish.updateProfile(
                input.getName() != null ? input.getName() : dish.getName(),
                input.getDescription() != null ? input.getDescription() : dish.getDescription(),
                input.getPriceAmount() != null ? input.getPriceAmount() : dish.getPriceAmount(),
                input.getPriceCurrency() != null ? input.getPriceCurrency() : dish.getPriceCurrency()
        );

        Dish updated = dishRepository.save(dish);
        return dishOutputMapper.toDishOutput(updated);
    }
}
