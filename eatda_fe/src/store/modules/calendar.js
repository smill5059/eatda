import { createAction, handleActions } from "redux-actions";
import moment from "moment";

const BASE_DATE = "calendar/BASE_DATE";

export const changeBaseDate = createAction(BASE_DATE, (date) => date);

const initialState = {
  baseDate: moment(),
}

export default handleActions(
  {
    [BASE_DATE]: (state, action) => ({
      ...state,
      baseDate: action.payload, 
    })
  },
  initialState
);