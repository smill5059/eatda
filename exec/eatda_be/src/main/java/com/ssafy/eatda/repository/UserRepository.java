package com.ssafy.eatda.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ssafy.eatda.vo.User;

public interface UserRepository extends MongoRepository<User, ObjectId> {

  public User findBySeq(int seq);

}
