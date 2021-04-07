import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Card, Input, Image, Form, Select, Tag } from 'antd';
import { useHistory } from "react-router";
import noImg from "assets/product/no_photo.png"

import moment from 'moment';

function Timeline() {
  const history = useHistory()
  const meetings = useSelector(state => state.meetingData.meeting)
  const user = useSelector((state) => state.userData);
  const friends = user.friendList.map((friend) => {
    return { label: friend.userName, value: `${friend.id}` };
  })
  const [selectedList, setSelectedList] = useState([])
  const [timeline, setTimeline] = useState("")

  // 검색창
  const { Search } = Input;
  const [word, setWord] = useState("");
  const onSearch = value => (
    console.log(value)
  )

  // 약속 정보 보기
  const meetingInfo = meeting => {
    // 약속 보기로 이동 or modal 한번 거치고
    console.log(meeting)
    history.push(`/meeting/${meeting.id}`)
  }

  const meetingFriends = meeting => meeting.participants.slice(0, 2).map(parti =>
    <span className="meetingFrName">
      {parti.userName}
    </span>
  )

  function getDays(meetDate) {
    var now = moment()
    var difference = moment.duration(now.diff(meetDate)).asDays()
    if (0 <= difference && difference < 1) {
      return Math.floor(moment.duration(now.diff(meetDate)).asHours()) + "시간 전"
    } else if (1 <= difference && difference < 7) {
      return Math.floor(difference) + "일 전"
    } else if (7 <= difference && difference < 13) {
      return "1주 전"
    } else if (14 <= difference && difference < 20) {
      return "2주 전"
    } else if (21 <= difference && difference < 27) {
      return "3주 전"
    } else if (28 <= difference && difference < 35) {
      return "한 달 전"
    } else {
      return meetDate.format('YYYY - MM -DD')
    }
  }

  // 약속 리스트 출력
  // setTimeline(meetings.map(meeting => {
  //   if (meeting.completed === 1) {
  //     let imgUrl = noImg
  //     if (meeting.imgs.length > 0) {
  //       imgUrl = `${process.env.REACT_APP_API_URL}/files/${meeting.imgs[0]}`
  //     }
  //     return (
  //       <Card.Grid key={meeting.id} onClick={() => meetingInfo(meeting)}>
  //         <div className="meetingImg" css="border-radius:100%;" >
  //           <Image alt="image" src={imgUrl} />
  //         </div>
  //         <div className="meetingTitle">
  //           {meeting.title}
  //         </div>
  //         <div className="meetingTime">
  //           {/* {moment(meeting.meetDate).format('YYYY - MM -DD')} */}
  //           {getDays(moment(meeting.meetDate))}
  //         </div>
  //         <div className="meetingFr">
  //           {meetingFriends(meeting)}
  //         </div>
  //       </Card.Grid>
  //     )
  //   }

  // }
  // ))

  var include = function (arr, obj) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i] == obj) {
        return true;
      }
    }
    return false;
  };


  function tagRender(props) {
    const { label, value, closable, onClose } = props;

    return (
      <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }} value={value}>
        {label}
      </Tag>
    );
  }

  function getSchedule(meeting) {
    let imgUrl = noImg
    if (meeting.imgs.length > 0) {
      imgUrl = `${process.env.REACT_APP_API_URL}/files/${meeting.imgs[0]}`
    }
    return (
      <Card.Grid key={meeting.id} onClick={() => meetingInfo(meeting)}>
        <div className="meetingImg" css="border-radius:100%;" >
          <Image alt="image" src={imgUrl} />
        </div>
        <div className="meetingTitle">
          {meeting.title}
        </div>
        <div className="meetingTime">
          {/* {moment(meeting.meetDate).format('YYYY - MM -DD')} */}
          {getDays(moment(meeting.meetDate))}
        </div>
        <div className="meetingFr">
          {meetingFriends(meeting)}
        </div>
      </Card.Grid>
    )
  }

  useEffect(() => {

    setTimeline(meetings.map(meeting => {
      // 완료된 약속만 보여줌
      if (meeting.completed === 1) {
        // 선택된 친구가 없으면 모든 약속을 보여줌
        if (selectedList.length === 0) {
          return getSchedule(meeting)
        } // 선택된 친구들이 있을 경우 그 친구들의 교집합만 보여줌 
        else {
          var i = 0
          var cnt = 0
          for (i = 0; i < meeting.participants.length; i++) {
            if (include(selectedList, meeting.participants[i].id)) {
              cnt += 1
            }
          }
          if (cnt === selectedList.length) {
            return getSchedule(meeting)
          }
        }
      }

    }
    ))
  }, [selectedList]);


  return (
    <div className="timeline">
      {/* <Search className="searchBar" placeholder="걔의 이름은" onSearch={onSearch} /> */}
      {/* <span className="friendFilter">누구랑</span> */}
      <Form.Item
        name="meetingFindFriend"
        // label="누구랑"
        className="searchBar"
      >
        <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          style={{ width: "100%" }}
          options={friends}
          // value={selectedList}
          onChange={setSelectedList}
          placeholder="함께 먹은 친구"
        />
      </Form.Item>
      <div className="meetingList">
        {timeline}
      </div>
    </div>
  );
}

export default Timeline;
