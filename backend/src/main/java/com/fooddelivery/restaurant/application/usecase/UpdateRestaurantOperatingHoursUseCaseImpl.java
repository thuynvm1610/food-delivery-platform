package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.domain.entity.RestaurantOperatingHour;
import com.fooddelivery.restaurant.domain.repository.RestaurantOperatingHourRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.RestaurantOperatingHourMapper;
import com.fooddelivery.restaurant.presentation.request.UpdateRestaurantOperatingHoursRequest;
import com.fooddelivery.restaurant.presentation.response.RestaurantOperatingHourResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UpdateRestaurantOperatingHoursUseCaseImpl implements UpdateRestaurantOperatingHoursUseCase {
    private final RestaurantOperatingHourRepository restaurantOperatingHourRepository;
    private final RestaurantOperatingHourMapper restaurantOperatingHourMapper;

    @Override
    public List<RestaurantOperatingHourResponse> execute(UUID restaurantId,
                                                         UpdateRestaurantOperatingHoursRequest request) {
        List<RestaurantOperatingHour> savedHours = request.getHours().stream()
                .map(item -> restaurantOperatingHourRepository
                        .findByRestaurantIdAndDayOfWeek(restaurantId, item.getDayOfWeek())
                        .map(existing -> {
                            existing.setOpenHour(item.getOpenHour());
                            existing.setCloseHour(item.getCloseHour());
                            return restaurantOperatingHourRepository.save(existing);
                        })
                        .orElseGet(() -> {
                            RestaurantOperatingHour hour = new RestaurantOperatingHour();
                            hour.setId(UUID.randomUUID());
                            hour.setRestaurantId(restaurantId);
                            hour.setDayOfWeek(item.getDayOfWeek());
                            hour.setOpenHour(item.getOpenHour());
                            hour.setCloseHour(item.getCloseHour());
                            return restaurantOperatingHourRepository.save(hour);
                        })
                )
                .sorted(Comparator.comparing(RestaurantOperatingHour::getDayOfWeek))
                .toList();
        return savedHours.stream()
                .map(restaurantOperatingHourMapper::mapToOperatingHourResponse)
                .collect(Collectors.toList());
    }
}
