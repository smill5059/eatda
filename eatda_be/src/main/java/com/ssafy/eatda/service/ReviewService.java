package com.ssafy.eatda.service;

import com.ssafy.eatda.vo.Schedule;

public interface ReviewService {
  Schedule updateImg(Schedule schedule);
  Schedule updateComment(Schedule schedule);
}
