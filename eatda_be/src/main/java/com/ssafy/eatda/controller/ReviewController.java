package com.ssafy.eatda.controller;

import com.ssafy.eatda.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/review")
public class ReviewController {

  @Autowired
  private ReviewRepository repository;

  @PutMapping("/img/update")
  public ResponseEntity<?> updateImg() {
    return null;
  }

  @PutMapping("/img/delete")
  public ResponseEntity<?> deleteImg() {
    return null;
  }

  @PutMapping("/comment/update")
  public ResponseEntity<?> updateComment() {
    return null;
  }

  @PutMapping("/comment/delete")
  public ResponseEntity<?> deleteComment() {
    return null;
  }

}
