package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.application.output.DishCategoryOutput;
import com.fooddelivery.restaurant.application.output.DishImageOutput;
import com.fooddelivery.restaurant.application.output.DishOutput;
import com.fooddelivery.restaurant.domain.aggregate.Dish;
import com.fooddelivery.restaurant.domain.aggregate.DishCategory;
import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishCategoryJpaMapping;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishImageJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishJpaEntity;
import com.fooddelivery.restaurant.presentation.response.DishResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DishMapper {
    private final DishCategoryMapper dishCategoryMapper;
    private final DishImageMapper dishImageMapper;

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

        List<DishCategory> categories = jpaEntity.getCategoryMappings() != null
                ? jpaEntity.getCategoryMappings().stream()
                .map(DishCategoryJpaMapping::getCategory)
                .filter(Objects::nonNull)
                .map(category -> new DishCategory(
                        category.getId(),
                        category.getName(),
                        category.getDescription()
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
                images,
                categories
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

    public DishOutput toDishOutput(Dish dish) {
        if (dish == null) return null;

        DishOutput output = new DishOutput();
        output.setId(dish.getId());
        output.setRestaurantId(dish.getRestaurantId());
        output.setName(dish.getName());
        output.setDescription(dish.getDescription());
        output.setPriceAmount(dish.getPriceAmount());
        output.setPriceCurrency(dish.getPriceCurrency());
        output.setAvailable(dish.isAvailable());
        output.setCreatedAt(dish.getCreatedAt());

        if (dish.getImages() != null) {
            output.setImages(dish.getImages().stream()
                    .map(dishImageMapper::toDishImageOutput)
                    .collect(Collectors.toList()));
        }

        if (dish.getCategories() != null) {
            output.setCategories(dish.getCategories().stream()
                    .map(dishCategoryMapper::toDishCategoryOutput)
                    .collect(Collectors.toList()));
        }

        return output;
    }

    public DishResponse mapToDishResponse(DishOutput output) {
        DishResponse response = new DishResponse();
        response.setId(output.getId());
        response.setRestaurantId(output.getRestaurantId());
        response.setName(output.getName());
        response.setDescription(output.getDescription());
        response.setPriceAmount(output.getPriceAmount());
        response.setPriceCurrency(output.getPriceCurrency());
        response.setAvailable(output.isAvailable());
        response.setCreatedAt(output.getCreatedAt());

        if (output.getImages() != null) {
            response.setImages(output.getImages().stream()
                    .map(dishImageMapper::mapToDishImageResponse)
                    .collect(Collectors.toList()));
        }

        if (output.getCategories() != null) {
            response.setCategories(output.getCategories().stream()
                    .map(dishCategoryMapper::mapToDishCategoryResponse)
                    .collect(Collectors.toList()));
        }

        return response;
    }
}
