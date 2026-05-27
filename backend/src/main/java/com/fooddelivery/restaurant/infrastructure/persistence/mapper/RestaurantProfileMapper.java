package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.application.output.RestaurantProfileOutput;
import com.fooddelivery.restaurant.domain.aggregate.Restaurant;
import com.fooddelivery.restaurant.presentation.response.RestaurantProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RestaurantProfileMapper {

    public RestaurantProfileOutput toRestaurantProfileOutput(Restaurant restaurant) {
        if (restaurant == null) return null;

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

    public RestaurantProfileResponse toRestaurantProfileResponse(RestaurantProfileOutput output) {
        RestaurantProfileResponse response = new RestaurantProfileResponse();
        response.setId(output.getId());
        response.setOwnerId(output.getOwnerId());
        response.setName(output.getName());
        response.setDescription(output.getDescription());
        response.setStreetAddress(output.getStreetAddress());
        response.setCity(output.getCity());
        response.setDistrict(output.getDistrict());
        if (output.getLatitude() != null) {
            response.setLatitude(output.getLatitude().doubleValue());
        }
        if (output.getLongitude() != null) {
            response.setLongitude(output.getLongitude().doubleValue());
        }
        response.setCoverImageUrl(output.getCoverImageUrl());
        response.setStatus(output.getStatus());
        response.setCreatedAt(output.getCreatedAt());
        return response;
    }
}
