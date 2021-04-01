package com.ssafy.eatda.util;

import com.google.gson.Gson;
import com.ssafy.eatda.config.MattermostConfig;
import com.ssafy.eatda.vo.Mattermost.Attachment;
import com.ssafy.eatda.vo.Mattermost.Attachments;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class MattermostSender {

  @Value("${notification.mattermost.enabled}")
  private boolean enabled;
  @Value("${notification.mattermost.webhook-url}")
  private String webhookUrl;

  @Autowired
  private final RestTemplate restTemplate;
  private final MattermostConfig mattermostCfg;

  public void sendMessage(Exception e, String uri, String params) {
    if (!enabled) {
      return;
    }

    Attachment attachment = Attachment.builder()
        .color(mattermostCfg.getColor())
        .title(mattermostCfg.getTitle())
        .text(mattermostCfg.getText())
        .footer(mattermostCfg.getFooter())
        .build();
    attachment.addExceptionInfo(e, uri, params);
    Attachments attachments = new Attachments(attachment);
    attachments.addProps(e);

    String payload = new Gson().toJson(attachments);
    HttpHeaders headers = new HttpHeaders();
    headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

    HttpEntity<String> entity = new HttpEntity<>(payload, headers);
    restTemplate.postForEntity(webhookUrl, entity, String.class);
  }
}
