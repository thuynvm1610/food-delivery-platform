package com.fooddelivery.identity.application.usecase;

import com.fooddelivery.identity.application.input.LoginInput;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class LoginUseCaseIntegrationTest {

    @Autowired
    LoginUseCase loginUseCase;

    @Test
    void loginCustomer3() {
        var output = loginUseCase.execute(new LoginInput("customer3@gmail.com", "12345678"));
        assertNotNull(output.getAccessToken());
    }
}
