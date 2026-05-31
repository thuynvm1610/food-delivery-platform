package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.presentation.request.UpdateRestaurantOperatingHoursRequest;
import com.fooddelivery.restaurant.presentation.response.RestaurantOperatingHourResponse;
import java.util.List;
import java.util.UUID;

/**
 * Use case for updating a restaurant's operating hours.
 */
public interface UpdateRestaurantOperatingHoursUseCase {
    /**
     * Updates operating hours for the given restaurant.
     *
     * @param restaurantId the id of the restaurant
     * @param request      request containing a list of operating hour updates
     * @return list of updated {@link RestaurantOperatingHourResponse}
     */
    List<RestaurantOperatingHourResponse> execute(UUID restaurantId, UpdateRestaurantOperatingHoursRequest request);
}
