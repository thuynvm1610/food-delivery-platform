package com.fooddelivery.restaurant.presentation.response;

import lombok.Data;

import java.util.UUID;

@Data
public class RestaurantImageResponse {
    private UUID id;
    private UUID restaurantId;
    private String imageUrl;
    private Integer displayOrder;
}
