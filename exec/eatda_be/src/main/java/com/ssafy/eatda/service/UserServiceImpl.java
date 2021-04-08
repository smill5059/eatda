package com.ssafy.eatda.service;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;
import java.util.UUID;
import org.apache.commons.io.FilenameUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.eatda.repository.MaxStoreIdRepository;
import com.ssafy.eatda.repository.ProfileRepository;
import com.ssafy.eatda.repository.ReviewUpdateRepository;
import com.ssafy.eatda.repository.UserRepository;
import com.ssafy.eatda.vo.MaxStoreId;
import com.ssafy.eatda.vo.Profile;
import com.ssafy.eatda.vo.Review;
import com.ssafy.eatda.vo.User;
import com.ssafy.eatda.vo.UserResult;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ProfileRepository profileRepository;

  @Autowired
  private MaxStoreIdRepository maxStoreIdRepo;

  @Autowired
  private ReviewUpdateRepository reviewUpdateRepo;

  @Autowired
  private JwtService jwtService;

  @Value("${Kakao.APP_REST_API_KEY}")
  private String APP_REST_API_KEY;

  @Value("${Kakao.REDIRECT_URI}")
  private String REDIRECT_URI;

  @Value("${resources.location}")
  private String uploadPath;

  private String defaultFileName = "profile/logo.jpg";

  @Override
  public UserResult login(String access_token) {
    String reqURL = "https://kapi.kakao.com/v2/user/me";
    try {
      URL url = new URL(reqURL);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod("GET");

      // 요청에 필요한 Header에 포함될 내용
      conn.setRequestProperty("Authorization", "Bearer " + access_token);
      // int responseCode = conn.getResponseCode();
      // System.out.println("responseCode : " + responseCode);

      BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

      String line = "";
      String result = "";

      while ((line = br.readLine()) != null) {
        result += line;
      }

      ObjectMapper mapper = new ObjectMapper();
      JsonNode userInfo = mapper.readTree(result);

      int seq = Integer.parseInt(userInfo.path("id").asText());

      // 회원가입
      if (userRepository.findBySeq(seq) == null) {

        JsonNode kakao_account = userInfo.path("kakao_account");

        String profile_image_url = kakao_account.path("profile").path("profile_image_url").asText();
        String name = kakao_account.path("profile").path("nickname").asText();
        User user = new User();
        Profile profile = new Profile();
        user.setSeq(seq);
        user.setName(name);
        if (profile_image_url == null || "".equals(profile_image_url)) {
          user.setProfileUrl(defaultFileName);
        } else {
          StringTokenizer st = new StringTokenizer(profile_image_url, ".");
          st.nextToken();
          st.nextToken();
          st.nextToken();
          String img = UUID.randomUUID() + "." + st.nextToken();
          String OUTPUT_FILE_PATH = uploadPath + "profile/" + img;
          try (
              BufferedInputStream in =
                  new BufferedInputStream(new URL(profile_image_url).openStream());
              FileOutputStream fileOutputStream = new FileOutputStream(OUTPUT_FILE_PATH)) {
            byte dataBuffer[] = new byte[1024];
            int bytesRead;
            while ((bytesRead = in.read(dataBuffer, 0, 1024)) != -1) {
              fileOutputStream.write(dataBuffer, 0, bytesRead);
            }
            user.setProfileUrl("profile/" + img);
          } catch (IOException e) {
            e.printStackTrace();
            return null;
          }
        }

        MaxStoreId maxReviewId =
            maxStoreIdRepo.findById(new ObjectId("606ad4b5180a4b670d79d0a4")).get();

        user.setFriends(new ArrayList<ObjectId>());
        user.setSchedules(new ArrayList<ObjectId>());
        user.setReviewId(maxReviewId.getReviewIdMaxValue());
        userRepository.save(user);
        user = userRepository.findBySeq(seq);

        profile.setId(user.getId());
        profile.setUserSeq(user.getSeq());
        profile.setReviewId(maxReviewId.getReviewIdMaxValue());
        profile.setUserName(user.getName());
        profile.setUserProfileUrl(user.getProfileUrl());
        profileRepository.save(profile);

        Review review = new Review();
        review.setReviewId(maxReviewId.getReviewIdMaxValue());
        review.setScores(new HashMap<String, Integer>());
        reviewUpdateRepo.save(review);

        maxReviewId.setReviewIdMaxValue(maxReviewId.getReviewIdMaxValue() + 1);
        maxStoreIdRepo.save(maxReviewId);

      }

      // 로그인
      User user = userRepository.findBySeq(seq);

      UserResult userResult = new UserResult();
      userResult.setToken(jwtService.create(user.getSeq()));
      userResult.setProfileUrl(user.getProfileUrl());
      userResult.setName(user.getName());
      userResult.setSeq(seq);
      userResult.setReviewId(user.getReviewId());
      userResult.setId(user.getId());

      ArrayList<Profile> list = new ArrayList<Profile>();
      for (ObjectId id : user.getFriends()) {
        Profile profile = profileRepository.findById(id).orElse(null);
        if (profile == null)
          continue;
        list.add(profile);
      }

      userResult.setFriends(list);

      return userResult;

    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public User userInfo(int userSeq) {
    return userRepository.findBySeq(userSeq);
  }

  @Override
  public UserResult userInfoUpdate(int userSeq, User newUser, MultipartFile uploadFile) {
    // TODO Auto-generated method stub

    User user = userRepository.findBySeq(userSeq);
    Profile profile = profileRepository.findByUserSeq(userSeq);
    if (user == null || profile == null)
      return null;


    try {
      // 기본이미지로 변경
      if ("noImage".equals(newUser.getProfileUrl())) {

        if (!user.getProfileUrl().equals(defaultFileName)) {
          File deleteFile = new File(uploadPath + user.getProfileUrl());
          System.out.println("dpdpd,,,");
          if (deleteFile.exists() && !deleteFile.delete())
            return null;
        }

        user.setProfileUrl(defaultFileName);

      }

      // 새로운 이미지로 변경
      if (uploadFile != null && !uploadFile.isEmpty()) {
        File uploadDir = new File(uploadPath + "profile/");
        if (!uploadDir.exists())
          uploadDir.mkdir();

        // 기존 프로필 이미지가 기본 이미지가 아닐 경우 기존 사진 제거
        if (!user.getProfileUrl().equals(defaultFileName)) {
          File deleteFile = new File(uploadPath + user.getProfileUrl());
          if (deleteFile.exists() && !deleteFile.delete())
            return null;
        }

        // 새로운 프로필 이미지로 업데이트
        String fileName = uploadFile.getOriginalFilename();

        // Random Fild Id
        UUID uuid = UUID.randomUUID();

        // file extension
        String extension = FilenameUtils.getExtension(fileName);

        String savingFileName = uuid + "." + extension;
        File destFile = new File(uploadPath + "profile/" + savingFileName);
        uploadFile.transferTo(destFile);
        user.setProfileUrl("profile/" + savingFileName);
      }
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
      return null;
    }

    // 닉네임 변경
    user.setName(newUser.getName());

    // 친구 테이블의 데이터도 변경
    profile.setUserName(user.getName());
    profile.setUserProfileUrl(user.getProfileUrl());

    // 테이블 업데이트
    userRepository.save(user);
    profileRepository.save(profile);

    UserResult userResult = new UserResult();

    userResult.setToken(jwtService.create(user.getSeq()));
    userResult.setProfileUrl(user.getProfileUrl());
    userResult.setName(user.getName());
    userResult.setSeq(user.getSeq());
    userResult.setReviewId(user.getReviewId());
    userResult.setId(user.getId());

    ArrayList<Profile> list = new ArrayList<Profile>();
    for (ObjectId id : user.getFriends()) {
      Profile p = profileRepository.findById(id).orElse(null);
      if (p == null)
        continue;
      list.add(p);
    }

    userResult.setFriends(list);

    return userResult;
  }

  @Override
  public Profile addFriend(int userSeq, int code) {

    User user = userRepository.findBySeq(userSeq);
    Profile userProfile = profileRepository.findByUserSeq(userSeq);
    if (user == null || userProfile == null)
      return null;

    User friend = userRepository.findBySeq(code);
    Profile friendProfile = profileRepository.findByUserSeq(code);
    if (friend == null || friendProfile == null)
      return null;

    if (!user.getFriends().contains(friend.getId())) {
      user.getFriends().add(friend.getId());
      friend.getFriends().add(user.getId());

      userRepository.save(user);
      userRepository.save(friend);
    }

    return friendProfile;
  }

  @Override
  public List<Profile> deleteFriend(int userSeq, Integer code) {

    User user = userRepository.findBySeq(userSeq);
    Profile userProfile = profileRepository.findByUserSeq(userSeq);
    if (user == null || userProfile == null)
      return null;

    User friend = userRepository.findBySeq(code);
    Profile friendProfile = profileRepository.findByUserSeq(code);
    if (friend == null || friendProfile == null)
      return null;

    if (user.getFriends().contains(friend.getId())) {
      user.getFriends().remove(friend.getId());
      friend.getFriends().remove(user.getId());

      userRepository.save(user);
      userRepository.save(friend);
    }

    ArrayList<Profile> list = new ArrayList<Profile>();
    for (ObjectId id : user.getFriends()) {
      Profile profile = profileRepository.findById(id).orElse(null);
      if (profile == null)
        continue;
      list.add(profile);
    }

    return list;
  }

  @Override
  public String deleteUser(int userSeq) {

    User user = userRepository.findBySeq(userSeq);
    Profile profile = profileRepository.findByUserSeq(userSeq);

    if (user == null || profile == null)
      return "FAIL";

    ObjectId id = user.getId();

    // 친구들의 친구목록에서 삭제
    for (ObjectId friendId : user.getFriends()) {
      User friend = userRepository.findById(friendId).orElse(null);
      if (friend == null)
        continue;
      friend.getFriends().remove(id);
      userRepository.save(friend);
    }

    // Profile 테이블 지우기
    profileRepository.delete(profile);

    // User 테이블 지우기
    userRepository.delete(user);

    return "SUCCESS";
  }

}

