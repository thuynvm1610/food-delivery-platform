package com.fooddelivery.identity.application.usecase;

import com.fooddelivery.identity.application.input.LoginInput;
import com.fooddelivery.identity.application.output.LoginOutput;
import com.fooddelivery.identity.domain.aggregate.User;
import com.fooddelivery.identity.domain.repository.UserRepository;
import com.fooddelivery.identity.domain.value.Email;
import com.fooddelivery.identity.infrastructure.security.JwtService;
import com.fooddelivery.shared.exception.DomainException;
import com.fooddelivery.shared.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoginUseCaseImpl implements LoginUseCase {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public LoginOutput execute(LoginInput input) {
        // 1. Find user by email
        User user = userRepository.findByEmail(new Email(input.getEmail()))
                .orElseThrow(() -> new DomainException(ErrorCode.INVALID_CREDENTIALS));

        // 2. Verify password
        if (!passwordEncoder.matches(input.getPassword(), user.getPasswordHash())) {
            throw new DomainException(ErrorCode.INVALID_CREDENTIALS);
        }

        // 3. Generate JWT
        Set<String> roleNames = user.getRoles().stream()
                .map(r -> r.getName())
                .collect(Collectors.toSet());

        String token = jwtService.generateToken(user.getId().toString(), roleNames);

        return new LoginOutput(user.getId(), user.getEmail().getValue(), roleNames, token);
    }
}
