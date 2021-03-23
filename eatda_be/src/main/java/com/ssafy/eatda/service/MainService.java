package com.ssafy.eatda.service;

import java.util.Date;
import java.util.List;
import com.ssafy.eatda.vo.Schedule;

public interface MainService {

  List<Schedule> getSchedules(int userSeq, Date requestDate);

}
