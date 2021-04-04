package com.ssafy.eatda.controller;

import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.ssafy.eatda.service.JwtService;
import com.ssafy.eatda.service.ReviewService;
import com.ssafy.eatda.vo.Schedule;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/review")
public class ReviewController {

  @Autowired
  JwtService jwtService;

  @Autowired
  private ReviewService reviewSvc;

  @PutMapping("/img")
  public ResponseEntity<?> updateImg(@RequestParam ObjectId id,
      @RequestParam MultipartFile updatedFiles, @RequestParam List<String> deletedFiles,
      MultipartHttpServletRequest req) {
    System.out.println("컨트롤러 진입");
    return new ResponseEntity<>(HttpStatus.OK);
    // Schedule result = reviewSvc.updateImg(id, updatedFiles, deletedFiles);
    // if (result != null) {
    // return new ResponseEntity<>(result, HttpStatus.OK);
    // }
    // return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/comment")
  public ResponseEntity<?> updateComment(@RequestBody Schedule schedule, HttpServletRequest req) {
    Schedule result = reviewSvc.updateComment(schedule);
    if (result != null) {
      return new ResponseEntity<>(result, HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @ApiOperation(value = "사진 업로드", notes = "받아온 사진을 업로드", response = String.class)
  @PostMapping("/img/{meetingId}")
  public ResponseEntity<String> uploadImg(
      @ApiParam(value = "meetingId", required = true) @PathVariable ObjectId meetingId,
      @RequestParam(value = "updatedFiles", required = false) List<MultipartFile> files,
      HttpServletRequest req) {
    String result = reviewSvc.uploadImg(meetingId, files);
    if (result != "SUCCESS")
      return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<String>(result, HttpStatus.OK);
  }

  @ApiOperation(value = "사진 삭제", notes = "받아온 사진 url들을 제거", response = String.class)
  @DeleteMapping("/img/{meetingId}")
  public ResponseEntity<String> deleteImgs(
      @ApiParam(value = "meetingId", required = true) @PathVariable ObjectId meetingId,
      @RequestBody HashMap<String, Object> map, HttpServletRequest req) {
    List<String> deletedUrls = (List<String>) map.get("deletedUrls");
    String result = reviewSvc.deleteImgs(meetingId, deletedUrls);
    if (result == "FAIL")
      return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<String>(result, HttpStatus.OK);
  }

}
