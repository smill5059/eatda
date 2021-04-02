package com.ssafy.eatda.service;

import com.ssafy.eatda.vo.Schedule;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.web.multipart.MultipartFile;

public interface ReviewService {
  Schedule updateImg(ObjectId id, List<MultipartFile> updatedFiles, List<String> deletedFiles);
  Schedule updateComment(Schedule schedule);
}
