package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishImageOutput;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface UploadDishImagesUseCase {
    List<DishImageOutput> execute(UUID dishId, MultipartFile[] images);
}
