package com.fooddelivery.identity.presentation.controller;

import com.fooddelivery.identity.application.input.LoginInput;
import com.fooddelivery.identity.application.input.RegisterInput;
import com.fooddelivery.identity.application.usecase.LoginUseCase;
import com.fooddelivery.identity.application.usecase.RegisterUseCase;
import com.fooddelivery.identity.presentation.request.LoginRequest;
import com.fooddelivery.identity.presentation.request.RegisterRequest;
import com.fooddelivery.identity.presentation.response.LoginResponse;
import com.fooddelivery.identity.presentation.response.RegisterResponse;
import com.fooddelivery.shared.web.BaseResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final RegisterUseCase registerUseCase;
    private final LoginUseCase loginUseCase;

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
            @Valid @RequestBody LoginRequest request) {

        var output = loginUseCase.execute(new LoginInput(
                request.getEmail(),
                request.getPassword()
        ));

        var response = new LoginResponse(
                output.getUserId(),
                output.getEmail(),
                output.getRoles(),
                output.getAccessToken()
        );
        return ResponseEntity.ok(BaseResponse.success(response));
    }
}
