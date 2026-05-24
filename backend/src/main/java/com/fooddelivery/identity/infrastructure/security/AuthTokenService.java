package com.fooddelivery.identity.infrastructure.security;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthTokenService {

    private final JwtService jwtService;
    private final RefreshTokenStore refreshTokenStore;

    public AuthTokens issueTokens(UUID userId, String role) {
        String accessToken = jwtService.generateAccessToken(userId, role);
        String refreshToken = UUID.randomUUID().toString();
        refreshTokenStore.save(refreshToken, userId);
        return new AuthTokens(accessToken, refreshToken);
    }

    public AuthTokens rotateRefreshToken(String refreshToken, UUID userId, String role) {
        refreshTokenStore.delete(refreshToken);
        return issueTokens(userId, role);
    }

    public void revokeRefreshToken(String refreshToken) {
        refreshTokenStore.delete(refreshToken);
    }

    public record AuthTokens(String accessToken, String refreshToken) {
    }
}
