package com.ssafy.eatda.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import org.bson.types.ObjectId;

// ObjectId를 String으로 출력하기 위한 Custom Serializer
public class CustomObjectIdSerializer extends JsonSerializer<ObjectId> {

  @Override
  public void serialize(ObjectId id, JsonGenerator gen, SerializerProvider serializerProvider) throws IOException {
    gen.writeString(id.toString());
  }

}
