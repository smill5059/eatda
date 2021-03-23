package com.ssafy.eatda.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.ssafy.eatda.vo.Profile;
import com.ssafy.eatda.vo.User;
import com.ssafy.eatda.vo.UserResult;

public interface UserService {

  public UserResult login(String access_token);

  public User userInfo(int userSeq);

  public User userInfoUpdate(int userSeq, User newUser, MultipartFile file);

  public List<Profile> addFriend(int userSeq, int code);

}
