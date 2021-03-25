package com.ssafy.eatda.service;

import com.ssafy.eatda.repository.MeetingRepository;
import com.ssafy.eatda.repository.ProfileRepository;
import com.ssafy.eatda.vo.Profile;
import com.ssafy.eatda.vo.Schedule;
import com.ssafy.eatda.vo.ScheduleResult;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingServiceImpl implements MeetingService {

  @Autowired
  private MeetingRepository meetingRepo;

  @Autowired
  private ProfileRepository profileRepo;

  @Override
  public Schedule createMeeting(Schedule schedule) {
    schedule.setCompleted(false);
    return meetingRepo.insert(schedule);
  }

  @Override
  public ScheduleResult readMeeting(ObjectId id) {
    Optional<Schedule> found = meetingRepo.findById(id);
    if (found.isPresent()) {
      ScheduleResult result = new ScheduleResult();
      result.copy(found.get());
      List<Profile> profiles = new ArrayList<>();
      for (ObjectId p : found.get().getParticipants()){
        profiles.add(profileRepo.findById(p).get());
      }
      result.setParticipants(profiles);
      return result;
    }
    return null;
  }

  @Override
  public Schedule updateIsCompleted(ObjectId id) {
    Optional<Schedule> found = meetingRepo.findById(id);
    if (found.isPresent()) {
      found.get().setCompleted(true);
      Schedule result = meetingRepo.save(found.get());
      return result;
    }
    return null;
  }

  @Override
  public Schedule updateMeeting(Schedule schedule) {
    Optional<Schedule> found = meetingRepo.findById(schedule.getId());
    if (found.isPresent()) {
      found.get().setTitle(schedule.getTitle());
      found.get().setMeetDate(schedule.getMeetDate());
      found.get().setStores(schedule.getStores());
      found.get().setParticipants(schedule.getParticipants());
      found.get().setTags(schedule.getTags());
      Schedule result = meetingRepo.save(found.get());
      return result;
    }
    return null;
  }

  @Override
  public String deleteMeeting(ObjectId id) {
    if (meetingRepo.existsById(id)) {
      meetingRepo.deleteById(id);
      return "SUCCESS";
    }
    return "FAIL";
  }

}
