package com.ssafy.eatda.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Score {
  private int userSeq;
  private int storeId;
  private int rate;
}
