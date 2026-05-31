package com.fooddelivery.restaurant.presentation.controller;

import com.fooddelivery.restaurant.application.output.DishCategoryOutput;
import com.fooddelivery.restaurant.application.usecase.GetDishCategoriesUseCase;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishCategoryMapper;
import com.fooddelivery.restaurant.presentation.response.DishCategoryResponse;
import com.fooddelivery.shared.web.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class DishCategoryController {

    private final GetDishCategoriesUseCase getDishCategoriesUseCase;
    private final DishCategoryMapper dishCategoryMapper;

    @GetMapping("/dish-categories")
    public ResponseEntity<BaseResponse<List<DishCategoryResponse>>> getDishCategories() {
        List<DishCategoryOutput> outputs = getDishCategoriesUseCase.execute();

        List<DishCategoryResponse> responses = outputs.stream()
                .map(dishCategoryMapper::toResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(BaseResponse.success(responses));
    }
}
