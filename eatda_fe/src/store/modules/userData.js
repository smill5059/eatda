import { createAction, handleActions } from 'redux-actions'
import profileUrl from 'assets/product/profileImg.jpg'

const user = {
  username: '밥버거',
  usercode: 12345,
  profileUrl: profileUrl
}

const userData = handleActions(
  {},
  user
)

export default userData;