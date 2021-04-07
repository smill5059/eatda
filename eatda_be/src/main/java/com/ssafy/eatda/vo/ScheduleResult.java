package com.ssafy.eatda.vo;

import java.util.Date;
import java.util.List;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.bson.types.ObjectId;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.eatda.util.CustomObjectIdSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResult {
  @JsonSerialize(using = CustomObjectIdSerializer.class)
  @Id
  private ObjectId id;
  private String title;

  @Temporal(TemporalType.TIMESTAMP)
  private Date meetDate;

  private List<Store> stores;
  private List<Profile> participants;
  private List<Integer> reviewIds;
  private List<String> tags;
  private List<Score> scores;
  private List<Comment> comments;
  private List<String> imgs;

  private int completed;

  public void copy(Schedule s) {
    this.id = s.getId();
    this.title = s.getTitle();
    this.meetDate = s.getMeetDate();
    this.stores = s.getStores();
    this.tags = s.getTags();
    this.scores = s.getScores();
    this.comments = s.getComments();
    this.imgs = s.getImgs();
    this.completed = s.getCompleted();
    this.reviewIds = s.getReviewIds();
  }
}
