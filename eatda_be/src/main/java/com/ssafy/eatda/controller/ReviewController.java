package com.ssafy.eatda.controller;

import com.ssafy.eatda.repository.ReviewRepository;
import com.ssafy.eatda.vo.Schedule;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/review")
public class ReviewController {

  @Autowired
  private ReviewRepository repository;

  @PutMapping("/img")
  public ResponseEntity<?> updateImg(@RequestBody Schedule schedule) {
    Optional<Schedule> found = repository.findById(schedule.getSeq());
    if (found.isPresent()) {
      found.get().setImgs(schedule.getImgs());
      Schedule result = repository.save(found.get());
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/comment")
  public ResponseEntity<?> updateComment(@RequestBody Schedule schedule) {
    Optional<Schedule> found = repository.findById(schedule.getSeq());
    if (found.isPresent()) {
      found.get().setComments(schedule.getComments());
      Schedule result = repository.save(found.get());
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

}
