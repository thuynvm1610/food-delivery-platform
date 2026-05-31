package com.fooddelivery.restaurant.presentation.controller;

import com.fooddelivery.identity.infrastructure.security.AuthenticatedUser;
import com.fooddelivery.restaurant.domain.entity.RestaurantOperatingHour;
import com.fooddelivery.restaurant.domain.repository.RestaurantOperatingHourRepository;
import com.fooddelivery.restaurant.domain.repository.RestaurantRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.RestaurantOperatingHourMapper;
import com.fooddelivery.restaurant.presentation.request.UpdateRestaurantOperatingHoursRequest;
import com.fooddelivery.restaurant.presentation.response.RestaurantOperatingHourResponse;
import com.fooddelivery.shared.web.BaseResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/restaurants")
@RequiredArgsConstructor
public class RestaurantOperatingHourController {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantOperatingHourRepository restaurantOperatingHourRepository;
    private final RestaurantOperatingHourMapper restaurantOperatingHourMapper;
    private final com.fooddelivery.restaurant.application.usecase.UpdateRestaurantOperatingHoursUseCase updateRestaurantOperatingHoursUseCase;

    @GetMapping("/me/operating-hours")
    public ResponseEntity<BaseResponse<List<RestaurantOperatingHourResponse>>> getOperatingHours(
            @AuthenticationPrincipal AuthenticatedUser user) {
        UUID restaurantId = restaurantRepository.findByOwnerId(user.userId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for user: " + user.userId()))
                .getId();

        List<RestaurantOperatingHourResponse> responses = restaurantOperatingHourRepository
                .findByRestaurantId(restaurantId)
                .stream()
                .sorted(Comparator.comparing(RestaurantOperatingHour::getDayOfWeek))
                .map(restaurantOperatingHourMapper::mapToOperatingHourResponse)
                .toList();

        return ResponseEntity.ok(BaseResponse.success(responses));
    }

    @PutMapping("/me/operating-hours")
    public ResponseEntity<BaseResponse<List<RestaurantOperatingHourResponse>>> updateOperatingHours(
            @AuthenticationPrincipal AuthenticatedUser user,
            @Valid @RequestBody UpdateRestaurantOperatingHoursRequest request) {
        UUID restaurantId = restaurantRepository.findByOwnerId(user.userId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for user: " + user.userId()))
                .getId();

        List<RestaurantOperatingHourResponse> responses = updateRestaurantOperatingHoursUseCase
                .execute(restaurantId, request);

        return ResponseEntity.ok(BaseResponse.success(responses));
    }
}
