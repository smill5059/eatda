package com.ssafy.eatda.controller;

import com.ssafy.eatda.service.ReviewService;
import com.ssafy.eatda.vo.Schedule;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
@RequestMapping("/review")
public class ReviewController {

  @Autowired
  private ReviewService reviewSvc;

  @PutMapping("/img")
  public ResponseEntity<?> updateImg(@RequestParam ObjectId id, @RequestParam MultipartFile updatedFiles,
      @RequestParam List<String> deletedFiles,
      MultipartHttpServletRequest req) {
    System.out.println("컨트롤러 진입");
    return new ResponseEntity<>(HttpStatus.OK);
//    Schedule result = reviewSvc.updateImg(id, updatedFiles, deletedFiles);
//    if (result != null) {
//      return new ResponseEntity<>(result, HttpStatus.OK);
//    }
//    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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
