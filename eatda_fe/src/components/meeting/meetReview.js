import React, { useEffect, useState } from "react";
import { Row, Col } from 'antd';

function MeetingReview(props) {
  const [data, setData] = useState(props.info)
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
            : (<img src="http://sokcho35.cafe24.com/web/product/big/201511/301_shop1_961560.jpg" />)
        }
      </Col>
      <Col className="meetingReadAfterFriend">
        {data.participants.map((friend, i) => {
          return (<Friends name={friend.userName}
            imgUrl={friend.userProfileUrl}
            key={i} />);
        })}
      </Col>
      <Col className="meetingReadAfterComment">
        <Row className="meetingReadAfterCommentItem">
          <Col span={24} className="meetingReadAfterCommentName">
            디니디니
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

class Comment extends React.Component {
  render() {
    return (
      <Row className="meetingReadAfterCommentItem">
        <Col span={24} className="meetingReadAfterCommentName">
          이름
                </Col>
        <Col span={24} className="meetingReadAfterCommentContent">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elementum turpis ut augue feugiat, ultricies iaculis augue interdum. Sed et commodo nisl. Vivamus finibus massa eu porttitor maximus. Suspendisse tincidunt lorem nec tortor volutpat vestibulum. Phasellus posuere venenatis ornare. Etiam mollis tincidunt purus, at fermentum nulla maximus at. Phasellus faucibus, felis eu maximus vestibulum, elit odio elementum metus, at bibendum turpis enim id nunc. Integer at hendrerit quam, vel interdum est. Ut sem leo, efficitur in consectetur quis, sagittis ac mi. Nunc eu nisi arcu.
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

export default MeetingReview;
