import React from "react";
import Logo from 'assets/product/logo.png';
import kakaoLogin from 'assets/product/kakaoLogin.png';
import { useHistory } from "react-router";

const { Kakao } = window;

function Login() {
  const history = useHistory()
  function loginWithKakao() {
    // Kakao.Auth.authorize({
    //   redirectUri: 'http://localhost:3000'
    // })

    Kakao.Auth.login({
      success: function(authObj) {
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response) {
            fetch(`${'sume_url'}/account/signinkakao`, {
              method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userId: response.id,
                  userName: response.kakao_account.profile.nickname,
                })
              })
            .then(res => res.json())
            .then(res => {
              localStorage.setItem('access-token', res.token)
              fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
                headers: {
                  token: localStorage.getItem('access-token')
                }
              })
              .then(res => res.json())
              .then(res =>
                ( res.store ) ? ( window.location.href = '/storeadmin' ) : ( window.location.href = '/profile' )      
              )  
            })
          },
        })
      },
      fail: function(err) {
        alert(JSON.stringify(err))
      }
    })
  }

  return (
    <div className="login">
      <img src={Logo} className="logoImg" />

      <img src={kakaoLogin} className="kakaoLogin" onClick={loginWithKakao} />
    </div>
  );
}

export default Login;
