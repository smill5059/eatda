package com.ssafy.eatda.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ssafy.eatda.vo.Group;

public interface GroupRepository extends MongoRepository<Group, ObjectId> {
  Group findByGroupId(String groupId);
}
