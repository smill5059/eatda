package com.ssafy.eatda.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
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
import com.ssafy.eatda.repository.GroupRepository;
import com.ssafy.eatda.repository.MaxStoreIdRepository;
import com.ssafy.eatda.repository.MeetingRepository;
import com.ssafy.eatda.repository.ProfileRepository;
import com.ssafy.eatda.repository.ReviewUpdateRepository;
import com.ssafy.eatda.repository.StoreRepository;
import com.ssafy.eatda.repository.UserRepository;
import com.ssafy.eatda.vo.Group;
import com.ssafy.eatda.vo.MaxStoreId;
import com.ssafy.eatda.vo.Profile;
import com.ssafy.eatda.vo.RecommInfo;
import com.ssafy.eatda.vo.Review;
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
  private MaxStoreIdRepository maxStoreIdRepo;
  @Autowired
  private GroupRepository groupRepo;
  @Autowired
  private ReviewUpdateRepository reviewUpdateRepo;

  @Autowired
  private RestTemplate restTemplate;

  @Override
  public Schedule createMeeting(Schedule schedule) {
    // 그룹 reviewId 생성
    if (schedule.getReviewIds().size() == 0) {
      return null;
    }

    Collections.sort(schedule.getReviewIds());

    if (schedule.getReviewIds().size() > 1) {
      Collections.sort(schedule.getReviewIds());
      String groupId = "";
      for (Integer reviewId : schedule.getReviewIds()) {
        groupId += Integer.toString(reviewId);
      }
      Group group = groupRepo.findByGroupId(groupId);
      if (group == null) {
        group = new Group();
        group.setCnt(0);
        group.setGroupId(groupId);
        group.setMembers((ArrayList<Integer>) schedule.getReviewIds());

        MaxStoreId maxReviewId =
            maxStoreIdRepo.findById(new ObjectId("606ad4b5180a4b670d79d0a4")).get();
        group.setReviewId(maxReviewId.getReviewIdMaxValue());
        groupRepo.save(group);

        Review review = new Review();
        review.setReviewId(maxReviewId.getReviewIdMaxValue());
        review.setScores(new HashMap<String, Integer>());
        reviewUpdateRepo.save(review);

        maxReviewId.setReviewIdMaxValue(maxReviewId.getReviewIdMaxValue() + 1);
        maxStoreIdRepo.save(maxReviewId);
      }
    }

    // storeId 배정
    for (Store store : schedule.getStores()) {
      if (store.getStoreId().equals("0")) {
        ArrayList<Store> stores =
            storeRepo.findByStoreNameAndStoreAddress(store.getStoreName(), store.getStoreAddress());

        if (stores == null || stores.size() == 0) {
          MaxStoreId maxStoreId =
              maxStoreIdRepo.findById(new ObjectId("606ad4b5180a4b670d79d0a4")).get();
          store.setStoreId(Integer.toString(maxStoreId.getMaxValue()));
          store.setReviewers(new HashMap<String, Integer>());
          storeRepo.save(store);
          maxStoreId.setMaxValue(maxStoreId.getMaxValue() + 1);
          maxStoreIdRepo.save(maxStoreId);
        } else {
          store.setStoreId(stores.get(0).getStoreId());
        }
      }
    }

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

    ArrayList<Integer> list = (ArrayList<Integer>) recommInfo.getReviewIds();
    if (list.size() == 0) {
      return null;
    }

    if (list.size() > 1) {
      Collections.sort(list);
      String groupId = "";
      for (Integer reviewId : list) {
        groupId += Integer.toString(reviewId);
      }
      Group group = groupRepo.findByGroupId(groupId);
      if (group != null) {
        // 그룹의 추천 횟수가 3회 이상일 경우 reviewId하나로 추천
        if (group.getCnt() >= 3) {
          ArrayList<Integer> tmp = new ArrayList<Integer>();
          tmp.add(group.getReviewId());
          recommInfo.setReviewIds(tmp);
        }
      } else {
        group = new Group();
        group.setCnt(0);
        group.setGroupId(groupId);
        group.setMembers((ArrayList<Integer>) recommInfo.getReviewIds());

        MaxStoreId maxReviewId =
            maxStoreIdRepo.findById(new ObjectId("606ad4b5180a4b670d79d0a4")).get();
        group.setReviewId(maxReviewId.getReviewIdMaxValue());
        groupRepo.save(group);

        Review review = new Review();
        review.setReviewId(maxReviewId.getReviewIdMaxValue());
        review.setScores(new HashMap<String, Integer>());
        reviewUpdateRepo.save(review);

        maxReviewId.setReviewIdMaxValue(maxReviewId.getReviewIdMaxValue() + 1);
        maxStoreIdRepo.save(maxReviewId);

      }

    }

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
      Store found = storeRepo.findByStoreId(stores[i]);
      if (found != null) {
        result.add(found);
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

      // 참여자 정보 삭제
      for (ObjectId p : found.get().getParticipants()) {
        Optional<User> user = userRepo.findById(p);
        if (user.isPresent()) {
          List<ObjectId> s = user.get().getSchedules();
          s.remove(schedule.getId());
          user.get().setSchedules(s);
          userRepo.save(user.get());
        }
      }

      found.get().setTitle(schedule.getTitle());
      found.get().setMeetDate(schedule.getMeetDate());
      found.get().setStores(schedule.getStores());
      found.get().setParticipants(schedule.getParticipants());
      found.get().setTags(schedule.getTags());
      found.get().setReviewIds(schedule.getReviewIds());
      Schedule result = meetingRepo.save(found.get());

      // user schedule 정보에 추가
      for (ObjectId p : schedule.getParticipants()) {
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
