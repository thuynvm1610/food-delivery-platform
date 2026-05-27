package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.domain.aggregate.Restaurant;
import com.fooddelivery.restaurant.domain.entity.RestaurantImage;
import com.fooddelivery.restaurant.domain.entity.RestaurantOperatingHour;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RestaurantMapper {

    public Restaurant toDomain(RestaurantJpaEntity jpaEntity) {
        if (jpaEntity == null) return null;

        List<RestaurantImage> images = jpaEntity.getImages() != null
                ? jpaEntity.getImages().stream()
                .map(img -> new RestaurantImage(
                        img.getId(),
                        img.getRestaurant().getId(),
                        img.getImageUrl(),
                        img.getDisplayOrder()
                ))
                .collect(Collectors.toList())
                : null;

        List<RestaurantOperatingHour> hours = jpaEntity.getOperatingHours() != null
                ? jpaEntity.getOperatingHours().stream()
                .map(hour -> new RestaurantOperatingHour(
                        hour.getId(),
                        hour.getRestaurant().getId(),
                        hour.getDayOfWeek(),
                        hour.getOpenHour(),
                        hour.getCloseHour()
                ))
                .collect(Collectors.toList())
                : null;

        return new Restaurant(
                jpaEntity.getId(),
                jpaEntity.getOwnerId(),
                jpaEntity.getName(),
                jpaEntity.getDescription(),
                jpaEntity.getStreetAddress(),
                jpaEntity.getCity(),
                jpaEntity.getDistrict(),
                jpaEntity.getLatitude(),
                jpaEntity.getLongitude(),
                jpaEntity.getCoverImageUrl(),
                jpaEntity.getStatus(),
                jpaEntity.getCreatedAt(),
                images,
                hours
        );
    }

    public RestaurantJpaEntity toJpaEntity(Restaurant restaurant) {
        if (restaurant == null) return null;

        RestaurantJpaEntity entity = new RestaurantJpaEntity();
        entity.setId(restaurant.getId());
        entity.setOwnerId(restaurant.getOwnerId());
        entity.setName(restaurant.getName());
        entity.setDescription(restaurant.getDescription());
        entity.setStreetAddress(restaurant.getStreetAddress());
        entity.setCity(restaurant.getCity());
        entity.setDistrict(restaurant.getDistrict());
        entity.setLatitude(restaurant.getLatitude());
        entity.setLongitude(restaurant.getLongitude());
        entity.setCoverImageUrl(restaurant.getCoverImageUrl());
        entity.setStatus(restaurant.getStatus());
        entity.setCreatedAt(restaurant.getCreatedAt());

        if (restaurant.getImages() != null) {
            entity.setImages(restaurant.getImages().stream()
                    .map(img -> {
                        RestaurantImageJpaEntity imgEntity = new RestaurantImageJpaEntity();
                        imgEntity.setId(img.getId());
                        imgEntity.setRestaurant(entity);
                        imgEntity.setImageUrl(img.getImageUrl());
                        imgEntity.setDisplayOrder(img.getDisplayOrder());
                        return imgEntity;
                    })
                    .collect(Collectors.toList()));
        }

        if (restaurant.getOperatingHours() != null) {
            entity.setOperatingHours(restaurant.getOperatingHours().stream()
                    .map(hour -> {
                        RestaurantOperatingHourJpaEntity hourEntity = new RestaurantOperatingHourJpaEntity();
                        hourEntity.setId(hour.getId());
                        hourEntity.setRestaurant(entity);
                        hourEntity.setDayOfWeek(hour.getDayOfWeek());
                        hourEntity.setOpenHour(hour.getOpenHour());
                        hourEntity.setCloseHour(hour.getCloseHour());
                        return hourEntity;
                    })
                    .collect(Collectors.toList()));
        }

        return entity;
    }
}
