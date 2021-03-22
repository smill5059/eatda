package com.ssafy.eatda.service;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.StringTokenizer;
import java.util.UUID;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.eatda.repository.UserRepository;
import com.ssafy.eatda.vo.User;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtService jwtService;

  @Value("${Kakao.APP_REST_API_KEY}")
  private String APP_REST_API_KEY;

  @Value("${Kakao.REDIRECT_URI}")
  private String REDIRECT_URI;

  @Value("${resources.location}")
  private String uploadPath;

  private String defaultFileName = "logo.jpg";

  @Override
  public String getToken(String access_token) {
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
        user.setSeq(seq);
        user.setName(name);
        if (profile_image_url == null || "".equals(profile_image_url)) {
          user.setProfileUrl("profile/" + defaultFileName);
        } else {
          StringTokenizer st = new StringTokenizer(profile_image_url, ".");
          st.nextToken();
          st.nextToken();
          st.nextToken();
          String img = UUID.randomUUID() + "." + st.nextToken();
          String OUTPUT_FILE_PATH = uploadPath + img;
          try (
              BufferedInputStream in =
                  new BufferedInputStream(new URL(profile_image_url).openStream());
              FileOutputStream fileOutputStream = new FileOutputStream(OUTPUT_FILE_PATH)) {
            byte dataBuffer[] = new byte[1024];
            int bytesRead;
            while ((bytesRead = in.read(dataBuffer, 0, 1024)) != -1) {
              fileOutputStream.write(dataBuffer, 0, bytesRead);
            }
            user.setProfileUrl(img);
          } catch (IOException e) {
            e.printStackTrace();
          }
        }
        userRepository.save(user);
      }

      // 로그인
      User user = userRepository.findBySeq(seq);
      return jwtService.create(user.getSeq());


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
  public User userInfoUpdate(int userSeq, User newUser, MultipartFile uploadFile) {
    // TODO Auto-generated method stub

    User user = userRepository.findBySeq(userSeq);
    if (user == null)
      return null;


    try {
      // 기본이미지로 변경
      if ("noImage".equals(newUser.getProfileUrl())) {

        if (!user.getProfileUrl().equals(defaultFileName)) {
          File deleteFile = new File(uploadPath + user.getProfileUrl());
          if (deleteFile.exists() && !deleteFile.delete())
            return user;
        }
        user.setProfileUrl("profile/" + defaultFileName);

      }

      // 새로운 이미지로 변경
      if (uploadFile != null && !uploadFile.isEmpty()) {
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists())
          uploadDir.mkdir();

        // 기존 프로필 이미지가 기본 이미지가 아닐 경우 기존 사진 제거
        if (!user.getProfileUrl().equals(defaultFileName)) {
          File deleteFile = new File(uploadPath + user.getProfileUrl());
          if (deleteFile.exists() && !deleteFile.delete())
            return user;
        }

        // 새로운 프로필 이미지로 업데이트
        String fileName = uploadFile.getOriginalFilename();

        // Random Fild Id
        UUID uuid = UUID.randomUUID();

        // file extension
        String extension = FilenameUtils.getExtension(fileName);

        String savingFileName = uuid + "." + extension;
        File destFile = new File(uploadPath + savingFileName);
        uploadFile.transferTo(destFile);
        user.setProfileUrl("profile/" + savingFileName);
      }
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
      user.setName("dpdpdpd,,,");
      return user;
    }

    // 닉네임 변경
    user.setName(newUser.getName());

    // 테이블 업데이트
    userRepository.save(user);

    return user;
  }

}

