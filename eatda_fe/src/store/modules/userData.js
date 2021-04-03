import { createAction, handleActions } from 'redux-actions'
import profileUrl from 'assets/product/profileImg.jpg'
import { act } from '@testing-library/react';

const SET_USER = 'userData/SET_USER';
const ADD_FRIEND = 'userData/ADD_FRIEND';
const TEST = 'userData/TEST';

export const setUser = createAction(SET_USER, data => ({username: data.name, usercode: data.code, friends: data.friends}));
export const addFriend = createAction(ADD_FRIEND, data => data)

const user = {
  username: '',
  usercode: 0,
  profileUrl: profileUrl,
  friendList: []
}

// Object.assign(state.friendList, )

const userData = handleActions(
  {
    [SET_USER]: (state, action) => ({
      ...state,
      username: action.payload.username,
      usercode: action.payload.usercode,
      friendList: action.payload.friends
      // friendList: action.payload.friends.map(function(friend) {
      //   let obj = {};
      //   obj[]
      // })
    }),
    [ADD_FRIEND]: (state, action) => ({
      ...state,
      friendList: state.friendList.concat(action.payload)
    })
  },
  user
)

export default userData;