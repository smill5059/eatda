package com.ssafy.eatda.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@EnableScheduling
@Component
public class Scheduler {

  @Autowired
  private RestTemplate restTemplate;

  @Scheduled(cron = "0 * * * * *")
  public void updateSimilarity() {
    HttpEntity<String> entity = new HttpEntity<>("");
    restTemplate.postForEntity("http://eatda.me:8000/similarity/", entity, String.class);
  }
}
