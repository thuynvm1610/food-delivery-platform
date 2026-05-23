package com.fooddelivery.identity.domain.repository;

import com.fooddelivery.identity.domain.aggregate.User;
import com.fooddelivery.identity.domain.value.Email;

import java.util.Optional;
import java.util.UUID;

// Domain Port - Pure Java Interface, no Spring or JPA imports
public interface UserRepository {
    User save(User user);
    Optional<User> findById(UUID id);
    Optional<User> findByEmail(Email email);
    boolean existsByEmail(Email email);
}
