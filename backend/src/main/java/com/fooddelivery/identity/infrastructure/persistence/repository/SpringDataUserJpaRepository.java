package com.fooddelivery.identity.infrastructure.persistence.repository;

import com.fooddelivery.identity.infrastructure.persistence.entity.UserJpaEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SpringDataUserJpaRepository extends JpaRepository<UserJpaEntity, UUID> {

    @EntityGraph(attributePaths = "role")
    Optional<UserJpaEntity> findById(UUID id);

    @EntityGraph(attributePaths = "role")
    Optional<UserJpaEntity> findByEmail(String email);

    boolean existsByEmail(String email);
}
