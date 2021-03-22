package com.ssafy.eatda.service;

import org.springframework.web.multipart.MultipartFile;
import com.ssafy.eatda.vo.User;

public interface UserService {

  public String getToken(String access_token);

  public User userInfo(int userSeq);

  public User userInfoUpdate(int userSeq, User newUser, MultipartFile file);

  public User addFriend(int userSeq, int code);

}
