package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishImageOutput;
import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.restaurant.domain.repository.DishImageRepository;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishOutputMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReorderDishImagesUseCaseImpl implements ReorderDishImagesUseCase {

    private final DishRepository dishRepository;
    private final DishImageRepository dishImageRepository;
    private final DishOutputMapper dishOutputMapper;

    @Override
    public List<DishImageOutput> execute(UUID dishId, List<UUID> imageIds) {
        dishRepository.findById(dishId)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + dishId));

        List<DishImage> existingImages = dishImageRepository.findByDishId(dishId);
        if (existingImages.isEmpty()) {
            return List.of();
        }

        Map<UUID, DishImage> imageById = existingImages.stream()
                .collect(Collectors.toMap(DishImage::getId, image -> image));

        if (imageIds.size() != existingImages.size() || !imageById.keySet().containsAll(imageIds)) {
            throw new RuntimeException("Invalid image order list for dish: " + dishId);
        }

        List<DishImageOutput> outputs = new ArrayList<>();
        for (int i = 0; i < imageIds.size(); i++) {
            UUID imageId = imageIds.get(i);
            DishImage image = imageById.get(imageId);
            image.setDisplayOrder(i);
            DishImage saved = dishImageRepository.save(image);
            outputs.add(dishOutputMapper.toDishImageOutput(saved));
        }

        return outputs.stream()
                .sorted((a, b) -> Integer.compare(a.getDisplayOrder(), b.getDisplayOrder()))
                .collect(Collectors.toList());
    }
}
