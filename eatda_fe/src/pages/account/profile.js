import React from "react";
import { useSelector } from 'react-redux';
import { Image, Card } from 'antd';

function Profile() {
  const user = useSelector(state => state.userData)

  return (
    <div className="contentWrapper">
      <div className="contentTitle">
        내 정보
      </div>
      <div className="profileBody">
        <div className="profileBox sizing">
          <div className="usrImg">
            <Image src={ user.profileUrl } />
          </div>
          <div className="usrName">
            {user.username}
          </div>
          <div className="usrCode">
            # {user.usercode}
          </div>
        </div>
        <div className="friendBox sizing">
          <div className="sizing frdTitle">
            나의 친구 목록
          </div>
          <div className="sizing frdAddBtn">
            친구 추가
          </div>
          {/* <div className="sizing frdList"></div> */}
          <Card className="frdList">
            <Card.Grid> 친구 이름 </Card.Grid>
            <Card.Grid> 친구 이름 </Card.Grid>
            <Card.Grid> 친구 이름 </Card.Grid>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
