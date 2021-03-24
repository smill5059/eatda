package com.ssafy.eatda.controller;

import com.ssafy.eatda.service.MeetingService;
import com.ssafy.eatda.vo.Schedule;
import io.swagger.annotations.ApiOperation;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/meeting")
public class MeetingController {

  @Autowired
  private MeetingService meetingSvc;

  @ApiOperation(value = "약속 생성")
  @PostMapping()
  public ResponseEntity<?> createMeeting(@RequestBody Schedule schedule) {
    Schedule result = meetingSvc.createMeeting(schedule);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "약속 확인")
  @GetMapping("/{seq}")
  public ResponseEntity<?> findBySeq(@PathVariable ObjectId id) {
    Schedule result = meetingSvc.findBySeq(id);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "만났어요 클릭 시")
  @PutMapping("/{seq}")
  public ResponseEntity<?> updateIsCompleted(@PathVariable ObjectId id) {
    Schedule result = meetingSvc.updateIsCompleted(id);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "약속 수정")
  @PutMapping()
  public ResponseEntity<?> updateMeeting(@RequestBody Schedule schedule) {
    Schedule result = meetingSvc.updateMeeting(schedule);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "약속 삭제")
  @DeleteMapping("/{seq}")
  public ResponseEntity<?> deleteMeeting(@PathVariable ObjectId id) {
    String result = meetingSvc.deleteMeeting(id);
    if (result.equals("SUCCESS")) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

}
