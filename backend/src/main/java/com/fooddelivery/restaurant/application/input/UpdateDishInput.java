package com.fooddelivery.restaurant.application.input;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateDishInput {
    private String name;
    private String description;
    private BigDecimal priceAmount;
    private String priceCurrency;
}
