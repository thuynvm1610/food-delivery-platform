package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.UpdateRestaurantProfileInput;
import com.fooddelivery.restaurant.application.output.RestaurantProfileOutput;
import com.fooddelivery.restaurant.domain.aggregate.Restaurant;
import com.fooddelivery.restaurant.domain.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateRestaurantProfileUseCaseImpl implements UpdateRestaurantProfileUseCase {

    private final RestaurantRepository restaurantRepository;

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

        RestaurantProfileOutput output = new RestaurantProfileOutput();
        output.setId(restaurant.getId());
        output.setOwnerId(restaurant.getOwnerId());
        output.setName(restaurant.getName());
        output.setDescription(restaurant.getDescription());
        output.setStreetAddress(restaurant.getStreetAddress());
        output.setCity(restaurant.getCity());
        output.setDistrict(restaurant.getDistrict());
        output.setLatitude(restaurant.getLatitude());
        output.setLongitude(restaurant.getLongitude());
        output.setCoverImageUrl(restaurant.getCoverImageUrl());
        output.setStatus(restaurant.getStatus());
        output.setCreatedAt(restaurant.getCreatedAt());

        return output;
    }
}
