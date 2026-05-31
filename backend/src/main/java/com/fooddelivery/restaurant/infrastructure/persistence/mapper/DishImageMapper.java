package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.application.output.DishImageOutput;
import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishImageJpaEntity;
import com.fooddelivery.restaurant.presentation.response.DishImageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DishImageMapper {

    public DishImage toDomain(DishImageJpaEntity jpaEntity) {
        if (jpaEntity == null) return null;

        return new DishImage(
                jpaEntity.getId(),
                jpaEntity.getDish().getId(),
                jpaEntity.getImageUrl(),
                jpaEntity.getDisplayOrder()
        );
    }

    public DishImageJpaEntity toJpaEntity(DishImage image) {
        if (image == null) return null;

        DishImageJpaEntity entity = new DishImageJpaEntity();
        entity.setId(image.getId());
        entity.setImageUrl(image.getImageUrl());
        entity.setDisplayOrder(image.getDisplayOrder());

        return entity;
    }

    public DishImageOutput toDishImageOutput(DishImage image) {
        if (image == null) return null;

        DishImageOutput output = new DishImageOutput();
        output.setId(image.getId());
        output.setDishId(image.getDishId());
        output.setImageUrl(image.getImageUrl());
        output.setDisplayOrder(image.getDisplayOrder());

        return output;
    }

    public DishImageResponse mapToDishImageResponse(DishImageOutput output) {
        DishImageResponse response = new DishImageResponse();
        response.setId(output.getId());
        response.setDishId(output.getDishId());
        response.setImageUrl(output.getImageUrl());
        response.setDisplayOrder(output.getDisplayOrder());
        return response;
    }
}
