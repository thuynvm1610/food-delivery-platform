package com.fooddelivery.restaurant.infrastructure.persistence.mapper;

import com.fooddelivery.restaurant.domain.entity.RestaurantOperatingHour;
import com.fooddelivery.restaurant.presentation.response.RestaurantOperatingHourResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RestaurantOperatingHourMapper {

    public RestaurantOperatingHourResponse mapToOperatingHourResponse(RestaurantOperatingHour hour) {
        RestaurantOperatingHourResponse response = new RestaurantOperatingHourResponse();
        response.setId(hour.getId());
        response.setRestaurantId(hour.getRestaurantId());
        response.setDayOfWeek(hour.getDayOfWeek());
        response.setOpenHour(hour.getOpenHour());
        response.setCloseHour(hour.getCloseHour());
        return response;
    }
}
