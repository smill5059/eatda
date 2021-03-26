package com.ssafy.eatda.vo;

import org.bson.types.ObjectId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
  private ObjectId id;
  private int userSeq;
  private String userName;
  private String userProfileUrl;
}
