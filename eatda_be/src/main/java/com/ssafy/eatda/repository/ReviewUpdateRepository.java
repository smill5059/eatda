package com.ssafy.eatda.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ssafy.eatda.vo.Review;

public interface ReviewUpdateRepository extends MongoRepository<Review, ObjectId> {
  Review findByReviewId(int reviewId);
}
