package com.fooddelivery.identity.presentation.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class RegisterResponse {
    private final UUID userId;
    private final String email;
    private final String role;
}
