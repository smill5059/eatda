package com.ssafy.eatda.vo;

import java.util.List;
import org.bson.types.ObjectId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  private ObjectId id;
  private int seq;
  private String name;
  private String profileUrl;
  private String reviewId;
  private List<ObjectId> friends;
  private List<ObjectId> schedules;
}
