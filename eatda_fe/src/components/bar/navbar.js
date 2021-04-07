import React from 'react';
import { useHistory } from "react-router";
import { Button, Popover } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';


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

  const content = (
    <div>
      <div className="logoutBtn" onClick={logoutWithKakao}>
        로그아웃
      </div>
      <div className="profileBtn" onClick={toProfile}>
        프로필
      </div>
    </div>
  );

  return (
    <div className="navbar">
      { localStorage.getItem('Kakao_token') && 
        <Popover content={content} placement="bottomRight" trigger="click">
          <AppstoreOutlined className="navButton" />
        </Popover>
      }
    </div>
  )
}

export default Navbar;