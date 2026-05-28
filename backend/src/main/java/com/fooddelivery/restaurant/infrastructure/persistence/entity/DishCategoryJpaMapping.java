package com.fooddelivery.restaurant.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "dish_category_mappings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DishCategoryJpaMapping {

    @EmbeddedId
    private DishCategoryMappingId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("dishId")
    @JoinColumn(name = "dish_id")
    private DishJpaEntity dish;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("categoryId")
    @JoinColumn(name = "category_id")
    private DishCategoryJpaEntity category;
}