package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.UpdateRestaurantProfileInput;
import com.fooddelivery.restaurant.application.output.RestaurantProfileOutput;
import com.fooddelivery.restaurant.domain.aggregate.Restaurant;
import com.fooddelivery.restaurant.domain.repository.RestaurantRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.RestaurantMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateRestaurantProfileUseCaseImpl implements UpdateRestaurantProfileUseCase {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantMapper restaurantMapper;

    @Override
    public RestaurantProfileOutput execute(UUID restaurantId, UpdateRestaurantProfileInput input) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        restaurant.updateProfile(
                input.getName(),
                input.getDescription(),
                input.getStreetAddress(),
                input.getCity(),
                input.getDistrict(),
                input.getLatitude(),
                input.getLongitude()
        );

        restaurantRepository.save(restaurant);

        return restaurantMapper.toRestaurantProfileOutput(restaurant);
    }
}
