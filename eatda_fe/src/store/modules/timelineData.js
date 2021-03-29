import { createAction, handleActions } from 'redux-actions'

const meetings = [
  {
    ImageUrl: '',
    meetingDate: '3일 전',
    meetingFriend: [
      '진라면',
      '김말이'
    ]
  },
  {
    ImageUrl: '',
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