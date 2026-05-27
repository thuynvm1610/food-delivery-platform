package com.fooddelivery.identity.application.usecase;

import com.fooddelivery.identity.application.input.RegisterInput;
import com.fooddelivery.identity.application.output.RegisterOutput;
import com.fooddelivery.identity.domain.aggregate.User;
import com.fooddelivery.identity.domain.entity.Role;
import com.fooddelivery.identity.domain.repository.RoleRepository;
import com.fooddelivery.identity.domain.repository.UserRepository;
import com.fooddelivery.identity.domain.value.Email;
import com.fooddelivery.shared.exception.DomainException;
import com.fooddelivery.shared.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RegisterUseCaseImpl implements RegisterUseCase {

    private static final Set<String> ALLOWED_REGISTER_ROLES = Set.of(
            "ROLE_CUSTOMER",
            "ROLE_RESTAURANT",
            "ROLE_DRIVER"
    );

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public RegisterOutput execute(RegisterInput input) {
        Email email = new Email(input.getEmail());

        // 1. Check email already exists
        if (userRepository.existsByEmail(email)) {
            throw new DomainException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        if (!ALLOWED_REGISTER_ROLES.contains(input.getRoleName())) {
            throw new DomainException(ErrorCode.REGISTRATION_ROLE_NOT_ALLOWED);
        }

        // 2. Find role
        Role role = roleRepository.findByName(input.getRoleName())
                .orElseThrow(() -> new DomainException(ErrorCode.ROLE_NOT_FOUND));

        // 3. Create User aggregate (Pure Domain, no framework involved)
        User user = new User(
                UUID.randomUUID(),
                email,
                passwordEncoder.encode(input.getPassword()),
                input.getFirstName(),
                input.getLastName()
        );
        user.assignRole(role);

        // 4. Persist via domain repository (Port)
        User saved = userRepository.save(user);

        return new RegisterOutput(saved.getId(), saved.getEmail().getValue(), role.getName());
    }
}
