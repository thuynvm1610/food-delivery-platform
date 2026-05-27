package com.fooddelivery.ordering.domain.value;

public enum OrderStatus {
    PENDING,
    CONFIRMED,
    PREPARING,
    READY_FOR_PICKUP,
    PICKED_UP,
    DELIVERING,
    DELIVERED,
    CUSTOMER_CONFIRMED,
    CANCELLED_BY_CUSTOMER,
    CANCELLED_BY_RESTAURANT,
    CANCELLED_BY_SYSTEM,
    PAYMENT_FAILED,
    NO_DRIVER_AVAILABLE,
    DELIVERY_FAILED;

    public boolean isCancelled() {
        return this == CANCELLED_BY_CUSTOMER
                || this == CANCELLED_BY_RESTAURANT
                || this == CANCELLED_BY_SYSTEM
                || this == PAYMENT_FAILED
                || this == NO_DRIVER_AVAILABLE
                || this == DELIVERY_FAILED;
    }

    public boolean isInProgress() {
        return this == CONFIRMED
                || this == PREPARING
                || this == READY_FOR_PICKUP
                || this == PICKED_UP
                || this == DELIVERING;
    }

    public boolean canBeCancelledByCustomer() {
        return this == PENDING;
    }

    public boolean canBeCancelledByRestaurant() {
        return this == PENDING || this == CONFIRMED;
    }
}