package com.ssafy.eatda.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class NotificationManager {

  @Autowired
  @Lazy
  private MattermostSender mattermostSdr;

  public void sendMattermost(Exception e, String uri, String params) {
    mattermostSdr.sendMessage(e, uri, params);
  }
}
