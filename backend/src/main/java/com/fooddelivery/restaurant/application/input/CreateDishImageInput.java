package com.fooddelivery.restaurant.application.input;

import lombok.Data;

@Data
public class CreateDishImageInput {
    private String imageUrl;
    private Integer displayOrder;
}
