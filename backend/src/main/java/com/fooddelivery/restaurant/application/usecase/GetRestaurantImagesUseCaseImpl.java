package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.RestaurantImageOutput;
import com.fooddelivery.restaurant.domain.entity.RestaurantImage;
import com.fooddelivery.restaurant.domain.repository.RestaurantImageRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.RestaurantImageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetRestaurantImagesUseCaseImpl implements GetRestaurantImagesUseCase {

    private final RestaurantImageRepository restaurantImageRepository;
    private final RestaurantImageMapper restaurantImageMapper;

    @Override
    public List<RestaurantImageOutput> execute(UUID restaurantId) {
        return restaurantImageRepository.findByRestaurantId(restaurantId)
                .stream()
                .sorted(Comparator.comparing(image -> image.getDisplayOrder() == null ? 0 : image.getDisplayOrder()))
                .map(restaurantImageMapper::toRestaurantImageOutput)
                .toList();
    }
}
