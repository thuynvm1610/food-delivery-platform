package com.fooddelivery.wallet.domain.aggregate;

import com.fooddelivery.shared.domain.AggregateRoot;
import com.fooddelivery.shared.exception.DomainException;
import com.fooddelivery.shared.exception.ErrorCode;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
public class Wallet implements AggregateRoot<UUID> {
    private final UUID id;
    private final UUID userId;
    private BigDecimal balance;
    private final String currency;

    public Wallet(UUID id, UUID userId, BigDecimal balance, String currency) {
        this.id = id;
        this.userId = userId;
        this.balance = balance;
        this.currency = currency;
    }

    public void addFunds(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new DomainException(ErrorCode.INVALID_REQUEST, "Amount must be positive");
        }
        this.balance = this.balance.add(amount);
    }

    public void deductFunds(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new DomainException(ErrorCode.INVALID_REQUEST, "Amount must be positive");
        }
        if (this.balance.compareTo(amount) < 0) {
            throw new DomainException(ErrorCode.INSUFFICIENT_WALLET_BALANCE);
        }
        this.balance = this.balance.subtract(amount);
    }

    public boolean canAcceptCodOrder(BigDecimal foodAmount) {
        return this.balance.compareTo(foodAmount) >= 0;
    }
}
