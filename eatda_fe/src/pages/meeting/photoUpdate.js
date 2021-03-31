import React from "react";
import { Button, Dropdown, Menu, Row, Col, Image } from "antd";

import { PlusOutlined, CloseCircleFilled, PictureFilled } from '@ant-design/icons';

function PhotoUploader() {
  return (
  <div className="contentWrapper">
    <Row className="contentTitle">
      <Col span={20}>3월 23일(화) 오후 5시</Col>
      <Col span={4}>
        {/* <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <Button>...</Button>
        </Dropdown> */}
      </Col>
    </Row>
    <div className="contentBody photoUploaderWrapper">
      <Row justify="end">
        <p>클로이와 홍대 나들이</p>
      </Row>
      <div className="photoUploaderContent">
        <div className="photoBox addPhoto">
          {/* <PlusOutlined /> */}
          <PictureFilled />
          <input type="file" accept="image/jpg, image/jpeg, image/png" multiple style={{display: 'none'}} />
        </div>
        <div className="photoBox">
          <CloseCircleFilled className="photoBoxDelete"/>
          사진
        </div>
        <div className="photoBox">
          <CloseCircleFilled className="photoBoxDelete"/>
          사진
        </div>
      </div>
    </div>
    <Row justify="center">
      <Button className="photoUploadComplete">기록하기</Button>
    </Row>
  </div>
  );
}

export default PhotoUploader;
