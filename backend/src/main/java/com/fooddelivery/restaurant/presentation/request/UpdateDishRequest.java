package com.fooddelivery.restaurant.presentation.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateDishRequest {
    private String name;
    private String description;
    private BigDecimal priceAmount;
    private String priceCurrency;
}
