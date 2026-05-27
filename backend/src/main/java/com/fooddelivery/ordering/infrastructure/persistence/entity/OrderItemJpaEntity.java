package com.fooddelivery.ordering.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemJpaEntity {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private OrderJpaEntity order;

    // Reference by ID — không cross JPA join sang restaurant context
    @Column(name = "dish_id", nullable = false)
    private UUID dishId;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "unit_price_amount", nullable = false)
    private BigDecimal unitPriceAmount;

    @Column(name = "unit_price_currency", nullable = false, length = 3)
    private String unitPriceCurrency;
}