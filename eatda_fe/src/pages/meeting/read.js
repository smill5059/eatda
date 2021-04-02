import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Row, Col, Image } from "antd";
import MeetingInfo from "../../components/meeting/meetInfo";
import MeetingReview from "../../components/meeting/meetReview"
import { RestFilled } from "@ant-design/icons";

function MeetingRead(props) {
  const { meetingId } = props.match.params;
  const [data, setData] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    (fetch(`${process.env.REACT_APP_API_URL}/meeting/` + meetingId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBMTAzIiwiZXhwIjoxNjE3MzQ5ODAxLCJzZXEiOjE2NjQwMzg3MTB9.MDMuYXPF16aeQnCwhiwm2n0hRr2bbNbt4H4bFNRFwYY`
      }
    })
      .then(res => res.json())
      .then(res => {
        let date = parse(res.meetDate);
        res.meetDate = date
        setData(res)
        setMonth(date.getMonth() + 1);
        setDate(date.getDate());
        if (date.getDay == 0) {
          setDay("일")
        } else if (date.getDay() == 1) {
          setDay("월")
        } else if (date.getDay() == 2) {
          setDay("화")
        } else if (date.getDay() == 3) {
          setDay("수")
        } else if (date.getDay() == 4) {
          setDay("목")
        } else if (date.getDay() == 5) {
          setDay("금")
        } else {
          setDay("토")
        }
        setHours(date.getHours())
        setMinutes(date.getMinutes())
      }))
  }, [])
  function parse(str) {
    var y = str.substr(0, 4);
    var m = str.substr(5, 2);
    var d = str.substr(8, 2);
    var h = str.substr(11, 2);
    var minutes = str.substr(14, 2);
    return new Date(y, m - 1, d, h, minutes, 0);
  }

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
        {/* <Col span={20}>3월 23일(화) 오후 5시</Col> */}
        <Col span={20}>{month}월 {date}일 ({day}) {hours}시 {minutes}분</Col>
        <Col span={4}>
          <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
            <Button>...</Button>
          </Dropdown>
        </Col>
      </Row>

      <MeetingReview data={data}></MeetingReview>
      {/* {data.completed ? (
        <MeetingReview data={data}></MeetingReview>
      ) : (
          <MeetingInfo data={data}></MeetingInfo>
        )} */}
    </div>
  );
}

export default MeetingRead;
