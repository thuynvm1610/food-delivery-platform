package com.fooddelivery.identity.domain.repository;

import com.fooddelivery.identity.domain.entity.Role;

import java.util.Optional;

// Domain Port
public interface RoleRepository {
    Optional<Role> findByName(String name);
}
