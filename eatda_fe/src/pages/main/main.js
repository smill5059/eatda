import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

import Calendar from '../../components/main/calendar';
import Timeline from '../../components/main/timeline';

import * as actions from 'store/modules/meetingData';


function Main() {

  // 버튼을 클릭할 때 마다 calendar와 timeline을 toggle하는 함수를 작성해 보겠습니다.

  // STEP 1. calendar를 보여주는 state 값을 Boolean으로 설정한다. 기본값을 true
  // STEP 2. timeline 버튼 onClick시 해당 값을 false로, calendar 버튼 클릭시 다시 true로 설정
  // STEP 3. 삼항연산자를 이용해 해당 값이 true 일 때는 calendar, false 일 때는 timeline을 보여주도록 하자.

  const [viewCalendar, setViewCalendar] = useState(true)

  /* when main rendering */
  const dispatch = useDispatch();
  const [ data, setData ] = useState([]);
  const userToken = localStorage.getItem('Kakao_token') ? localStorage.getItem('Kakao_token') : ""
  
  useEffect(() => {
      if (userToken === ""){
          window.location.href = "/login"
      }
    fetch(`${process.env.REACT_APP_API_URL}/main/schedules`, {
      headers : {
        'token': userToken,        
        // 'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(res => {
      setData(res)
      console.info("미팅데이터 불러오기", res)
    })
  },[]);

  const setMeetingData = useCallback((data) => {
    dispatch(actions.meetingData(data));
  }, [dispatch])

  setMeetingData(data)

  const toMeetingCreate = () => {
   window.location.href="/createMeeting"
  }

  return (
    <div className="contentWrapper">
      <div className="contentTitle">
        나의 잇다이어리
      </div>
      <div className="contentBody mainWrapper">
        <div className="mainButtonWrapper">
          {/* Button은 임시로 달아놓았습니다. 여러가지 이유로 custom div로 수정해야 함 */}
          <Button
            type={viewCalendar ? 'primary' : ''}
            size="large"
            shape="round"
            onClick={() => setViewCalendar(true)}
          >
            캘린더
          </Button>
          <Button
            type={viewCalendar ? '' : 'primary'}
            size="large"
            shape="round"
            onClick={() => setViewCalendar(false)}
          >
            타임라인
          </Button>
        </div>
        <div className="mainComponentWrapper">
          { viewCalendar ? <Calendar/> : <Timeline/> }
          <PlusCircleFilled 
            className="mainMeetingCreateBtn"
            onClick={toMeetingCreate} 
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
