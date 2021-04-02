import React, { useState } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Image, Card, Modal, Menu, Dropdown, Button, message, Input } from 'antd';
import { ExclamationCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';

import * as settingUser from 'store/modules/userData'

const SERVER_URL = process.env.REACT_APP_API_URL;

function Profile() {
  // 검색 input
  const { Search } = Input;

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
  const friendMenu = friend => (
    <Menu>
      <Menu.Item key={friend.seq} onClick={deleteFriend}>
        { friend.userName } 친구 끊기
      </Menu.Item>
    </Menu>
  )

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [code, setCode] = useState(0)

  const codeInput = value => { setCode(Number(value)) }

  // 친구 추가 Modal
  const showModal = () => { setVisible(true) }

  // 친구 추가하기
  const addFriend = () => {
    setLoading(true);
    console.log('친구 코드 : ', typeof code)
    console.log(localStorage.getItem('Kakao_token'))
    // 데이터 전송
    axios.put(`${SERVER_URL}/user/addfriend`, {'code': code}, {
      headers: {
        'token': localStorage.getItem('Kakao_token')
      }
    })
      .then(res => {
        console.log(res.data)
        settingUser.addFriend(res.data)
      })
      .catch(err => console.log(err))
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
    }, 2000);
  };

  const cancel = () => { setVisible(false) }
  
  // 유저 데이터
  const user = useSelector(state => state.userData)
  console.log(user)
  
  const friendList = user.friendList.map(friend =>
    <Card.Grid style={frdCard}>
      <div className="frdImg">
        <Image src={ friend.userProfileUrl } />
      </div>
      <div className="frdName">
        { friend.userName }
      </div>
      <Dropdown overlay={friendMenu(friend)} placement="bottomCenter" className="frdCtrl">
        <Button>관리</Button>
      </Dropdown>
    </Card.Grid>
  )

  const test = () => {
    settingUser.test(1)
    console.log(user.testNums)
  }

  return (
    <div className="contentWrapper">
      <div className="contentTitle">
        내 정보
        <div className="" onClick={test}>테스트</div>
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
            <PlusSquareOutlined style={{fontSize: 'larger', color: '#EFBF43'}} />
          </div>
          <Card className="frdList">
            { friendList }
          </Card>
        </div>
      </div>
      <Button type="primary" onClick={showModal}>
        친구 추가
      </Button>
      <Modal
        visible={visible}
        title="친구 찾기"
        onOk={addFriend}
        onCancel={cancel}
        footer={[
          <Button key="back" onClick={cancel}>
            돌아가기
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={addFriend}>
            친구 찾기
          </Button>
        ]}
      >
        <div className="">친구의 고유코드를 입력하세요!</div>
        <Search placeholder="친구 코드" type="number" allowClear onSearch={codeInput} style={{ width: 200 }} />
      </Modal>
    </div>
  );
}

export default Profile;
