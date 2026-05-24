package com.fooddelivery.identity.application.usecase;

import com.fooddelivery.identity.application.output.SessionUserOutput;

import java.util.UUID;

public interface GetCurrentUserUseCase {
    SessionUserOutput execute(UUID userId);
}
