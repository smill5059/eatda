import React, { useEffect } from "react";
import { Button, Dropdown, Menu, Row, Col, Image } from "antd";

function MeetingRead(props) {
  const { meetingId } = props.match.params;
  console.log(meetingId);

  // 드롭다운 메뉴들
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">수정하기</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">삭제하기</a>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    // 지도 로딩
    const { kakao } = window;
    if (document.querySelector(".meetingReadMap") !== null) {
      new kakao.maps.Map(document.querySelector(".meetingReadMap"), {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      });
    }
  }, []);
  return (
    <div className="contentWrapper">
      <Row className="contentTitle">
        <Col span={20}>3월 23일(화) 오후 5시</Col>
        <Col span={4}>
          <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
            <Button>...</Button>
          </Dropdown>
        </Col>
      </Row>
      <div className="contentBody meetingReadContent">
        <Row justify="end" className="meetingReadTitle">
          <p>수림이와 홍대 나들이</p>
        </Row>
        <Col className="meetingReadMap"></Col>
        <Col className="meetingReadStore"></Col>
        <Col className="meetingReadFriend">
          <p>만나는 사람</p>
          <div className="meetingReadFriendList">
            <Row className="meetingReadFriendItem">
              <Col span={8} className="meetingReadFriendImage">
                <img src="https://via.placeholder.com/30"/>
              </Col>
              <Col span={16} className="meetingReadFriendName">
                왕왕왕asdasdasdasdasdasdasd
              </Col>
            </Row>
            <Row className="meetingReadFriendItem">
              <Col className="meetingReadFriendImage">
                <img src="https://via.placeholder.com/30"/>
              </Col>
              <Col className="meetingReadFriendName">
                왕왕왕
              </Col>
            </Row>
            <Row className="meetingReadFriendItem">
              <Col className="meetingReadFriendImage">
                <img src="https://via.placeholder.com/30"/>
              </Col>
              <Col className="meetingReadFriendName">
                왕왕왕
              </Col>
            </Row>
            
          </div>
        </Col>
        <Row className="meetingReadDone" justify="end">
          <Button className="meetingReadDoneButton">만났어요</Button>
        </Row>
      </div>
    </div>
  );
}

export default MeetingRead;
