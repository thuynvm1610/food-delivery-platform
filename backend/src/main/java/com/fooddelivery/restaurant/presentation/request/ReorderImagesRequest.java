package com.fooddelivery.restaurant.presentation.request;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ReorderImagesRequest {
    private List<UUID> imageIds;
}
