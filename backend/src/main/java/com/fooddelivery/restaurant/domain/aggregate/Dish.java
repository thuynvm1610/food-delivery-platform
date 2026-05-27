package com.fooddelivery.restaurant.domain.aggregate;

import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.shared.domain.AggregateRoot;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
public class Dish implements AggregateRoot<UUID> {
    private final UUID id;
    private final UUID restaurantId;
    private String name;
    private String description;
    private BigDecimal priceAmount;
    private String priceCurrency;
    private boolean isAvailable;
    private final LocalDateTime createdAt;
    private final List<DishImage> images;

    // Constructor for creating a new Dish
    public Dish(UUID id, UUID restaurantId, String name, BigDecimal priceAmount, String priceCurrency) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.name = name;
        this.priceAmount = priceAmount;
        this.priceCurrency = priceCurrency;
        this.isAvailable = true;
        this.createdAt = LocalDateTime.now();
        this.images = new ArrayList<>();
    }

    // Full constructor for reconstructing from DB
    public Dish(UUID id, UUID restaurantId, String name, String description,
                BigDecimal priceAmount, String priceCurrency, boolean isAvailable,
                LocalDateTime createdAt, List<DishImage> images) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.name = name;
        this.description = description;
        this.priceAmount = priceAmount;
        this.priceCurrency = priceCurrency;
        this.isAvailable = isAvailable;
        this.createdAt = createdAt;
        this.images = images != null ? images : new ArrayList<>();
    }

    public void updateProfile(String name, String description, BigDecimal priceAmount, String priceCurrency) {
        this.name = name;
        this.description = description;
        this.priceAmount = priceAmount;
        this.priceCurrency = priceCurrency;
    }

    public void updateAvailability(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public void addImage(DishImage image) {
        if (this.images == null) {
            return;
        }
        this.images.add(image);
    }

    public void removeImage(UUID imageId) {
        if (this.images != null) {
            this.images.removeIf(img -> img.getId().equals(imageId));
        }
    }
}
