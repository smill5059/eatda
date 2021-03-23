package com.ssafy.eatda.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
    private ObjectId seq;
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
}
