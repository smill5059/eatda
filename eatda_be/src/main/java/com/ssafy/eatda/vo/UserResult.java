package com.ssafy.eatda.vo;

import java.util.List;
import org.bson.types.ObjectId;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.eatda.util.CustomObjectIdSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResult {

  private String token;
  @JsonSerialize(using = CustomObjectIdSerializer.class)
  private ObjectId id;
  private int seq;
  private String name;
  private String profileUrl;
  private List<Profile> friends;

}
