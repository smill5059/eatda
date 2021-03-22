package com.ssafy.eatda.controller;

import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.eatda.service.JwtService;
import com.ssafy.eatda.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  @Autowired
  JwtService jwtService;

  @Autowired
  UserService userService;

  // 로그인카카오
  @GetMapping("/kakao/login")
  public ResponseEntity<String> login(
      @RequestParam(value = "access_token", required = false) String access_token,
      HttpServletResponse res) {
    String result = null;
    result = userService.getToken(access_token);
    return new ResponseEntity<String>(result, HttpStatus.OK);
  }
}
