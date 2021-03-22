import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//   };

function CreateModify() {
  // 모달 관련 상태  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  // 정보 관리 상태
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingYear, setMeetingYear] = useState('');
  const [meetingMonth, setMeetingMonth] = useState('')
  const [meetingDay, setMeetingDay] = useState('');
  const [meetingHour, setMeetingHour] = useState('');
  const [meetingMinute, setMeetingMinute] = useState('');
  const [meetingLocation, setMeetingLocation] = useState([]);
  const [meetingFriends, setMeetingFriends] = useState([]);

  const monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  
  // 페이지 렌더 이후 1번 실행 => 기본 정보 세팅
  useEffect(()=>{
    // Create 할때 => 추후 URL 조건으로 분리
    const today = new Date()
    setMeetingYear(today.getFullYear().toString())
    setMeetingMonth(monthList[today.getMonth()].toString())
    setMeetingDay(today.getDay.toString())
    setMeetingHour(today.getHours().toString())
    setMeetingMinute(today.getMinutes().toString())
  }, [])

  // 모달에 들어가는 요소들
  // 날짜 모달
  function dateModalItem() {
    return (
      <div className="meetingDateContent">
        <div className="meetingDateDate">
          <div className="meetingDateYear meetingDateItem">
            <p>연</p>
            <div className="prevYear prevItem">2020</div>
            <div className="currentYear currentItem">2021</div>
            <div className="nextYear nextItem">2022</div>
          </div>
          <div className="meetingDateMonth meetingDateItem">
            <p>월</p>
            <div className="prevYear prevItem">02</div>
            <div className="currentYear currentItem">03</div>
            <div className="nextYear nextItem">04</div>
          </div>
          <div className="meetingDateDay meetingDateItem">
            <p>일</p>
            <div className="prevYear prevItem">17</div>
            <div className="currentYear currentItem">18</div>
            <div className="nextYear nextItem">19</div>
          </div>
        </div>
        <div className="meetingDateTime">
          <div className="meetingDateHour meetingDateItem">
            <p>시</p>
            <div className="prevHour prevItem">17</div>
            <div className="currentHour currentItem">18</div>
            <div className="nextHour nextItem">19</div>
          </div>
          <div className="meetingDateMinute meetingDateItem">
            <p>분</p>
            <div className="prevMinute prevItem">17</div>
            <div className="currentMinute currentItem">18</div>
            <div className="nextMinute nextItem">19</div>
          </div>
        </div>
        <Button type="primary"
          htmlType="button"
          className="meetingDateConfirmButton">
              확인
          </Button>
      </div>
    );
  }

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
    // 날짜 모달
    if (modalType === "date") {
      setModalTitle("언제 먹을까?");
      setModalContent(dateModalItem);
      // 장소 모달
    } else if (modalType === "location") {
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
    console.log("CREATE!");
  }

  return (
    <div className="contentWrapper">
      <div className="contentTitle">약속 만들기</div>
      <div className="contentBody">
        <Form name="meetingCreateForm">
          {/* 약속 이름 창 */}
          <Form.Item
            name="meetingName"
            rules={[{ required: true, message: "약속 이름을 정해주세요" }]}
          >
            <Input placeholder="약속 이름을 지어주세요" />
          </Form.Item>
          {/* 날짜 선택 창 */}
          <Form.Item
            name="meetingDate"
            label="언제"
            rules={[{ required: true, message: "약속 날짜를 정해주세요" }]}
          >
            <Input
              span={8}
              placeholder="약속 날짜를 정해주세요"
              onClick={(e) => showModal(e, "date")}
            />
          </Form.Item>
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
            <div className="modalContent">
              {modalContent}
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. */}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CreateModify;
