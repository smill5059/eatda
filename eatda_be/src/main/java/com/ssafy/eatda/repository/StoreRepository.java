package com.ssafy.eatda.repository;

import java.util.ArrayList;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ssafy.eatda.vo.Store;

public interface StoreRepository extends MongoRepository<Store, ObjectId> {
  Optional<Store> findByStoreId(String storeId);

  ArrayList<Store> findByStoreNameAndStoreAddress(String storeName, String storeAddress);
}
