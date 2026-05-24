package com.fooddelivery.identity.application.usecase;

public interface LogoutUseCase {
    void execute(String refreshToken);
}
