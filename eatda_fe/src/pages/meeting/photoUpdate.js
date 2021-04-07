import React, { useState, useEffect, useRef } from "react";
import { Button, Dropdown, Menu, Row, Col, Image, Form } from "antd";

import { PlusOutlined, CloseCircleFilled, PictureFilled } from '@ant-design/icons';
import moment from 'moment'

function PhotoUploader(props) {
  const {meetingId} = props.match.params
  // 사진 업로드 버튼 이벤트 핸들러
  const photoInput = useRef();
  const handleClick = () => {
    photoInput.current.click();
  };
  
  // 업로드할 사진 보내기 
  const [ deletedUrls, setDeletedUrls ] = useState([]);
  // 날짜, 약속 이름
  const meetingDays = ['일', '월', '화', '수', '목', '금', '토']
  const [meetingDate, setMeetingDate] = useState('')
  const [meetingTitle, setMeetingTitle] = useState('')

  const savePhoto = () => {
    
    const formData = new FormData()

    for (let i = 0; i < photoToAddList.length; i++) {
      formData.append("updatedFile", photoToAddList[i].file)
      console.info("넣을 객체는 제가 따로 설정해준것", photoToAddList[i])
      console.info("파일만 빼내면", photoToAddList[i].file)
      console.info("폼데이터는요", formData.getAll("updatedFile"))
    }

    let errorCheck = ''

    if(photoToAddList.length > 0){
        fetch(`${process.env.REACT_APP_API_URL}/review/img/${meetingId}`, {
            method: "POST",
            body: formData
          }).catch((err)=>errorCheck = err)
    }

    if (errorCheck === ''){
        fetch(`${process.env.REACT_APP_API_URL}/review/img/${meetingId}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              deletedUrls: deletedUrls,
            })
          }).then((res) => {
            // alert("사진이 저장되었습니다!");
            window.location.href = `/meeting/${meetingId}`;
          })
    }else{
        alert("관리자에게 문의하세요.")
        console.log(errorCheck)
    }
    
  };

  // 저장된 사진 가져오기 구현
  const [ photoAddedList, setPhotoAddedList ] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/meeting/${meetingId}`, {
      headers : {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((response) => {
          console.log(response.meetDate)
          let receivedDate = new Date(response.meetDate)
          receivedDate.setHours(receivedDate.getHours() - 9)
          setMeetingDate(`${receivedDate.getMonth()+1}월 ${receivedDate.getDate()}일(${meetingDays[receivedDate.getDay()]}) ${receivedDate.getHours()}시 ${receivedDate.getMinutes()}분`)
          setMeetingTitle(response.title)
        console.log("보자", response.imgs)
        setPhotoAddedList(response.imgs)
      }).catch(()=>window.location.href=`/meeting/${meetingId}`);
  }, []);

  const photoAddedPreview = () => {
    return photoAddedList.map((photo, index) => {
      return (
        <div className="photoBox" key={index}>
          <CloseCircleFilled className="photoBoxDelete" onClick={()=>onRemoveAdded(photo)}/>
          <img className="photoPreview" src={`${process.env.REACT_APP_API_URL}/files/${photo}`} alt="meetingImg"/>
        </div>
      )
    })
  };

  const onRemoveAdded = (deleteUrl) => {
    setPhotoAddedList(photoAddedList.filter(photo => photo != deleteUrl))
    setDeletedUrls(deletedUrls.concat(deleteUrl))
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
      {/* <Col span={20}>3월 23일(화) 오후 5시</Col> */}
      <Col span={20}>{meetingDate}</Col>
      <Col span={4}>
        {/* <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <Button>...</Button>
        </Dropdown> */}
      </Col>
    </Row>
    <div className="contentBody photoUploaderWrapper">
      <Row justify="end">
        <p>{meetingTitle}</p>
      </Row>
      <div className="photoUploaderContent">
        <Form 
          className="photoBox addPhoto" 
          encType="multipart/form-data"
          onClick={handleClick}>
          {/* <PlusOutlined /> */}
          {/* <PictureFilled onClick={handleClick} /> */}
          <PictureFilled />
          <input 
            type="file" 
            accept="image/jpg, image/jpeg, image/png" 
            multiple="multiple"
            ref={photoInput}
            onChange={(e) => handlePhoto(e)}
            style={{display: 'none'}} 
          />
        </Form>
        { photoToAddPreview() }
        { photoAddedPreview() }
      </div>
      <Row justify="center">
        <Button className="photoUploadComplete" onClick={ savePhoto }>기록하기</Button>
      </Row>
    </div>
  </div>
  );
}

export default PhotoUploader;
