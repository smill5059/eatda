import React, { useState, useEffect, useCallback } from "react";
import Logo from 'assets/product/mainLogo.png';
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
  const dispatch = useDispatch()

  function loginWithKakao() {
    Kakao.Auth.login({
      success: function(obj) {
        // console.log(obj, SERVER_URL)
        localStorage.setItem("refresh_token", obj.refresh_token)
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
            console.log('로그인 결과1', res)
            dispatch(settingUser.setUser({ id: res.id, name: res.name, profileUrl: res.profileUrl, code: res.seq, friends: res.friends, reviewId: res.reviewId }))
            localStorage.setItem('Kakao_token', res.token);
            if (res.token) {
              window.location.href = '/'
              // 밑에 굳이 안해도 될 듯
              // 어차피 / 로 이동하면 실행됨
              console.log('로그인 성공')
              //   fetch(`${SERVER_URL}/main/schedules`, {
              //     headers: {
              //       token: res.token
              //     },
              //   })
              //     .then(res => res.json())
              //     .then(res => {
              //       console.log(res)
              //       history.push('/')
              //     })
            }
          })
        // .then((res) => {
        //   setMeetingData(data)
        // })
      },
      fail: function (err) {
        console.warn(JSON.stringify(err))
      }
    })
  }

  return (
    <div className="login">
      {/* <div className="phrase">
        기억할게 우리가 함께 먹던 그 시간
      </div> */}
      <div className="logoImg">
        <img src={Logo}/>
        <div className="intro">
          <p>너와 나를 밥으로 잇는</p>
          <p><span>EAT-Diary</span></p>
        </div>
        {/* <div className="loginInfo">
          <p>모바일 기기로 접속하지 않을 경우</p>
          <p>로그인 팝업이 작동하지 않을 수 있습니다.</p>
        </div> */}
      </div>
      <div className="kakaoLogin">
        <div>
          <img src={kakaoLogin} onClick={loginWithKakao} />
        </div>
      </div>
    </div>
  );
}

export default Login;
