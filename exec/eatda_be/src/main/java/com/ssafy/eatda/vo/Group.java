package com.ssafy.eatda.vo;

import java.util.ArrayList;
import org.bson.types.ObjectId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Group {
  private ObjectId id;
  private String groupId;
  private int reviewId;
  private ArrayList<Integer> members;
  private int cnt;
}
