import React from 'react';
import { useHistory } from "react-router";
import { Button, Popover } from 'antd';
import Logo from 'assets/product/navbar_logo.png'
import { MenuOutlined } from '@ant-design/icons';


const { Kakao } = window;

function Navbar() {
  const history = useHistory()

  function logoutWithKakao() {
    Kakao.API.request({
      url: '/v1/user/unlink',
      success: function (response) {
        console.log('성공', response);
        localStorage.removeItem('Kakao_token')
        localStorage.removeItem('refresh_token')
        history.push('/login')
      },
      fail: function (error) {
        console.log('실패', error);
        localStorage.removeItem('Kakao_token')
        localStorage.removeItem('refresh_token')
        history.push('/login')
      },
    });
  }

  function toProfile() {
    history.push('/profile')
  }

  const content = (
    <div>
      <div className="profileBtn" onClick={toProfile}>
        프로필
      </div>
      <div className="logoutBtn" onClick={logoutWithKakao}>
        로그아웃
      </div>
    </div>
  );

  return (
    <div className="navbar">
      { localStorage.getItem('Kakao_token') &&      
        <div className="navbarLogo" onClick={(e)=>window.location.href="/"}>
            <img src={Logo}/>
        </div>
      }
      { localStorage.getItem('Kakao_token') &&
        <Popover content={content} placement="bottomRight" trigger="click">
          <MenuOutlined className="navButton" />
        </Popover>
      }
    </div>
  )
}

export default Navbar;