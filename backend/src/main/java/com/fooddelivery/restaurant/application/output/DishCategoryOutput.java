package com.fooddelivery.restaurant.application.output;

import lombok.Data;

import java.util.UUID;

@Data
public class DishCategoryOutput {
    private UUID id;
    private String name;
    private String description;
}
