package com.ssafy.eatda.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ssafy.eatda.vo.MaxStoreId;

public interface MaxStoreIdRepository extends MongoRepository<MaxStoreId, ObjectId> {

}
