import React, { useState, useEffect, useCallback } from "react";
import Logo from 'assets/product/logo.png';
import kakaoLogin from 'assets/product/kakaoLogin.png';
import { useHistory } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import * as settingUser from 'store/modules/userData';
// import * as settingMeetingData from 'store/modules/meetingData';

const { Kakao } = window;
const SERVER_URL = process.env.REACT_APP_API_URL;

function Login() {
  const history = useHistory()

  const user = useSelector(state => state.userData)
  const dispatch = useDispatch();

  // const setUser = useCallback(
  //   () => dispatch()
  // )

  /* 로그인 성공시 redux store로 dispatch 할 내용물 */
  // const meetingData = useSelector(state => state.meetingData)

  //   const [ data, setData ] = useState({});
  
  //   useEffect(() => {
  //     fetch(`${process.env.REACT_APP_API_URL}/main/timeline`, {
  //       headers : {
  //         'token': localStorage.getItem('Kakao_token'),
  //         // 'Content-Type': 'application/json',
  //       }
  //     })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("타임라인 데이터가 받아져야되는데", res)
  //     })
  //     .then((response) => {
  //       console.log("불러온 전체 미팅", response)
  //       setData(response)
  //     })
  //   },[]);


  // const setMeetingData = useCallback((data) => {
  //   dispatch(settingMeetingData.meetingData(data));
  // }, [dispatch])


  function loginWithKakao() {
    Kakao.Auth.login({
      success: function(obj) {
        // console.log(obj, SERVER_URL)
        fetch(`${SERVER_URL}/user/kakao/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            access_token: obj.access_token
          })
        })
          .then(res => res.json())
          .then(res => {
            console.log('로그인 결과', res)
            console.log(settingUser.setUser)
            dispatch(settingUser.setUser({name: res.name, code: res.seq}))
            localStorage.setItem('Kakao_token', res.token);
            if (res.token) {
              console.log('로그인 성공')
              history.push('/profile')
            }
          })
            // .then((res) => {
            //   setMeetingData(data)
            // })
      },
      fail: function(err) {
        console.warn(JSON.stringify(err))
      }
    })
  }

  return (
    <div className="login">
      <div className="phrase">
        기억할게 우리가 함께 먹던 그 시간
      </div>

      <img src={Logo} className="logoImg" />
      
      <img src={kakaoLogin} className="kakaoLogin" onClick={loginWithKakao} />

    </div>
  );
}

export default Login;
