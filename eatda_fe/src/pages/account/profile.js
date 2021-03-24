import React from "react";
// import './App.css';

function App() {
  return (
    <div className="contentWrapper">
      <div className="contentTitle">
        내 정보
      </div>
      <div className="profileBody">
        <div className="profileBox sizing">
          <div className="sizing usrImg"></div>
          <div className="sizing usrName"></div>
          <div className="sizing usrCode"></div>
        </div>
        <div className="friendBox sizing">
          <div className="sizing frdTitle"></div>
          <div className="sizing frdAddBtn"></div>
          <div className="sizing frdList">
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
