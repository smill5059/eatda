import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";

function MeetingInfo(props) {
  const [info, setInfo] = useState(props.info);
  useEffect(() => {
    setInfo(props.info)
    // 지도 로딩
    const { kakao } = window;
    console.log("일단 데이터 확인")
    console.log(props.info)
    if (document.querySelector(".meetingReadMap") !== null) {
      let meetingMap = new kakao.maps.Map(document.querySelector(".meetingReadMap"), {
        center: new kakao.maps.LatLng(props.info.stores[0].storeLatitude, props.info.stores[0].storeLongitude), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      });
      let infoWindow = new kakao.maps.InfoWindow({zIndex : 1})
      let bounds = new kakao.maps.LatLngBounds();

      props.info.stores.forEach(store => {
          if (store.storeLatitude > 0 && store.storeLongitude > 0){
            let marker = new kakao.maps.Marker({
                map:meetingMap,
                position: new kakao.maps.LatLng(store.storeLatitude, store.storeLongitude)
            })
            kakao.maps.event.addListener(marker, "click", function(){
                infoWindow.setContent(`<div>${store.storeName}</div>`)
                infoWindow.open(meetingMap, marker)
            })
            bounds.extend(new kakao.maps.LatLng(store.storeLatitude, store.storeLongitude))
          }          
      });

      meetingMap.setBounds(bounds)

    }
  }, []);

  const Complete = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/meeting/` + info.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('Kakao_token')
      }
    })
      .then(res => {
        if (res.status === 200) {
          window.location.href = '/meeting/' + info.id;
        }
        else {
          alert("외않데,,,?");
        }
      })
  }

  return (
    <div className="contentBody meetingReadContent">
      <Row justify="end" className="meetingReadTitle">
        <p>{info.title}</p>
      </Row>
      <Col className="meetingReadMap"></Col>
      <Col className="meetingReadStore">
        {info.stores.map((store, i) => {
          return (<StoreName name={store.storeName}
            key={i} />);
        })}
      </Col>
      <Col className="meetingReadFriend">
        <p>만나는 사람</p>
        <div className="meetingReadFriendList">
          {info.participants.map((friend, i) => {
            return (<Friends name={friend.userName}
              imgUrl={friend.userProfileUrl}
              key={i} />);
          })}
        </div>
      </Col>
      <Row className="meetingReadDone" justify="end">
        <Button className="meetingReadDoneButton" type="submit" onClick={Complete}>만났어요</Button>
      </Row>
    </div>
  );
}

class StoreName extends React.Component {
  render() {
    return (
      <Row className="meetingReadStoreItem">
        <Col span={3}></Col>
        <Col span={21} className="meetingReadStoreName">
          {this.props.name}
        </Col>
      </Row>
    );
  }
}

class Friends extends React.Component {
  render() {
    return (
      <Row className="meetingReadFriendItem">
        <Col span={8} className="meetingReadFriendImage">
          <img src={`${process.env.REACT_APP_API_URL}/files/${this.props.imgUrl}`} />
        </Col>
        <Col span={16} className="meetingReadFriendName">
          {this.props.name}
        </Col>
      </Row>
    );
  }
}

export default MeetingInfo;