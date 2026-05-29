package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.domain.entity.RestaurantImage;
import com.fooddelivery.restaurant.domain.repository.RestaurantImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeleteRestaurantImageUseCaseImpl implements DeleteRestaurantImageUseCase {

    private final RestaurantImageRepository restaurantImageRepository;

    @Override
    public void execute(UUID imageId) {
        RestaurantImage image = restaurantImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Restaurant image not found with id: " + imageId));
        restaurantImageRepository.delete(image);
    }
}
