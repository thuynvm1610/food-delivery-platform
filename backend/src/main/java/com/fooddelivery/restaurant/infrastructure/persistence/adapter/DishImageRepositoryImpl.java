package com.fooddelivery.restaurant.infrastructure.persistence.adapter;

import com.fooddelivery.restaurant.domain.entity.DishImage;
import com.fooddelivery.restaurant.domain.repository.DishImageRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishImageJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.repository.DishImageJpaRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishImageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class DishImageRepositoryImpl implements DishImageRepository {

    private final DishImageJpaRepository dishImageJpaRepository;
    private final DishImageMapper dishImageMapper;

    @Override
    public DishImage save(DishImage image) {
        DishImageJpaEntity jpaEntity = dishImageMapper.toJpaEntity(image);
        DishImageJpaEntity saved = dishImageJpaRepository.save(jpaEntity);
        return dishImageMapper.toDomain(saved);
    }

    @Override
    public Optional<DishImage> findById(UUID id) {
        return dishImageJpaRepository.findById(id)
                .map(dishImageMapper::toDomain);
    }

    @Override
    public List<DishImage> findByDishId(UUID dishId) {
        return dishImageJpaRepository.findByDish_Id(dishId)
                .stream()
                .map(dishImageMapper::toDomain)
                .toList();
    }

    @Override
    public void delete(DishImage image) {
        dishImageJpaRepository.deleteById(image.getId());
    }
}
