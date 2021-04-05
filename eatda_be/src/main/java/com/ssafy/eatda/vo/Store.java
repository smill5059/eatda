package com.ssafy.eatda.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Store {
  private String storeId;
  private String storeName;
  private String storeAddress;
  private double storeLatitude;
  private double storeLongitude;
  private float avgRate;
  private int reviewCount;
}
