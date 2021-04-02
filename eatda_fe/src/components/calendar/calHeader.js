import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';

import * as actions from "../../store/modules/baseDate";
import moment from "moment";

import { LeftOutlined, RightOutlined } from '@ant-design/icons';


function Header() {

  const baseDate = useSelector(state => state.baseDate)
  const curDate = moment(baseDate.date).clone()
  const viewMonth = curDate.format('YYYY - MM')

  const dispatch = useDispatch();

  const decMonth = useCallback(() => {
    dispatch(actions.decMonth());
  }, [dispatch])

  const incMonth = useCallback(() => {
    dispatch(actions.incMonth());
  }, [dispatch])

  // console.info("store에 저장된 baseDate는요", baseDate)

  return (
    <div className="calHeaderWrapper">
      <div className="calHeaderBtn calHeaderBeforeBtn">
        <LeftOutlined 
          style={{ color: "#EFBF43"}}
          onClick={() => { 
            decMonth(); 
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
            incMonth();
          }}
        />
      </div>
    </div>
  );
}

export default Header;
