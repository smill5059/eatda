package com.ssafy.eatda.handler;

import com.ssafy.eatda.util.NotificationManager;
import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.RestTemplate;

@ControllerAdvice
public class GlobalExceptionHandler {

  @Autowired
  private NotificationManager notificationMgr;

  @ExceptionHandler(Exception.class)
  public ResponseEntity globalException(Exception e, HttpServletRequest req) {
    e.printStackTrace();
    notificationMgr.sendMattermost(e, req.getRequestURI(), getParams(req));
    return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity wrongParamException(Exception e, HttpServletRequest req) {
    e.printStackTrace();
    notificationMgr.sendMattermost(e, req.getRequestURI(), getParams(req));
    return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
  }

  private String getParams(HttpServletRequest req) {
    StringBuilder sb = new StringBuilder();
    Enumeration<String> keys = req.getParameterNames();
    while (keys.hasMoreElements()) {
      String key = keys.nextElement();
      sb.append("- ").append(key).append(": ").append(req.getParameter(key)).append("\n");
    }
    return sb.toString();
  }

  @Bean
  public RestTemplate restTemplate(RestTemplateBuilder builder) {
    return builder.build();
  }
}
