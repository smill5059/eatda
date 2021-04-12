import React from "react";

import Header from '../../components/calendar/calHeader';
import Body from '../../components/calendar/calBody';

function Calendar() {
  return (
    <div className="calWrapper">
      <Header />
      <Body />
    </div>
  );
  
}

export default Calendar;