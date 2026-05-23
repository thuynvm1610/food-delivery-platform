package com.fooddelivery.shared.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    // General Errors
    INTERNAL_SERVER_ERROR("ERR_500", "Internal server error"),
    INVALID_REQUEST("ERR_400", "Invalid request format or parameters"),
    UNAUTHORIZED("ERR_401", "Unauthorized access"),
    FORBIDDEN("ERR_403", "Forbidden access"),

    // Identity Errors
    EMAIL_ALREADY_EXISTS("IDT_001", "Email already exists"),
    INVALID_CREDENTIALS("IDT_002", "Invalid email or password"),
    ROLE_NOT_FOUND("IDT_003", "Role not found"),

    // Domain specific errors
    RESTAURANT_CLOSED("REST_001", "Restaurant is currently closed"),
    ITEM_OUT_OF_STOCK("ORD_001", "Item is out of stock"),
    INSUFFICIENT_WALLET_BALANCE("WAL_001", "Driver wallet balance is insufficient");

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
