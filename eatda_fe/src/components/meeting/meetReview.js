import React, { useEffect, useState } from "react";
import { Row, Col, Rate } from 'antd';

function MeetingReview(props) {
  const [data, setData] = useState(props.info)
  console.log("얘는 받아온 자식")
  console.log(data)
  return (
    <div className="contentBody meetingReadAfterContent">
      <Row justify="end" className="meetingReadTitle">
        <p>{data.title}</p>
      </Row>
      <Col className="meetingReadImage">
        {
          data.imgs.length > 0
            ? (data.imgs.map((img, i) => {
              return (<Img imgUrl={img}
                key={i} />)
            }))
            // 디니디니
            : null
        }
      </Col>
      <Col className="meetingReadAfterFriend">
        {data.participants.map((friend, i) => {
          return (<Friends name={friend.userName}
            imgUrl={friend.userProfileUrl}
            key={i} />);
        })}
      </Col>
      <Col className="meetingReadAfterStore">
          {
              data.stores.map((store, index)=>{
                  console.log(store.rate)
                  return (
                    <Row className="meetingReadAfterStoreItem" align="middle" justify="space-between" key={index}>
                    <p>{store.storeName}</p>
                    <Rate disabled defaultValue={store.rate}/>
                </Row>
                  )
              })
          }
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
        <img src={`${process.env.REACT_APP_API_URL}/files/${this.props.imgUrl}`} />
      </div>
    );
  }
}

class Friends extends React.Component {
  render() {
    return (
      <Row className="meetingReadAfterFriendItem">
        <Col span={8} className="meetingReadAfterFriendImage">
          <img src={`${process.env.REACT_APP_API_URL}/files/${this.props.imgUrl}`} />
        </Col>
        <Col span={16} className="meetingReadAfterFriendName">
          {this.props.name}
        </Col>
      </Row>
    );
  }
}

export default MeetingReview;
