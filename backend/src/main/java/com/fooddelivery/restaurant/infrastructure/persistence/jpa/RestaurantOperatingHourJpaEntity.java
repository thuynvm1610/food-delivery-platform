package com.fooddelivery.restaurant.infrastructure.persistence.jpa;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "restaurant_operating_hours", uniqueConstraints = @UniqueConstraint(columnNames = {"restaurant_id", "day_of_week"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantOperatingHourJpaEntity {
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", nullable = false)
    private RestaurantJpaEntity restaurant;

    @Column(name = "day_of_week", nullable = false)
    private Integer dayOfWeek; // 2-8

    @Column(name = "open_hour", nullable = false)
    private Integer openHour;

    @Column(name = "close_hour", nullable = false)
    private Integer closeHour;
}
