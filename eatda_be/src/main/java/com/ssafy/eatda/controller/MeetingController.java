package com.ssafy.eatda.controller;

import com.ssafy.eatda.repository.MeetingRepository;
import com.ssafy.eatda.vo.Schedule;
import io.swagger.annotations.ApiOperation;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/meeting")
public class MeetingController {

  @Autowired
  private MeetingRepository repository;

  @ApiOperation(value = "약속 생성")
  @PostMapping()
  public ResponseEntity<?> createMeeting(@RequestBody Schedule schedule) {
    Schedule result = repository.insert(schedule);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "약속 확인")
  @GetMapping("/{seq}")
  public ResponseEntity<?> findBySeq(@PathVariable ObjectId seq) {
    Optional<Schedule> found = repository.findById(seq);
    if (found.isPresent()) {
      return new ResponseEntity<>(found.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "만났어요 클릭 시")
  @PutMapping("/{seq}")
  public ResponseEntity<?> updateIsCompleted(@PathVariable ObjectId seq) {
    Optional<Schedule> found = repository.findById(seq);
    if (found.isPresent()) {
      found.get().setCompleted(true);
      Schedule result = repository.save(found.get());
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "약속 수정")
  @PutMapping()
  public ResponseEntity<?> updateMeeting(@RequestBody Schedule schedule) {
    Optional<Schedule> found = repository.findById(schedule.getSeq());
    if (found.isPresent()) {
      found.get().setTitle(schedule.getTitle());
      found.get().setMeetDate(schedule.getMeetDate());
      found.get().setStores(schedule.getStores());
      found.get().setParticipants(schedule.getParticipants());
      found.get().setTags(schedule.getTags());
      Schedule result = repository.save(found.get());
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "약속 삭제")
  @DeleteMapping("/{seq}")
  public ResponseEntity<?> deleteMeeting(@PathVariable ObjectId seq) {
    if (repository.existsById(seq)) {
      repository.deleteById(seq);
      return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }
    return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
  }

}
