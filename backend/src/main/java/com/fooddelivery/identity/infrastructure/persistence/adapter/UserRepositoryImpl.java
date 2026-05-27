package com.fooddelivery.identity.infrastructure.persistence.adapter;

import com.fooddelivery.identity.domain.aggregate.User;
import com.fooddelivery.identity.domain.repository.UserRepository;
import com.fooddelivery.identity.domain.value.Email;
import com.fooddelivery.identity.infrastructure.persistence.mapper.UserMapper;
import com.fooddelivery.identity.infrastructure.persistence.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final UserJpaRepository userJpaRepository;
    private final UserMapper userMapper;

    @Override
    public User save(User user) {
        var entity = userMapper.toJpaEntity(user);
        var saved = userJpaRepository.save(entity);
        return userMapper.toDomain(saved);
    }

    @Override
    public Optional<User> findById(UUID id) {
        return userJpaRepository.findById(id).map(userMapper::toDomain);
    }

    @Override
    public Optional<User> findByEmail(Email email) {
        return userJpaRepository.findByEmail(email.getValue()).map(userMapper::toDomain);
    }

    @Override
    public boolean existsByEmail(Email email) {
        return userJpaRepository.existsByEmail(email.getValue());
    }
}
