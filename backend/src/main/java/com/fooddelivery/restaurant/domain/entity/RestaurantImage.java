package com.fooddelivery.restaurant.domain.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class RestaurantImage {
    private UUID id;
    private UUID restaurantId;
    private String imageUrl;
    private Integer displayOrder;

    public RestaurantImage(UUID id, UUID restaurantId, String imageUrl, Integer displayOrder) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.imageUrl = imageUrl;
        this.displayOrder = displayOrder;
    }

    public RestaurantImage() {
    }
}
