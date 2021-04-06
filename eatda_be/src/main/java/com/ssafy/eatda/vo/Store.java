package com.ssafy.eatda.vo;

import java.util.Map;
import javax.persistence.Id;
import org.bson.types.ObjectId;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.eatda.util.CustomObjectIdSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Store {
  @Id
  @JsonSerialize(using = CustomObjectIdSerializer.class)
  private ObjectId id;
  private String storeId;
  private String storeName;
  private String storeAddress;
  private double storeLatitude;
  private double storeLongitude;
  private float avgRate;
  private int reviewCount;
  private Map<String, Integer> reviewers;
}
