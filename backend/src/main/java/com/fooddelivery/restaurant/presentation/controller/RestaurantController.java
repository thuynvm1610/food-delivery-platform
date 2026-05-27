package com.fooddelivery.restaurant.presentation.controller;

import com.fooddelivery.identity.infrastructure.security.AuthenticatedUser;
import com.fooddelivery.restaurant.application.input.UpdateRestaurantProfileInput;
import com.fooddelivery.restaurant.application.output.RestaurantProfileOutput;
import com.fooddelivery.restaurant.application.output.DashboardStatsOutput;
import com.fooddelivery.restaurant.application.usecase.GetRestaurantProfileUseCase;
import com.fooddelivery.restaurant.application.usecase.UpdateRestaurantProfileUseCase;
import com.fooddelivery.restaurant.application.usecase.UpdateRestaurantStatusUseCase;
import com.fooddelivery.restaurant.application.usecase.GetDashboardStatsUseCase;
import com.fooddelivery.restaurant.domain.repository.RestaurantRepository;
import com.fooddelivery.restaurant.domain.value.RestaurantStatus;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DashboardStatsMapper;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.RestaurantProfileMapper;
import com.fooddelivery.restaurant.presentation.request.UpdateRestaurantProfileRequest;
import com.fooddelivery.restaurant.presentation.response.RestaurantProfileResponse;
import com.fooddelivery.restaurant.presentation.response.DashboardStatsResponse;
import com.fooddelivery.shared.web.BaseResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final GetRestaurantProfileUseCase getRestaurantProfileUseCase;
    private final UpdateRestaurantProfileUseCase updateRestaurantProfileUseCase;
    private final UpdateRestaurantStatusUseCase updateRestaurantStatusUseCase;
    private final GetDashboardStatsUseCase getDashboardStatsUseCase;
    private final RestaurantRepository restaurantRepository;
    private final RestaurantProfileMapper restaurantProfileMapper;
    private final DashboardStatsMapper dashboardStatsMapper;

    @GetMapping("/me")
    public ResponseEntity<BaseResponse<RestaurantProfileResponse>> getMyProfile(
            @AuthenticationPrincipal AuthenticatedUser user) {
        UUID restaurantId = restaurantRepository.findByOwnerId(user.userId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for user: " + user.userId())).getId();

        RestaurantProfileOutput output = getRestaurantProfileUseCase.execute(restaurantId);
        RestaurantProfileResponse response = restaurantProfileMapper.toRestaurantProfileResponse(output);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @PutMapping("/me")
    public ResponseEntity<BaseResponse<RestaurantProfileResponse>> updateProfile(
            @AuthenticationPrincipal AuthenticatedUser user,
            @Valid @RequestBody UpdateRestaurantProfileRequest request) {
        UUID restaurantId = restaurantRepository.findByOwnerId(user.userId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for user: " + user.userId()))
                .getId();

        UpdateRestaurantProfileInput input = new UpdateRestaurantProfileInput();
        input.setName(request.getName());
        input.setDescription(request.getDescription());
        input.setStreetAddress(request.getStreetAddress());
        input.setCity(request.getCity());
        input.setDistrict(request.getDistrict());
        if (request.getLatitude() != null) {
            input.setLatitude(BigDecimal.valueOf(request.getLatitude()));
        }
        if (request.getLongitude() != null) {
            input.setLongitude(BigDecimal.valueOf(request.getLongitude()));
        }

        RestaurantProfileOutput output = updateRestaurantProfileUseCase.execute(restaurantId, input);
        RestaurantProfileResponse response = restaurantProfileMapper.toRestaurantProfileResponse(output);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @PutMapping("/me/status")
    public ResponseEntity<BaseResponse<RestaurantProfileResponse>> updateStatus(
            @AuthenticationPrincipal AuthenticatedUser user,
            @RequestParam RestaurantStatus status) {
        UUID restaurantId = restaurantRepository.findByOwnerId(user.userId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for user: " + user.userId()))
                .getId();

        RestaurantProfileOutput output = updateRestaurantStatusUseCase.execute(restaurantId, status);
        RestaurantProfileResponse response = restaurantProfileMapper.toRestaurantProfileResponse(output);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @GetMapping("/me/dashboard/stats")
    public ResponseEntity<BaseResponse<DashboardStatsResponse>> getDashboardStats(
            @AuthenticationPrincipal AuthenticatedUser user) {

        DashboardStatsOutput output = getDashboardStatsUseCase.execute(user.userId());
        DashboardStatsResponse response = dashboardStatsMapper.toDashboardStatsResponse(output);
        return ResponseEntity.ok(BaseResponse.success(response));
    }
}
