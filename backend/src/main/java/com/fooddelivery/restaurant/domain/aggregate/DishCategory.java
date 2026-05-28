package com.fooddelivery.restaurant.domain.aggregate;

import com.fooddelivery.shared.domain.AggregateRoot;
import lombok.Getter;

import java.util.UUID;

@Getter
public class DishCategory implements AggregateRoot<UUID> {
    private final UUID id;
    private String name;
    private String description;

    public DishCategory(UUID id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    @Override
    public UUID getId() {
        return id;
    }
}
