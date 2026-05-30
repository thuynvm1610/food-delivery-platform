package com.fooddelivery.restaurant.presentation.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class UpdateRestaurantOperatingHoursRequest {
    @NotNull
    @Valid
    private List<UpdateRestaurantOperatingHourRequest> hours;
}
