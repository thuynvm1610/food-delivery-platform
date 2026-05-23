package com.fooddelivery.shared.web;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorResponse {
    private final boolean success = false;
    private final String code;
    private final String message;
}
