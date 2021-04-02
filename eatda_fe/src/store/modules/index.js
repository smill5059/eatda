import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import baseDate from "./baseDate";
import userData from "./userData";
import meetingData from "./meetingData";
import timelineData from "./timelineData";
const persistConfig = {
  key: "root",
  storage
};

// export default combineReducers({
//   baseDate,
//   userData,
//   timelineData,
// });

const rootReducer = combineReducers({
  baseDate,
  userData,
  meetingData,
  timelineData,
});

export default persistReducer(persistConfig, rootReducer);