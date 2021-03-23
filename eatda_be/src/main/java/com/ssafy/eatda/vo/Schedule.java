package com.ssafy.eatda.vo;

import java.sql.Date;
import java.util.List;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.bson.types.ObjectId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
  private ObjectId seq;
  private String title;

  @Temporal(TemporalType.TIMESTAMP)
  private Date meetDate;

  private List<Store> stores;
  private List<Friend> participants;
  private List<String> tags;
  private List<Score> scores;
  private List<Comment> comments;
  private List<Img> imgs;

  private boolean isCompleted;
}
