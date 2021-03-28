import { combineReducers } from "redux";

import baseDate from "./baseDate";
import userData from "./userData";

export default combineReducers ({
  baseDate,
  userData
});