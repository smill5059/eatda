package com.ssafy.eatda.service;

import com.ssafy.eatda.repository.MeetingRepository;
import com.ssafy.eatda.vo.Schedule;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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
  public Schedule findBySeq(ObjectId id) {
    Optional<Schedule> found = repository.findById(id);
    if (found.isPresent()) {
      return found.get();
    }
    return null;
  }

  @Override
  public Schedule updateIsCompleted(ObjectId id) {
    Optional<Schedule> found = repository.findById(id);
    if (found.isPresent()) {
      found.get().setCompleted(true);
      Schedule result = repository.save(found.get());
      return result;
    }
    return null;
  }

  @Override
  public Schedule updateMeeting(Schedule schedule) {
    Optional<Schedule> found = repository.findById(schedule.getId());
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
  public String deleteMeeting(ObjectId id) {
    if (repository.existsById(id)) {
      repository.deleteById(id);
      return "SUCCESS";
    }
    return "FAIL";
  }

}
