import React from "react";
import { useSelector } from 'react-redux';
import { Card, Input, Image } from 'antd';

function Timeline() {
  const meetings = useSelector(state => state.timelineData)
  // 검색창
  const { Search } = Input;
  const onSearch = value => console.log(value);

  // 약속 정보 보기
  const meetingInfo = meeting => (
    // 약속 보기로 이동 or modal 한번 거치고
    console.log(meeting)
  )

  // 약속 리스트 출력
  const timeline = meetings.map(meeting => 
    <Card.Grid onClick={() => meetingInfo(meeting)}>
      <div className="meetingImg">
        <Image src={ meeting.ImageUrl } />
      </div>
      <div className="meetingTime">
        { meeting.meetingDate }
      </div>
      <div className="meetingFr">
        { meeting.meetingFriend }
      </div>
    </Card.Grid>
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
