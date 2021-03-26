import React, { useEffect } from "react";
import { Button, Dropdown, Menu, Row, Col, Image } from "antd";
import MeetingInfo from "../../components/meeting/meetInfo";
import MeetingReview from "../../components/meeting/meetReview"

function MeetingRead(props) {
  const { meetingId } = props.match.params;
  console.log(meetingId);

  let createUrl = false;

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
      {/* 조건문으로 분할 */}
      <MeetingInfo></MeetingInfo>
      {/* <MeetingReview></MeetingReview> */}
      
      
    </div>
  );
}

export default MeetingRead;
