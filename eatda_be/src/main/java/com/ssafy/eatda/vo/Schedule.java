package com.ssafy.eatda.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.eatda.util.CustomObjectIdSerializer;
import java.util.Date;
import java.util.List;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.bson.types.ObjectId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
  @JsonSerialize(using = CustomObjectIdSerializer.class)
  @Id
  private ObjectId id;
  private String title;

  @Temporal(TemporalType.TIMESTAMP)
  private Date meetDate;

  private List<Store> stores;
  private List<ObjectId> participants;
  private List<String> tags;
  private List<Score> scores;
  private List<Comment> comments;
  private List<Img> imgs;

  private boolean isCompleted;
}
