package com.fooddelivery.restaurant.application.output;

import lombok.Data;

import java.util.UUID;

@Data
public class RestaurantImageOutput {
    private UUID id;
    private UUID restaurantId;
    private String imageUrl;
    private Integer displayOrder;
}
