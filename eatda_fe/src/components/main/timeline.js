import React from "react";
import { useSelector } from 'react-redux';
import { Card, Input, Image } from 'antd';
import { useHistory } from "react-router";
import noImg from "assets/product/no_photo.png"

import moment from 'moment';

function Timeline() {
  const history = useHistory()

  const meetings = useSelector(state => state.meetingData.meeting)
  // 검색창
  const { Search } = Input;
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
      { parti.userName }
    </span>
  )

  // 약속 리스트 출력
  const timeline = meetings.map(meeting => {
      let imgUrl = noImg
      if (meeting.imgs.length > 0){
          imgUrl = `${process.env.REACT_APP_API_URL}/files/${meeting.imgs[0]}`
      }
    return (
    <Card.Grid key={meeting.id} onClick={() => meetingInfo(meeting)}>
      <div className="meetingImg">
        <Image alt="image" src={imgUrl}/>
      </div>
      <div className="meetingTitle">
        { meeting.title }
      </div>
      <div className="meetingTime">
        { moment(meeting.meetDate).format('YYYY - MM') }
      </div>
      <div className="meetingFr">
        { meetingFriends(meeting) }
      </div>
      <div className="meetingLoca">
        { meeting.stores[0].storeName }
      </div>
    </Card.Grid>
    )
}
  )

  return (
    <div className="timeline">
      <Search className="searchBar" placeholder="걔의 이름은" onSearch={onSearch} />
      <div className="meetingList">
        { timeline }
      </div>
    </div>
  );
}

export default Timeline;
