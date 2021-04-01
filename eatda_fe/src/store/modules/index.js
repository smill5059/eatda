import { combineReducers } from "redux";

import baseDate from "./baseDate";
import userData from "./userData";
import timelineData from "./timelineData";

export default combineReducers ({
  baseDate,
  userData,
  timelineData,
});