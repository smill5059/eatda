package com.ssafy.eatda.vo;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommInfo {

  private List<String> reviewInfo;
  private float latitude;
  private float longitude;
}
