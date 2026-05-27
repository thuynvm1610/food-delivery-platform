package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.RestaurantProfileOutput;
import com.fooddelivery.restaurant.domain.aggregate.Restaurant;
import com.fooddelivery.restaurant.domain.repository.RestaurantRepository;
import com.fooddelivery.restaurant.domain.value.RestaurantStatus;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.RestaurantProfileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateRestaurantStatusUseCaseImpl implements UpdateRestaurantStatusUseCase {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantProfileMapper restaurantProfileMapper;

    @Override
    public RestaurantProfileOutput execute(UUID restaurantId, RestaurantStatus status) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        restaurant.setStatus(status);
        restaurantRepository.save(restaurant);

        return restaurantProfileMapper.toRestaurantProfileOutput(restaurant);
    }
}
