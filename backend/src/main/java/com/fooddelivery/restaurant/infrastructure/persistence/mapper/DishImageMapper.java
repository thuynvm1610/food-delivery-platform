package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishImageJpaEntity;
import org.springframework.stereotype.Component;

@Component
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
}
