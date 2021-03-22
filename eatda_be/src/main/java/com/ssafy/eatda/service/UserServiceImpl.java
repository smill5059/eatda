package com.ssafy.eatda.service;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.StringTokenizer;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
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
          user.setProfileUrl("logo.jpg");
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

}

