import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Row, Col, Image } from "antd";
import MeetingInfo from "../../components/meeting/meetInfo";
import MeetingReview from "../../components/meeting/meetReview"
import { RestFilled } from "@ant-design/icons";

function MeetingRead(props) {
  const { meetingId } = props.match.params;
  const [meetComponent, setMeetComponent] = useState("");
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
        // 디니디니
        'token': `토큰 넣기~`
      }
    })
      .then(res => res.json())
      .then(res => {
        function parse(str) {
          var y = str.substr(0, 4);
          var m = str.substr(5, 2);
          var d = str.substr(8, 2);
          var h = str.substr(11, 2);
          var minutes = str.substr(14, 2);
          return new Date(y, m - 1, d, h, minutes, 0);
        }
        let date = parse(res.meetDate);
        res.meetDate = date
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

        if (!res.isCompleted) {
          var i = 0
          var comment = ""

          for (i = 0; i < res.comments.length; i++) {
            //디니디니
            if (res.comments[i].userSeq == 1664038710) {
              comment = res.comments[i].content
              break
            }
          }

          if (comment == "") {
            comment = "수정하기를 눌러 다녀온 후기를 남겨보세요!"
          }


          setMeetComponent(<MeetingReview info={res}
            comment={comment}></MeetingReview>)
        } else {
          setMeetComponent(<MeetingInfo info={res}></MeetingInfo>)
        }

      }))
  }, [])

  let createUrl = false;

  // 드롭다운 메뉴들
  // 디니디니
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
        <Col span={20}>{month}월 {date}일 ({day}) {hours}시 {minutes}분</Col>
        <Col span={4}>
          <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
            <Button>...</Button>
          </Dropdown>
        </Col>
      </Row>

      {meetComponent}

    </div>
  );



}

export default MeetingRead;
