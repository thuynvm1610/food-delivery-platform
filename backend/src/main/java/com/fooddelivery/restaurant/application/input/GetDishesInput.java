package com.fooddelivery.restaurant.application.input;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GetDishesInput {
    private List<String> categoryIds;
    private String search;
    private Integer page;
    private Integer limit;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}
