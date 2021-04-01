package com.ssafy.eatda.controller;

import com.ssafy.eatda.service.ReviewService;
import com.ssafy.eatda.vo.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/review")
public class ReviewController {

  @Autowired
  private ReviewService reviewSvc;

  @PutMapping("/img")
  public ResponseEntity<?> updateImg(@RequestBody Schedule schedule) {
    Schedule result = reviewSvc.updateImg(schedule);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/comment")
  public ResponseEntity<?> updateComment(@RequestBody Schedule schedule) {
    Schedule result = reviewSvc.updateComment(schedule);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

}
