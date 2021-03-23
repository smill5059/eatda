import React, { useState, useEffect } from "react";
import moment from "moment";

import { LeftOutlined, RightOutlined } from '@ant-design/icons';


function Calendar(props) {

  // STEP 1. useState를 이용해 setMonth가 month를 변경할 수 있도록 한다. 초기값은 현재값인 moment()로 불러올 수 있다.
  // STEP 2. setMonth는 moment에 1을 더하거나 빼며 month를 변경시킨다.
  // STEP 3. 이렇게 변경된 month의 정보를 onClick시마다 다시 받아올 수 있도록 한다. 
  
  const [ curDate, setCurDate ] = useState(moment())
  // console.info("자식이 받은 것이", props.baseDate)
  // console.info("입력도 잘 됐나?", curDate)
  const [ viewMonth, setViewMonth ] = useState(curDate.format('YYYY - MM'))

  return (
    <div className="calHeaderWrapper">
      <div className="calHeaderBtn calHeaderBeforeBtn">
        <LeftOutlined 
          style={{ color: "#EFBF43"}}
          onClick={() => { 
            setCurDate(curDate.add(-1, 'months')); 
            setViewMonth(curDate.format('YYYY - MM')); 
            props.setBaseDate(curDate); 
          }}
        />
      </div>
      <div className="calHeaderNow">
        { viewMonth }
      </div>
      <div className="calHeaderBtn calHeaderAfterBtn">
        <RightOutlined 
          style={{ color: "#EFBF43"}}
          onClick={() => { 
            setCurDate(curDate.add(1, 'months')); 
            setViewMonth(curDate.format('YYYY - MM')); 
            props.setBaseDate(curDate); 
          }}
        />
      </div>
    </div>
  );
}

export default Calendar;
