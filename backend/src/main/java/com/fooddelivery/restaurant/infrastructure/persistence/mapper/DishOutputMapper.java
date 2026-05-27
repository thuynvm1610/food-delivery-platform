package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.application.output.DishImageOutput;
import com.fooddelivery.restaurant.application.output.DishOutput;
import com.fooddelivery.restaurant.domain.aggregate.Dish;
import com.fooddelivery.restaurant.domain.entity.DishImage;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DishOutputMapper {

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
                    .map(this::toDishImageOutput)
                    .collect(Collectors.toList()));
        }

        return output;
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

    public List<DishOutput> toDishOutputList(List<Dish> dishes) {
        return dishes.stream()
                .map(this::toDishOutput)
                .collect(Collectors.toList());
    }
}
