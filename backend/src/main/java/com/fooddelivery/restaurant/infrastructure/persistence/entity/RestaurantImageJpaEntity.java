package com.fooddelivery.restaurant.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "restaurant_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantImageJpaEntity {
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", nullable = false)
    private RestaurantJpaEntity restaurant;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "display_order")
    private Integer displayOrder;
}
