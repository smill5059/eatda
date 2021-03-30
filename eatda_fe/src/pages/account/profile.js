import React from "react";
import { useSelector } from 'react-redux';
import { Image, Card, Modal, Menu, Dropdown, Button, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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


  // 친구 관리 -> 친구 삭제
  const { confirm } = Modal;
  function deleteFriend (key) {
    confirm({
      title: '친구 안 할거야? ㅠㅠ',
      icon: <ExclamationCircleOutlined />,
      content: '안 할 거냐구우',
      okText: '넹',
      okType: 'danger',
      cancelText: '앗 실수',
      onOk() {
        message.success(`${key.key} 절교`)
      },
      onCancel() {
        // message.success('절교')
      },
    })
  }

  // 친구 관리
  // function friendMenu(name) {
  //   const menu = (
  //     <Menu onClick={deleteFriend(name)}>
  //       <Menu.Item> 친구 끊기 </Menu.Item>
  //     </Menu>
  //   )
  // }
  const friendMenu = name => (
    <Menu>
      <Menu.Item key={name} onClick={deleteFriend}>
        { name } 친구 끊기
      </Menu.Item>
    </Menu>
  )


  // 유저 데이터
  const user = useSelector(state => state.userData)
  const friendList = user.friendList.map(friend =>
    <Card.Grid style={frdCard}>
      <div className="frdImg">
        <Image src={ friend.profileImg } />
      </div>
      <div className="frdName">
        { friend.name }
      </div>
      <Dropdown overlay={friendMenu(friend.name)} placement="bottomCenter" className="frdCtrl">
        <Button>관리</Button>
      </Dropdown>
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
