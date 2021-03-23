package com.ssafy.eatda.service;

import com.ssafy.eatda.vo.Schedule;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;

public interface MeetingService {

  public Schedule createMeeting(Schedule schedule);
  public Schedule findBySeq(ObjectId seq);
  public Schedule updateIsCompleted(ObjectId seq);
  public Schedule updateMeeting(Schedule schedule);
  public String deleteMeeting(ObjectId seq);

}
