import { combineReducers } from "redux";

import baseDate from "./baseDate";
import userData from "./userData";
import meetingData from "./meetingData";
import timelineData from "./timelineData";

export default combineReducers ({
  baseDate,
  userData,
  meetingData,
  timelineData,
});