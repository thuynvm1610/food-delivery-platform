package com.fooddelivery.restaurant.presentation.response;

import lombok.Data;

import java.util.UUID;

@Data
public class DishImageResponse {
    private UUID id;
    private UUID dishId;
    private String imageUrl;
    private Integer displayOrder;
}
