package com.fooddelivery.restaurant.application.input;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateRestaurantProfileInput {
    private String name;
    private String description;
    private String streetAddress;
    private String city;
    private String district;
    private BigDecimal latitude;
    private BigDecimal longitude;
}
