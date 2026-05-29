package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishImageOutput;
import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.restaurant.domain.repository.DishImageRepository;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.cloud.CloudinaryService;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishImageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UploadDishImagesUseCaseImpl implements UploadDishImagesUseCase {

    private final DishRepository dishRepository;
    private final DishImageRepository dishImageRepository;
    private final CloudinaryService cloudinaryService;
    private final DishImageMapper dishImageMapper;

    @Override
    public List<DishImageOutput> execute(UUID dishId, MultipartFile[] images) {
        if (images == null || images.length == 0) {
            return Collections.emptyList();
        }

        dishRepository.findById(dishId)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + dishId));

        List<DishImageOutput> outputs = new ArrayList<>();
        List<DishImage> existingImages = dishImageRepository.findByDishId(dishId);
        int nextOrder = existingImages.stream()
                .map(img -> img.getDisplayOrder() != null ? img.getDisplayOrder() : 0)
                .max(Integer::compareTo)
                .orElse(-1) + 1;

        for (MultipartFile imageFile : images) {
            String imageUrl = cloudinaryService.upload(imageFile);
            DishImage image = new DishImage(UUID.randomUUID(), dishId, imageUrl, nextOrder++);
            DishImage saved = dishImageRepository.save(image);
            outputs.add(dishImageMapper.toDishImageOutput(saved));
        }

        return outputs;
    }
}
