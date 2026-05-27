package com.fooddelivery.restaurant.infrastructure.persistence.adapter;

import com.fooddelivery.restaurant.domain.aggregate.Dish;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.repository.DishJpaRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class DishRepositoryImpl implements DishRepository {

    private final DishJpaRepository dishJpaRepository;
    private final DishMapper dishMapper;

    @Override
    public Dish save(Dish dish) {
        DishJpaEntity jpaEntity = dishMapper.toJpaEntity(dish);
        DishJpaEntity saved = dishJpaRepository.save(jpaEntity);
        return dishMapper.toDomain(saved);
    }

    @Override
    public Optional<Dish> findById(UUID id) {
        return dishJpaRepository.findById(id)
                .map(dishMapper::toDomain);
    }

    @Override
    public List<Dish> findByRestaurantId(UUID restaurantId) {
        return dishJpaRepository.findByRestaurantId(restaurantId)
                .stream()
                .map(dishMapper::toDomain)
                .toList();
    }

    @Override
    public void delete(Dish dish) {
        dishJpaRepository.deleteById(dish.getId());
    }
}
