import React from "react";
import moment from "moment";


function Calendar(props) {

  /* 캘린더 본문의 요일 부분 */  

  const dayArray = ["일", "월", "화", "수", "목", "금", "토"]

  const mapArrayToDay = (dayArray) => {
    return dayArray.map((day, index) => {
      const className = () => {
        let className = "calBodyHeaderCell";
        if (index === 0) {
          return className + " date-sun"
        } else if (index === 6) {
          return className + " date-sat"
        } else {
          return className + " date-weekday"
        }
      }
      return (
        <div className={className()}>
          { day }
        </div>
      )
    })
  }

  /* 캘린더 본문의 날짜 부분 */

  // STEP 1. 캘린더가 시작할 첫 날짜를 확인한다. 이를 위해 오늘의 날짜를 확인하고, 해당 월의 첫 날이 몇 요일인지 확인한 후, 그만큼을 역산하여 첫 주 일요일의 날짜를 구한다.
  // STEP 2. 첫 날짜부터 하루씩 더해 날짜 객체를 생성한다. 6주를 기본으로 하기 때문에 42번 반복한다.
  // STEP 3. 날짜마다 요일 정보를 확인하고 div의 className을 설정한다.

  const curDate = props.baseDate
  const firstDateOfMonth = curDate.clone().startOf('month')
  const firstDayOfMonth = firstDateOfMonth.get('d')
  const firstDate = firstDateOfMonth.clone().add(-firstDayOfMonth, 'days')

  console.info("전달 받아지는지?", curDate)
  console.info("이번 달의 첫 날", firstDateOfMonth)
  console.info("이번 달의 첫 요일", firstDayOfMonth)
  console.info("이번 달력의 첫 날", firstDate)

  const Days = (firstDate) => {
    const _days = [];

    for (let i = 0; i < 42; i ++) {
      const Day = firstDate.clone().add('d', i);
      console.log("하루하루", Day)
      _days.push({
        getDay: Day.format('D')
      });
    }

    return _days;
  }


  return (
    <div className="calBodyWrapper">
      <div className="calBodyHeader">
        { mapArrayToDay(dayArray) }        
      </div>
      <div className="calBodyContent">
        { Days }
      </div>
    </div>
  );
}

export default Calendar;
