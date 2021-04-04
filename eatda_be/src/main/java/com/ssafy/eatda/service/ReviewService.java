package com.ssafy.eatda.service;

import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.web.multipart.MultipartFile;
import com.ssafy.eatda.vo.Schedule;

public interface ReviewService {
  Schedule updateImg(ObjectId id, List<MultipartFile> updatedFiles, List<String> deletedFiles);

  Schedule updateComment(Schedule schedule);

  String uploadImg(ObjectId meetingId, List<MultipartFile> files);

  String deleteImgs(ObjectId meetingId, List<String> deletedUrls);
}
