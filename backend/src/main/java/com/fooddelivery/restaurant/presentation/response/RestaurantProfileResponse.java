package com.fooddelivery.restaurant.presentation.response;

import com.fooddelivery.restaurant.domain.value.RestaurantStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class RestaurantProfileResponse {
    private UUID id;
    private UUID ownerId;
    private String name;
    private String description;
    private String streetAddress;
    private String city;
    private String district;
    private Double latitude;
    private Double longitude;
    private String coverImageUrl;
    private RestaurantStatus status;
    private LocalDateTime createdAt;
}
