# A103 잇다eat-diary


### 프로젝트 소개

---

사람들은 함께 먹었던 밥으로 그날을 기억하곤 합니다. 잇다이어리는 밥약속을 기록하고 기억하는 다이어리입니다.
함께한 날을 더욱 선명히 기억하도록 잇다이어리를 이용해보세요! 

[팀 노션 바로가기](https://www.notion.so/6459b67ca22b4cfeaacf770a6be47e16)


### 코드 실행 방법

---

- 프론트엔드 .env 파일 생성

  ```
  REACT_APP_API_URL={uri}
  REACT_APP_KAKAO_MAP_KEY={kakao map key}
  REACT_APP_KAKAO_API_KEY={kakao api key}
  ```

- 프론트엔드 빌드

  ```
  npm install
  npm start
  ```

- 장고 빌드

  ```
  pip install -r requirements
  python manage.py runserver
  ```

- 스프링 application.properties 파일 생성

  ```
  ## MongoDB Config ##
  spring.data.mongodb.uri={uri}
  spring.data.mongodb.database={database}
  spring.data.mongodb.username={username}
  spring.data.mongodb.password={password}
  
  spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
  
  server.port=8081
  
  #JWT
  JWT.ISSUER={jwt issuer}
  JWT.SECRET={jwt secret}
  
  #Kakao
  Kakao.APP_REST_API_KEY={rest api key}
  Kakao.REDIRECT_URI={redirect uri}
  
  #MatterMost
  notification.mattermost.enabled=true
  notification.mattermost.webhook-url={mattermost webhook url}
  
  #file
  resources.location=/home/ubuntu/files/
  resources.uri_path=files/**
  ```



### 팀원 소개

---

- __정수림__ - PM, backend - @smill5059
- __구본혁__ - frontend - @qhsgur0126
- __송지은__ - backend - @wldms9604
- __이준희__ - frontend - @jhlee9091
- __조단원__ - frontend - @chloe
