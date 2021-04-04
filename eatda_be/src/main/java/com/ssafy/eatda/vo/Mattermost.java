package com.ssafy.eatda.vo;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class Mattermost {

  @Getter
  @NoArgsConstructor
  public static class Props {

    private String card;

    public Props(Exception e) {
      StringBuilder sb = new StringBuilder();
      StringWriter sw = new StringWriter();

      e.printStackTrace(new PrintWriter(sw));
      sb.append("**Stack Trace**").append("\n\n");
      sb.append("```")
          .append(sw.toString().substring(0, Math.min(5500, sw.toString().length())) + "...")
          .append("\n\n");

      this.card = sb.toString();
    }
  }

  @Getter
  @AllArgsConstructor
  @Builder
  @ToString
  public static class Attachment {

    private String color;
    private String title;
    private String text;
    private String footer;

    public Attachment addExceptionInfo(Exception e, String uri, String params) {
      this.title = e.getClass().getSimpleName();
      StringBuilder sb = new StringBuilder(this.text);

//      sb.append("**Error Message**").append("\n\n");
      sb.append("```").append(e.getMessage()).append("\n\n");

//      sb.append("**Request URL**").append("\n\n");
//      sb.append(uri).append("\n\n");

//      sb.append("**Parameters**").append("\n\n");
//      sb.append(params).append("\n\n");

      this.text = sb.toString();
      return this;
    }
  }

  @Getter
  @NoArgsConstructor
  public static class Attachments {

    private Props props;
    private List<Attachment> attachments;

    public Attachments(Attachment attachment) {
      this.attachments = new ArrayList<>();
      this.attachments.add(attachment);
    }

    public void addProps(Exception e) {
      props = new Props(e);
    }
  }

}
