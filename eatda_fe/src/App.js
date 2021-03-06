import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Layout from "./pages/layout/layout";
import Main from "./pages/main/main";
import Login from "./pages/main/login";
import Profile from "./pages/account/profile";
// 약속 생성
import CreateModify from "./pages/meeting/createModify";
// 약속 보기
import MeetingRead from "./pages/meeting/read";
// 약속 수정 및 기록 남기기
import PhotoUpdate from "./pages/meeting/photoUpdate";
// 후기 작성 및 수정
import MemoUpdate from "./pages/meeting/memoUpdate";

import Navbar from "components/bar/navbar";
import PrivateRoute from 'helpers/privateRoute';

import MobilePlz from 'assets/product/mobilePlz.png'

import "./App.css";

const { Kakao } = window;
let id
window.addEventListener('resize', function(event){
    
    clearTimeout(id)
    // setTimeout(window.location.reload(), 30000)
    id = setTimeout(window.location.reload(), 1000)
})

function App() {
    // console.log(localStorage.getItem('Kakao_token'))

    if (localStorage.getItem('Kakao_token') === null){
        localStorage.setItem('Kakao_token', "")
        window.location.href = '/login'
    }

  if (window.innerWidth > 600 && window.location.href.indexOf('/login') < 0){
    
      return(
          <div className="toMobile" style={{backgroundImage:`url(${MobilePlz})`}}>
          </div>
      )
  }
  
  return (
    <BrowserRouter>
      <div className="Layout">
        <div className="Nav">
          <Navbar />
        </div>
        <div className="Content">
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Main} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/createMeeting" component={CreateModify} />
            <PrivateRoute
              exact
              path="/updateMeeting/:meetingId"
              component={CreateModify}
            />
            <PrivateRoute
              path="/updateMeeting/:meetingId/photoUpdate"
              component={PhotoUpdate}
            />
            <PrivateRoute
              path="/updateMeeting/:meetingId/memoUpdate"
              component={MemoUpdate}
            />
            <PrivateRoute path="/meeting/:meetingId" component={MeetingRead} />
          </Switch>
        </div>
        <div className="Footer"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
