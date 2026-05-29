package com.fooddelivery.restaurant.application.output;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class DishOutput {
    private UUID id;
    private UUID restaurantId;
    private String name;
    private String description;
    private BigDecimal priceAmount;
    private String priceCurrency;
    private boolean isAvailable;
    private LocalDateTime createdAt;
    private List<DishImageOutput> images;
    private List<DishCategoryOutput> categories;
}
