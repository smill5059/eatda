package com.ssafy.eatda.service;

import com.ssafy.eatda.repository.MeetingRepository;
import com.ssafy.eatda.vo.Schedule;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MeetingServiceImpl implements MeetingService {

  @Autowired
  private MeetingRepository repository;

  @Override
  public Schedule createMeeting(Schedule schedule) {
    return repository.insert(schedule);
  }

  @Override
  public Schedule findBySeq(ObjectId seq) {
    Optional<Schedule> found = repository.findById(seq);
    if (found.isPresent()) {
      return found.get();
    }
    return null;
  }

  @Override
  public Schedule updateIsCompleted(ObjectId seq) {
    Optional<Schedule> found = repository.findById(seq);
    if (found.isPresent()) {
      found.get().setCompleted(true);
      Schedule result = repository.save(found.get());
      return result;
    }
    return null;
  }

  @Override
  public Schedule updateMeeting(Schedule schedule) {
    Optional<Schedule> found = repository.findById(schedule.getSeq());
    if (found.isPresent()) {
      found.get().setTitle(schedule.getTitle());
      found.get().setMeetDate(schedule.getMeetDate());
      found.get().setStores(schedule.getStores());
      found.get().setParticipants(schedule.getParticipants());
      found.get().setTags(schedule.getTags());
      Schedule result = repository.save(found.get());
      return result;
    }
    return null;
  }

  @Override
  public String deleteMeeting(ObjectId seq) {
    if (repository.existsById(seq)) {
      repository.deleteById(seq);
      return "SUCCESS";
    }
    return "FAIL";
  }

}
