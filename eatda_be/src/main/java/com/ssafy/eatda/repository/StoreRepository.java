package com.ssafy.eatda.repository;

import com.ssafy.eatda.vo.Store;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StoreRepository extends MongoRepository<Store, ObjectId> {
  Optional<Store> findByStoreId(String storeId);
}
