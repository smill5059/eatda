package com.ssafy.eatda.controller;

import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.eatda.repository.UserRepository;
import com.ssafy.eatda.service.JwtService;
import com.ssafy.eatda.service.MainService;
import com.ssafy.eatda.vo.Schedule;
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

  // 메인 - schedule list
  @ApiOperation(value = "캘린더", notes = "날짜를 받아와서 해당 월의 약속을 보여줌", response = Schedule.class)
  @GetMapping("/calendar/{requestDate}")
  public ResponseEntity<List<Schedule>> getSchedules(
      @ApiParam(value = "requestDate", required = true) @PathVariable Date requestDate,
      HttpServletRequest req) {
    logger.info("getSchedules - 호출");
    String jwt = req.getHeader("token");
    int userSeq = jwtService.decode(jwt);
    List<Schedule> result = mainService.getSchedules(userSeq, requestDate);
    return new ResponseEntity<List<Schedule>>(result, HttpStatus.OK);
  }

  // 메인 - schedule list
  @ApiOperation(value = "캘린더", notes = "날짜를 받아와서 해당 월의 약속을 보여줌", response = Schedule.class)
  @GetMapping("/timeline")
  public ResponseEntity<User> getTimeLine(ObjectId id, HttpServletRequest req) {
    logger.info("getTimeline - 호출");
    System.out.println(id);
    // String jwt = req.getHeader("token");
    // int userSeq = jwtService.decode(jwt);
    // List<Schedule> result = mainService.getSchedules(userSeq, requestDate);
    // String result = null;
    User user = UserRepository.findBySeq(1664038710);
    System.out.println(user.getId());
    // System.out.println(user.getId());
    return new ResponseEntity<User>(user, HttpStatus.OK);
  }

  // test
  @GetMapping("/test/{test}")
  public ResponseEntity<ObjectId> test(@PathVariable Integer test, HttpServletRequest req) {
    logger.info("test - 호출");
    User user = UserRepository.findBySeq(test);
    System.out.println(user.getId());
    return new ResponseEntity<ObjectId>(user.getId(), HttpStatus.OK);
  }

  // test2
  @GetMapping("/test2")
  public ResponseEntity<User> test2(ObjectId id, HttpServletRequest req) {
    logger.info("test2 - 호출");
    System.out.println(id);
    System.out.println("=================");
    User user = UserRepository.findBySeq(1664038710);
    System.out.println(user.getId());
    return new ResponseEntity<User>(user, HttpStatus.OK);
  }

}
