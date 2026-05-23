package com.fooddelivery.identity.infrastructure.persistence.mapper;

import com.fooddelivery.identity.domain.aggregate.User;
import com.fooddelivery.identity.domain.entity.Role;
import com.fooddelivery.identity.domain.value.Email;
import com.fooddelivery.identity.infrastructure.persistence.entity.RoleJpaEntity;
import com.fooddelivery.identity.infrastructure.persistence.entity.UserJpaEntity;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    public User toDomain(UserJpaEntity entity) {
        Set<Role> roles = entity.getRoles().stream()
                .map(r -> new Role(r.getId(), r.getName()))
                .collect(Collectors.toSet());

        return new User(
                entity.getId(),
                new Email(entity.getEmail()),
                entity.getPasswordHash(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getAvatarUrl(),
                entity.getCreatedAt(),
                roles
        );
    }

    public UserJpaEntity toJpaEntity(User domain) {
        UserJpaEntity entity = new UserJpaEntity();
        entity.setId(domain.getId());
        entity.setEmail(domain.getEmail().getValue());
        entity.setPasswordHash(domain.getPasswordHash());
        entity.setFirstName(domain.getFirstName());
        entity.setLastName(domain.getLastName());
        entity.setAvatarUrl(domain.getAvatarUrl());
        entity.setCreatedAt(domain.getCreatedAt());

        Set<RoleJpaEntity> roleEntities = domain.getRoles().stream()
                .map(r -> new RoleJpaEntity(r.getId(), r.getName()))
                .collect(Collectors.toSet());
        entity.setRoles(roleEntities);

        return entity;
    }
}
