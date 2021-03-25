package com.ssafy.eatda.service;

import com.ssafy.eatda.vo.Schedule;
import com.ssafy.eatda.vo.ScheduleResult;
import org.bson.types.ObjectId;

public interface MeetingService {

  Schedule createMeeting(Schedule schedule);
  ScheduleResult readMeeting(ObjectId id);
  Schedule updateIsCompleted(ObjectId id);
  Schedule updateMeeting(Schedule schedule);
  String deleteMeeting(ObjectId id);

}
