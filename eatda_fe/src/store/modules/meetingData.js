import { createAction, handleActions } from "redux-actions";

/* 현재 user 의 meeting data 불러오기 */


const MEETING_DATA = "meetingData/MEETING_DATA";

export const meetingData = createAction(MEETING_DATA);

const initialState = {
  meeting: {}
}

export default handleActions(
  {
    [MEETING_DATA]: (state) => ({
      ...state,
    })
  },
  initialState
);