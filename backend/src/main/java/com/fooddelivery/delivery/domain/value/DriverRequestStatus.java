package com.fooddelivery.delivery.domain.value;

public enum DriverRequestStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    EXPIRED;

    public boolean isResolved() {
        return this == ACCEPTED
                || this == REJECTED
                || this == EXPIRED;
    }
}