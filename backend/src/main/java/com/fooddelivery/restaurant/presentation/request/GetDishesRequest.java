package com.fooddelivery.restaurant.presentation.request;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class GetDishesRequest {
    private List<String> categoryIds;
    private String search;
    private Integer page;
    private Integer limit;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}
