package com.fooddelivery.identity.presentation.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private final UUID userId;
    private final String email;
    private final Set<String> roles;
    private final String accessToken;
    private final String tokenType = "Bearer";
}
