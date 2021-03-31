import { createAction, handleActions } from 'redux-actions'
import profileUrl from 'assets/product/profileImg.jpg'
import frdImg1 from 'assets/product/frdImg1.jpg'
import frdImg2 from 'assets/product/frdImg2.jpg'
import frdImg3 from 'assets/product/frdImg3.jpg'

const SET_USER = 'userData/SET_USER';

export const setUser = createAction(SET_USER, data => ({username: data.name, usercode: data.code}));

const user = {
  username: '',
  usercode: 0,
  profileUrl: profileUrl,
  friendList: [
    {
      name: '산딸기',
      profileImg: frdImg1
    },
    {
      name: '오렌지',
      profileImg: frdImg2
    },
    {
      name: '청포도',
      profileImg: frdImg3
    },
  ]
}

const userData = handleActions(
  {
    [SET_USER]: (state, action) => ({
      ...state,
      username: action.payload.username,
      usercode: action.payload.usercode
    })
  },
  user
)

export default userData;