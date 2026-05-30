package com.fooddelivery.restaurant.presentation.response;

import lombok.Data;

import java.util.UUID;

@Data
public class RestaurantOperatingHourResponse {
    private UUID id;
    private UUID restaurantId;
    private Integer dayOfWeek;
    private Integer openHour;
    private Integer closeHour;
}
