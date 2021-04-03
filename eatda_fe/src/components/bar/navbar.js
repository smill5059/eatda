import React from 'react';

import { useHistory } from "react-router";

const { Kakao } = window;

function Navbar() {
  const history = useHistory()

  function logoutWithKakao() {
    Kakao.API.request({
      url: '/v1/user/unlink',
      success: function(response) {
        console.log('성공', response);
        localStorage.removeItem('Kakao_token')
        history.push('/login')
      },
      fail: function(error) {
        console.log('실패', error);
      },
    });
  }

  function toProfile() {
    history.push('/profile')
  }

  return (
    <div className="navbar">
      <div className="logoutBtn" onClick={logoutWithKakao}>
        로그아웃
      </div>
      <div className="profileBtn" onClick={toProfile}>
        프로필
      </div>
    </div>
  )
}

export default Navbar;