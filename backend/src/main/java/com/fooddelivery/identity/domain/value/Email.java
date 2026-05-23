package com.fooddelivery.identity.domain.value;

import com.fooddelivery.shared.domain.ValueObject;
import com.fooddelivery.shared.exception.DomainException;
import com.fooddelivery.shared.exception.ErrorCode;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class Email implements ValueObject {
    private final String value;

    public Email(String value) {
        if (value == null || !value.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new DomainException(ErrorCode.INVALID_REQUEST, "Invalid email format");
        }
        this.value = value;
    }
}
