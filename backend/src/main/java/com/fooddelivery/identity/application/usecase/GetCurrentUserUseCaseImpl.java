package com.fooddelivery.identity.application.usecase;

import com.fooddelivery.identity.application.output.SessionUserOutput;
import com.fooddelivery.identity.domain.repository.UserRepository;
import com.fooddelivery.shared.exception.DomainException;
import com.fooddelivery.shared.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetCurrentUserUseCaseImpl implements GetCurrentUserUseCase {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public SessionUserOutput execute(UUID userId) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new DomainException(ErrorCode.UNAUTHORIZED));

        return new SessionUserOutput(
                user.getId(),
                user.getEmail().getValue(),
                user.getRole().getName()
        );
    }
}
