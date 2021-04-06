package com.ssafy.eatda.vo;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.eatda.util.CustomObjectIdSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaxStoreId {
  @JsonSerialize(using = CustomObjectIdSerializer.class)
  @Id
  private ObjectId id;
  private int seq;
  private int maxValue;
  private int reviewIdMaxValue;

}
