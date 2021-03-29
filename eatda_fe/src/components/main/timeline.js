import React from "react";
import { useSelector } from 'react-redux';
import { Card } from 'antd';

function Timeline() {
  const meetings = useSelector(state => state.timelineData)
  const timeline = meetings.map(meeting => 
    <Card.Grid>
      <div className="meetingImg">
        이미지
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
      { timeline }
    </div>
  );
}

export default Timeline;
