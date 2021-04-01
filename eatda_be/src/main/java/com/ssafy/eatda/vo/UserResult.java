package com.ssafy.eatda.vo;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResult {

  private String token;
  private int seq;
  private String name;
  private String profileUrl;
  private List<Profile> friends;

}
