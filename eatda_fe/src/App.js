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
// 약속 수정 및 기록 남기기
import PhotoUpdate from './pages/meeting/photoUpdate';


import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="Layout">
        <div className="Nav">
        </div>
        <div className="Content">
          <Switch>
            {/* <Route path="/" component={Layout} /> */}
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/createMeeting" component={CreateModify}/>
            <Route exact path="/updateMeeting/:meetingId" component={CreateModify}/>
            <Route path="/updateMeeting/:meetingId/photoUpdate" component={PhotoUpdate}/>
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
