package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.domain.aggregate.Dish;
import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishImageJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishJpaEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DishMapper {

    public Dish toDomain(DishJpaEntity jpaEntity) {
        if (jpaEntity == null) return null;

        List<DishImage> images = jpaEntity.getImages() != null
                ? jpaEntity.getImages().stream()
                .map(img -> new DishImage(
                        img.getId(),
                        img.getDish().getId(),
                        img.getImageUrl(),
                        img.getDisplayOrder()
                ))
                .collect(Collectors.toList())
                : null;

        return new Dish(
                jpaEntity.getId(),
                jpaEntity.getRestaurantId(),
                jpaEntity.getName(),
                jpaEntity.getDescription(),
                jpaEntity.getPriceAmount(),
                jpaEntity.getPriceCurrency(),
                jpaEntity.isAvailable(),
                jpaEntity.getCreatedAt(),
                images
        );
    }

    public DishJpaEntity toJpaEntity(Dish dish) {
        if (dish == null) return null;

        DishJpaEntity entity = new DishJpaEntity();
        entity.setId(dish.getId());
        entity.setRestaurantId(dish.getRestaurantId());
        entity.setName(dish.getName());
        entity.setDescription(dish.getDescription());
        entity.setPriceAmount(dish.getPriceAmount());
        entity.setPriceCurrency(dish.getPriceCurrency());
        entity.setAvailable(dish.isAvailable());
        entity.setCreatedAt(dish.getCreatedAt());

        if (dish.getImages() != null) {
            entity.setImages(dish.getImages().stream()
                    .map(img -> {
                        DishImageJpaEntity dishImageJpaEntity = new DishImageJpaEntity();
                        dishImageJpaEntity.setId(img.getId());
                        dishImageJpaEntity.setDish(entity);
                        dishImageJpaEntity.setImageUrl(img.getImageUrl());
                        dishImageJpaEntity.setDisplayOrder(img.getDisplayOrder());
                        return dishImageJpaEntity;
                    })
                    .collect(Collectors.toList()));
        }

        return entity;
    }
}
