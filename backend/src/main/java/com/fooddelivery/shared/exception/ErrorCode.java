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
    INVALID_REFRESH_TOKEN("IDT_004", "Refresh token is invalid or expired"),
    REDIS_UNAVAILABLE("IDT_005", "Redis is unavailable. Start Redis before login/refresh"),
    REGISTRATION_ROLE_NOT_ALLOWED("IDT_006", "Only customer, restaurant, and driver roles can register"),

    // Domain specific errors
    RESTAURANT_CLOSED("REST_001", "Restaurant is currently closed"),
    RESTAURANT_NOT_FOUND_BY_OWNER("RES_001", "Restaurant not found for owner"),
    ITEM_OUT_OF_STOCK("ORD_001", "Item is out of stock"),
    INSUFFICIENT_WALLET_BALANCE("WAL_001", "Driver wallet balance is insufficient"),
    WITHIN_OPEN_HOUR("REST_002", "Không thể ngừng bán khi đang trong giờ làm!");

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
