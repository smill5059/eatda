import React, { useEffect, useState } from "react";
import { Row, Col, Rate } from "antd";
import UploadPhoto from "assets/product/upload_photo.png";

function MeetingReview(props) {

  function parse(str) {
    console.info("얘가 str 입니다", str)
    // str.toString()
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

  useEffect(() => {
    console.info("자를건데요", props.info.meetDate)
    // props.info.meetDate.toString()
    let date = parse(props.info.meetDate.toString());
    props.info.meetDate = date;
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
  }, [])


  const [data, setData] = useState(props.info);
  console.log("얘는 받아온 자식");
  console.log(data);
  return (
    <div className="contentBody meetingReadAfterContent">
      <Row justify="end" className="meetingReadTitle">
        {/* <p>{month}월 {date}일({day}) {hours}시 {minutes}분</p> */}
        <p>{props.dateString}</p>
      </Row>
      <Col className="meetingReadImage">
        {data.imgs.length > 0 ? (
          data.imgs.map((img, i) => {
            return <Img className="meetingReadImageItem" imgUrl={img} key={i} />;
          })
        ) : (
          // 디니디니
          <div className="meetingReadImageItem">
            <img src={UploadPhoto} />
          </div>
        )}
      </Col>
      <Col className="meetingReadAfterFriend">
        {data.participants.map((friend, i) => {
          return (
            <Friends
              name={friend.userName}
              imgUrl={friend.userProfileUrl}
              key={i}
            />
          );
        })}
      </Col>
      <Col className="meetingReadAfterStore">
        {data.stores.map((store, index) => {
          console.log(store.rate);
          return (
            <Row
              className="meetingReadAfterStoreItem"
              align="middle"
              justify="space-between"
              key={index}
            >
              <p>{store.storeName}</p>
              <Rate disabled defaultValue={store.rate} />
            </Row>
          );
        })}
      </Col>
      <Col className="meetingReadAfterComment">
        <Row className="meetingReadAfterCommentItem">
          <Col span={24} className="meetingReadAfterCommentName">
            {props.username}
          </Col>
          <Col span={24} className="meetingReadAfterCommentContent">
            {props.comment}
          </Col>
        </Row>
      </Col>
    </div>
  );
}

class Img extends React.Component {
  render() {
    return (
      <div className="meetingReadImageItem">
        <img
          src={`${process.env.REACT_APP_API_URL}/files/${this.props.imgUrl}`}
        />
      </div>
    );
  }
}

class Friends extends React.Component {
  render() {
    return (
      <Row className="meetingReadAfterFriendItem">
        {/* <Col span={8} className="meetingReadAfterFriendImage">
          <img
            src={`${process.env.REACT_APP_API_URL}/files/${this.props.imgUrl}`}
          />
        </Col> */}
        <Col span={16} className="meetingReadAfterFriendName">
          {this.props.name}
        </Col>
      </Row>
    );
  }
}

export default MeetingReview;
