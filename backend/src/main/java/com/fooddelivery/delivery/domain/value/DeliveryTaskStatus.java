package com.fooddelivery.delivery.domain.value;

public enum DeliveryTaskStatus {
    ASSIGNED,
    ARRIVED_AT_RESTAURANT,
    PICKED_UP,
    DELIVERING,
    DELIVERED;

    public boolean isCompleted() {
        return this == DELIVERED;
    }

    public boolean isActive() {
        return this == ASSIGNED
                || this == ARRIVED_AT_RESTAURANT
                || this == PICKED_UP
                || this == DELIVERING;
    }
}