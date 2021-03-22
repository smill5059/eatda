package com.ssafy.eatda.repository;

import com.ssafy.eatda.vo.Schedule;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository extends MongoRepository<Schedule, ObjectId> {

}
