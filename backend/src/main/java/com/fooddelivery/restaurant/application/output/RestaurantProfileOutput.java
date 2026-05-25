package com.fooddelivery.restaurant.application.output;

import com.fooddelivery.restaurant.domain.value.RestaurantStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class RestaurantProfileOutput {
    private UUID id;
    private UUID ownerId;
    private String name;
    private String description;
    private String streetAddress;
    private String city;
    private String district;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String coverImageUrl;
    private RestaurantStatus status;
    private LocalDateTime createdAt;
}
