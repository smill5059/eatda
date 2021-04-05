import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Input, Button, Rate, Row } from "antd";
import moment from "moment";

function MemoUpdate(props) {
    const user = useSelector(state => state.userData)
    const userSeq = user.usercode
    const reviewId = user.reviewId
  // 요일 배열
  const weekDays = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
  // 유저 토큰
  const userToken = localStorage.getItem("Kakao_token")
    ? localStorage.getItem("Kakao_token")
    : "";
  // 미팅 ID 받아오기
  const { meetingId } = props.match.params;
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [memoContent, setMemoContent] = useState("");
  const [meetingStores, setMeetingStores] = useState([]);
  const [meetingScores, setMeetingScores] = useState([]);
  const [memoCheck, setMemoCheck] = useState(false);

  // 바로 실행
  useEffect(() => {
    if (userToken === "") {
      window.location.href = "/login";
    }
    // 유저 정보 확인
    // 미팅 정보 확인
    fetch(`${process.env.REACT_APP_API_URL}/meeting/${meetingId}`)
    .then((res) => res.json())
    .then((result) => {
      let thisTime = new Date(result.meetDate);
      setMeetingTitle(result.title);
      setMeetingDate(
        moment(thisTime).format("MM월 DD일") +
          weekDays[moment(thisTime).format("E")]
      );
      setMeetingTime(moment(thisTime).format("HH시 mm분"));
      
      // 유저 매장 별점
      result.stores.forEach(store => {
        store.rate = 0
        result.scores.some(score=>{
            if (store.storeId === score.storeId && user.usercode === score.userSeq){
              store.rate = score.rate
            }
            return (store.storeId === score.storeId && user.usercode === score.userSeq)
        })
    });
    setMeetingStores(result.stores);
      setMeetingScores(result.scores);
      result.comments.forEach((element) => {
        if (userSeq === element.userSeq) {
          setMemoCheck(true);
          setMemoContent(element.content);
        }
      });
    });
  }, []);

  function createMemo() {
    let schedule = "";
    fetch(`${process.env.REACT_APP_API_URL}/meeting/${meetingId}`)
      .then((res) => res.json())
      .then((result) => {
        schedule = result;
        schedule.scores = meetingScores;
        // 이미 댓글이 있었음
        if (memoCheck) {
          for (let i = 0; i < schedule.comments.length; i++) {
            if (schedule.comments[i].userSeq === userSeq) {
              schedule.comments[i].content = memoContent;
            }
          }
        } else {
          schedule.comments.push({
            content: memoContent,
            userSeq: userSeq,
          });
        }
      })
      .then(() => {
        fetch(`${process.env.REACT_APP_API_URL}/review/comment`, {
          method: "PUT",
          headers: {
            token: userToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(schedule),
        })
          .then((res) => res.json())
          .then((result) => {
            window.location.href = `/meeting/${result.id}`;
          });
      });
  }

  function changeStar(v, storeItem) {
    let checkExist = false;
    meetingScores.forEach((item) => {
      if (item.storeId === storeItem.storeId) {
        item.rate = v;
        storeItem.rate = v;
        checkExist = true;
        item.reviewId = reviewId
      }
    });
    if (checkExist) {
      setMeetingScores(meetingScores);
    } else {
      let scoreItem = {
        storeId: String(storeItem.storeId),
        userSeq: userSeq,
        rate: v,        
        reviewId : reviewId
      };
      setMeetingScores(meetingScores.concat([scoreItem]));
    }
  }

  return (
    <div className="contentWrapper">
      <div className="contentTitle">
        {meetingDate} {meetingTime}
      </div>
      <div className="contentBody">
        <div className="memoContent">
          <p className="memoTitle">{meetingTitle}</p>
          <div className="memoCreate">
            <Input.TextArea
              placeholder="약속 후기를 작성해주세요."
              onChange={(e) => setMemoContent(e.target.value)}
              className="memoCreateInput"
              value={memoContent}
            />
          </div>
          <div className="starCreate">
            {meetingStores.map((store, index) => {
              return (
                <Row className="starContent" key={index} justify="space-between" align="center">
                  <p className="starStoreName">{store.storeName}</p>
                  <Rate
                    className="starRating"
                    defaultValue={store.rate}
                    onChange={(value) => changeStar(value, store)}
                  />
                </Row>
              );
            })}
          </div>
          <Button className="memoCreateButton" onClick={() => createMemo()}>
            후기 작성
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MemoUpdate;
