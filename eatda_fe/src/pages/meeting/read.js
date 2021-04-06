import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Button, Dropdown, Menu, Row, Col, Image } from "antd";
import MeetingInfo from "../../components/meeting/meetInfo";
import MeetingReview from "../../components/meeting/meetReview";
import { RestFilled } from "@ant-design/icons";

function MeetingRead(props) {
  const user = useSelector(state => state.userData)

  const { meetingId } = props.match.params;
  const [meetComponent, setMeetComponent] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [menu, setMenu] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/meeting/` + meetingId, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('Kakao_token')
      }
    })
      .then((res) => res.json())
      .then((res) => {
          console.log("_________")
          console.log(res)
          console.log("_________")
        function parse(str) {
          var y = str.substr(0, 4);
          var m = str.substr(5, 2);
          var d = str.substr(8, 2);
          var h = str.substr(11, 2);
          var minutes = str.substr(14, 2);
          return new Date(y, m - 1, d, h, minutes, 0);
        }
        let date = parse(res.meetDate);
        res.meetDate = date;
        setMonth(date.getMonth() + 1);
        setDate(date.getDate());
        if (date.getDay === 0) {
          setDay("일");
        } else if (date.getDay() === 1) {
          setDay("월");
        } else if (date.getDay() === 2) {
          setDay("화");
        } else if (date.getDay() === 3) {
          setDay("수");
        } else if (date.getDay() === 4) {
          setDay("목");
        } else if (date.getDay() === 5) {
          setDay("금");
        } else {
          setDay("토");
        }
        setHours(date.getHours());
        setMinutes(date.getMinutes());

        // 만난 약속
        if (res.completed === 1) {
          var i = 0
          var comment = ""
          var username = user.username
          // 유저 후기 텍스트
          for (i = 0; i < res.comments.length; i++) {
            if (res.comments[i].userSeq === user.usercode) {
              comment = res.comments[i].content
              break
            }
          }

          if (comment === "") {
            comment = "수정하기를 눌러 다녀온 후기를 남겨보세요!";
          }

          // 유저 매장 별점
          res.stores.forEach(store => {
              store.rate = 0
              res.scores.some(score=>{
                  if (store.storeId === score.storeId && user.usercode === score.userSeq){
                    store.rate = score.rate
                  }
                  return (store.storeId === score.storeId && user.usercode === score.userSeq)
              })
          });

          setMeetComponent(
            <MeetingReview info={res} comment={comment}></MeetingReview>
          );
          setMenu(
            <Menu>
              <Menu.Item key="0">
                <a href={`/updateMeeting/${meetingId}/photoUpdate`}>📷 사진</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a href={`/updateMeeting/${meetingId}/memoUpdate`}>📝 후기</a>
              </Menu.Item>
            </Menu>
          );
        } else {
          setMeetComponent(<MeetingInfo info={res}></MeetingInfo>);
          setMenu(
            <Menu>
              <Menu.Item key="0">
                <a href={`/updateMeeting/${meetingId}`}>수정</a>
              </Menu.Item>
              <Menu.Item key="1">
                <div>삭제</div>
              </Menu.Item>
            </Menu>
          );
        }
      }).catch(()=>window.location.href = "/");
  }, []);

  let createUrl = false;

  // 드롭다운 메뉴들
  // 디니디니

  return (
    <div className="contentWrapper">
      <Row className="contentTitle">
        <Col span={20}>
          {month}월 {date}일 ({day}) {hours}시 {minutes}분
        </Col>
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
