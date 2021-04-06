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
  const dispatch = useDispatch()

  function loginWithKakao() {
      Kakao.Auth.loginForm({
        success: function(obj) {
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
              // console.log('로그인 결과', res)
              dispatch(settingUser.setUser({id: res.id, name: res.name, code: res.seq, friends: res.friends, reviewId: res.reviewId}))
              localStorage.setItem('Kakao_token', res.token);
              if (res.token) {
                  history.push('/')
              }
            })
        },
        fail: function(err) {
          console.warn(JSON.stringify(err))
        }
      })
    // Kakao.Auth.login({
    //   success: function(obj) {
    //     fetch(`${SERVER_URL}/user/kakao/login`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         access_token: obj.access_token
    //       })
    //     })
    //       .then(res => res.json())
    //       .then(res => {
    //         // console.log('로그인 결과', res)
    //         dispatch(settingUser.setUser({id: res.id, name: res.name, code: res.seq, friends: res.friends, reviewId: res.reviewId}))
    //         localStorage.setItem('Kakao_token', res.token);
    //         if (res.token) {
    //             history.push('/')
    //         }
    //       })
    //   },
    //   fail: function(err) {
    //     console.warn(JSON.stringify(err))
    //   }
    // })
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
