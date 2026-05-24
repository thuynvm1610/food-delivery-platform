package com.fooddelivery.identity.infrastructure.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestPropertySource(properties = {
        "app.jwt.secret=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970",
        "app.jwt.access-expiration-ms=900000"
})
class JwtServiceTest {

    @Autowired
    JwtService jwtService;

    @Test
    void generateAccessToken() {
        String token = jwtService.generateAccessToken(UUID.randomUUID(), "ROLE_CUSTOMER");
        assertNotNull(token);
    }
}
