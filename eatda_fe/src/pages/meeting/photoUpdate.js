import Reac, { useState, useRef } from "react";
import { Button, Dropdown, Menu, Row, Col, Image } from "antd";

import { PlusOutlined, CloseCircleFilled, PictureFilled } from '@ant-design/icons';

function PhotoUploader() {

  // 사진 업로드 버튼 이벤트 핸들러
  const photoInput = useRef();
  const handleClick = () => {
    photoInput.current.click();
  };


  // 사진 등록하기 및 미리보기 기능 구현 

  const [ previewUrl, setPreviewUrl ] = useState([]);
  
  const photoToAddPreview = () => {
    console.info("들어오기는 하는지");
    console.info("들어온photoURL", previewUrl);
    
    return previewUrl.map((url) => {
      return (        
        <div className="photoBox">
          <CloseCircleFilled className="photoBoxDelete" onClick={()=>onRemove(url)}/>
          <img className="photoPreview" src={url} />
      </div>
      )
    })
  };
  
  const onRemove = (deleteUrl) => {
    setPreviewUrl(previewUrl.filter(url=> url != deleteUrl))
    console.info("제거된 배열", previewUrl)
  }

  const handlePhoto = (e) => {
    const photoToAddFile = []
    const photoToAddUrl = []
    const photoToAdd = e.target.files;
    for (let i = 0; i < photoToAdd.length; i++) {
      console.info("files", photoToAdd[i])
      photoToAddFile.push(photoToAdd[i])
      photoToAddUrl.push(URL.createObjectURL(photoToAdd[i]))
    };
    console.info("photoUrl", photoToAddUrl)
    setPreviewUrl(previewUrl.concat(photoToAddUrl))
  };
  

  const photoAddedPreview = () => {
    return (
      <div className="photoBox">
        <CloseCircleFilled className="photoBoxDelete"/>
        저장된 사진
      </div>
    )
  };

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
          <PictureFilled onClick={handleClick} />
          <input 
            type="file" 
            accept="image/jpg, image/jpeg, image/png" 
            multiple 
            ref={photoInput}
            onChange={(e) => handlePhoto(e)}
            style={{display: 'none'}} 
          />
        </div>
        { photoToAddPreview() }
        { photoAddedPreview() }
      </div>
    </div>
    <Row justify="center">
      <Button className="photoUploadComplete">기록하기</Button>
    </Row>
  </div>
  );
}

export default PhotoUploader;
