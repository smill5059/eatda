import React, { Component, useState, useEffect } from "react";

import Header from '../../components/calendar/calHeader';
import Body from '../../components/calendar/calBody';
import moment from "moment";

function Calendar() {
  
  const [baseDate, setBaseDate] = useState(moment());
  console.info("캘린더 컴포넌트로 전달받은", baseDate);

  return (
    <div className="calWrapper">
      <Header setBaseDate={ setBaseDate } />
      <Body baseDate={ baseDate } />
    </div>
  );
  
}

export default Calendar;