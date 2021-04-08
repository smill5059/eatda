package com.ssafy.eatda.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ssafy.eatda.repository.ProfileRepository;
import com.ssafy.eatda.repository.ScheduleRepository;
import com.ssafy.eatda.repository.UserRepository;
import com.ssafy.eatda.vo.Profile;
import com.ssafy.eatda.vo.Schedule;
import com.ssafy.eatda.vo.ScheduleResult;
import com.ssafy.eatda.vo.User;

@Service
public class MainServiceImpl implements MainService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ScheduleRepository scheduleRepository;

  @Autowired
  private ProfileRepository profileRepository;

  // 캘린더
  @Override
  public List<ScheduleResult> getSchedules(int userSeq, Date requestDate) {

    User user = userRepository.findBySeq(userSeq);
    if (user == null)
      return null;

    Calendar cal = Calendar.getInstance();
    cal.setTime(requestDate);
    int year = cal.get(Calendar.YEAR);
    int month = cal.get(Calendar.MONTH);

    ArrayList<ScheduleResult> result = new ArrayList<ScheduleResult>();

    for (ObjectId id : user.getSchedules()) {
      Schedule s = scheduleRepository.findById(id).orElse(null);
      cal.setTime(s.getMeetDate());
      if (cal.get(Calendar.YEAR) == year && cal.get(Calendar.MONTH) == month) {
        ScheduleResult sr = new ScheduleResult();
        sr.copy(s);
        ArrayList<Profile> profiles = new ArrayList<Profile>();
        for (ObjectId userId : s.getParticipants()) {
          Profile profile = profileRepository.findById(userId).orElse(null);
          if (profile == null)
            return null;
          profiles.add(profile);
        }
        sr.setParticipants(profiles);
        result.add(sr);
      }
    }

    return result;
  }

  @Override
  public List<ScheduleResult> getSchedules(int userSeq) {
    User user = userRepository.findBySeq(userSeq);
    if (user == null)
      return null;

    ArrayList<ScheduleResult> result = new ArrayList<ScheduleResult>();

    for (ObjectId id : user.getSchedules()) {
      Schedule s = scheduleRepository.findById(id).orElse(null);
      if (s == null)
        continue;
      ScheduleResult sr = new ScheduleResult();
      sr.copy(s);
      ArrayList<Profile> profiles = new ArrayList<Profile>();
      for (ObjectId userId : s.getParticipants()) {
        Profile profile = profileRepository.findById(userId).orElse(null);
        if (profile == null)
          return null;
        profiles.add(profile);
      }
      sr.setParticipants(profiles);
      result.add(sr);

    }

    Collections.sort(result,
        (ScheduleResult s1, ScheduleResult s2) -> s2.getMeetDate().compareTo(s1.getMeetDate()));
    return result;
  }

  // 타임라인
  @Override
  public List<ScheduleResult> getTimeline(int userSeq) {
    User user = userRepository.findBySeq(userSeq);
    if (user == null)
      return null;

    ArrayList<ScheduleResult> result = new ArrayList<ScheduleResult>();

    for (ObjectId id : user.getSchedules()) {
      Schedule s = scheduleRepository.findById(id).orElse(null);
      if (s.getCompleted() == 1) {
        ScheduleResult sr = new ScheduleResult();
        sr.copy(s);
        ArrayList<Profile> profiles = new ArrayList<Profile>();
        for (ObjectId userId : s.getParticipants()) {
          Profile profile = profileRepository.findById(userId).orElse(null);
          if (profile == null)
            return null;
          profiles.add(profile);
        }
        result.add(sr);
      }
    }

    return result;
  }

  // 타임라인 - 날짜필터
  @Override
  public List<ScheduleResult> getTimelineByDate(int userSeq, Date startDate, Date endDate) {
    User user = userRepository.findBySeq(userSeq);
    if (user == null)
      return null;

    ArrayList<ScheduleResult> result = new ArrayList<ScheduleResult>();

    Calendar start = Calendar.getInstance();
    Calendar end = Calendar.getInstance();

    start.setTime(startDate);
    start.add(Calendar.DATE, -1);
    start.set(Calendar.HOUR_OF_DAY, 23);
    start.set(Calendar.MINUTE, 59);
    start.set(Calendar.SECOND, 59);

    end.setTime(endDate);
    end.add(Calendar.DATE, 1);
    end.set(Calendar.HOUR_OF_DAY, 0);
    end.set(Calendar.MINUTE, 0);
    end.set(Calendar.SECOND, 0);

    for (ObjectId id : user.getSchedules()) {
      Schedule s = scheduleRepository.findById(id).orElse(null);
      Calendar chk = Calendar.getInstance();
      chk.setTime(s.getMeetDate());
      if (start.before(chk) && end.after(chk) && s.getCompleted() == 1) {
        ScheduleResult sr = new ScheduleResult();
        sr.copy(s);
        ArrayList<Profile> profiles = new ArrayList<Profile>();
        for (ObjectId userId : s.getParticipants()) {
          Profile profile = profileRepository.findById(userId).orElse(null);
          if (profile == null)
            return null;
          profiles.add(profile);
        }
        result.add(sr);
      }
    }

    return result;
  }

  // 타임라인 친구필터
  @Override
  public List<ScheduleResult> getTimelineByFriend(int userSeq, int code) {
    // User user = userRepository.findBySeq(userSeq);
    // if (user == null || friendName == null || friendName.equals(""))
    // return null;

    HashSet<ObjectId> list = new HashSet<ObjectId>();
    ArrayList<ScheduleResult> result = new ArrayList<ScheduleResult>();


    // for (ObjectId friendId : user.getFriends()) {
    // Profile friend = profileRepository.findById(friendId).orElse(null);
    // if (friend.getUserName() != null && friend.getUserName().contains(friendName)) {
    // int friendSeq = userRepository.findBySeq(friend.getUserSeq()).getSeq();
    //
    // for (ObjectId id : user.getSchedules()) {
    // Schedule s = scheduleRepository.findById(id).orElse(null);
    // if (s.isCompleted()) {
    //
    // }
    // }
    //
    //
    // ScheduleResult sr = new ScheduleResult();
    // sr.copy(s);
    // ArrayList<Profile> profiles = new ArrayList<Profile>();
    // for (ObjectId userId : s.getParticipants()) {
    // Profile profile = profileRepository.findById(userId).orElse(null);
    // if (profile == null)
    // return null;
    // if (profile.getUserSeq() == friendSeq) {
    // profiles.add(profile);
    // result.add(sr);
    // break;
    // }
    // }
    //
    // }
    //
    // }

    return result;
  }

  // 타임라인 제목 필터
  @Override
  public List<ScheduleResult> getTimelineByTitle(int userSeq, String word) {
    User user = userRepository.findBySeq(userSeq);
    if (user == null)
      return null;

    ArrayList<ScheduleResult> result = new ArrayList<ScheduleResult>();

    for (ObjectId id : user.getSchedules()) {
      Schedule s = scheduleRepository.findById(id).orElse(null);
      if (s.getCompleted() == 1 && s.getTitle() != null && s.getTitle().contains(word)) {
        ScheduleResult sr = new ScheduleResult();
        sr.copy(s);
        ArrayList<Profile> profiles = new ArrayList<Profile>();
        for (ObjectId userId : s.getParticipants()) {
          Profile profile = profileRepository.findById(userId).orElse(null);
          if (profile == null)
            return null;
          profiles.add(profile);
        }
        result.add(sr);
      }
    }

    return result;
  }

}
