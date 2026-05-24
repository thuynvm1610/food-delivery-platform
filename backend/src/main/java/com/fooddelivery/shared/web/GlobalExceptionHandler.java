package com.fooddelivery.shared.web;

import com.fooddelivery.shared.exception.DomainException;
import com.fooddelivery.shared.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DomainException.class)
    public ResponseEntity<ErrorResponse> handleDomainException(DomainException ex) {
        ErrorResponse errorResponse = ErrorBuilder.build(ex.getErrorCode());
        HttpStatus status = switch (ex.getErrorCode()) {
            case UNAUTHORIZED, INVALID_CREDENTIALS, INVALID_REFRESH_TOKEN -> HttpStatus.UNAUTHORIZED;
            case FORBIDDEN -> HttpStatus.FORBIDDEN;
            default -> HttpStatus.BAD_REQUEST;
        };
        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler({BadCredentialsException.class, UsernameNotFoundException.class})
    public ResponseEntity<ErrorResponse> handleBadCredentials(Exception ex) {
        ErrorResponse errorResponse = ErrorBuilder.build(ErrorCode.INVALID_CREDENTIALS);
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .findFirst()
                .orElse(ErrorCode.INVALID_REQUEST.getMessage());
        
        ErrorResponse errorResponse = ErrorBuilder.build(ErrorCode.INVALID_REQUEST.getCode(), message);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RedisConnectionFailureException.class)
    public ResponseEntity<ErrorResponse> handleRedisConnectionFailure(RedisConnectionFailureException ex) {
        log.error("Redis connection failed", ex);
        ErrorResponse errorResponse = ErrorBuilder.build(ErrorCode.REDIS_UNAVAILABLE);
        return new ResponseEntity<>(errorResponse, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        log.error("Unhandled exception", ex);
        ErrorResponse errorResponse = ErrorBuilder.build(ErrorCode.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
