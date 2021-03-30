import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//   };

function CreateModify(props) {
  // 모달 관련 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  // 정보 관리 상태
  const [pageTitle, setPageTitle] = useState("약속 만들기");
  const [meetingLocation, setMeetingLocation] = useState([]);
  const [meetingFriends, setMeetingFriends] = useState([]);

  const { meetingId } = props.match.params;

  // 페이지 렌더 이후 1번 실행 => 기본 정보 세팅
  useEffect(() => {
    // Create 할때 => 추후 URL 조건으로 분리
    if (meetingId === undefined) {
      setPageTitle("약속 만들기");
      const today = new Date();
    } else {
      // meetingId가 있으므로 수정
      setPageTitle("약속 수정하기");
      // 통신하여 약속정보 가져오기
    }
  }, []);

  // 모달에 들어가는 요소들
  // 날짜 모달
//   function dateModalItem() {
//     return (
//       <div className="meetingDateContent">
//         <Space direction="horizontal">
//           <DatePicker />
//           <DatePicker picker="time" />
//         </Space>
//         <Button
//           type="primary"
//           htmlType="button"
//           className="meetingDateConfirmButton"
//         >
//           확인
//         </Button>
//       </div>
//     );
//   }

  // 장소 모달
  function locationModalItem() {
    return (
      <div className="meetingLocationContent">
        <Form layout="vertical">
          <Form.Item
            name="meetingLocationForm"
            className="meetingLocationForm"
            label="장소 검색하기"
          >
            <Input placeholder="식당 이름을 검색해주세요" />
          </Form.Item>
        </Form>
        <div className="meetingLocationMap"></div>
        <Button
          type="primary"
          htmlType="button"
          className="meetingLocationConfirmButton"
        >
          확인
        </Button>
      </div>
    );
  }

  function friendModalItem() {
    return (
      <div className="meetingFriendContent">
        <Form>
          <Form.Item
            name="meetingFriendForm"
            className="meetingFriendForm"
            label="친구 검색하기"
          >
            <Input placeholder="친구 이름을 검색해주세요" />
          </Form.Item>
        </Form>
        <ul className="meetingFriendModalList"></ul>
        <Button
          type="primary"
          htmlType="button"
          className="meetingFriendConfirmButton"
        >
          확인
        </Button>
      </div>
    );
  }

  // 모달의 ON/OFF에 따라 작동할 것
  useEffect(() => {
    // 지도 로딩
    const { kakao } = window;
    if (document.querySelector(".meetingLocationMap") !== null) {
      new kakao.maps.Map(document.querySelector(".meetingLocationMap"), {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      });
    }
  }, [modalVisible]);

  function showModal(e, modalType) {
    e.preventDefault();
    if (modalType === "location") {
      setModalTitle("어디서 먹을까?");
      setModalContent(locationModalItem);
      // 친구 모달
    } else if (modalType === "friend") {
      setModalTitle("누구랑 먹을까?");
      setModalContent(friendModalItem);
    }
    // 모달 보여주기
    setModalVisible(true);
  }

  function createMeeting(e) {
    e.preventDefault();
    console.log("CREATE!");
  }

  return (
    <div className="contentWrapper">
      <div className="contentTitle">{pageTitle}</div>
      <div className="contentBody">
        <Form name="meetingCreateForm">
          {/* 약속 이름 창 */}
          <Form.Item
            name="meetingName"
            rules={[{ required: true, message: "약속 이름을 정해주세요" }]}
          >
            <Input
              placeholder="약속 이름을 지어주세요"
              onChange={(e) => {
                // setMeetingTitle(e.target.value);
              }}
            />
          </Form.Item>
          {/* 날짜 선택 창 */}
          <Space direction="horizontal">
            <Form.Item
              name="meetingDate"
              label="언제"
              rules={[{ required: true, message: "약속 날짜를 정해주세요" }]}
            >
                <DatePicker placeholder="약속 날짜" format='YYYY년 MM월 DD일'/>
              {/* <Input
                span={8}
                placeholder="약속 날짜"
                onClick={(e) => showModal(e, "date")}
              /> */}
            </Form.Item>
            <Form.Item
              name="meetingTime"
              label="몇시"
              rules={[{ required: true, message: "약속 시간을 정해주세요" }]}
            >
              <DatePicker picker="time" placeholder="약속 시간" format="HH시 mm분"/>
            </Form.Item>
          </Space>

          {/* 장소 선택 창 */}
          <Form.Item
            name="meetingLocation"
            label="어디서"
            rules={[{ required: true, message: "약속 장소를 정해주세요" }]}
          >
            <Input
              placeholder="약속 장소를 정해주세요"
              onClick={(e) => showModal(e, "location")}
            />
          </Form.Item>
          {/* 친구 부르기 버튼 */}
          <Form.Item name="meetingFindFriend" className="meetingFindFriend">
            <Button
              type="primary"
              htmlType="button"
              className="meetingFindFriendButton"
              onClick={(e) => showModal(e, "friend")}
            >
              친구 부르기
            </Button>
          </Form.Item>
          {/* 친구 목록   */}
          <Form.Item label="만날 친구" className="meetingFriendsListBox">
            <div className="meetingFriendsList">친구목록</div>
          </Form.Item>
          <Form.Item name="meetingCreate" className="meetingCreate">
            <Button
              type="primary"
              htmlType="submit"
              onClick={(e) => createMeeting(e)}
              className="meetingCreateButton"
            >
              약속 생성하기
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* 모달 */}
      {modalVisible ? (
        <div className="modalWrapper">
          <div className="modalMain">
            <div className="modalTitle">
              <p>{modalTitle}</p>
              <p className="modalCloseButton">
                <CloseOutlined onClick={() => setModalVisible(false)} />
              </p>
            </div>
            <div className="modalContent">{modalContent}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CreateModify;
