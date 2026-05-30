package com.fooddelivery.restaurant.infrastructure.persistence.adapter;

import com.fooddelivery.restaurant.domain.entity.RestaurantImage;
import com.fooddelivery.restaurant.domain.repository.RestaurantImageRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.RestaurantImageJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.RestaurantJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.repository.RestaurantImageJpaRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.repository.RestaurantJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class RestaurantImageRepositoryImpl implements RestaurantImageRepository {

    private final RestaurantImageJpaRepository restaurantImageJpaRepository;
    private final RestaurantJpaRepository restaurantJpaRepository;

    @Override
    public RestaurantImage save(RestaurantImage image) {
        RestaurantImageJpaEntity entity = new RestaurantImageJpaEntity();
        entity.setId(image.getId());
        entity.setImageUrl(image.getImageUrl());
        entity.setDisplayOrder(image.getDisplayOrder());

        RestaurantJpaEntity restaurant = restaurantJpaRepository.findById(image.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found: " + image.getRestaurantId()));
        entity.setRestaurant(restaurant);

        RestaurantImageJpaEntity saved = restaurantImageJpaRepository.save(entity);

        RestaurantImage result = new RestaurantImage();
        result.setId(saved.getId());
        result.setRestaurantId(saved.getRestaurant().getId());
        result.setImageUrl(saved.getImageUrl());
        result.setDisplayOrder(saved.getDisplayOrder());

        return result;
    }

    @Override
    public Optional<RestaurantImage> findById(UUID id) {
        return restaurantImageJpaRepository.findById(id)
                .map(entity -> new RestaurantImage(
                        entity.getId(),
                        entity.getRestaurant().getId(),
                        entity.getImageUrl(),
                        entity.getDisplayOrder()
                ));
    }

    @Override
    public List<RestaurantImage> findByRestaurantId(UUID restaurantId) {
        return restaurantImageJpaRepository.findByRestaurant_Id(restaurantId).stream()
                .map(entity -> new RestaurantImage(
                        entity.getId(),
                        entity.getRestaurant().getId(),
                        entity.getImageUrl(),
                        entity.getDisplayOrder()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(RestaurantImage image) {
        int deletedRows = restaurantImageJpaRepository.deleteByImageId(image.getId());
        if (deletedRows == 0) {
            throw new RuntimeException("Restaurant image not found with id: " + image.getId());
        }
    }

    @Override
    public void deleteAll(List<RestaurantImage> images) {
        List<UUID> ids = images.stream()
                .map(RestaurantImage::getId)
                .collect(Collectors.toList());
        restaurantImageJpaRepository.deleteAllById(ids);
    }
}
