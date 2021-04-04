import React, { useEffect, useState } from "react";
import { Input, Button, Rate } from "antd";
import moment from "moment";

function MemoUpdate(props) {
  // 요일 배열
  const weekDays = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
  // 유저 토큰
  const userToken = localStorage.getItem("Kakao_token")
    ? localStorage.getItem("Kakao_token")
    : "";
  let [userSeq, setUserSeq] = useState(0);
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
    console.log(userToken);
    if (userToken === "") {
      window.location.href = "/login";
    }
    // 유저 정보 확인
    fetch(`${process.env.REACT_APP_API_URL}/user/userinfo`, {
      headers: {
        token: userToken,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        userSeq = result.seq;
        console.log(result.seq);
        setUserSeq(userSeq);
      })
      .then(() => {
        // 미팅 정보 확인
        fetch(`${process.env.REACT_APP_API_URL}/meeting/${meetingId}`)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            let thisTime = new Date(result.meetDate);
            setMeetingTitle(result.title);
            setMeetingDate(
              moment(thisTime).format("YYYY년 MM월 DD일") +
                weekDays[moment(thisTime).format("E")]
            );
            setMeetingTime(moment(thisTime).format("HH시 mm분"));
            setMeetingStores(result.stores);
            setMeetingScores(result.scores);
            console.log(result.stores);
            result.comments.forEach((element) => {
              if (userSeq === element.userSeq) {
                setMemoCheck(true);
                setMemoContent(element.content);
              }
            });
          });
      });
  }, []);

  function createMemo() {
    console.log("CREATE MEMO!");
    let schedule = "";
    fetch(`${process.env.REACT_APP_API_URL}/meeting/${meetingId}`)
      .then((res) => res.json())
      .then((result) => {
        schedule = result;
        schedule.scores = meetingScores;
        // 이미 댓글이 있었음
        console.log(memoCheck);
        if (memoCheck) {
          for (let i = 0; i < schedule.comments.length; i++) {
            console.log(schedule.comments[i].userSeq);
            console.log(userSeq);
            if (schedule.comments[i].userSeq === userSeq) {
              console.log(memoContent);
              schedule.comments[i].content = memoContent;
            }
          }
        } else {
          schedule.comments.push({
            content: memoContent,
            userSeq: userSeq,
          });
        }
        console.log(schedule);
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
    console.log(schedule);
  }

  function changeStar(v, storeItem) {
    console.log(v);
    console.log(storeItem);
    let checkExist = false;
    storeItem.forEach((item) => {
      if (item.storeId === storeItem.storeId) {
        item.rate = v;
        checkExist = true;
      }
    });
    if (checkExist) {
      setMeetingScores(meetingScores);
    } else {
      let scoreItem = {
        storeId: String(storeItem.storeId),
        userSeq: userSeq,
        rate: v,
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
              console.log(store);
              return (
                <div className="starContent" key={index}>
                  <p className="starStoreName">{store.storeName}</p>
                  <Rate
                    className="starRating"
                    allowHalf
                    onChange={(value) => changeStar(value, store)}
                  />
                </div>
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
