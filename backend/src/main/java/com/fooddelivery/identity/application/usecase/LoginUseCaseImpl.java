package com.fooddelivery.identity.application.usecase;

import com.fooddelivery.identity.application.input.LoginInput;
import com.fooddelivery.identity.application.output.LoginOutput;
import com.fooddelivery.identity.infrastructure.security.AuthTokenService;
import com.fooddelivery.identity.infrastructure.security.AuthUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LoginUseCaseImpl implements LoginUseCase {

    private final AuthenticationManager authenticationManager;
    private final AuthTokenService authTokenService;

    @Override
    @Transactional(readOnly = true)
    public LoginOutput execute(LoginInput input) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword())
        );

        AuthUserDetails userDetails = (AuthUserDetails) authentication.getPrincipal();
        var tokens = authTokenService.issueTokens(userDetails.getUserId(), userDetails.getRole());

        return new LoginOutput(
                userDetails.getUserId(),
                userDetails.getEmail(),
                userDetails.getRole(),
                tokens.accessToken(),
                tokens.refreshToken()
        );
    }
}
