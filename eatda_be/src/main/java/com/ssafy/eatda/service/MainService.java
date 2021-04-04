package com.ssafy.eatda.service;

import java.util.Date;
import java.util.List;
import com.ssafy.eatda.vo.ScheduleResult;

public interface MainService {

  List<ScheduleResult> getSchedules(int userSeq, Date requestDate);

  List<ScheduleResult> getTimeline(int userSeq);

  List<ScheduleResult> getTimelineByDate(int userSeq, Date startDate, Date endDate);

  List<ScheduleResult> getTimelineByFriend(int userSeq, int code);

  List<ScheduleResult> getTimelineByTitle(int userSeq, String word);

  List<ScheduleResult> getSchedules(int userSeq);

}
