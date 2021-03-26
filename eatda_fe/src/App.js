import React from "react";
import { Route, BrowserRouter, Switch, } from "react-router-dom";
import Layout from './pages/layout/layout';
import Main from './pages/main/main';
// 약속 생성
import CreateModify from './pages/meeting/createModify';
// 약속 보기
import MeetingRead from './pages/meeting/read'

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
