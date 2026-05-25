package com.fooddelivery.restaurant.domain.aggregate;

import com.fooddelivery.restaurant.domain.entity.RestaurantImage;
import com.fooddelivery.restaurant.domain.entity.RestaurantOperatingHour;
import com.fooddelivery.restaurant.domain.value.RestaurantStatus;
import com.fooddelivery.shared.domain.AggregateRoot;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
public class Restaurant implements AggregateRoot<UUID> {
    private final UUID id;
    private final UUID ownerId;
    private String name;
    private String description;
    private String streetAddress;
    private String city;
    private String district;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String coverImageUrl;
    private RestaurantStatus status;
    private final LocalDateTime createdAt;
    private List<RestaurantImage> images;
    private List<RestaurantOperatingHour> operatingHours;

    // Constructor for creating a brand-new Restaurant
    public Restaurant(UUID id, UUID ownerId, String name, String city, String district) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.city = city;
        this.district = district;
        this.status = RestaurantStatus.CLOSED; // Default closed
        this.createdAt = LocalDateTime.now();
        this.images = new ArrayList<>();
        this.operatingHours = new ArrayList<>();
    }

    // Full constructor for reconstructing from DB
    public Restaurant(UUID id, UUID ownerId, String name, String description,
                      String streetAddress, String city, String district,
                      BigDecimal latitude, BigDecimal longitude, String coverImageUrl,
                      RestaurantStatus status, LocalDateTime createdAt,
                      List<RestaurantImage> images, List<RestaurantOperatingHour> operatingHours) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.description = description;
        this.streetAddress = streetAddress;
        this.city = city;
        this.district = district;
        this.latitude = latitude;
        this.longitude = longitude;
        this.coverImageUrl = coverImageUrl;
        this.status = status;
        this.createdAt = createdAt;
        this.images = images != null ? images : new ArrayList<>();
        this.operatingHours = operatingHours != null ? operatingHours : new ArrayList<>();
    }

    public void updateProfile(String name, String description, String streetAddress,
                              String city, String district, BigDecimal latitude, BigDecimal longitude) {
        this.name = name;
        this.description = description;
        this.streetAddress = streetAddress;
        this.city = city;
        this.district = district;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public void updateCoverImage(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public void setStatus(RestaurantStatus status) {
        this.status = status;
    }

    public void addImage(RestaurantImage image) {
        images.add(image);
    }

    public void removeImage(UUID imageId) {
        images.removeIf(img -> img.getId().equals(imageId));
    }

    public void reorderImages(List<UUID> imageIds) {
        // Update display_order based on the list order
        for (int i = 0; i < imageIds.size(); i++) {
            UUID imageId = imageIds.get(i);
            int finalI = i;
            images.stream()
                    .filter(img -> img.getId().equals(imageId))
                    .forEach(img -> img.setDisplayOrder(finalI));
        }
    }

    public void setOperatingHours(List<RestaurantOperatingHour> hours) {
        this.operatingHours = hours;
    }
}
