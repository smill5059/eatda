package com.ssafy.eatda.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Store {
    private int storeId;
    private String storeName;
    private String storeAddress;
    private float storeLatitude;
    private float storeLongitude;
}
