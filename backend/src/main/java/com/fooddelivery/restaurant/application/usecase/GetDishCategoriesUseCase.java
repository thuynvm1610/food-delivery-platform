package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishCategoryOutput;

import java.util.List;

public interface GetDishCategoriesUseCase {
    List<DishCategoryOutput> execute();
}
