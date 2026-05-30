package com.fooddelivery.restaurant.presentation.request;

import com.fooddelivery.restaurant.domain.value.RestaurantStatus;
import lombok.Data;

@Data
public class UpdateRestaurantStatusRequest {
    private RestaurantStatus status;
}
