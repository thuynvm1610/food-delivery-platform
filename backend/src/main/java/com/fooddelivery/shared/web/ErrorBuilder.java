package com.fooddelivery.shared.web;

import com.fooddelivery.shared.exception.ErrorCode;
import lombok.Builder;
import lombok.Getter;

public class ErrorBuilder {

    public static ErrorResponse build(ErrorCode errorCode) {
        return ErrorResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
    }

    public static ErrorResponse build(String code, String message) {
        return ErrorResponse.builder()
                .code(code)
                .message(message)
                .build();
    }
}
