package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.output.DishOutput;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishOutputMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetDishesUseCaseImpl implements GetDishesUseCase {

    private final DishRepository dishRepository;
    private final DishOutputMapper dishOutputMapper;

    @Override
    public List<DishOutput> execute(UUID restaurantId) {
        var dishes = dishRepository.findByRestaurantId(restaurantId);
        return dishOutputMapper.toDishOutputList(dishes);
    }
}
