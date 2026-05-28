package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishCategoryOutput;
import com.fooddelivery.restaurant.domain.aggregate.DishCategory;
import com.fooddelivery.restaurant.domain.repository.DishCategoryRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishCategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetDishCategoriesUseCaseImpl implements GetDishCategoriesUseCase {

    private final DishCategoryRepository dishCategoryRepository;
    private final DishCategoryMapper dishCategoryMapper;

    @Override
    public List<DishCategoryOutput> execute() {
        List<DishCategory> categories = dishCategoryRepository.findAllOrderByName();
        return dishCategoryMapper.toOutputList(categories);
    }
}
