package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.application.output.DishCategoryOutput;
import com.fooddelivery.restaurant.domain.aggregate.DishCategory;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishCategoryJpaEntity;
import com.fooddelivery.restaurant.presentation.response.DishCategoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DishCategoryMapper {

    public DishCategory toDomain(DishCategoryJpaEntity entity) {
        if (entity == null) return null;
        return new DishCategory(entity.getId(), entity.getName(), entity.getDescription());
    }

    public DishCategoryJpaEntity toEntity(DishCategory category) {
        if (category == null) return null;
        DishCategoryJpaEntity entity = new DishCategoryJpaEntity();
        entity.setId(category.getId());
        entity.setName(category.getName());
        entity.setDescription(category.getDescription());
        return entity;
    }

    public DishCategoryOutput toDishCategoryOutput(DishCategory category) {
        if (category == null) return null;

        DishCategoryOutput output = new DishCategoryOutput();
        output.setId(category.getId());
        output.setName(category.getName());
        output.setDescription(category.getDescription());
        return output;
    }

    public DishCategoryOutput toOutput(DishCategory category) {
        if (category == null) return null;

        DishCategoryOutput output = new DishCategoryOutput();
        output.setId(category.getId());
        output.setName(category.getName());
        output.setDescription(category.getDescription());
        return output;
    }

    public List<DishCategoryOutput> toOutputList(List<DishCategory> categories) {
        return categories.stream()
                .map(this::toOutput)
                .collect(Collectors.toList());
    }

    public DishCategoryResponse mapToDishCategoryResponse(DishCategoryOutput output) {
        DishCategoryResponse response = new DishCategoryResponse();
        response.setId(output.getId());
        response.setName(output.getName());
        response.setDescription(output.getDescription());
        return response;
    }

    public DishCategoryResponse toResponse(DishCategoryOutput output) {
        DishCategoryResponse response = new DishCategoryResponse();
        response.setId(output.getId());
        response.setName(output.getName());
        response.setDescription(output.getDescription());
        return response;
    }
}
