import React from "react";
import Logo from 'assets/product/logo.png';
import kakaoLogin from 'assets/product/kakaoLogin.png';
import { useHistory } from "react-router";

const { Kakao } = window;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Login() {
  const history = useHistory()
  function loginWithKakao() {
    // Kakao.Auth.authorize({
    //   redirectUri: 'http://localhost:3000'
    // })

    Kakao.Auth.login({
      success: function(obj) {
        fetch(`${SERVER_URL}/user/kakao/login`, {
          method: 'POST',
          body: JSON.stringify({
            access_token: obj.access_token
          })
        })
          .then(res => res.json())
          .then(res => {
            localStorage.setItem('Kakao_token', res.token);
            if (res.token) {
              console.log('로그인 성공')
              history.push('/')
            }
          })

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
