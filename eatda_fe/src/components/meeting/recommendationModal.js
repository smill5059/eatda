import React, { useState } from 'react';

import { Form, Input, Button, DatePicker, Space } from "antd";



function RecommendationModal(props) {

  console.info("props", props)
  // console.info("모달 렌더링 됐어요")

  // const [ meetingArea, setMeetingArea ] = useState(false);
  const meetingArea = Boolean(props.meetingArea.length === 0)
  console.info("받아온 미팅에어리어", props.meetingArea)
  console.info("미팅장소 미정일때", meetingArea)

  const recommendationPage = () => {
    console.info("추천페이지 렌더링 됐어요")
    return (
      // <div>
      //   추천페이지예요
      // </div>
      <div className="meetingLocationContent">
        <Form layout="vertical">
          <Form.Item
            name="meetingLocationForm"
            className="meetingLocationForm"
            label="맛집 추천받을 위치 검색하기"
          >
            <Input
              placeholder="약속 장소를 검색해 주세요! EX) 홍대입구, 이태원"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  props.setLocationKeyword(e.target.value);
                }
              }}
            />
          </Form.Item>
        </Form>
        <div className="meetingLocationMap"></div>
      </div>
    )
  };
  
  const meetingAreaPage = () => {
    console.info("미팅페이지 렌더링 됐어요")
    // const 
    return (
      // <div>
      //   미팅페이지에요
      // </div>
      <div className="meetingLocationContent">
        <Form layout="vertical">
          <Form.Item
            name="meetingLocationForm"
            className="meetingLocationForm"
            label="추천받을 위치 검색하기"
          >
            <Input
              placeholder="지역 이름을 검색해주세요"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  props.setLocationKeyword(e.target.value);
                }
              }}
            />
          </Form.Item>
        </Form>
        <div className="meetingLocationMap"></div>
      </div>
    )
  };


  return (
    <div>
      { (meetingArea) ? (recommendationPage()) : (meetingAreaPage()) }
    </div>
  );
}

export default RecommendationModal;