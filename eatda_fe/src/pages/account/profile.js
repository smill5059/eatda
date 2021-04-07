import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Image, Card, Modal, Menu, Dropdown, Button, message, Input } from 'antd';
import { ExclamationCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';

import * as settingUser from 'store/modules/userData'

const SERVER_URL = process.env.REACT_APP_API_URL;

function Profile() {
  const { Kakao } = window;

  const dispatch = useDispatch()

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

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [code, setCode] = useState(0)

  const codeInput = value => setCode(Number(value))

  // 친구 추가 Modal
  const showModal = () => setVisible(true)
  const cancel = () => setVisible(false)

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
        setTimeout(() => {
          setLoading(false)
          setVisible(false)
          dispatch(settingUser.addFriend(res.data))
          codeInput(null)
        }, 2000)
      })
      // .then(res => {
      //   dispatch(settingUser.addFriend(res.data))
      // })
      .catch(err => console.log(err))
  };
  
  // 유저 데이터
  const user = useSelector(state => state.userData)
  console.log(user)

  // 친구 관리 -> 친구 삭제
  const { confirm } = Modal;
  function deleteFriend(friend) {
    confirm({
      // title: '친구 끊기',
      icon: <ExclamationCircleOutlined />,
      content: '친구를 끊으시겠습니까?',
      okText: '끊기',
      okType: 'danger',
      cancelText: '취소',
      onOk() {
        axios.delete(`${SERVER_URL}/user/deletefriend`, {
          headers: {
            'token': localStorage.getItem('Kakao_token')
          },
          data: {
            code: friend.userSeq
          }
        })
          .then(res => {
            dispatch(settingUser.deleteFriend(res.data))
            message.success(`${friend.userName} 절교`)
          })
          .catch(err => console.log(err))
      },
      onCancel() {
        // message.success('절교')
      },
    })
  }
  
  // useEffect(() => {
  //   inviteFriend();
  // }, [])

  // // 친구 초대
  // const inviteFriend = () => {
  //   // Kakao.API.request({
  //   //   url: '/v2/api/talk/memo/default/send',
  //   //   data: {
  //   //     template_object: {
  //   //       object_type: 'feed',
  //   //       content: {
  //   //         title: '제목',
  //   //         description: '설명',
  //   //         link: {
  //   //           web_url: 'https://eatda.me',
  //   //         },
  //   //       },
  //   //       button_title: '바로 확인',
  //   //     }
  //   //   },
  //   //   success: function(response) {
  //   //     console.log(response);
  //   //   },
  //   //   fail: function(error) {
  //   //     console.log(error);
  //   //     Kakao.Auth.authorize({
  //   //       redirectUri: 'http://localhost:3000/profile',
  //   //       scope: 'talk_message',
  //   //     });
  //   //   },
  //   // })
  //   Kakao.Link.createDefaultButton({
  //     container: '#kakao-link-btn',
  //     objectType: 'feed',
  //     content: {
  //       title: '디저트 사진',
  //       description: '아메리카노, 빵, 케익',
  //       imageUrl:
  //         'http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
  //       link: {
  //         mobileWebUrl: 'https://developers.kakao.com',
  //         androidExecParams: 'test',
  //       },
  //     },
  //     buttons: [
  //       {
  //         title: '웹으로 보기',
  //         link: {
  //           mobileWebUrl: 'https://developers.kakao.com',
  //           webUrl: 'https://developers.kakao.com'
  //         }
  //       },
  //       {
  //         title: '앱으로 보기',
  //         link: {
  //           mobileWebUrl: 'https://developers.kakao.com',
  //           webUrl: 'https://developers.kakao.com'
  //         }
  //       }
  //     ]
  //   });
  // }
  
  // 친구 관리
  const friendMenu = friend => (
    <Menu>
      <Menu.Item onClick={() => deleteFriend(friend)}>
        { friend.userName } 친구 끊기
      </Menu.Item>
    </Menu>
  )
  
  const friendList = user.friendList.map(friend =>
    <Card.Grid key={friend.userSeq} style={frdCard}>
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

          {/* <div className="" id="kakao_link_btn" onClick={inviteFriend()}>
            친구 초대
          </div> */}
          
          <div className="frdAddBtn">

            <PlusSquareOutlined style={{fontSize: 'larger', color: '#EFBF43'}} onClick={showModal} />
            <Modal
              visible={visible}
              title="새 친구 찾기"
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
              <div className="searchTitle">친구의 고유코드를 입력하세요!</div>
              <Search placeholder="친구 코드" type="number" allowClear onSearch={codeInput} className="searchFriend" />
            </Modal>
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
