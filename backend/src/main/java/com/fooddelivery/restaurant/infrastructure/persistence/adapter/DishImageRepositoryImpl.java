package com.fooddelivery.restaurant.infrastructure.persistence.adapter;

import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.restaurant.domain.repository.DishImageRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishImageJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.repository.DishImageJpaRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.repository.DishJpaRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishImageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class DishImageRepositoryImpl implements DishImageRepository {

    private final DishImageJpaRepository dishImageJpaRepository;
    private final DishJpaRepository dishJpaRepository;
    private final DishImageMapper dishImageMapper;

    @Override
    public DishImage save(DishImage image) {
        DishImageJpaEntity jpaEntity = dishImageMapper.toJpaEntity(image);
        dishJpaRepository.findById(image.getDishId())
                .ifPresentOrElse(jpaEntity::setDish,
                        () -> { throw new RuntimeException("Dish not found: " + image.getDishId()); });
        DishImageJpaEntity saved = dishImageJpaRepository.save(jpaEntity);
        return dishImageMapper.toDomain(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DishImage> findById(UUID id) {
        return dishImageJpaRepository.findById(id)
                .map(dishImageMapper::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DishImage> findByDishId(UUID dishId) {
        return dishImageJpaRepository.findByDish_Id(dishId)
                .stream()
                .map(dishImageMapper::toDomain)
                .toList();
    }

    @Override
    @Transactional
    public void delete(DishImage image) {
        dishImageJpaRepository.deleteById(image.getId());
    }

    @Override
    @Transactional
    public void deleteByDishIdAndImageIds(UUID dishId, List<UUID> imageIds) {
        if (imageIds == null || imageIds.isEmpty()) {
            return;
        }

        int deletedCount = dishImageJpaRepository.deleteByDishIdAndIdIn(dishId, imageIds);
        if (deletedCount != imageIds.size()) {
            throw new RuntimeException("One or more dish images were not deleted");
        }
    }
}
