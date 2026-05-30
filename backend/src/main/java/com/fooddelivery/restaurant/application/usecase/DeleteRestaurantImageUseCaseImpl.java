package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.domain.entity.RestaurantImage;
import com.fooddelivery.restaurant.domain.repository.RestaurantImageRepository;
import com.fooddelivery.shared.exception.DomainException;
import com.fooddelivery.shared.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeleteRestaurantImageUseCaseImpl implements DeleteRestaurantImageUseCase {

    private final RestaurantImageRepository restaurantImageRepository;

    @Override
    @Transactional
    public void execute(UUID imageId) {
        RestaurantImage image = restaurantImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Restaurant image not found with id: " + imageId));

        int imageCount = restaurantImageRepository.findByRestaurantId(image.getRestaurantId()).size();
        if (imageCount <= 1) {
            throw new DomainException(ErrorCode.INVALID_REQUEST, "Restaurant must keep at least 1 image");
        }

        restaurantImageRepository.delete(image);
    }
}
