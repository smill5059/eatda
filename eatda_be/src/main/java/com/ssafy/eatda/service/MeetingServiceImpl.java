package com.ssafy.eatda.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.google.gson.Gson;
import com.ssafy.eatda.repository.MeetingRepository;
import com.ssafy.eatda.repository.ProfileRepository;
import com.ssafy.eatda.repository.StoreRepository;
import com.ssafy.eatda.repository.UserRepository;
import com.ssafy.eatda.vo.Profile;
import com.ssafy.eatda.vo.RecommInfo;
import com.ssafy.eatda.vo.Schedule;
import com.ssafy.eatda.vo.ScheduleResult;
import com.ssafy.eatda.vo.Store;
import com.ssafy.eatda.vo.User;

@Service
public class MeetingServiceImpl implements MeetingService {

  @Autowired
  private MeetingRepository meetingRepo;
  @Autowired
  private ProfileRepository profileRepo;
  @Autowired
  private UserRepository userRepo;
  @Autowired
  private StoreRepository storeRepo;

  @Autowired
  private RestTemplate restTemplate;

  @Override
  public Schedule createMeeting(Schedule schedule) {
    // schedule 저장
    schedule.setCompleted(0);
    Schedule result = meetingRepo.insert(schedule);

    // user schedule 정보에 추가
    List<ObjectId> participant = schedule.getParticipants();
    for (ObjectId p : participant) {
      Optional<User> user = userRepo.findById(p);
      if (user.isPresent()) {
        List<ObjectId> s = user.get().getSchedules();
        s.add(result.getId());
        user.get().setSchedules(s);
        userRepo.save(user.get());
      }
    }

    return result;
  }

  @Override
  public List<Store> recommend(RecommInfo recommInfo) {
    // MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
    // body.put("reviewIds", reviewIds);
    // body.add("latitude", String.valueOf(latitude));
    // body.add("longitude", String.valueOf(longitude));

    String body = new Gson().toJson(recommInfo);
    HttpHeaders header = new HttpHeaders();
    header.set("Contenet-type", MediaType.APPLICATION_JSON_VALUE);

    HttpEntity<String> entity = new HttpEntity<>(body, header);

    ResponseEntity<String[]> response =
        restTemplate.postForEntity("http://eatda.me:8000/recommendation/", entity, String[].class);

    String[] stores = response.getBody();
    List<Store> result = new ArrayList<>();
    int len = stores.length;
    for (int i = 0; i < len; i++) {
      Optional<Store> found = storeRepo.findByStoreId(stores[i]);
      if (found.isPresent()) {
        result.add(found.get());
      }
    }
    return result;
  }

  @Override
  public ScheduleResult readMeeting(ObjectId id) {
    Optional<Schedule> found = meetingRepo.findById(id);
    if (found.isPresent()) {
      ScheduleResult result = new ScheduleResult();
      result.copy(found.get());
      List<Profile> profiles = new ArrayList<>();
      for (ObjectId p : found.get().getParticipants()) {
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
      found.get().setCompleted(1);
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
    Optional<Schedule> found = meetingRepo.findById(id);
    if (found.isPresent()) {
      // user schedule에서 삭제
      List<ObjectId> participants = found.get().getParticipants();
      for (ObjectId p : participants) {
        Optional<User> user = userRepo.findById(p);
        if (user.isPresent()) {
          List<ObjectId> s = user.get().getSchedules();
          s.remove(id);
          user.get().setSchedules(s);
          userRepo.save(user.get());
        }
      }

      // schdule 삭제
      meetingRepo.deleteById(id);
      return "SUCCESS";
    }
    return "FAIL";
  }

}
