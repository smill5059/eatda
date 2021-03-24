import React from "react";
import { Button, Row, Col } from "antd";

function MeetingInfo() {
  return (
    <div className="contentBody meetingReadContent">
        <Row justify="end" className="meetingReadTitle">
          <p>수림이와 홍대 나들이</p>
        </Row>
        <Col className="meetingReadMap"></Col>
        <Col className="meetingReadStore">
            <Row className="meetingReadStoreItem">
                <Col span={3}></Col>
                <Col span={21} className="meetingReadStoreName">가게 이름</Col>
            </Row>
            <Row className="meetingReadStoreItem">
                <Col span={3}></Col>
                <Col span={21} className="meetingReadStoreName">가게 이름가게 이름가게 이름가게 이름가게 이름가게 이름가게 이름가게 이름가게 이름가게 이름가게 이름</Col>
            </Row>
            <Row className="meetingReadStoreItem">
                <Col span={3}></Col>
                <Col span={21} className="meetingReadStoreName">가게 이름</Col>
            </Row>
            <Row className="meetingReadStoreItem">
                <Col span={3}></Col>
                <Col span={21} className="meetingReadStoreName">가게 이름</Col>
            </Row>
        </Col>
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
  );
}

export default MeetingInfo;
