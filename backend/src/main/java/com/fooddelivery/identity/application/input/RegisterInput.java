package com.fooddelivery.identity.application.input;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RegisterInput {
    private final String email;
    private final String password;
    private final String firstName;
    private final String lastName;
    private final String roleName; // ROLE_CUSTOMER, ROLE_DRIVER, ROLE_RESTAURANT
}
