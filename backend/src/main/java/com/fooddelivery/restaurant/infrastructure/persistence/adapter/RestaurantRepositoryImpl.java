package com.fooddelivery.restaurant.infrastructure.persistence.adapter;

import com.fooddelivery.restaurant.domain.aggregate.Restaurant;
import com.fooddelivery.restaurant.domain.repository.RestaurantRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.RestaurantJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.repository.RestaurantJpaRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.RestaurantMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class RestaurantRepositoryImpl implements RestaurantRepository {

    private final RestaurantJpaRepository restaurantJpaRepository;
    private final RestaurantMapper restaurantMapper;

    @Override
    public Restaurant save(Restaurant restaurant) {
        RestaurantJpaEntity jpaEntity = restaurantMapper.toJpaEntity(restaurant);
        RestaurantJpaEntity saved = restaurantJpaRepository.save(jpaEntity);
        return restaurantMapper.toDomain(saved);
    }

    @Override
    public Optional<Restaurant> findById(UUID id) {
        return restaurantJpaRepository.findById(id)
                .map(restaurantMapper::toDomain);
    }

    @Override
    public Optional<Restaurant> findByOwnerId(UUID ownerId) {
        return restaurantJpaRepository.findByOwnerId(ownerId)
                .map(restaurantMapper::toDomain);
    }

    @Override
    public void delete(Restaurant restaurant) {
        restaurantJpaRepository.deleteById(restaurant.getId());
    }
}
