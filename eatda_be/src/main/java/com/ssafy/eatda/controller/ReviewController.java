package com.ssafy.eatda.controller;

import com.ssafy.eatda.service.ReviewService;
import com.ssafy.eatda.vo.Comment;
import com.ssafy.eatda.vo.Schedule;
import com.ssafy.eatda.vo.Score;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/review")
public class ReviewController {

  @Autowired
  private ReviewService reviewSvc;

  @PutMapping("/img")
  public ResponseEntity<?> updateImg(@RequestBody Schedule schedule, HttpServletRequest req) {
    Schedule result = reviewSvc.updateImg(schedule);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/comment")
  public ResponseEntity<?> updateComment(@RequestBody Schedule schedule, HttpServletRequest req) {
    Schedule result = reviewSvc.updateComment(schedule);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

}
