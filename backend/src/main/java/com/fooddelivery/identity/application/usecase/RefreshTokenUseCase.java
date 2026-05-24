package com.fooddelivery.identity.application.usecase;

import com.fooddelivery.identity.application.output.LoginOutput;

public interface RefreshTokenUseCase {
    LoginOutput execute(String refreshToken);
}
