package com.fooddelivery.restaurant.application.input;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class UpdateDishInput {
    private String name;
    private String description;
    private BigDecimal priceAmount;
    private String priceCurrency;
    private List<UUID> categoryIds;
}
