package com.ssafy.eatda.service;

import com.ssafy.eatda.vo.RecommInfo;
import com.ssafy.eatda.vo.Schedule;
import com.ssafy.eatda.vo.ScheduleResult;
import com.ssafy.eatda.vo.Store;
import java.util.List;
import org.bson.types.ObjectId;

public interface MeetingService {

  Schedule createMeeting(Schedule schedule);
  List<Store> recommend(RecommInfo recommInfo);
  ScheduleResult readMeeting(ObjectId id);
  Schedule updateIsCompleted(ObjectId id);
  Schedule updateMeeting(Schedule schedule);
  String deleteMeeting(ObjectId id);

}
