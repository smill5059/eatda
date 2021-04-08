import { createAction, handleActions } from 'redux-actions'

const SET_USER = 'userData/SET_USER';
const ADD_FRIEND = 'userData/ADD_FRIEND';
const DELETE_FRIEND = 'userData/DELETE_FRIEND'

export const setUser = createAction(SET_USER, data => ({userid: data.id, username: data.name, profileUrl: data.profileUrl, usercode: data.code, friends: data.friends, reviewId: data.reviewId}));
export const addFriend = createAction(ADD_FRIEND, data => data);
export const deleteFriend = createAction(DELETE_FRIEND, data => data);

const user = {
  userId: '',
  username: '',
  usercode: 0,
  profileUrl: '',
  friendList: [],
  reviewId: 0,
}

const userData = handleActions(
  {
    [SET_USER]: (state, action) => ({
      ...state,
      userId: action.payload.userid,
      username: action.payload.username,
      usercode: action.payload.usercode,
      profileUrl: 'https://eatda.me/app/files/' + action.payload.profileUrl,
      friendList: action.payload.friends.map(data => {
        const url = 'https://eatda.me/app/files/' + data.userProfileUrl
        let friend = Object.assign({}, data)
        friend.userProfileUrl = url
        return friend
      }),
      reviewId: action.payload.reviewId,
    }),
    [ADD_FRIEND]: (state, action) => ({
      ...state,
      friendList: state.friendList.concat(action.payload)
    }),
    [DELETE_FRIEND]: (state, action) => ({
      ...state,
      friendList: action.payload
    }),
  },
  user
)

export default userData;