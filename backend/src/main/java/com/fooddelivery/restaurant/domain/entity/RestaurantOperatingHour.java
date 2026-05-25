package com.fooddelivery.restaurant.domain.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class RestaurantOperatingHour {
    private UUID id;
    private UUID restaurantId;
    private Integer dayOfWeek; // 2-8 (Mon-Sun)
    private Integer openHour;  // 0-23
    private Integer closeHour; // 0-23

    public RestaurantOperatingHour(UUID id, UUID restaurantId, Integer dayOfWeek,
                                   Integer openHour, Integer closeHour) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.dayOfWeek = dayOfWeek;
        this.openHour = openHour;
        this.closeHour = closeHour;
    }

    public RestaurantOperatingHour() {
    }
}
