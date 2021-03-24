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
public class ScheduleResult {
  private ObjectId id;
  private String title;

  @Temporal(TemporalType.TIMESTAMP)
  private Date meetDate;

  private List<Store> stores;
  private List<Profile> participants;
  private List<String> tags;
  private List<Score> scores;
  private List<Comment> comments;
  private List<Img> imgs;

  private boolean isCompleted;

  public void copy(Schedule s) {
    this.id = s.getId();
    this.title = s.getTitle();
    this.meetDate = s.getMeetDate();
    this.stores = s.getStores();
    this.tags = s.getTags();
    this.scores = s.getScores();
    this.comments = s.getComments();
    this.imgs = s.getImgs();
  }
}
