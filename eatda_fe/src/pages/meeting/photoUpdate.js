import Reac, { useState, useEffect, useRef } from "react";
import { Button, Dropdown, Menu, Row, Col, Image } from "antd";

import { PlusOutlined, CloseCircleFilled, PictureFilled } from '@ant-design/icons';

function PhotoUploader() {
  
  // 사진 업로드 버튼 이벤트 핸들러
  const photoInput = useRef();
  const handleClick = () => {
    photoInput.current.click();
  };
  
  // 업로드할 사진 보내기 
  const updatedFiles = [];
  const deletedUrls = [];
  
  const savePhoto = () => {
    // setPhotoList(photoToAddList.concat(photoAddedList)) 
    // console.info("photoList", photoList)
    for (let i = 0; i < photoToAddList.length; i++) {
      updatedFiles.push(photoToAddList[i].file)
    }
    
    console.log("추가할 파일", updatedFiles)

    fetch(`${process.env.REACT_APP_API_URL}/review/img/6064065b2802a2267bbe0e90`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        updatedFiles : updatedFiles,
        deletedUrls : deletedUrls,
      })
    })
  }

  // 저장된 사진 가져오기 구현
  const [ photoAddedList, setPhotoAddedList ] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/meeting/6064065b2802a2267bbe0e90`, {
      headers : {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("보자", response.imgs)
        setPhotoAddedList(response.imgs)
      });
  }, []);

  const photoAddedPreview = () => {
    return photoAddedList.map((photo) => {
      <div className="photoBox" key={photo.imgSeq} onClick={()=>onRemoveAdded(photo.imgUrl)}>
        <CloseCircleFilled className="photoBoxDelete"/>
        저장된 사진
        <img className="photoPreview" src={photo.imgUrl} />
      </div>
    })
  };

  const onRemoveAdded = (deleteUrl) => {
    setPhotoAddedList(photoAddedList.filter(photo => photo.imgUrl != deleteUrl))
    deletedUrls.push(deleteUrl)
  }
  

  // 사진 등록하기 및 미리보기 기능 구현 
  const [ photoToAddList, setPhotoToAddList ] = useState([]);
  
  const photoToAddPreview = () => {
    return photoToAddList.map((photo) => {
      return (        
        <div className="photoBox" key={photo.url}>
          <CloseCircleFilled className="photoBoxDelete" onClick={()=>onRemoveToAdd(photo.url)}/>
          <img className="photoPreview" src={photo.url} />
      </div>
      )
    })
  };
  
  const onRemoveToAdd = (deleteUrl) => {
    setPhotoToAddList(photoToAddList.filter(photo => photo.url != deleteUrl))
  }

  const handlePhoto = (e) => {
    const temp = []
    const photoToAdd = e.target.files;
    
    for (let i = 0; i < photoToAdd.length; i++) {
      temp.push({ id: photoToAdd[i].name, file: photoToAdd[i], url: URL.createObjectURL(photoToAdd[i]) })
    };
    setPhotoToAddList(temp.concat(photoToAddList))
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
        <div className="photoBox addPhoto" encType="multipart/form-data">
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
      <Button className="photoUploadComplete" onClick={ savePhoto }>기록하기</Button>
    </Row>
  </div>
  );
}

export default PhotoUploader;
