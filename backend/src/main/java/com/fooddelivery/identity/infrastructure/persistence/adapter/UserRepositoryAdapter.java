package com.fooddelivery.identity.infrastructure.persistence.adapter;

import com.fooddelivery.identity.domain.aggregate.User;
import com.fooddelivery.identity.domain.repository.UserRepository;
import com.fooddelivery.identity.domain.value.Email;
import com.fooddelivery.identity.infrastructure.persistence.mapper.UserMapper;
import com.fooddelivery.identity.infrastructure.persistence.repository.SpringDataUserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UserRepositoryAdapter implements UserRepository {

    private final SpringDataUserJpaRepository jpaRepository;
    private final UserMapper userMapper;

    @Override
    public User save(User user) {
        var entity = userMapper.toJpaEntity(user);
        var saved = jpaRepository.save(entity);
        return userMapper.toDomain(saved);
    }

    @Override
    public Optional<User> findById(UUID id) {
        return jpaRepository.findById(id).map(userMapper::toDomain);
    }

    @Override
    public Optional<User> findByEmail(Email email) {
        return jpaRepository.findByEmail(email.getValue()).map(userMapper::toDomain);
    }

    @Override
    public boolean existsByEmail(Email email) {
        return jpaRepository.existsByEmail(email.getValue());
    }
}
