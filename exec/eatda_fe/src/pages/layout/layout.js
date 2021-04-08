import React from "react";
import { Button } from 'antd';

function Layout() {
  return (
    <div className="contentWrapper">
      <div className="contentTitle">
        여기는 제목입니다
      </div>
      <div className="contentBody">
        본문 내용은 여기에 넣어주세요!
        <Button> 버튼입니당 </Button>
      </div>
    </div>
  );
}

export default Layout;
