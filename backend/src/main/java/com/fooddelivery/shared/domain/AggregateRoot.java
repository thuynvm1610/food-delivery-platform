package com.fooddelivery.shared.domain;

import java.io.Serializable;

public interface AggregateRoot<ID extends Serializable> extends BaseEntity<ID> {
}
