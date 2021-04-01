package com.ssafy.eatda.service;

import com.ssafy.eatda.repository.ReviewRepository;
import com.ssafy.eatda.vo.Schedule;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService {

  @Autowired
  private ReviewRepository reviewRepo;

  @Override
  public Schedule updateImg(Schedule schedule) {
    Optional<Schedule> found = reviewRepo.findById(schedule.getId());
    if (found.isPresent()) {
      found.get().setImgs(schedule.getImgs());
      return reviewRepo.save(found.get());
    }
    return null;
  }

  @Override
  public Schedule updateComment(Schedule schedule) {
    Optional<Schedule> found = reviewRepo.findById(schedule.getId());
    if (found.isPresent()) {
      found.get().setComments(schedule.getComments());
      return reviewRepo.save(found.get());
    }
    return null;
  }

}
