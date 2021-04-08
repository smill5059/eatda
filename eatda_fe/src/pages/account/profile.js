import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Image,
  Card,
  Modal,
  Menu,
  Dropdown,
  Button,
  message,
  Input,
  Row,
  Form,
  Upload,
} from "antd";
import {
  ExclamationCircleOutlined,
  PlusSquareOutlined,
  InboxOutlined,
} from "@ant-design/icons";

import * as settingUser from "store/modules/userData";

const SERVER_URL = process.env.REACT_APP_API_URL;

function Profile() {
  const { Kakao } = window;

  const dispatch = useDispatch();

  // 검색 input
  const { Search } = Input;

  // 친구목록 카드 CSS
  // const frdCard = {
  //   width: "inherit",
  //   // heigt: "50vh",
  //   float: "initial",
  //   padding: "1rem",
  //   margin: "1rem",
  //   display: "grid",
  //   gridTemplateColumns: "repeat(8, 1fr)",
  //   // backgroundColor: "antiquewhite",
  // };

  // 유저 데이터
  const user = useSelector((state) => state.userData);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(`${user.profileUrl}`);
  const [newUserName, setNewUserName] = useState(`${user.username}`);
  const [inputFile, setInputFile] = useState("");
  // 리액트에서 폼 세팅
  const [editForm] = Form.useForm();

  const [code, setCode] = useState(0);

  const codeInput = (value) => setCode(Number(value));

  // 친구 추가 Modal
  const showModal = () => setVisible(true);
  const cancel = () => setVisible(false);

  // 친구 추가하기
  const addFriend = () => {
    setLoading(true);
    console.log("친구 코드 : ", typeof code);
    console.log(localStorage.getItem("Kakao_token"));
    // 데이터 전송
    axios
      .put(
        `${SERVER_URL}/user/addfriend`,
        { code: code },
        {
          headers: {
            token: localStorage.getItem("Kakao_token"),
          },
        }
      )
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          setVisible(false);
          dispatch(settingUser.addFriend(res.data));
          codeInput(null);
        }, 2000);
      })
      // .then(res => {
      //   dispatch(settingUser.addFriend(res.data))
      // })
      .catch((err) => console.log(err));
  };

  // 친구 관리 -> 친구 삭제
  const { confirm } = Modal;
  function deleteFriend(friend) {
    confirm({
      // title: '친구 끊기',
      icon: <ExclamationCircleOutlined />,
      content: "친구를 끊으시겠습니까?",
      okText: "끊기",
      okType: "danger",
      cancelText: "취소",
      onOk() {
        axios
          .delete(`${SERVER_URL}/user/deletefriend`, {
            headers: {
              token: localStorage.getItem("Kakao_token"),
            },
            data: {
              code: friend.userSeq,
            },
          })
          .then((res) => {
            dispatch(settingUser.deleteFriend(res.data));
            message.success(`${friend.userName} 절교`);
          })
          .catch((err) => console.log(err));
      },
      onCancel() {
        // message.success('절교')
      },
    });
  }

  useEffect(() => {
    inviteFriend();
  }, [])

  // 친구 초대
  const inviteFriend = () => {
    Kakao.Link.createDefaultButton({
      container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: '잇다eat-diary',
        description: '너와 나를 잇는 다이어리, 잇다이어리에 초대합니다.',
        imageUrl:
          'http://eatda.me/app/files/eatda(2).png',
        link: {
          mobileWebUrl: 'https://eatda.me',
          androidExecParams: 'test',
        },
      },
      buttons: [
        {
          title: '가입하러 가기',
          link: {
            mobileWebUrl: 'https://eatda.me',
            webUrl: 'https://eatda.me'
          }
        },
      ]
    });
  }

  // 친구 관리
  const friendMenu = (friend) => (
    <Menu>
      <Menu.Item onClick={() => deleteFriend(friend)}>
        {friend.userName} 친구 끊기
      </Menu.Item>
    </Menu>
  );

  const friendList = user.friendList.map((friend) => (
    <Card.Grid key={friend.userSeq} className="frdCard">
      <div className="frdImg">
        <Image src={friend.userProfileUrl} />
      </div>
      <div className="frdName">{friend.userName}</div>
        <Dropdown
          overlay={friendMenu(friend)}
          placement="bottomCenter"
          className="frdCtrl"
        >
          <Button>관리</Button>
        </Dropdown>
    </Card.Grid>
  ));

  function editProfile() {
    const formData = new FormData();
    let newImgUrl = 'noImage'
    console.log(inputFile)
    if(inputFile !== ''){
        newImgUrl = imageUrl
        formData.append("file", inputFile);
    }
    
    // let newUserInfo = {
    //   userId: user.userId,
    //   username: newUserName,
    //   usercode: user.usercode,
    //   profileUrl: "noImage",
    //   friendList: user.friendList,
    //   reviewId: user.reviewId,
    // };
    fetch(`${process.env.REACT_APP_API_URL}/user/userinfo?name=${newUserName}&profileUrl=${newImgUrl}`, {
      method: "PUT",
      headers: {
        token: localStorage.getItem("Kakao_token"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
          console.log(result)
        dispatch(settingUser.setUser({ id: result.id, name: result.name, profileUrl: result.profileUrl, code: result.seq, friends: result.friends, reviewId: result.reviewId }))
        setEditModalVisible(false)
      });
    // console.log(inputFile)
  }

  function setPreview(e) {
    setInputFile(e.target.files[0]);
    let fileReader = new FileReader();
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
    console.log(fileReader.readAsDataURL(e.target.files[0]));
    console.log(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="contentWrapper">
      <Row className="contentTitle" justify="space-between">
        내 정보
        <Button htmlType="button" onClick={() => setEditModalVisible(true)}>
          프로필 수정
        </Button>
      </Row>
      <Modal
        title="프로필 수정"
        visible={editModalVisible}
        onOk={editProfile}
        onCancel={() => setEditModalVisible(false)}
        okText="수정"
        cancelText="취소"
      >
        <Form form={editForm}>
          <Form.Item
            name="editUserName"
            label="이름"
            initialValue={`${newUserName}`}
          >
            <Input
              type="text"
              placeholder="닉네임을 입력해주세요."
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="프로필사진">
            <Image width={150} src={`${imageUrl}`} />
            <input
              type="file"
              name="editUserImage"
              onChange={(e) => setPreview(e)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <div className="profileBody">
        <div className="profileBox">
          <div className="usrImg">
            <Image src={user.profileUrl} />
          </div>
          <div className="usrName">{user.username}</div>
          <div className="usrCode"># {user.usercode}</div>
        </div>
        <div className="friendBox">
          <div className="frdTitle">나의 친구 목록</div>
          <div className="frdAddBtn">
            <PlusSquareOutlined
              style={{ fontSize: "larger", color: "#EFBF43" }}
              onClick={showModal}
            />
            <Modal
              visible={visible}
              title="새 친구 찾기"
              onOk={addFriend}
              onCancel={cancel}
              footer={[
                <Button key="back" onClick={cancel}>
                  돌아가기
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={addFriend}
                >
                  친구 찾기
                </Button>,
              ]}
            >
              <div className="searchTitle">친구의 고유코드를 입력하세요!</div>
              <Search
                placeholder="친구 코드"
                type="number"
                allowClear
                onSearch={codeInput}
                className="searchFriend"
              />
            </Modal>
          </div>
          <div className="frdCardWrapper">
            <Card className="frdList"> {friendList} </Card>
          </div>
        </div>
        <div className="kakaoInviteBtnWrapper">
            <Button className="kakaoInviteBtn" id="kakao-link-btn">
              잇다이어리로 친구 초대하기
            </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
