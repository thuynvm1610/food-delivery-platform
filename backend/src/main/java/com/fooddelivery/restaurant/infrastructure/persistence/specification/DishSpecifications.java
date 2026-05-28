package com.fooddelivery.restaurant.infrastructure.persistence.specification;

import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishCategoryJpaMapping;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishJpaEntity;
import com.fooddelivery.restaurant.infrastructure.persistence.entity.DishCategoryJpaEntity;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public final class DishSpecifications {

    private DishSpecifications() {}

    public static Specification<DishJpaEntity> byRestaurantId(UUID restaurantId) {
        return (root, query, cb) -> cb.equal(root.get("restaurantId"), restaurantId);
    }

    public static Specification<DishJpaEntity> byCategoryIds(List<UUID> categoryIds) {
        return (root, query, cb) -> {
            if (categoryIds == null || categoryIds.isEmpty()) {
                return null;
            }

            Join<DishJpaEntity, DishCategoryJpaMapping> mapping = root.join("categoryMappings", JoinType.INNER);
            query.distinct(true);
            return mapping.get("id").get("categoryId").in(categoryIds);
        };
    }

    public static Specification<DishJpaEntity> bySearch(String search) {
        return (root, query, cb) -> {
            if (search == null || search.isBlank()) return null;
            String like = "%" + search.toLowerCase() + "%";
            return cb.like(cb.lower(root.get("name")), like);
        };
    }

    public static Specification<DishJpaEntity> byMinPrice(BigDecimal minPrice) {
        return (root, query, cb) -> {
            if (minPrice == null) return null;
            return cb.greaterThanOrEqualTo(root.get("priceAmount"), minPrice);
        };
    }

    public static Specification<DishJpaEntity> byMaxPrice(BigDecimal maxPrice) {
        return (root, query, cb) -> {
            if (maxPrice == null) return null;
            return cb.lessThanOrEqualTo(root.get("priceAmount"), maxPrice);
        };
    }
}
