package com.fooddelivery.restaurant.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantOperatingHour {
    private UUID id;
    private UUID restaurantId;
    private Integer dayOfWeek; // 2-8 (Mon-Sun)
    private Integer openHour;  // 0-23
    private Integer closeHour; // 0-23
}
