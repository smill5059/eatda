import React from "react";
import { Route, BrowserRouter, Switch, } from "react-router-dom";

import Layout from './pages/layout/layout';
import Main from './pages/main/main';
// 약속 생성
import CreateModify from './pages/meeting/createModify';

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
          </Switch>
        </div>
        <div className="Footer">
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
