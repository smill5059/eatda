import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import baseDate from "./baseDate";
import userData from "./userData";
import meetingData from "./meetingData";
const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  baseDate,
  userData,
  meetingData,
});

export default persistReducer(persistConfig, rootReducer);