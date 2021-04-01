import { createAction, handleActions } from 'redux-actions'
import frdImg1 from 'assets/product/frdImg1.jpg'
import frdImg2 from 'assets/product/frdImg2.jpg'

const meetings = [
  {
    ImageUrl: frdImg1,
    meetingDate: '3일 전',
    meetingFriend: [
      '진라면',
      '김말이'
    ]
  },
  {
    ImageUrl: frdImg2,
    meetingDate: '일주일 전',
    meetingFriend: [
      '양꼬치',
      '고구마'
    ]
  }
]

const timelineData = handleActions(
  {},
  meetings
)

export default timelineData;