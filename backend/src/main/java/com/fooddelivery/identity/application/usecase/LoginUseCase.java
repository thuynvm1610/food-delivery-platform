package com.fooddelivery.identity.application.usecase;

import com.fooddelivery.identity.application.input.LoginInput;
import com.fooddelivery.identity.application.output.LoginOutput;

public interface LoginUseCase {
    LoginOutput execute(LoginInput input);
}
