import React, { useState } from "react";
import { Button } from 'antd';

import Calendar from '../../components/main/calendar';
import Timeline from '../../components/main/timeline';

function Main() {

  // 버튼을 클릭할 때 마다 calendar와 timeline을 toggle하는 함수를 작성해 보겠습니다.

  // STEP 1. calendar를 보여주는 state 값을 Boolean으로 설정한다. 기본값을 true
  // STEP 2. timeline 버튼 onClick시 해당 값을 false로, calendar 버튼 클릭시 다시 true로 설정
  // STEP 3. 삼항연산자를 이용해 해당 값이 true 일 때는 calendar, false 일 때는 timeline을 보여주도록 하자.

  const [viewCalendar, setViewCalendar] = useState(true)

  return (
    <div className="contentWrapper">
      <div className="contentTitle">
        나의 잇다이어리
      </div>
      <div className="contentBody mainWrapper">
        <div className="mainButtonWrapper">
          {/* Button은 임시로 달아놓았습니다. 여러가지 이유로 custom div로 수정해야 함 */}
          <Button
            onClick={() => setViewCalendar(true)}
          >
            달력
          </Button>
          <Button
            onClick={() => setViewCalendar(false)}
          >
            타임라인
          </Button>
        </div>
        <div className="mainComponentWrapper">
           { viewCalendar ? <Calendar/> : <Timeline/> }
        </div>
      </div>
    </div>
  );
}

export default Main;
