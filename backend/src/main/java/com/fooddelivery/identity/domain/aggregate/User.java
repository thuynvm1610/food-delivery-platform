package com.fooddelivery.identity.domain.aggregate;

import com.fooddelivery.identity.domain.entity.Role;
import com.fooddelivery.identity.domain.value.Email;
import com.fooddelivery.shared.domain.AggregateRoot;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
public class User implements AggregateRoot<UUID> {
    private final UUID id;
    private Email email;
    private String passwordHash;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private final LocalDateTime createdAt;
    private Set<Role> roles;

    // Constructor for creating a brand-new User (from Application Layer)
    public User(UUID id, Email email, String passwordHash,
                String firstName, String lastName) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = null;
        this.createdAt = LocalDateTime.now();
        this.roles = new HashSet<>();
    }

    // Full constructor for reconstructing from DB (from Infrastructure Layer)
    public User(UUID id, Email email, String passwordHash,
                String firstName, String lastName,
                String avatarUrl, LocalDateTime createdAt, Set<Role> roles) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = avatarUrl;
        this.createdAt = createdAt;
        this.roles = roles != null ? roles : new HashSet<>();
    }

    // Domain behaviors
    public void addRole(Role role) {
        this.roles.add(role);
    }

    public void changePassword(String newPasswordHash) {
        this.passwordHash = newPasswordHash;
    }

    public boolean hasRole(String roleName) {
        return this.roles.stream().anyMatch(r -> r.getName().equals(roleName));
    }
}
