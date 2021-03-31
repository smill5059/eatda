import React from "react";
import { Route, BrowserRouter, Switch, } from "react-router-dom";
import Layout from './pages/layout/layout';
import Main from './pages/main/main';
import Login from './pages/main/login';
import Profile from './pages/account/profile';
// 약속 생성
import CreateModify from './pages/meeting/createModify';
// 약속 보기
import MeetingRead from './pages/meeting/read'

import './App.css';

import { useHistory } from "react-router";

const { Kakao } = window;

function App() {
  const history = useHistory()

  function logoutWithKakao() {
    Kakao.API.request({
      url: '/v1/user/unlink',
      success: function(response) {
        console.log('성공', response);
        // history.push('/login')
      },
      fail: function(error) {
        console.log('실패', error);
      },
    });
  }

  return (
    <BrowserRouter>
      <div className="Layout">
        <div className="Nav">
          <div className="logoutBtn" onClick={logoutWithKakao}>
            로그아웃
          </div>
        </div>
        <div className="Content">
          <Switch>
            {/* <Route path="/" component={Layout} /> */}
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/createMeeting" component={CreateModify}/>
            <Route path="/updateMeeting/:meetingId" component={CreateModify}/>
            <Route path="/meeting/:meetingId" component={MeetingRead}/>
          </Switch>
        </div>
        <div className="Footer">
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
