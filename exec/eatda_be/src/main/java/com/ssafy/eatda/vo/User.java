package com.ssafy.eatda.vo;

import java.util.List;
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
public class User {
  @JsonSerialize(using = CustomObjectIdSerializer.class)
  @Id
  private ObjectId id;
  private int seq;
  private String name;
  private String profileUrl;
  private int reviewId;
  private List<ObjectId> friends;
  private List<ObjectId> schedules;
}
