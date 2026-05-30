package com.fooddelivery.restaurant.infrastructure.persistence.adapter;

import com.fooddelivery.restaurant.domain.entity.RestaurantOperatingHour;
import com.fooddelivery.restaurant.domain.repository.RestaurantOperatingHourRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.RestaurantOperatingHourJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.RestaurantJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.repository.RestaurantJpaRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.repository.RestaurantOperatingHourJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class RestaurantOperatingHourRepositoryImpl implements RestaurantOperatingHourRepository {

    private final RestaurantJpaRepository restaurantJpaRepository;
    private final RestaurantOperatingHourJpaRepository jpaRepository;

    @Override
    public RestaurantOperatingHour save(RestaurantOperatingHour hour) {
        RestaurantOperatingHourJpaEntity entity = new RestaurantOperatingHourJpaEntity();
        entity.setId(hour.getId());
        RestaurantJpaEntity restaurant = restaurantJpaRepository.getReferenceById(hour.getRestaurantId());
        entity.setRestaurant(restaurant);
        entity.setDayOfWeek(hour.getDayOfWeek());
        entity.setOpenHour(hour.getOpenHour());
        entity.setCloseHour(hour.getCloseHour());

        RestaurantOperatingHourJpaEntity saved = jpaRepository.save(entity);

        RestaurantOperatingHour result = new RestaurantOperatingHour();
        result.setId(saved.getId());
        result.setRestaurantId(saved.getRestaurant().getId());
        result.setDayOfWeek(saved.getDayOfWeek());
        result.setOpenHour(saved.getOpenHour());
        result.setCloseHour(saved.getCloseHour());

        return result;
    }

    @Override
    public Optional<RestaurantOperatingHour> findById(UUID id) {
        return jpaRepository.findById(id)
                .map(entity -> new RestaurantOperatingHour(
                        entity.getId(),
                        entity.getRestaurant().getId(),
                        entity.getDayOfWeek(),
                        entity.getOpenHour(),
                        entity.getCloseHour()
                ));
    }

    @Override
    public List<RestaurantOperatingHour> findByRestaurantId(UUID restaurantId) {
        return jpaRepository.findByRestaurantId(restaurantId).stream()
                .map(entity -> new RestaurantOperatingHour(
                        entity.getId(),
                        entity.getRestaurant().getId(),
                        entity.getDayOfWeek(),
                        entity.getOpenHour(),
                        entity.getCloseHour()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RestaurantOperatingHour> findByRestaurantIdAndDayOfWeek(UUID restaurantId, Integer dayOfWeek) {
        return jpaRepository.findByRestaurantIdAndDayOfWeek(restaurantId, dayOfWeek)
                .map(entity -> new RestaurantOperatingHour(
                        entity.getId(),
                        entity.getRestaurant().getId(),
                        entity.getDayOfWeek(),
                        entity.getOpenHour(),
                        entity.getCloseHour()
                ));
    }

    @Override
    public void delete(RestaurantOperatingHour hour) {
        jpaRepository.deleteById(hour.getId());
    }

    @Override
    public void deleteAll(List<RestaurantOperatingHour> hours) {
        List<UUID> ids = hours.stream()
                .map(RestaurantOperatingHour::getId)
                .collect(Collectors.toList());
        jpaRepository.deleteAllById(ids);
    }
}
