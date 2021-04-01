package com.ssafy.eatda.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.eatda.repository.UserRepository;
import com.ssafy.eatda.service.JwtService;
import com.ssafy.eatda.service.MainService;
import com.ssafy.eatda.vo.Schedule;
import com.ssafy.eatda.vo.ScheduleResult;
import com.ssafy.eatda.vo.User;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/main")
public class MainController {

  private static final Logger logger = LoggerFactory.getLogger(MainController.class);

  @Autowired
  JwtService jwtService;

  @Autowired
  MainService mainService;

  @Autowired
  UserRepository UserRepository;

  // 메인 캘린더- schedule list
  @ApiOperation(value = "캘린더", notes = "날짜를 받아와서 해당 월의 약속을 보여줌", response = ScheduleResult.class)
  @GetMapping("/calendar/{requestDate}")
  public ResponseEntity<List<ScheduleResult>> getSchedules(
      @ApiParam(value = "requestDate", required = true) @PathVariable Date requestDate,
      HttpServletRequest req) {
    logger.info("getSchedules - 호출");
    String jwt = req.getHeader("token");
    int userSeq = jwtService.decode(jwt);
    List<ScheduleResult> result = mainService.getSchedules(userSeq, requestDate);
    if (result == null)
      return new ResponseEntity<List<ScheduleResult>>(result, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<List<ScheduleResult>>(result, HttpStatus.OK);
  }

  // 메인 타임라인- schedule list
  @ApiOperation(value = "타임라인", notes = "참여 약속들 전체 반환", response = Schedule.class)
  @GetMapping("/timeline")
  public ResponseEntity<List<ScheduleResult>> getTimeLine(HttpServletRequest req) {
    logger.info("getTimeline - 호출");
    String jwt = req.getHeader("token");
    int userSeq = jwtService.decode(jwt);
    List<ScheduleResult> result = mainService.getTimeline(userSeq);
    if (result == null)
      return new ResponseEntity<List<ScheduleResult>>(result, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<List<ScheduleResult>>(result, HttpStatus.OK);
  }

  // 메인 타임라인 날짜필터- schedule list
  @ApiOperation(value = "타임라인(날짜)", notes = "기준 날짜 사이에 있는 완료 약속들 반환", response = Schedule.class)
  @GetMapping("/timeline/date")
  public ResponseEntity<List<ScheduleResult>> getTimeLineByDate(@RequestParam Date startDate,
      @RequestParam Date endDate, HttpServletRequest req) {
    logger.info("getTimelineByDate - 호출");
    String jwt = req.getHeader("token");
    int userSeq = jwtService.decode(jwt);
    List<ScheduleResult> result = mainService.getTimelineByDate(userSeq, startDate, endDate);
    if (result == null)
      return new ResponseEntity<List<ScheduleResult>>(result, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<List<ScheduleResult>>(result, HttpStatus.OK);
  }

  // 메인 타임라인 친구검색 - schedule list
  @ApiOperation(value = "타임라인(친구)", notes = "특정친구와 함께한 완료 약속들 반환", response = Schedule.class)
  @GetMapping("/timeline/friend")
  public ResponseEntity<List<ScheduleResult>> getTimeLineByFriend(@RequestParam int code,
      HttpServletRequest req) {
    logger.info("getTimelineByFriend - 호출");
    String jwt = req.getHeader("token");
    int userSeq = jwtService.decode(jwt);
    List<ScheduleResult> result = mainService.getTimelineByFriend(userSeq, code);
    if (result == null)
      return new ResponseEntity<List<ScheduleResult>>(result, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<List<ScheduleResult>>(result, HttpStatus.OK);
  }

  // 메인 타임라인 제목검색 - schedule list
  @ApiOperation(value = "타임라인(제목)", notes = "키워드를 제목에 포함하고 있는 완료 약속들 반환", response = Schedule.class)
  @GetMapping("/timeline/title")
  public ResponseEntity<List<ScheduleResult>> getTimeLineByTitle(@RequestParam String word,
      HttpServletRequest req) {
    logger.info("getTimelineByFriend - 호출");
    String jwt = req.getHeader("token");
    int userSeq = jwtService.decode(jwt);
    List<ScheduleResult> result = mainService.getTimelineByTitle(userSeq, word);
    if (result == null)
      return new ResponseEntity<List<ScheduleResult>>(result, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<List<ScheduleResult>>(result, HttpStatus.OK);
  }

  // test
  @PostMapping("/test")
  public ResponseEntity<User> test(@RequestBody HashMap<String, Object> map,
      HttpServletRequest req) {
    logger.info("test - 호출");
    User user = UserRepository.findBySeq((Integer) map.get("test"));
    System.out.println(user.getId());
    return new ResponseEntity<User>(user, HttpStatus.OK);
  }

  // test2
  @PostMapping("/test2")
  public ResponseEntity<User> test2(@RequestBody User user, HttpServletRequest req) {
    logger.info("test2 - 호출");
    System.out.println(user);
    System.out.println(user.getId());
    System.out.println("=================");
    User user2 = UserRepository.findBySeq(1664038710);
    System.out.println(user2.getId());
    return new ResponseEntity<User>(user, HttpStatus.OK);
  }

}
