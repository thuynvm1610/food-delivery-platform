package com.fooddelivery.shared.domain;

import java.io.Serializable;

public interface BaseEntity<ID extends Serializable> {
    ID getId();
}
