package com.fooddelivery.restaurant.domain.value;

public enum RestaurantStatus {
    OPEN,
    CLOSED;

    public boolean isAcceptingOrders() {
        return this == OPEN;
    }
}