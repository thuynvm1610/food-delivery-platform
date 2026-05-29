package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.RestaurantImageOutput;
import com.fooddelivery.restaurant.domain.entity.RestaurantImage;
import com.fooddelivery.restaurant.domain.repository.RestaurantImageRepository;
import com.fooddelivery.restaurant.infrastructure.cloud.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UploadRestaurantImagesUseCaseImpl implements UploadRestaurantImagesUseCase {

    private final RestaurantImageRepository restaurantImageRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    public List<RestaurantImageOutput> execute(UUID restaurantId, MultipartFile[] images) {
        if (images == null || images.length == 0) {
            return Collections.emptyList();
        }

        List<RestaurantImage> existingImages = restaurantImageRepository.findByRestaurantId(restaurantId);
        int nextOrder = existingImages.stream()
                .map(img -> img.getDisplayOrder() != null ? img.getDisplayOrder() : 0)
                .max(Integer::compareTo)
                .orElse(-1) + 1;

        List<RestaurantImageOutput> outputs = new ArrayList<>();
        for (MultipartFile imageFile : images) {
            String imageUrl = cloudinaryService.upload(imageFile);
            RestaurantImage image = new RestaurantImage(UUID.randomUUID(), restaurantId, imageUrl, nextOrder++);
            RestaurantImage saved = restaurantImageRepository.save(image);

            RestaurantImageOutput output = new RestaurantImageOutput();
            output.setId(saved.getId());
            output.setRestaurantId(saved.getRestaurantId());
            output.setImageUrl(saved.getImageUrl());
            output.setDisplayOrder(saved.getDisplayOrder());
            outputs.add(output);
        }

        return outputs;
    }
}
