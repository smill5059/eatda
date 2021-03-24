package com.ssafy.eatda.controller;

import com.ssafy.eatda.service.JwtService;
import com.ssafy.eatda.service.MeetingService;
import com.ssafy.eatda.vo.Schedule;
import io.swagger.annotations.ApiOperation;
import javax.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/meeting")
public class MeetingController {

  @Autowired
  private MeetingService meetingSvc;

  @Autowired
  private JwtService jwtSvc;

  @ApiOperation(value = "약속 생성")
  @PostMapping()
  public ResponseEntity<?> createMeeting(@RequestBody Schedule schedule, HttpServletRequest req) {
//    String jwt = req.getHeader("token");
//    int userSeq = jwtSvc.decode(jwt);
    Schedule result = meetingSvc.createMeeting(schedule);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "약속 확인")
  @GetMapping("/{id}")
  public ResponseEntity<?> readMeeting(@PathVariable ObjectId id, HttpServletRequest req) {
    Schedule result = meetingSvc.readMeeting(id);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "만났어요 클릭 시")
  @PutMapping("/{id}")
  public ResponseEntity<?> updateIsCompleted(@PathVariable ObjectId id, HttpServletRequest req) {
    Schedule result = meetingSvc.updateIsCompleted(id);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "약속 수정")
  @PutMapping()
  public ResponseEntity<?> updateMeeting(@RequestBody Schedule schedule, HttpServletRequest req) {
    Schedule result = meetingSvc.updateMeeting(schedule);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "약속 삭제")
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteMeeting(@PathVariable ObjectId id, HttpServletRequest req) {
    String result = meetingSvc.deleteMeeting(id);
    if (result.equals("SUCCESS")) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

}
