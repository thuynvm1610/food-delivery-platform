package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.RestaurantImageOutput;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface UploadRestaurantImagesUseCase {
    List<RestaurantImageOutput> execute(UUID restaurantId, MultipartFile[] images);
}
