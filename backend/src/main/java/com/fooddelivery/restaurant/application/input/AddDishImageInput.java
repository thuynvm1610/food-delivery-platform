package com.fooddelivery.restaurant.application.input;

import lombok.Data;

@Data
public class AddDishImageInput {
    private String imageUrl;
    private Integer displayOrder;
}
