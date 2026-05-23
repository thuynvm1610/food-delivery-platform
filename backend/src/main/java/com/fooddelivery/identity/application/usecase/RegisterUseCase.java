package com.fooddelivery.identity.application.usecase;

import com.fooddelivery.identity.application.input.RegisterInput;
import com.fooddelivery.identity.application.output.RegisterOutput;

public interface RegisterUseCase {
    RegisterOutput execute(RegisterInput input);
}
