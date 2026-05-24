package com.fooddelivery.identity.infrastructure.persistence.mapper;

import com.fooddelivery.identity.domain.aggregate.User;
import com.fooddelivery.identity.domain.entity.Role;
import com.fooddelivery.identity.domain.value.Email;
import com.fooddelivery.identity.infrastructure.persistence.entity.RoleJpaEntity;
import com.fooddelivery.identity.infrastructure.persistence.entity.UserJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toDomain(UserJpaEntity entity) {
        RoleJpaEntity roleEntity = entity.getRole();
        Role role = roleEntity != null
                ? new Role(roleEntity.getId(), roleEntity.getName())
                : null;

        return new User(
                entity.getId(),
                new Email(entity.getEmail()),
                entity.getPasswordHash(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getAvatarUrl(),
                entity.getCreatedAt(),
                role
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

        if (domain.getRole() != null) {
            entity.setRole(new RoleJpaEntity(domain.getRole().getId(), domain.getRole().getName()));
        }

        return entity;
    }
}
