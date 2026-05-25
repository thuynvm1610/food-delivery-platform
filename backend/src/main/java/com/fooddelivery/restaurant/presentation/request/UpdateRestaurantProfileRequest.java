package com.fooddelivery.restaurant.presentation.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateRestaurantProfileRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    private String streetAddress;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "District is required")
    private String district;

    private Double latitude;

    private Double longitude;
}
