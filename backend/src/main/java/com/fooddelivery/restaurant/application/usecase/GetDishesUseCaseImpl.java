package com.fooddelivery.restaurant.application.usecase;

import com.fooddelivery.restaurant.application.input.GetDishesInput;
import com.fooddelivery.restaurant.application.output.DishOutput;
import com.fooddelivery.restaurant.domain.aggregate.Dish;
import com.fooddelivery.restaurant.domain.repository.DishRepository;
import com.fooddelivery.restaurant.infrastructure.persistence.mapper.DishOutputMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetDishesUseCaseImpl implements GetDishesUseCase {

    private final DishRepository dishRepository;
    private final DishOutputMapper dishOutputMapper;

    @Override
    public Page<DishOutput> execute(UUID restaurantId, GetDishesInput input) {
        int page = (input != null && input.getPage() != null && input.getPage() > 0) ? input.getPage() : 1;
        int limit = (input != null && input.getLimit() != null && input.getLimit() > 0) ? input.getLimit() : 4;
        String search = (input != null && input.getSearch() != null && !input.getSearch().isBlank())
                ? input.getSearch().trim()
                : null;
        BigDecimal minPrice = input != null ? input.getMinPrice() : null;
        BigDecimal maxPrice = input != null ? input.getMaxPrice() : null;

        Pageable pageable = PageRequest.of(Math.max(0, page - 1), limit, Sort.by("name").ascending());

        Page<Dish> paged;
        List<UUID> categoryIds = resolveCategoryIds(input);
        if (!categoryIds.isEmpty()) {
            paged = dishRepository.findByRestaurantIdAndCategoryIds(restaurantId, categoryIds, pageable, search, minPrice, maxPrice);
        } else {
            paged = dishRepository.findByRestaurantId(restaurantId, pageable, search, minPrice, maxPrice);
        }

        List<DishOutput> outputs = paged.getContent().stream().map(dishOutputMapper::toDishOutput).toList();
        return new PageImpl<>(outputs, pageable, paged.getTotalElements());
    }

    private List<UUID> resolveCategoryIds(GetDishesInput input) {
        if (input == null || input.getCategoryIds() == null || input.getCategoryIds().isEmpty()) {
            return List.of();
        }

        return input.getCategoryIds().stream()
                .filter(value -> value != null && !value.isBlank())
                .map(value -> {
                    try {
                        return UUID.fromString(value);
                    } catch (IllegalArgumentException ex) {
                        return null;
                    }
                })
                .filter(java.util.Objects::nonNull)
                .distinct()
                .toList();
    }
}
