package com.fooddelivery.identity.infrastructure.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenStore {

    private static final String KEY_PREFIX = "auth:refresh:";

    private final StringRedisTemplate redisTemplate;

    @Value("${app.auth.refresh-expiration-days}")
    private int refreshExpirationDays;

    public void save(String refreshToken, UUID userId) {
        redisTemplate.opsForValue().set(
                key(refreshToken),
                userId.toString(),
                Duration.ofDays(refreshExpirationDays)
        );
    }

    public Optional<UUID> findUserId(String refreshToken) {
        String userId = redisTemplate.opsForValue().get(key(refreshToken));
        if (userId == null || userId.isBlank()) {
            return Optional.empty();
        }
        return Optional.of(UUID.fromString(userId));
    }

    public void delete(String refreshToken) {
        redisTemplate.delete(key(refreshToken));
    }

    private String key(String refreshToken) {
        return KEY_PREFIX + refreshToken;
    }
}
