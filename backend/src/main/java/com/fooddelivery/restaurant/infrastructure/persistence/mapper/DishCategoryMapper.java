package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.application.output.DishCategoryOutput;
import com.fooddelivery.restaurant.domain.aggregate.DishCategory;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishCategoryJpaEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DishCategoryMapper {

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
}
