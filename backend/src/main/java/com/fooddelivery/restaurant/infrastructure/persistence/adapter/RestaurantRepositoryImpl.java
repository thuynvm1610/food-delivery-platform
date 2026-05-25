package com.fooddelivery.restaurant.infrastructure.persistence.adapter;

import com.fooddelivery.restaurant.domain.aggregate.Restaurant;
import com.fooddelivery.restaurant.domain.repository.RestaurantRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.jpa.RestaurantJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.jpa.RestaurantJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class RestaurantRepositoryImpl implements RestaurantRepository {

    private final RestaurantJpaRepository jpaRepository;
    private final RestaurantPersistenceAdapter adapter;

    @Override
    public Restaurant save(Restaurant restaurant) {
        RestaurantJpaEntity jpaEntity = adapter.toJpa(restaurant);
        RestaurantJpaEntity saved = jpaRepository.save(jpaEntity);
        return adapter.toDomain(saved);
    }

    @Override
    public Optional<Restaurant> findById(UUID id) {
        return jpaRepository.findById(id)
                .map(adapter::toDomain);
    }

    @Override
    public Optional<Restaurant> findByOwnerId(UUID ownerId) {
        return jpaRepository.findByOwnerId(ownerId)
                .map(adapter::toDomain);
    }

    @Override
    public void delete(Restaurant restaurant) {
        jpaRepository.deleteById(restaurant.getId());
    }
}
