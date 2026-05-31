package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.application.output.RestaurantImageOutput;
import com.fooddelivery.restaurant.domain.entity.RestaurantImage;
import com.fooddelivery.restaurant.presentation.response.RestaurantImageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RestaurantImageMapper {

    public RestaurantImageResponse toRestaurantImageResponse(RestaurantImageOutput output) {
        if (output == null) {
            return null;
        }

        RestaurantImageResponse response = new RestaurantImageResponse();
        response.setId(output.getId());
        response.setRestaurantId(output.getRestaurantId());
        response.setImageUrl(output.getImageUrl());
        response.setDisplayOrder(output.getDisplayOrder());
        return response;
    }

    public RestaurantImageOutput toRestaurantImageOutput (RestaurantImage image) {
        RestaurantImageOutput output = new RestaurantImageOutput();
        output.setId(image.getId());
        output.setRestaurantId(image.getRestaurantId());
        output.setImageUrl(image.getImageUrl());
        output.setDisplayOrder(image.getDisplayOrder());
        return output;
    }
}
