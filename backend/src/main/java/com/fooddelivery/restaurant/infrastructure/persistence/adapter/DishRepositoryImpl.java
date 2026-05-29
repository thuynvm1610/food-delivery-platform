package com.fooddelivery.restaurant.infrastructure.persistence.adapter;

import com.fooddelivery.restaurant.domain.aggregate.Dish;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishCategoryJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishCategoryJpaMapping;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishCategoryMappingId;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishMapper;
import com.fooddelivery.restaurant.infrastructure.persistence.repository.DishCategoryJpaRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.repository.DishJpaRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.specification.DishSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class DishRepositoryImpl implements DishRepository {

    private final DishJpaRepository dishJpaRepository;
    private final DishCategoryJpaRepository dishCategoryJpaRepository;
    private final DishMapper dishMapper;

    @Override
    @Transactional
    public Dish save(Dish dish) {
        var jpaEntity = dishMapper.toJpaEntity(dish);
        jpaEntity.setCategoryMappings(buildCategoryMappings(jpaEntity, dish));
        var saved = dishJpaRepository.save(jpaEntity);
        return dishMapper.toDomain(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Dish> findById(UUID id) {
        return dishJpaRepository.findById(id)
                .map(dishMapper::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Dish> findByRestaurantId(UUID restaurantId, Pageable pageable, String search, BigDecimal minPrice, BigDecimal maxPrice) {

        Specification<DishJpaEntity> spec = Specification.where(DishSpecifications.byRestaurantId(restaurantId))
                .and(DishSpecifications.bySearch(search))
                .and(DishSpecifications.byMinPrice(minPrice))
                .and(DishSpecifications.byMaxPrice(maxPrice));

        Page<DishJpaEntity> pageResult = dishJpaRepository.findAll(spec, pageable);
        var items = pageResult.getContent().stream().map(dishMapper::toDomain).toList();
        return new PageImpl<>(items, pageable, pageResult.getTotalElements());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Dish> findByRestaurantIdAndCategoryIds(UUID restaurantId, List<UUID> categoryIds, Pageable pageable, String search, BigDecimal minPrice, BigDecimal maxPrice) {

        Specification<DishJpaEntity> spec = Specification.where(DishSpecifications.byRestaurantId(restaurantId))
                .and(DishSpecifications.byCategoryIds(categoryIds))
                .and(DishSpecifications.bySearch(search))
                .and(DishSpecifications.byMinPrice(minPrice))
                .and(DishSpecifications.byMaxPrice(maxPrice));

        Page<DishJpaEntity> pageResult = dishJpaRepository.findAll(spec, pageable);
        var items = pageResult.getContent().stream().map(dishMapper::toDomain).toList();
        return new PageImpl<>(items, pageable, pageResult.getTotalElements());
    }

    @Override
    @Transactional
    public void updateAvailability(UUID dishId, boolean isAvailable) {
        int updated = dishJpaRepository.updateAvailability(dishId, isAvailable);
        if (updated == 0) {
            throw new RuntimeException("Dish not found with id: " + dishId);
        }
    }

    @Override
    @Transactional
    public void delete(Dish dish) {
        dishJpaRepository.deleteById(dish.getId());
    }

    private List<DishCategoryJpaMapping> buildCategoryMappings(DishJpaEntity dishEntity, Dish dish) {
        if (dish.getCategories() == null) {
            return new ArrayList<>();
        }

        return dish.getCategories().stream()
                .map(category -> {
                    DishCategoryJpaEntity categoryEntity = dishCategoryJpaRepository.getReferenceById(category.getId());
                    DishCategoryJpaMapping mapping = new DishCategoryJpaMapping();
                    mapping.setId(new DishCategoryMappingId(dish.getId(), category.getId()));
                    mapping.setDish(dishEntity);
                    mapping.setCategory(categoryEntity);
                    return mapping;
                })
                .collect(java.util.stream.Collectors.toCollection(ArrayList::new));
    }
}
