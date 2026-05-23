package com.fooddelivery.identity.domain.entity;

import com.fooddelivery.shared.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class Role implements BaseEntity<UUID> {
    private final UUID id;
    private final String name; // ROLE_CUSTOMER, ROLE_DRIVER, ROLE_RESTAURANT, ROLE_ADMIN
}
