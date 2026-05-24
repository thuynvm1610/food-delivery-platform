package com.fooddelivery.identity.application.usecase;

import com.fooddelivery.identity.infrastructure.security.AuthTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutUseCaseImpl implements LogoutUseCase {

    private final AuthTokenService authTokenService;

    @Override
    public void execute(String refreshToken) {
        if (refreshToken != null && !refreshToken.isBlank()) {
            authTokenService.revokeRefreshToken(refreshToken);
        }
    }
}
