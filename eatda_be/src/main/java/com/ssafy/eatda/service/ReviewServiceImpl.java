package com.ssafy.eatda.service;

import com.ssafy.eatda.repository.ReviewRepository;
import com.ssafy.eatda.vo.Schedule;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.apache.commons.io.FilenameUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ReviewServiceImpl implements ReviewService {

  @Autowired
  private ReviewRepository reviewRepo;

  @Value("${resources.location}")
  private String filePath;

  @Override
  public Schedule updateImg(ObjectId id, List<MultipartFile> updatedFiles, List<String> deletedFiles) {
    Optional<Schedule> found = reviewRepo.findById(id);
    if (found.isPresent()) {
      List<String> imgs = found.get().getImgs();

      // upload image
      if (!updatedFiles.isEmpty()) {
        for (MultipartFile f : updatedFiles) {
          try {
            String fileName =
                UUID.randomUUID() + "." + FilenameUtils.getExtension(f.getOriginalFilename());
            String url = filePath + "review/" + fileName;

            File updateImage = new File(url);
            f.transferTo(updateImage);
            imgs.add(url);
          } catch (IOException e) {
            e.printStackTrace();
            return null;
          }
        }
      }

      //delete image
      if (!deletedFiles.isEmpty()) {
        for (String u : deletedFiles) {
          File deleteFile = new File(u);
          deleteFile.delete();
          imgs.remove(u);
        }
      }

      found.get().setImgs(imgs);
      return reviewRepo.save(found.get());
    }
    return null;
  }

  @Override
  public Schedule updateComment(Schedule schedule) {
    Optional<Schedule> found = reviewRepo.findById(schedule.getId());
    if (found.isPresent()) {
      found.get().setComments(schedule.getComments());
      found.get().setScores(schedule.getScores());
      return reviewRepo.save(found.get());
    }
    return null;
  }

}
