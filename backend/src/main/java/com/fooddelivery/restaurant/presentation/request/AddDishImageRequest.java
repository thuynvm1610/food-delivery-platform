package com.fooddelivery.restaurant.presentation.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddDishImageRequest {
    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    private Integer displayOrder;
}
