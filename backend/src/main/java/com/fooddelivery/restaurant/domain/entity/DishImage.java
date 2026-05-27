package com.fooddelivery.restaurant.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DishImage {
    private UUID id;
    private UUID dishId;
    private String imageUrl;
    private Integer displayOrder;
}
