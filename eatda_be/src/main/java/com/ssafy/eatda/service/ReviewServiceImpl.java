package com.ssafy.eatda.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.UUID;
import org.apache.commons.io.FilenameUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.ssafy.eatda.repository.GroupRepository;
import com.ssafy.eatda.repository.ReviewRepository;
import com.ssafy.eatda.repository.ReviewUpdateRepository;
import com.ssafy.eatda.repository.StoreRepository;
import com.ssafy.eatda.vo.Group;
import com.ssafy.eatda.vo.Review;
import com.ssafy.eatda.vo.Schedule;
import com.ssafy.eatda.vo.Score;
import com.ssafy.eatda.vo.Store;

@Service
public class ReviewServiceImpl implements ReviewService {

  @Autowired
  private ReviewRepository reviewRepo;
  @Autowired
  private ReviewUpdateRepository reviewUpdateRepo;
  @Autowired
  private GroupRepository groupoRepo;
  @Autowired
  private StoreRepository storeRepo;

  @Value("${resources.location}")
  private String filePath;

  @Override
  public Schedule updateImg(ObjectId id, List<MultipartFile> updatedFiles,
      List<String> deletedFiles) {
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

      // delete image
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

      // 점수 반영
      List<Score> scoreList = schedule.getScores();
      Collections.sort(scoreList, (Score s1, Score s2) -> s1.getUserSeq() - s2.getUserSeq());
      HashMap<String, int[]> map = new HashMap<String, int[]>();
      String groupId = "";
      for (Score score : scoreList) {
        Review review = reviewUpdateRepo.findByReviewId(score.getReviewId());
        if (review == null)
          return null;
        if (map.containsKey(score.getStoreId())) {
          map.put(score.getStoreId(), new int[] {map.get(score.getStoreId())[0] + 1,
              map.get(score.getStoreId())[1] + score.getRate()});
        } else {
          map.put(score.getStoreId(), new int[] {1, score.getRate()});
        }
        groupId += Integer.toString(score.getUserSeq());
        review.getScores().put(score.getStoreId(), score.getRate());
        reviewUpdateRepo.save(review);
      }

      // 가게 및 전체 그룹에 점수 반영
      Group group = groupoRepo.findByGroupId(groupId);
      if (group != null) {
        Review review = reviewUpdateRepo.findByReviewId(group.getReviewId());
        if (review == null)
          return null;
        for (Entry<String, int[]> entry : map.entrySet()) {
          review.getScores().put(entry.getKey(), entry.getValue()[1] / entry.getValue()[0]);
          Optional<Store> store = storeRepo.findByStoreId(entry.getKey());
          if (store.isPresent()) {
            float avgRate = store.get().getAvgRate();
            int cnt = store.get().getReviewCount();
            store.get()
                .setAvgRate(avgRate * cnt + entry.getValue()[1] / (cnt + entry.getValue()[0]));
            store.get().setReviewCount(cnt + entry.getValue()[0]);
            storeRepo.save(store.get());
          }
        }
        reviewUpdateRepo.save(review);
      } else {
        for (Entry<String, int[]> entry : map.entrySet()) {
          Optional<Store> store = storeRepo.findByStoreId(entry.getKey());
          if (store.isPresent()) {
            float avgRate = store.get().getAvgRate();
            int cnt = store.get().getReviewCount();
            store.get()
                .setAvgRate(avgRate * cnt + entry.getValue()[1] / (cnt + entry.getValue()[0]));
            store.get().setReviewCount(cnt + entry.getValue()[0]);
            storeRepo.save(store.get());
          }
        }
      }


      return reviewRepo.save(found.get());
    }
    return null;
  }

  @Override
  public String uploadImg(ObjectId meetingId, MultipartFile[] files) {

    Schedule schedule = reviewRepo.findById(meetingId).get();
    if (schedule == null) {
      return "No Valid meetingId";
    }

    try {
      List<String> newList = new ArrayList<String>();
      for (MultipartFile uploadFile : files) {
        // 새로운 리뷰이미지 업로드
        String fileName = uploadFile.getOriginalFilename();

        // Random Fild Id
        UUID uuid = UUID.randomUUID();

        // file extension
        String extension = FilenameUtils.getExtension(fileName);

        String savingFileName = uuid + "." + extension;
        File destFile = new File(filePath + "review/" + savingFileName);
        uploadFile.transferTo(destFile);

        // DB에 새 사진 저장
        newList.add("review/" + savingFileName);
      }
      newList.addAll(schedule.getImgs());

      schedule.setImgs(newList);
      reviewRepo.save(schedule);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
      return "FAIL";
    }

    return "SUCCESS";
  }

  @Override
  public String deleteImgs(ObjectId meetingId, List<String> deletedUrls) {

    Schedule schedule = reviewRepo.findById(meetingId).orElse(null);
    if (schedule == null) {
      return "No Valid meetingId";
    }

    try {

      for (String url : deletedUrls) {
        File deleteFile = new File(filePath + url);
        if (deleteFile.exists() && !deleteFile.delete()) {
          return "FAIL";
        }

        schedule.getImgs().remove(url);

      }

      reviewRepo.save(schedule);

    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
      return "FAIL";
    }
    return "SUCCESS";
  }

}
