import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import storeImage from 'assets/product/store_icon.png'
import moment from 'moment'

function MeetingInfo(props) {
    function parse(str) {
        var y = str.substr(0, 4);
        var m = str.substr(5, 2);
        var d = str.substr(8, 2);
        var h = str.substr(11, 2);
        var minutes = str.substr(14, 2);
        return new Date(y, m - 1, d, h, minutes, 0);
      }  
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const [info, setInfo] = useState(props.info);
  const [meetingDate, setMeetingDate] = useState(moment())
  const [meetingDateText, setMeetingDateText] = useState(moment().format("YYYY년 MM월 DD일 hh시 mm분"))
  useEffect(() => {
    setInfo(props.info)
    console.log("____________________")
    console.log(typeof(props.info.meetDate))
    console.log(props.info.meetDate)
    let meetingD = new Date(props.info.meetDate)
    console.log("날짜")
    console.log(meetingD)
    // meetingD.setHours(meetingD.getHours() - 9)
    setMeetingDate(moment(meetingD))
    setMeetingDateText(moment(meetingD).format("YYYY년 MM월 DD일 HH시 mm분"))
    let date = parse(props.info.meetDate.toString());
    // props.info.meetDate = date;
    setMonth(date.getMonth() + 1);
    setDate(date.getDate());
    if (date.getDay === 0) {
      setDay("일");
    } else if (date.getDay() === 1) {
      setDay("월");
    } else if (date.getDay() === 2) {
      setDay("화");
    } else if (date.getDay() === 3) {
      setDay("수");
    } else if (date.getDay() === 4) {
      setDay("목");
    } else if (date.getDay() === 5) {
      setDay("금");
    } else {
      setDay("토");
    }
    setHours(date.getHours());
    setMinutes(date.getMinutes());


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

  console.log(meetingDate.milliseconds())

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
        <p>{meetingDateText}</p>
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
          {meetingDate < moment(new Date()) ? <Button className="meetingReadDoneButton" type="submit" onClick={Complete}>만났어요</Button> : <Button disabled className="meetingReadDoneButton" type="submit">아직 날짜가 안 지났습니다.</Button>}        
      </Row>
    </div>
  );
}

class StoreName extends React.Component {
  render() {
    return (
      <Row className="meetingReadStoreItem">
        <Col span={3} className="meetingReadStoreImage">
            <img src={storeImage}/>
        </Col>
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
          <strong>{this.props.name}</strong>
        </Col>
      </Row>
    );
  }
}

export default MeetingInfo;