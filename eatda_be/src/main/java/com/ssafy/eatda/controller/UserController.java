package com.ssafy.eatda.controller;

import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.ssafy.eatda.service.JwtService;
import com.ssafy.eatda.service.UserService;
import com.ssafy.eatda.vo.Profile;
import com.ssafy.eatda.vo.User;
import com.ssafy.eatda.vo.UserResult;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/user")
public class UserController {

  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  @Autowired
  JwtService jwtService;

  @Autowired
  UserService userService;

  // 카카오 로그인
  @ApiOperation(value = "카카오 로그인", notes = "access_token을 인자로 받아 로그인/회원가입", response = String.class)
  @PostMapping("/kakao/login")
  public ResponseEntity<UserResult> login(@RequestBody HashMap<String, String> map,
      HttpServletResponse res) {
    logger.info("login - 호출");
    String access_token = map.get("access_token");
    UserResult result = userService.login(access_token);
    if (result == null)
      return new ResponseEntity<UserResult>(result, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<UserResult>(result, HttpStatus.OK);
  }

  // 회원정보조회
  @ApiOperation(value = "회원정보조회", notes = "헤더에 token을 통해 회원정보조회", response = String.class)
  @GetMapping("/userinfo")
  public ResponseEntity<User> userInfo(HttpServletRequest req) {
    logger.info("userInfo - 호출");
    String jwt = req.getHeader("token");
    int userSeq = jwtService.decode(jwt);
    User userInfo = userService.userInfo(userSeq);
    return new ResponseEntity<User>(userInfo, HttpStatus.OK);
  }

  // 회원정보수정
  @ApiOperation(value = "회원정보수정", notes = "변경할 닉네임과 프로필 사진 정보를 받아와서 회원정보 수정", response = User.class)
  @PutMapping("/userinfo")
  public ResponseEntity<UserResult> userInfoUpdate(
      @ApiParam(value = "닉네임", required = true) User user, @ApiParam(value = "프로필사진",
          required = false) @RequestParam(value = "file", required = false) MultipartFile file,
      HttpServletRequest req) {
    logger.info("userInfoUpdate - 호출");
    String jwt = req.getHeader("token");
    int userSeq = jwtService.decode(jwt);
    UserResult userInfo = userService.userInfoUpdate(userSeq, user, file);
    if (userInfo == null)
      return new ResponseEntity<UserResult>(userInfo, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<UserResult>(userInfo, HttpStatus.OK);
  }

  // 친구 추가
  @ApiOperation(value = "친구추가", notes = "코드(seq)를 받아와서 친구추가", response = List.class)
  @PutMapping("/addfriend")
  public ResponseEntity<Profile> addFriend(
      @ApiParam(value = "code(seq)", required = true) @RequestBody HashMap<String, Object> map,
      HttpServletRequest req) {
    logger.info("addFriend - 호출");
    Integer code = (Integer) map.get("code");
    String jwt = req.getHeader("token");
    int userSeq = jwtService.decode(jwt);
    Profile result = userService.addFriend(userSeq, code);
    if (result == null)
      return new ResponseEntity<Profile>(result, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<Profile>(result, HttpStatus.OK);
  }

  // 친구 삭제
  @ApiOperation(value = "친구삭제", notes = "코드(seq)를 받아와서 친구추가(친구에게서도 삭제됨)", response = List.class)
  @DeleteMapping("/deletefriend")
  public ResponseEntity<List<Profile>> deleteFriend(
      @ApiParam(value = "code(seq)", required = true) @RequestBody HashMap<String, Object> map,
      HttpServletRequest req) {
    logger.info("deleteFriend - 호출");
    String jwt = req.getHeader("token");
    int userSeq = jwtService.decode(jwt);
    Integer code = (Integer) map.get("code");
    List<Profile> result = userService.deleteFriend(userSeq, code);
    if (result == null)
      return new ResponseEntity<List<Profile>>(result, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<List<Profile>>(result, HttpStatus.OK);
  }

  // 회원탈퇴
  @ApiOperation(value = "회원탈퇴", notes = "구현중(User, Profile 테이블 관련 데이터만 지워짐)",
      response = String.class)
  @DeleteMapping("/deleteuser")
  public ResponseEntity<String> deleteUser(HttpServletRequest req) {
    logger.info("deleteFriend - 호출");
    String jwt = req.getHeader("token");
    int userSeq = jwtService.decode(jwt);
    String result = userService.deleteUser(userSeq);
    if (result == "FAIL")
      return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
    return new ResponseEntity<String>(result, HttpStatus.OK);
  }

}
