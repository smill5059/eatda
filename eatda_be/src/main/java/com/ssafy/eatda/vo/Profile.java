package com.ssafy.eatda.vo;

import org.bson.types.ObjectId;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.eatda.util.CustomObjectIdSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
  @JsonSerialize(using = CustomObjectIdSerializer.class)
  private ObjectId id;
  private int userSeq;
  private int reviewId;
  private String userName;
  private String userProfileUrl;
}
