package com.fooddelivery.restaurant.presentation.controller;

import com.fooddelivery.identity.infrastructure.security.AuthenticatedUser;
import com.fooddelivery.restaurant.application.input.AddDishImageInput;
import com.fooddelivery.restaurant.application.input.CreateDishInput;
import com.fooddelivery.restaurant.application.input.UpdateDishInput;
import com.fooddelivery.restaurant.application.output.DishImageOutput;
import com.fooddelivery.restaurant.application.output.DishOutput;
import com.fooddelivery.restaurant.application.usecase.*;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.domain.repository.RestaurantRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishOutputMapper;
import com.fooddelivery.restaurant.presentation.request.AddDishImageRequest;
import com.fooddelivery.restaurant.presentation.request.CreateDishRequest;
import com.fooddelivery.restaurant.presentation.request.UpdateDishRequest;
import com.fooddelivery.restaurant.presentation.response.DishImageResponse;
import com.fooddelivery.restaurant.presentation.response.DishResponse;
import com.fooddelivery.shared.web.BaseResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/restaurants")
@RequiredArgsConstructor
public class DishController {

    private final GetDishesUseCase getDishesUseCase;
    private final GetDishByIdUseCase getDishByIdUseCase;
    private final CreateDishUseCase createDishUseCase;
    private final UpdateDishUseCase updateDishUseCase;
    private final DeleteDishUseCase deleteDishUseCase;
    private final UpdateDishAvailabilityUseCase updateDishAvailabilityUseCase;
    private final AddDishImageUseCase addDishImageUseCase;
    private final DeleteDishImageUseCase deleteDishImageUseCase;
    
    private final DishRepository dishRepository;
    private final RestaurantRepository restaurantRepository;
    private final DishOutputMapper dishOutputMapper;

    // GET /api/v1/restaurants/me/dishes
    @GetMapping("/me/dishes")
    public ResponseEntity<BaseResponse<List<DishResponse>>> getMyDishes(
            @AuthenticationPrincipal AuthenticatedUser user) {
        
        UUID restaurantId = getRestaurantIdFromUser(user);

        List<DishOutput> dishes = getDishesUseCase.execute(restaurantId);
        List<DishResponse> responses = dishes.stream()
                .map(this::mapToDishResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(BaseResponse.success(responses));
    }

    // POST /api/v1/restaurants/me/dishes
    @PostMapping("/me/dishes")
    public ResponseEntity<BaseResponse<DishResponse>> createDish(
            @AuthenticationPrincipal AuthenticatedUser user,
            @Valid @RequestBody CreateDishRequest request) {
        
        UUID restaurantId = getRestaurantIdFromUser(user);

        CreateDishInput input = new CreateDishInput();
        input.setName(request.getName());
        input.setDescription(request.getDescription());
        input.setPriceAmount(request.getPriceAmount());
        input.setPriceCurrency(request.getPriceCurrency());

        DishOutput output = createDishUseCase.execute(restaurantId, input);
        DishResponse response = mapToDishResponse(output);

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponse.success(response));
    }

    // PUT /api/v1/restaurants/me/dishes/{id}
    @PutMapping("/me/dishes/{id}")
    public ResponseEntity<BaseResponse<DishResponse>> updateDish(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateDishRequest request) {
        
        verifyDishBelongsToRestaurant(id, user);

        UpdateDishInput input = new UpdateDishInput();
        input.setName(request.getName());
        input.setDescription(request.getDescription());
        input.setPriceAmount(request.getPriceAmount());
        input.setPriceCurrency(request.getPriceCurrency());

        DishOutput output = updateDishUseCase.execute(id, input);
        DishResponse response = mapToDishResponse(output);

        return ResponseEntity.ok(BaseResponse.success(response));
    }

    // DELETE /api/v1/restaurants/me/dishes/{id}
    @DeleteMapping("/me/dishes/{id}")
    public ResponseEntity<BaseResponse<Void>> deleteDish(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable UUID id) {
        
        verifyDishBelongsToRestaurant(id, user);

        deleteDishUseCase.execute(id);
        return ResponseEntity.ok(BaseResponse.success(null));
    }

    // PATCH /api/v1/restaurants/me/dishes/{id}/availability
    @PatchMapping("/me/dishes/{id}/availability")
    public ResponseEntity<BaseResponse<DishResponse>> updateDishAvailability(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable UUID id,
            @RequestParam boolean isAvailable) {
        
        verifyDishBelongsToRestaurant(id, user);

        DishOutput output = updateDishAvailabilityUseCase.execute(id, isAvailable);
        DishResponse response = mapToDishResponse(output);

        return ResponseEntity.ok(BaseResponse.success(response));
    }

    // POST /api/v1/dishes/{id}/images
    @PostMapping("/dishes/{id}/images")
    public ResponseEntity<BaseResponse<DishImageResponse>> addDishImage(
            @PathVariable UUID id,
            @Valid @RequestBody AddDishImageRequest request) {
        
        AddDishImageInput input = new AddDishImageInput();
        input.setImageUrl(request.getImageUrl());
        input.setDisplayOrder(request.getDisplayOrder());

        DishImageOutput output = addDishImageUseCase.execute(id, input);
        DishImageResponse response = mapToDishImageResponse(output);

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponse.success(response));
    }

    // DELETE /api/v1/dishes/{id}/images/{imageId}
    @DeleteMapping("/dishes/{dishId}/images/{imageId}")
    public ResponseEntity<BaseResponse<Void>> deleteDishImage(
            @PathVariable UUID dishId,
            @PathVariable UUID imageId) {
        
        deleteDishImageUseCase.execute(imageId);
        return ResponseEntity.ok(BaseResponse.success(null));
    }

    // Helper methods
    private UUID getRestaurantIdFromUser(AuthenticatedUser user) {
        return restaurantRepository.findByOwnerId(user.userId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found for user: " + user.userId()))
                .getId();
    }

    private void verifyDishBelongsToRestaurant(UUID dishId, AuthenticatedUser user) {
        DishOutput dish = getDishByIdUseCase.execute(dishId);
        UUID restaurantId = getRestaurantIdFromUser(user);
        
        if (!dish.getRestaurantId().equals(restaurantId)) {
            throw new RuntimeException("Unauthorized: Dish does not belong to your restaurant");
        }
    }

    private DishResponse mapToDishResponse(DishOutput output) {
        DishResponse response = new DishResponse();
        response.setId(output.getId());
        response.setRestaurantId(output.getRestaurantId());
        response.setName(output.getName());
        response.setDescription(output.getDescription());
        response.setPriceAmount(output.getPriceAmount());
        response.setPriceCurrency(output.getPriceCurrency());
        response.setAvailable(output.isAvailable());
        response.setCreatedAt(output.getCreatedAt());

        if (output.getImages() != null) {
            response.setImages(output.getImages().stream()
                    .map(this::mapToDishImageResponse)
                    .collect(Collectors.toList()));
        }

        return response;
    }

    private DishImageResponse mapToDishImageResponse(DishImageOutput output) {
        DishImageResponse response = new DishImageResponse();
        response.setId(output.getId());
        response.setDishId(output.getDishId());
        response.setImageUrl(output.getImageUrl());
        response.setDisplayOrder(output.getDisplayOrder());
        return response;
    }
}
