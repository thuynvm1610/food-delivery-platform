package com.fooddelivery.restaurant.presentation.response;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class DishCategoryResponse {
    private UUID id;
    private String name;
    private String description;
}
