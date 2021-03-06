import React from "react";
import { useSelector } from "react-redux";

import moment from "moment";

function Calendar(props) {
  /* 해당 유저의 전체 meeting Schedule 불러오기 */

  /* 캘린더 본문의 요일 부분 */

  const dayArray = ["일", "월", "화", "수", "목", "금", "토"];

  const mapArrayToDay = (dayArray) => {
    return dayArray.map((day, index) => {
      const className = () => {
        let className = "calBodyHeaderCell";
        if (index === 0) {
          return className + " day-sun";
        } else if (index === 6) {
          return className + " day-sat";
        } else {
          return className + " day-weekday";
        }
      };
      return (
        <div className={className()} key={index}>
          {day}
        </div>
      );
    });
  };

  /* 캘린더 본문의 날짜 부분 */

  // STEP 1. 캘린더가 시작할 첫 날짜를 확인한다. 이를 위해 오늘의 날짜를 확인하고, 해당 월의 첫 날이 몇 요일인지 확인한 후, 그만큼을 역산하여 첫 주 일요일의 날짜를 구한다.
  // STEP 2. 첫 날짜부터 하루씩 더해 날짜 객체를 생성한다. 6주를 기본으로 하기 때문에 42번 반복한다.
  // STEP 3. 날짜마다 요일 정보를 확인하고 div의 className을 설정한다.

  const baseDate = useSelector((state) => state.baseDate);
  console.info("자식 컴포넌트도 받아왔는데요", baseDate)
  const curDate = moment(baseDate.date).clone();
  const firstDateOfMonth = curDate.clone().startOf("month");
  const firstDayOfMonth = firstDateOfMonth.get("d");
  const firstDate = firstDateOfMonth.clone().add(-firstDayOfMonth, "days");

  const Dates = (firstDate) => {
    const _days = [];

    for (let i = 0; i < 42; i++) {
      const Day = firstDate.clone().add(i, "Days");
      _days.push(Day);
    }
    return _days;
  };

  /* 각 날짜에 해당하는 미팅 데이터 불러와 div 생성하기 */

  // STEP 1. 우선 store에서 전체 meetingData를 불러온다.
  // STEP 2. 각 day 컴포넌트를 불러올 때, meetingData를 순회하며 일치하는 데이터가 있나 확인한다.
  // STEP 3. 일치하는 경우에만 "약속있음"을 불러온다.

  const meetingData = useSelector((state) => state);
  const meetings = meetingData.meetingData.meeting;
  // console.info("미팅데이터", meetings)

  const toMeeting = (meetingId) => {
    console.info("event로 받아온", meetingId);
    window.location.href = "/meeting/" + `${meetingId}`;
  };

  const mapArrayToDate = (Dates) => {
    return Dates.map((date, index) => {
      /* day 표기 class 설정 part */
      const className = () => {
        let className = "calBodyContentCell";
        if (date.isSame(curDate, "month") === false) {
          return className + " outdate";
        } else {
          if (date.isSame(moment(), "day")) {
            return className + " date-today";
          } else {
            if (index % 7 === 0) {
              return className + " date-sun";
            } else if (index % 7 === 6) {
              return className + " date-sat";
            } else {
              return className + " date-weekday";
            }
          }
        }
      };
      /* meeting data 표기 설정 part */
      const meeting = (date) => {
          let meetingList = meetings.map((meeting)=>{
              let settingDate = new Date(meeting.meetDate)
              settingDate.setHours(settingDate.getHours() - 9)
            const meetingDate = moment(settingDate).clone();
            const meetingId = meeting.id;
            if (date.isSame(meetingDate, "day")) {
              const className = () => {
                let className = "meetingBlob";
                if (meeting.completed) {
                  return className + " meetingCompletedBlob";
                } else {
                  return className + " meetingUncompletedBlob";
                }
              };
              return (
                <div
                key={meeting.id}
                  className={className()}
                  onClick={(e) => {
                    e.preventDefault();
                    toMeeting(meetingId);
                  }}
                ></div>
              );
            }
          })
        return meetingList
      };
      return (
        <div className={className()} key={index}>
          {date.format("D")}
          {meeting(date)}
        </div>
      );
    });
  };

  return (
    <div className="calBodyWrapper">
      <div className="calBodyHeader">{mapArrayToDay(dayArray)}</div>
      <div className="calBodyContent">{mapArrayToDate(Dates(firstDate))}</div>
    </div>
  );
}

export default Calendar;
