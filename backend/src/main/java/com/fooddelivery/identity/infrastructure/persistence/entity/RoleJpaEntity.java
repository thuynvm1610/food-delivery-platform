package com.fooddelivery.identity.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
public class RoleJpaEntity {

    @Id
    private UUID id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @OneToMany(mappedBy = "role")
    private Set<UserJpaEntity> users = new HashSet<>();

    public RoleJpaEntity(UUID id, String name) {
        this.id = id;
        this.name = name;
    }
}
