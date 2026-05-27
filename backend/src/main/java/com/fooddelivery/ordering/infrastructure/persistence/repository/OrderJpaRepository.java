package com.fooddelivery.ordering.infrastructure.persistence.repository;

import com.fooddelivery.ordering.infrastructure.persistence.entity.OrderJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface OrderJpaRepository extends JpaRepository<OrderJpaEntity, UUID> {

    @Query("""
            SELECT o.status, COUNT(o)
            FROM OrderJpaEntity o
            WHERE o.restaurantId = :restaurantId
            GROUP BY o.status
            """)
    List<Object[]> countOrdersByStatus(@Param("restaurantId") UUID restaurantId);

    @Query("""
            SELECT COALESCE(SUM(o.totalAmount), 0)
            FROM OrderJpaEntity o
            WHERE o.restaurantId = :restaurantId
              AND o.status = 'CUSTOMER_CONFIRMED'
            """)
    double getTotalRevenue(@Param("restaurantId") UUID restaurantId);

    @Query("""
            SELECT COALESCE(SUM(o.totalAmount), 0)
            FROM OrderJpaEntity o
            WHERE o.restaurantId = :restaurantId
              AND CAST(o.createdAt AS date) = CURRENT_DATE
              AND o.status = 'CUSTOMER_CONFIRMED'
            """)
    double getTodayRevenue(@Param("restaurantId") UUID restaurantId);

    @Query("""
            SELECT COALESCE(SUM(o.totalAmount), 0)
            FROM OrderJpaEntity o
            WHERE o.restaurantId = :restaurantId
              AND YEAR(o.createdAt) = YEAR(CURRENT_DATE)
              AND MONTH(o.createdAt) = MONTH(CURRENT_DATE)
              AND o.status = 'CUSTOMER_CONFIRMED'
            """)
    double getMonthlyRevenue(@Param("restaurantId") UUID restaurantId);

    @Query("""
            SELECT oi.dishId, d.name, SUM(oi.quantity), SUM(oi.unitPriceAmount * oi.quantity)
            FROM OrderJpaEntity o
            JOIN o.items oi
            JOIN DishJpaEntity d ON d.id = oi.dishId
            WHERE o.restaurantId = :restaurantId
              AND o.status NOT IN ('CANCELLED_BY_CUSTOMER', 'CANCELLED_BY_RESTAURANT',
                                   'CANCELLED_BY_SYSTEM', 'PAYMENT_FAILED',
                                   'NO_DRIVER_AVAILABLE', 'DELIVERY_FAILED')
            GROUP BY oi.dishId, d.name
            ORDER BY SUM(oi.unitPriceAmount * oi.quantity) DESC
            LIMIT :limit
            """)
    List<Object[]> getTopDishesByRevenue(@Param("restaurantId") UUID restaurantId,
                                         @Param("limit") int limit);
}