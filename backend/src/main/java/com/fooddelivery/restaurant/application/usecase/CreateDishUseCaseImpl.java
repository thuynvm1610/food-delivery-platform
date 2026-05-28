package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.CreateDishInput;
import com.fooddelivery.restaurant.application.output.DishOutput;
import com.fooddelivery.restaurant.domain.aggregate.Dish;
import com.fooddelivery.restaurant.domain.aggregate.DishCategory;
import com.fooddelivery.restaurant.domain.repository.DishCategoryRepository;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishOutputMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CreateDishUseCaseImpl implements CreateDishUseCase {

    private final DishRepository dishRepository;
    private final DishCategoryRepository dishCategoryRepository;
    private final DishOutputMapper dishOutputMapper;

    @Override
    public DishOutput execute(UUID restaurantId, CreateDishInput input) {
        Dish dish = new Dish(
                UUID.randomUUID(),
                restaurantId,
                input.getName(),
                input.getPriceAmount(),
                input.getPriceCurrency()
        );

        dish.updateProfile(
                input.getName(),
                input.getDescription(),
                input.getPriceAmount(),
                input.getPriceCurrency()
        );
        dish.updateCategories(resolveCategories(input.getCategoryIds()));

        Dish saved = dishRepository.save(dish);
        return dishOutputMapper.toDishOutput(saved);
    }

    private List<DishCategory> resolveCategories(List<UUID> categoryIds) {
        if (categoryIds == null || categoryIds.isEmpty()) {
            return new ArrayList<>();
        }

        return categoryIds.stream()
                .map(categoryId -> dishCategoryRepository.findById(categoryId)
                        .orElseThrow(() -> new RuntimeException("Dish category not found with id: " + categoryId)))
                .toList();
    }
}
