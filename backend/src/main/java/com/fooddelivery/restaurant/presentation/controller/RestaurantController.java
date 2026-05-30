package com.fooddelivery.restaurant.presentation.controller;

import com.fooddelivery.identity.infrastructure.security.AuthenticatedUser;
import com.fooddelivery.restaurant.application.input.UpdateRestaurantProfileInput;
import com.fooddelivery.restaurant.application.output.DashboardStatsOutput;
import com.fooddelivery.restaurant.application.output.RestaurantImageOutput;
import com.fooddelivery.restaurant.application.output.RestaurantProfileOutput;
import com.fooddelivery.restaurant.application.usecase.*;
import com.fooddelivery.restaurant.domain.entity.RestaurantImage;
import com.fooddelivery.restaurant.domain.entity.RestaurantOperatingHour;
import com.fooddelivery.restaurant.domain.repository.RestaurantImageRepository;
import com.fooddelivery.restaurant.domain.repository.RestaurantRepository;
import com.fooddelivery.restaurant.domain.repository.RestaurantOperatingHourRepository;
import com.fooddelivery.shared.exception.DomainException;
import com.fooddelivery.shared.exception.ErrorCode;
import com.fooddelivery.restaurant.domain.value.RestaurantStatus;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DashboardStatsMapper;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.RestaurantImageMapper;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.RestaurantMapper;
import com.fooddelivery.restaurant.presentation.request.UpdateRestaurantProfileRequest;
import com.fooddelivery.restaurant.presentation.request.UpdateRestaurantOperatingHoursRequest;
import com.fooddelivery.restaurant.presentation.request.UpdateRestaurantStatusRequest;
import com.fooddelivery.restaurant.presentation.response.DashboardStatsResponse;
import com.fooddelivery.restaurant.presentation.response.RestaurantImageResponse;
import com.fooddelivery.restaurant.presentation.response.RestaurantOperatingHourResponse;
import com.fooddelivery.restaurant.presentation.response.RestaurantProfileResponse;
import com.fooddelivery.shared.web.BaseResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final GetRestaurantProfileUseCase getRestaurantProfileUseCase;
    private final UpdateRestaurantProfileUseCase updateRestaurantProfileUseCase;
    private final UpdateRestaurantStatusUseCase updateRestaurantStatusUseCase;
    private final GetDashboardStatsUseCase getDashboardStatsUseCase;
    private final GetRestaurantImagesUseCase getRestaurantImagesUseCase;
    private final UploadRestaurantImagesUseCase uploadRestaurantImagesUseCase;
    private final DeleteRestaurantImageUseCase deleteRestaurantImageUseCase;
    private final RestaurantRepository restaurantRepository;
    private final RestaurantImageRepository restaurantImageRepository;
    private final RestaurantOperatingHourRepository restaurantOperatingHourRepository;
    private final RestaurantMapper restaurantMapper;
    private final RestaurantImageMapper restaurantImageMapper;
    private final DashboardStatsMapper dashboardStatsMapper;

    @GetMapping("/me")
    public ResponseEntity<BaseResponse<RestaurantProfileResponse>> getMyProfile(
            @AuthenticationPrincipal AuthenticatedUser user) {
        UUID restaurantId = restaurantRepository.findByOwnerId(user.userId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for user: " + user.userId())).getId();

        RestaurantProfileOutput output = getRestaurantProfileUseCase.execute(restaurantId);
        RestaurantProfileResponse response = restaurantMapper.toRestaurantProfileResponse(output);
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
        RestaurantProfileResponse response = restaurantMapper.toRestaurantProfileResponse(output);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    @PutMapping("/me/status")
    public ResponseEntity<BaseResponse<RestaurantProfileResponse>> updateStatus(
            @AuthenticationPrincipal AuthenticatedUser user,
            @Valid @RequestBody UpdateRestaurantStatusRequest request) {
        UUID restaurantId = restaurantRepository.findByOwnerId(user.userId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for user: " + user.userId()))
                .getId();

        RestaurantProfileOutput output = updateRestaurantStatusUseCase.execute(restaurantId, request.getStatus());
        RestaurantProfileResponse response = restaurantMapper.toRestaurantProfileResponse(output);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

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
                .map(this::mapToOperatingHourResponse)
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

        List<RestaurantOperatingHour> existingHours = restaurantOperatingHourRepository.findByRestaurantId(restaurantId);
        if (!existingHours.isEmpty()) {
            restaurantOperatingHourRepository.deleteAll(existingHours);
        }

        List<RestaurantOperatingHour> savedHours = request.getHours().stream()
                .map(item -> {
                    RestaurantOperatingHour hour = new RestaurantOperatingHour();
                    hour.setId(UUID.randomUUID());
                    hour.setRestaurantId(restaurantId);
                    hour.setDayOfWeek(item.getDayOfWeek());
                    hour.setOpenHour(item.getOpenHour());
                    hour.setCloseHour(item.getCloseHour());
                    return restaurantOperatingHourRepository.save(hour);
                })
                .sorted(Comparator.comparing(RestaurantOperatingHour::getDayOfWeek))
                .toList();

        List<RestaurantOperatingHourResponse> responses = savedHours.stream()
                .map(this::mapToOperatingHourResponse)
                .toList();

        return ResponseEntity.ok(BaseResponse.success(responses));
    }

    @PostMapping(value = "/me/images", consumes = "multipart/form-data")
    public ResponseEntity<BaseResponse<List<RestaurantImageResponse>>> uploadImages(
            @AuthenticationPrincipal AuthenticatedUser user,
            @RequestParam("images") MultipartFile[] images) {
        UUID restaurantId = restaurantRepository.findByOwnerId(user.userId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for user: " + user.userId()))
                .getId();

        List<RestaurantImageOutput> outputs = uploadRestaurantImagesUseCase.execute(restaurantId, images);
        List<RestaurantImageResponse> responses = outputs.stream()
                .map(restaurantImageMapper::toRestaurantImageResponse)
                .toList();

        return ResponseEntity.ok(BaseResponse.success(responses));
    }

    @GetMapping("/me/images")
    public ResponseEntity<BaseResponse<List<RestaurantImageResponse>>> getImages(
            @AuthenticationPrincipal AuthenticatedUser user) {
        UUID restaurantId = restaurantRepository.findByOwnerId(user.userId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for user: " + user.userId()))
                .getId();

        List<RestaurantImageResponse> responses = getRestaurantImagesUseCase.execute(restaurantId)
                .stream()
                .map(restaurantImageMapper::toRestaurantImageResponse)
                .toList();

        return ResponseEntity.ok(BaseResponse.success(responses));
    }

    @DeleteMapping("/me/images/{imageId}")
    public ResponseEntity<BaseResponse<Void>> deleteImage(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable UUID imageId) {
        UUID restaurantId = restaurantRepository.findByOwnerId(user.userId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for user: " + user.userId()))
                .getId();

        RestaurantImage image = restaurantImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Restaurant image not found with id: " + imageId));
        if (!restaurantId.equals(image.getRestaurantId())) {
            throw new DomainException(ErrorCode.FORBIDDEN, "You cannot delete an image from another restaurant");
        }

        deleteRestaurantImageUseCase.execute(imageId);
        return ResponseEntity.ok(BaseResponse.success(null));
    }

    @GetMapping("/me/dashboard/stats")
    public ResponseEntity<BaseResponse<DashboardStatsResponse>> getDashboardStats(
            @AuthenticationPrincipal AuthenticatedUser user) {

        DashboardStatsOutput output = getDashboardStatsUseCase.execute(user.userId());
        DashboardStatsResponse response = dashboardStatsMapper.toDashboardStatsResponse(output);
        return ResponseEntity.ok(BaseResponse.success(response));
    }

    private RestaurantOperatingHourResponse mapToOperatingHourResponse(RestaurantOperatingHour hour) {
        RestaurantOperatingHourResponse response = new RestaurantOperatingHourResponse();
        response.setId(hour.getId());
        response.setRestaurantId(hour.getRestaurantId());
        response.setDayOfWeek(hour.getDayOfWeek());
        response.setOpenHour(hour.getOpenHour());
        response.setCloseHour(hour.getCloseHour());
        return response;
    }
}
