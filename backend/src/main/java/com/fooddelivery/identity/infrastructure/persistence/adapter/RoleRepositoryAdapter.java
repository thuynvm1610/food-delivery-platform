package com.fooddelivery.identity.infrastructure.persistence.adapter;

import com.fooddelivery.identity.domain.entity.Role;
import com.fooddelivery.identity.domain.repository.RoleRepository;
import com.fooddelivery.identity.infrastructure.persistence.repository.SpringDataRoleJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class RoleRepositoryAdapter implements RoleRepository {

    private final SpringDataRoleJpaRepository jpaRepository;

    @Override
    public Optional<Role> findByName(String name) {
        return jpaRepository.findByName(name)
                .map(e -> new Role(e.getId(), e.getName()));
    }
}
