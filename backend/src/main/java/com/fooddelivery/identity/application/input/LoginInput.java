package com.fooddelivery.identity.application.input;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginInput {
    private final String email;
    private final String password;
}
