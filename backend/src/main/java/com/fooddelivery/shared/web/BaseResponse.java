package com.fooddelivery.shared.web;

import com.fooddelivery.shared.exception.ErrorCode;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BaseResponse<T> {
    private final boolean success;
    private final String code;
    private final String message;
    private final T data;

    public static <T> BaseResponse<T> success(T data) {
        return BaseResponse.<T>builder()
                .success(true)
                .code("200")
                .message("Success")
                .data(data)
                .build();
    }

    public static <T> BaseResponse<T> success() {
        return success(null);
    }
}
