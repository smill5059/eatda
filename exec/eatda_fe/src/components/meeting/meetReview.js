import React, { useEffect, useState } from "react";

import { useSelector } from 'react-redux';

import { Row, Col, Rate } from "antd";
import { FileImageFilled } from '@ant-design/icons';
import UploadPhoto from "assets/product/upload_photo.png";

function MeetingReview(props) {
  const user = useSelector(state => state.userData)
  
  const [day, setDay] = useState("");
  let date = props.info.meetDate;

  useEffect(() => {
    // console.info("자를건데요", props.info.meetDate)
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
  }, [])


  const [data, setData] = useState(props.info);
  // console.log("얘는 받아온 자식");
  // console.log(data);
  console.info("이거 유저정보", user)
  console.info("이거 코멘트", data.comments)

  const [ comments, setComments ] = useState([]);
  const [ myComment, setMyComment ] = useState([]);

  useEffect(() => {
    var myTemp = [];
    var temp = [];
    for (let i = 0; i < data.comments.length; i++) {
      if (data.comments[i].userSeq === user.usercode) {
        myTemp.push({
          commentUser: user.username,
          content: data.comments[i].content
        })
        // setMyComment(true);
      } else {
        for (let j = 0; j < user.friendList.length; j++) {
          if (data.comments[i].userSeq === user.friendList[j].userSeq)
          temp.push({
            commentUser: user.friendList[j].userName,
            content: data.comments[i].content
          })
        }
      }
    }
    setMyComment(myTemp);
    setComments(comments.concat(temp));
  }, [])
  console.info("마이코멘트", myComment)
  console.info("너네코멘트", comments)

  return (
    <div className="contentBody meetingReadAfterContent">
      <Row justify="end" className="meetingReadTitle">
        <p>{date.getMonth() + 1}월 {date.getDate()}일({day}) {date.getHours()}시 {date.getMinutes(0)}분</p>
        {/* <p>{props.dateString}</p> */}
      </Row>
      <div className="meetingReadImage">
        {data.imgs.length > 0 ? (
          data.imgs.map((img, i) => {
            return <Img className="meetingReadImageItem" imgUrl={img} key={i} />;
          })
        ) : (
          // 디니디니
          <div className="meetingReadImageItem addPhoto">
            {/* <img src={UploadPhoto} /> */}
            {/* <FileImageFilled /> */}
            <p>저장된 사진이</p>
            <p>없어요!</p>
          </div>
        )}
      </div>
      <div className="meetingReadAfterFriend">
        {data.participants.map((friend, i) => {
          if (friend.userSeq !== user.usercode) {
            return (
              <Friends
                name={friend.userName}
                imgUrl={friend.userProfileUrl}
                key={i}
              />
            );
          }
        })}
      </div>
      <Col className="meetingReadAfterStore">
        {data.stores.map((store, index) => {
          console.log(store.rate);
          return (
            <Row
              className="meetingReadAfterStoreItem storeCard"
              align="middle"
              justify="space-between"
              key={index}
            >
              <p>{store.storeName}</p>
              <Rate className="storeCardRating" disabled defaultValue={store.rate} />
            </Row>
          );
        })}
      </Col>
      <Col className="meetingReadAfterComment">
        { (myComment.length === 0)  
          ? (<div className="meetingReadAfterCommentItem mRACImyCommentDefault">
            내 후기를 남겨보세요!
          </div>)
          : (<div className="meetingReadAfterCommentItem">
              <p span={24} className="meetingReadAfterCommentName">
                #나의_후기
              </p>
              <p span={24} className="meetingReadAfterCommentContent">
                { myComment[0].content }
              </p>
          </div>) }
        {comments.map((comment, index) => {
          return(
            <div className="meetingReadAfterCommentItem">
              <p span={24} className="meetingReadAfterCommentName">
                #{comment.commentUser}
              </p>
              <p span={24} className="meetingReadAfterCommentContent">
                {comment.content}
              </p>
            </div>
          );
        })}
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
      <div className="meetingReadAfterFriendItem">
        {/* <Col span={8} className="meetingReadAfterFriendImage">
          <img
            src={`${process.env.REACT_APP_API_URL}/files/${this.props.imgUrl}`}
          />
        </Col> */}
        <div span={16} className="meetingReadAfterFriendName">
          #{this.props.name}
        </div>
      </div>
    );
  }
}

export default MeetingReview;
