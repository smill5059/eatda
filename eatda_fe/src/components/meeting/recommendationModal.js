import React, { useState } from 'react';

import { Form, Input, Button, DatePicker, Space } from "antd";



function RecommendationModal(props) {
  
  // console.info("모달 렌더링 됐어요")

  const [ meetingArea, setMeetingArea ] = useState(false);

  const meetingAreaPage = (props) => {
    console.info("미팅페이지 렌더링 됐어요")
    return (
      // <div>
      //   미팅페이지에요
      // </div>
      <div className="meetingLocationContent">
        <Form layout="vertical">
          <Form.Item
            name="meetingLocationForm"
            className="meetingLocationForm"
            label="장소 검색하기"
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

  const recommendationPage = (props) => {
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
            label="장소 검색하기"
          >
            <Input
              placeholder="식당 이름을 검색해주세요"
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
      { (meetingArea) ? (meetingAreaPage()) : (recommendationPage()) }
    </div>
  );
}

export default RecommendationModal;