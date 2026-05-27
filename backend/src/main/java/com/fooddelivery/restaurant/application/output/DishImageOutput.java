package com.fooddelivery.restaurant.application.output;

import lombok.Data;

import java.util.UUID;

@Data
public class DishImageOutput {
    private UUID id;
    private UUID dishId;
    private String imageUrl;
    private Integer displayOrder;
}
