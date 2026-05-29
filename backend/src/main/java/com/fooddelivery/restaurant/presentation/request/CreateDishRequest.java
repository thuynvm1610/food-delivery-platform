package com.fooddelivery.restaurant.presentation.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class CreateDishRequest {
    @NotBlank(message = "Dish name is required")
    private String name;

    private String description;

    @NotNull(message = "Price amount is required")
    @Positive(message = "Price amount must be positive")
    private BigDecimal priceAmount;

    @NotBlank(message = "Price currency is required")
    private String priceCurrency;

    private List<UUID> categoryIds;
}
