package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.RestaurantImageOutput;
import com.fooddelivery.restaurant.domain.entity.RestaurantImage;
import com.fooddelivery.restaurant.domain.repository.RestaurantImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReorderRestaurantImagesUseCaseImpl implements ReorderRestaurantImagesUseCase {

    private final RestaurantImageRepository restaurantImageRepository;

    @Override
    public List<RestaurantImageOutput> execute(UUID restaurantId, List<UUID> imageIds) {
        List<RestaurantImage> existingImages = restaurantImageRepository.findByRestaurantId(restaurantId);
        if (existingImages.isEmpty()) {
            return List.of();
        }

        Map<UUID, RestaurantImage> imageById = existingImages.stream()
                .collect(Collectors.toMap(RestaurantImage::getId, image -> image));

        if (imageIds.size() != existingImages.size() || !imageById.keySet().containsAll(imageIds)) {
            throw new RuntimeException("Invalid image order list for restaurant: " + restaurantId);
        }

        List<RestaurantImageOutput> outputs = new ArrayList<>();
        for (int i = 0; i < imageIds.size(); i++) {
            UUID imageId = imageIds.get(i);
            RestaurantImage image = imageById.get(imageId);
            image.setDisplayOrder(i);
            RestaurantImage saved = restaurantImageRepository.save(image);
            RestaurantImageOutput output = new RestaurantImageOutput();
            output.setId(saved.getId());
            output.setRestaurantId(saved.getRestaurantId());
            output.setImageUrl(saved.getImageUrl());
            output.setDisplayOrder(saved.getDisplayOrder());
            outputs.add(output);
        }

        return outputs.stream()
                .sorted((a, b) -> Integer.compare(a.getDisplayOrder(), b.getDisplayOrder()))
                .collect(Collectors.toList());
    }
}
