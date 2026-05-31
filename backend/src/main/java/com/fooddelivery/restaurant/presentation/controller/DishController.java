package com.fooddelivery.restaurant.presentation.controller;

import com.fooddelivery.identity.infrastructure.security.AuthenticatedUser;
import com.fooddelivery.restaurant.application.input.CreateDishImageInput;
import com.fooddelivery.restaurant.application.input.CreateDishInput;
import com.fooddelivery.restaurant.application.input.GetDishesInput;
import com.fooddelivery.restaurant.application.input.UpdateDishInput;
import com.fooddelivery.restaurant.application.output.DishImageOutput;
import com.fooddelivery.restaurant.application.output.DishOutput;
import com.fooddelivery.restaurant.application.usecase.*;
import com.fooddelivery.restaurant.domain.repository.RestaurantRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishImageMapper;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishMapper;
import com.fooddelivery.restaurant.presentation.request.*;
import com.fooddelivery.restaurant.presentation.response.DishImageResponse;
import com.fooddelivery.restaurant.presentation.response.DishResponse;
import com.fooddelivery.shared.web.BaseResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final CreateDishImageUseCase addDishImageUseCase;
    private final UploadDishImagesUseCase uploadDishImagesUseCase;
    private final DeleteDishImageUseCase deleteDishImageUseCase;

    private final RestaurantRepository restaurantRepository;

    private final DishMapper dishMapper;
    private final DishImageMapper dishImageMapper;

    // GET /api/v1/restaurants/me/dishes
    @GetMapping("/me/dishes")
    public ResponseEntity<BaseResponse<Page<DishResponse>>> getMyDishes(
            @AuthenticationPrincipal AuthenticatedUser user,
            @ModelAttribute GetDishesRequest request) {

        UUID restaurantId = getRestaurantIdFromUser(user);

        GetDishesInput input = new GetDishesInput();
        input.setCategoryIds(request.getCategoryIds());
        input.setSearch(request.getSearch());
        input.setPage(request.getPage());
        input.setLimit(request.getLimit());
        input.setMinPrice(request.getMinPrice());
        input.setMaxPrice(request.getMaxPrice());

        Page<DishOutput> paginatedDishes = getDishesUseCase.execute(restaurantId, input);
        var responses = paginatedDishes.getContent().stream().map(dishMapper::mapToDishResponse).toList();
        Page<DishResponse> responsePage = new PageImpl<>(responses, paginatedDishes.getPageable(), paginatedDishes.getTotalElements());

        return ResponseEntity.ok(BaseResponse.success(responsePage));
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
        input.setCategoryIds(request.getCategoryIds());

        DishOutput output = createDishUseCase.execute(restaurantId, input);
        DishResponse response = dishMapper.mapToDishResponse(output);

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponse.success(response));
    }

    // GET /api/v1/restaurants/me/dishes/{id}
    @GetMapping("/me/dishes/{id}")
    public ResponseEntity<BaseResponse<DishResponse>> getDishById(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable UUID id) {
        verifyDishBelongsToRestaurant(id, user);

        DishOutput output = getDishByIdUseCase.execute(id);
        DishResponse response = dishMapper.mapToDishResponse(output);

        return ResponseEntity.ok(BaseResponse.success(response));
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
        input.setCategoryIds(request.getCategoryIds());

        DishOutput output = updateDishUseCase.execute(id, input);
        DishResponse response = dishMapper.mapToDishResponse(output);

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

    // PUT /api/v1/restaurants/me/dishes/{id}/availability
    @PutMapping("/me/dishes/{id}/availability")
    public ResponseEntity<BaseResponse<DishResponse>> updateDishAvailability(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable UUID id,
            @RequestParam(value = "isAvailable", required = false) Boolean isAvailable,
            @RequestBody(required = false) UpdateDishAvailabilityRequest request) {
        
        verifyDishBelongsToRestaurant(id, user);

        Boolean resolvedIsAvailable = isAvailable != null ? isAvailable : request != null ? request.getIsAvailable() : null;
        if (resolvedIsAvailable == null) {
            throw new RuntimeException("isAvailable is required");
        }

        DishOutput output = updateDishAvailabilityUseCase.execute(id, resolvedIsAvailable);
        DishResponse response = dishMapper.mapToDishResponse(output);

        return ResponseEntity.ok(BaseResponse.success(response));
    }

    // POST /api/v1/restaurants/me/dishes/{id}/images (JSON URL payload)
    @PostMapping(value = "/me/dishes/{id}/images", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BaseResponse<DishImageResponse>> addDishImage(
            @PathVariable UUID id,
            @Valid @RequestBody CreateDishImageRequest request) {
        
        CreateDishImageInput input = new CreateDishImageInput();
        input.setImageUrl(request.getImageUrl());
        input.setDisplayOrder(request.getDisplayOrder());

        DishImageOutput output = addDishImageUseCase.execute(id, input);
        DishImageResponse response = dishImageMapper.mapToDishImageResponse(output);

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponse.success(response));
    }

    // POST /api/v1/restaurants/me/dishes/{id}/images (multipart form upload)
    @PostMapping(value = "/me/dishes/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse<List<DishImageResponse>>> uploadDishImages(
            @AuthenticationPrincipal AuthenticatedUser user,
            @PathVariable UUID id,
            @RequestParam("images") MultipartFile[] images) {
        verifyDishBelongsToRestaurant(id, user);

        List<DishImageOutput> outputs = uploadDishImagesUseCase.execute(id, images);
        List<DishImageResponse> responses = outputs.stream()
                .map(dishImageMapper::mapToDishImageResponse)
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponse.success(responses));
    }

    // DELETE /api/v1/restaurants/me/dishes/{dishId}/images
    @DeleteMapping(value = "/me/dishes/{dishId}/images", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BaseResponse<Void>> deleteDishImages(
            @PathVariable UUID dishId,
            @Valid @RequestBody DeleteDishImagesRequest request,
            @AuthenticationPrincipal AuthenticatedUser user) {
        verifyDishBelongsToRestaurant(dishId, user);

        if (request.getImageIds() == null || request.getImageIds().isEmpty()) {
            throw new RuntimeException("No image IDs provided for deletion");
        }

        deleteDishImageUseCase.execute(dishId, request.getImageIds());
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
}
