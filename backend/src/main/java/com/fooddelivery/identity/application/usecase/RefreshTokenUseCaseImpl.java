package com.fooddelivery.identity.application.usecase;

import com.fooddelivery.identity.application.output.LoginOutput;
import com.fooddelivery.identity.domain.repository.UserRepository;
import com.fooddelivery.identity.infrastructure.security.AuthTokenService;
import com.fooddelivery.identity.infrastructure.security.RefreshTokenStore;
import com.fooddelivery.shared.exception.DomainException;
import com.fooddelivery.shared.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RefreshTokenUseCaseImpl implements RefreshTokenUseCase {

    private final RefreshTokenStore refreshTokenStore;
    private final UserRepository userRepository;
    private final AuthTokenService authTokenService;

    @Override
    @Transactional(readOnly = true)
    public LoginOutput execute(String refreshToken) {
        var userId = refreshTokenStore.findUserId(refreshToken)
                .orElseThrow(() -> new DomainException(ErrorCode.INVALID_REFRESH_TOKEN));

        var user = userRepository.findById(userId)
                .orElseThrow(() -> new DomainException(ErrorCode.INVALID_REFRESH_TOKEN));

        var roleName = user.getRole().getName();
        var tokens = authTokenService.rotateRefreshToken(refreshToken, userId, roleName);

        return new LoginOutput(
                user.getId(),
                user.getEmail().getValue(),
                roleName,
                tokens.accessToken(),
                tokens.refreshToken()
        );
    }
}
