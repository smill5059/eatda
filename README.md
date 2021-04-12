# A103 잇다eat-diary


### 프로젝트 소개

---

사람들은 함께 먹었던 밥으로 그날을 기억하곤 합니다. 잇다이어리는 밥약속을 기록하고 기억하는 다이어리입니다.
함께한 날을 더욱 선명히 기억하도록 잇다이어리를 이용해보세요! 

[링크]: https://www.notion.so/6459b67ca22b4cfeaacf770a6be47e16


### 코드 실행 방법

---

- 프론트엔드 .env 파일 생성

  ```
  REACT_APP_API_URL=http://eatda.me:8080/app
  REACT_APP_KAKAO_MAP_KEY=83785c478d05854a2b908f95ba035b78
  REACT_APP_KAKAO_API_KEY=a56629054e548a02152dbbfcc5df9e7f
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
  spring.data.mongodb.uri=mongodb://j4a103.p.ssafy.io:27017
  spring.data.mongodb.database=eatda
  spring.data.mongodb.username=eatdaAdmin
  spring.data.mongodb.password=a103qhsgurwldmswnsgmltnflaeksdnjsa103
  
  spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
  
  server.port=8081
  
  #JWT
  JWT.ISSUER=A103
  JWT.SECRET=fkdlffkrchlrh
  
  #Kakao
  Kakao.APP_REST_API_KEY=a56629054e548a02152dbbfcc5df9e7f
  Kakao.REDIRECT_URI=http://localhost:8081/user/kakao/login
  
  #MatterMost
  notification.mattermost.enabled=true
  notification.mattermost.webhook-url=https://meeting.ssafy.com/hooks/oaa6khzehib3jbuio1rrow19er
  
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
