package com.ssafy.eatda.repository;

import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ssafy.eatda.vo.Profile;

public interface ProfileRepository extends MongoRepository<Profile, ObjectId> {

  public Profile findByUserSeq(int userSeq);

  @Override
  public Optional<Profile> findById(ObjectId id);

}
