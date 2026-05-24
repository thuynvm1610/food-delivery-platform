package com.fooddelivery.identity.application.output;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class LoginOutput {
    private final UUID userId;
    private final String email;
    private final String role;
    private final String accessToken;
    private final String refreshToken;
}
