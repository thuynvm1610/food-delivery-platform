package com.fooddelivery.identity.presentation.controller;

import com.fooddelivery.identity.application.input.LoginInput;
import com.fooddelivery.identity.application.input.RegisterInput;
import com.fooddelivery.identity.application.usecase.GetCurrentUserUseCase;
import com.fooddelivery.identity.application.usecase.LoginUseCase;
import com.fooddelivery.identity.application.usecase.LogoutUseCase;
import com.fooddelivery.identity.application.usecase.RefreshTokenUseCase;
import com.fooddelivery.identity.application.usecase.RegisterUseCase;
import com.fooddelivery.identity.infrastructure.security.AuthCookieService;
import com.fooddelivery.identity.infrastructure.security.AuthenticatedUser;
import com.fooddelivery.identity.presentation.request.LoginRequest;
import com.fooddelivery.identity.presentation.request.RegisterRequest;
import com.fooddelivery.identity.presentation.response.LoginResponse;
import com.fooddelivery.identity.presentation.response.RegisterResponse;
import com.fooddelivery.identity.presentation.response.SessionUserResponse;
import com.fooddelivery.shared.web.BaseResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final RegisterUseCase registerUseCase;
    private final LoginUseCase loginUseCase;
    private final RefreshTokenUseCase refreshTokenUseCase;
    private final LogoutUseCase logoutUseCase;
    private final GetCurrentUserUseCase getCurrentUserUseCase;
    private final AuthCookieService authCookieService;

    @PostMapping("/register")
    public ResponseEntity<BaseResponse<RegisterResponse>> register(
            @Valid @RequestBody RegisterRequest request) {

        var output = registerUseCase.execute(new RegisterInput(
                request.getEmail(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName(),
                request.getRoleName()
        ));

        var response = new RegisterResponse(output.getUserId(), output.getEmail(), output.getRole());
        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponse.success(response));
    }

    @PostMapping("/login")
    public ResponseEntity<BaseResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response) {

        var output = loginUseCase.execute(new LoginInput(
                request.getEmail(),
                request.getPassword()
        ));

        authCookieService.writeTokenCookies(response, output.getAccessToken(), output.getRefreshToken());

        return ResponseEntity.ok(BaseResponse.success(
                new LoginResponse(output.getUserId(), output.getEmail(), output.getRole())
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<BaseResponse<LoginResponse>> refresh(
            HttpServletRequest request,
            HttpServletResponse response) {

        String refreshToken = authCookieService.readCookie(request, AuthCookieService.REFRESH_TOKEN_COOKIE)
                .orElse(null);

        var output = refreshTokenUseCase.execute(refreshToken);
        authCookieService.writeAccessTokenCookie(response, output.getAccessToken());

        return ResponseEntity.ok(BaseResponse.success(
                new LoginResponse(output.getUserId(), output.getEmail(), output.getRole())
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<BaseResponse<Void>> logout(
            HttpServletRequest request,
            HttpServletResponse response) {

        String refreshToken = authCookieService.readCookie(request, AuthCookieService.REFRESH_TOKEN_COOKIE)
                .orElse(null);
        logoutUseCase.execute(refreshToken);
        authCookieService.clearTokenCookies(response);

        return ResponseEntity.ok(BaseResponse.success(null));
    }

    @GetMapping("/me")
    public ResponseEntity<BaseResponse<SessionUserResponse>> me(
            @AuthenticationPrincipal AuthenticatedUser principal) {

        var output = getCurrentUserUseCase.execute(principal.userId());
        return ResponseEntity.ok(BaseResponse.success(
                new SessionUserResponse(output.getUserId(), output.getEmail(), output.getRole())
        ));
    }
}
