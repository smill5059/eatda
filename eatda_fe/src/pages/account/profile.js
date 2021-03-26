import React from "react";
import { useSelector } from 'react-redux';
import { Image, Card } from 'antd';

function Profile() {
  // 친구목록 카드 CSS
  const frdCard = {
    width: 'inherit',
    float: 'initial',
    padding: '1rem',
    margin: '1rem',
    display: 'grid',
    'grid-template-columns': 'repeat(8, 1fr)',
    'background-color': 'antiquewhite'
  }


  // 유저 데이터
  const user = useSelector(state => state.userData)
  const friendList = user.friendList.map(friend =>
    <Card.Grid style={frdCard}>
      <div className="frdImg">
        <Image src={ friend.profileImg }/>
      </div>
      <div className="frdName">
        { friend.name }
      </div>
    </Card.Grid>
  )
  

  return (
    <div className="contentWrapper">
      <div className="contentTitle">
        내 정보
      </div>
      <div className="profileBody">
        <div className="profileBox">
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
        <div className="friendBox">
          <div className="frdTitle">
            나의 친구 목록
          </div>
          <div className="frdAddBtn">
            친구 추가
          </div>
          <Card className="frdList">
            { friendList }
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
