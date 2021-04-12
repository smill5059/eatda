package com.ssafy.eatda.config;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.Getter;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Getter
@Service
@Primary
@Component
public class MattermostConfig {

  private String color = "#ff5d52";
  private String title = "";
  private String text = "";
  private String footer = LocalDateTime.now()
      .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
}
