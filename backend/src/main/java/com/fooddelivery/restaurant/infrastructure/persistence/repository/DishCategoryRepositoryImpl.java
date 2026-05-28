package com.fooddelivery.restaurant.infrastructure.persistence.repository;

import com.fooddelivery.restaurant.domain.aggregate.DishCategory;
import com.fooddelivery.restaurant.domain.repository.DishCategoryRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishCategoryJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishCategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class DishCategoryRepositoryImpl implements DishCategoryRepository {

    private final DishCategoryJpaRepository dishCategoryJpaRepository;
    private final DishCategoryMapper dishCategoryMapper;

    @Override
    public DishCategory save(DishCategory category) {
        DishCategoryJpaEntity entity = dishCategoryMapper.toEntity(category);
        DishCategoryJpaEntity saved = dishCategoryJpaRepository.save(entity);
        return dishCategoryMapper.toDomain(saved);
    }

    @Override
    public Optional<DishCategory> findById(UUID id) {
        return dishCategoryJpaRepository.findById(id)
                .map(dishCategoryMapper::toDomain);
    }

    @Override
    public List<DishCategory> findAllOrderByName() {
        return dishCategoryJpaRepository.findAllByOrderByNameAsc().stream()
                .map(dishCategoryMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(DishCategory category) {
        DishCategoryJpaEntity entity = dishCategoryMapper.toEntity(category);
        dishCategoryJpaRepository.delete(entity);
    }
}
