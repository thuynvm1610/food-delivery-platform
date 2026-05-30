package com.fooddelivery.restaurant.presentation.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateRestaurantOperatingHourRequest {
    @NotNull
    @Min(2)
    @Max(8)
    private Integer dayOfWeek;

    @NotNull
    @Min(0)
    @Max(23)
    private Integer openHour;

    @NotNull
    @Min(0)
    @Max(23)
    private Integer closeHour;
}
