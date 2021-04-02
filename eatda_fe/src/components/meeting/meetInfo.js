import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";

function MeetingInfo(props) {
  const [data, setData] = useState("");
  useEffect(() => {
    setData(props.data)
    // 지도 로딩
    const { kakao } = window;
    if (document.querySelector(".meetingReadMap") !== null) {
      new kakao.maps.Map(document.querySelector(".meetingReadMap"), {
        center: new kakao.maps.LatLng(props.data.stores[0].storeLatitude, props.data.stores[0].storeLongitude), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      });
    }
  }, []);
  return (
    <div className="contentBody meetingReadContent">
      <Row justify="end" className="meetingReadTitle">
        <p>{data.title}</p>
      </Row>
      <Col className="meetingReadMap"></Col>
      <Col className="meetingReadStore">
        {data.stores.map((store, i) => {
          return (<StoreName name={store.storeName}
            key={i} />);
        })}
      </Col>
      <Col className="meetingReadFriend">
        <p>만나는 사람</p>
        <div className="meetingReadFriendList">
          {data.participants.map((friend, i) => {
            return (<Friends name={friend.userName}
              imgUrl={friend.userProfileUrl}
              key={i} />);
          })}
        </div>
      </Col>
      <Row className="meetingReadDone" justify="end">
        <Button className="meetingReadDoneButton">만났어요</Button>
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
